let $listView;
let $form;
let $firstname;
let $lastname;
let $age;
let $pName;
let $pId;
let $vaccine_type;
let $vaccine_manufacturer;
let $place_of_vacination;
let $date_of_dose_1;
let $date_of_dose_2;
let $coords;

$(document).ready(function(){
	$listView = $("#patients");
	$form = $("#form");
	$firstname = $("#firstname");
	$lastname = $("#lastname");
	$age = $("#age");
	$pName = $("#pName");
	$pId = $("#pId");
	$vaccine_type = $("#vaccine_type");
	$vaccine_manufacturer = $("#vaccine_manufacturer");
	$place_of_vacination = $("#place_of_vacination");
	$date_of_dose_1 = $("#date_of_dose_1");
	$date_of_dose_2 = $("#date_of_dose_2");
	$coords = $("#coords");
});

// form validation function
function validation() {
	// assign variable to HTML UI elements
	let firstname = $firstname.val();
	let lastname = $lastname.val();
	let age = $age.val();
	let pName = $pName.val();
	let pId = $pId.val();
	let vaccine_type = $vaccine_type.val();
	let vaccine_manufacturer = $vaccine_manufacturer.val();
	let place_of_vacination = $place_of_vacination.val();
	let date_of_dose_1 = $date_of_dose_1.val();
	let date_of_dose_2 = $date_of_dose_2.val();
	let coords = $coords.val();

	let errors = "";
	
	// validation process using else if loop
	if (firstname == null || firstname == "") {
		errors += "Firstname is empty!";
	}
	if (lastname == null || lastname == "") {
		errors += "\nSurname is empty!";
	}
	if (age == null || age == "") {
		errors += "\nAge is empty!";
	}
	if (pName == null || pName == "") {
		errors += "\nProfessional Name is empty!";
	}
	if (pId == null || pId == "") {
		errors += "\nProfessional ID is empty!";
	}
	if (vaccine_type == null || vaccine_type == "") {
		errors += "\nVaccine Type is empty!";
	}
	if (vaccine_manufacturer == null || vaccine_manufacturer == "") {
		errors += "\nVaccine Manufacturer is empty!";
	}
	if (place_of_vacination == null || place_of_vacination == "") {
		errors += "\nPlace of Vaccination is empty!";
	}
	if (date_of_dose_1 == null || date_of_dose_1 == "") {
		errors += "\nDate of Dose 1 is empty!";
	}
	if (date_of_dose_2 == null || date_of_dose_2 == "") {
		errors += "\nDate of Dose 2 is empty!";
	}
	if (coords == null || coords == "") {
		errors += "\nGPS Coordinates is empty!";
	}

	if (errors) {
		alert(errors);
		return false;
	}
	else {
		return true;
	}
}

// form submission function
function submit_form() {

	// call validation function through if else loop
	if (validation()) {
		//create an object consisting of form data
		let firstname = $firstname.val();
		let lastname = $lastname.val();
		let age = $age.val();
		let pName = $pName.val();
		let pId = $pId.val();
		let vaccine_type = $vaccine_type.val();
		let vaccine_manufacturer = $vaccine_manufacturer.val();
		let place_of_vacination = $place_of_vacination.val();
		let date_of_dose_1 = $date_of_dose_1.val();
		let date_of_dose_2 = $date_of_dose_2.val();
		let coords = $coords.val();

		var data = new Object();
		data.firstname = firstname;
		data.lastname = lastname;
		data.age = age;
		data.pName = pName;
		data.pId = pId;
		data.vaccine_type = vaccine_type;
		data.vaccine_manufacturer = vaccine_manufacturer;
		data.place_of_vacination = place_of_vacination;
		data.coords = coords;
		data.date_of_dose_1 = date_of_dose_1;
		data.date_of_dose_2 = date_of_dose_2;

		console.log(data);

		$.post('/save', data, function(res) {
			if (!res) {
				alert("data is saved unsuccessfully");
				$form.trigger('reset');
			}

			alert("Data is saved");
			$form.trigger('reset');
		});
	}

	return false;
}

$(document).ready(function(){
	$form.on('submit', function(e) {
		e.preventDefault();

		submit_form();

		return false;
	});

	$place_of_vacination.on("change", function(e) {
		let coords = getCoords($place_of_vacination.val());
	});

	$("#btnCoords").click(function(e) {
		e.preventDefault();
		// getLocation();
		
		$.get(`http://api.positionstack.com/v1/forward?access_key=12b676a3a59a0ca6d4ff6b7541daa164&query=${$place_of_vacination.val()}, Papua New Guinea`)
		.then(result => {
			console.log(`(${result.data[0].latitude}, ${result.data[0].longitude})`)
		});

		return false;
	});
});

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else {
		$coords.val("Geolocation is not supported by the browser");
	}
}

function showPosition(position) {
	$coords.val(`( ${position.coords.latitude}, ${position.coords.longitude} )`);
}

function showError(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			$coords.val("User denied the request for Geolocation.");
		break;
		case error.POSITION_UNAVAILABLE:
			$coords.val("Location information is unavailable.");
		break;
		case error.TIMEOUT:
			$coords.val("The request to get user location timed out.");
		break;
		case error.UNKNOWN_ERROR:
			$coords.val("An unknown error occurred.");
		break;
	}
}

function getCoords(location) {
	$.get(`http://api.positionstack.com/v1/forward?access_key=12b676a3a59a0ca6d4ff6b7541daa164&query=${location}, Papua New Guinea`)
		.then(result => {
			return [result.data[0].latitude, result.data[0].longitude]
		})
}

// page loading event to display array entries 
$(document).on("pagebeforeshow", "#entries", function(event) {
	event.preventDefault();
	
	// request data from server
	$.get('/read', function(data, status) {
		let data1 = data.split('\n');

		// create a 'for loop' to display array values
		for (let value of data1) {
			$listView.append(`<li>${value}</li>`).listview("refresh");
		}
	});
	//refresh the listview
	$listView.listview("refresh");
});

$( document ).on( "pagecreate", "#map-page", function() {
    var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }
        function fail(error) {
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
    }

    function drawMap(latlng) {
        var myOptions = {
            zoom: 10,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Greetings!"
        });
    }
});