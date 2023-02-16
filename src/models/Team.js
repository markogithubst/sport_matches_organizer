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

teamSchema.pre('save', (next) => {
  if (this.players.length > 3) throw new Error('Players exceed the maximum number of 3.');
});

module.exports = mongoose.model('Team', teamSchema);
