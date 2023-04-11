const express = require('express');
const router = express.Router();

const messageControllers = require('../api/controllers/messageControllers');

router.get('/messages', messageControllers.getMessages);


module.exports = router;