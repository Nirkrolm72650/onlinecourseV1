const express = require('express');
const router = express.Router();

const userControllers = require('../api/controllers/userControllers');

router.get('/user', userControllers.getUsers);

router.put('/user/:id', userControllers.editOneUser);

router.delete('/user/:id', userControllers.deleteOneUser);

module.exports = router;

