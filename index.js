const http = require('http');
const molResults = require('./mol-results.json');
const molSearchUrls = require('./mol-search-urls.json');

const result = {"url":"/tpt/10097195","text":"Technical Writer\n\nARM Finland Oy - Oulu - Oulu - kokoaikatyö - 6 - 12 kk"};

if(resultInMolResults(result.url, molResults.urls)){
  console.log('result is in molResults');  
} else {
  console.log('result is NOT in molResults');
}
//const scrapers = require('./scrapers.js');
const url = 'https://paikat.te-palvelut.fi/tpt/?searchPhrase=web%20developer&locations=Oulu&announced=0&leasing=0&english=false&sort=1';

//create a server object:
http.createServer(async function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  try {
    let data = await scrapers.scrapeMol(molSearchUrls[0]);
    data = JSON.stringify(data);
    res.write(`{"urls": ${data}}`);
    res.json(data);
    res.send({ some: 'json' });
    } catch (error) {
      console.log(error);
    }
  //if (req.url === '/secret_key') {  }
  res.end(); 
}).listen(9000); 

function resultInMolResults(needle, haystack) {
  for(let i = 0; i < haystack.length; i++) {
      if(haystack[i].url === needle) return true;
  }
  return false;
}
