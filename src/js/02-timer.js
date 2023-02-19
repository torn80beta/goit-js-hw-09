import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/dark.css';

// bodyEl = document.querySelector('body');
// timerEl = document.querySelector('.timer');
// fieldEl = document.querySelector('.field');
//labelEl = document.querySelector('.label');
daysValueEl = document.querySelector('.value[data-days]');
hoursValueEl = document.querySelector('.value[data-hours]');
minsValueEl = document.querySelector('.value[data-minutes]');
secValueEl = document.querySelector('.value[data-seconds]');
startButtonEl = document.querySelector('button[data-start]');
startButtonEl.setAttribute('disabled', '');

const dateInput = document.querySelector('input#datetime-picker');
let counter;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now() || selectedDates[0] === undefined) {
      window.alert('Please choose a date in the future');
    } else {
      startButtonEl.toggleAttribute('disabled');
    }
    startButtonEl.addEventListener('click', () => {
      //   console.log(selectedDates[0]);
      const targetDate = selectedDates[0];
      counter = setInterval(() => {
        timeLeft = targetDate - Date.now();
        if (timeLeft < 1000) {
          clearInterval(counter);
        }
        timerUpdater(timeLeft);
        // console.log(timeLeft);
      }, 1000);
    });
  },
};

const fp = flatpickr(dateInput, options);

//console.log(daysValueEl, hoursValueEl, minsValueEl, secValueEl);

function timerUpdater(time) {
  daysValueEl.textContent = String(convertMs(time).days).padStart(2, '0');
  hoursValueEl.textContent = String(convertMs(time).hours).padStart(2, '0');
  minsValueEl.textContent = String(convertMs(time).minutes).padStart(2, '0');
  secValueEl.textContent = String(convertMs(time).seconds).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
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
