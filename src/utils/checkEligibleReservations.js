const { fetchWeather } = require('./fetchWeather');
const Reservations = require('../models/Reservation');
const { notifyPlayers } = require('./reservationEmail');

const mailContexts = {
  badWeather: {
    cancelationReason: 'bad weather',
    subject: 'CAGEBALL Match Canceled - Bad weather'
  },
  notEnoughPlayers: {
    cancelationReason: 'insufficent number of registered players',
    subject: 'CAGEBALL Match Canceled - Insufficet players'
  },
  scheduled: {
    subject: 'CAGEBALL Match Confiramtion'
  }
};

const checkEligibleReservations = async () => {
  const today = new Date();
  const tomorrow = new Date(today);

  tomorrow.setDate(tomorrow.getDate() + 1);

  const reservations = await Reservations.find({
    isFinished: false,
    isScheduled: false,
    isCanceled: false,
    time: {
      $gte: new Date().toISOString(),
      $lte: tomorrow.toISOString().slice(0, 10)
    }
  }).populate({
    path: 'field'
  }).populate({
    path: 'registeredPlayers',
    model: 'User'
  });

  // eslint-disable-next-line prefer-const, no-unreachable-loop
  for (let reservation of reservations) {
    checkConditionsAndNotify(reservation);
  }
};

const createMatchForReservation = async (id) => {
  const res = await Reservations.findById(id);
  await res.createMatch();
  res.save();
};

const checkConditionsAndNotify = async (reservation) => {
  const numOfPlayers = reservation.registeredPlayers.length;
  if (numOfPlayers !== 6) {
    await Reservations.findByIdAndUpdate(reservation.id, { $set: { isCanceled: true } });
    notifyPlayers(reservation, mailContexts.notEnoughPlayers);
    return;
  }

  const data = await fetchWeather(reservation.field.city);
  if (!data) { // Match will be played if Weather API is not available
    await createMatchForReservation(reservation.id);
    console.log(data);
    notifyPlayers(reservation, mailContexts.scheduled);
    return;
  }
  if (
    data.main.temp < 4 ||
  data.main.temp > 33 ||
    data.main.humidity > 89 ||
    data.wind.speed > 80 ||
    // data.weather[0].main === 'Rain' ||
    data.weather[0].main === 'Snow'
  ) {
    await Reservations.findByIdAndUpdate(reservation.id, { $set: { isCanceled: true } });
    notifyPlayers(reservation, mailContexts.badWeather);
  } else {
    await createMatchForReservation(reservation.id);
    notifyPlayers(reservation, mailContexts.scheduled);
  }
};

module.exports.checkEligibleReservations = checkEligibleReservations;
