const User = require('../models/User');
const Match = require('../models/Match');
const Reservation = require('../models/Reservation');
const { sendEmail } = require('./nodemailerSetup');

const checkFinishedMatchResults = async () => {
  const adminUsers = await User.find({ role: 'ADMIN' });
  const finishedGames = await Reservation.find({ isFinished: true });
  for (const game of finishedGames) {
    const match = await Match.find({ id: game.match });
    if (!match.result) {
      for (const admin of adminUsers) {
        const recipient = admin.email;
        const subject = 'Pending match results';
        const text = `${admin.username}, please fill in the results for the match with the ID: ${game.match}.`;

        await sendEmail(recipient, subject, text);
      }
    }
  }
};

module.exports.checkFinishedMatchResults = checkFinishedMatchResults;
