const { getOne, getAll, deleteOne, createOne, updateOne } = require('./crudController');
const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');
const { ErrorMessages } = require('../errors/errorMessages');
const { NotFoundError } = require('../errors/Errors');

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

  res.json('success');
};

module.exports = {
  createReservation,
  viewAllReservations,
  viewSingleReservation,
  updateReservation,
  deleteReservation,
  cancelReservation,
  addPlayerToReservation
};
