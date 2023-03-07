// importing modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// create the app
const app = express();

// configure web server
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// using mongoose plugin
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/covid19')
// mongoose.connect('mongodb://localhost/covid19', {useUnifiedTopology: true, useNewUrlParser: true })
mongoose.connection.on("connected", function(){
  console.log("Connected: Successfully connect to mongo server");
});
mongoose.connection.on('error', function(){
  console.log("Error: Could not connect to MongoDB. Did you forget to run 'mongod'?");
});

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