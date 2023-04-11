const express = require('express');
const router = express.Router();

const adminControllers = require('../api/controllers/adminControllers');

//router.get('/', adminControllers.admin);

router.get('/', adminControllers.getUsers);

router.put('/:id', adminControllers.updateUser);

router.delete('/:id', adminControllers.deleteUser);

module.exports = router;