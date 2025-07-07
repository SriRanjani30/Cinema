const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const hero = {
  x: canvas.width / 2 - 60, 
  y: 400,
  width: 120,
  height: 120,
  speed: 3,
};

let scene = 'start'; 
let sceneTimer = 0;

const enemies = [
  { x: 400, y: 420, width: 100, height: 100, alive: true },
  { x: 650, y: 420, width: 100, height: 100, alive: true },
  { x: 850, y: 420, width: 100, height: 100, alive: true }
];

const heroImg = new Image();
heroImg.src = 'Hero.png';

const enemyImg = new Image();
enemyImg.src = 'Enemy.png';

const startBg = new Image();
startBg.src = 'Background1.jpg';

const middleBg = new Image();
middleBg.src = 'Background2.jpg';

const endBg = new Image();
endBg.src = 'Background3.jpg';

function drawHero() {
  ctx.drawImage(heroImg, hero.x, hero.y, hero.width, hero.height);
}

function drawEnemies() {
  enemies.forEach(enemy => {
    if (enemy.alive) {
      ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height);
    }
  });
}

function checkCollisions() {
  enemies.forEach(enemy => {
    if (
      enemy.alive &&
      hero.x + hero.width > enemy.x &&
      hero.x < enemy.x + enemy.width &&
      hero.y + hero.height > enemy.y &&
      hero.y < enemy.y + enemy.height
    ) {
      enemy.alive = false;
    }
  });
}

function drawStartScene() {
  ctx.drawImage(startBg, 0, 0, canvas.width, canvas.height);

  ctx.font = '36px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText('Our Hero Awakens in the City...', 280, 150);

  hero.x = canvas.width / 2 - hero.width / 2; 
  hero.y = 400;
  hero.speed = 0; 
  drawHero();
}

function drawMiddleScene() {
  ctx.drawImage(middleBg, 0, 0, canvas.width, canvas.height);

  ctx.font = '28px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText('Enemies Ahead! Fight!', 420, 50);

  if (hero.x < canvas.width - hero.width - 20) {
    hero.x += hero.speed;
  }

  checkCollisions();
  drawEnemies();
  drawHero();

  if (hero.x >= canvas.width - hero.width - 20) {
    scene = 'end';
    sceneTimer = 0;
  }
}

function drawEndScene() {
  ctx.drawImage(endBg, 0, 0, canvas.width, canvas.height);

  ctx.font = '40px Arial';
  ctx.fillStyle = 'yellow';
  ctx.fillText('Victory Achieved!', 380, 200);

  ctx.font = '24px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText('The Hero Defeated All Enemies and Saved the Village!', 250, 260);

  hero.x = canvas.width / 2 - hero.width / 2; 
  drawHero();
}

function update() {
  if (scene === 'start') {
    drawStartScene();
    sceneTimer++;
    if (sceneTimer > 150) {
      scene = 'middle';
      hero.x = 50;
      hero.speed = 3;
    }
  } else if (scene === 'middle') {
    drawMiddleScene();
  } else if (scene === 'end') {
    drawEndScene();
  }

  requestAnimationFrame(update);
}

update();
