const assert = require('assert');
const { db } = require('../../api/database/database');

describe("CRUD COURS", function () {
    let com = {};

    beforeEach((done) => {
        db.query(`INSERT INTO cours SET titre="Apprennez le HTML/CSS", description="Apprennez les langages HTML/CSS et concevez votre premier site web", id_user=1, contenu="Ceci est un test", image="htmlcss.png"`, function (err, data, fields) {
            if (err) throw err;

            com.id = data.insertId;
            assert.strictEqual('number', typeof data.insertId)
            done()
        });
    });

    it("GET COURS", () => {
        db.query("SELECT * FROM cours", function (err, data) {
            if (err) throw err;

            assert.strictEqual('object', typeof data);
        });
       
    });

    it("UPDATE COURS BY ID", () => {
        db.query(`UPDATE cours SET contenu="nouveau contenu" WHERE id='${com.id}'`, function (err, data) {
            if (err) throw err;

            assert.strictEqual('object', typeof data)
        });
    });

    it("DELETE COURS BY ID", () => {
        db.query(`DELETE FROM cours WHERE id='${com.id}'`, function (err, data) {
            if (err) throw err;

            assert.strictEqual('object', typeof data)
        });
    });
});