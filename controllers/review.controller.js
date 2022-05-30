const db = require('../models');
const {createReview} = require('../validations/review.validation')

module.exports = {
    
    getAll(req, res){
        return db.Review.findAll()
            .then((data) => {
                res.json(data)
            }).catch((err) =>{
                res.status(400).json(err)
            })
    },
    
    async create(req, res){
    
        try{
            const validation = createReview.validate(req.body);

        if(validation.error){
            return res.sendStatus(400).json(validation.error)
        }

        const review = {
            comment : req.body.comment,
            rating : req.body.rating,
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
            return res.sendStatus(500).json('Something wrong happened');

        }

    },


}