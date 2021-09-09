const express = require('express');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config()

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const app = express();
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use("/api/", apiLimiter)

app.use(helmet());

//const db = require('db')
//mongoose.connect({
  //host: process.env.DB_HOST,
 // username: process.env.DB_USER,
 // password: process.env.DB_PASS
//})
 // .then(() => console.log('Connexion à MongoDB réussie !'))
 // .catch(() => console.log('Connexion à MongoDB échouée !'));

//mongoose.connect('mongodb+srv://RaidTimes:BdMBlvWUBDwuvX8u@piiquante.asil0.mongodb.net/piiquante?retryWrites=true&w=majority',
 // { useNewUrlParser: true,
 //   useUnifiedTopology: true })
  //.then(() => console.log('Connexion à MongoDB réussie !'))
 // .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;