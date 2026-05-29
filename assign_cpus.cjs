const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, 'src', 'data', 'products.js');
let content = fs.readFileSync(productsFilePath, 'utf8');

const regex = /\{\s*"name":\s*"([^"]+)",\s*"category":\s*"Processors"[\s\S]*?"image":\s*"(https:\/\/loremflickr\.com[^"]+)"\s*\}/g;

const matches = [...content.matchAll(regex)];
console.log(`Found ${matches.length} processors to update.`);

for (let match of matches) {
  const fullMatch = match[0];
  const name = match[1];
  const oldUrl = match[2];

  let newUrl = '/images/cpu_generic.png';
  if (name.toLowerCase().includes('intel')) {
    newUrl = '/images/cpu_intel.png';
  } else if (name.toLowerCase().includes('amd') || name.toLowerCase().includes('ryzen')) {
    newUrl = '/images/cpu_amd.png';
  }

  content = content.replace(oldUrl, newUrl);
}

fs.writeFileSync(productsFilePath, content, 'utf8');
console.log('Successfully assigned new local CPU images to products.js');
