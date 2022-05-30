const router =  require('express').Router();
const userController = require('../controllers/user.controller');
const ROLE_LIST = require('../config/roles_list');
const verifyRole = require('../middleware/verifyRole')

router.get('/', userController.getAll);
router.post('/', verifyRole(ROLE_LIST.Admin, ROLE_LIST.Moderator), userController.create);
router.put('/', verifyRole(ROLE_LIST.Admin, ROLE_LIST.Moderator, ROLE_LIST.User), userController.update);
router.delete('/', verifyRole(ROLE_LIST.Admin), userController.delete);

module.exports = router;