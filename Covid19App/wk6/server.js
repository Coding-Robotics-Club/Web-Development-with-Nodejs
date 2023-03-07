// importing modules
const express = require('express');
const path = require('path');

// create the app
const app = express();

// make app listen to port 3000
app.listen(3000, function(error) {
  if (error) {
    console.log('Something went wrong ', error);
  } 
  else {
    console.log('Local Server is up on port: ' + PORT);
  }
});

// index route
app.get('/', function(reg, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});
