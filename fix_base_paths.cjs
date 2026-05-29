const fs = require('fs');
const path = require('path');

const fixFile = (filePath) => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace "/images/..." with import.meta.env.BASE_URL + "images/..."
  // It handles both JSON string values and normal strings in JS
  let count = 0;
  content = content.replace(/(['"])\/images\/([^'"]+)\1/g, (match, quote, p1) => {
    count++;
    return `import.meta.env.BASE_URL + "images/${p1}"`;
  });
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed ${count} image paths in ${path.basename(filePath)}`);
};

fixFile(path.join(__dirname, 'src', 'data', 'products.js'));
fixFile(path.join(__dirname, 'src', 'data', 'pcComponents.js'));
