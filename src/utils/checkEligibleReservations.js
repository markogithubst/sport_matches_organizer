const { fetchWeather } = require('./fetchWeather');
const Reservations = require('../models/Reservation');
const { cancelMatch, scheduleMatch } = require('./reservationEmail');

const notEnoughPlayers = 'insufficient number of players';
const weatherConditions = 'poor weather conditions';

const checkEligibleReservations = async () => {
  const today = new Date();
  const tomorrow = new Date(today);

  tomorrow.setDate(tomorrow.getDate() + 1);

  const reservations =
  await Reservations
    .find({
      isCanceled: false,
      time: { $gte: new Date().toISOString(), $lte: tomorrow.toISOString().slice(0, 10) }
    }).populate({
      path: 'field'
    }).populate({
      path: 'registeredPlayers'
    });
  // eslint-disable-next-line prefer-const, no-unreachable-loop
  for (let reservation of reservations) {
    const numOfPlayers = reservation.registeredPlayers.length;
    if (numOfPlayers !== 6) {
      await Reservations.findByIdAndUpdate(reservation.id, { $set: { isCanceled: true } });
      cancelMatch(reservation, notEnoughPlayers);
      continue;
    }

    const data = await fetchWeather(reservation.field.city);
    if (!data) {
      await createMatchForReservation(reservation.id);
      console.log(data);
      scheduleMatch(reservation);
      continue;
    }
    if (
      data.main.temp < 4 ||
      data.main.temp > 33 ||
        data.main.humidity > 89 ||
        data.wind.speed > 80 ||
        data.weather[0].main === 'Rain' ||
        data.weather[0].main === 'Snow'
    ) {
      await Reservations.findByIdAndUpdate(reservation.id, { $set: { isCanceled: true } });
      cancelMatch(reservation, weatherConditions);
    } else {
      await createMatchForReservation(reservation.id);
      scheduleMatch(reservation);
    }
  }
};

const createMatchForReservation = async (id) => {
  const res = await Reservations.findById(id);
  await res.createMatch();
  res.save();
};

module.exports.checkEligibleReservations = checkEligibleReservations;
