import Ball from './Ball.js'

export default class Game {

  constructor(context, width, height){
    this.ctx = context;
    this.width = width;
    this.height = height;
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = height;

    this.balls = [];
  }

  init(){
    // put sun in middle
    let sun = new Ball(1000, 800, 400);
    sun.velocity = {x: 0, y: 0};
    this.balls.push(sun);

    let ball1 = new Ball(1, 100, 400);
    ball1.velocity = {x: 0, y: 60};
    this.balls.push(ball1);

    let ball2 = new Ball(1, 1500, 400);
    ball2.velocity = {x: 0, y: -50};
    this.balls.push(ball2);

    let ball3 = new Ball(1, 800, 800);
    ball3.velocity = {x: 150, y: 0};
    this.balls.push(ball3);
  }

  update(delta){
    // update balls
    let balls = this.balls;
    balls.forEach((ball) => {

      // calculate the force/mass or delta velocity
      let dv = {x: 0, y: 0};
      balls.forEach((otherBall) => {
        if(otherBall.id != ball.id){
          let dx = otherBall.x - ball.x;
          let dy = otherBall.y - ball.y;
          let d_squared = dx*dx + dy*dy;
          let abs_dv = G*otherBall.mass/d_squared;
          let distance = Math.sqrt(d_squared);
          let direction = { x: dx/distance, y: dy/distance };
          dv.x += abs_dv*direction.x;
          dv.y += abs_dv*direction.y;
        }
      });

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

  clear(){
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  draw(delta){
    let ctx = this.ctx
    this.balls.forEach((ball) => {
      // draw ball
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI); // x, y, radius, start angle, end angle, couterclockwise
      ctx.fill();

      // draw velocity
      /*ctx.strokeStyle = "#FF0000";
      ctx.beginPath();
      ctx.moveTo(ball.x, ball.y);
      ctx.lineTo(ball.x + ball.velocity.x, ball.y + ball.velocity.y);
      ctx.stroke();*/

      // todo: draw path
    });
  }
}

const G = 10000;