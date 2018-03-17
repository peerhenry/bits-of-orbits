import Universe from './universe.js';
import Ball from './Ball.js';

// Setup all initial particles
export default function init(universe){
  // sun
  universe.addBallWithVelocity(1000, 0, 0, 0, 0);
  universe.addBallWithVelocity(1, -400, 0, 0, 50);
  universe.addBallWithVelocity(1, 700, 0, 0, -50);
  universe.addBallWithVelocity(1, 0, 400, 150, 0);
  universe.addBallWithVelocity(1, 800, 800, 60, -60);
}