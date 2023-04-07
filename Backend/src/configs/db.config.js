
const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME
});

function connectDB() {
  db.connect(function(err) {
    // if (err) throw err;
    console.log("Connected!!!")
  });
}

module.exports = {
  db,
  connectDB
};