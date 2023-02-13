

const errorHandler = (err, req, res, next) => {
	let status;
	let msg;

	status = err.status || 500;
	msg = err.error || err.message;
	

	res.status(status).send({ status, error: msg });
	next();
};

const callbackErrorHandler = (callback) => {
	return (req, res, next) => callback(req, res, next)
		.catch(next);
};
module.exports = { errorHandler, callbackErrorHandler };

