const formEl = document.querySelector('.form');
const delayEl = document.querySelector('.form input[name="delay"');
const stepEl = document.querySelector('.form input[name="step"');
const numberEl = document.querySelector('.form input[name="number"');
const submitBtn = document.querySelector('.form button[type="submit"');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  createPromise();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
console.log(submitBtn);
