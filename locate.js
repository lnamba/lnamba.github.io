/* Locate Page JS */
/*
CIS166AA Case Project
Name: Lauren Namba
Updated: 
*/


// function gets value of input text area and writes a message to page based on location
function getDistrict(){
  "use strict";
  // these messages will print to page, depending on the state the user inputs
  var messageArea = document.getElementById("messagearea");
  var stateVal = document.getElementById("state").value.toLowerCase();
  var pnwMessage = "Your nearest JACL district is Pacific Northwest District.";
  var ncwnpMessage = "Your nearest JACL district is Northern California-Western Nevada-Pacific District.";
  var ccdcMessage = "Your nearest JACL district is Central California District.";
  var pswMessage = "Your nearest JACL district is Pacific Southwest District.";
  var idcMessage = "Your nearest JACL district is Intermountain District.";
  var mdcMessage = "Your nearest JACL district is Midwest District.";
  var edcMessage = "Your nearest JACL district is Eastern District.";
  
  // switch statement gets the state and prints which district is nearest the user based on their input
  // values are set to lower case, so they are not case sensitive
  switch(stateVal){
    case "washington":
    case "wa":
    case "alaska":
    case "ak":
      messageArea.innerHTML = pnwMessage;
      break;
    case 'hawaii':
    case "hi":
      messageArea.innerHTML = ncwnpMessage;
      break;
    case "arizona":
    case "az":
    case "new mexico":
    case "nm":
      messageArea.innerHTML = pswMessage;
      break;
    case "utah":
    case "ut":
    case "montana":
    case "mt":
    case "wyoming":
    case "wy":
    case "colorado":
    case "co": 
      messageArea.innerHTML = idcMessage;
      break;
    case "illinois":
    case "il":
    case "ohio":
    case "oh":
    case "missouri":
    case "mo":
    case "minnesota":
    case "mn":
    case "michigan":
    case "mi":
    case "indiana":
    case "in":
    case "wisconsin":
    case "wi":
    case "iowa":
    case "ia":
    case "kentucky":
    case "ky":
    case "tennesse":
    case "tn":
    case "mississippi":
    case "ms":
    case "texas":
    case "tx":
    case "nebraska":
    case "ne":
    case "kansas":  
    case "ks":
    case "north dakota":
    case "nd":
    case "south dakota":
    case "sd":
    case "louisiana":
    case "la":
    case "oklahoma":
    case "ok":
    case "arkansas":
    case "ar":
    case "alabama":
    case "al":
      messageArea.innerHTML = mdcMessage;
      break;
    case "maine":
    case "me":
    case "vermont":  
    case "vt":
    case "new hampshire":
    case "nh":
    case "new york":
    case "ny":
    case "new jersey":
    case "nj":
    case "pennsylvania":
    case "pa":
    case "massachusettes":
    case "ma":
    case "connecticut":
    case "ct":
    case "delaware":
    case "de":
    case "maryland":
    case "md":
    case "rhode island":
    case "ri":
    case "virginia":
    case "va":
    case "west virginia":
    case "wv":
    case "north carolina":
    case "nc":
    case "south carolina":
    case "sc":
    case "georgia":
    case "ga":
    case "florida":
    case "fl":
    case "washington dc":
    case "dc":
    case "washington, dc":
    case "washington, d.c.":
    case "district of columbia":
      messageArea.innerHTML = edcMessage;
      break;
   // the following states have more than one district per state, so prompts capture user input
      // condition if/else statements are used to direct to correct district
    case "california":
    case "ca":
      var caliPrompt = prompt("Do you live in Northern, Central or Southern California?").toLowerCase();
      if(caliPrompt === "northern" || caliPrompt === "nothern california" || caliPrompt === "northern ca"){
        messageArea.innerHTML = ncwnpMessage;
      } else if(caliPrompt === "central" || caliPrompt === "central california" || caliPrompt === "central ca"){
        messageArea.innerHTML = ccdcMessage;
      } else if(caliPrompt === "southern" || caliPrompt === "southern california" || caliPrompt === "southern ca"){
        messageArea.innerHTML = pswMessage;
      }
      break;
    case "id":
    case "idaho":
      var idahoPrompt = prompt("Do you live in the Idaho 'Panhandle' (Northern Idaho)?").toLowerCase();
      if(idahoPrompt === "yes"){
        messageArea.innerHTML = pnwMessage;
      } else {
        messageArea.innerHTML = idcMessage;
      }
      break;
    case "oregon":
    case "or":
      var oregonPrompt = prompt("Do you live in Southeastern, Southwestern or Northern Oregon?").toLowerCase();
      if(oregonPrompt === "southeastern" || oregonPrompt === "southeastern oregon" || oregonPrompt === "se" || oregonPrompt === "se oregon"){
        messageArea.innerHTML = idcMessage;
      } else {
        messageArea.innerHTML = pnwMessage;
      }
      break;
    case "nevada":
    case "nv":
      var nevadaPrompt = prompt("Do you live in Northwestern, Southern or Northeastern Nevada?").toLowerCase();
      if(nevadaPrompt === "northwestern" || nevadaPrompt === "northwestern nevada" || nevadaPrompt === "northwestern nv" || nevadaPrompt === "nw" || nevadaPrompt === "nw nevada"){
        messageArea.innerHTML = ncwnpMessage;
      } else if(nevadaPrompt === "southern" || nevadaPrompt === "southern nevada" || nevadaPrompt === "southern nv"){
        messageArea.innerHTML = pswMessage;
      } else if (nevadaPrompt === "northeastern" || nevadaPrompt === "northeastern nevada" || nevadaPrompt === "northeastern nv" || nevadaPrompt === "ne" || nevadaPrompt === "ne nevada"){
        messageArea.innerHTML = idcMessage;
      }
      break;  
      // this displays when no input is given
    default:
      messageArea.innerHTML = "Which U.S. state do you live in?";
      return false;
      break;
  }
}

/* 
function with try throw catch statements check to see if field is blank
if so, error to please enter a state is thrown
*/
function errorMes(){
  try {
    var tryState = document.getElementById("state").value;
    // checks input field for value
    if(tryState === ""){
      throw "Error: Please enter a U.S. state to get nearest district."
    }
  }
  catch(err){
    window.alert(err);
    return false;
  }
}

/* 
function to check whether value provided is valid US state
if not, error that location is not found is thrown
*/
function errorMes2(){
  var tryState = document.getElementById("state").value;
  try{
    /* Checks the value of the input field. If the default 
    value in the getDistrict() function was returned
    AND the input field was not blank, err2 is thrown.
    */
    if(getDistrict() === false && tryState !== ""){
      throw "Error: This location was not found."
    }
  }
  catch(err2){
    window.alert(err2);
    return false;
  }
}
  
// resets the input to empty
function resetLocate(){
  document.getElementById("state").value = "";
  getDistrict();
  locateEventListeners();
}

// depending on browser, fires the getDistrict function on click of "Locate" button
function locateEventListeners(){
  var locateButton = document.getElementById("locatebutton");
  if(locateButton.addEventListener){
    locateButton.addEventListener("click", getDistrict, false);
  } else if(locateButton.attachEvent){
    locateButton.attachEvent("onclick", getDistrict);
  }
  locateButton.addEventListener("click", errorMes, false);
  locateButton.addEventListener("click", errorMes2, false); // testing this
}

// resets join form back to orginal values each time the browser loads
window.addEventListener("load", resetLocate, false);