const fs = require('fs');

// json data
let newJsonData = { 
  persons: [ {name:"Bill",city:"New York"}, {name:"Phil",city:"Ohio"} ]
};
const dataBaseFile = 'mol-results.json';

const readDataBaseFile = fs.readFileSync(dataBaseFile, 'utf8', (err, data) => {
  if (err) throw err;
  console.log('readDataBaseFile returned', data);
  return data;
});
newJsonDataStr = JSON.stringify(newJsonData);
console.log ('true/false', newJsonDataStr === readDataBaseFile);

try {
  if (typeof newJsonData !== 'object') throw "Scraped data did not return an object";

  fs.writeFile(dataBaseFile, newJsonDataStr, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log("JSON file has been updated.");
  });
} catch (error) {
  console.log(error);
  console.log(newJsonDataStr);
}
