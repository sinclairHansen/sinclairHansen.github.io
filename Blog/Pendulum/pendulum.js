class Pendulum {
  constructor(angle1, angle2, length1, length2, mass1, mass2, pendulumColor) {
    this.angle1 = angle1;
    this.angle2 = angle2;

    this.angleV1 = 0;
    this.angleV2 = 0;
    this.angleA1 = 0;
    this.angleA2 = 0;

    this.length1 = length1;
    this.length2 = length2;

    this.mass1 = mass1;
    this.mass2 = mass2;

    this.pendulumColor = pendulumColor;

    this.originX = width / 2;
    this.originY = 140;
  }

  update() {
    const numerator1 =
      -gravity * (2 * this.mass1 + this.mass2) * sin(this.angle1)
      - this.mass2 * gravity * sin(this.angle1 - 2 * this.angle2)
      - 2 * sin(this.angle1 - this.angle2) * this.mass2 *
        (
          this.angleV2 * this.angleV2 * this.length2
          + this.angleV1 * this.angleV1 * this.length1 * cos(this.angle1 - this.angle2)
        );

    const denominator1 =
      this.length1 *
      (
        2 * this.mass1
        + this.mass2
        - this.mass2 * cos(2 * this.angle1 - 2 * this.angle2)
      );

    this.angleA1 = numerator1 / denominator1;

    const numerator2 =
      2 * sin(this.angle1 - this.angle2) *
      (
        this.angleV1 * this.angleV1 * this.length1 * (this.mass1 + this.mass2)
        + gravity * (this.mass1 + this.mass2) * cos(this.angle1)
        + this.angleV2 * this.angleV2 * this.length2 * this.mass2 * cos(this.angle1 - this.angle2)
      );

    const denominator2 =
      this.length2 *
      (
        2 * this.mass1
        + this.mass2
        - this.mass2 * cos(2 * this.angle1 - 2 * this.angle2)
      );

    this.angleA2 = numerator2 / denominator2;

    this.angleV1 += this.angleA1;
    this.angleV2 += this.angleA2;

    this.angleV1 *= 0.999;
    this.angleV2 *= 0.999;

    const maxVelocity = 5;
    this.angleV1 = constrain(this.angleV1, -maxVelocity, maxVelocity);
    this.angleV2 = constrain(this.angleV2, -maxVelocity, maxVelocity);

    this.angle1 += this.angleV1;
    this.angle2 += this.angleV2;
  }

  render() {
    const x1 = this.originX + this.length1 * sin(this.angle1);
    const y1 = this.originY + this.length1 * cos(this.angle1);

    const x2 = x1 + this.length2 * sin(this.angle2);
    const y2 = y1 + this.length2 * cos(this.angle2);

    stroke(this.pendulumColor);
    strokeWeight(1.5);

    line(this.originX, this.originY, x1, y1);
    line(x1, y1, x2, y2);

    fill(this.pendulumColor);
    noStroke();

    const mass1Size = constrain(6 + this.mass1 * 0.8, 8, 24);
    const mass2Size = constrain(6 + this.mass2 * 0.8, 8, 24);

    ellipse(x1, y1, mass1Size, mass1Size);
    ellipse(x2, y2, mass2Size, mass2Size);
  }
}