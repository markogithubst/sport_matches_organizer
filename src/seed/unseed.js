const mongoose = require('mongoose');

const User = require('../models/User');
const Team = require('../models/Team');
const Reservation = require('../models/Reservation');
const Match = require('../models/Match');
const Result = require('../models/Result');
const Field = require('../models/Field');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://root:root@localhost:27017/')
  .then(() => {
    console.log('Connected!');
  })
  .catch(err => console.log(err.message));

const unseedDB = async () => {
  await Promise.all([
    User.deleteMany(),
    Team.deleteMany(),
    Match.deleteMany(),
    Field.deleteMany(),
    Result.deleteMany(),
    Reservation.deleteMany()
  ]).catch(err => { throw new Error(err); });
};

unseedDB()
  .then(() => mongoose.connection.close())
  .catch(err => console.log(err));
