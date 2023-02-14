const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = [
  {
    _id: new ObjectId('63eb7aa9dda73e59e84aa443'),
    players: [
      new ObjectId('63eb6abf9792291234cd6a75'),
      new ObjectId('63eb6abf9792291234cd6a76'),
      new ObjectId('63eb6abf9792291234cd6a77')
    ],
    color: 'white'
  },
  {
    _id: new ObjectId('63eb7aa9dda73e59e84aa444'),
    players: [
      new ObjectId('63eb788d339bb827e5fe77d2'),
      new ObjectId('63eb788d339bb827e5fe77d3'),
      new ObjectId('63eb788d339bb827e5fe77d4')
    ],
    color: 'black'
  },
  {
    _id: new ObjectId('63eb7aa9dda73e59e84aa445'),
    players: [
      new ObjectId('63eb6abf9792291234cd6a75'),
      new ObjectId('63eb788d339bb827e5fe77d3'),
      new ObjectId('63eb6abf9792291234cd6a77')
    ],
    color: 'white'
  },
  {
    _id: new ObjectId('63eb7aa9dda73e59e84aa446'),
    players: [
      new ObjectId('63eb788d339bb827e5fe77d2'),
      new ObjectId('63eb788d339bb827e5fe77d4'),
      new ObjectId('63eb6abf9792291234cd6a76')
    ],
    color: 'black'
  }
];
