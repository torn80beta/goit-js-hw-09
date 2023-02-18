const bodyEl = document.querySelector('body');
const startButtonEl = document.querySelector('button[data-start]');
const stopButtonEl = document.querySelector('button[data-stop]');
let intID;

startButtonEl.addEventListener('click', () => {
  startButtonEl.setAttribute('disabled', '');
  stopButtonEl.removeAttribute('disabled', '');
  colorChanger();
});

stopButtonEl.addEventListener('click', () => {
  startButtonEl.removeAttribute('disabled', '');
  stopButtonEl.setAttribute('disabled', '');
  clearInterval(intID);
});

function colorChanger() {
  intID = setInterval(
    () => (bodyEl.style.backgroundColor = getRandomHexColor()),
    1000
  );
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
