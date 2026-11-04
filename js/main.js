const phrase = "Скоро здесь появится портфолио!";
const output = document.querySelector("#text");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobile = window.matchMedia("(max-width: 600px)");
const lineBreak = phrase.indexOf(" появится");
let timer;
let position = 0;
let deleting = false;

function render() {
  let visible = phrase.slice(0, position);
  if (mobile.matches && position > lineBreak) {
    visible = visible.slice(0, lineBreak) + "\n" + visible.slice(lineBreak + 1);
  }
  output.textContent = visible;
}

function tick() {
  position += deleting ? -1 : 1;
  render();

  let delay = deleting ? 55 : 105;
  if (position === phrase.length) {
    deleting = true;
    delay = 1900;
  } else if (position === 0) {
    deleting = false;
    delay = 1200;
  }
  timer = window.setTimeout(tick, delay);
}

function start() {
  window.clearTimeout(timer);
  position = reducedMotion.matches ? phrase.length : 0;
  deleting = false;
  render();
  if (!reducedMotion.matches) timer = window.setTimeout(tick, 500);
}

mobile.addEventListener("change", render);
reducedMotion.addEventListener("change", start);
// Start typing once the local font has its final metrics.
document.fonts.ready.then(start);
