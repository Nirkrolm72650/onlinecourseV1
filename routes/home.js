const express = require('express');
const router = express.Router();

const homeControllers = require('../api/controllers/homeControllers');

router.get('/', homeControllers.home);