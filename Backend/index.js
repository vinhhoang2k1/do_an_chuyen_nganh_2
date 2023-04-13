const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();
const route = require("./src/routes/routes");
const app = express();
app.use(morgan('combined')); // Server logger

const port = process.env.PORT || 3000;
app.use(express.json()); // json decode
app.use(cors());


route(app); // routes

app.listen(port, () => console.log(`App listening at https://localhost:${port}`));