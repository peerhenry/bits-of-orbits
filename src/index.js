import Game from './Game.js'

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let game = new Game(ctx, 1600, 900);

const delta = {
  seconds: 1/60,
  ms: 1000/60
}

function gameLoop(){
  game.update(delta);
  game.clear();
  game.draw(delta);
}

game.init();

setInterval(gameLoop, 1000*(1/60));

const vscope = 800;
let arb = document.getElementById("arb");
const rmin = 200;
const rmax = 800;
arb.onclick = () => {
  let mass = Math.random()*5 + 0.5;

  let theta = Math.random()*2*Math.PI;
  let r = Math.random()*(rmax-rmin) + rmin;

  let x = r*Math.cos(theta);
  let y = r*Math.sin(theta);

  let vx = Math.random()*vscope - vscope/2;
  let vy = Math.random()*vscope - vscope/2;
  game.universe.addBallWithVelocity(mass, x, y, vx, vy);
}

let pause = document.getElementById("pause");
pause.onclick = () => {
  game.togglePause();
  if(game.isPaused) pause.innerHTML = "Continue";
  else pause.innerHTML = "Pause";
}