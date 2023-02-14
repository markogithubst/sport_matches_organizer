const mongoose = require('mongoose');

const User = require('../models/User');
const Team = require('../models/Team');
const Reservation = require('../models/Reservation');
const Match = require('../models/Match');
const Result = require('../models/Result');
const Field = require('../models/Field');

const users = require('./seedData/users');
const teams = require('./seedData/teams');
const reservations = require('./seedData/reservations');
const matches = require('./seedData/matches');
const results = require('./seedData/results');
const fields = require('./seedData/fields');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://root:root@localhost:27017/')
  .then(() => {
    console.log('Connected!');
  })
  .catch(err => console.log(err.message));

const seedDB = async () => {
  await User.deleteMany();
  await Team.deleteMany();
  await Match.deleteMany();
  await Field.deleteMany();
  await Result.deleteMany();
  await Reservation.deleteMany();

  await User.insertMany(users);
  await Team.insertMany(teams);
  await Field.insertMany(fields);
  await Match.insertMany(matches);
  await Result.insertMany(results);
  await Reservation.insertMany(reservations);
};

seedDB()
  .then(() => mongoose.connection.close())
  .catch(err => console.log(err));
