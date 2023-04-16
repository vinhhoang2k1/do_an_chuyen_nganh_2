const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const app = express();
const route = require("./routes/routes");
app.use(morgan('combined')); // Server logger

const port = process.env.NODE_PORT || 5000;
app.use(express.json()); // json decode
app.use(cors());

route(app); // routes

app.listen(port, () => console.log(`App listening at https://localhost:${port}`));
