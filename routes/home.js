const express = require('express');
const router = express.Router();

const homeControllers = require('../api/controllers/HomeControllers');

router.get('/', homeControllers.home);