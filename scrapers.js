const fs = require('fs');

const dataBaseUrl = 'mol-results.json';

// read the database
const dataBaseContents = fs.readFileSync(dataBaseUrl, 'utf8', (err, data) => {
  if (err) throw err;
  console.log('dataBaseContents returned', data);
  return data;
});

// write to the database
function writeToDatabase(url, data) {
  try {
    fs.writeFile(url, data, 'utf8', function (err) {
      if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
      }
      console.log("JSON file has been updated.");
    });
  } catch (error) {
    console.log(error);
  }    
}

// DOCS: https://github.com/puppeteer/puppeteer/blob/master/docs/api.md
const puppeteer = require('puppeteer');
const molUrl = 'https://paikat.te-palvelut.fi/tpt/?searchPhrase=web%20developer&locations=Oulu&announced=0&leasing=0&english=false&sort=1'

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
scrapeMol(molUrl);

// run a check to see if data is different
async function check() {
  const urls = await scrapeMol(url);
  const stringifyUrls = JSON.stringify(urls);
  if (dataBaseContents !== stringifyUrls) {
    writeToDatabase(dataBaseUrl, stringifyUrls)
    console.log("Database has been updated.\n", stringifyUrls);
  } else {
    console.log("There have been no updates since last time.\n", dataBaseContents);
  }
}

//check();