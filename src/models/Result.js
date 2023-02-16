const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
  whiteTeamScore: {
    type: Number,
    required: true,
    min: 0,
    max: 30
  },
  blackTeamScore: {
    type: Number,
    required: true,
    min: 0,
    max: 30
  }
}, {
  timestamps: true,
  strict: true
});

module.exports = mongoose.model('Result', resultSchema);
