export default class Gravity{

  constructor(G)
  {
    this.G = G;
  }

  update(delta, balls){
    // update balls
    balls.forEach((ball) => {

      // calculate the force/mass or delta velocity
      let dv = {x: 0, y: 0};
      balls.forEach((otherBall) => {
        if(otherBall.id != ball.id){
          let dx = otherBall.x - ball.x;
          let dy = otherBall.y - ball.y;
          let d_squared = dx*dx + dy*dy;

          let abs_dv = this.G*otherBall.mass/d_squared;
          if(abs_dv > 0.1)
          {
            let distance = Math.sqrt(d_squared);
            let direction = { x: dx/distance, y: dy/distance };
            dv.x += abs_dv*direction.x;
            dv.y += abs_dv*direction.y;
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
    });
  }

}