const express = require('express');
const router = express.Router();

const coursControllers = require('../api/controllers/coursControllers');




//router.get('/cours', coursControllers.cours);
router.get('/cours/:id', coursControllers.getCours);

// router.get('/cours/:id', (req, res) => {
//     res.json(coursControllers.getCours(req.params.id));
// })

module.exports = router;