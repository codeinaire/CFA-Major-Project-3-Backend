const express = require('express');

const userController = require('../../../controllers/userController');

const router = express.Router();

const User = require('../../../models/Users');

router.get('/', userController.getUsers);

router.post('/', userController.apiCreateUser);

router.get('/:user_id', userController.apiGetUser);

router.put('/:user_id', userController.apiUpdateUser);

router.delete('/:user_id', userController.apiDeleteUser);

module.exports = router;
