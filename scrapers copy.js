// DOCS: https://github.com/puppeteer/puppeteer/blob/master/docs/api.md
const puppeteer = require('puppeteer');
const MolUrl = 'https://paikat.te-palvelut.fi/tpt/?searchPhrase=web%20developer&locations=Oulu&announced=0&leasing=0&english=false&sort=1'

// scrape mol.fi 
async function scrapeMol(url) {
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();
    await page.goto(url); // removed await page.goto(url, {waitUntil: 'networkidle0'})
    await page.waitForSelector('.resultsList a'); 

    const urls = await page.evaluate(() => {
      let results = [];
      let items = document.querySelectorAll('.resultsList a');
      items.forEach((item) => {
        const itemShortUrlArray = /^.+[\?]/.exec(item.getAttribute('href'));
        const  itemShortUrl = itemShortUrlArray[0].slice(0, -1);

        results.push({
          url:  itemShortUrl,
          text: item.innerText,
        });
      });
      return results;
    });
    console.log({urls});
    return {urls};
  } catch (err) {
    console.error(err.message);
  } finally {
    await browser.close();
  }
}
scrapeMol(MolUrl);