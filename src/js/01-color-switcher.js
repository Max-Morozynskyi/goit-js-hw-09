const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

function listener(where, what) {
  return where.addEventListener('click', what)
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function bgColorSwitch() {
  body.style.backgroundColor = getRandomHexColor();
}

function startBlinck() {
  magicCode = setInterval(bgColorSwitch, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopBlinck() {
  clearInterval(magicCode);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

listener(startBtn, startBlinck);
listener(stopBtn, stopBlinck);
