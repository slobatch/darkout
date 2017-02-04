// Variable Definition.
var defaultSheet = "/darkout/css/main.css";
var lightSheet = "/darkout/css/main.css";
var darkSheet = "/darkout/css/dark-main.css";
var lightButtonString = "It's light out! <span class='emoji'>😎</span>";
var darkButtonString = "It's dark out! <span class='emoji'>😴</span>";
var loadButtonString = "Getting your location... <i class='fa fa-spinner fa-spin' aria-hidden='true'></i>";
var errorString = "<i class='fa fa-exclamation-triangle' aria-hidden='true'></i> Please approve location permissions...";
var unsupportedButtonString = "<i class='fa fa-exclamation-triangle' aria-hidden='true'></i> Browser doesn't support location... ";


var date = null;
var a = null;
var aText = null;

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

  //console.log(position);

  var times = SunCalc.getTimes(date, position.coords.latitude, position.coords.longitude);
  var dusk = times.dusk;
  var dawn = times.dawn;

  if (date > dawn && date < dusk){

    changeStylesheet(lightSheet);
    updateButton("success", lightButtonString);

  } else {

    changeStylesheet(darkSheet);
    updateButton("success", darkButtonString);

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
