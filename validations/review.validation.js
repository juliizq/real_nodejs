const Joi = require('joi');

const createReview = Joi.object({
    comment: Joi.string()
            .min(20)
            .required(),

    rating: Joi.number()
            .greater(0)
            .less(6)
            .required(),

    weight: Joi.number()
        .required(),

    height: Joi.number()
        .required()

});


module.exports = {
    createReview
}