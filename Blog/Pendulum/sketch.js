let g = 1;
let pendulums = [];
let width = 500;
let height = 500;
//let add = 1;
let colorPalette = ['#0e9aa7','#3da4ab','#f6cd61','#fe8a71','#07407b',
  '#f6b26b','#e69138','#07407b'
];


//This function creates the sliders on user interface
  function setupSlider(rangeId, outputId) {
      var slider = document.getElementById(rangeId);
      var output = document.getElementById(outputId);
      output.innerHTML = slider.value;
      slider.oninput = function() {
        output.innerHTML = this.value;
      };
    }


  // Setup all sliders
  document.addEventListener("DOMContentLoaded", function () {
    setupSlider("L1", "output1");
    setupSlider("L2", "output2");
    setupSlider("m1", "output3");
    setupSlider("m2", "output4");
    setupSlider("num", "output5");
    setupSlider("trail", "output6");
  }

  );

    //function addPendulum()
    //{
      //let L1 = parseFloat(document.getElementById("L1").value);
      ///let L2 = parseFloat(document.getElementById("L2").value);
     // let m1 = parseFloat(document.getElementById("m1").value);
     // let m2 = parseFloat(document.getElementById("m2").value); 
     // let theta1 = PI/2;
     // let theta2 = PI/4;
     // pendulums[add] = new Pendulum(theta1,theta2, L1, L2, m1, m2);
     // draw();
    //}



    function setup()
    {
      this.num = parseFloat(document.getElementById("num").value);
      createCanvas(width,height);
      for(i = 0; i<num; i++)
        {
          //This grabs the values the user sets in the sliders
          let L1 = parseFloat(document.getElementById("L1").value);
          let L2 = parseFloat(document.getElementById("L2").value);
          let m1 = parseFloat(document.getElementById("m1").value);
          let m2 = parseFloat(document.getElementById("m2").value); 
          let theta1 = PI/2 + (0.001)*i;
          let theta2 = PI/4;
          pendulums[i] = new Pendulum(theta1,theta2, L1, L2, m1, m2);
        }

    draw();
    }
  


  function draw()
  {
    this.trail= parseFloat(document.getElementById("trail").value); 
    //If I do background(0,30) it will make a trail along the pendulums
    //due to it changing the transparancy
    //Maybe make it an option later on.--> background(0,x)
      background(0,trail);
      for(i = 0; i<num; i++)
        {
          pendulums[i].update();
          pendulums[i].display();
        }

  }









