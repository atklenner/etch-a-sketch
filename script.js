let gridSize = 16;
let paintColor = 'black';
let backgroundColor = '#ffffff';
let erasing = false;
let rainbow = false;
let shading = false;

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
  if(rainbow) {
    element.target.style.backgroundColor = randomColor();
  } else if(shading) {
    element.target.style.backgroundColor = shadeColor(element.target.style.backgroundColor, 10);
  } else element.target.style.background = paintColor;
  if(erasing) {
    element.target.classList.remove('painted');
  } else element.target.classList.add('painted');
}

function randomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function shadeColor(color, percent) {
  color = color.substring(4, color.length - 1);
  let colors = color.split(', ');
  let amount = 25;

  let R = parseInt(colors[0]);
  let G = parseInt(colors[1]);
  let B = parseInt(colors[2]);

  R = R - amount;
  G = G - amount;
  B = B - amount;

  R = (R > 0) ? R : 0;  
  G = (G > 0) ? G : 0;  
  B = (B > 0) ? B : 0;  
  
  return `rgb(${R}, ${G}, ${B})`;
}

const brush = document.querySelector('#brush');
brush.addEventListener('change', (element) => {
  paintColor = element.target.value;
  oldPaintColor = element.target.value;
});

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
const sizeTeller = document.querySelector('span');
sizeSlider.addEventListener('mouseup', changeGridSize);
sizeSlider.addEventListener('input', () => {
  sizeTeller.textContent = `Grid Size: ${sizeSlider.value} x ${sizeSlider.value}`;
});

function changeGridSize() {
  gridSize = sizeSlider.value;
  draw();
}

const colorButton = document.querySelector("#color");
colorButton.addEventListener('click', () => {
  paintColor = brush.value
  erasing = false;
  rainbow = false;
  shading = false;
});

const rainbowButton = document.querySelector('#rainbow');
rainbowButton.addEventListener('click', () => {
  rainbow = true;
  erasing = false;
  shading = false;
});

const shaderButton = document.querySelector('#shader');
shaderButton.addEventListener('click', () => {
  rainbow = false;
  erasing = false;
  shading = true;
});

const eraserButton = document.querySelector('#eraser');
eraserButton.addEventListener('click', () => {
  paintColor = background.value;
  erasing = true;
  rainbow = false;
  shading = false;
});

draw();