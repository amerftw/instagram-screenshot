const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 8'];

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    'ignoreHTTPSErrors': true
  });
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto('https://www.google.com', {
    waitUntil: 'networkidle2'
  });

  await page.screenshot({
    path: 'buddy-screenshot.png'
  });

  await page.goto('https://www.instagram.com', {
    waitUntil: 'networkidle2'
  });
  await page.click('#react-root > section > main > article > div > div > div > div:nth-child(2) > button');

  await page.type('[name="username"]', 'yourUsername')
  await page.type('[name="password"]', 'yourPassword')

  await page.click('[type="submit"]');

  await page.waitForTimeout(5000)

  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click('[data-testid="new-post-button"]') // some button that triggers file selection
  ]);

  await fileChooser.accept(['buddy-screenshot.png']);
  await page.waitForTimeout(1000)
  await page.click('#react-root > section > div.Scmby > header > div > div.mXkkY.KDuQp > button');
  await page.waitForTimeout(1000)
  await page.click('#react-root > section > div.Scmby > header > div > div.mXkkY.KDuQp > button');

  await browser.close();
})();