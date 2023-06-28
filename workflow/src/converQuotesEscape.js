

const fs = require('fs');

const data = `<?xml version="1.0"?>
<root town="create">
    <strip>2192</strip>
    <bite>
        <terrible>crack</terrible>
    </bite>
    <milk>
        <spoken>3108</spoken>
    </milk>
    <hall>
        <instance>beneath entirely lose primitive swing physical tell vegetable</instance>
    </hall>
    <sing>
        <piece soft="individual">cry cook look somehow hold might through slightly</piece>
    </sing>
</root>
`;

const escapedXmlString = data.replace(/"/g, '\\"');
console.log("escaped string====>",escapedXmlString)
const jsonObject = {
  "xmlData": escapedXmlString
};

console.log("jsonObject=====>",jsonObject)
const jsonString = JSON.stringify(jsonObject, function(key, value) {
    if (key === "xmlData") {
        console.log("value replace=====>",value.replace(/\\"/g, '"'))
      const newValue= value.replace(/\\"/g, '"').replace(/[\n\r]+/g, '').trim();
      console.log("newValue======>",newValue)
      return newValue
    } 
    console.log("after value===>",value)
    return value;
  });
  
fs.writeFile('bpmn.json', jsonString, function (err) {
  if (err) throw err;
  console.log('Data saved to file.');
});




/* const jsonString = JSON.stringify(jsonObject, function(key, value) {
  if (key === "xmlData") {
    return value.replace(/\\"/g, '"').replace(/\\n/g, '');
  }
  return value;
}); */



//******************************************************************* */

/* const xmlString = '<?xml version="1.0"?><note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don\'t forget me this weekend!</body></note>';
const escapedXmlString = xmlString.replace(/'/g, "\\'").replace(/"/g, '\\"');
console.log(escapedXmlString);
 */

/* const data =`<?xml version="1.0" encoding="UTF-8"?>
- <note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>`

const escapedXmlString = data.replace(/'/g, "\\'").replace(/"/g, '\\"');
console.log(escapedXmlString); */
// Split the data into lines
/* const lines = data.split('\n');

// Escape double quotes in all lines except the first one
const escapedLines = lines.map((line, index) => {
  if (index === 0) {
    return line;
  } else {
    return line.replace(/"/g, '\\"');
  }
});

// Join the escaped lines and write them back to the file
const escapedData = escapedLines.join('\n');
//  fs.writeFile(filePath, escapedData, function(err) {
//   if (err) throw err;
//   console.log('The file has been updated!');
// }); 

console.log(escapedData) */



/* const fs = require('fs');

const data =`<?xml version="1.0" encoding="UTF-8"?>
- <note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>
`

const escapedXmlString = data.replace(/"/g, "\\'").replace(/"/g, '\\"');

fs.writeFile('output.xml', escapedXmlString, function (err) {
  if (err) throw err;
  console.log('Data saved to file.');
}); */

/// insted /

/* const fs = require('fs');

const data =`<?xml version="1.0" encoding="UTF-8"?>
- <note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>
`

const escapedXmlString = data.replace(/"/g, '\\"')
const jsonObject = {
  "xmlData": escapedXmlString
};

const jsonString = JSON.stringify(jsonObject);

fs.writeFile('output.json', jsonString, function (err) {
  if (err) throw err;
  console.log('Data saved to file.');
}); */
