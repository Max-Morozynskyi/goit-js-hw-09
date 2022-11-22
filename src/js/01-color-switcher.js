const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const clickStartBtn = startBtn.addEventListener('click', startBlinck);
const clickStopBtn = stopBtn.addEventListener('click', stopBlinck);

stopBtn.disabled = true;

function bgColorSwitch() {
  body.style.backgroundColor = getRandomHexColor();
}

function startBlinck() {
  bgColorSwitch();
  magicCode = setInterval(bgColorSwitch, 1000);
  startBtn.disabled = true;
  stopBtn.enabled = true;
  stopBtn.disabled = false;
}

function stopBlinck() {
  clearInterval(magicCode);
  startBtn.disabled = false;
  startBtn.enabled = true;
  stopBtn.disabled = true;
}
