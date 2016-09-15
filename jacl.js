// defines global variables
var totalCost = 0;

/* 
gets total memberships by multiplying number of memberships by cost of each 
then updates the totalCost variable with the sum of all three membership totals; 
prints to the page
*/
function memTotal(){
  // defines local variables - memTotal function
  var indivMembers = document.getElementById("individual").value * 60;
  var famMembers = document.getElementById("family").value * 105;
  var stuMembers = document.getElementById("student").value * 25;
  // adds the quantity * price of membership together
  totalCost = indivMembers + famMembers + stuMembers;
  document.getElementById("total").innerHTML = "$" + totalCost;
}

// sets original values
function reset(){
  document.getElementById("individual").value = 0;
  document.getElementById("family").value = 0;
  document.getElementById("student").value = 0;
  memTotal();
  btnSubmit();
}

// adds totals to fire memTotal function and adds backward compatible event listener if using IE8 or earlier
function btnSubmit(){
  var submit = document.getElementById("submitbutton");
  if(submit.addEventListener){
    submit.addEventListener("click", memTotal, false);
  } else if(submit.attachEvent){
    submit.attachEvent("onclick", memTotal);
  }
}

// resets join form back to orginal values each time the browser loads
window.addEventListener("load", reset, false);
