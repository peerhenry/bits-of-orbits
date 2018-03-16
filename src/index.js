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