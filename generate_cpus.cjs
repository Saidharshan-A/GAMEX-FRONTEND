const fs = require('fs');
const https = require('https');
const path = require('path');

const productsFilePath = path.join(__dirname, 'src', 'data', 'products.js');
let content = fs.readFileSync(productsFilePath, 'utf8');

const regex = /\{\s*"name":\s*"([^"]+)",\s*"category":\s*"Processors"[\s\S]*?"image":\s*"(https:\/\/loremflickr\.com[^"]+)"\s*\}/g;

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: 10000 }, (res) => {
      if (res.statusCode === 200 || res.statusCode === 302) {
        if (res.statusCode === 302) {
          return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
        }
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Failed with status: ${res.statusCode}`));
      }
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
    
    req.on('error', reject);
  });
};

async function processCPUs() {
  const matches = [...content.matchAll(regex)];
  console.log(`Found ${matches.length} processors to update.`);

  // Create an array of tasks
  const tasks = matches.map(async (match, i) => {
    const fullMatch = match[0];
    const name = match[1];
    const oldUrl = match[2];

    const cleanName = name.replace(/\d+$/, '').trim(); 
    const prompt = `Premium high quality photo of computer processor CPU ${cleanName}, dark studio lighting, isolated product shot, 8k, photorealistic`;
    const encodedPrompt = encodeURIComponent(prompt);
    
    // Some random query param to bypass cache
    const aiUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=400&height=400&nologo=true&seed=${Math.floor(Math.random()*1000)}`;
    
    const fileName = `cpu_${i}.jpg`;
    const localPath = path.join(__dirname, 'public', 'images', fileName);
    const newUrl = `/images/${fileName}`;

    console.log(`[${i}] Downloading image for ${name}...`);
    
    let retries = 3;
    let success = false;
    while(retries > 0 && !success) {
      try {
        await downloadImage(aiUrl, localPath);
        console.log(`[${i}] Saved ${fileName}`);
        content = content.replace(oldUrl, newUrl);
        success = true;
      } catch (err) {
        console.error(`[${i}] Attempt failed:`, err.message);
        retries--;
        if(retries === 0) console.error(`[${i}] Final failure for ${name}`);
      }
    }
  });

  await Promise.all(tasks);

  fs.writeFileSync(productsFilePath, content, 'utf8');
  console.log('Finished updating products.js with local CPU images.');
}

processCPUs();
