import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/dark.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

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
      Report.failure('Error', 'Please choose a date in the future.', 'Okay');
      selectedDates.pop();
    } else {
      startButtonEl.toggleAttribute('disabled');
    }
    startButtonEl.addEventListener('click', () => {
      const targetDate = selectedDates[0];
      counter = setInterval(() => {
        timeLeft = targetDate - Date.now();
        if (timeLeft < 1000) {
          Report.info('Info', "Time's up!", 'Okay');
          clearInterval(counter);
        }
        timerUpdater(timeLeft);
      }, 1000);
    });
  },
};

const fp = flatpickr(dateInput, options);

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
