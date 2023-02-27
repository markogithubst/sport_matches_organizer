const { getOne, createOne, getAll, updateOne } = require('./crudController');
const User = require('../models/User');
const Reservation = require('../models/Reservation');
const { ErrorMessages } = require('../errors/ErrorMessages');
const { NotFoundError } = require('../errors/Errors');
const { HTTP_STATUS } = require('../utils/httpCodes.js');
const { userHistoryAggregate } = require('../utils/userHistoryAggregate');

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
  const { id } = req.params;

  const userToDelete = await User.findByIdAndDelete(id);

  if (userToDelete) {
    await Reservation.updateMany({
      registeredPlayers: { $in: [id] }
    },
    {
      $inc: { num: -1 },
      $pull: { registeredPlayers: id }
    });
  } else {
    throw new NotFoundError(ErrorMessages.dataNotFound);
  }

  res.status(HTTP_STATUS.OK).json({ success: true, message: `${userToDelete.username} deleted!` });
};

const viewHistory = async (req, res) => {
  const { id } = req.params;

  const userHistory = await userHistoryAggregate(id);

  if (!userHistory.length) throw new NotFoundError(ErrorMessages.dataNotFound);

  res.status(200).json(userHistory);
};

module.exports = {
  registerUser,
  viewAllUsers,
  viewSingleUser,
  updateUser,
  deleteUser,
  viewHistory
};
