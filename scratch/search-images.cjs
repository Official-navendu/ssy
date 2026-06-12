const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\DELLL\\.gemini\\antigravity\\brain\\f6b65e7a-ff84-4b97-9f53-80581cfeb8c5';

function main() {
  const files = fs.readdirSync(brainDir);
  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(brainDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('![')) {
        console.log(`Found image embed in ${file}:`);
        const lines = content.split('\n');
        for (const line of lines) {
          if (line.includes('![')) {
            console.log(`  ${line}`);
          }
        }
      }
    }
  }
}

main();
