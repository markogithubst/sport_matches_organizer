const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({

  whiteTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  blackTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  result: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Result'
  }
}, {
  timestamps: true,
  strict: true
});

module.exports = mongoose.model('Match', matchSchema);
