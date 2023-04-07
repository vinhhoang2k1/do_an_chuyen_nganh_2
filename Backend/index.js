const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;
const dbConfig = require('./src/configs/db.config');
const route = require("./src/routes/routes");

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan('combined')); // Server logger

dbConfig.connectDB(); // Connect DB

route(app); // routes

app.listen(port, () => console.log(`App listening at https://localhost:${port}`));