const { getOne, createOne, getAll, deleteOne, updateOne } = require('./crudController');
const User = require('../models/User');
const Reservation = require('../models/Reservation');
const { ErrorMessages } = require('../errors/errorMessages');
const { NotFoundError } = require('../errors/Errors');

const registerUser = async (req, res) => {
  await createOne(User, req, res);
};

const viewAllUsers = async (req, res) => {
  await getAll(User, req, res);
};

const viewSingleUser = async (req, res) => {
  await getOne(User, req, res);
};

const updateUser = async (req, res) => {
  await updateOne(User, req, res);
};

const deleteUser = async (req, res) => {
  await deleteOne(User, req, res);
};

const viewHistory = async (req, res) => {
  const { id } = req.params;
  const matches = await Reservation.find({
    registeredPlayers: { $in: [id] },
    isFinished: true
  }).populate('match', 'result');

  if (!matches.length) throw new NotFoundError(ErrorMessages.dataNotFound);

  res.status(200).json(matches);
};

module.exports = {
  registerUser,
  viewAllUsers,
  viewSingleUser,
  updateUser,
  deleteUser,
  viewHistory
};
