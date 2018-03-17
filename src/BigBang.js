import Universe from './universe.js';
import Ball from './Ball.js';

// Setup all initial particles
export default function init(universe){
  // sun
  addBallVelocity(universe, 1000, 0, 0, 0, 0);
  addBallVelocity(universe, 1, -400, 0, 0, 50);
  addBallVelocity(universe, 1, 700, 0, 0, -50);
  addBallVelocity(universe, 1, 0, 400, 150, 0);
  addBallVelocity(universe, 1, 800, 800, 60, -60);
}

function addBallVelocity(universe, mass, x, y, vx, vy){
  let ball = new Ball(mass, x, y);
  ball.velocity = {x: vx, y: vy};
  universe.addParticle(ball);
}