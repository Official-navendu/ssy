const fs = require('fs');
const path = require('path');

const scratchDir = 'c:/Users/DELLL/Downloads/ssy/scratch';
const files = fs.readdirSync(scratchDir);

for (const file of files) {
  const fullPath = path.join(scratchDir, file);
  if (fs.statSync(fullPath).isFile() && file.endsWith('.txt')) {
    const content = fs.readFileSync(fullPath, 'utf8');
    console.log(`${file} (${content.length} chars): ${content.substring(0, 100).replace(/\n/g, ' ')}`);
  }
}
