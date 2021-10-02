let gridSize = 16;

const canvas = document.querySelector('.paint-grid');

for(let i = 1; i <= gridSize * gridSize; i++) {
  const box = document.createElement('div');
  box.classList.add('tile');
  box.addEventListener('mouseenter', colorChange);
  canvas.appendChild(box);
}

function colorChange(element) {
  element.target.style.background = 'black';
}