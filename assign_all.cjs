const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, 'src', 'data', 'products.js');
let content = fs.readFileSync(productsFilePath, 'utf8');

const regex = /\{\s*"name":\s*"([^"]+)",\s*"category":\s*"([^"]+)"[\s\S]*?"image":\s*"(https:\/\/loremflickr\.com[^"]+)"\s*\}/g;

const matches = [...content.matchAll(regex)];
console.log(`Found ${matches.length} products with loremflickr URLs to update.`);

const categoryMap = {
  "Motherboards": "/images/cat_motherboard.png",
  "Memory": "/images/cat_memory.png",
  "Storage": "/images/cat_storage.png",
  "Cooling": "/images/cat_cooling.png",
  "Power Supplies": "/images/cat_psu.png",
  "Cases": "/images/cat_case.png",
  "Monitors": "/images/cat_monitor.png",
  "Headsets": "/images/cat_headset.png",
  "Keyboards": "/images/keyboard_razer.png",
  "Mice": "/images/mouse_logitech.png"
};

for (let match of matches) {
  const fullMatch = match[0];
  const name = match[1];
  const category = match[2];
  const oldUrl = match[3];

  let newUrl = categoryMap[category];
  
  if (newUrl) {
    content = content.replace(oldUrl, newUrl);
  }
}

fs.writeFileSync(productsFilePath, content, 'utf8');
console.log('Successfully assigned all local category images to products.js');
