const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));

const port = 3000;

app.get('/', (req, res) => res.send('Đồ án chuyên ngành 2 BackEnd!'));
app.listen(port, () => console.log(`App listening at https://localhost:${port}`));