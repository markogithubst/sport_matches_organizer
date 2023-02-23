const { getOne, getAll, deleteOne, updateOne } = require('./crudController');
const Team = require('../models/Team');

const viewAllTeams = async (req, res) => {
  await getAll(Team, req, res);
};

const viewSingleTeam = async (req, res) => {
  await getOne(Team, req, res);
};

const updateTeam = async (req, res) => {
  await updateOne(Team, req, res);
};

const deleteTeam = async (req, res) => {
  await deleteOne(Team, req, res);
};

module.exports = {
  viewAllTeams,
  viewSingleTeam,
  updateTeam,
  deleteTeam
};
