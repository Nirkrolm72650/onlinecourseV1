const express = require('express');
const router = express.Router();

const mdp_oublieControllers = require('../api/controllers/mdp_oublieControllers');

router.get('/', mdp_oublieControllers.mdpOublie);



module.exports = router;