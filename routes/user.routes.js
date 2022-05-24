const router =  require('express').Router();
const userController = require('../controllers/user.controller');
const { authAdmin, auth } = require('../middleware/auth');

router.get('/', auth, userController.getAll);
router.post('/', userController.create);


module.exports = router;
   

