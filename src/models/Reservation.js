const mongoose = require('mongoose');
const { ValidationError } = require('../errors/Errors');
const { ErrorMessages } = require('../errors/ErrorMessages');

const Team = require('./Team');
const Match = require('./Match');

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
  isFinished: {
    type: Boolean,
    default: false
  },
  isScheduled: {
    type: Boolean,
    default: false
  },
  registeredPlayers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'

  }]

},
{
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

reservationSchema.method('createMatch', async function () {
  const blackTeam = new Team({ color: 'black' });
  const whiteTeam = new Team({ color: 'white' });

  this.registeredPlayers.forEach(player => {
    const selector = Math.round(Math.random());
    if (selector === 0 && blackTeam.players.length < 3) {
      blackTeam.players.push(player);
    } else if (selector === 1 && blackTeam.players.length < 3) {
      whiteTeam.players.push(player);
    } else {
      blackTeam.players.length === 3
        ? whiteTeam.players.push(player)
        : blackTeam.players.push(player);
    }
  });
  Promise.all([blackTeam.save(), whiteTeam.save()]).catch(err => console.log(err));
  const match = new Match({ blackTeam, whiteTeam });
  await match.save();
  this.match = match._id;
  this.isScheduled = true;
});

reservationSchema.pre('findOneAndUpdate', async function (next) {
  const doc = await this.model.findOne(this.getQuery());
  if (doc && doc.num === 6) throw new ValidationError(ErrorMessages.playerLimit);
});

module.exports = mongoose.model('Reservation', reservationSchema);
