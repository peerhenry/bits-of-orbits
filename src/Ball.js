import PathTracker from "./PathTracker";

// some draw settings
const colAnTime = 2000; // collision Animation Time
const colAnTimeHalf = 1000;
const incr = 2*(255/colAnTime);

let next_id = 1;

export default class Ball{
  constructor(mass, x, y){
    this.id = next_id++;
    this.mass = mass;
    this.x = x;
    this.y = y;
    this.velocity = {x: 0, y: 0};
    this.acceleration = {x: 0, y: 0};
    this.radius = 10 + 3*Math.log(mass);
    this.isColliding = false;
    this.time = 0;
    this.path_tracker = new PathTracker(600, 3); // the second parameter is an optimization, see class definition
  }

  drawPath(delta, origin, ctx, zoom){
    this.path_tracker.draw(ctx, origin, zoom);
  }

  draw(delta, origin, ctx, zoom){
    let radius_in_view = this.radius*zoom;
    let bx = (this.x - origin.x)*zoom + 800;
    let by = (this.y - origin.y)*zoom + 450;
    if(radius_in_view > 0.5)
    {
      // draw circle
      if(this.time < colAnTime)
      {
        let green = 255;
        let blue = 0;
        if(this.time < colAnTimeHalf) green = Math.floor(incr*this.time);
        else if(this.time >= colAnTimeHalf) blue = Math.floor(incr*(this.time-colAnTimeHalf));
        let colorString = "rgb(255, " + green  + ", " + blue + ")";
        ctx.fillStyle = colorString;
      }
      else ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(bx, by, radius_in_view, 0, 2*Math.PI); // x, y, radius, start angle, end angle, couterclockwise
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
  }
}