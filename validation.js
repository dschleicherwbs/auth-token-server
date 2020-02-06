// Validation
const Joi = require('@hapi/joi');

const registerValidation = data => {
  const userRegisterSchmea = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });
  return userRegisterSchmea.validate(data);
};

const loginValidation = data => {
  const userLoginSchmea = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string().required()
  });
  return userLoginSchmea.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
