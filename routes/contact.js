const express = require('express');
const router = express.Router();

const contactControllers = require('../api/controllers/contactController');

router.get('/', contactControllers.contact);


module.exports = router;