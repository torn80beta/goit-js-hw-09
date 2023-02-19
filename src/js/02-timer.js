import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

bodyEl = document.querySelector('body');
timerEl = document.querySelector('.timer');
fieldEl = document.querySelector('.field');
valueEl = document.querySelector('.value');
labelEl = document.querySelector('.label');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const myInput = document.querySelector('input#datetime-picker');
const fp = flatpickr(myInput, options);
