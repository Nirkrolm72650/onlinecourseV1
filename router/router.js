require('dotenv').config()
const { MODE } = process.env
const express = require('express');
const router = express.Router();

// connexion avec la base de donnée
const db = require('../api/database/database');

// Import des controllers
const { home, connexion, editOneUser, profil, contact, Creationcours,
        inscription, seeCourses, user, connectUser, inscripUser,
        deconnexion, getUsers, updateUser, deleteOneUser, getCours, postCours,
        getSeeCourses, getAllCours, admin, verificationMail, verificationMailPost, sendMailContact,
        deleteCours, updateCours, sendVerif, verifMail, getProfilUser, updateProfil, mdpOublie, updatePassword, getMessage } = require("../api/controllers");

// Import des middlewares
const {isAdmin} = require('../api/middlewares/admin.middleware.js');
const {isVisiteur} = require('../api/middlewares/visiteur.middleware.js');
const {isAuthenticated} = require('../api/middlewares/auth.middleware.js');

// Multer
const upload = require('../api/config/multer');


// Page Home
router.route('/')
        .get(home)
        .post(sendMailContact)

// Auth
router.route('/connexion')
        .get(connexion)
        .post(connectUser)

router.route('/inscription')
        .get(inscription)
        .post(upload.single('avatar'), inscripUser)

router.route('/mdpOublie')
        .get(mdpOublie)

router.route('/deconnexion')
        .get(deconnexion)

// Profil


router.route('/profil')
        .get(isAuthenticated ,isAdmin, isVisiteur, getProfilUser);
router.route('/profil/:id')
        .put(upload.single('avatar'), updateProfil)

// Cours + CRUD
router.route('/seeCourses')
        .get(getSeeCourses, isVisiteur, isAdmin)
router.route('/cours/:id')
        .get(getCours, isAdmin);


router.route('/Creationcours')
        .get(Creationcours, isAdmin)
        .post(upload.single('avatar'), postCours)
router.route('/Creationcours/contenu/:id')
        .get(getCours) 
        .put(updateCours)

// User + CRUD
router.use(isAdmin)
router.route('/user')
        .get(getUsers)

router.route('/user/:id')
        .put(updateUser)
        .delete(deleteOneUser)

// Admin
router.use(isAdmin)
router.route('/admin')
        .get(getAllCours)

router.route('/admin/:id')
        .put(updateCours)
        .delete(deleteCours)


// Message
router.route('/message')
        .get(getMessage)



// // /******************Page 404*********************/
router.use('*', function (req, res) {
    res.status(404).render("404", {
        layout: '404'
    });
});
// /****************** Fin Page 404*********************/



module.exports = router;