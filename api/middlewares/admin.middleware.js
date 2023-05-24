const session = require('express-session');

/* Middleware Admin */


module.exports = {
    isAdmin: async (req, res, next) => {
      
      if(!req.session.user) return res.redirect('/connexion')
      console.log(req.session);
      const [user] = await db.query(`SELECT isAdmin FROM users WHERE id="${req.session.user.id}"`);
      console.log(user);
      ( user.isAdmin === req.session.user.isAdmin && user.isAdmin === 0 ) ? res.redirect('/connexion') : next();
    }
}

// module.exports = {
//   isAdmin: async (req, res, next) => {
//     try {
//       if (!req.session.user) {
//         return res.redirect('/connexion');
//       }

//       const [userRows] = await db.query('SELECT isAdmin FROM users WHERE id = ?', [req.session.user.id]);
//       if (userRows.length === 0 || !userRows[0] || !userRows[0].hasOwnProperty('isAdmin')) {
//         return res.redirect('/connexion');
//       }

//       const user = userRows[0];
//       console.log(user);

//       if (!user.isAdmin && !req.session.user.isAdmin) {
//         return res.redirect('/connexion');
//       }

//       next();
//     } catch (err) {
//       console.error('Une erreur s\'est produite lors de la vérification de l\'administrateur :', err);
//       res.redirect('/connexion');
//     }
//   }
// };


