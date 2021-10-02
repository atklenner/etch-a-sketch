let gridSize = 4;

const canvas = document.querySelector('.paint-grid');

for(let i = 1; i <= gridSize * gridSize; i++) {
  const box = document.createElement('div');
  canvas.appendChild(box);
}