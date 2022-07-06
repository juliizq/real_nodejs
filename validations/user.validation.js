const Joi = require('joi');

const createUser = Joi.object({
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

    role: Joi.string()
        .valid('USER', 'MODERATOR' ,'ADMIN')
        .required()

});

const updateUser =  Joi.object({
    email: Joi.string()
            .email()
            .required(),

    firstName: Joi.string()
        .min(2)
        .max(30)
        .required(),

    lastName: Joi.string()
        .max(30)
        .required(),

    role: Joi.string()
        .valid('USER', 'MODERATOR' , 'ADMIN')
        .required()

});

const patchUser =  Joi.object({
    firstName: Joi.string()
        .min(2)
        .max(30)
        .required(),

    lastName: Joi.string()
        .max(30)
        .required()
});
    

module.exports = {
    createUser,
    updateUser,
    patchUser
}