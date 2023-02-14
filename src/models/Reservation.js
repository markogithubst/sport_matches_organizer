const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({

  field: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Field'
  },
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match'
  },
  status: {
    type: Boolean
  },
  isFilled: {
    type: Boolean
  },
  registeredPlayers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]

}, {
  timestamps: true,
  strict: true
});

module.exports = mongoose.model('Reservation', reservationSchema);
