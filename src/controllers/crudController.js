const { ErrorTypes } = require('../errors/errorTypes');
const { ServerError } = require('../errors/ServerError');

const getOne = async (model, req, res) => {
	const { id } = req.params;
	const dataFound = await model.findById(id);
	if(!dataFound) throw new ServerError(ErrorTypes.notFound);

	res.status(200).json({ success: true, data: dataFound });
};

const getAll = async (model, req, res) => {
	const dataFound = await model.find();
	res.status(200).json({ success: true, data: dataFound });
};

const deleteOne = async (model, req, res) => {
	const { id } = req.params;
	const datadeleted = await model.findByIdAndDelete(id);
	if(!datadeleted) throw new ServerError(ErrorTypes.notFound);

	res.status(200).json({ success: true, data: datadeleted });
};

const createOne = async (model, req, res) => {
	const dataCreated = await model.create(req.body);
	res.status(201).json({ success: true, data: dataCreated });
};

const updateOne = async (model, req, res) => {
	const { id } = req.params;
	const dataUpdated = await model.findByIdAndUpdate(id, req.body, {
		new: true,
	});
	if(!dataUpdated) throw new ServerError(ErrorTypes.notFound);
    
	res.status(200).json({ success: true, data: dataUpdated });
};

module.exports = {
	getOne,
	getAll,
	deleteOne,
	createOne,
	updateOne
};