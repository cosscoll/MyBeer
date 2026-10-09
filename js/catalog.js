/* Encyclopédie des styles : consultation en local, sans serveur externe. */
(function () {
  'use strict';
  function el(id) {return document.getElementById(id);}
  document.addEventListener('DOMContentLoaded',function(){
    var knowledge=window.BEER_KNOWLEDGE;
    if(!knowledge)return;
    var all=knowledge.styles.slice().sort(function(a,b){return a.name.localeCompare(b.name,'fr');});
    var overlay=el('catalog-overlay'),grid=el('catalog-grid');
    var search=el('catalog-search'),family=el('catalog-family');
    var opener=el('catalog-open'),closer=el('catalog-close');
    var count=el('catalog-count'),total=el('catalog-total');
    var previousFocus=null, batch=48, showing=48, filtered=[];
    if(!overlay||!grid||!search||!family||!opener||!closer)return;
    count.textContent=all.length+' styles';
    var families=Array.from(new Set(all.map(function(s){return s.family;}))).sort(function(a,b){return a.localeCompare(b,'fr');});
    families.forEach(function(f){
      var option=document.createElement('option');option.value=f;option.textContent=f;family.appendChild(option);
    });
    function field(label,value){
      var wrap=document.createElement('span');wrap.className='catalog-metric';
      var k=document.createElement('small');k.textContent=label;
      var v=document.createElement('strong');v.textContent=value;
      wrap.appendChild(k);wrap.appendChild(v);return wrap;
    }
    function card(s) {
      var article=document.createElement('article');
      article.className='catalog-card';
      var top=document.createElement('div');top.className='catalog-card-top';
      var label=document.createElement('span');label.className='catalog-family-tag';label.textContent=s.family;
      var name=document.createElement('h3');name.textContent=s.name;
      top.appendChild(label);top.appendChild(name);article.appendChild(top);
      var p=document.createElement('p');p.textContent=s.distinction||s.description;article.appendChild(p);
      var metrics=document.createElement('div');metrics.className='catalog-card-metrics';
      metrics.appendChild(field('Alcool (indicatif)',s.abv[0]+'–'+s.abv[1]+' %'));
      metrics.appendChild(field('Amertume',s.hop+'/10'));
      metrics.appendChild(field('Acidité',s.acidity+'/10'));
      metrics.appendChild(field('Corps',s.body+'/10'));
      article.appendChild(metrics);
      return article;
    }
    function render(keepCount) {
      var q=search.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
      var fam=family.value;
      filtered=all.filter(function(s){
        if(fam&&s.family!==fam)return false;
        var hay=(s.name+' '+s.family+' '+s.distinction+' '+s.description)
          .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
        return hay.includes(q);
      });
      if(!keepCount) showing=batch;
      grid.textContent='';
      filtered.slice(0,showing).forEach(function(s){grid.appendChild(card(s));});
      total.textContent=filtered.length+' style'+(filtered.length>1?'s':'')+' trouvé'+(filtered.length>1?'s':'')+' sur '+all.length+'.';
      if(filtered.length>showing){
        var more=document.createElement('button');more.type='button';more.className='catalog-more';
        more.textContent='Afficher davantage ('+(filtered.length-showing)+' restants)';
        more.addEventListener('click',function(){showing+=batch;render(true);});
        grid.appendChild(more);
      }
      if(!filtered.length){
        var empty=document.createElement('p');empty.className='catalog-empty';
        empty.textContent='Aucun style trouvé. Essayez une autre recherche ou retirez le filtre de famille.';
        grid.appendChild(empty);
      }
    }
    function open(){
      previousFocus=document.activeElement;
      overlay.hidden=false;
      document.body.classList.add('catalog-visible');
      render(false);
      search.focus();
    }
    function close(){
      overlay.hidden=true;
      document.body.classList.remove('catalog-visible');
      if(previousFocus&&typeof previousFocus.focus==='function')previousFocus.focus();
    }
    opener.addEventListener('click',open);
    closer.addEventListener('click',close);
    var resultButton=el('result-open-catalog');
    if(resultButton)resultButton.addEventListener('click',open);
    search.addEventListener('input',function(){render(false);});
    family.addEventListener('change',function(){render(false);});
    overlay.addEventListener('click',function(event){if(event.target===overlay)close();});
    document.addEventListener('keydown',function(event){
      if(overlay.hidden)return;
      if(event.key==='Escape'){event.preventDefault();close();return;}
      if(event.key==='Tab'){
        var elements=Array.from(overlay.querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled]),a[href]'));
        if(!elements.length)return;
        var first=elements[0],last=elements[elements.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
      }
    });
  });
})();
