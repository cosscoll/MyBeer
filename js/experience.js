/* MyBeer — scène de dégustation 3D CSS. Sans dépendance ni boucle WebGL. */
var BrewExperience = (function () {
  'use strict';
  var stage = null;
  var orbit = null;
  var bubbles = null;
  var reduced = false;
  var pulseTimer = 0;
  var steps = ['Fermentation','Tradition','Malt','Houblon','Arômes','Sucrosité','Bulles','Alcool','Acidité','Texture','Levure','Torréfaction','Signature','Filtration'];

  function byId(id) { return document.getElementById(id); }
  function clamp(n, lo, hi) { return Math.min(hi, Math.max(lo, n)); }
  function seeded(n) {
    var a = Math.sin(n * 127.1 + 78.233) * 43758.5453;
    return a - Math.floor(a);
  }
  function init() {
    stage = byId('brew-stage');
    orbit = byId('beer-orbit');
    bubbles = byId('beer-inside-bubbles');
    if (!stage || !orbit || !bubbles) return false;

    reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    bubbles.textContent = '';
    for (var i = 0; i < 34; i++) {
      var bubble = document.createElement('i');
      bubble.style.setProperty('--x', (8 + seeded(i + 1) * 84).toFixed(1) + '%');
      bubble.style.setProperty('--s', (2 + seeded(i + 12) * 7).toFixed(1) + 'px');
      bubble.style.setProperty('--d', (2.5 + seeded(i + 24) * 5).toFixed(2) + 's');
      bubble.style.setProperty('--delay', (-seeded(i + 44) * 8).toFixed(2) + 's');
      bubble.style.setProperty('--drift', ((seeded(i + 71) - .5) * 25).toFixed(1) + 'px');
      bubble.setAttribute('aria-hidden', 'true');
      bubbles.appendChild(bubble);
    }

    if (!reduced && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      var lastX = null, lastY = null, raf = 0;
      window.addEventListener('pointermove', function (e) {
        lastX = e.clientX; lastY = e.clientY;
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = 0;
          if (!orbit) return;
          var bounds = stage.getBoundingClientRect();
          var px = clamp((lastX - bounds.left) / bounds.width, 0, 1);
          var py = clamp((lastY - bounds.top) / bounds.height, 0, 1);
          orbit.style.setProperty('--tilt-y', (-19 + px * 16).toFixed(1) + 'deg');
          orbit.style.setProperty('--tilt-x', (-13 + py * 9).toFixed(1) + 'deg');
        });
      }, {passive: true});
    }
    setStep(1);
    return true;
  }

  function setStep(index) {
    var label = byId('stage-step-label');
    if (label) label.textContent = 'ÉTAPE ' + clamp(index, 1, steps.length) + '/' + steps.length + ' · ' + (steps[index - 1] || steps[0]);
  }

  function update(visuals, recipe) {
    if (!stage || !visuals) return;
    stage.style.setProperty('--brew-color', visuals.liquidColor || '#e5a03c');
    stage.style.setProperty('--foam-height', (29 + clamp(visuals.foamLevel, 0, 1) * 46).toFixed(0) + 'px');
    stage.style.setProperty('--clarity', (1 - clamp(visuals.turbidity, 0, 1) * .6).toFixed(2));
    stage.style.setProperty('--bubble-opacity', (.12 + clamp(visuals.carbonation, 0, 1) * .83).toFixed(2));
    stage.style.setProperty('--bubble-tempo', (1.65 - clamp(visuals.carbonation, 0, 1) * 1.1).toFixed(2));

    if (recipe) {
      var abv = byId('live-abv'), hops = byId('live-hops'), bubblesEl = byId('live-bubbles');
      if (abv) abv.textContent = Number(recipe.abv).toFixed(1).replace('.', ',') + '%';
      if (hops) hops.textContent = Number(recipe.hopAmount).toFixed(1).replace('.0', '').replace('.', ',') + '/10';
      if (bubblesEl) bubblesEl.textContent = Number(recipe.carbonation).toFixed(1).replace('.0', '').replace('.', ',') + '/10';
    }

    if (orbit && !reduced) {
      orbit.classList.remove('is-pulsing');
      void orbit.offsetWidth;
      orbit.classList.add('is-pulsing');
      clearTimeout(pulseTimer);
      pulseTimer = setTimeout(function () { if (orbit) orbit.classList.remove('is-pulsing'); }, 750);
    }
  }

  function finish() {
    if (stage) stage.classList.add('is-finished');
    var label = byId('stage-step-label');
    if (label) label.textContent = 'RECETTE TERMINÉE · À DÉGUSTER';
  }
  function restart() {
    if (stage) stage.classList.remove('is-finished');
    setStep(1);
  }
  return {init:init, update:update, setStep:setStep, finish:finish, restart:restart};
})();