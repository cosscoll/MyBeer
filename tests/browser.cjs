/* Tests du vrai rendu Chrome : navigation, responsive, captures écran. */
const assert = require('node:assert/strict');
const {spawn} = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require('playwright');

const base = path.join(__dirname, '..');
const url = 'http://127.0.0.1:8765/';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function ready() {
  for(let i=0;i<40;i++) {
    try { if((await fetch(url)).ok) return; } catch {}
    await sleep(250);
  }
  throw new Error('Serveur local indisponible');
}

async function main() {
  fs.mkdirSync(path.join(base,'artifacts'),{recursive:true});
  const server=spawn('python3',['-m','http.server','8765','--bind','127.0.0.1'],{cwd:base,stdio:'ignore'});
  let browser;
  try {
    await ready();
    browser=await chromium.launch({channel:'chrome',headless:true,args:['--no-sandbox']});
    for(const target of [{name:'desktop',width:1440,height:900},{name:'mobile',width:390,height:844}]) {
      const page=await browser.newPage({viewport:{width:target.width,height:target.height},deviceScaleFactor:1});
      const errors=[];
      page.on('pageerror',err=>errors.push(String(err)));
      const resp=await page.goto(url,{waitUntil:'domcontentloaded',timeout:20000});
      assert.equal(resp.status(),200,'HTTP local 200');
      await page.locator('#beer-inside-bubbles i').first().waitFor();
      // Mesurer le layout stabilisé, pas l'image intermédiaire de l'animation d'entrée.
      await page.waitForTimeout(1500);
      assert.equal(await page.locator('#beer-inside-bubbles i').count(),34);
      assert.equal(await page.locator('.step.active').getAttribute('data-step'),'fermentation');
      const checks=await page.evaluate(() => {
        const b=sel=>document.querySelector(sel).getBoundingClientRect();
        return {
          viewport:window.innerWidth,
          documentWidth:document.documentElement.scrollWidth,
          stage:b('.brew-stage').toJSON(),
          beer:b('.glass-body').toJSON(),
          sheet:b('#control-sheet').toJSON(),
          intro:b('.stage-intro').toJSON(),
          foamHeight:getComputedStyle(document.querySelector('.glass-foam')).height,
          liquidColor:getComputedStyle(document.querySelector('#brew-stage')).getPropertyValue('--brew-color')
        };
      });
      console.log('GEOMETRY '+target.name+': '+JSON.stringify(checks));
      assert.ok(checks.beer.width>110 && checks.beer.height>170,'Le verre 3D doit être visible');
      assert.ok(checks.liquidColor.trim(),'Le verre reçoit la couleur de la recette');
      assert.ok(checks.documentWidth <= target.width+2,'Pas de débordement horizontal '+target.name);
      assert.ok(checks.sheet.width>300,'Panneau de contrôle lisible '+target.name);
      if(target.name==='desktop') {
        assert.ok(checks.beer.right < checks.sheet.left+5,'Verre séparé des contrôles');
      } else {
        assert.ok(checks.intro.bottom < checks.sheet.top, 'Le titre reste au-dessus du formulaire');
        assert.ok(checks.beer.top > checks.intro.bottom - 5, 'Le verre doit être sous le titre');
        assert.ok(checks.beer.bottom <= checks.stage.bottom + 10, 'Le verre doit rester entièrement visible sur mobile');
      }
      await page.screenshot({path:path.join(base,'artifacts','mybeer-'+target.name+'.png'),fullPage:true,animations:'disabled'});
      for(let i=0;i<8;i++) await page.locator('.step.active [data-action="next"]').click();
      await page.locator('.step.active [data-action="finish"]').click();
      assert.equal(await page.locator('#result-panel').isVisible(),true,'Résultat visible '+target.name);
      assert.ok((await page.locator('#result-name').innerText()).trim().length>1);
      await page.locator('#restart-btn').click();
      assert.equal(await page.locator('.step.active').getAttribute('data-step'),'fermentation','Redémarrage '+target.name);
      assert.deepEqual(errors,[],'Pas d’erreurs JavaScript '+target.name);
      console.log('PASS CHROME '+target.name+': screenshot, dimensions, neuf étapes et résultat',JSON.stringify(checks));
      await page.close();
    }
  } finally {
    if(browser) await browser.close();
    server.kill('SIGTERM');
  }
}
main().catch(e=>{console.error(e);process.exitCode=1;});
