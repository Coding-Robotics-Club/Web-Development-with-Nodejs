const http = require('http');
const path = require('path');
const express = require('express');
const request = require('request');
const fs = require('fs')//.promises;
const favicon = require('serve-favicon');

const app = express();
const port = 3000;
const host = "localhost";

app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));

app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/assets', express.static('assets'));

app.get('/', function(reg, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/read', function(req, res) {
    // read data from sample.txt file in the assets folder
    fs.readFile('assets/sample.txt', 'utf8' , (err, data2) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Data is read from file successfully... it reads \n" + data2);
      res.send(data2);
    });
});

/**
 * This endpoint receives data from clientside sent via post method
 */
app.post('/save', function(req, res) {
    let object = req.body;
    console.log(object)
    
    var data = `Firstname: ${object.firstname}\n`+
                `Lastname: ${object.lastname}\n`+
                `Age: ${object.age}\n`+
                `Place of vaccination: ${object.place_of_vacination}\n`+
                `GPS Coordinates: ${object.coords}\n`+
                `Type of vaccine: ${object.vaccine_type}\n`+
                `Name of vaccine manufacturer: ${object.vaccine_manufacturer}\n`+
                `Date of Dose 1: ${object.date_of_dose_1}\n`+
                `Date of Dose 2: ${object.date_of_dose_2}\n`+
                `Healthcare Professional ID: ${object.pId}\n`+
                `Healthcare Fullname: ${object.pName}`;
    
    console.log(data);
    
    // write data to file assets folder and save text file as sample.txt
    fs.writeFile('assets/sample.txt', data,
        
        // callback function that is called after writing file is done
        function(err) {     
            if (err) throw err;
            // if no error
            console.log("Data is written to file successfully.");
        }
    );
    res.send("data is saved");
});

app.listen(port, function(error) {
    if (error) {
        console.log('Something went wrong ', error);
    } else {
        console.log('Local Server is up on port: ' + port);
    }
});