const { getOne, getAll, deleteOne, createOne, updateOne  } = require('./crudController');
const Team = require('../models/Team');

const  createTeam= async (req, res) => {
	await createOne(Team, req, res);
};

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
	createTeam,
	viewAllTeams,
	viewSingleTeam,
	updateTeam,
	deleteTeam
};