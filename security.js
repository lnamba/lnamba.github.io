//declares local variables, assigning each li tag a variable name
var appName = document.querySelectorAll("#webinfo li")[0];
var appVersion = document.querySelectorAll("#webinfo li")[1];
var platform = document.querySelectorAll("#webinfo li")[2];
var screenHeight = document.querySelectorAll("#webinfo li")[3];
var screenWidth = document.querySelectorAll("#webinfo li")[4];
var pixelDepth = document.querySelectorAll("#webinfo li")[5];

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

// resets innerHTML of variables to open strings
function reset(){
  appName.innerHTML = "";
  appVersion.innerHTML = "";
  platform.innerHTML = "";
  screenHeight.innerHTML = "";
  screenWidth.innerHTML = "";
  pixelDepth.innerHTML = "";
  getWebInfo();
}

//reset page
function resetPage(){
  if(window.addEventListener){
    window.addEventListener("load", reset, false);
  } else if (window.attachEvent){
    window.attachEvent("onload", reset, false);
  }
}