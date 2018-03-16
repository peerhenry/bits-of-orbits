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
  }
}