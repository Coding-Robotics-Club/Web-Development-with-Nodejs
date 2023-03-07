// importing modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// create the app
const app = express();
const PORT = 3000;

// importing database models
require("./models/patient.model");

const Patient = mongoose.model('patient');

// configure web server
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// MyModel.find({}, function (err, docs) {
//   // docs.forEach
// });

// make app listen to port 3000
app.listen(PORT, function(error) {
  // if (error) {
  //   console.log('Something went wrong ', error);
  // } else {
  //   console.log('Local Server is up on port: ' + PORT);
  // }
  console.log("Server is running at port %d", PORT);
});

// index route
// app.get('/', function(req, res) {
//   res.send("hello")
// })


// const newPatient = new Patient({
//   first_name: "Lucas",
//   last_name: "Ginua",
//   date_of_birth: "03/08/2001",
//   place_of_vacination: "Madang",
//   type_of_vaccinge: "AstraZeneca",
//   vaccine_manufacturer: "SI of India AZ",
//   dose_1_date: new Date("02/06/2022"),
//   dose_2_date: new Date("05/20/2022"),
//   p_id: "200197",
//   p_name: "Christian Augustyn"
// });
// newPatient.save(function(err, result) {
//   if (err) throw err;

//   console.log("data saved");
//   console.log(result);
// });



/**
 * GET /
 * homepage
 */
app.get('/', function(req, res) {
  res.render("index");
});

/**
 * POST /
 * Save new information to db
 */
app.post('/', function(req, res) {
  let data = req.body;
  
  const newPatient = new Patient({
    first_name: data.firstname,
    last_name: data.lastname,
    birthdate: new Date(data.date_of_birth),
    vaccination_place: data.place_of_vaccination,
    vaccine_type: data.type_of_vaccine,
    vaccine_manufacturer: data.vaccine_manufacturer,
    dose_1_date: new Date(data.date_of_dose_1),
    dose_2_date: new Date(data.date_of_dose_2),
    p_id: data.pId,
    p_name: data.pName
  });
  newPatient.save(function(err, result) {
    if (err) throw err;

    console.log("data saved");
    res.redirect('/');
  });

});

/**
 * GET /patients
 * Retrive all patients
 */
app.get('/patients', function(req, res) {
  // find all data
  Patient.find({}).exec(function(err, result) {
    // if error occured stop the server and show the error
    if (err) throw err;

    // console.log(result[0].first_name)

    // otherwise render the re
    res.render('patients', {patients: result});
  })
});

/**
 * GET /patients/:id
 * Retrieve data for a id
 */
app.get('/patients/:id', function(req, res) {
  let patientId = req.params.id;

  // find a patient with the provided id
  Patient.findById(patientId).exec(function(err, result) {
    // if there is an error show it.
    if (err) throw err;
    // otherwise render the result
    res.render('details', {patient: result});

  });
});