const router =  require('express').Router();
const refreshTokenController = require('../controllers/refreshToken.controller');
const { authAdmin, auth } = require('../middleware/auth');

router.get('/', refreshTokenController.handleRefreshToken);


module.exports = router;