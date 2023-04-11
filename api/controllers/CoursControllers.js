const { db } = require('../database/database');
const mysql = require('mysql');

require('dotenv').config()
const { MODE } = process.env

/* Fonction permettant de créer un cours */
exports.postCours = (req, res) => {
    const { titre, description, contenu } = req.body;
    
    const { id_user } = req.session.user.id;
    const image = req.file ? req.file.filename : false;

    /* On utilise la fonction mysql.escape() pour pouvoir échapé les caractères html */
    db.query(`INSERT INTO cours (titre, description ,contenu, id_user, image)
              VALUES ('${titre}', '${description}', ${mysql.escape(contenu)} ,'${req.session.user.id}', '${image}');`,
              (err, data, field) => {
            if (err) throw err;

            if (MODE === 'test') res.json({
                id: data.insertId,
                message: "Success create"
            })
            else {
                // On affiche un message comme quoi l'insertion a été éffectuée avec succès et on renvoie l'utilisateur vers la page ou on liste les cours
                console.log('Insertion effectuée avec succès');
                res.redirect('/seecourses');
            }

    })

}

/* Fonction permettant de récupérer un cours et de l'affiché dans la page /cours/:id */
exports.getCours = (req, res) => {
    let id = req.params.id;

    db.query(`SELECT titre, description, contenu FROM cours where id='${id}';`, (err, data) => {
        if (err) throw err;

        if (MODE === 'test')
            res.json({ dbCours: data })
        else
            res.render('cours', { layout: "cours", db: data[0], meta: { titre: data[0].titre } });
    });
}

/* Fonction permettant de récupérer et d'afficher les cours */
exports.getSeeCourses = async (req, res) => {

    await db.query(`SELECT id, titre, description, image FROM cours`, (err, data) => {
        if (err) throw err;

        if (req.file) {
            const img = db.query(`SELECT image from cours WHERE id=${id}`);

            if (img[0].image !== "linuxbash.png") {
                pathImg = path.resolve("assets/images/" + img[0].image)
                fs.unlink(pathImg, (err) => {


                })

            }


            db.query(`UPDATE users SET image="${req.file.completed}" WHERE id=${id};`);

            // Mise à jour de la session
            db.query(`SELECT * FROM users WHERE id=${req.session.user.id};`, (err, data) => {
                if (err) throw err;

                //console.log("user", data)
                req.session.user = {
                    ...data[0]
                };
                res.redirect("/profil");
            });
        }

        res.render('seeCourses', { title: 'Cours', layout: 'cours', db: data });
    });

}

/* Fonction permettant d'afficher la liste des cours dans la page admin
    On utilise un inner join afin de lier la table cours et la table users */
exports.getAllCours = async (req, res) => {

    let data1 = {
        flash: 'get cours',
        message: "success get cours",
    }

    /* On n'oublie pas de spécifié la table pour cours.id afin d'éviter un conflit entre les ID */
    await db.query(`select cours.id, prenom, titre, description from cours inner join users on cours.id_user = users.id;`, (err, data) => {
        if (err) throw err;
        
        if (MODE === "test") res.json(data1)

        else res.render('admin', { title: 'Admin', layout: "admin", db: data });
    });
}

/* Fonction permettant de mettre à jour un cours */
exports.updateCours = async (req, res) => {
    const { id } = req.params;
    const { titre, description, contenu } = req.body;

    if (req.body.titre) await db.query(`UPDATE cours SET titre="${titre}" WHERE id="${id}";`);   
    
    if (req.body.description) await db.query(`UPDATE cours SET description="${description}" WHERE id="${id}";`);


        //res.redirect('/admin');
        if (MODE === "test") res.json({message: "success update"})
            
        else res.redirect('/admin');
}

/* Fonction permettant de supprimé un cours dans la base de donnée */
exports.deleteCours = async (req, res) => {
    const { id } = req.params;

    let data = {
        flash: 'delete cours',
        message: "success delete cours",
    }

    
    await db.query(`DELETE from cours WHERE id="${id}";`, function (err, data) {
        if (err) throw err;
        
        if (MODE === "test"){ 
           
            res.json(data)
        
        }
        else res.redirect('/admin');
        
    })
}