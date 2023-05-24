const session = require('express-session');

/* Middleware Visiteur */

module.exports = {
    isVisiteur: async (req, res, next) => {
      if(!req.session.user) return res.redirect('/connexion');
      const [user] = await db.query(`SELECT isVisiteur FROM users WHERE id="${req.session.user.id}"`);
      console.log(user);
      ( user.isVisiteur === req.session.user.isVisiteur && user.isVisiteur === 0 ) ? res.redirect('/connexion') : next();
    }
}



// module.exports = {
//   isVisiteur: async (req, res, next) => {
//     try {
//       if (!req.session.user) {
//         return res.redirect('/connexion');
//       }

//       const [userRows] = await db.query('SELECT isVisiteur FROM users WHERE id = ?', [req.session.user.id]);
//       if (userRows.length === 0 || !userRows[0] || !userRows[0].hasOwnProperty('isVisiteur')) {
//         return res.redirect('/connexion');
//       }

//       const user = userRows[0];
//       console.log(user);

//       if (!user.isVisiteur && !req.session.user.isVisiteur) {
//         return res.redirect('/connexion');
//       }

//       next();
//     } catch (err) {
//       console.error('Une erreur s\'est produite lors de la vérification de l\'administrateur :', err);
//       res.redirect('/connexion');
//     }
//   }
// };

