require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./app/router');

const app = express();
const PORT = process.env.PORT || 3000;

const multer = require('multer');
const bodyParser = multer();

app.use( bodyParser.none() );

app.use(cors());


app.use(express.urlencoded({ extended:true }));

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Listen on http://localhost:${PORT}`);
});