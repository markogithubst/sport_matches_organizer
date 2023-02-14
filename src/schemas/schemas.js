const Joi = require('joi');

const idSchema = Joi.object({
  id: Joi.string().min(3).max(50).hex().required()
});

const fieldSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  address: Joi.string().min(3).max(50).required()
}).options({ abortEarly: false });

const matchSchema = Joi.object({
  whiteTeam: Joi.array().items(Joi.string()).max(3),
  blackTeam: Joi.array().items(Joi.string()).max(3),
  result: Joi.string().min(3).max(50).hex().required()
}).options({ abortEarly: false });

const reservationSchema = Joi.object({
  field: Joi.string().min(3).max(50).hex().required(),
  match: Joi.string().min(3).max(50).hex().required(),
  status: Joi.boolean().required(),
  isFilled: Joi.boolean().required(),
  registeredPlayers: Joi.array().items(Joi.string()).max(6)
}).options({ abortEarly: false });

const resultSchema = Joi.object({
  whiteTeamScore: Joi.number().min(1).max(30).required(),
  blackTeamScore: Joi.number().min(1).max(30).required()
}).options({ abortEarly: false });

const teamSchema = Joi.object({
  players: Joi.string().min(3).max(50).hex().required(),
  color: Joi.string().valid('white', 'black').required()
}).options({ abortEarly: false });

const userSchema = Joi.object({
  username: Joi.string().min(4).max(16).required(),
  name: Joi.string().min(3).max(25).required(),
  surname: Joi.string().min(3).max(25).required(),
  email: Joi.string().min(3).max(50).email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(8).max(50),
  phone: Joi.string().regex(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/).required(),
  role: Joi.string().valid('ADMIN', 'USER').required()

}).options({ abortEarly: false });

module.exports = {
  idSchema,
  fieldSchema,
  matchSchema,
  reservationSchema,
  resultSchema,
  teamSchema,
  userSchema
};
