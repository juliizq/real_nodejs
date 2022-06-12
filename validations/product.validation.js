const Joi = require('joi');

const getProducts =  Joi.object({
    name: Joi.string(),
    page: Joi.number().min(1),
    size: Joi.number(),
}).options({ allowUnknown : false})

module.exports = {
    getProducts
}