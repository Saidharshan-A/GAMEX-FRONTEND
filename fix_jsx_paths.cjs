const fs = require('fs');
const path = require('path');

const fixJSX = (filePath) => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace <img src="/images/..." with <img src={`${import.meta.env.BASE_URL}images/...`}
  let count = 0;
  content = content.replace(/src=(['"])\/images\/([^'"]+)\1/g, (match, quote, p1) => {
    count++;
    return `src={\`\${import.meta.env.BASE_URL}images/${p1}\`}`;
  });
  
  // Also handle image: '/images/...' in JSX objects
  content = content.replace(/image:\s*(['"])\/images\/([^'"]+)\1/g, (match, quote, p1) => {
    count++;
    return `image: \`\${import.meta.env.BASE_URL}images/${p1}\``;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed ${count} image paths in ${path.basename(filePath)}`);
};

fixJSX(path.join(__dirname, 'src', 'pages', 'PCBuilderPage.jsx'));
fixJSX(path.join(__dirname, 'src', 'pages', 'SellerWorkspacePage.jsx'));
