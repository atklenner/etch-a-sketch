let gridSize = 16;
let paintColor = 'black';
let backgroundColor = 'white';

function draw() {
  const canvas = document.querySelector('.paint-grid');
  while(canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
  canvas.style.grid = `repeat(${gridSize}, auto) / repeat(${gridSize}, auto)`;
  for(let i = 1; i <= gridSize * gridSize; i++) {
    const box = document.createElement('div');
    box.addEventListener('mouseenter', colorChange);
    box.style.background = backgroundColor;
    canvas.appendChild(box);
  }
}
//this adds a 'painted' class to the divs
function colorChange(element) {
  element.target.style.background = paintColor;
  element.target.classList.add('painted');
}

const brush = document.querySelector('#brush');
brush.addEventListener('change', (element) => paintColor = element.target.value);

const background = document.querySelector('#background');
background.addEventListener('change', changeBackgroundColor);

function changeBackgroundColor(element) {
  backgroundColor = element.target.value;
  const boxes = document.querySelectorAll('div.paint-grid>div');
  boxes.forEach((box) => {
    if(!box.classList.contains('painted')) {
      box.style.background = backgroundColor;
    }
  });
}

const clear = document.querySelector('#clear');
clear.addEventListener('click', clearPaint);

function clearPaint() {
  const boxes = document.querySelectorAll('div.paint-grid>div');
  boxes.forEach((box) => {
    box.style.background = backgroundColor;
    box.classList.remove('painted');
  });
}

const sizeSlider = document.querySelector('#slider');
sizeSlider.addEventListener('mouseup', changeGridSize);

function changeGridSize() {
  console.log(sizeSlider.value);
  gridSize = sizeSlider.value;
  draw();
}

draw();

//To Do:
//Add number next to slider telling user what size they are selecting
//Need a way to make the color, rainbow, and shader buttons only let you select one at a time
//Need a way to randomly generate a new color every time the mouse enters a new tile
//Need a way to keep track of shading a tile, also define what shading even is
//Add an eraser, make sure to erase to the background color and not white