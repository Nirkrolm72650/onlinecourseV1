const express = require('express');
const router = express.Router();

const visiteurControllers = require('../api/controllers/visiteurControllers');

router.get('/', visiteurControllers.visiteur);


module.exports = router;