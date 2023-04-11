const express = require('express');
const router = express.Router();

const deconnexionControllers = require('../api/controllers/deconnexionControllers');

router.use('/', deconnexionControllers.deconnexion);

module.exports = router;