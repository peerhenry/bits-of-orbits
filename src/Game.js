import Ball from './Ball.js'

export default class Game {

  constructor(context, width, height){
    this.ctx = context;
    this.width = width;
    this.height = height;
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = height;

    this.balls = [];
    this.zoom = 1;
    this.origin = {x: 0, y: 0};
    this.setInput();
  }

  setInput(){
    this.down = false;
    this.ctx.canvas.addEventListener("wheel", (event) => {
      let dzoom = event.wheelDelta/2000;
      this.zoom += dzoom;
    });
    this.ctx.canvas.addEventListener("mousedown", event => {
      this.down = true;
    });
    this.ctx.canvas.addEventListener("mousemove", event => {
      if(this.down)
      {
        console.log('movementX' + event.movementX);
        console.log('movementY' + event.movementY);
        this.origin.x -= event.movementX/this.zoom;
        this.origin.y -= event.movementY/this.zoom;
        console.log('this.origin.x ' + this.origin.x);
        console.log('this.origin.y ' + this.origin.y);
      }
    });
    this.ctx.canvas.addEventListener("mouseup", event => {
      this.down = false;
    });
  }

  init(){
    // put sun in middle
    let sun = new Ball(1000, 0, 0); // mass, x, y
    sun.velocity = {x: 0, y: 0};
    this.balls.push(sun);

    let ball1 = new Ball(1, -400, 0);
    ball1.velocity = {x: 0, y: 70};
    this.balls.push(ball1);

    let ball2 = new Ball(1, 700, 0);
    ball2.velocity = {x: 0, y: -50};
    this.balls.push(ball2);

    let ball3 = new Ball(1, 0, 400);
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

  clear(){
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  draw(delta){
    let origin = this.origin;
    let ctx = this.ctx;
    let zoom = this.zoom;

    this.balls.forEach((ball) => {
      // draw ball
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc((ball.x - origin.x)*zoom + 800, (ball.y - origin.y)*zoom + 450, ball.radius*zoom, 0, 2*Math.PI); // x, y, radius, start angle, end angle, couterclockwise
      ctx.fill();

      // draw velocity
      /*ctx.strokeStyle = "#FF0000";
      ctx.beginPath();
      ctx.moveTo(ball.x*zoom, ball.y*zoom);
      ctx.lineTo( (ball.x + ball.velocity.x)*zoom, (ball.y + ball.velocity.y)*zoom );
      ctx.stroke();*/

      // todo: draw path
    });
  }
}

const G = 10000; // strength of gravity