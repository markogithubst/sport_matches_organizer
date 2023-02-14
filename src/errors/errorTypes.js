const ErrorTypes = {
  notFound: {
    status: 404,
    message: 'Data not found'
  },
  notValid: {
    status: 400,
    message: 'Invalid request parameters'
  }
};

module.exports = {
  ErrorTypes
};
