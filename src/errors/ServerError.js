class ServerError extends Error {
  constructor (...args) {
    super(...args);
    Error.captureStackTrace(this, ServerError);

    this.isSuccess = false;
    this.status = args[0].status;
    this.message = args[0].message;
  }
}

module.exports = { ServerError };
