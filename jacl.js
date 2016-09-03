// defines global variables
var totalCost = 0;

/* 
gets total memberships by multiplying number of memberships by cost of each 
then updates the totalCost variable with the sum of all three membership totals
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
  events();
}

/* 
adds event listener function 
every time there is a change, the memTotal function will be triggered and each element total will be updates again
*/
function events(){
  document.getElementById("individual").addEventListener("change", memTotal, false);
  document.getElementById("family").addEventListener("change", memTotal, false);
  document.getElementById("student").addEventListener("change", memTotal, false);
}

// resets form back to orginal values each time the browser loads
window.addEventListener("load", reset, false);