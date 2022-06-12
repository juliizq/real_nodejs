const router =  require('express').Router();
const reviewController = require('../controllers/review.controller');
const verifyJWT = require('../middleware/verifyJWT');

router.get('/', reviewController.getAll);
router.get('/:id', reviewController.getDetail);
router.post('/', verifyJWT ,reviewController.create)


module.exports = router;
