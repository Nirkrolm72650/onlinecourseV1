/* Middleware Visiteur */

module.exports = {
    isVisiteur: async (req, res, next) => {
      if(!req.session.user) return res.redirect('/connexion');
      const [user] = await db.query(`SELECT isVisiteur FROM users WHERE id="${req.session.user.id}"`);
      console.log(user);
      ( user.isVisiteur === req.session.user.isVisiteur && user.isVisiteur === 0 ) ? res.redirect('/connexion') : next();
    }
}

