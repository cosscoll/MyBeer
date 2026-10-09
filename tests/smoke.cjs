/* Contrôle de non-régression MyBeer (Node + jsdom). */
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const { JSDOM, ResourceLoader, VirtualConsole } = require('jsdom');

class LocalAssets extends ResourceLoader {
  fetch(url, options) {
    if (/^https?:\/\//i.test(url)) return Promise.resolve(Buffer.from(''));
    return super.fetch(url, options);
  }
}

async function main() {
  const root = path.join(__dirname, '..');
  for (const name of ['css/style.css','css/experience.css','js/beer-styles-data.js','js/beer-visual.js','js/experience.js','js/ui.js']) {
    assert.ok(fs.statSync(path.join(root, name)).size > 0, name + ' doit exister');
  }
  const messages = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', error => messages.push(String(error)));
  const dom = await JSDOM.fromFile(path.join(root, 'index.html'), {
    resources: new LocalAssets(),
    runScripts: 'dangerously',
    virtualConsole,
    pretendToBeVisual: true
  });
  const window = dom.window;
  if (window.document.readyState !== 'complete') {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Page load timeout')), 12000);
      window.addEventListener('load', () => {clearTimeout(timeout); resolve();}, {once:true});
    });
  }
  const d = window.document;
  const q = selector => d.querySelector(selector);
  const qa = selector => [...d.querySelectorAll(selector)];
  const click = selector => { const target = q(selector); assert.ok(target, selector); target.click(); };

  assert.ok(d.title.startsWith('MyBeer'), 'Titre attendu');
  assert.equal(q('#brew-stage').getAttribute('role'), 'img');
  assert.equal(qa('#beer-inside-bubbles i').length, 34, 'Bulles dans le verre');
  assert.equal(qa('.step.active').length, 1);
  assert.equal(q('.step.active').getAttribute('data-step'), 'fermentation');
  assert.match(q('#live-abv').textContent, /5,0%/);
  assert.ok(q('#brew-stage').style.getPropertyValue('--brew-color'), 'Couleur de bière initialisée');
  assert.equal(qa('#progress-dots .dot').length, 9, '9 étapes de progression');

  click('.step.active [data-action="next"]');
  click('.step.active [data-action="next"]');
  assert.equal(q('.step.active').getAttribute('data-step'), 'malt');
  const before = q('#brew-stage').style.getPropertyValue('--brew-color');
  const malts = qa('#control-malt .swatch-btn');
  assert.ok(malts.length >= 2, 'Choix du malt');
  malts[malts.length-1].click();
  const after = q('#brew-stage').style.getPropertyValue('--brew-color');
  assert.notEqual(after, before, 'Changement de malt répercute la couleur du verre');

  for (let i = 0; i < 4; i++) click('.step.active [data-action="next"]');
  assert.equal(q('.step.active').getAttribute('data-step'), 'carbonation');
  const slider = q('#slider-carbonation');
  slider.value = '9';
  slider.dispatchEvent(new window.Event('input', {bubbles: true}));
  assert.equal(q('#live-bubbles').textContent, '9/10');
  assert.equal(q('#brew-stage').style.getPropertyValue('--bubble-tempo'), '0.66');

  click('.step.active [data-action="next"]');
  assert.equal(q('.step.active').getAttribute('data-step'), 'abv');
  q('#slider-abv').value = '7.5';
  q('#slider-abv').dispatchEvent(new window.Event('input', {bubbles: true}));
  assert.equal(q('#live-abv').textContent, '7,5%');

  click('.step.active [data-action="next"]');
  assert.equal(q('.step.active').getAttribute('data-step'), 'filtration');
  click('.step.active [data-action="finish"]');
  assert.equal(q('#control-sheet').hidden, true, 'Compositeur masqué après fin');
  assert.equal(q('#result-panel').hidden, false, 'Résultat visible');
  assert.ok(q('#result-name').textContent.length > 2, 'Style calculé');
  assert.equal(q('#brew-stage').classList.contains('is-finished'), true);
  click('#restart-btn');
  assert.equal(q('#control-sheet').hidden, false);
  assert.equal(q('#result-panel').hidden, true);
  assert.equal(q('.step.active').getAttribute('data-step'), 'fermentation');
  assert.ok(messages.length === 0, 'Erreurs JS console: ' + messages.join('; '));

  console.log('PASS: 9 étapes, résultat, redémarrage, malt, couleur, bulles et alcool.');
  window.close();
}
main().catch(error => {console.error(error);process.exitCode = 1;});
