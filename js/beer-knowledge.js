/* MyBeer : catalogue de familles stylistiques et moteur sensoriel.
   Synthèse originale, non reproduction des textes BJCP/BA.
   Références : https://www.bjcp.org/style/2021/beer/
   https://www.brewersassociation.org/edu/brewers-association-beer-style-guidelines/
   Les données décrivent des STYLES, jamais l'ensemble des marques commerciales.
   ABV = plages indicatives, ni garanties ni limites absolues.
*/
(function (global) {
  'use strict';
  var ref = {
    bjcp: 'https://www.bjcp.org/style/2021/beer/',
    ba: 'https://www.brewersassociation.org/edu/brewers-association-beer-style-guidelines/'
  };
  // id, nom, fermentation, robe(0-4), amertume, douceur, ABV min/max,
  // apparence, houblon, origine, bulles, acidité, corps, levure, torréfaction,
  // signature, famille, différence essentielle avec les styles voisins.
  var raw = [
    ['czech-premium-pale-lager','Czech Premium Pale Lager','basse',.4,4,3,4.2,5.8,'limpide','noble','europe-centrale',5,0,4,'clean',0,'none','Lager','Pils tchèque ronde, au malt expressif, au houblon épicé et à une amertume souple.'],
    ['german-pils','German Pils','basse',.2,5,1.5,4.4,5.2,'limpide','noble','europe-centrale',6,0,2,'clean',0,'none','Lager','Plus sèche et tranchante que la pils tchèque, avec une finale nettement houblonnée.'],
    ['munich-helles','Munich Helles','basse',.3,2,4,4.7,5.4,'limpide','noble','europe-centrale',5,0,4,'clean',0,'none','Lager','Lager blonde douce, céréalière et maltée, moins amère qu’une Pils.'],
    ['dortmunder-export','Dortmunder Export','basse',.35,3,3.5,4.8,6,'limpide','noble','europe-centrale',5,0,4,'clean',0,'none','Lager','Blonde allemande équilibrée, plus soutenue qu’une Helles classique.'],
    ['vienna-lager','Vienna Lager','basse',1.4,2.8,4,4.7,5.5,'limpide','noble','europe-centrale',4.5,0,5,'clean',1,'none','Lager','Cuivrée, nette, centrée sur les saveurs de pain grillé plutôt que le caramel intense.'],
    ['marzen','Märzen / Oktoberfest','basse',1.6,2.5,5,5.6,6.3,'limpide','noble','europe-centrale',4,0,6,'clean',1,'none','Lager','Plus généreuse et ronde qu’une Vienna Lager, avec une forte présence de malt viennois ou munichois.'],
    ['festbier','Festbier','basse',.5,2.5,4.5,5.8,6.3,'limpide','noble','europe-centrale',5,0,5,'clean',0,'none','Lager','Bière blonde de fête allemande, douce et élégante, distincte de la Märzen ambrée.'],
    ['dunkel','Munich Dunkel','basse',2.4,1.6,5,4.5,5.6,'limpide','noble','europe-centrale',4,0,6,'clean',2,'none','Lager','Brune allemande riche en pain grillé, sans caractère brûlé de stout.'],
    ['schwarzbier','Schwarzbier','basse',3.6,2.7,2.5,4.4,5.4,'limpide','noble','europe-centrale',5,0,3,'clean',5,'none','Lager','Noire mais sèche et légère, avec une torréfaction douce et sans lourdeur.'],
    ['helles-bock','Helles Bock / Maibock','basse',.7,2.8,5,6.3,7.4,'limpide','noble','europe-centrale',4.5,0,6,'clean',.5,'none','Lager forte','Bock blonde puissante et maltée, sans couleur sombre.'],
    ['doppelbock','Doppelbock','basse',2.9,1.5,7.5,7,10,'limpide','noble','europe-centrale',3.5,0,9,'clean',2,'none','Lager forte','Lager très maltée, dense et puissante, plus riche qu’une bock traditionnelle.'],
    ['eisbock','Eisbock','basse',3.3,1.5,8,9,14,'limpide','noble','europe-centrale',2.5,0,10,'clean',2,'none','Lager forte','Concentrée par congélation partielle d’une bock; intensité et alcool particulièrement élevés.'],
    ['kellerbier','Kellerbier','basse',.9,2.8,3.5,4.5,5.7,'trouble','noble','europe-centrale',3.5,0,5,'clean',0,'none','Lager','Lager non filtrée, au caractère de fermentation et au malt frais légèrement plus présents.'],
    ['kolsch','Kölsch','haute',.2,2.5,2,4.4,5.2,'limpide','noble','europe-centrale',6,0,2,'clean',0,'none','Ale blonde','Fermentée avec une levure d’ale puis maturée au froid : une blonde fine et discrètement fruitée.'],
    ['altbier','Altbier','haute',1.6,5,2.5,4.3,5.5,'limpide','noble','europe-centrale',4,0,4,'clean',1,'none','Ale ambrée','Ale cuivrée de Düsseldorf, sèche, nette et davantage amère qu’une bière maltée ambrée.'],
    ['berliner-weisse','Berliner Weisse','haute',.3,.6,1,2.8,3.8,'trouble','noble','europe-centrale',7,8,1,'clean',0,'none','Acide','Blanche berlinoise très légère et nettement lactique, différente d’une Gose salée.'],
    ['rauchbier','Rauchbier / Märzen fumée','basse',1.8,2.7,4.5,4.8,6,'limpide','noble','europe-centrale',4,0,5,'clean',1,'smoke','Spécialité','Malt séché à la fumée de bois : caractère fumé marqué, structure maltée proche d’une Märzen.'],
    ['cream-ale','Cream Ale','haute',.2,1.7,2,4.2,5.6,'limpide','noble','americaine',6,0,2,'clean',0,'none','Ale blonde','Ale américaine très légère et peu fruitée, souvent proche d’une lager.'],
    ['american-lager','American Lager','basse',.1,1,1.5,4.2,5.3,'limpide','noble','americaine',8,0,1,'clean',0,'none','Lager','Lager pâle légère, très peu amère et au profil de céréales discret.'],
    ['american-light-lager','American Light Lager','basse',.1,.7,1,2.8,4.2,'limpide','noble','americaine',9,0,.5,'clean',0,'none','Lager','Encore moins de corps et d’intensité qu’une American Lager classique.'],
    ['mexican-lager','Mexican Lager (interprétation)','basse',.3,1.5,2,4.2,5.4,'limpide','noble','americaine',7,0,2,'clean',0,'none','Lager','Dénomination commerciale large : blonde fraîche, parfois avec maïs, qui recoupe plusieurs lagers.'],
    ['session-ipa','Session IPA','haute',.55,6,1.8,3.2,5,'limpide','agrumes','americaine',5.5,0,2.5,'clean',0,'none','IPA','Nez très houblonné et finale sèche, mais alcool plus bas qu’une IPA américaine classique.'],
    ['american-ipa','American IPA','haute',.8,7.5,2,5.5,7.5,'limpide','agrumes','americaine',5.5,0,4,'clean',0,'none','IPA','Houblon au premier plan : résine, agrumes et finale plus amère qu’une Hazy IPA.'],
    ['hazy-ipa','Hazy IPA / New England IPA','haute',.55,4,4.5,5.5,7.5,'trouble','agrumes','americaine',4.5,0,6,'esters',0,'none','IPA','Trouble et moelleuse, très aromatique, souvent fruitée et moins mordante qu’une West Coast IPA.'],
    ['west-coast-ipa','West Coast IPA','haute',.65,9,1,5.5,7.5,'limpide','agrumes','americaine',5.5,0,3,'clean',0,'none','IPA','IPA sèche, claire, résineuse, à amertume très affirmée.'],
    ['double-ipa','Double / Imperial IPA','haute',.8,9,3.5,7.5,10,'limpide','agrumes','americaine',4.5,0,6,'esters',0,'none','IPA','Davantage d’alcool, de corps et de houblon qu’une IPA ordinaire.'],
    ['english-ipa','English IPA','haute',1.1,6,2.8,5,7.5,'limpide','terreux','iles-britanniques',4.5,0,4,'esters',0,'none','IPA','Houblon terreux et malt biscuité plutôt que profil tropical.'],
    ['belgian-ipa','Belgian IPA','haute',.8,6.5,2,6.2,9.5,'limpide','agrumes','belge',7,0,4,'phenolic',0,'none','IPA','Intensité du houblon associée aux notes épicées et fruitées d’une levure belge.'],
    ['ordinary-bitter','Ordinary Bitter','haute',1.3,4.5,2.5,3.2,3.8,'limpide','terreux','iles-britanniques',2.5,0,3,'esters',0,'none','Ale anglaise','Ale de pub peu alcoolisée, malt biscuité et finale amère, servie souvent avec peu de gaz.'],
    ['best-bitter','Best Bitter','haute',1.4,5,3,3.8,4.6,'limpide','terreux','iles-britanniques',3,0,3,'esters',0,'none','Ale anglaise','Bitter anglaise légèrement plus riche qu’une Ordinary Bitter.'],
    ['strong-bitter','Strong Bitter / ESB','haute',1.6,5.2,4,4.6,6.2,'limpide','terreux','iles-britanniques',3,0,5,'esters',0,'none','Ale anglaise','Version plus charpentée et forte de la famille des bitters.'],
    ['english-mild','Dark Mild','haute',2.4,1.5,4.5,3,3.8,'limpide','terreux','iles-britanniques',2.5,0,4,'esters',2,'none','Ale anglaise','Brune légère et peu amère, douce, toastée, moins torréfiée qu’un porter.'],
    ['irish-red','Irish Red Ale','haute',1.7,2.5,4.2,3.8,5,'limpide','terreux','iles-britanniques',3.5,0,4,'clean',1.5,'none','Ale ambrée','Rousse maltée au caramel léger et finale plutôt sèche, peu houblonnée.'],
    ['scottish-export','Scottish Export','haute',2,2,5.5,3.9,6,'limpide','terreux','iles-britanniques',3,0,6,'esters',1,'none','Ale maltée','Ale écossaise très centrée sur le malt, caramel et biscuit, avec peu de houblon.'],
    ['wee-heavy','Wee Heavy / Strong Scotch Ale','haute',2.7,1.7,8,6.5,10,'limpide','terreux','iles-britanniques',2.5,0,9,'esters',1.5,'none','Ale forte','Bière écossaise très riche et puissante avec notes de caramel et fruits secs.'],
    ['oatmeal-stout','Oatmeal Stout','haute',3.9,3.2,5.7,4.2,5.9,'limpide','terreux','iles-britanniques',3,0,7,'esters',7,'none','Stout','L’avoine accentue le corps soyeux, avec torréfaction modérée.'],
    ['irish-stout','Irish Stout','haute',4,4.5,2,3.8,5,'limpide','terreux','iles-britanniques',3,0,3.5,'clean',8,'none','Stout','Noire, sèche, marquée par le café torréfié et souvent une mousse crémeuse.'],
    ['sweet-stout','Sweet / Milk Stout','haute',3.9,2.6,8,4,6,'limpide','terreux','iles-britanniques',2.8,0,8,'esters',6,'lactose','Stout','Douceur ronde souvent apportée par du lactose, contrairement à un Irish Stout sec.'],
    ['imperial-stout','Imperial Stout','haute',4,6.5,6.5,8,12,'limpide','terreux','iles-britanniques',2.5,0,10,'esters',9,'none','Stout','Puissance alcoolique et torréfaction beaucoup plus intenses qu’un stout ordinaire.'],
    ['american-stout','American Stout','haute',4,6,3.5,5,7,'limpide','agrumes','americaine',4,0,6,'clean',8,'none','Stout','Torréfaction forte et houblon américain davantage perceptible.'],
    ['robust-porter','American Porter','haute',3.4,4,4.5,4.8,6.5,'limpide','agrumes','americaine',4,0,6,'clean',6,'none','Porter','Porter américain plus houblonné et torréfié qu’un porter anglais doux.'],
    ['baltic-porter','Baltic Porter','basse',3.5,2.5,6,6.5,9.5,'limpide','noble','europe-centrale',3,0,8,'clean',5,'none','Porter','Puissant et doux, souvent lagerisé : fruits secs et chocolat sans caractère brûlé.'],
    ['belgian-pale-ale','Belgian Pale Ale','haute',1.4,3,3.5,4.8,5.5,'limpide','terreux','belge',5,0,4,'esters',0,'none','Ale belge','Équilibre de malt biscuité, fruits légers et épices moins prononcées qu’une Saison.'],
    ['belgian-blond','Belgian Blond Ale','haute',.45,2.4,4.2,6,7.5,'limpide','noble','belge',6,0,5,'phenolic',0,'none','Ale belge','Blonde belge plus forte, avec douceur maltée et épices discrètes.'],
    ['belgian-dubbel','Belgian Dubbel','haute',2.5,2.2,5.5,6,7.6,'limpide','terreux','belge',6,0,6,'esters',1,'none','Abbaye','Brune belge ronde, fruits secs et sucres foncés, moins puissante qu’une Quadrupel.'],
    ['belgian-dark-strong','Belgian Dark Strong / Quadrupel','haute',3,2.8,6.5,8,12,'limpide','terreux','belge',6,0,9,'phenolic',1,'none','Abbaye','Bière belge brune puissante aux notes de raisin, prune et caramel profond.'],
    ['belgian-golden-strong','Belgian Golden Strong Ale','haute',.4,3,1.6,7.5,10.5,'limpide','noble','belge',8,0,3,'phenolic',0,'none','Ale belge forte','Très sèche et pétillante malgré son alcool élevé, moins ronde qu’une Tripel.'],
    ['belgian-table-beer','Belgian Table Beer','haute',.45,1.5,2.8,1.5,3.5,'limpide','noble','belge',5.5,0,2,'phenolic',0,'none','Ale belge','Bière de table légère, levure belge présente malgré une faible teneur en alcool.'],
    ['biere-de-garde','Bière de Garde','haute',1.8,2.5,5,6,8.5,'limpide','terreux','belge',4,0,6,'clean',.5,'none','Ale de garde','Tradition du nord de la France, maltée, bien mûrie, peu houblonnée.'],
    ['dunkelweizen','Dunkelweizen','haute',2.3,1.5,4,4.3,5.6,'trouble','noble','europe-centrale',7.2,0,6,'phenolic',1.5,'none','Blé','Blé allemand foncé : banane et girofle sur un fond de pain brun.'],
    ['weizenbock','Weizenbock','haute',2.5,2,6,6.5,9,'trouble','noble','europe-centrale',7,0,8,'phenolic',1.5,'none','Blé','Weizen plus forte et riche en malt, conserve les arômes de levure banane/girofle.'],
    ['american-wheat','American Wheat Beer','haute',.35,2,2.8,4,5.5,'trouble','agrumes','americaine',6,0,3,'clean',0,'none','Blé','Bière de blé américaine, peu ou pas de banane et de girofle.'],
    ['gueuze','Gueuze','spontanee',.55,1,1.2,5,8,'limpide','terreux','belge',8,9,2,'wild',0,'none','Fermentation spontanée','Assemblage de lambics d’âges différents, sec et très pétillant.'],
    ['framboise-lambic','Lambic aux fruits','spontanee',1,.8,3.5,5,7,'trouble','terreux','belge',5.5,7,4,'wild',0,'fruit','Fermentation spontanée','Lambic avec fruits, où acidité et fruits réels se mêlent au caractère sauvage.'],
    ['flanders-red','Flanders Red Ale','haute',1.8,1.8,3,4.6,6.5,'limpide','terreux','belge',4.5,8,5,'wild',.5,'none','Acide','Rouge flamande complexe, acidité vineuse et élevage apportant souvent des notes boisées.'],
    ['oud-bruin','Oud Bruin','haute',2.9,1.4,5,4,8,'limpide','terreux','belge',3.5,6,6,'wild',1,'none','Acide','Brune flamande aigre-douce, plus maltée et moins acétique qu’une Flanders Red.'],
    ['american-wild-ale','American Wild Ale','haute',1.3,2,2.2,4,8,'trouble','agrumes','americaine',5,7,4,'wild',0,'none','Acide','Famille large de bières acidifiées avec levures ou bactéries non conventionnelles.'],
    ['kettle-sour','Kettle Sour','haute',.5,.7,2,3.5,5.5,'trouble','agrumes','americaine',6,8,3,'clean',0,'none','Acide','Acidification lactique rapide avant ébullition, sans nécessairement de caractère sauvage.'],
    ['pastry-stout','Pastry Stout','haute',4,2,9,7,12,'limpide','terreux','americaine',2.5,0,10,'esters',7,'lactose','Stout','Stout dessert très riche, avec associations fréquentes de vanille, cacao ou autres ingrédients.'],
    ['barrel-aged-stout','Stout vieilli en fût','haute',4,3.5,7.5,8,13,'limpide','terreux','americaine',2,0,10,'esters',8,'wood','Spécialité','Stout riche en caractère de bois ou d’alcool issu du vieillissement en fût.'],
    ['rice-lager','Rice Lager / Japanese Rice Lager','basse',.18,1.4,1.3,4,5.6,'limpide','noble','americaine',8,0,1.5,'clean',0,'none','Lager','Lager légère et nette utilisant du riz comme céréale complémentaire.'],
    ['italian-pils','Italian Pilsner (interprétation)','basse',.2,4.8,2,4.5,5.5,'limpide','noble','europe-centrale',6,0,2.5,'clean',0,'none','Lager','Pils sèche et aromatique mettant en avant un houblonnage tardif, interprétation moderne.'],
    ['red-ipa','Red IPA','haute',1.8,7,3.5,5.5,7.5,'limpide','agrumes','americaine',5.5,0,5,'clean',1,'none','IPA','Intensité houblonnée d’IPA sur un socle malté ambré et caramélisé.'],
    ['rye-ipa','Rye IPA','haute',1.1,7.5,2.5,5,8,'limpide','agrumes','americaine',5,0,5,'clean',.5,'none','IPA','IPA intégrant du seigle, avec grain épicé et texture plus ferme.'],
    ['white-ipa','White IPA','haute',.4,6,2.7,5,7,'trouble','agrumes','americaine',6.5,0,3.5,'phenolic',0,'none','IPA','Croisement du houblonnage IPA et du blé/épices des bières blanches.'],
    ['fruit-beer','Bière aux fruits (famille)','haute',1,2,5,4,7,'trouble','noble','americaine',5,3,4,'esters',0,'fruit','Spécialité','Catégorie transversale : la base et les fruits choisis déterminent fortement le style final.'],
    ['smoked-porter','Smoked Porter','haute',3.6,3.8,4.3,5,7,'limpide','terreux','iles-britanniques',3.5,0,6,'clean',6,'smoke','Spécialité','Porter aux notes de malt torréfié complétées par une fumée réellement perceptible.'],
    ['coffee-stout','Coffee Stout','haute',4,3.3,5,5,8,'limpide','terreux','americaine',3,0,7,'clean',8,'coffee','Spécialité','Stout dont le café ajouté est un élément aromatique principal.']
  ];
  var baseExtra = {
    pils:[0,3,'clean',0,'none','Lager','Pils traditionnelle blonde : le degré de sécheresse et l’amertume distinguent les variantes tchèque et allemande.'],
    'pale-ale':[0,4,'esters',0,'none','Ale pâle','Ale équilibrée : moins de houblon qu’une IPA et plus d’expression du malt.'],
    ipa:[0,4,'clean',0,'none','IPA','Famille vaste : comparer West Coast, Hazy, Session et Double pour affiner.'],
    stout:[0,6,'clean',7,'none','Stout','Famille allant du stout sec au stout lacté ou impérial.'],
    porter:[0,6,'esters',5,'none','Porter','Plus chocolaté et doux en torréfaction que les stouts très secs ou très puissants.'],
    weizen:[0,5,'phenolic',0,'none','Blé','Le girofle et la banane proviennent de la levure, pas nécessairement d’ingrédients ajoutés.'],
    witbier:[0,3,'phenolic',0,'none','Blé','Coriandre et agrumes plus habituels que le profil banane/girofle d’une Weizen.'],
    saison:[0,3,'phenolic',0,'none','Ale belge','Sèche, poivrée, vive; plus rustique qu’une blonde belge classique.'],
    lambic:[8,2,'wild',0,'none','Fermentation spontanée','Souvent peu pétillant sans assemblage; ne pas confondre avec une Gueuze.'],
    bock:[0,7,'clean',1,'none','Lager forte','Lager forte dominée par le malt et nettement moins houblonnée qu’une IPA.'],
    'blonde-ale':[0,3,'clean',0,'none','Ale blonde','Ale facile à boire, moins sèche qu’une Kölsch et moins houblonnée qu’une Pale Ale.'],
    'amber-ale':[0,5,'esters',1,'none','Ale ambrée','Ale cuivrée ronde, plus caramélisée qu’une Pale Ale.'],
    'brown-ale':[0,5,'esters',2,'none','Ale brune','Notes de noix et biscuit sans torréfaction brûlée de stout.'],
    'black-ipa':[0,5,'clean',3,'none','IPA','Couleur sombre mais finalité houblonnée, sans grosse torréfaction.'],
    tripel:[0,5,'phenolic',0,'none','Abbaye','Blonde forte et épicée, plus ronde qu’une Belgian Golden Strong Ale.'],
    barleywine:[0,10,'esters',1,'none','Ale forte','Très fort et dense; certaines versions américaines sont plus houblonnées.'],
    gose:[7,3,'clean',0,'salt','Acide','Légèrement salée et acidulée; la Berliner Weisse n’a normalement pas cette touche saline.']
  };
  function addStyle(t) {
    var id=t[0], name=t[1], fermentation=t[2], darkness=t[3], hop=t[4], sweetness=t[5];
    var min=t[6],max=t[7],filtration=t[8],hopProfile=t[9],origin=t[10],carb=t[11];
    var acidity=t[12],body=t[13],yeast=t[14],roast=t[15],special=t[16],family=t[17],detail=t[18];
    return {id:id,name:name,fermentation:fermentation,darkness:darkness,hop:hop,sweetness:sweetness,
      abv:[min,max],filtration:filtration,hopProfiles:[hopProfile],origin:[origin],carbonation:carb,
      flavors:special==='fruit'?['fruits']:special==='coffee'?['cafe']:special==='lactose'?['chocolat']:[],
      acidity:acidity,body:body,yeast:yeast,roast:roast,special:special,family:family,distinction:detail,
      description:detail + ' Les plages d’alcool et profils sensoriels sont indicatifs, selon la recette et la brasserie.',
      examples:[],source:ref.bjcp};
  }
  raw.forEach(function (t) {BEER_STYLES.push(addStyle(t));});
  BEER_STYLES.forEach(function(s) {
    var extra=baseExtra[s.id];
    if (extra) {
      s.acidity=extra[0];s.body=extra[1];s.yeast=extra[2];s.roast=extra[3];
      s.special=extra[4];s.family=extra[5];s.distinction=extra[6];
    }
    if(s.acidity==null)s.acidity=0;
    if(s.body==null)s.body=4;
    if(!s.yeast)s.yeast=s.fermentation==='basse'?'clean':'esters';
    if(s.roast==null)s.roast=s.darkness>=3?6:0;
    if(!s.special)s.special='none';
    if(!s.family)s.family='Autres';
    if(!s.distinction)s.distinction=s.description;
    if(!s.source)s.source=ref.bjcp;
  });
  var seen = {};
  BEER_STYLES.forEach(function(s) {if(seen[s.id]) throw Error('Duplicate beer style ID: '+s.id);seen[s.id]=true;});
  // Sensoriel > marketing. Indice relatif de ressemblance, pas une probabilité.
  function distance(state, s) {
    var m=getMaltById(state.malt);
    var dark=m?m.darkness:.2;
    var n=function(v,def){return typeof v==='number'&&isFinite(v)?v:def;};
    var d=0;
    var fermentation=state.fermentation;
    if(fermentation && s.fermentation!==fermentation)
      d+=s.fermentation==='spontanee'||fermentation==='spontanee'?3:1.7;
    d+=Math.abs(dark-s.darkness)/4*1.65;
    d+=Math.abs(n(state.hopAmount,4)-s.hop)/10*1.35;
    d+=Math.abs(n(state.sweetness,3)-s.sweetness)/10*1.15;
    var abv=n(state.abv,5);var abvGap=abv<s.abv[0]?s.abv[0]-abv:abv>s.abv[1]?abv-s.abv[1]:0;
    d+=Math.min(1,abvGap/7)*1.75;
    if(state.filtration&&s.filtration!==state.filtration)d+=.5;
    if(state.hopProfile&&s.hopProfiles&&s.hopProfiles.indexOf(state.hopProfile)===-1)d+=.42;
    if(state.origin&&state.origin!=='peu-importe'&&s.origin.indexOf(state.origin)===-1)d+=.55;
    d+=Math.abs(n(state.carbonation,5)-s.carbonation)/10*.65;
    d+=Math.abs(n(state.acidity,0)-s.acidity)/10*3.1;
    d+=Math.abs(n(state.body,4)-s.body)/10*.95;
    d+=Math.abs(n(state.roast,Math.max(0,dark*1.6))-s.roast)/10*1.25;
    if(state.yeast&&state.yeast!== 'any' && state.yeast!==s.yeast) d+=1.1;
    var special=state.special||'none';
    if(special==='none'&&s.special!=='none')d+=1.6;
    else if(special!=='none'&&s.special!==special)d+=3.5;
    var tags=state.flavors||[];
    if(tags.length){
      tags.forEach(function(f){
        if((s.flavors||[]).indexOf(f)>=0) d-=.25;
        else if(s.flavors&&s.flavors.length)d+=.16;
      });
    }
    return Math.max(0,Math.round(d*1000)/1000);
  }
  function index(score) {return Math.max(0,Math.min(99,Math.round(99-score*8)));}
  function resultFor(state) {
    var sorted=BEER_STYLES.map(function(s){return {style:s,score:distance(state,s)};});
    sorted.sort(function(a,b){return a.score-b.score || a.style.name.localeCompare(b.style.name,'fr');});
    var best=sorted[0], alt=sorted[1], third=sorted[2];
    var close=!!alt&&(alt.score-best.score<.55);
    var reasons=[];
    reasons.push('Profil sensoriel : acidité '+(state.acidity||0)+'/10, corps '+(state.body==null?4:state.body)+'/10, torréfaction '+(state.roast||0)+'/10.');
    if(state.yeast && state.yeast!=='any')reasons.push('Signature de levure : '+({'clean':'discrète et nette','esters':'fruitée','phenolic':'épicée / phénolique','wild':'sauvage / funky'}[state.yeast]||state.yeast)+'.');
    if(state.special&&state.special!=='none')reasons.push('Caractère particulier demandé : '+({'smoke':'fumé','salt':'salin','wood':'boisé / élevé en fût','fruit':'fruits ajoutés','lactose':'lacté / doux','coffee':'café ajouté'}[state.special]||state.special)+'.');
    if(best.style.distinction)reasons.push('Ce qui caractérise ce style : '+best.style.distinction);
    if(close&&alt)reasons.push('Résultat serré avec '+alt.style.name+' : comparez leurs particularités ci-dessous.');
    else if(alt)reasons.push('Style voisin à découvrir : '+alt.style.name+'.');
    var note='Fourchette habituelle indicative : '+best.style.abv[0]+' à '+best.style.abv[1]+' % vol. Le résultat classe des profils proches, il ne garantit pas l’identité d’une bière commerciale.';
    reasons.push(note);
    return {style:best.style,score:best.score,percent:index(best.score),runnerUp:alt?alt.style:null,
      runnerUpPercent:alt?index(alt.score):null,isCloseCall:close,reasons:reasons,
      alternatives:[alt,third].filter(Boolean).map(function(a){return {style:a.style,percent:index(a.score),score:a.score};}),
      catalogSize:BEER_STYLES.length,algorithm:'sensory-v2'};
  }
  global.BEER_KNOWLEDGE={styles:BEER_STYLES,match:resultFor,score:distance,refs:ref};
  global.computeBestMatch=resultFor;
  if(typeof module!=='undefined'&&module.exports)module.exports=global.BEER_KNOWLEDGE;
})(typeof window!=='undefined'?window:globalThis);
