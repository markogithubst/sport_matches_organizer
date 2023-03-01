const { getOne, getAll, deleteOne, updateOne } = require('./crudController');
const Match = require('../models/Match');

const viewAllMacthes = async (req, res) => {
  await getAll(Match, req, res);
};

const viewSingleMatch = async (req, res) => {
  await getOne(Match, req, res);
};

const updateMatch = async (req, res) => {
  await updateOne(Match, req, res);
};

const deleteMatch = async (req, res) => {
  await deleteOne(Match, req, res);
};

module.exports = {
  viewAllMacthes,
  viewSingleMatch,
  updateMatch,
  deleteMatch
};
