"use strict";

//declares local variables, assigning each li tag a variable name
var appName = document.querySelectorAll("#webinfo li")[0];
var appVersion = document.querySelectorAll("#webinfo li")[1];
var platform = document.querySelectorAll("#webinfo li")[2];
var screenHeight = document.querySelectorAll("#webinfo li")[3];
var screenWidth = document.querySelectorAll("#webinfo li")[4];
var pixelDepth = document.querySelectorAll("#webinfo li")[5];
var waitForUser;
var httpRequest = false;
var yourWeather;
var temp;
var conditions;
var weatherField = document.getElementById("weatherfield");
var getWeather = document.getElementById("getweather");
var weatherError = document.getElementById("weathererror");

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
  document.getElementById("getweather").addEventListener("click", loadWeather, false);
  document.getElementById("getweather").addEventListener("click", validateWeather, false);
}

// downloads map if not already downloaded
function loadMap(){
  if (typeof google !== 'object') {
    var script = document.createElement("script");
//    script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=getLocation";
    script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAihNodhBTdz2DLtT7dnaQqWc5gHn0YH74&callback=getLocation";
    document.body.appendChild(script);
  }
}

// gets the current position of the device - if request is successful, createMap() is called and if it fails, fail() is called
function getLocation(){
  waitForUser = setTimeout(fail, 10000); // if after 10 seconds
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

/* Chapter 11 Code */

// function resquests location, temperature, and weather condition data from OpenWeatherMap api
function loadWeather(){
  // instantiates an XMLHttpRequest object and store in a var called httpRequest
  var httpRequest = new XMLHttpRequest();
  // gets the user's inputed zip code
  var loc = document.getElementById("zipweather").value;
  // opens a GET request - includes the URL of the api data for getting weather by a user's zip code, also converts to imperial units
  // The end of the URL is the API key downloaded from the OpenWeatherMap site
  httpRequest.open("GET","http://api.openweathermap.org/data/2.5/weather?zip=" + loc + ",us&units=imperial&appid=3313b9d0c68fb1fc126ff0ebed305e65", false);
  // sends the request
  httpRequest.send();
  console.log(httpRequest.status);
  console.log(httpRequest.readyState);
  // if the request is complete and was successful, do the following
  if(httpRequest.readyState === 4 && httpRequest.status === 200) {
    // parses the data
    yourWeather = JSON.parse(httpRequest.responseText);
    // changes the values of the temp and conditions variables to the API calls (I got these from the OpenWeatherMap API documentation)
    temp = Math.round(yourWeather.main.temp);
    conditions = yourWeather.weather[0].main;
    // changes CSS props to create a fieldset with the user's weather data from API
    weatherField.style.display = "inline-block";
    weatherField.style.border = "3px solid black";
    weatherField.style.borderRadius = "15px";
    weatherField.style.padding = "25px 50px";
    weatherField.style.margin = "30px auto";
    weatherField.style.backgroundColor = "#b3cce6";
    weatherField.style.maxWidth = "100%";
    getWeather.style.display = "block";
    getWeather.style.margin = "0 auto";
    // prints the current city, temperature, and conditions
    document.getElementById("city").innerHTML = "Current Location: " + yourWeather.name;
    document.getElementById("temp").innerHTML = "Current Temperature: " + temp + "°F.";
    document.getElementById("conditions").innerHTML = "Current Conditions: " + conditions;
  } else {
    weatherField.style.display = "none";
  }
}

// function validates the zip field and checks for a 5-digit value
function validateWeather(){
  var loc = document.getElementById("zipweather");
  var validWeather = true;
  
  // if the field is empty, if the value is not a number, or if value's length is > 0 and not 5, throw error
  try {
    if(loc.value === "" || (isNaN(loc.value)) || (loc.value.length !== 5) && (loc.value !== "")){
      validWeather = false;
      loc.style.border = "2px solid red";
      weatherField.style.display = "none";
      throw "Please enter a 5-digit zip code.";
    } else {
      loc.style.border = "";
      weatherError.innerHTML = "";
    }
  }
  catch(err) {
    weatherError.innerHTML = "<strong>" + err + "</strong>";
    weatherError.style.color = "red";
  }
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
  if(window.addEventListener){
    window.addEventListener("load", reset, false);
  } else if (window.attachEvent){
    window.attachEvent("onload", reset, false);
  }
