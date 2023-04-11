const assert = require('assert');
const mysql = require('mysql');


// Config DB
let configDB = {
    host: 'localhost', 
    user: 'root',
    password: 'Br26an07don1997//',
    database: 'OnlineCourses'
}

// Création de la connexion pour la base donnée
db = mysql.createConnection(configDB);

// Config ASYNC
const util = require("util");
db.query = util.promisify(db.query).bind(db);

describe('Test connexion DB', function (){
    it('Test Connexion DB', function (){
        db.connect((err) => {
            if(err) console.error('error connecting:', err.stack);

            assert.equal(typeof 0, typeof db.threadId);
        });
    });
});





