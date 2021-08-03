// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', function(e){
  //hide results
  document.querySelector('#results').style.display = 'none';
  
  
  //show loader
  document.querySelector('#loading').style.display = 'block';

  setTimeout(calculateResults, 2000);
  
  e.preventDefault()

});

// Calculate results 
function calculateResults() {
console.log('Calculating...');
// UI vars
const amount = document.querySelector('#amount');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const monthlyPayment = document.querySelector('#monthly-payment');
const totalPayment = document.querySelector('#total-payment');
const totalInterest = document.querySelector('#total-interest');

//calculation vars
const principal = parseFloat(amount.value);
const calculatedInterest = parseFloat(interest.value) / 100 / 12;
const calculatedPayments = parseFloat(years.value) * 12;


// Compute the monthly payments
const x = Math.pow(1 + calculatedInterest, calculatedPayments);
const monthly = (principal*x*calculatedInterest) / (x-1);


if (isFinite(monthly)) {
  monthlyPayment.value = monthly.toFixed(2);
  totalPayment.value = (monthly * calculatedPayments).toFixed(2);
  totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
  
  //show results
  document.querySelector('#results').style.display = 'block';

  //hide loader
  document.querySelector('#loading').style.display = 'none';
} else {
  showError('Please check ur numbers');
  document.querySelector('#loading').style.display = 'none';
}




}


// Show error
function showError(error) {
  // create a div
  const errorDiv = document.createElement('div');

  //get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  //create textnode and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear error after 3 seconds
  setTimeout(clearError, 3000);
}


// clear error
function clearError() {
  document.querySelector('.alert').remove();
}