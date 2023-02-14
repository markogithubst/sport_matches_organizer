const { getOne, getAll, deleteOne, createOne, updateOne } = require('./crudController');
const Match = require('../models/Match');

const createMatch = async (req, res) => {
  await createOne(Match, req, res);
};

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
  createMatch,
  viewAllMacthes,
  viewSingleMatch,
  updateMatch,
  deleteMatch
};
