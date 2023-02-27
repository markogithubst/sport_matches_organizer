const { sendEmail } = require('./nodemailerSetup');

const cancelMatch = (reservation, reason) => {
  for (const user of reservation.registeredPlayers) {
    const firstName = user.name;
    const lastName = user.surname;
    const time = reservation.time.toISOString().slice(0, 16).split('T');
    const recipient = user.email;
    const subject = 'NOTIFICATION - match canceled';
    const text =
        `${firstName} ${lastName}, 
        We are informing you that the match scheduled for ${time} at ${reservation.field.name} is canceled due to ${reason}.`;
    sendEmail(recipient, subject, text);
  }
};

const scheduleMatch = (reservation) => {
  for (const user of reservation.registeredPlayers) {
    const firstName = user.name;
    const lastName = user.surname;
    const time = reservation.time.toISOString().slice(0, 16).split('T');
    const recipient = user.email;
    const subject = 'NOTIFICATION - match scheduled';
    const text =
            `${firstName} ${lastName}, 
            We are informing you that the match scheduled for ${time} at ${reservation.field.name} will be played on schedule.`;
    sendEmail(recipient, subject, text);
  }
};

module.exports.cancelMatch = cancelMatch;
module.exports.scheduleMatch = scheduleMatch;
