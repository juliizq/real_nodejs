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

const getReviews =  Joi.object({
    categoryId: Joi.number().min(1),
    productId: Joi.number().min(1),
    page: Joi.number().min(1),
    size: Joi.number(),
}).options({ allowUnknown : false})



module.exports = {
    createReview,
    getReviews
}