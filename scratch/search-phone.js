import fs from 'fs';
import path from 'path';

const rootDir = 'c:/Users/DELLL/Downloads/ssy';

function searchPhone(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== '.lovable') {
        searchPhone(fullPath);
      }
    } else {
      if (path.extname(file) === '.jsx' || path.extname(file) === '.js' || path.extname(file) === '.html' || path.extname(file) === '.json' || path.extname(file) === '.ts') {
        const content = fs.readFileSync(fullPath, 'utf8');
        // Search for old numbers or standard placeholders like 98765 or +91
        if (content.includes('98765') || content.includes('43210') || content.includes('wa.me/')) {
          console.log(`Found match in: ${fullPath}`);
          const lines = content.split('\n');
          lines.forEach((line, idx) => {
            if (line.includes('98765') || line.includes('43210') || line.includes('wa.me/')) {
              console.log(`  Line ${idx + 1}: ${line.trim()}`);
            }
          });
        }
      }
    }
  }
}

console.log('Starting search for phone numbers...');
searchPhone(rootDir);
console.log('Search finished.');
