
const mysql = require('mysql2');
require('dotenv').config();

const conn = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("MySql Database Connected!");
});

module.exports = {
  conn
};