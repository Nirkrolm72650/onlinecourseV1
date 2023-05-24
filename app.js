const dotenv = require('dotenv').config();
const express = require('express');

const {engine} = require('express-handlebars');
const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession);
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const nodemailer = require('nodemailer');
const path = require('path');
const multer = require('multer');
const mocha = require('mocha');
const assert = require('assert');
const cors = require('cors');

const app = express();

// Swagger
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./api/swagger.json')

const expressOasGenerator = require('express-oas-generator');
expressOasGenerator.init(app, {})
app.use(cors());



// Déstructuration de process.env
const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER, PORT_NODE } = process.env;

// Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Config méthode override
app.use(methodOverride('_method'));


// Base de donnée
// const { request } = require('http');
// const { response } = require('express');
// const SMTPTransport = require('nodemailer/lib/smtp-transport');

require('./api/database/database');


//Configuration handlebars
app.engine('.hbs', engine({
    extname: '.hbs'
}));


app.set('view engine', '.hbs');
app.set('views', './views');

// Route fichier static
app.use('/assets', express.static('public'));
//app.use(express.static(__dirname + '/public/assets/Ressources'));
// Configuration Express-Session

let configDB = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE
};

db = mysql.createConnection(configDB);

// Config ASYNC
const util = require("util");
const cookieParser = require('cookie-parser');
db.query = util.promisify(db.query).bind(db);

db.connect((err) => {
  if (err) console.error('error connecting: ', err.stack);
  
});



// Déclaration du cookie
var sessionStore = new MySQLStore(configDB);
app.use(
  expressSession({
    secret: "securite",
    name: "poti-gato",
    saveUninitialized: true,
    resave: false,
    store: sessionStore
  })
);



app.use('*', (req, res, next) => {
  res.locals.user = req.session.user;
  next();
})


app.use('/api/v3', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const ROUTER = require('./router/router');
app.use("/", ROUTER);
//// Route pour API Swagger

// Le serveur écoute sur le port 3000
app.listen(process.env.PORT_NODE, () =>{
    console.log('Le serveur est lancé sur le port 3000');
});

module.exports = { db, app };
