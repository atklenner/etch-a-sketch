let gridSize = 16;

const canvas = document.querySelector('.paint-grid');

for(let i = 1; i <= gridSize * gridSize; i++) {
  const box = document.createElement('div');
  box.addEventListener('mouseenter', colorChange);
  canvas.appendChild(box);
}

function colorChange(element) {
  element.target.style.background = 'black';
}

const clear = document.querySelector('#clear');
const boxes = document.querySelectorAll('div.paint-grid>div');

clear.addEventListener('click', clearPaint);

function clearPaint() {
  boxes.forEach((box) => box.style.background = 'white');
}