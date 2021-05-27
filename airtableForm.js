const puppeteer = require("puppeteer");
(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });

    const logs = [
      {
        name: "Basil",
        domain: "Lisab",
        description: "Test",
        stack: "Hubspot",
        date: "2021-05-23",
      },
      {
        name: "Blessy",
        domain: "Lisab",
        description: "Test",
        stack: "Poptin",
        date: "2021-05-23",
      },
    ];

    let page = await browser.newPage();
    page.setViewport({ width: 1280, height: 563 });

    await page.goto("https://airtable.com/shrnaxBBbS4vJU1yh", {
      waitUntil: "load",
      timeout: 0,
    });

    let baseURL =
      "https://airtable.com/shrnaxBBbS4vJU1yh?prefill_Company%20Name=";

    for (let index = 0; index < logs.length; index++) {
      let log = logs[index];
      await page.goto(
        baseURL +
          log.name +
          "&prefill_Company%20Domain=" +
          log.domain +
          "&prefill_Company%20Description=" +
          log.description +
          "&prefill_Tech%20Stack=" +
          log.stack +
          "&prefill_Date=" +
          log.date,

        {
          waitUntil: "load",
          timeout: 0,
        }
      );
      await page.waitForSelector(
        ".form > .formContent > .formFieldAndSubmitContainer > .formSubmit > .submitButton"
      );
      await page.click(
        ".form > .formContent > .formFieldAndSubmitContainer > .formSubmit > .submitButton"
      );
    }
    await page.close();
    await browser.close();
  } catch (err) {
    console.log(err);
  }
})();
