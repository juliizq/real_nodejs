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
        .valid('USER', 'ADMIN')
        .required(),

    country : Joi.string()
            .required(),

    city : Joi.string()
        .required()

});

// const updateUser =  Joi.object({
//     fullname:Joi.string()
//         .min(3)
//         .max(30),

//     password: Joi.string()
//         .min(3)
//         .max(30),

//     email: Joi.string()
//         .email(),

//     role :  Joi.string()
//         .valid('USER', 'ADMIN'),
// });
    
// const partialUpdate = Joi.object({
//     fullname:Joi.string()
//         .min(3)
//         .max(30),

//     password: Joi.string()
//         .min(3)
//         .max(30),

//     email: Joi.string()
//         .email()
// })

module.exports = {
    createUser
    // updateUser,
    // partialUpdate
}