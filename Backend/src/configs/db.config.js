
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect(function (err) {
  if (err) throw err;
  console.log("MySql Database Connected!");
});

module.exports = db;