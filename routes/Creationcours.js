const express = require('express');
const router = express.Router();

const coursControllers = require('../api/controllers/CreationcoursControllers'); 

router.get('/Creationcours', coursControllers.Creationcours);

router.post('/Creationcours', coursControllers.postCours);

module.exports = router;