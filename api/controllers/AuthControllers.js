require('dotenv').config()
const bcrypt = require('bcrypt');
const flash = require('flash');
const { db } = require('../database/database');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { MODE } = process.env

const transporter = nodemailer.createTransport({
	service: "Outlook365",
	host: 'smtp.office365.com',
	secureConnection: false,
	port: 587,
	auth: {
		user: 'guyonbrandon@outlook.fr',
		pass: 'Br26@n07don1997//' //rseyekjmvzqnrlku => google
	},
	tls: {
		ciphers: 'SSLv3',
		rejectUnauthorized: false
	}
});

/* Fonction qui permet de se connecter */

exports.connectUser = (req, res) => {
	const { email, password } = req.body;

	db.query(`SELECT password, email FROM users WHERE email="${email}"`, function (err, data) {
		if (err) throw err;

		if (!data[0])
			return res.render('connexion', { layout: 'connexion', flash: 'Ce compte n\'existe pas' });

		/* On compare le mot de passe entré par l'utilisateur avec celui stocké dans la base de donnée
			Si il y a une erreur on renvoie l'utilisateur vers la page de connxion avec un message d'erreur */
		bcrypt.compare(password, data[0].password, async function (err, result) {
			if (err) return res.render('connexion', { layout: 'connexion', flash: 'Une erreur est survenu !' });
			if (result) {


				db.query(`SELECT * FROM users WHERE email="${data[0].email}"`, (err, userget) => {
					let user = userget[0];

					req.session.user = {
						id: user.id,
						email: user.email,
						prenom: user.prenom,
						nom: user.nom,
						avatar: user.avatar,
						isAdmin: user.isAdmin,
						isVisiteur: user.isVisiteur,
						isVerified: user.isVerified,
						mobile: user.mobile,
						adresse: user.adresse,
						ville: user.ville,
						codePostal: user.codePostal,
						pays: user.pays
					};

					/* Le mode test est pour les tests unitaires */
					if (MODE === 'test') {
						return res.json({ msg: 'ok login' })
					} else {
						console.log(req.session)
						return res.redirect('/profil');

					}
				})
			}
			else {
				if (MODE === 'test') {
					return res.json({ msg: 'Le Login est NOK' })
				} else {
					return res.render('connexion', { layout: 'connexion', flash: 'Email ou mot de passe incorrect' });
				}
			}
		});

	});
}


/* Fonction permettant d'inscrire un utilisateur */
exports.inscripUser = async (req, res) => {
	const saltRounds = 10; // Permet de choisir la force de hachage plus elle est élévé et plus le mot de passe est difficile à forcer
	const { nom, prenom, email, password, avatar, mobile, adresse, ville, codePostal, pays } = req.body;

	// On crypte le mot de passe avec bcrypt
	bcrypt.hash(password, saltRounds, function (err, hash) {
		db.query(`INSERT INTO users (nom, prenom, email, password, avatar, isAdmin, isVisiteur, isVerified, mobile, adresse, ville ,codePostal, pays) VALUES ('${nom}', '${prenom}', '${email}', '${hash}', '${avatar}', 0, 0, 0, '${mobile}', '${adresse}', '${ville}', '${codePostal}', '${pays}');`, (err, rows, fields) => {
			if (err) {
				console.log(err.message);
				res.send(err);
			}
			
			res.render('connexion', {layout:'connexion', success: 'Votre compte à bien été créé merci de vérifier vos emails !'})
		})
	});

}

/* Fonction de déconnexion, on clear le cookie et on renvoie l'utilisateur vers la page d'accueil */
exports.deconnexion = (req, res) => {
	req.session.destroy(() => {
		res.clearCookie('poti-gato');
		console.log("Clear Cookie session :", req.sessionID);
		res.redirect('/');
	})
}

/*
	const token = jwt.sign({
					data: 'Token Data'  
				}, 'MaCleSecrete', { expiresIn: '10m' }  
			);
				
				mailOptions = {
					from: 'Guyon.Brandon.dev@gmail.com',
					to: email,
					subject: "Confirmation email.",
					text: `
							<h2>Bonjour,</h2><br>
							<h5>Pour activer votre compte utilisateur, veuillez cliquer sur le lien ci-dessous</h5><br>
							http://localhost:3000/verification/${token}`

				}
				
				console.log('Données de mailOption :', mailOptions)

				transporter.sendMail(mailOptions, (err, res, next) => {
					if (err) {
						throw err
					} else {
						console.log("Message Envoyer")
						next()
					}
				})

				res.render('connexion', { layout: 'connexion', success: 'Votre compte à bien été créé merci de vérifier vos emails !'})



				console.log('Insertion effectuée avec succès');
				//res.redirect('/connexion');
*/