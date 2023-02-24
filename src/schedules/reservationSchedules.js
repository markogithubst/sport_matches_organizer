const cron = require('node-cron');

const { checkEligibleReservations } = require('../utils/checkEligibleReservations');

const initScheduledJobs = () => {
  const checkWeatherJob = cron.schedule('0 9 * * *', async () => {
    checkEligibleReservations();
  });

  checkWeatherJob.start();
};

module.exports.initScheduledJobs = initScheduledJobs;
