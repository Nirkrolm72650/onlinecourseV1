const nodemailer = require('nodemailer');

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

module.exports = transporter