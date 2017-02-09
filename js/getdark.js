// Variable Definition.
var defaultSheet = "/darkout/css/main.css";
var lightSheet = "/darkout/css/main.css";
var darkSheet = "/darkout/css/dark-main.css";
var lightButtonString = "It's light out! <span class='emoji'>😎</span>";
var darkButtonString = "It's dark out! <span class='emoji'>😴</span>";
var loadButtonString = "Getting your location... <i class='fa fa-spinner fa-spin' aria-hidden='true'></i>";
var errorString = "<i class='fa fa-exclamation-triangle' aria-hidden='true'></i> Please approve location permissions...";
var unsupportedButtonString = "<i class='fa fa-exclamation-triangle' aria-hidden='true'></i> Browser doesn't support location... ";
var mapNightStyle = [ {elementType: 'geometry', stylers: [{color: '#242f3e'}]}, {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]}, {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]}, { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{color: '#d59563'}] }, { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{color: '#d59563'}] }, { featureType: 'poi.park', elementType: 'geometry', stylers: [{color: '#263c3f'}] }, { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{color: '#6b9a76'}] }, { featureType: 'road', elementType: 'geometry', stylers: [{color: '#38414e'}] }, { featureType: 'road', elementType: 'geometry.stroke', stylers: [{color: '#212a37'}] }, { featureType: 'road', elementType: 'labels.text.fill', stylers: [{color: '#9ca5b3'}] }, { featureType: 'road.highway', elementType: 'geometry', stylers: [{color: '#746855'}] }, { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{color: '#1f2835'}] }, { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{color: '#f3d19c'}] }, { featureType: 'transit', elementType: 'geometry', stylers: [{color: '#2f3948'}] }, { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{color: '#d59563'}] }, { featureType: 'water', elementType: 'geometry', stylers: [{color: '#17263c'}] }, { featureType: 'water', elementType: 'labels.text.fill', stylers: [{color: '#515c6d'}] }, { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{color: '#17263c'}] } ]

var date = null;
var a = null;
var aText = null;
var map = null;
var mapDiv = null;

var locationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};


// Once the window loads...
window.onload = function() {

  // Variable Assignment
  a = document.getElementById("start-button");
  aText = document.getElementsByClassName("button-text")[0];
  mapDiv = document.getElementById("map");

  // Button click behavior
  a.onclick = function() {

      changeStylesheet(defaultSheet);
      getDark();
    };

};


// Get user's position & callback a function that acts on the time of day.

function getDark(){

  date = new Date();

  if (navigator.geolocation) {

    updateButton("warning", loadButtonString);

    navigator.geolocation.getCurrentPosition(isDark, error, locationOptions);

  } else {

    console.log("Geolocation is not supported by this browser.");
    updateButton("danger", unsupportedButtonString);

    return false;

  }
}


// Calculate darkness from user's position. [Called back by getDark()]
function isDark(position){

  // console.log(position);
  //

  var times = SunCalc.getTimes(date, position.coords.latitude, position.coords.longitude);
  var dusk = times.dusk;
  var dawn = times.dawn;

  if (date > dawn && date < dusk){

    changeStylesheet(lightSheet);
    updateButton("success", lightButtonString);
    buildMap(position, "day");

  } else {

    changeStylesheet(darkSheet);
    updateButton("success", darkButtonString);
    buildMap(position, "night");

  }
}

// Handle errors for getDark().
function error(err){

  console.warn(`ERROR (${err.code}: ${err.message})`);
  updateButton("danger", errorString);

}


// Update button text & style
function updateButton(newStyle, newText){

  // Set button style
  switch (newStyle) {
    case "primary":
      a.className = "btn btn-lg btn-primary";
      break;
    case "warning":
      a.className = "btn btn-lg btn-warning";
      break;
    case "danger":
      a.className = "btn btn-lg btn-danger";
      break;
    case "success":
      a.className = "btn btn-lg btn-success";
      break;
    default:
      a.className = "btn btn-lg";
  }

  // Update button text with smooth transition.

  aText.style.opacity = 0;

  setTimeout(function(){
    aText.innerHTML = newText;
    aText.style.opacity = 100;
  }, 500);
}

// Change Stylesheet

function changeStylesheet(sheet){
  document.getElementById("pagestyle").setAttribute("href", sheet);
}


// var initMap = function() {
//   // Create a map object and specify the DOM element for display.
//   console.log("running map");
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 40.6209980, lng: -74.0241120},
//     scrollwheel: false,
//     zoom: 8
//   });
// }

function buildMap(position, version){
  mapDiv.style.height = "200px";
  mapDiv.style.width = "100%";

  var userPosition = {lat: position.coords.latitude, lng: position.coords.longitude};

  if (version == "night") {
    map = new google.maps.Map(document.getElementById('map'), {
      center: userPosition,
      scrollwheel: false,
      zoom: 10,
      styles: mapNightStyle
    });
  } else {
    map = new google.maps.Map(document.getElementById('map'), {
      center: userPosition,
      scrollwheel: false,
      zoom: 10
    });
  }

  var marker = new google.maps.Marker({
    position: userPosition,
    map: map,
    title: 'You are here!'
  });

  mapDiv.style.display = "block";
}
