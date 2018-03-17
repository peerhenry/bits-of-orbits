import Ball from './Ball.js';

export default class Universe{
  constructor(gravity){
    this.particles = [];
    this.collisions = [];
    this.gravity = gravity;
  }

  addBallWithVelocity(mass, x, y, vx, vy){
    let ball = new Ball(mass, x, y);
    ball.velocity = {x: vx, y: vy};
    this.addParticle(ball);
  }

  addParticle(particle){
    this.particles.push(particle);
  }

  particles(){
    return particles;
  }

  handleCollisions(){
    // handle collisions
    this.collisions.forEach(c => {

      let particleOne = c[0];
      let particleTwo = c[1];
      
      let indexOne = this.particles.indexOf(particleOne);
      if(indexOne > -1) this.particles.splice(indexOne, 1);

      let indexTwo = this.particles.indexOf(particleTwo);
      if(indexTwo > -1) this.particles.splice(indexTwo, 1);

      let newMass = particleOne.mass + particleTwo.mass;
      let newX = (particleOne.x * particleOne.mass + particleTwo.x * particleTwo.mass)/ newMass;
      let newY = (particleOne.y * particleOne.mass + particleTwo.y * particleTwo.mass)/ newMass;
      let newVx = (particleOne.velocity.x * particleOne.mass + particleTwo.velocity.x * particleTwo.mass)/ newMass;
      let newVy = (particleOne.velocity.y * particleOne.mass + particleTwo.velocity.y * particleTwo.mass)/ newMass;
      let newParticle = new Ball(newMass, newX, newY);
      newParticle.velocity = {x: newVx, y: newVy};
      this.particles.push(newParticle);
    });

    // reset collisions
    this.collisions = [];
  }

  update(delta){
    this.handleCollisions();
    // update gravity on balls
    this.particles.forEach((ball) => {
      ball.time += delta.ms;
      if(!ball.isColliding) this.gravity.exertGravityOnBall(delta, this, ball);
    });
  }

}