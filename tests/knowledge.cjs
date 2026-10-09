const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
const context=vm.createContext({console});
for(const file of ['js/beer-styles-data.js','js/beer-knowledge.js']){
  vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
}
const styles=Array.from(context.BEER_KNOWLEDGE.styles);
assert.ok(styles.length>=80,'Au moins 80 styles documentés');
assert.equal(new Set(styles.map(s=>s.id)).size,styles.length,'Identifiants uniques');
for(const s of styles){
  assert.ok(s.name&&s.name.length>2,'Nom manquant '+s.id);
  assert.ok(s.family&&s.distinction,'Documentation manquante '+s.id);
  assert.ok(Array.isArray(s.abv)&&s.abv.length===2&&s.abv[0]<s.abv[1],'ABV invalide '+s.id);
  assert.ok(s.acidity>=0&&s.acidity<=10,'Acidité invalide '+s.id);
  assert.ok(s.body>=0&&s.body<=10,'Corps invalide '+s.id);
  assert.ok(s.roast>=0&&s.roast<=10,'Torréfaction invalide '+s.id);
  assert.ok(s.darkness>=0&&s.darkness<=4,'Robe invalide '+s.id);
  assert.ok(s.fermentation==='haute'||s.fermentation==='basse'||s.fermentation==='spontanee','Fermentation invalide '+s.id);
}
const baseline={
  fermentation:'haute',origin:'peu-importe',malt:'pale',hopProfile:'noble',
  hopAmount:4,flavors:[],sweetness:3,carbonation:5,abv:5,
  filtration:'limpide',acidity:0,body:4,yeast:'clean',roast:0,special:'none'
};
function evaluate(overrides,allowed,label){
  const s={...baseline,...overrides};
  const r=context.computeBestMatch(s);
  assert.ok(r.style&&r.style.name,label+': aucun style');
  assert.ok(r.percent>=0&&r.percent<=99,label+': indice invalide');
  assert.equal(r.alternatives.length,2,label+': deux alternatives');
  if(allowed)assert.ok(allowed.includes(r.style.id),label+': mauvais style, trouvé '+r.style.id);
  return r;
}
evaluate({fermentation:'haute',malt:'wheat',origin:'europe-centrale',hopAmount:1.3,hopProfile:'noble',
 carbonation:7.5,filtration:'trouble',abv:5,yeast:'phenolic',body:5},['weizen','dunkelweizen','weizenbock'],'Blé allemand');
evaluate({fermentation:'basse',malt:'pale',origin:'europe-centrale',hopAmount:4.8,hopProfile:'noble',
 sweetness:2,abv:4.9,body:2.5,yeast:'clean',filtration:'limpide'},['german-pils','pils','czech-premium-pale-lager','italian-pils'],'Pils sèche');
evaluate({fermentation:'haute',malt:'pale',origin:'americaine',hopAmount:6.5,hopProfile:'agrumes',
 sweetness:4,abv:6.2,body:6,yeast:'esters',filtration:'trouble'},['hazy-ipa','ipa'],'Hazy IPA');
evaluate({fermentation:'haute',malt:'pale',hopAmount:.5,acidity:8,body:1,abv:3.5,
 filtration:'trouble',carbonation:7,yeast:'clean',origin:'europe-centrale'},['berliner-weisse','kettle-sour'],'Berliner Weisse');
evaluate({fermentation:'haute',origin:'europe-centrale',malt:'wheat',hopAmount:1,acidity:7,
 special:'salt',abv:4.4,carbonation:6,body:3},['gose'],'Gose salée');
evaluate({fermentation:'basse',origin:'europe-centrale',malt:'amber',hopAmount:2.7,
 special:'smoke',roast:1,body:5,abv:5.4},['rauchbier'],'Rauchbier');
evaluate({fermentation:'haute',origin:'iles-britanniques',malt:'roasted',hopAmount:3,
 roast:8,body:3,yeast:'clean',abv:4.2,sweetness:2},['irish-stout','stout','american-stout'],'Stout sec');
evaluate({fermentation:'haute',malt:'roasted',roast:8,body:10,sweetness:8,
 special:'wood',abv:10,hopAmount:3},['barrel-aged-stout'],'Stout en fût');
console.log('PASS KNOWLEDGE: '+styles.length+' styles cohérents, 8 recettes repères, scores et alternatives.');
