const cron = require('node-cron');

const initScheduledJobs = () => {
  const checkWeatherJob = cron.schedule('0 9 * * *', () => {
    console.log('I\'m executed on a schedule!');
    // Add your custom logic here
  });

  checkWeatherJob.start();
};

module.exports.initScheduledJobs = initScheduledJobs;
