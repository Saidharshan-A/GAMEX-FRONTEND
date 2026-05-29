const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'pcComponents.js');
let fileContent = fs.readFileSync(filePath, 'utf8');

const regex = /(https:\/\/images\.unsplash\.com[^'"]+)/g;

let count = 0;
fileContent = fileContent.replace(regex, (match) => {
  count++;
  if (match.includes('1591488320449') || match.includes('1593640408182')) return '/images/cat_cooling.png';
  if (match.includes('1518770660439') || match.includes('1525547719571')) return '/images/cat_motherboard.png';
  if (match.includes('1563729784474')) return '/images/cat_memory.png';
  if (match.includes('1591488320449')) return '/images/cat_storage.png';
  if (match.includes('1587202372634') || match.includes('1587202372634')) return '/images/cat_psu.png';
  if (match.includes('1587202372765')) return '/images/cat_case.png';
  if (match.includes('1555618012353') || match.includes('1587202372765')) return '/images/gpu_fallback_0.jpg';
  
  // Just a generic catch-all
  return '/images/pc_builder_1779654793386.png';
});

// For any I missed:
fileContent = fileContent.replace(/image:\s*['"]https:\/\/images\.unsplash\.com[^'"]+['"]/g, "image: '/images/pc_builder_1779654793386.png'");

// Let's do a more structured replace based on category keys in the JS object text.
// Instead of that, I can just use a simple regex approach based on the preceding string if needed, 
// but the above regex already clears all unsplash links.

fs.writeFileSync(filePath, fileContent, 'utf8');
console.log(`Replaced ${count} unsplash links in pcComponents.js`);
