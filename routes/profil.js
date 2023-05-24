const express = require('express');
const router = express.Router();

const profilControllers = require('../api/controllers/ProfilControllers');


router.get('/profil/:id', profilControllers.getProfilUser);

router.put('/profil/:id', profilControllers.updateProfil);

module.exports = router;