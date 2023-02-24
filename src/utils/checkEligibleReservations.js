const { fetchWeather } = require('./fetchWeather');
const Reservations = require('../models/Reservation');

const checkEligibleReservations = async () => {
  const today = new Date();
  const tomorrow = new Date(today);

  tomorrow.setDate(tomorrow.getDate() + 1);

  const reservations = await Reservations
    .find({
      isFilled: false,
      isCanceled: false,
      time: { $gte: new Date().toISOString(), $lte: tomorrow.toISOString().slice(0, 10) }
    }).populate('field');
  // eslint-disable-next-line prefer-const, no-unreachable-loop
  for (let reservation of reservations) {
    const numOfPlayers = reservation.registeredPlayers.length;
    if (numOfPlayers !== 6) {
      await Reservations.findByIdAndUpdate(reservation.id, { $set: { isCanceled: true } });
      console.log('Match canceled due to not enough players!');
      continue;
    }

    const data = await fetchWeather(reservation.field.city);
    if (!data) {
      await createMatchForReservation(reservation.id);
      console.log('Match will be played!');
      // TODO Send mail that match will be played anyway if API not available
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
      console.log('Match canceled'); // TODO Return function which send the match cancel emial
    } else {
      await createMatchForReservation(reservation.id);
      console.log('Match will be played!'); // TODO Return fucntion which will send the match reminder email
    }
  }
};

const createMatchForReservation = async (id) => {
  const res = await Reservations.findById(id);
  await res.createMatch();
  res.save();
};

module.exports.checkEligibleReservations = checkEligibleReservations;
