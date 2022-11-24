import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const startBtn = document.querySelector('button[data-start]');
const userDate = document.querySelector('#datetime-picker');
const d = document.querySelector('span[data-days]');
const h = document.querySelector('span[data-hours]');
const m = document.querySelector('span[data-minutes]');
const s = document.querySelector('span[data-seconds]');

startBtn.disabled = true;
let selectedDateGlobal = 0;

startBtn.addEventListener("click", countdownTime);
flatpickr(userDate, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDate) {
    if (selectedDate[0].getTime() <= Date.now()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future', { timeout: 3000 });
      return
    } 
      startBtn.disabled = false;
      selectedDateGlobal = selectedDate[0].getTime();
  }
});

function countdownTime() {

  timerDOMaker(convertMs(selectedDateGlobal - Date.now()))

  let timer = setInterval(() => {
    const timeLeft = selectedDateGlobal - Date.now();

    timerDOMaker(convertMs(timeLeft))

    let isActive = true;

    if (timeLeft < 1000) {
      clearInterval(timer);
      isActive = false;
      Notiflix.Notify.success('Time is over',{ timeout: 6000, },);
      startBtn.disabled = true;
    }
  }, 1000);
}

function timerDOMaker({ days, hours, minutes, seconds }) {
    d.textContent = days;
    h.textContent = hours;
    m.textContent = minutes;
    s.textContent = seconds;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
