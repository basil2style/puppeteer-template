const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const navigationPromise = page.waitForNavigation()
  
  await page.goto('https://airtable.com/shrnaxBBbS4vJU1yh')

  await navigationPromise
  
  await page.type('#username', 'foo@example.com');
  await page.type('#password', 'password');
  await page.keyboard.press('Enter');

  await page.waitForNavigation();
  console.log('New Page URL:', page.url());
  await browser.close();
})();