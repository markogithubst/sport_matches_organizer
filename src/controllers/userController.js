const { getOne, getAll, deleteOne, createOne, updateOne  } = require('./crudController');
const User = require('../models/User');

const createUser = async (req, res) => {
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


module.exports = {
	createUser,
	viewAllUsers,
	viewSingleUser,
	updateUser,
	deleteUser
};