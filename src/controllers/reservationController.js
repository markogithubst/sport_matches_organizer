const { getOne, getAll, deleteOne, createOne, updateOne } = require('./crudController');
const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');
const { ErrorMessages } = require('../errors/errorMessages');
const { NotFoundError, AuthorizationError } = require('../errors/Errors');

const createReservation = async (req, res) => {
  await createOne(Reservation, req, res);
};

const viewAllReservations = async (req, res) => {
  await getAll(Reservation, req, res);
};

const viewSingleReservation = async (req, res) => {
  await getOne(Reservation, req, res);
};

const updateReservation = async (req, res) => {
  await updateOne(Reservation, req, res);
};

const deleteReservation = async (req, res) => {
  await deleteOne(Reservation, req, res);
};

const cancelReservation = async (req, res) => {
  const { id } = req.params;

  const dataUpdated = await Reservation.findByIdAndUpdate(id, { isCanceled: true }, {
    new: true
  });

  if (!dataUpdated) throw new NotFoundError(ErrorMessages.dataNotFound);

  res.status(200).json({ success: true, data: dataUpdated });
};

const addPlayerToReservation = async (req, res) => {
  const player = req.params.playerId;

  await Reservation
    .updateOne({ _id: req.params.id },
      {
        $addToSet: { registeredPlayers: mongoose.Types.ObjectId(player) },
        $inc: { num: 1 }
      });

  res.status(200).json({ success: true });
};

const removePlayerFromReservation = async (req, res) => {
  const player = req.params.playerId;
  if (player !== req.user.id) {
    throw new AuthorizationError(ErrorMessages.unauthorized);
  }
  await Reservation
    .updateOne({ _id: req.params.id },
      {
        $pull: { registeredPlayers: mongoose.Types.ObjectId(player) },
        $inc: { num: -1 }
      });

  res.status(200).json({ success: true });
};

const filterReservation = async (req, res) => {
  const { hour, dayOfWeek, date } = req.query;
  const exclude = '-registeredPlayers -num';
  const startDateTime = new Date(`${date}T00:00:00.000+00:00`);
  const endDateTime = new Date(`${date}T23:59:00.000+00:00`);

  const findQuery = {};
  const andCond = [];

  if (hour && hour !== '') {
    andCond.push({ $expr: { $eq: [{ $hour: '$time' }, hour] } });
  }
  if (dayOfWeek && dayOfWeek !== '') {
    andCond.push({ $expr: { $eq: [{ $dayOfWeek: '$time' }, parseInt(dayOfWeek)] } });
  }
  if (andCond.length > 0) findQuery.$and = andCond;

  if (date && date !== '') {
    findQuery.time = { $gte: startDateTime, $lte: endDateTime };
  }

  const filteredReservation = await Reservation.find(findQuery, exclude);

  if (!filteredReservation.length) throw new NotFoundError(ErrorMessages.dataNotFound);

  res.status(200).json({ filteredReservation });
};

module.exports = {
  createReservation,
  viewAllReservations,
  viewSingleReservation,
  updateReservation,
  deleteReservation,
  cancelReservation,
  addPlayerToReservation,
  removePlayerFromReservation,
  filterReservation
};
