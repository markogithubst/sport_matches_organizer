const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');

const userHistoryAggregate = async (id) => {
  const userHistory = await Reservation.aggregate([
    {
      $match: {
        registeredPlayers: mongoose.Types.ObjectId(id),
        isFinished: true
      }
    },
    {
      $lookup: {
        from: 'matches',
        localField: 'match',
        foreignField: '_id',
        as: 'match'
      }
    },
    {
      $unwind: '$match'
    },
    {
      $lookup: {
        from: 'teams',
        localField: 'match.whiteTeam',
        foreignField: '_id',
        as: 'match.whiteTeam'
      }
    },
    {
      $lookup: {
        from: 'teams',
        localField: 'match.blackTeam',
        foreignField: '_id',
        as: 'match.blackTeam'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'match.whiteTeam.players',
        foreignField: '_id',
        as: 'match.whiteTeam.players'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'match.blackTeam.players',
        foreignField: '_id',
        as: 'match.blackTeam.players'
      }
    },
    {
      $lookup: {
        from: 'fields',
        localField: 'field',
        foreignField: '_id',
        as: 'field'
      }
    },
    {
      $lookup: {
        from: 'results',
        localField: 'match.result',
        foreignField: '_id',
        as: 'result'
      }
    },
    {
      $project: {
        _id: 1,
        time: 1,
        field: '$field.name',
        match: {
          result: {
            whiteTeamScore: '$result.whiteTeamScore',
            blackTeamScore: '$result.blackTeamScore'
          },
          whiteTeam: {
            players: {
              _id: 1,
              username: 1
            }
          },
          blackTeam: {
            players: {
              _id: 1,
              username: 1
            }
          }
        }
      }
    }
  ]);

  return userHistory;
};

module.exports.userHistoryAggregate = userHistoryAggregate;
