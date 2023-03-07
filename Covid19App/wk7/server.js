// importing modules
const express = require('express');
const path = require('path');

// create the app
const app = express();

// configure web server
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// make app listen to port 3000
app.listen(3000, function(error) {
  if (error) {
    console.log('Something went wrong ', error);
  } else {
    console.log('Local Server is up on port: ' + PORT);
  }
});

/**
 * GET /
 * homepage
 */
app.get('/', function(req, res) {
  res.render("index");
});

/**
 * GET /patients
 * Retrive all patients
 */
app.get('/patients', function(req, res) {
  res.render('patients');
});

/**
 * GET /patients/:id
 * Retrieve data for a id
 */
app.get('/details', function(req, res) {
  res.render('details');
});