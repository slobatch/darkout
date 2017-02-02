var date = new Date();
var a = null;
var locationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

window.onload = function() {

  a = document.getElementById("start-button");
  a.onclick = function() {
    getDark();
  }
}

// Get Position
function error(err){
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function getDark(){
  if (navigator.geolocation) {
    a.innerHTML = "Getting your location..."
    navigator.geolocation.getCurrentPosition(isDark, error, locationOptions);
  } else {
    console.log("Geolocation is not supported by this browser.")
    a.innerHTML = "Your browser doesn't support Geolocation."
    return false;
  }
}

// Get sunrise & sunset times for current location.
function isDark(position){
  console.log(position);
  var times = SunCalc.getTimes(date, position.coords.latitude, position.coords.longitude)
  var dusk = times.dusk;
  var dawn = times.dawn;

  if (date >= dawn && date <= dusk){
    console.log("It's Daytime!");
    document.body.style.backgroundColor = "#fafafa";
    a.innerHTML = "It's light out! Nightmode not enabled.";
  }
  else {
    console.log("It's Nighttime!");
    document.body.style.backgroundColor = "#493a8c";
    a.innerHTML = "It's dark out! Nightmode enabled."
  }
}
