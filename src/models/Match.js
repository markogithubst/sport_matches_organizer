
const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({

  whiteTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    autopopulate: true
  },
  blackTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    autopopulate: true
  },
  result: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Result',
    autopopulate: true
  }
}, {
  timestamps: true,
  strict: true
});

matchSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Match', matchSchema);
