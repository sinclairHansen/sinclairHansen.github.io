let x = 0.01;
let y = 0;
let z = 0;

let sigma = 10;
let rho = 28;
let beta = 8.0 / 3.0;

let points = [];

function setup() {
  let canvas = createCanvas(800, 600, WEBGL);
  canvas.parent("sketch-holder");

  colorMode(HSB, 255);
}

function draw() {
  background(0);

  let dt = 0.01;

  let dx = sigma * (y - x) * dt;
  let dy = (x * (rho - z) - y) * dt;
  let dz = (x * y - beta * z) * dt;

  x += dx;
  y += dy;
  z += dz;

  points.push(new p5.Vector(x, y, z));

  /*
    This prevents the animation from eventually becoming too heavy.
    Increase this number if you want a longer trail.
  */
  if (points.length > 7000) {
    points.shift();
  }

  let camX = map(mouseX, 0, width, -250, 250);
  let camY = map(mouseY, 0, height, -250, 250);

  camera(
    camX,
    camY,
    height / 1.4,
    0,
    0,
    0,
    0,
    1,
    0
  );

  scale(5);
  translate(0, 0, -25);

  strokeWeight(1.4);
  noFill();

  let hueValue = 0;

  beginShape();

  for (let v of points) {
    stroke(hueValue, 255, 255);
    vertex(v.x, v.y, v.z);

    hueValue += 1;

    if (hueValue > 255) {
      hueValue = 0;
    }
  }

  endShape();
}