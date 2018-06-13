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

  draw(delta){
    let origin = this.origin;
    let ctx = this.ctx;
    let zoom = this.zoom;

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