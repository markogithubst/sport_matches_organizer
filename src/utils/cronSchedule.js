const cron = require('node-cron');
const Reservation = require('../models/Reservation');
const { ErrorMessages } = require('../errors/ErrorMessages');
const { NotFoundError } = require('../errors/Errors');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');

const initScheduledJobs = () => {
  const checkWeatherJob = cron.schedule('0 9 * * *', () => {
    console.log('I\'m executed on a schedule!');
    // Add your custom logic here
    const checkPlayerAndWeather = async () => {
      const today = new Date().toISOString().slice(0, 10);
      const reservations = await Reservation.find();
      for (const reservation of reservations) {
        const reservationDate = new Date(reservation.time).toISOString().slice(0, 10);
        if (reservationDate === today) {
          if (reservation.isFilled === false) {
            console.log('send a mail there is no match for this reservation, not enough players registered');
          }
          console.log('check the weather APi');
        }
      }
      if (reservations.length === 0) throw new NotFoundError(ErrorMessages.dataNotFound);
    };
    callbackErrorHandler(checkPlayerAndWeather());
  });

  checkWeatherJob.start();
};

module.exports.initScheduledJobs = initScheduledJobs;
