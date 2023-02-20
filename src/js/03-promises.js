const refs = {
  delayEl: document.querySelector('input[name=delay]'),
  stepEl: document.querySelector('input[name=step]'),
  amountEl: document.querySelector('input[name=amount]'),
  submitButtonEl: document.querySelector('button[type=submit]'),
};

// console.log(refs.delayEl, refs.stepEl, refs.amountEl);

refs.submitButtonEl.addEventListener('click', e => {
  e.preventDefault();
  let delay = Number(refs.delayEl.value);
  const step = Number(refs.stepEl.value);
  const amount = Number(refs.amountEl.value);
  // console.log(`Delay -> ${delay}, Step -> ${step}, Amount -> ${amount}`);

  for (let index = 1; index <= amount; index++) {
    setTimeout(() => {
      createPromise(index, delay)
        .then(({ index, delay }) => {
          console.log(`✅ Fulfilled promise ${index} in ${delay}ms`);
        })
        .catch(({ index, delay }) => {
          console.log(`❌ Rejected promise ${index} in ${delay}ms`);
        });
      delay += step;
    }, 0);
  }
});

function createPromise(index, delay) {
  const promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.5;
      if (shouldResolve) {
        resolve({ index, delay });
      } else {
        reject({ index, delay });
      }
    }, delay);
  });
  return promise;
}

createPromise(2, 1500)
  .then(({ index, delay }) => {
    console.log(`✅ Fulfilled promise ${index} in ${delay}ms`);
  })
  .catch(({ index, delay }) => {
    console.log(`❌ Rejected promise ${index} in ${delay}ms`);
  });
