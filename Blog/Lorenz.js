
class Lorenz{
  constructor()
  {
    this.a = 10;
    this.b = 28;
    this.c = 8.0/3.0;
    this.x = 0.01;
    this.y = 0;
    this.z = 0;

    this.a = 10;
    this.b = 28;
    this.c = 8.0/3.0;

    this.points = new Array();
  }





  setup() {
    createCanvas(400, 400, WEBGL);
    colorMode(HSB);
    this.draw();
  }

  draw() {
    background(0);
    
    this.dt = 0.01
    this.dx = (this.a * (this.y-this.x)) * this.dt;
    this.dy = (this.x*(this.b-this.z)-y) * this.dt;
    this.dz = (this.x*this.y - this.c*this.z) * this.dt;
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
    this.z = this.z + this.dz;
    
    this.points.push(new p5.Vector(this.x, this.y, this.z));
    
    this.camX = map(mouseX, 0, width, -200, 200);
    this.camY = map(mouseY, 0, height, -200, 200);
    camera(this.camX, this.camY, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
    
  
    scale(2);
    stroke(255);
    noFill();
    
    this.color = 0;
    
    beginShape();
    
    for(this.v of this.points)
      {
        stroke(this.color,255,255);
        vertex(this.v.x,this.v.y,this.v.z);
        this.color += 1;
        if(this.color > 255)
          {
            this.color = 0;
          }
      }
    endShape();
  

  
  }

}