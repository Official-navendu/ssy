const fs = require('fs');
const path = require('path');

const downloadsDir = 'c:/Users/DELLL/Downloads';

function searchInFile(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.txt' || ext === '.md' || ext === '.json' || ext === '.csv' || ext === '.html' || ext === '.js' || ext === '.docx') {
      const stats = fs.statSync(filePath);
      if (stats.size > 0 && stats.size < 5000000) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.toLowerCase().includes('11 lisa') || content.toLowerCase().includes('l6t4e8') || content.toLowerCase().includes('ho’oponopono')) {
          console.log(`FOUND RECURSIVE MATCH IN DOWNLOADS FILE: ${filePath}`);
          console.log(`Snippet: ${content.substring(0, 1000)}`);
          fs.writeFileSync(`scratch/found_recursive_${path.basename(filePath)}`, content);
        }
      }
    }
  } catch (e) {
    // ignore
  }
}

function searchDir(dir) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== '.lovable') {
          searchDir(fullPath);
        }
      } else {
        searchInFile(fullPath);
      }
    }
  } catch (e) {
    // ignore
  }
}

console.log("Searching recursively in all Downloads folders...");
searchDir(downloadsDir);
console.log("Downloads recursive search complete.");
