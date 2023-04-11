const nodemailer = require('nodemailer');
const db = require('../database/database');
const jwt = require('jsonwebtoken');



/* Fonction permettant d'envoyer un mail avec le formulaire de contact */
exports.sendMailContact = (req, res) => {
    const { sujet, email, nomEtPrenom, description } = req.body;

    const transporter = nodemailer.createTransport({
        service: "Outlook365",
        host: 'smtp.office365.com',
        secureConnection: false,
        port: 587,
        auth: {
            user: 'guyonbrandon@outlook.fr',
            pass: 'Br26@n07don1997//' //rseyekjmvzqnrlku
        },
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false
        }
    });

    let mailData = {
        from: 'guyonbrandon@outlook.fr',
        to: req.body.email,
        subject: req.body.sujet,
        text: req.body.description,
        html: `
              <h3>De la part de : ${nomEtPrenom}</h3>
              <h3>Son mail : ${email}</h3>
              <h3>Sujet : ${sujet}</h3>
              <p>Description : ${description}</p>
            `
    }

    transporter.sendMail(mailData, (error, result) => {
        if (error) {
            return console.log(error);
        }
        else {
            console.log(result);
            res.redirect('/');
        }
    });
};


