const db = require('../models');
const { getPagination, getPagingData } = require('../utils/pagination');
const { buildWhere } = require('../utils/query');
const { createReview, getReviews } = require('../validations/review.validation');
const sequelize = require('sequelize');

module.exports = {
    
    async getAll(req, res){
        try{
            const validation = getReviews.validate(req.query);

            if(validation.error){
                return res.status(400).json(validation.error)
            }

            const { page = 1, size =  10, ...filters } =  req.query;

            // Get correct limit/offset
            const { offset, limit } = getPagination(page, size);
            
            const includeProduct = { model : db.Product };
            
            // Filters in nested model Product
            if(filters.categoryId){
                includeProduct.where = { categoryId : filters.categoryId }
                delete filters.categoryId;
            }

    
            const where = buildWhere(filters);

            // Get total
            const total = await await db.Review.findAndCountAll({ where, include: includeProduct });

            // const includeUser = { 
            //     model : db.User,
            //     attributes: {
            //         include: [[sequelize.fn("COUNT", sequelize.col("Review.id")), "totalReview"]] 
            //     },
            //     include: [{
            //         model: db.Review, attributes: []
            //     }],
            //     group: [sequelize.col('User.id')]
            // };

            const includeUser = { 
                model : db.User,
                // attributes: {
                //     include: [[sequelize.fn("COUNT", sequelize.col("Review.id")), "totalReview"]] 
                // },
                // include: [{
                //     model: db.Review, attributes: []
                // }],
                // required: true
            };
            
            // Get items paginate
            const { rows : reviews } = await db.Review.findAndCountAll({
                where,
                offset,
                limit,
                include : [includeProduct, includeUser],
                order: [ ['id', 'DESC'] ],
            });

            for(const review of reviews){
              const totalReview = await db.Review.count({ where : { UserId : review.UserId}});
              review.User.dataValues.totalReview = totalReview;
            }

            // Get items paginate
            // const { rows : reviews } = await db.Review.findAndCountAll({
            //     where,
            //     offset,
            //     limit,
            //     include : [includeProduct, includeUser],
            //     order: [ ['id', 'DESC'] ],
            // });

            // Get pagination
            const { totalItems, totalPages, currentPage } = getPagingData(total, page, size);
      
            return res.status(200).json({ totalItems, totalPages, currentPage , reviews });
        }catch(error){
            console.log('error:', error);
            if(error.status){
                return res.status(error.status).json(error.message);
            }
            return res.status(500).json('Something wrong happened');
        }
    },

    getDetail(req, res){
        return db.Review.findOne({ where : { id : req.params.id}, include : { model : db.Product } })
        .then((review) => {
            if(!review){
                return res.status(404)
            }
            return res.json(review)
        }).catch((err) =>{
            res.status(500).json(err)
        })
    },
    
    async create(req, res){
    
        try{
            const validation = createReview.validate(req.body);

        if(validation.error){
            return res.status(400).json(validation.error)
        }

        const review = {
            comment : req.body.comment,
            ratingGlobally : req.body.ratingGlobally,
            ratingRealToSize : req.body.ratingRealToSize,
            ratingConfort : req.body.ratingConfort,
            ratingQuality : req.body.ratingQuality,
            size : req.body.size,
            weight : req.body.weight,
            height : req.body.height
        }

        const savedReview = await db.Review.create(review);
        res.json(savedReview)

        }catch(error){
            console.log('error:', error)
            if(error.name === 'ValidationError'){
              return res.status(400).json({errors : error.details});
            }
            return res.status(500).json('Something wrong happened');
        }

    },


}