

function createYearSelect(){
  var currYear = new Date().getFullYear();
  var firstYear = currYear - 116;
  var select = document.getElementById("contactyear");
  for (var i = firstYear; i <= currYear; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    select.appendChild(option);
  }
  select.selectedIndex = -1;
}

function getElapsedTime(){
  //declare local variables
  var currentDate = new Date();
  var dateToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  var usersDay = document.getElementById("contactday");
  var usersMonth = document.getElementById("contactmonth");
  var usersYear = document.getElementById("contactyear");
  var preYears;
  var elapsedYears;
  var elapsedTimeDiv = document.getElementById("elapsedtime");
  var usersDate = new Date(usersYear.value, usersMonth.value - 1, usersDay.value);
  var preDays;
  var elapsedDays;
  var leapYear = parseInt(usersYear.value);
  var preMonths = (dateToday.getFullYear() - usersDate.getFullYear()) * 12; //get months between 2 dates
  preMonths -= usersDate.getMonth();
  preMonths += dateToday.getMonth();
  if (preMonths <= 0) { //if no months
    console.log(0);
  } else { 
  if (preMonths >= 12) { // if there are months, take the floor number and print as years
    preYears = preMonths / 12;
    elapsedYears = Math.floor(preYears);
  }  else { // print 0 if there are no years
    elapsedYears = 0;
  }
  if (dateToday.getDate() > usersDate.getDate()) { // if the date of today is bigger than the date of the user's choice
    elapsedDays = dateToday.getDate() - usersDate.getDate(); //simple subtraction to get leftover days
    if (preMonths >= 12) { // if more than 11 months returned, divide by 12 to get years
      preMonths = Math.floor(preMonths % 12); //get remainder and store as the months
    }
//    console.log(preDays);
  } else {
      if (usersMonth.value === "2") { //if in February
        if (leapYear % 4 === 0 && leapYear % 100 !== 0 || leapYear % 400 === 0) { //check for leap year
          preMonths = (preMonths % 12) - 1;
          elapsedDays = 29 - (usersDate.getDate() - dateToday.getDate()); //subtract time between user's date and current date from 29 days in leap year
        } else { // if Feb but not a leap year
        preMonths = (preMonths % 12) - 1;
        elapsedDays = 28 - (usersDate.getDate() - dateToday.getDate()); //change subtract to 28 in regular Feb month
//        console.log(elapsedDays);
        }
      } else if (usersMonth.value === "4" || usersMonth.value === "6" || usersMonth.value === "9" || usersMonth.value === "11") { // these months have 30 days
        preMonths = (preMonths % 12) - 1;
        elapsedDays = 30 - (usersDate.getDate() - dateToday.getDate());
//        console.log(elapsedDays);
      } else { //else, month has 31 days
        preMonths = (preMonths % 12) - 1;
        elapsedDays = 31 - (usersDate.getDate() - dateToday.getDate());
      }
  } //print total below in elapsedTimeDiv and change innerHTML
    elapsedTimeDiv.innerHTML = elapsedYears + " years, " + preMonths + " months and " + elapsedDays + " days have elapsed since the date you selected."
  }
}

// removes default select values
function removeDefaultVal(){
  var clearSelects = document.getElementsByTagName("select");
  for (var i = 0; i < clearSelects.length; i++) {
    clearSelects[i].selectedIndex = -1;
  }
}

/* remove the defaults of select tags on load */
function resetContact(){
  removeDefaultVal();
  createYearSelect();
  createTimeListeners();
}

// event handler for the elapsed time button - when pressed it fires the getElapsedTime function
function createTimeListeners(){
  var getElapsedTimeButton = document.getElementById("contactbutton");
  if (getElapsedTimeButton.addEventListener) {
    getElapsedTimeButton.addEventListener("click", getElapsedTime, false);
  } else if (getElapsedTimeButton.attachEvent) {
    getElapsedTimeButton.attachEvent("onclick", getElapsedTime);
  }
}

/* call to set up page */
window.addEventListener("load", resetContact, false);