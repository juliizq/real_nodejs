const Joi = require('joi');

const registerValidation = Joi.object({
    email: Joi.string()
            .email()
            .required(),

    password: Joi.string()
            .min(3)
            .max(30)
            .required(),

    firstName: Joi.string()
            .min(2)
            .max(30)
            .required(),

    lastName: Joi.string()
            .max(30)
            .required(),

    country : Joi.string()
            .required(),

    city : Joi.string()
            .required()
});

const loginValidation = Joi.object({
    email : Joi.string()
        .min(3)
        .required(),
    
    password : Joi.string()
        .min(3)
        .required()
});
    

module.exports = {
    registerValidation,
    loginValidation
}