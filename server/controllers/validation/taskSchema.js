const Joi = require('@hapi/joi');

module.exports = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  category: Joi.string().required(),
  time: Joi.date().required(),
});
