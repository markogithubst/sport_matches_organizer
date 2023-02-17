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

const filterByDate = async (req, res) => {
  const { date } = req.query;
  const startDateTime = new Date(`${date}T00:00:00.000+00:00`);
  const endDateTime = new Date(`${date}T23:59:00.000+00:00`);

  const reservationsByDate = await Reservation.find({
    time: {
      $gte: startDateTime,
      $lte: endDateTime
    }
  });

  if (reservationsByDate.length === 0) throw new NotFoundError(ErrorMessages.dataNotFound);

  res.status(200).json({
    message: 'Reservations fetched successfully',
    reservationsByDate
  });
};

const filterByHour = async (req, res) => {
  const { hour } = req.query;

  const reservationsByHour = await Reservation.find({
    $expr: { $eq: [{ $hour: '$time' }, hour] }
  });

  if (reservationsByHour.length === 0) throw new NotFoundError(ErrorMessages.dataNotFound);
  res.status(200).json({
    message: 'Reservations fetched successfully',
    reservationsByHour
  });
};

const filterByDayOfWeek = async (req, res) => {
  const { dayOfWeek } = req.query;

  const reservationsByDayOfWeek = await Reservation.find({
    $expr: {
      $eq: [{ $dayOfWeek: '$time' }, parseInt(dayOfWeek)]
    }
  });

  if (reservationsByDayOfWeek.length === 0) throw new NotFoundError(ErrorMessages.dataNotFound);
  res.status(200).json({
    message: 'Reservations fetched successfully',
    reservationsByDayOfWeek
  });
};

module.exports = {
  createReservation,
  viewAllReservations,
  viewSingleReservation,
  updateReservation,
  deleteReservation,
  cancelReservation,
  addPlayerToReservation,
  filterByDate,
  filterByHour,
  filterByDayOfWeek,
  removePlayerFromReservation
};
