var date = new Date();
var a = null;
var aText = null;
var locationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

window.onload = function() {

  a = document.getElementById("start-button");
  aText = document.getElementsByClassName("button-text")[0];
  a.onclick = function() {
    getDark();
  }
}

// Get Position
function error(err){
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function transitionText(newText){

  aText.style.opacity = 0;

  setTimeout(function(){
    aText.innerHTML = newText;
    aText.style.opacity = 100;
  }, 500);
}

function getDark(){

  if (navigator.geolocation) {

    a.className = "btn btn-lg btn-warning";

    document.body.style.backgroundColor = "";
    document.body.style.color = "";

    transitionText("Getting your location... <i class='fa fa-spinner fa-spin'></i>");

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
    document.body.style.backgroundColor = "";
    document.body.style.color = "";
    a.className = "btn btn-lg btn-success";
    transitionText("It's light out! Nightmode not enabled.");
  }
  else {
    console.log("It's Nighttime!");
    document.body.style.backgroundColor = "#493a8c";
    document.body.style.color = "#fafafa";
    a.className = "btn btn-lg btn-success";
    transitionText("It's dark out! Nightmode enabled.");
  }
}
