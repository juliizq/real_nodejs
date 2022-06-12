const router =  require('express').Router();
const userController = require('../controllers/user.controller');
const ROLE_LIST = require('../config/roles_list');
const verifyRole = require('../middleware/verifyRole');
const verifyJWT = require('../middleware/verifyJWT');

router.get('/', verifyJWT, verifyRole(ROLE_LIST.Admin), userController.getAll);
router.post('/', verifyJWT, verifyRole(ROLE_LIST.Admin), userController.create);
router.put('/:id', verifyJWT, verifyRole(ROLE_LIST.Admin), userController.update);
router.patch('/:id', verifyJWT, verifyRole(ROLE_LIST.Admin, ROLE_LIST.Moderator, ROLE_LIST.User), userController.patch);
router.delete('/:id', verifyJWT, verifyRole(ROLE_LIST.Admin), userController.delete);

module.exports = router;