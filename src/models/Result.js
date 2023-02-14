const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
  whiteTeamScore: {
    type: Number
  },
  blackTeamScore: {
    type: Number
  }
}, {
  timestamps: true,
  strict: true
});

module.exports = mongoose.model('Result', resultSchema);
