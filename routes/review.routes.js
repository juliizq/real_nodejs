const router =  require('express').Router();
const reviewController = require('../controllers/review.controller')

router.get('/', reviewController.getAll);
router.post('/', reviewController.create)


module.exports = router;
