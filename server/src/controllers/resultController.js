const { getOne, getAll, deleteOne, createOne, updateOne } = require('./crudController');
const Result = require('../models/Result');

const createResult = async (req, res) => {
  await createOne(Result, req, res);
};

const viewAllResluts = async (req, res) => {
  await getAll(Result, req, res);
};

const viewSingleResult = async (req, res) => {
  await getOne(Result, req, res);
};

const updateResult = async (req, res) => {
  await updateOne(Result, req, res);
};

const deleteResult = async (req, res) => {
  await deleteOne(Result, req, res);
};

module.exports = {
  createResult,
  viewSingleResult,
  viewAllResluts,
  updateResult,
  deleteResult
};
