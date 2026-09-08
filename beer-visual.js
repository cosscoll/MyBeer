/* ==========================================================================
   beer-visual.js
   Fond animé abstrait : dégradés colorés qui respirent + bulles flottantes,
   réagissant en direct à la recette (couleur, trouble, carbonatation).
   Pas de forme de verre : purement de l'ambiance, en fond, jamais
   interactive. Même API que les versions précédentes (init/update/onResize)
   pour ne rien changer côté ui.js.
   ========================================================================== */

var BeerVisual = (function () {
  var root;
  var bubbleCount = 26;

  function init(container) {
    if (!container) return false;
    container.innerHTML = '';
    root = container;
    root.style.setProperty('--liquid-color', '#e8a33d');
    root.style.setProperty('--turbidity', '0');
    root.style.setProperty('--speed', '1');

    var blobs = document.createElement('div');
    blobs.className = 'ambient-blobs';
    for (var i = 0; i < 3; i++) {
      var blob = document.createElement('div');
      blob.className = 'blob blob-' + i;
      blobs.appendChild(blob);
    }
    root.appendChild(blobs);

    var bubbleWrap = document.createElement('div');
    bubbleWrap.className = 'ambient-bubbles';
    for (var j = 0; j < bubbleCount; j++) {
      bubbleWrap.appendChild(makeBubble());
    }
    root.appendChild(bubbleWrap);

    return true;
  }

  function makeBubble() {
    var span = document.createElement('span');
    var left = Math.random() * 100;
    var size = 4 + Math.random() * 11;
    var dur = 9 + Math.random() * 11;
    var delay = -(Math.random() * 20);
    var drift = (Math.random() * 70 - 35);
    span.style.setProperty('--left', left.toFixed(1) + '%');
    span.style.setProperty('--size', size.toFixed(1) + 'px');
    span.style.setProperty('--dur', dur.toFixed(2));
    span.style.setProperty('--delay', delay.toFixed(2) + 's');
    span.style.setProperty('--drift', drift.toFixed(1) + 'px');
    return span;
  }

  /**
   * state: { liquidColor, turbidity: 0..1, foamLevel: 0..1,
   *          carbonation: 0..1, liquidFillRatio: 0..1 }
   */
  function update(state) {
    if (!root) return;
    root.style.setProperty('--liquid-color', state.liquidColor);
    root.style.setProperty('--turbidity', String(Math.max(0, Math.min(1, state.turbidity))));
    var speed = 0.5 + Math.max(0, Math.min(1, state.carbonation)) * 1.3;
    root.style.setProperty('--speed', speed.toFixed(2));
  }

  function onResize() {}

  return { init: init, update: update, onResize: onResize };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BeerVisual;
}
