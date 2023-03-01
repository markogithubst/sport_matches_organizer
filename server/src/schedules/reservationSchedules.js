const cron = require('node-cron');

const { checkEligibleReservations } = require('../utils/checkEligibleReservations');
const { checkFinishedMatchResults } = require('../utils/resultsReminderEmail');

const initScheduledJobs = () => {
  const checkWeatherJob = cron.schedule('0 9 * * *', async () => {
    checkEligibleReservations();
  });

  const checkResults = cron.schedule('5 9 * * *', async () => {
    checkFinishedMatchResults();
  });

  checkWeatherJob.start();
  checkResults.start();
};

module.exports.initScheduledJobs = initScheduledJobs;
