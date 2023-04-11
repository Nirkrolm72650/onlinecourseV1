const express = require('express');
const upload = require('../api/config/multer');
const router = express.Router();

const inscriptionControllers = require('../api/controllers/inscriptionControllers');

router.get('/', inscriptionControllers.inscription);
//router.route('/inscription').post(upload.single('avatar'), inscriptionControllers.inscripUser);

module.exports = router;