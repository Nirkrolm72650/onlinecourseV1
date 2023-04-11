// require('dotenv').config()
// const bcrypt = require('bcrypt');
// const flash = require('flash');
// const { setSession } = require('../../utils/setSession');
// const { db } = require('../../api/database/database');
// const { MODE } = process.env


// describe("LOGIN", function () {
//     it("TEST LOGIN", function () {
//         const { email, password } = req.body;

//         db.query(`SELECT password FROM users WHERE email="${email}"`, function (err, data) {
//             if (err) throw err;

//             if (!data[0])
//                 return res.render('connexion', { flash: 'Ce compte n\'existe pas' });

//             bcrypt.compare(password, data[0].password, function (err, result) {
//                 if (result === true) {
//                     { setSession(req, res, email) };
//                 }
//                 else {
//                     return res.render('connexion', { flash: 'Email ou mot de passe incorrect' });
//                 }
//             });

//         });
//     })
// })