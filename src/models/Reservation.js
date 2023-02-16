const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({

  field: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Field',
    required: true
  },
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match'
  },
  num: {
    type: Number,
    default: 0
  },
  time: {
    type: Date,
    required: true,
    validate: {
      validator: function () {
        return this.time > new Date();
      }
    }
  },
  isCanceled: {
    type: Boolean,
    default: false
  },
  isFilled: {
    type: Boolean,
    default: false
  },
  registeredPlayers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'

  }]

}, {
  timestamps: true,
  strict: true
});
reservationSchema.pre('updateOne', async function (next) {
  const doc = await this.model.findOne(this.getQuery());
  if (doc.num === 6) throw new Error('Can only contain 6 players');
});

reservationSchema.post('updateOne', async function (doc) {
  const updatedDoc = await this.model.findOne(this.getQuery());
  if (updatedDoc.num === 6) {
    updatedDoc.isFilled = true;
  }

  await updatedDoc.save();
});

module.exports = mongoose.model('Reservation', reservationSchema);
