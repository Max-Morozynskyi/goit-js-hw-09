import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';


const form = document.querySelector('.form');
const firstDelay = form.querySelector('[name="delay"]');
const delayStep = form.querySelector('[name="step"]');
const amount = form.querySelector('[name="amount"]');


form.addEventListener('submit', submitCreatePromises);

function submitCreatePromises(e) {

  e.preventDefault();

  let delay = firstDelay.valueAsNumber;
  const delayStepMsVal = delayStep.valueAsNumber;
  const amountVal = amount.valueAsNumber;

  for (let i = 1; i <= amountVal; i += 1) {
    createPromise(i, delay)
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
    delay += delayStepMsVal;
  }
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}