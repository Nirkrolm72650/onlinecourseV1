const { db } = require('../database/database');
const mysql = require('mysql');

exports.getMessage = (req, res) => {
    res.render('message', { layout: "message" });
}