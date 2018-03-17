import Ball from './Ball.js'
import Gravity from './Gravity.js'

export default class Game {

  constructor(context, width, height){
    this.ctx = context;
    this.width = width;
    this.height = height;
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = height;

    this.gravity = new Gravity(10000); // strength of gravity
    this.balls = [];
    this.wheel = 0;
    this.zoom = 1;
    this.origin = {x: 0, y: 0};
    this.setInput();
  }

  setInput(){
    this.down = false;
    this.ctx.canvas.addEventListener("wheel", (event) => {
      let dwheel = event.wheelDelta/2000;
      this.wheel += dwheel;
      this.zoom = Math.exp(this.wheel);
      console.log("zoom: " + this.zoom);
    });
    this.ctx.canvas.addEventListener("mousedown", event => {
      this.down = true;
    });
    this.ctx.canvas.addEventListener("mousemove", event => {
      if(this.down)
      {
        this.origin.x -= event.movementX/this.zoom;
        this.origin.y -= event.movementY/this.zoom;
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
    this.gravity.update(delta, this.balls);
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
      let view_radius = ball.radius*zoom;
      let bx = (ball.x - origin.x)*zoom + 800;
      let by = (ball.y - origin.y)*zoom + 450;
      if(view_radius > 0.5)
      {
        // draw circle
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(bx, by, view_radius, 0, 2*Math.PI); // x, y, radius, start angle, end angle, couterclockwise
        ctx.fill();
      }
      else
      {
        // draw pixel
        ctx.fillStyle = "white";
        ctx.fillRect( bx, by, 1, 1 );
      }

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