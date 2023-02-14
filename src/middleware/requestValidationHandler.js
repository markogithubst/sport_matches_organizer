// eslint-disable-next-line max-len
const { idSchema, fieldSchema, matchSchema, reservationSchema, resultSchema, teamSchema, userSchema } = require('../schemas/schemas');
const { validateSchema } = require('../schemas/validateSchema');

const validateId = (req, res, next) => {
  const { error } = idSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateField = validateSchema(fieldSchema);

const validateMatch = validateSchema(matchSchema);

const validateReservation = validateSchema(reservationSchema);

const validateResult = validateSchema(resultSchema);

const validateTeam = validateSchema(teamSchema);

const validateUser = validateSchema(userSchema);

module.exports = {
  validateId,
  validateField,
  validateMatch,
  validateReservation,
  validateResult,
  validateTeam,
  validateUser
};
