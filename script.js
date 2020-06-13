const blocks = document.querySelectorAll('.game div');
const COUNT_ROW = Math.sqrt(blocks.length);

let playerIndex = Math.round(blocks.length - COUNT_ROW / 2);
let step = 1;

// enemies 

const indexEnemies = [
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
  43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
  63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76,
];

const killEnemy = [];

const moveEnemies = () => {
  const leftBlockEnemies = indexEnemies[0] % COUNT_ROW === 0;
  const rightBlockEnemies = indexEnemies[indexEnemies.length - 1] % COUNT_ROW === COUNT_ROW - 1;

  if ((leftBlockEnemies && step === -1) || (rightBlockEnemies && step === 1)) {
    step = COUNT_ROW;
  } else if (step === COUNT_ROW) {
    step = leftBlockEnemies ? 1 : -1;
  }

  indexEnemies.forEach(index => {
    blocks[index].classList.remove('enemy');
  });

  for (let i = 0; i < indexEnemies.length; i++) {
    indexEnemies[i] += step;
  }

  indexEnemies.forEach((item, i) => {
    if (!killEnemy.includes(i)) {
      blocks[item].classList.add('enemy');
    }
  });

  if (blocks[playerIndex].classList.contains('enemy')) {
    alert('Game Over!');
    endGame();
    return;
  }

  for (let i = 0; i <= indexEnemies.length; i++) {
    if (indexEnemies[i] > blocks.length - COUNT_ROW) {
      alert('Game Over!');
      endGame();
      return;
    }
  }

  if (killEnemy.length === indexEnemies.length) {
    alert('You win! Perfect!');
    endGame();
    return;
  }

  setTimeout(moveEnemies, 300);

};

moveEnemies();

for (const enemy of indexEnemies) {
  blocks[enemy].classList.add('enemy');
}

// player
blocks[playerIndex].classList.add('player');
const movePlayer = event => {
  blocks[playerIndex].classList.remove('player');
  if (event.code === 'ArrowLeft' && playerIndex > blocks.length - COUNT_ROW) {
    playerIndex--;
  }
  if (event.code === 'ArrowRight' && playerIndex < blocks.length - 1) {
    playerIndex++;
  }
  blocks[playerIndex].classList.add('player');
};

// fire 
const fire = event => {
  if (event.code === 'Space') {
    let bulletIndex = playerIndex;

    const flyBullet = () => {
      blocks[bulletIndex].classList.remove('bullet');
      bulletIndex -= COUNT_ROW;
      blocks[bulletIndex].classList.add('bullet');

      if (bulletIndex < COUNT_ROW) {
        setTimeout(() => {
          blocks[bulletIndex].classList.remove('bullet');
        }, 50);
        return;
      }

      if (blocks[bulletIndex].classList.contains('enemy')) {
        blocks[bulletIndex].classList.remove('bullet');
        blocks[bulletIndex].classList.remove('enemy');

        const indexKillEnemy = indexEnemies.indexOf(bulletIndex);
        killEnemy.push(indexKillEnemy);
        return;
      }
      setTimeout(flyBullet, 50);
    };
    flyBullet();
  }
};

const endGame = () => {
  document.removeEventListener('keydown', movePlayer);
  document.removeEventListener('keydown', fire);
};

document.addEventListener('keydown', movePlayer);
document.addEventListener('keydown', fire);