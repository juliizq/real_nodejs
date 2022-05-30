const router =  require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
// router.get('/relogin', auth, authController.relogin)




module.exports = router;