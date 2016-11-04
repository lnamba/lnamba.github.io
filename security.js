"use strict";

//declares local variables, assigning each li tag a variable name
var appName = document.querySelectorAll("#webinfo li")[0];
var appVersion = document.querySelectorAll("#webinfo li")[1];
var platform = document.querySelectorAll("#webinfo li")[2];
var screenHeight = document.querySelectorAll("#webinfo li")[3];
var screenWidth = document.querySelectorAll("#webinfo li")[4];
var pixelDepth = document.querySelectorAll("#webinfo li")[5];
var waitForUser;

// resets innerHTML of variables to open strings
function reset(){
  appName.innerHTML = "";
  appVersion.innerHTML = "";
  platform.innerHTML = "";
  screenHeight.innerHTML = "";
  screenWidth.innerHTML = "";
  pixelDepth.innerHTML = "";
//  getWebInfo();
  document.getElementById("getlocation").addEventListener("click", loadMap, false);
  document.getElementById("map").style.display = "none";
//  createMap();
//  getLocation();
}

// downloads map if not already downloaded
function loadMap(){
  if (typeof google !== 'object') {
    var script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=getLocation";
    document.body.appendChild(script);
  }
}

// gets the current position of the device - if request is successful, createMap() is called and if it fails, fail() is called
function getLocation(){
  waitForUser = setTimeout(fail, 10000); // if after 10 seconds user doesn't respond, call fail() function
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(createMap, fail, {timeout: 10000});
  } else {
    fail();
  }
}

// creates the map on the page
function createMap(position){
  clearTimeout(waitForUser);
  document.getElementById("map").style.display = "block";
//  console.log("Longitude: " + position.coords.longitude);
//  console.log("Latitude: " + position.coords.latitude);
//  console.log("Altitude: " + position.coords.altitude);
  var currentLatitude = position.coords.latitude; // user's latitude
  var currentLongitude = position.coords.longitude; // user's longitude
  var currentAltitude = position.coords.altitude; // user's altitude
  var mapOptions = { 
    center: new google.maps.LatLng(currentLatitude, currentLongitude),
    zoom: 12
  };
  var marker = new google.maps.Marker({ // creates a marker of user's position on the map
    position: new google.maps.LatLng(currentLatitude, currentLongitude),
    map: map
  });
  
  // creates the map and the marker
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  marker.setMap(map);
  
  // handles error when user's altitude shows as "null" (in Chrome browsers)
  var coordinates = document.getElementById("coordinates");
  if (currentAltitude === null){ 
    coordinates.innerHTML = "Latitude: " + currentLatitude + ", Longitude: " + currentLongitude + ", Current altitude not found."
  } else { // else if altitude is available, show it
    coordinates.innerHTML = "Latitude: " + currentLatitude + ", Longitude: " + currentLongitude + ", Altitude: " + currentAltitude;
  }
}

// handles failed requests for location - displays error
function fail(){
//  console.log("Your location could not be found.");
  document.getElementById("coordinates").innerHTML = "<strong>Current location could not be found.</strong>";
  document.getElementById("coordinates").style.color = "red";
}

// uses Navigator object to gather and display information about a user's computer
function getWebInfo(){
  appName.innerHTML = "Your web browser name is: " + "<strong>" + navigator.appName + "</strong>.";
  appVersion.innerHTML = "Your web browser version is: "  + "<strong>" + navigator.appVersion + "</strong>.";
  platform.innerHTML = "Your computer's platform is: " + "<strong>" + navigator.platform + "</strong>.";
  screenHeight.innerHTML = "Your browser screen's height is: " + "<strong>" + screen.height + " pixels</strong>.";
  screenWidth.innerHTML = "Your browser screen's width is: " + "<strong>" + screen.width + " pixels</strong>.";
  pixelDepth.innerHTML = "Your display screen's color resolution is: " + "<strong>" + screen.pixelDepth + " bits per pixel</strong>."
}

//calls getWebInfo function
var getInfoButton = document.getElementById("getinfo");
getInfoButton.addEventListener("click", getWebInfo, false);



//reset page
//function resetPage(){
  if(window.addEventListener){
    window.addEventListener("load", reset, false);
  } else if (window.attachEvent){
    window.attachEvent("onload", reset, false);
  }
//}
