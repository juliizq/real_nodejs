const router =  require('express').Router();
const authController = require('../controllers/auth.controller');
const { authAdmin, auth } = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/relogin', auth, authController.relogin)




module.exports = router;