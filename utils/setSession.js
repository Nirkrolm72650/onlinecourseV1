exports.setSession = async function (req, res, email) {
    let userget = await db.query(`SELECT * FROM users WHERE email="${email}"`)
    let user = userget[0];
    // console.log(user);
    
    req.session.user = {
      id: user.id,
      email: user.email,
      prenom: user.prenom,
      nom: user.nom,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      isVisiteur: user.isVisiteur,
      isVerified: user.isVerified
    };
    // console.log("setsesss", req.session.user);
  
    res.redirect('/profil')
  }
  