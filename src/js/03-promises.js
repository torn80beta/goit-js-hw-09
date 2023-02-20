const refs = {
  delayEl: document.querySelector('input[name=delay]'),
  stepEl: document.querySelector('input[name=step]'),
  amountEl: document.querySelector('input[name=amount]'),
  submitButtonEl: document.querySelector('button[type=submit]'),
};

console.log(refs.delayEl, refs.stepEl, refs.amountEl);

refs.submitButtonEl.addEventListener('click', e => {
  e.preventDefault();
  let delay = Number(refs.delayEl.value);
  const step = Number(refs.stepEl.value);
  const amount = Number(refs.amountEl.value);
  console.log(`Delay -> ${delay}, Step -> ${step}, Amount -> ${amount}`);

  for (let index = 1; index <= amount; index++) {
    setTimeout(() => {
      console.log(`Creating ${index} Promise with ${delay} delay.`);
      createPromise(index, step, delay);
      delay += step;
    }, 0);
  }
});

function createPromise(index, step, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    const promise = new Promise(() => {
      setTimeout(
        () => console.log(`✅ Fulfilled promise ${index} in ${delay}ms`),
        delay
      );
    });
  } else {
    const promise = new Promise(() => {
      setTimeout(
        () => console.log(`❌ Rejected promise ${index} in ${delay}ms`),
        delay
      );
    });
  }
}
