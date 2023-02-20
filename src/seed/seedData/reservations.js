const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = [
  {
    field: new ObjectId('63eb76f1c6a15537f1bbb59f'),
    match: new ObjectId('63eb7f4a8bda2a035ce6454c'),
    time: '2023-03-27T12:00:00Z',
    isCanceled: false,
    isFilled: true,
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
    time: '2023-03-25T13:00:00Z',
    isCanceled: false,
    isFilled: true,
    registeredPlayers: [
      new ObjectId('63eb6abf9792291234cd6a75'),
      new ObjectId('63eb788d339bb827e5fe77d3'),
      new ObjectId('63eb6abf9792291234cd6a77'),
      new ObjectId('63eb788d339bb827e5fe77d2'),
      new ObjectId('63eb788d339bb827e5fe77d3'),
      new ObjectId('63eb6abf9792291234cd6a76')
    ]

  },
  {
    field: new ObjectId('63eb76f1c6a15537f1bbb5a1'),
    match: new ObjectId('63eb7f4a8bda2a035ce6454d'),
    time: '2023-03-28T10:00:00Z',
    isCanceled: false,
    isFilled: false,
    registeredPlayers: [
      new ObjectId('63eb6abf9792291234cd6a75'),
      new ObjectId('63eb788d339bb827e5fe77d3'),
      new ObjectId('63eb6abf9792291234cd6a77'),
      new ObjectId('63eb788d339bb827e5fe77d2')
    ]

  },
  {
    field: new ObjectId('63eb76f1c6a15537f1bbb5a0'),
    match: new ObjectId('63eb7f4a8bda2a035ce6454d'),
    time: '2023-03-24T19:00:00Z',
    isCanceled: true,
    isFilled: false,
    registeredPlayers: [
      new ObjectId('63eb6abf9792291234cd6a75'),
      new ObjectId('63eb788d339bb827e5fe77d3'),
      new ObjectId('63eb6abf9792291234cd6a77'),
      new ObjectId('63eb788d339bb827e5fe77d2')
    ]

  }
];
