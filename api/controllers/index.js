// Index.js permet de lister toutes les fonctions qui seront utilisées


// HOME
const { home, connexion, profil ,contact, Creationcours, inscription, seeCourses, user, mdpOublie } = require('./HomeControllers');
// AUTH
const { connectUser, inscripUser, deconnexion } = require('./AuthControllers')
// USER + CRUD
const { getUsers, updateUser, deleteOneUser, editOneUser } = require('./UserControllers');
// PROFIL
const {getProfilUser, updateProfil } = require('./ProfilControllers');
// COURS + CRUD
const { getCours, postCours, getSeeCourses, getAllCours, updateCours ,deleteCours } = require('./CoursControllers')
// ADMIN
const { admin } = require('./AdminControllers');
// MAIL
const { verificationMail, verificationMailPost, sendMailContact, sendVerif, verifMail, updatePassword } = require('./MailControllers');

const { getMessage } = require('./MessageControllers');

module.exports = {
    // Home
    home, connexion, contact, admin, Creationcours, profil ,inscription, seeCourses, user, mdpOublie,
    // Auth
    connectUser, inscripUser, deconnexion,
    // User + CRUD
    getUsers, updateUser, deleteOneUser, getProfilUser, updateProfil, editOneUser,
    // Cours + CRUD
    getCours, postCours, getSeeCourses, getAllCours, updateCours ,deleteCours,
    // Admin
    admin,
    // Mail
    verificationMail, verificationMailPost, sendMailContact, sendVerif, verifMail, getMessage
}