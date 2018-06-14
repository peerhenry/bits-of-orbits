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

    this.isPaused = false;
    this.trackPaths = true;
  }

  togglePause(){
    this.isPaused = !this.isPaused;
  }

  togglePaths(){
    this.trackPaths = !this.trackPaths;
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
    if(!this.isPaused) this.universe.update(delta);
  }

  clear(){
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawHorizon(){
    let horizon = this.universe.horizon;
    let ctx = this.ctx;
    let zoom = this.zoom;
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    let canvas_horizon = zoom*horizon;

    let hor_left = (-horizon - this.origin.x)*zoom + 800;
    let hor_right = (horizon - this.origin.x)*zoom + 800;
    let hor_top = (-horizon - this.origin.y)*zoom + 450;
    let hor_bottom = (horizon - this.origin.y)*zoom + 450;

    ctx.moveTo(hor_left, hor_top);
    ctx.lineTo(hor_right, hor_top);
    ctx.lineTo(hor_right, hor_bottom);
    ctx.lineTo(hor_left, hor_bottom);
    ctx.lineTo(hor_left, hor_top);
    ctx.closePath();
    ctx.stroke();
  }

  draw(delta){
    let origin = this.origin;
    let ctx = this.ctx;
    let zoom = this.zoom;

    this.drawHorizon();

    this.universe.particles.forEach((ball) => {
      ball.draw(delta, origin, ctx, zoom);
    });
    if(this.trackPaths){
      this.universe.particles.forEach((ball) => {
        ball.drawPath(delta, origin, ctx, zoom);
      });
    }
  }
}