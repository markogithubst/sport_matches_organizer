const { sendEmail } = require('./nodemailerSetup');

const notifyPlayers = async (reservation, context) => {
  const players = reservation.registeredPlayers;
  const info = {
    time: reservation.time.toLocaleString(),
    location: reservation.field.name
  };
  players.forEach(async player => {
    const text = generateEmailText(player, context, info);
    await sendEmail(player.email, context.subject, text);
  });
};

const generateEmailText = (player, context, info) => {
  const reason = context.cancelationReason;
  return reason
    ? `${player.name} ${player.surname}, 
    We are informing you that the match scheduled for ${info.time} at ${info.location} is canceled due to ${reason}.`
    : `${player.name} ${player.surname}, 
    We are informing you that the match scheduled for ${info.time} at ${info.location} will be played on schedule.`;
};

module.exports.notifyPlayers = notifyPlayers;
