const gravity = 1;
const canvasWidth = 800;
const canvasHeight = 560;

let pendulums = [];

const colorPalette = [
  "#0e9aa7",
  "#3da4ab",
  "#f6cd61",
  "#fe8a71",
  "#07407b",
  "#f6b26b",
  "#e69138",
  "#70aec8"
];

const controls = [
  { rangeId: "L1", outputId: "output1" },
  { rangeId: "L2", outputId: "output2" },
  { rangeId: "m1", outputId: "output3" },
  { rangeId: "m2", outputId: "output4" },
  { rangeId: "num", outputId: "output5" },
  { rangeId: "trail", outputId: "output6" }
];

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("sketch-holder");

  pixelDensity(1);

  setupControls();
  resetSimulation();
}

function draw() {
  const trail = getSliderNumber("trail", 30);

  background(0, trail);

  for (const pendulum of pendulums) {
    pendulum.update();
    pendulum.render();
  }
}

function setupControls() {
  for (const control of controls) {
    const slider = document.getElementById(control.rangeId);
    const output = document.getElementById(control.outputId);

    if (!slider || !output) {
      continue;
    }

    output.textContent = slider.value;

    slider.addEventListener("input", function () {
      output.textContent = slider.value;
    });
  }

  const runButton = document.getElementById("runButton");

  if (runButton) {
    runButton.addEventListener("click", resetSimulation);
  }
}

function resetSimulation() {
  pendulums = [];

  const length1 = getSliderNumber("L1", 100);
  const length2 = getSliderNumber("L2", 100);
  const mass1 = getSliderNumber("m1", 5);
  const mass2 = getSliderNumber("m2", 5);
  const pendulumCount = getSliderNumber("num", 10);

  background(0);

  for (let i = 0; i < pendulumCount; i += 1) {
    const theta1 = PI / 2 + 0.001 * i;
    const theta2 = PI / 4;
    const pendulumColor = colorPalette[i % colorPalette.length];

    pendulums.push(
      new Pendulum(
        theta1,
        theta2,
        length1,
        length2,
        mass1,
        mass2,
        pendulumColor
      )
    );
  }
}

function getSliderNumber(id, fallbackValue) {
  const slider = document.getElementById(id);

  if (!slider) {
    return fallbackValue;
  }

  const value = Number(slider.value);

  if (Number.isNaN(value)) {
    return fallbackValue;
  }

  return value;
}