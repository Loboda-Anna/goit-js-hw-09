import Notiflix from 'notiflix';
import throttle from 'lodash.throttle';

const formEl = document.querySelector('.form');
const delayEl = document.querySelector('.form input[name="delay"]');
const stepEl = document.querySelector('.form input[name="step"]');
const amountEl = document.querySelector('.form input[name="amount"]');
const submitBtn = document.querySelector('.form button[type="submit"]');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));
let formData = {};

function onFormInput(event) {
  formData = {
    firstDelay: delayEl.value,
    delay: stepEl.value,
    amount: amountEl.value,
  };
}

function onFormSubmit(event) {
  event.preventDefault();
  setTimeout(() => {
    for (position = 1; position <= formData.amount; position += 1) {
      let delay = formData.delay * position;
      createPromise(position, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
  }, formData.firstDelay);
}

function createPromise(position, delay) {
  const promise = new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
        let resolveObj = {
          position,
          delay,
        };
        console.log(resolveObj);
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
  return promise;
}
