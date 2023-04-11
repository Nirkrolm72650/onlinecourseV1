/* Middleware Admin */

module.exports = {
    isAdmin: async (req, res, next) => {
      if(!req.session.user) return res.redirect('/connexion')
      const [user] = await db.query(`SELECT isAdmin FROM users WHERE id="${req.session.user.id}"`);
      console.log(user);
      ( user.isAdmin === req.session.user.isAdmin && user.isAdmin === 0 ) ? res.redirect('/connexion') : next();
    }
}