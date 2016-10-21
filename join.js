/* Locate Page JS */
/*
CIS166AA Case Project
Name: Lauren Namba
Date: 10/1/16
*/

 
/* global variables */
var formValidity = true;
var totalCost = 0;
var userInterests = [];
/* 
gets total memberships by multiplying number of memberships by cost of each 
then updates the totalCost variable with the sum of all three membership totals; 
prints to the page
*/
function memTotal(){
  // defines local variables - memTotal function
  var individual = document.getElementById("individual");
  var family = document.getElementById("family");
  var student = document.getElementById("student");
  var total = document.getElementById("total");
  // adds the quantity * price of membership together
  if(individual.checked){
    totalCost = 60;
    total.innerHTML = "$" + totalCost;
  } else if(family.checked){
    totalCost = 105;
    total.innerHTML = "$" + totalCost;
  } else if(student.checked){
    totalCost = 25;
    total.innerHTML = "$" + totalCost;
  }
}

/* function to remove select defaults */
function removeSelectDefault(){
  var state = document.getElementById("state");
  state.selectedIndex = -1;
}

/* function to validate basic info fields: first, last, bday */
function validateBasicInfo(){
    var basicInfoInputs = document.querySelectorAll("#basicinfo input");
    var joinErr = document.getElementById("basicInfoErr");
    var basicInfoValidity = true;
    var elementCount = basicInfoInputs.length;
    var currentElement;
  try{
    for(var i = 0; i < elementCount; i++){
      currentElement = basicInfoInputs[i];
      if(currentElement.value === ""){
        currentElement.style.border = "2px solid red";
        basicInfoValidity = false;
      } else {
        currentElement.style.border = "";
      }
    }
    if(basicInfoValidity === false){ //throw this error if any basic info missing
      throw "Please complete all basic information fields."
    } else {
      joinErr.style.display = "none";
      joinErr.innerHTML = "";
    }
  }
  catch(err){
    joinErr.innerHTML = "<strong>" + err + "</strong>";
    joinErr.style.textDecoration = "underline";
    formValidity = false;
  }
}

/* funciton to validate gender male or female checked */
function validateGender(){
  var joinErr = document.getElementById("genderErr");
  var genderValidity = true;
  var male = document.getElementById("male");
  var female = document.getElementById("female");
  try{
    if(!male.checked && !female.checked){
      male.style.outline = "2px solid red";
      female.style.outline = "2px solid red";
      genderValidity = false;
    } else {
      male.style.outline = "";
      female.style.outline = "";
    }
    if(genderValidity === false){ //if neither option checked, throw error
      throw "Please check your gender.";
    } else {
      joinErr.style.display = "none";
    }
  }
  catch(err){
    joinErr.innerHTML = "<strong>" + err + "</strong>";
    joinErr.style.textDecoration = "underline";
    formValidity = false;
  }
}

/* function to validate address fields */
function validateAddress(){
  var addressInputs = document.querySelectorAll("#addressinfo .addressfield");
  var joinErr = document.getElementById("addressErr");
  var addressInfoValidity = true;
  var elementCount = addressInputs.length;
  var currentElement;
  var zipErr = document.getElementById("zipErr");
  var zip = document.getElementById("zip");
  try{
    for(var i = 0; i < elementCount; i++){
      currentElement = addressInputs[i];
      if(currentElement.value === ""){
        currentElement.style.border = "2px solid red";
        addressInfoValidity = false;
      } else {
        currentElement.style.border = "";
      }
    }
    // checks that state field is not empty
    currentElement = document.getElementById("state");
    if(currentElement.selectedIndex === -1){
      currentElement.style.border = "2px solid red";
      basicInfoValidity = false;
    } else {
      currentElement.style.border = "";
    }
    if(addressInfoValidity === false){ // if any address info missing throw error
      throw "Please complete all address fields.";
    } else {
      joinErr.style.display = "none";
      joinErr.innerHTML = "";
    }
  }
  catch(err){
    joinErr.innerHTML = "<strong>" + err + "</strong>";
    joinErr.style.textDecoration = "underline";
    formValidity = false;
  }
  // second try statement throws an error if the zip is not a 5-digit long number
  try{
    if((isNaN(zip.value)) || (zip.value.length !== 5) && (zip.value !== "")){
      zipValidity = false;
      zip.style.border = "2px solid red";
      throw "Please input your five-digit zip code.";
    } else if((isNaN(zip.value)) || (zip.value.length !== 5)){
      zipValidity = false;
      zip.style.border = "2px solid red";
    } else {
      zip.style.border = "";
      zipErr.innerHTML = "";
    } 
  }
  catch(err){
    zipErr.innerHTML = "<strong>" + err + "</strong>";
    zipErr.style.textDecoration = "underline";
    formValidity = false;
  }
}

/* function to validate membership, user must choose one type */
function validateMembership(){
  var memberErr = document.getElementById("memberErr");
  var memberValidity = true;
  var individual = document.getElementById("individual");
  var family = document.getElementById("family");
  var student = document.getElementById("student");
  try {
    if(!individual.checked && !family.checked && !student.checked){
      individual.style.outline = "2px solid red";
      family.style.outline = "2px solid red";
      student.style.outline = "2px solid red";
      memberValidity = false;
    } else {
      individual.style.outline = "";
      family.style.outline = "";
      student.style.outline = "";
    }
    if(memberValidity === false){ // if none of the membership options selected
      throw "Please choose a membership type.";
    } else {
      memberErr.style.display = "none";
    }
  }
  catch(err){
    memberErr.innerHTML = "<strong>" + err + "</strong>";
    memberErr.style.textDecoration = "underline";
    formValidity = false;
  }
}

/* this function retrieves the users selections on interest checkboxes and depending if they check or uncheck each box, either adds or deletes each property from the userInterests array defined in the global variable section */
function getInterests() {
  // local variables
  var listItems = document.querySelectorAll("#meminterests input");
  var interests = document.querySelectorAll("#meminterests label");
  var interestMessage = document.getElementById("interestmessage");
  var interestBlock = document.getElementById("interestblock");
 
  //for loop runs through each box to see if it is checked or not
  for (var i = 0; i < listItems.length; i++) {
    if (listItems[i].checked) { //if it is checked create new li stored in newInterest
      var newInterest = document.createElement("li");
      if (userInterests.indexOf(listItems[i].value) === -1) { //if the current checked box is not in the userInterest array already, add it with push() method
          userInterests.push(listItems[i].value);
          newInterest.innerHTML = listItems[i].value; //change the innerHTML of the new li to the currently checked box's value
          interestMessage.appendChild(newInterest); //append new li to ul "interestMessage"  
          interestBlock.style.display = "block"; //show results
          interestMessage.style.display = "block";
        }
      } else { //if the box is not checked, create a new variable and get all lis in the ul "interestmessage"
      var interestLis = document.querySelectorAll("#interestmessage li");
      for (var j = 0; j < interestLis.length; j++) { //loop through the present lis in interestMessage 
        /*if the current unchecked box is already in the array "userInterests" AND 
          if its value is the same as the innerHTML of a present li that has been appended to the interestMessage element
        */  
        if ((userInterests.indexOf(listItems[i].value)) > -1 && (interestLis[j].innerHTML === listItems[i].value)){
          interestMessage.removeChild(interestLis[j]); //remove that li from interestMessage and remove from array
          userInterests.splice(j, 1); 
        }
      }  
    }
  }
}

/* function to validate form */
function validateForm(evt){
  if(evt.preventDefault){
    evt.preventDefault(); 
  } else {
    evt.returnValue = false; // works for IE8
  }
  formValidity = true;
  validateBasicInfo();
  validateGender();
  validateAddress();
  validateMembership();
  if(formValidity === true){
    document.getElementById("formError").innerHTML = "";
    document.getElementById("formError").style.display = "none";
  } else {
    document.getElementById("formError").innerHTML = "<strong>Please fix all errors below:</strong>";
    document.getElementById("formError").style.display = "block";
    document.getElementById("formError").style.textDecoration = "underline";
  }
}

/* function sets up page on load */
function reset(){
  memTotal();
  removeSelectDefault();
  joinEventListeners();
}

/* function fires event listeners */
function joinEventListeners(){
  var submit = document.getElementById("submitbutton");
  if(submit.addEventListener){
    submit.addEventListener("click", memTotal, false);
    submit.addEventListener("click", validateForm, false);
    submit.addEventListener("click", validateBasicInfo, false);
    submit.addEventListener("click", validateGender, false);
    submit.addEventListener("click", validateAddress, false);
    submit.addEventListener("click", validateMembership, false);
    submit.addEventListener("click", getInterests, false);
  } else if(submit.attachEvent){
    submit.attachEvent("onclick", validateForm);
    submit.attachEvent("onclick", validateBasicInfo);
    submit.attachEvent("onclick", validateGender);
    submit.attachEvent("onclick", validateAddress);
    submit.attachEvent("onclick", validateMembership);
    submit.attachEvent("onclick", memTotal);
    submit.attachEvent("onclick", getInterests);
  }
}

/* call to set up page */
window.addEventListener("load", reset, false);
