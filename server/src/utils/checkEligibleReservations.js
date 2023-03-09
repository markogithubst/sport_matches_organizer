const { fetchWeather } = require('./fetchWeather');
const Reservations = require('../models/Reservation');
const { notifyPlayers } = require('./reservationEmail');

const { mailContexts } = require('./mailContexts');
const { weatherConsts } = require('./weatherConstants');

const checkEligibleReservations = async () => {
  const tomorrow = new Date();
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

  for (const reservation of reservations) {
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
  if (numOfPlayers !== reservation.field.maxPlayers) {
    await Reservations.findByIdAndUpdate(reservation.id, { $set: { isCanceled: true } });
    notifyPlayers(reservation, mailContexts.notEnoughPlayers);
    return;
  }

  const data = await fetchWeather(reservation.field.city);
  if (!data) { // Match will be played if Weather API is not available
    await createMatchForReservation(reservation.id);
    notifyPlayers(reservation, mailContexts.scheduled);
    return;
  }
  if (
    data.main.temp < weatherConsts.minTemp ||
  data.main.temp > weatherConsts.maxTemp ||
    data.main.humidity > weatherConsts.maxHumidity ||
    data.wind.speed > weatherConsts.maxWindSpeed ||
    data.weather[0].main === weatherConsts.rain ||
    data.weather[0].main === weatherConsts.snow
  ) {
    await Reservations.findByIdAndUpdate(reservation.id, { $set: { isCanceled: true } });
    notifyPlayers(reservation, mailContexts.badWeather);
  } else {
    await createMatchForReservation(reservation.id);
    notifyPlayers(reservation, mailContexts.scheduled);
  }
};

module.exports.checkEligibleReservations = checkEligibleReservations;
