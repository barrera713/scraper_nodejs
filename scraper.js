const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let url = "https://www.amazon.com/s?k=macbook+pro&crid=3LGOAEYFB89ZL&sprefix=mac%2Caps%2C210&ref=nb_sb_noss_1";
  await page.goto(url);
  const titles = await page.evaluate(() => Array.from(document.querySelectorAll('div h2.a-size-mini')).map(i => i.innerText));
  const prices = await page.evaluate(() => Array.from(document.querySelectorAll('div span.a-offscreen')).map(i => i.innerText));
  console.log("[Titles]", titles);
  console.log("[Prices]", prices);

  // Joins the price related to title
  let myMap = new Map()
  for(let i = 0; i < titles.length; i++) {
    myMap.set(titles[i], prices[i]);
  }
  console.log(myMap);

  await browser.close();
})();