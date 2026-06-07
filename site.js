(function () {
  function setupMenus() {
    document.querySelectorAll(".topnav").forEach(function (nav) {
      var links = nav.querySelector("#myLinks");
      var button = nav.querySelector(".nav-toggle");

      if (!links || !button) {
        return;
      }

      button.addEventListener("click", function () {
        var isOpen = links.style.display === "block";
        links.style.display = isOpen ? "none" : "block";
        button.setAttribute("aria-expanded", String(!isOpen));
      });
    });
  }

  function setupPendulumCanvas() {
    var canvas = document.getElementById("pendulumCanvas");

    if (!canvas || !canvas.getContext) {
      return;
    }

    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var originX = width / 2;
    var originY = 80;
    var g = 1;

    var colors = [
      "#0e9aa7",
      "#3da4ab",
      "#f6cd61",
      "#fe8a71",
      "#07407b",
      "#f6b26b",
      "#e69138"
    ];

    function Pendulum(offset, color) {
      this.l1 = 80;
      this.l2 = 80;
      this.m1 = 1;
      this.m2 = 1;
      this.a1 = Math.PI / 3 + offset;
      this.a2 = Math.PI / 4;
      this.v1 = 0;
      this.v2 = 0;
      this.color = color;
    }

    Pendulum.prototype.update = function () {
      var delta = this.a1 - this.a2;
      var denom1 = this.l1 * (this.m1 + this.m2 * Math.sin(delta) * Math.sin(delta));
      var denom2 = this.l2 * (this.m1 + this.m2 * Math.sin(delta) * Math.sin(delta));

      var acc1 = (
        -Math.sin(delta) *
          (
            this.m2 * this.l1 * this.v1 * this.v1 * Math.cos(delta) +
            this.m2 * this.l2 * this.v2 * this.v2
          )
        -
        g *
          (
            (this.m1 + this.m2) * Math.sin(this.a1) -
            this.m2 * Math.sin(this.a2) * Math.cos(delta)
          )
      ) / denom1;

      var acc2 = (
        Math.sin(delta) *
          (
            (this.m1 + this.m2) * this.l1 * this.v1 * this.v1 +
            this.m2 * this.l2 * this.v2 * this.v2 * Math.cos(delta)
          )
        +
        g *
          (
            (this.m1 + this.m2) * Math.sin(this.a1) * Math.cos(delta) -
            (this.m1 + this.m2) * Math.sin(this.a2)
          )
      ) / denom2;

      this.v1 += acc1;
      this.v2 += acc2;
      this.v1 *= 0.999;
      this.v2 *= 0.999;
      this.a1 += this.v1;
      this.a2 += this.v2;
    };

    Pendulum.prototype.draw = function () {
      var x1 = originX + this.l1 * Math.sin(this.a1);
      var y1 = originY + this.l1 * Math.cos(this.a1);
      var x2 = x1 + this.l2 * Math.sin(this.a2);
      var y2 = y1 + this.l2 * Math.cos(this.a2);

      ctx.strokeStyle = this.color;
      ctx.fillStyle = this.color;
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x1, y1, 4, 0, Math.PI * 2);
      ctx.arc(x2, y2, 5, 0, Math.PI * 2);
      ctx.fill();
    };

    var pendulums = [];

    for (var i = 0; i < 10; i += 1) {
      pendulums.push(new Pendulum(0.0002 * i, colors[i % colors.length]));
    }

    function animate() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      ctx.fillRect(0, 0, width, height);

      pendulums.forEach(function (p) {
        p.update();
        p.draw();
      });

      window.requestAnimationFrame(animate);
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    animate();
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupMenus();
    setupPendulumCanvas();
  });
}());