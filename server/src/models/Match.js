
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
  strict: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.createdAt;
      delete ret.updatedAt;
    }
  }
});

matchSchema.pre('find', function () {
  const exclude = '-createdAt -updatedAt';
  this.populate('result', exclude).populate('whiteTeam', exclude).populate('blackTeam', exclude);
});

module.exports = mongoose.model('Match', matchSchema);
