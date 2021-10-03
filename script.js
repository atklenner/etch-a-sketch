let gridSize = 16;
let paintColor = 'black';
let backgroundColor = 'white';

function draw() {
  const canvas = document.querySelector('.paint-grid');
  while(canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
  //canvas.display.grid = `repeat(${gridSize}, auto) / repeat(${gridSize}, auto)`;
  for(let i = 1; i <= gridSize * gridSize; i++) {
    const box = document.createElement('div');
    box.addEventListener('mouseenter', colorChange);
    canvas.appendChild(box);
  }
}

function colorChange(element) {
  element.target.style.background = paintColor;
}

const clear = document.querySelector('#clear');
clear.addEventListener('click', clearPaint);

function clearPaint() {
  const boxes = document.querySelectorAll('div.paint-grid>div');
  boxes.forEach((box) => box.style.background = backgroundColor);
}

const sizeSlider = document.querySelector('#slider');
sizeSlider.addEventListener('mouseup', changeGridSize);

function changeGridSize() {
  console.log(sizeSlider.value);
  gridSize = sizeSlider.value;
  draw();
}

draw();