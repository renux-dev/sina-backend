const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('sina', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// create express app
const app = express();

// Route Handler
var CertificateRouter = require('./routes/certificate');
app.set('view engine', 'ejs')
app.use(express.static('public'));
// parse requests of content-type - application/json
app.use(bodyParser.json({limit: '50mb'}))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// Route Processing
app.use('/v1/certificate', CertificateRouter);

// listen for requests
app.listen(port);

console.log(port)
module.exports = app

