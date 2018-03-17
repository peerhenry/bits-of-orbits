!function(t){var e={};function i(s){if(e[s])return e[s].exports;var l=e[s]={i:s,l:!1,exports:{}};return t[s].call(l.exports,l,l.exports,i),l.l=!0,l.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:s})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);let s=1;class l{constructor(t,e,i){this.id=s++,this.mass=t,this.x=e,this.y=i,this.velocity={x:0,y:0},this.acceleration={x:0,y:0},this.radius=10+3*Math.log(t),this.isColliding=!1,this.time=0}}class n{constructor(t){this.G=t}exertGravityOnBall(t,e,i){let s={x:0,y:0};e.particles.forEach(t=>{if(t.id!=i.id){let l=t.x-i.x,n=t.y-i.y,o=l*l+n*n,a=this.G*t.mass/o;if(a>.1){let c=Math.sqrt(o);if(c<=i.radius+t.radius)e.collisions.push([i,t]),i.isColliding=!0,t.isColliding=!0;else{let t={x:l/c,y:n/c};s.x+=a*t.x,s.y+=a*t.y}}}}),i.acceleration.x+=s.x,i.acceleration.y+=s.y,i.velocity.x+=s.x*t.seconds,i.velocity.y+=s.y*t.seconds,i.x+=i.velocity.x*t.seconds,i.y+=i.velocity.y*t.seconds}}class o{constructor(t){this.particles=[],this.collisions=[],this.gravity=t}addParticle(t){this.particles.push(t)}particles(){return particles}handleCollisions(){this.collisions.forEach(t=>{let e=t[0],i=t[1],s=this.particles.indexOf(e);s>-1&&this.particles.splice(s,1);let n=this.particles.indexOf(i);n>-1&&this.particles.splice(n,1);let o=e.mass+i.mass,a=(e.x*e.mass+i.x*i.mass)/o,c=(e.y*e.mass+i.y*i.mass)/o,r=new l(o,a,c);this.particles.push(r)}),this.collisions=[]}update(t){this.handleCollisions(),this.particles.forEach(e=>{e.time+=t.ms,e.isColliding||this.gravity.exertGravityOnBall(t,this,e)})}}const a=2e3,c=1e3,r=255/a*2;let h=new class{constructor(t,e,i){this.ctx=t,this.width=e,this.height=i,this.ctx.canvas.width=e,this.ctx.canvas.height=i;let s=new n(1e4);this.universe=new o(s),this.wheel=0,this.zoom=1,this.origin={x:0,y:0},this.setInput()}setInput(){this.down=!1,this.ctx.canvas.addEventListener("wheel",t=>{let e=t.wheelDelta/2e3;this.wheel+=e,this.zoom=Math.exp(this.wheel),console.log("zoom: "+this.zoom)}),this.ctx.canvas.addEventListener("mousedown",t=>{this.down=!0}),this.ctx.canvas.addEventListener("mousemove",t=>{this.down&&(this.origin.x-=t.movementX/this.zoom,this.origin.y-=t.movementY/this.zoom)}),this.ctx.canvas.addEventListener("mouseup",t=>{this.down=!1})}init(){let t=new l(1e3,0,0);t.velocity={x:0,y:0},this.universe.addParticle(t);let e=new l(1,-400,0);e.velocity={x:0,y:50},this.universe.addParticle(e);let i=new l(1,700,0);i.velocity={x:0,y:-50},this.universe.addParticle(i);let s=new l(1,0,400);s.velocity={x:150,y:0},this.universe.addParticle(s)}update(t){this.universe.update(t)}clear(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.width,this.height)}draw(t){let e=this.origin,i=this.ctx,s=this.zoom;this.universe.particles.forEach(t=>{let l=t.radius*s,n=(t.x-e.x)*s+800,o=(t.y-e.y)*s+450;if(l>.5){if(t.time<a){let e=255,s=0;t.time<c?e=Math.floor(r*t.time):t.time>=c&&(s=Math.floor(r*(t.time-c)));let l="rgb(255, "+e+", "+s+")";i.fillStyle=l}else i.fillStyle="white";i.beginPath(),i.arc(n,o,l,0,2*Math.PI),i.fill()}else i.fillStyle="white",i.fillRect(n,o,1,1)})}}(document.getElementById("canvas").getContext("2d"),1600,900);const d={seconds:1/60,ms:1e3/60};h.init(),setInterval(function(){h.update(d),h.clear(),h.draw(d)},1/60*1e3)}]);