// HELP: https://bitsofco.de/how-to-use-puppeteer-in-a-netlify-aws-lambda-function/
// Used as Netlify Lambda Function

process.env.AWS_LAMBDA_FUNCTION_NAME = 'whatever'; 

const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

exports.handler = async function (event, context, callback) {
  const molUrl = 'https://paikat.te-palvelut.fi/tpt/?searchPhrase=web%20developer&locations=Oulu&announced=0&leasing=0&english=false&sort=1';
  let browser = null;
  let urls = null;
  
  try {
    // setup
    browser = await chromium.puppeteer.launch({
      executablePath: await chromium.executablePath,
      args: chromium.args,
      headless: chromium.headless,
      //ignoreDefaultArgs: ['--disable-extensions'],
      defaultViewport: chromium.defaultViewport,
    });
  
    // Do stuff with headless chrome
    const page = await browser.newPage();
    await page.goto(molUrl); 
    await page.waitForSelector('.resultsList a'); 

    urls = await page.evaluate(() => {
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
      
    urls = '23:40';
    console.log('urls', {urls});
  } catch (err) {
    console.error('Catch error:', err.message);
  } finally {
    if (browser !== null) {
      await browser.close()
    }
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify({ 
      urls: urls
    })
  };
}