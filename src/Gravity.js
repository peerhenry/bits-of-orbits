export default class Gravity{

  constructor(G)
  {
    this.G = G; // gravitational constant
  }

  exertGravityOnBall(delta, universe, ball){
    // calculate the force/mass or delta velocity
    let dv = {x: 0, y: 0};
    universe.particles.forEach((otherBall) => {
      if(otherBall.id != ball.id){
        let dx = otherBall.x - ball.x;
        let dy = otherBall.y - ball.y;
        let d_squared = dx*dx + dy*dy;

        let abs_dv = this.G*otherBall.mass/d_squared;
        if(abs_dv > 0.1) // optimization
        {
          let distance = Math.sqrt(d_squared);

          if(distance <= ball.radius + otherBall.radius)
          {
            // collide!
            universe.collisions.push([ball, otherBall]);
            ball.isColliding = true;
            otherBall.isColliding = true;
          }
          else{
            let direction = { x: dx/distance, y: dy/distance };
            dv.x += abs_dv*direction.x;
            dv.y += abs_dv*direction.y;
          }
        }
      }
    });

    // register the current acceleration on the object
    ball.acceleration.x += dv.x;
    ball.acceleration.y += dv.y;

    // exert the force on the ball
    ball.velocity.x += dv.x * delta.seconds;
    ball.velocity.y += dv.y * delta.seconds;
    
    // update position of the ball
    ball.x += ball.velocity.x * delta.seconds;
    ball.y += ball.velocity.y * delta.seconds;

    ball.path_tracker.pushPoint({x: ball.x, y: ball.y});
  }

}