const path = require('path');
const fs = require('fs');
const { isBuffer } = require('util');


// exports.profil = (req, res) => {
//     res.render('profil', { title: 'Profil', layout: 'profil' });
// }

/* Fonction permettant d'afficher le profil de l'utilisateur en récupérant toutes 
  les informations définit dans la page inscription par l'utilisateur */
exports.getProfilUser = async (req, res) => {
    await db.query('SELECT * FROM users', function (err, data) {
        if (err) throw err;
        res.locals.user = req.session.user;
        res.render('profil', { title: 'Profil', layout: 'profil', db: data });
    });
}

/* Fonction permettant de modifier les informations du profil de l'utilisateur */
exports.updateProfil = async (req, res) => {
    const { id } = req.params;
    const {email} = req.body;

    if (req.body.email) {
        await db.query(`UPDATE users SET email="${email}" WHERE id="${id}"`, function (err, data) {
            if (err) throw err;

            db.query(`SELECT * FROM users WHERE id=${req.session.user.id};`, (err, data) => {
                if(err) throw err;
                
              console.log("user", data)
              req.session.user = {
                ...data[0]
              };
              res.redirect("/profil");
            });
        });
    }

    if(req.file){
        const img = await db.query(`SELECT avatar from users WHERE id=${id}`);

        if(img[0].image !== "linuxbash.png"){
            pathImg = path.resolve("assets/images/" + img[0].image)
            fs.unlink(pathImg, (err) => {
             
                
            })

        }

        
        await db.query(`UPDATE users SET avatar="${req.file.completed}" WHERE id=${id};`);

        // Mis à jour de la session
        db.query(`SELECT * FROM users WHERE id=${req.session.user.id};`, (err, data) => {
            if(err) throw err;
            
          console.log("user", data)
          req.session.user = {
            ...data[0]
          };
          res.redirect("/profil");
        });
    }

}
