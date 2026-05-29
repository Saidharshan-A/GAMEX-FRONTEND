const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, 'src', 'data', 'products.js');
let fileContent = fs.readFileSync(productsFilePath, 'utf8');

// Extract the array from the file
let jsonStr = fileContent.replace('export const allProducts = ', '').replace(';', '').trim();
let products = JSON.parse(jsonStr);

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
  "Mice": "/images/mouse_logitech.png",
  "Chairs & Desks": "/images/cat_chair.png",
  "Accessories": "/images/cat_accessory.png",
  "Processors": "/images/cpu_generic.png" // fallback
};

let count = 0;
products = products.map(p => {
  if (p.image && p.image.includes('loremflickr')) {
    if (categoryMap[p.category]) {
      p.image = categoryMap[p.category];
      count++;
    }
  }
  return p;
});

const newContent = 'export const allProducts = ' + JSON.stringify(products, null, 2) + ';\n';

fs.writeFileSync(productsFilePath, newContent, 'utf8');
console.log(`Successfully assigned local category images for ${count} products.`);
