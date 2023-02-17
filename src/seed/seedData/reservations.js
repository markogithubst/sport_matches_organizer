const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = [
  {
    field: new ObjectId('63eb76f1c6a15537f1bbb59f'),
    match: new ObjectId('63eb7f4a8bda2a035ce6454c'),
    time: '2023-03-25T12:00:00Z',
    isCanceled: false,
    isFilled: true,
    time: '2023-02-17T14:00',
    registeredPlayers: [
      new ObjectId('63eb6abf9792291234cd6a75'),
      new ObjectId('63eb6abf9792291234cd6a76'),
      new ObjectId('63eb6abf9792291234cd6a77'),
      new ObjectId('63eb788d339bb827e5fe77d2'),
      new ObjectId('63eb788d339bb827e5fe77d3'),
      new ObjectId('63eb788d339bb827e5fe77d4')
    ]

  },
  {
    field: new ObjectId('63eb76f1c6a15537f1bbb59f'),
    match: new ObjectId('63eb7f4a8bda2a035ce6454d'),
    time: '2023-03-25T12:00:00Z',
    isCanceled: false,
    isFilled: true,
    time: '2023-02-20T14:00',
    registeredPlayers: [
      new ObjectId('63eb6abf9792291234cd6a75'),
      new ObjectId('63eb788d339bb827e5fe77d3'),
      new ObjectId('63eb6abf9792291234cd6a77'),
      new ObjectId('63eb788d339bb827e5fe77d2'),
      new ObjectId('63eb788d339bb827e5fe77d3'),
      new ObjectId('63eb6abf9792291234cd6a76')
    ]

  }
];
