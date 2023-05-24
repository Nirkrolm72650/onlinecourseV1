const { inscripUser } = require('./AuthControllers')

require('dotenv').config()
const { MODE } = process.env

/* Fonction permettant de récupérer tous les utilisateurs dans la page "Utilisateur" dans "Admin" */
exports.getUsers = async (req, res) => {
    const data = {
        flash: 'get article',
        message: "sucess get",
    }

    await db.query('SELECT * FROM users', function (err, data) {
        if (err) throw err;

        if (req.file) {
            const img = db.query(`SELECT avatar from users WHERE id=${id}`);
            if (img[0].image !== "linuxbash.png") {
                pathImg = path.resolve("assets/images/" + img[0].image)
                fs.unlink(pathImg, (err) => {

                })

            }


            db.query(`UPDATE users SET avatar="${req.file.completed}" WHERE id=${id};`);

            // Mise à jour de la session
            db.query(`SELECT * FROM users WHERE id=${req.session.user.id};`, (err, data) => {
                if (err) throw err;

                req.session.user = {
                    ...data[0]
                };
                res.redirect("/profil");
            });
        }

        if (MODE === "test") res.json(data)

        else res.render('user', { title: 'Utilisateur', layout: "user", db: data });
    });
}

/* Fonction permettant de mettre à jour les informations de l'utilisateur */
exports.updateUser = async (req, res) => {

    const { id } = req.params;
    const { nom, prenom, email, mobile, adresse, ville, codePostal, pays } = req.body;


    // if (req.body.prenom) await db.query(`UPDATE users SET prenom="${mysql.escape(prenom)}" WHERE id="${id}";`);

    // if (req.body.nom) await db.query(`UPDATE users SET nom="${mysql.escape(nom)}" WHERE id="${id}";`);

    // if (req.body.email) await db.query(`UPDATE users SET email="${mysql.escape(email)}" WHERE id="${id}";`)

    // if (req.body.mobile) await db.query(`UPDATE users SET mobile="${mysql.escape(mobile)}" WHERE id="${id}";`)

    // if (req.body.adresse) await db.query(`UPDATE users SET adresse="${mysql.escape(adresse)}" WHERE id="${id}";`)

    // if (req.body.ville) await db.query(`UPDATE users SET ville="${mysql.escape(ville)}" WHERE id="${id}";`)

    // if (req.body.codePostal) await db.query(`UPDATE users SET codePostal="${mysql.escape(codePostal)}" WHERE id="${id}";`)

    // if (req.body.pays) await db.query(`UPDATE users SET pays="${mysql.escape(pays)}" WHERE id="${id}";`)

    if (req.body.prenom) {
        const updatePrenomQuery = 'UPDATE users SET prenom = ? WHERE id = ?';
        await db.query(updatePrenomQuery, [req.body.prenom, id]);
      }
      
      if (req.body.nom) {
        const updateNomQuery = 'UPDATE users SET nom = ? WHERE id = ?';
        await db.query(updateNomQuery, [req.body.nom, id]);
      }
      
      if (req.body.email) {
        const updateEmailQuery = 'UPDATE users SET email = ? WHERE id = ?';
        await db.query(updateEmailQuery, [req.body.email, id]);
      }
      
      if (req.body.mobile) {
        const updateMobileQuery = 'UPDATE users SET mobile = ? WHERE id = ?';
        await db.query(updateMobileQuery, [req.body.mobile, id]);
      }
      
      if (req.body.adresse) {
        const updateAdresseQuery = 'UPDATE users SET adresse = ? WHERE id = ?';
        await db.query(updateAdresseQuery, [req.body.adresse, id]);
      }
      
      if (req.body.ville) {
        const updateVilleQuery = 'UPDATE users SET ville = ? WHERE id = ?';
        await db.query(updateVilleQuery, [req.body.ville, id]);
      }
      
      if (req.body.codePostal) {
        const updateCodePostalQuery = 'UPDATE users SET codePostal = ? WHERE id = ?';
        await db.query(updateCodePostalQuery, [req.body.codePostal, id]);
      }
      
      if (req.body.pays) {
        const updatePaysQuery = 'UPDATE users SET pays = ? WHERE id = ?';
        await db.query(updatePaysQuery, [req.body.pays, id]);
      }
      

    
    let sql = `UPDATE users SET isAdmin = '${(req.body.isAdmin === 'on' ? '1' : '0')}', 
    isVerified = '${(req.body.isVerified === 'on' ? '1' : '0')}', 
    isVisiteur = '${(req.body.isVisiteur === 'on' ? '1' : '0')}' WHERE id = '${req.params.id}';`
    
    console.log(req.body.isVisiteur);
    await db.query(sql, function (err, data) {
        if (err) throw err;
        else res.redirect('/user');
    })

    db.query(`SELECT * FROM users WHERE id=${req.session.user.id};`, (err, data) => {
        if (err) throw err;

        req.session.user = {
            ...data[0]
            
        }

        if (MODE === "test") {
            res.json({ message: "success update" })

        } else {
            res.redirect('/user')
        }
    });


}




/* Fonction permettant d'éditer les rôles pour chaque utilisateur */
// exports.editOneUser = async (req, res) => {
//     let sql = `UPDATE users SET isAdmin = '${(req.body.isAdmin === 'on' ? '1' : '0')}', 
//         isVerified = '${(req.body.isVerified === 'on' ? '1' : '0')}', 
//     isVisiteur = '${(req.body.isVisiteur === 'on' ? '1' : '0')}' WHERE id = '${req.params.id}';`

//     await db.query(sql, function (err, data) {
//         if (err) throw err;
//         else res.redirect('/user');
//     })
// }

/* Fonction permettant de supprimer un utilisateur */
exports.deleteOneUser = async (req, res) => {
    const { id } = req.params;
    const data = {
        flash: 'Delete User',
        message: "success delete",
    }

    // Supression de l'utilisateur par rapport à son ID
    await db.query(`DELETE FROM users WHERE id=${id}`, function (err, data) {

        if (err) throw err;

        // Redirection vers la page user
        if (MODE === "test") res.json(data)

        else res.redirect('/user')

    });
}

