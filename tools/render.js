// Рендер кадров сцены (SVG в Chromium) → jpg.
// node tools/render.js <scene.js> <outDir> [t1,t2,...]   — без списка рендерит все кадры (30 fps), со списком — превью.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const font = (name, file) => `@font-face{font-family:'${name}';src:url(data:font/ttf;base64,${
  fs.readFileSync(path.join(ROOT, 'fonts', file)).toString('base64')})}`;

(async () => {
  const [scene, outDir, only] = process.argv.slice(2);
  fs.mkdirSync(outDir, { recursive: true });
  const code = ['lib.js', 'person.js'].map(f => fs.readFileSync(path.join(__dirname, f), 'utf8')).join('\n')
    + '\n' + fs.readFileSync(scene, 'utf8');
  const css = font('Oswald', 'Oswald-Bold.ttf') + font('Mono', 'JetBrainsMono-Bold.ttf') + font('Inter', 'Inter-ExtraBold.ttf');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.setContent(`<html><head><style>${css} body{margin:0;background:#000}</style></head>`
    + `<body><div id="s"></div><script>${code}</script></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  const dur = await page.evaluate(() => DUR);
  const times = only ? only.split(',').map(Number) : [...Array(Math.round(dur * 30)).keys()].map(i => i / 30);
  for (let i = 0; i < times.length; i++) {
    await page.evaluate(t => { document.getElementById('s').innerHTML = render(t); }, times[i]);
    await page.screenshot({ path: path.join(outDir, `f${String(i).padStart(4, '0')}.jpg`), type: 'jpeg', quality: 93 });
  }
  await browser.close();
})();
