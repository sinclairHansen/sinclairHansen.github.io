let x = 0.01;
let y = 0;
let z = 0;

let a = 10;
let b = 28;
let c = 8.0/3.0;

let points = new Array();


function setup() {
  createCanvas(800, 600, WEBGL);
  colorMode(HSB);

  
}

function draw() {
  background(0);
  
  let dt = .01
  let dx = (a * (y-x)) * dt;
  let dy = (x*(b-z)-y) * dt;
  let dz = (x*y - c*z) * dt;
  x = x + dx;
  y = y + dy;
  z = z + dz;
  
  points.push(new p5.Vector(x, y, z));
  
  let camX = map(mouseX, 0, width, -200, 200);
  let camY = map(mouseY, 0, height, -200, 200);
  camera(camX, camY, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
  
  
  scale(4);
  stroke(255);
  noFill();
  
  let color = 0;
  
  beginShape();
  
  for(let v of points)
    {
      stroke(color,255,255);
      vertex(v.x,v.y,v.z);
      color += 1;
      if(color > 255)
        {
          color = 0;
        }
    }
  endShape();
  

  
}