const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = [
  {
    _id: new ObjectId('63eb7f4a8bda2a035ce6454c'),
    whiteTeam: new ObjectId('63eb7aa9dda73e59e84aa443'),
    blackTeam: new ObjectId('63eb7aa9dda73e59e84aa444'),
    result: new ObjectId('63eb7dfe5f58194a262d8276')
  },
  {
    _id: new ObjectId('63eb7f4a8bda2a035ce6454d'),
    whiteTeam: new ObjectId('63eb7aa9dda73e59e84aa445'),
    blackTeam: new ObjectId('63eb7aa9dda73e59e84aa446'),
    result: new ObjectId('63eb7dfe5f58194a262d8277')
  }
];
