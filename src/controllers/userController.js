const { getOne, createOne, getAll, updateOne } = require('./crudController');
const User = require('../models/User');
const Reservation = require('../models/Reservation');
const { ErrorMessages } = require('../errors/ErrorMessages');
const { NotFoundError } = require('../errors/Errors');
const { HTTP_STATUS } = require('../utils/httpCodes.js');

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
  const exclude = '-num -isScheduled -isCanceled -isFinished -registeredPlayers';

  // eslint-disable-next-line max-len
  const userHistory = await Reservation.find({ registeredPlayers: { $in: [id] } }, exclude)
    .populate('field', 'name')
    .populate({
      path: 'match',
      populate: {
        path: 'whiteTeam',
        select: 'players ',
        populate: {
          path: 'players',
          select: 'username'
        }
      }
    })
    .populate({
      path: 'match',
      populate: {
        path: 'blackTeam',
        select: 'players',
        populate: {
          path: 'players',
          select: 'username'
        }
      }
    });

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
