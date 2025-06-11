let gridSize = 30,
    noiseScale = 0.0035,
    pulse = 0;
let arabisch = ["ن","ق","ل","و","ن","م","د","ا","ش","ط","د","ج"];
let deutsch = ["WAHRHEIT","MENSCH","FREIHEIT","MENSCHLICHKEIT","VERGESSEN","VERRAT","WIDERSTAND","SOLIDARITÄT","UNSICHTBAR","GEDÄCHTNIS"];
let baseTone, droneTone;

function setup() {
  const holder = select('#sketch-holder');
  const w = holder.size().width;
  const h = holder.size().height;
  const cnv = createCanvas(w, h);
  cnv.parent('sketch-holder');
  cnv.style('display', 'block');
  textFont('monospace');
  textAlign(CENTER, CENTER);
  textSize(gridSize * 0.8);
  noStroke();

  userStartAudio();
  baseTone = new p5.Oscillator('sine');
  droneTone = new p5.Oscillator('sine');
  baseTone.start(); baseTone.freq(60); baseTone.amp(0.03);
  droneTone.start(); droneTone.freq(120); droneTone.amp(0.025);
}

function draw() {
  background(0);
  pulse += 0.002;
  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      let n = noise(x * noiseScale, y * noiseScale, frameCount * 0.001);
      let offset = map(n, 0, 1, -1, 1);

      push();
      translate(x + gridSize/2 + offset, y + gridSize/2);

      if (random() < 0.009) {
        fill(255, 50, 50, 220);
        textSize(gridSize * 0.4);
        drawVerticalText(random(deutsch));
        textSize(gridSize * 0.8);
      } else {
        fill(0, 200, 255, 180);
        drawVerticalText(random(arabisch));
      }
      pop();
    }
  }

  baseTone.freq(60 + sin(pulse) * 6);
  droneTone.freq(120 + cos(pulse * 0.6) * 5);

  fill(255, 160);
  textSize(17);
  text("WIR BLEIBEN VIELE – GEGEN DEN HASS", width / 2, height - 25);

  fill(255, 150);
  textSize(16);
  text(">> SYSTEMFEHLER: MENSCHLICHKEIT IST KEIN FEHLER <<", width / 2, 25);
}

function drawVerticalText(txt) {
  let chars = txt.split("");
  let lh = gridSize * 0.8;
  let off = -(chars.length - 1) * lh / 2;
  chars.forEach((c, i) => text(c, 0, off + i * lh));
}

function windowResized() {
  const holder = select('#sketch-holder');
  const w = holder.size().width;
  const h = holder.size().height;
  resizeCanvas(w, h);
}