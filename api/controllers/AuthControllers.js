require('dotenv').config()
const bcrypt = require('bcrypt');
const flash = require('flash');
const { db } = require('../database/database');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { MODE } = process.env
const mysql = require('mysql');
const session = require('express-session');

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

// exports.connectUser = (req, res) => {
// 	const { email, password } = req.body;

// 	db.query(`SELECT password, email FROM users WHERE email="${email}"`, function (err, data) {
// 		if (err) throw err;

// 		if (!data[0])
// 			return res.render('connexion', { layout: 'connexion', flash: 'Ce compte n\'existe pas' });

// 		/* On compare le mot de passe entré par l'utilisateur avec celui stocké dans la base de donnée
// 			Si il y a une erreur on renvoie l'utilisateur vers la page de connxion avec un message d'erreur */
// 		bcrypt.compare(password, data[0].password, async function (err, result) {
// 			if (err) return res.render('connexion', { layout: 'connexion', flash: 'Une erreur est survenu !' });
// 			if (result) {


// 				db.query(`SELECT * FROM users WHERE email="${data[0].email}"`, (err, userget) => {
// 					let user = userget[0];

// 					req.session.user = {
// 						id: user.id,
// 						email: user.email,
// 						prenom: user.prenom,
// 						nom: user.nom,
// 						avatar: user.avatar,
// 						isAdmin: user.isAdmin,
// 						isVisiteur: user.isVisiteur,
// 						isVerified: user.isVerified,
// 						mobile: user.mobile,
// 						adresse: user.adresse,
// 						ville: user.ville,
// 						codePostal: user.codePostal,
// 						pays: user.pays
// 					};

// 					/* Le mode test est pour les tests unitaires */
// 					if (MODE === 'test') {
// 						return res.json({ msg: 'ok login' })
// 					} else {
// 						console.log(req.session)
// 						return res.redirect('/profil');

// 					}
// 				})
// 			}
// 			else {
// 				if (MODE === 'test') {
// 					return res.json({ msg: 'Le Login est NOK' })
// 				} else {
// 					return res.render('connexion', { layout: 'connexion', flash: 'Email ou mot de passe incorrect' });
// 				}
// 			}
// 		});

// 	});
// }

exports.connectUser = (req, res) => {
	const { email, password } = req.body;
  
	db.query(`SELECT password, email FROM users WHERE email = ?`, [email], function (err, data) {
	  if (err) throw err;
  
	  if (!data[0]) {
		return res.render('connexion', { layout: 'connexion', flash: 'Ce compte n\'existe pas' });
	  }
  
	  bcrypt.compare(password, data[0].password, async function (err, result) {
		if (err) {
		  return res.render('connexion', { layout: 'connexion', flash: 'Une erreur est survenue !' });
		}
  
		if (result) {
		  db.query(`SELECT * FROM users WHERE email = ?`, [data[0].email], (err, userget) => {
			if (err) throw err;
  
			let user = userget[0];
  
			if (!req.session) {
			  req.session = {}; // Crée une session si elle n'est pas définie
			}
  
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
			console.log(req.session.user);
			if (MODE === 'test') {
			  return res.json({ msg: 'ok login' });
			} else {
			  console.log(req.session);
			  return res.redirect('/profil');
			}
		  });
		} else {
		  if (MODE === 'test') {
			return res.json({ msg: 'Le Login est NOK' });
		  } else {
			return res.render('connexion', { layout: 'connexion', flash: 'Email ou mot de passe incorrect' });
		  }
		}
	  });
	});
  };
  

/* Fonction permettant d'inscrire un utilisateur */
// exports.inscripUser = async (req, res) => {
// 	const saltRounds = 10;
// 	const { nom, prenom, email, password, avatar, mobile, adresse, ville, codePostal, pays } = req.body;
  
// 	try {
// 	  const hash = await bcrypt.hash(password, saltRounds);
// 	  const query = `INSERT INTO users (nom, prenom, email, password, avatar, isAdmin, isVisiteur, isVerified, mobile, adresse, ville, codePostal, pays) VALUES (?, ?, ?, ?, ?, 0, 0, 0, ?, ?, ?, ?, ?)`;
// 	  const values = [nom, prenom, email, hash, avatar, mobile, adresse, ville, codePostal, pays];
  
// 	  db.query(query, values, (err, rows, fields) => {
// 		if (err) {
// 		  console.error(err.message);
// 		  res.send(err);
// 		} else {
// 		  res.render('connexion', { layout: 'connexion', success: 'Votre compte a bien été créé, merci de vérifier vos emails !' });
// 		}
// 	  });
// 	} catch (err) {
// 	  console.error(err);
// 	  res.send(err);
// 	}
//   };

// exports.inscripUser = async (req, res) => {
// 	const saltRounds = 10;
// 	const { nom, prenom, email, password, avatar, mobile, adresse, ville, codePostal, pays } = req.body;
  
// 	let isAdmin = 0;
// 	let isVisiteur = 1;
// 	if (nom.toLowerCase() === 'root') {
// 	  isAdmin = 1;
// 	  isVisiteur = 0;
// 	}
  
// 	try {
// 	  const hash = await bcrypt.hash(password, saltRounds);
// 	  const query = `INSERT INTO users (nom, prenom, email, password, avatar, isAdmin, isVisiteur, isVerified, mobile, adresse, ville, codePostal, pays) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
// 	  const values = [nom, prenom, email, hash, avatar, isAdmin, isVisiteur, 0, mobile, adresse, ville, codePostal, pays];
  
// 	  db.query(query, values, (err, rows, fields) => {
// 		if (err) {
// 		  console.error(err.message);
// 		  res.send(err);
// 		} else {
// 		  res.render('connexion', { layout: 'connexion', success: 'Votre compte a bien été créé, merci de vérifier vos emails !' });
// 		}
// 	  });
// 	} catch (err) {
// 	  console.error(err);
// 	  res.send(err);
// 	}
//   };
  
exports.inscripUser = async (req, res) => {
	const { nom, prenom, email, password, avatar, mobile, adresse, ville, codePostal, pays } = req.body;
  
	// Vérifier si tous les champs sont remplis
	if (!nom || !prenom || !email || !password || !avatar || !mobile || !adresse || !ville || !codePostal || !pays) {
	  return res.render('inscription', { layout: 'inscription', error: 'Veuillez remplir tous les champs' });
	}
  
	const saltRounds = 10;
	let isAdmin = 0;
	let isVisiteur = 1;
  
	if (nom.toLowerCase() === 'root') {
	  isAdmin = 1;
	  isVisiteur = 0;
	}
  
	try {
	  const hash = await bcrypt.hash(password, saltRounds);
	  const query = `INSERT INTO users (nom, prenom, email, password, avatar, isAdmin, isVisiteur, isVerified, mobile, adresse, ville, codePostal, pays) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
	  const values = [nom, prenom, email, hash, avatar, isAdmin, isVisiteur, 0, mobile, adresse, ville, codePostal, pays];
  
	  db.query(query, values, (err, rows, fields) => {
		if (err) {
		  console.error(err.message);
		  res.send(err);
		} else {
		  res.render('connexion', { layout: 'connexion', success: 'Votre compte a bien été créé, merci de vérifier vos emails !' });
		}
	  });
	} catch (err) {
	  console.error(err);
	  res.send(err);
	}
  };
  
  

  exports.deconnexion = (req, res) => {
	req.session.destroy(() => {
		res.clearCookie('poti-gato');
		console.log("Clear Cookie session :", req.sessionID);
		res.redirect('/');
	})
}
