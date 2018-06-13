const midCol = {r: 0, g: 255, b: 255};
const blend = (c1, c2, a) => ({
  r: c2.r*(1-a) + c1.r*a,
  g: c2.g*(1-a) + c1.g*a,
  b: c2.b*(1-a) + c1.b*a
});
const white = {r: 255, g: 255, b: 255};

export default class PathTracker{

  constructor(sizeLimit, updateWait){
    this.path = [];
    this.size_limit = sizeLimit;
    this.update_wait = updateWait; // wait howmany updates before a point is actually pushed.
    this.update_counter = 0;
  }

  pushPoint(point){
    this.update_counter = (this.update_counter+1)%this.update_wait;
    if(this.update_counter != 0) return;
    this.path.push(point);
    if(this.path.length >= this.size_limit){
      this.path.shift();
    }
  }

  pointToCanvas(point, origin, zoom){
    return {
      x: (point.x - origin.x)*zoom + 800,
      y: (point.y - origin.y)*zoom + 450
    }
  }

  makeColor(index){
    let amp = index/this.size_limit;
    if(amp > 0.5)
    {
      // midColAmp to black
      let midColAmp = (1-(amp-0.5)*2);
      return "rgb(" +
        midColAmp*midCol.r + ", " +
        midColAmp*midCol.g + ", " +
        midColAmp*midCol.b + 
        ")";
    }
    else
    {
      // white to blue
      let whiteAmp = (1-2*amp);
      let col = blend(white, midCol, whiteAmp);
      return "rgb(" + 
        col.r + ", " +
        col.g + ", " + 
        col.b + 
        ")";
    }
  }

  draw(ctx, origin, zoom){
    if(this.path.length < 1) return;

    let point1 = this.path[0];
    let point1Canvas = this.pointToCanvas(point1, origin, zoom);

    let counter = 0;
    let prevPoint = undefined;
    // console.log("path tracker is going to try to draw : " + this.path.length + " points"); // DEBUG
    this.path.forEach((point) => {
      if(counter == 0)
      {
        prevPoint = point;
        counter++;
      }
      else
      {
        let pointCanvas = this.pointToCanvas(point, origin, zoom);
        let prevPointCanvas = this.pointToCanvas(prevPoint, origin, zoom);
        ctx.beginPath();
        ctx.moveTo(prevPointCanvas.x, prevPointCanvas.y);
        ctx.lineTo(pointCanvas.x, pointCanvas.y);
        let cIndex = this.path.length - counter; // counter = 0 is at the tail, so this is index from current position
        ctx.strokeStyle = this.makeColor(cIndex);
        ctx.closePath();
        ctx.stroke();
        prevPoint = point;
        counter++;
      }
    });

  }
}