import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timerEl = document.querySelector('.timer');
const fields = document.querySelectorAll('.field');
const values = document.querySelectorAll('.value');
const startBtn = document.querySelector('button[data-start]');
const daysValueEl = document.querySelector('span[data-days]');
const hoursValueEl = document.querySelector('span[data-hours]');
const minutesValueEl = document.querySelector('span[data-minutes]');
const secondsValueEl = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      Notiflix.Notify.success('Successfully! Press START');
      startBtn.disabled = false;
    }
  },
};

const flatpickrInit = flatpickr(
  document.querySelector('#datetime-picker'),
  options
);

startBtn.disabled = true;

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  let selectedDateMs = flatpickrInit.selectedDates[0].getTime();
  const timerId = setInterval(() => {
    let differenceMs = selectedDateMs - new Date();
    let differenceMsObj = convertMs(differenceMs);
    let { days, hours, minutes, seconds } = differenceMsObj;
    daysValueEl.textContent = addLeadingZero(days);
    hoursValueEl.textContent = addLeadingZero(hours);
    minutesValueEl.textContent = addLeadingZero(minutes);
    secondsValueEl.textContent = addLeadingZero(seconds);
    if (differenceMs < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


timerEl.style.display = 'flex';
timerEl.style.gap = '20px';
timerEl.style.marginTop = '20px';

const styledFieldEls = Array.from(fields).map(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.alignItems = 'center';
  field.style.textTransform = 'uppercase';
});

const styledValueEls = Array.from(values).map(value => {
  value.style.fontSize = '45px';
  value.style.fontWeight = '500';
});
