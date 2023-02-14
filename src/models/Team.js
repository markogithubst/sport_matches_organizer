const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  color: {
    type: String,
    enum: ['white', 'black']
  }
}, {
  timestamps: true,
  strict: true

});

module.exports = mongoose.model('Team', teamSchema);
