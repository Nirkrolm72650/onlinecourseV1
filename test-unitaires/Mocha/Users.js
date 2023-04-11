const assert = require('assert');
const {db} = require('../../api/database/database');

describe("CRUD Users", function (){
    let com = {};

    // Fonction que ce lance avant chaque test
    beforeEach((done) => {
        db.query(`INSERT INTO users SET nom="Guyon", prenom="Bryan", email="guyonbryan@gmail.com", password="$2b$10$YmJihHJKhhZCzikydGpsX.rxX9HBiD1rWCKMXPKGv.TNV04K1njh6", avatar="linuxbash.png", isAdmin=1, isVisiteur=1, isVerified=1, mobile="0620495405", adresse="8 rue des tilleuls", ville="Saint Saturnin" ,codePostal=72650, pays="France"`, function(err, data, fields){
            if(err) throw err;
            com.id = data.insertId;
            assert.strictEqual('number', typeof data.insertId)
            done()
        });
    })


    it("GET USERS", () => {
        let sql = `SELECT * FROM users`;
        db.query(sql, (err, data) =>{
            if(err) throw err;

            assert.strictEqual('object', typeof data);
            
        });
    });

    it("GET USERS BY ID", () => {
        db.query(`SELECT * FROM users WHERE id=${com.id}`, (err, data) =>{
            if(err) throw err;

            assert.strictEqual('object', typeof data);
            
        });
    });

    it("UPDATE USERS BY ID", () => {
        db.query(`UPDATE users SET prenom="Chloé", email="guyonchloe@gmail.com" WHERE id='${com.id}'`, function (err, data){
            if(err) throw err;

            assert.strictEqual('object', typeof data)
        });
    });

    it("DELETE USERS BY ID", () => {
        db.query(`DELETE FROM users WHERE id='${com.id}'`, function (err, data){
            if(err) throw err;

            assert.strictEqual('object', typeof data)
        });
    });
});
