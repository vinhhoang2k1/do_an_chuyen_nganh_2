const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const app = express();
const route = require("./routes/routes");
app.use(morgan('combined')); // Server logger

const { conn } = require('./configs/db.config');

const port = process.env.NODE_PORT || 5000;
app.use(express.json()); // json decode
app.use(cors());

route(app); // routes

conn.connect(); // Connect Database

app.get('/Trains', function (req, res) {
    var sql = "SELECT * FROM Train";
    conn.query(sql, function (err, results) {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/', (req, res) => res.send('Đồ án chuyên ngành 2!'));
app.listen(port, () => console.log(`App listening at https://localhost:${port}`));