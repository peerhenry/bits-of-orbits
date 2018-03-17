import Ball from './Ball.js'
import Gravity from './Gravity.js'
import Universe from './Universe.js'
import setup from './BigBang.js'

export default class Game {

  constructor(context, width, height){
    this.ctx = context;
    this.width = width;
    this.height = height;
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = height;

    let gravity = new Gravity(10000); // strength of gravity
    this.universe = new Universe(gravity);
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
    setup(this.universe);
  }

  update(delta){
    this.universe.update(delta);
  }

  clear(){
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  draw(delta){
    let origin = this.origin;
    let ctx = this.ctx;
    let zoom = this.zoom;

    this.universe.particles.forEach((ball) => {
      // draw ball
      let view_radius = ball.radius*zoom;
      let bx = (ball.x - origin.x)*zoom + 800;
      let by = (ball.y - origin.y)*zoom + 450;
      if(view_radius > 0.5)
      {
        // draw circle
        if(ball.time < colAnTime)
        {
          let green = 255;
          let blue = 0;
          if(ball.time < colAnTimeHalf) green = Math.floor(incr*ball.time);
          else if(ball.time >= colAnTimeHalf) blue = Math.floor(incr*(ball.time-colAnTimeHalf));
          let colorString = "rgb(255, " + green  + ", " + blue + ")";
          ctx.fillStyle = colorString;
        }
        else ctx.fillStyle = "white";
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

const colAnTime = 2000; // collision Animation Time
const colAnTimeHalf = 1000;
const incr = 2*(255/colAnTime);