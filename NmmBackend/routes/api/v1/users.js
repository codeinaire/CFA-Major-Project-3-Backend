const express = require('express');

const userController = require('../../../controllers/userController');

const router = express.Router();

const User = require('../../../models/Users');

router.get('/', userController.getUsers);

router.post('/', userController.createUser);

router.get('/:user_id', userController.getUser);

router.put('/:user_id', userController.updateUser);

router.delete('/:user_id', userController.deleteUser);

module.exports = router;
