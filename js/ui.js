/* ==========================================================================
   ui.js
   Construit les contrôles à partir des données de beer-styles-data.js,
   maintient l'état de la recette, met à jour les textes pédagogiques et
   pilote le moteur visuel du verre (BeerVisual).
   ========================================================================== */

(function () {
  'use strict';

  var state = {
    fermentation: 'any',
    origin: 'peu-importe',
    malt: 'pale',
    hopProfile: 'noble',
    hopAmount: 4,
    flavors: [],
    sweetness: 3,
    carbonation: 5,
    abv: 5,
    filtration: 'limpide',
    acidity: 0,
    body: 4,
    yeast: 'any',
    roast: 0,
    special: 'none'
  };

  var engineReady = false;
  var STEPS = ['fermentation', 'origin', 'malt', 'hops', 'flavors', 'sweetness', 'carbonation', 'abv', 'acidity', 'body', 'yeast', 'roast', 'special', 'filtration'];
  var currentStep = 0;

  document.addEventListener('DOMContentLoaded', function () {
    renderFermentation();
    renderOrigin();
    renderMalt();
    renderHopProfile();
    renderFlavors();
    renderFiltration();
    renderAdvancedOptions();
    wireSliders();
    wireButtons();
    renderDots();
    if (typeof BrewExperience !== 'undefined') BrewExperience.init();

    var ambientEl = document.getElementById('ambient-bg');
    if (ambientEl && typeof BeerVisual !== 'undefined') {
      engineReady = BeerVisual.init(ambientEl);
    }

    updateAll();
  });

  /* -------------------- Navigation du parcours étape par étape -------------------- */

  function renderDots() {
    var el = document.getElementById('progress-dots');
    if (!el) return;
    el.innerHTML = '';
    STEPS.forEach(function () {
      var dot = document.createElement('span');
      dot.className = 'dot';
      el.appendChild(dot);
    });
    refreshDots();
  }

  function refreshDots() {
    var el = document.getElementById('progress-dots');
    if (!el) return;
    Array.prototype.forEach.call(el.children, function (dot, i) {
      dot.classList.toggle('current', i === currentStep);
      dot.classList.toggle('done', i < currentStep);
    });
  }


  function showStep(index) {
    var stepsEls = document.getElementById('control-sheet').children;
    Array.prototype.forEach.call(stepsEls, function (el, i) {
      el.classList.toggle('active', i === index);
    });
    currentStep = index;
    refreshDots();
    if (typeof BrewExperience !== 'undefined') BrewExperience.setStep(index + 1);
  }

  function goNext() {
    var isLast = currentStep === STEPS.length - 1;
    if (isLast) { finishWizard(); return; }
    showStep(currentStep + 1);
  }

  function goPrev() {
    if (currentStep === 0) return;
    showStep(currentStep - 1);
  }

  function finishWizard() {
    document.getElementById('control-sheet').hidden = true;
    var dots = document.getElementById('progress-dots');
    if (dots) dots.hidden = true;
    showResult();
    if (typeof BrewExperience !== 'undefined') BrewExperience.finish();
  }

  function restartWizard() {
    document.getElementById('result-panel').hidden = true;
    document.getElementById('result-panel').classList.remove('panel-in');
    document.getElementById('control-sheet').hidden = false;
    var dots = document.getElementById('progress-dots');
    if (dots) dots.hidden = false;
    showStep(0);
    if (typeof BrewExperience !== 'undefined') BrewExperience.restart();
  }

  /* -------------------- Construction des contrôles -------------------- */

  function renderFermentation() {
    var el = document.getElementById('control-fermentation');
    FERMENTATION_TYPES.forEach(function (f) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'seg-btn' + (f.id === state.fermentation ? ' active' : '');
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', f.id === state.fermentation ? 'true' : 'false');
      btn.innerHTML = f.label + '<small>' + f.short + '</small>';
      btn.addEventListener('click', function () {
        state.fermentation = f.id;
        refreshActive(el, btn);
        updateAll();
      });
      el.appendChild(btn);
    });
  }

  function renderOrigin() {
    var el = document.getElementById('control-origin');
    ORIGINS.forEach(function (o) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'seg-btn' + (o.id === state.origin ? ' active' : '');
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', o.id === state.origin ? 'true' : 'false');
      btn.textContent = o.label;
      btn.addEventListener('click', function () {
        state.origin = o.id;
        refreshActive(el, btn);
        updateAll();
      });
      el.appendChild(btn);
    });
  }

  function renderMalt() {
    var el = document.getElementById('control-malt');
    MALT_TYPES.forEach(function (m) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'swatch-btn' + (m.id === state.malt ? ' active' : '');
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', m.id === state.malt ? 'true' : 'false');
      var chip = document.createElement('span');
      chip.className = 'swatch-chip';
      chip.style.background = m.color;
      var label = document.createElement('span');
      label.textContent = m.label;
      btn.appendChild(chip);
      btn.appendChild(label);
      btn.addEventListener('click', function () {
        state.malt = m.id;
        refreshActive(el, btn);
        updateAll();
      });
      el.appendChild(btn);
    });
  }

  function renderHopProfile() {
    var el = document.getElementById('control-hop-profile');
    HOP_PROFILES.forEach(function (h) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'seg-btn' + (h.id === state.hopProfile ? ' active' : '');
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', h.id === state.hopProfile ? 'true' : 'false');
      btn.textContent = h.label;
      btn.addEventListener('click', function () {
        state.hopProfile = h.id;
        refreshActive(el, btn);
        updateAll();
      });
      el.appendChild(btn);
    });
  }

  function renderFlavors() {
    var el = document.getElementById('control-flavors');
    FLAVOR_TAGS.forEach(function (t) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chip-btn';
      btn.textContent = t.label;
      btn.addEventListener('click', function () {
        var idx = state.flavors.indexOf(t.id);
        if (idx >= 0) {
          state.flavors.splice(idx, 1);
        } else {
          if (state.flavors.length >= 3) state.flavors.shift();
          state.flavors.push(t.id);
        }
        Array.prototype.forEach.call(el.children, function (child, i) {
          child.classList.toggle('active', state.flavors.indexOf(FLAVOR_TAGS[i].id) >= 0);
        });
        updateAll();
      });
      el.appendChild(btn);
    });
  }

  function renderFiltration() {
    var el = document.getElementById('control-filtration');
    var options = [
      { id: 'limpide', label: 'Limpide' },
      { id: 'trouble', label: 'Trouble' }
    ];
    options.forEach(function (o) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'seg-btn' + (o.id === state.filtration ? ' active' : '');
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', o.id === state.filtration ? 'true' : 'false');
      btn.textContent = o.label;
      btn.addEventListener('click', function () {
        state.filtration = o.id;
        refreshActive(el, btn);
        updateAll();
      });
      el.appendChild(btn);
    });
  }

  function refreshActive(container, activeBtn) {
    Array.prototype.forEach.call(container.children, function (child) {
      var isActive = child === activeBtn;
      child.classList.toggle('active', isActive);
      child.setAttribute('aria-checked', isActive ? 'true' : 'false');
    });
  }


  /* -------------------- Profils sensoriels avancés -------------------- */

  function renderAdvancedOptions() {
    var yeastOptions = [
      { id:'any', label:'Sans préférence', short:'Tous profils' },
      { id:'clean', label:'Neutre', short:'Net, discret' },
      { id:'esters', label:'Fruité', short:'Esters de levure' },
      { id:'phenolic', label:'Épicé', short:'Poivre, girofle' },
      { id:'wild', label:'Sauvage', short:'Funky, Brett' }
    ];
    var yeastEl=document.getElementById('control-yeast');
    yeastOptions.forEach(function(option) {
      var btn=document.createElement('button');
      btn.type='button';btn.className='seg-btn'+(state.yeast===option.id?' active':'');
      btn.setAttribute('role','radio');
      btn.setAttribute('aria-checked',state.yeast===option.id?'true':'false');
      btn.textContent=option.label;
      var desc=document.createElement('small');desc.textContent=option.short;btn.appendChild(desc);
      btn.addEventListener('click',function() {
        state.yeast=option.id;refreshActive(yeastEl,btn);updateAll();
      });
      yeastEl.appendChild(btn);
    });
    var specialOptions=[
      ['none','Aucune'],['smoke','Fumée'],['salt','Salée'],['wood','Boisée / fût'],
      ['fruit','Fruits ajoutés'],['lactose','Lactée'],['coffee','Café ajouté']
    ];
    var specialEl=document.getElementById('control-special');
    specialOptions.forEach(function(option) {
      var btn=document.createElement('button');
      btn.type='button';btn.className='chip-btn'+(state.special===option[0]?' active':'');
      btn.setAttribute('role','radio');
      btn.setAttribute('aria-checked',state.special===option[0]?'true':'false');
      btn.textContent=option[1];
      btn.addEventListener('click',function(){
        state.special=option[0];refreshActive(specialEl,btn);updateAll();
      });
      specialEl.appendChild(btn);
    });
  }

  function connectNewSlider(id,key) {
    var el=document.getElementById('slider-'+id);
    var out=document.getElementById('value-'+id);
    if(!el||!out)return;
    el.addEventListener('input',function(){
      state[key]=Number(el.value);
      out.textContent=el.value+'/10';
      updateAll();
    });
  }

  function wireSliders() {
    connectNewSlider('acidity','acidity');
    connectNewSlider('body','body');
    connectNewSlider('roast','roast');
    var hop = document.getElementById('slider-hop');
    hop.addEventListener('input', function () {
      state.hopAmount = parseFloat(hop.value);
      updateAll();
    });

    var sweet = document.getElementById('slider-sweetness');
    sweet.addEventListener('input', function () {
      state.sweetness = parseFloat(sweet.value);
      updateAll();
    });

    var abv = document.getElementById('slider-abv');
    abv.addEventListener('input', function () {
      state.abv = parseFloat(abv.value);
      updateAll();
    });

    var carb = document.getElementById('slider-carbonation');
    carb.addEventListener('input', function () {
      state.carbonation = parseFloat(carb.value);
      updateAll();
    });

    document.getElementById('text-sweetness').textContent = SLIDER_TEXTS.sweetness;
    document.getElementById('text-abv').textContent = SLIDER_TEXTS.abv;
    document.getElementById('text-carbonation').textContent = SLIDER_TEXTS.carbonation;
  }

  function wireButtons() {
    document.getElementById('control-sheet').addEventListener('click', function (e) {
      var action = e.target && e.target.getAttribute ? e.target.getAttribute('data-action') : null;
      if (action === 'next') goNext();
      else if (action === 'prev') goPrev();
      else if (action === 'finish') goNext(); // dernière étape : goNext() détecte la fin et appelle finishWizard()
    });
    document.getElementById('restart-btn').addEventListener('click', restartWizard);
  }

  /* -------------------- Mise à jour des textes + du rendu 3D -------------------- */

  function updateAll() {
    var ferm = getFermentationById(state.fermentation);
    document.getElementById('text-fermentation').textContent = ferm ? ferm.text : '';

    var originInfo = getOriginById(state.origin);
    document.getElementById('text-origin').textContent = originInfo ? originInfo.text : '';

    var malt = getMaltById(state.malt);
    document.getElementById('text-malt').textContent = malt ? malt.text : '';

    var hopProf = getHopProfileById(state.hopProfile);
    document.getElementById('text-hop-profile').textContent = hopProf ? hopProf.text : '';
    document.getElementById('text-hop-amount').textContent = SLIDER_TEXTS.hopAmount;

    document.getElementById('text-filtration').textContent = FILTRATION_TEXTS[state.filtration];

    if (state.flavors.length) {
      var texts = state.flavors.map(function (id) {
        var tag = FLAVOR_TAGS.filter(function (t) { return t.id === id; })[0];
        return tag ? tag.text : '';
      });
      document.getElementById('text-flavors').textContent = texts.join(' ');
    } else {
      document.getElementById('text-flavors').textContent = "Sélectionnez jusqu'à trois arômes pour affiner votre recette.";
    }

    var visuals = computeDerivedVisuals(state);

    if (engineReady) {
      BeerVisual.update(visuals);
    }
    if (typeof BrewExperience !== 'undefined') BrewExperience.update(visuals, state);
  }

  function computeDerivedVisuals(s) {
    var malt = getMaltById(s.malt) || MALT_TYPES[0];
    var color = hexToRgb(malt.color);

    var flavorTints = {
      fruits: '#b83b3b',
      epices: '#e2b451',
      cafe: '#3b2418',
      chocolat: '#3a2013',
      agrumes_zeste: '#f0c23e'
    };
    s.flavors.forEach(function (id) {
      if (flavorTints[id]) color = mixRgb(color, hexToRgb(flavorTints[id]), 0.16);
    });

    var liquidColor = rgbToHex(color);

    var turbidity = (s.filtration === 'trouble') ? 0.55 : 0.08;
    if (s.malt === 'wheat') turbidity += 0.15;
    if (s.flavors.indexOf('fruits') >= 0) turbidity += 0.08;
    turbidity = clamp(turbidity, 0, 1);

    var foamLevel = 0.55;
    if (s.malt === 'wheat') foamLevel += 0.25;
    foamLevel -= Math.max(0, s.abv - 5) * 0.035;
    foamLevel = clamp(foamLevel, 0.15, 1);

    var carbonation = clamp(s.carbonation / 10, 0, 1);

    return {
      liquidColor: liquidColor,
      turbidity: turbidity,
      foamLevel: foamLevel,
      carbonation: carbonation,
      liquidFillRatio: 0.86
    };
  }

  function showResult() {
    var result = computeBestMatch(state);
    document.getElementById('result-name').textContent = result.style.name;
    document.getElementById('result-match').textContent = 'Indice de ressemblance : ' + result.percent + ' / 99';
    var confidence=document.getElementById('result-confidence');
    if(confidence)confidence.textContent=result.isCloseCall
      ? 'Plusieurs styles sont très proches : voici les alternatives à comparer.'
      : 'C’est le style le plus proche parmi ' + (result.catalogSize||BEER_STYLES.length) + ' profils répertoriés.';
    document.getElementById('result-description').textContent = result.style.description;

    var reasonsEl = document.getElementById('result-reasons');
    reasonsEl.innerHTML = '';
    result.reasons.forEach(function (r) {
      var p = document.createElement('p');
      p.className = 'result-reason';
      p.textContent = r;
      reasonsEl.appendChild(p);
    });

    var alternativesEl=document.getElementById('result-alternatives');
    if(alternativesEl) {
      alternativesEl.textContent='';
      (result.alternatives||[]).forEach(function(candidate,index){
        var entry=document.createElement('article');entry.className='alternative-card';
        var title=document.createElement('h4');title.textContent=(index+2)+'. '+candidate.style.name;
        var badge=document.createElement('span');badge.textContent=candidate.percent+' / 99';
        badge.className='alternative-score';
        var text=document.createElement('p');
        text.textContent=candidate.style.distinction||candidate.style.description;
        entry.appendChild(title);entry.appendChild(badge);entry.appendChild(text);
        alternativesEl.appendChild(entry);
      });
    }

    var examplesSection=document.getElementById('result-examples-section');
    if(examplesSection)examplesSection.hidden=!(result.style.examples||[]).length;
    var examplesEl = document.getElementById('result-examples');
    examplesEl.innerHTML = '';
    (result.style.examples || []).forEach(function (ex) {
      var card = document.createElement('div');
      card.className = 'example-card';

      var head = document.createElement('div');
      head.className = 'example-head';
      var name = document.createElement('span');
      name.className = 'example-name';
      name.textContent = ex.name;
      var origin = document.createElement('span');
      origin.className = 'example-origin';
      origin.textContent = ex.origin;
      head.appendChild(name);
      head.appendChild(origin);

      var note = document.createElement('p');
      note.className = 'example-note';
      note.textContent = ex.note;

      card.appendChild(head);
      card.appendChild(note);
      examplesEl.appendChild(card);
    });

    var panel = document.getElementById('result-panel');
    panel.hidden = false;
    panel.classList.remove('panel-in');
    void panel.offsetWidth; // force le navigateur à relancer l'animation à chaque clic
    panel.classList.add('panel-in');
    // Le panneau de résultat gère son propre scroll sur desktop ;
    // sur mobile, on ramène seulement le résultat dans le champ de vision.
    panel.scrollTop = 0;
    if (typeof panel.scrollIntoView === 'function' && window.innerWidth <= 900) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  /* -------------------- Utilitaires couleur -------------------- */

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16)
    };
  }
  function rgbToHex(c) {
    function h(v) { return Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0'); }
    return '#' + h(c.r) + h(c.g) + h(c.b);
  }
  function mixRgb(a, b, t) {
    return {
      r: a.r + (b.r - a.r) * t,
      g: a.g + (b.g - a.g) * t,
      b: a.b + (b.b - a.b) * t
    };
  }
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

})();
