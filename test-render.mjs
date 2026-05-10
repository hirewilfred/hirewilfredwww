import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:8081/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

const errors = [];
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
page.on('console', (msg) => {
  errors.push('CONSOLE[' + msg.type() + ']: ' + msg.text());
});
page.on('requestfailed', (r) => errors.push('REQFAIL: ' + r.url() + ' ' + r.failure()?.errorText));

await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(5000);

const result = await page.evaluate(() => {
  const fixed = Array.from(document.querySelectorAll('.fixed.z-50'));
  const svgText = document.body.innerText.match(/FREE CONSULT|GET IN TOUCH|LET'S TALK/i);
  const hasButton = !!document.querySelector('.floating-consult-btn');
  return {
    title: document.title,
    fixedCount: fixed.length,
    hasFloatingBtn: hasButton,
    bodyHasSvg: !!document.querySelector('.floating-consult-btn svg'),
    revolvingTextFound: !!svgText,
    bodyLen: document.body.innerHTML.length,
    mainExists: !!document.querySelector('main'),
    rootChildren: document.getElementById('root')?.children?.length,
    rootFirstChild: document.getElementById('root')?.firstElementChild?.tagName,
    bodyHTML: document.body.innerHTML.slice(-500),
  };
});

await page.screenshot({ path: 'test-render.png', fullPage: false });
console.log(JSON.stringify({ url, result, errors }, null, 2));
await browser.close();
