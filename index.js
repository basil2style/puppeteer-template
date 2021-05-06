const puppeteer = require('puppeteer');
const urls =
  ["https://send.cm/o7805hml78a3"];
let downloadJSON = [];
let respURL, title = "";
(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false, executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });

    for (let i = 0; i < 3; i++) {
      let url = urls[i];
      const page = await browser.newPage();
      page.setViewport({
        width: 1366,
        height: 768,
      });
      page.on("response", async (response) => {
        if (response._request._resourceType == "media") {
          respURL = await response._url;
        }
      });
      await page.goto(url, {
        waitUntil: "load",
        timeout: 0,
      });

      let getRecordName = await page.$eval('body > .navbar > #navbarMenu > .nav > .nav-item', el => el.textContent);
      downloadJSON.push({url: respURL, title: getRecordName});
      await page.close();
    }
    console.log(downloadJSON);
    await browser.close();
  } catch (err) {
    console.log(err);
  }
})();