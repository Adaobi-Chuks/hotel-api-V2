const Joi = require("joi");

class Validate {

  validateFullName


  validateUser(user) {
    const schema = Joi.object({
      fullName: Joi.string().required().min(3).max(100).trim(),
      email: Joi.string().email().required().lowercase().trim(),
      password: Joi.string().required().min(8).max(20),
      age: Joi.number().required().min(18),
      nationality: Joi.string().required().trim(),
      role: Joi.string().lowercase()
    });

    return schema.validate(user, {abortEarly: false});
  }
}

module.exports = new Validate();