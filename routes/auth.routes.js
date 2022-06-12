const router =  require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/register', authController.register);
router.post('/logout', authController.logout);




module.exports = router;