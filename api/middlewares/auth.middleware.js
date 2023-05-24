// Middleware pour vérifier si l'utilisateur est connecté
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      // L'utilisateur est connecté, on passe au middleware suivant
      next();
    } else {
      // L'utilisateur n'est pas connecté, on le redirige vers la page de connexion
      res.redirect('/connexion');
    }
  };

module.exports = {isAuthenticated};