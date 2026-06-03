const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\DELLL\\.gemini\\antigravity\\brain';

function searchFile(filePath) {
  try {
    const stats = fs.statSync(filePath);
    if (stats.isFile() && stats.size > 0 && stats.size < 5000000) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('11 Lisa Street') || content.includes('NLP Transformation') || content.includes('Ho’oponopono')) {
        // ignore our current conversation folder to find the original source
        if (!filePath.includes('f6b65e7a-ff84-4b97-9f53-80581cfeb8c5')) {
          console.log(`FOUND MATCH IN BRAIN FILE: ${filePath}`);
          console.log(`Snippet: ${content.substring(0, 1000)}`);
          fs.writeFileSync(`scratch/found_brain_${path.basename(filePath)}`, content);
        }
      }
    }
  } catch (e) {
    // ignore
  }
}

function searchRecursive(dir) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        searchRecursive(fullPath);
      } else {
        searchFile(fullPath);
      }
    }
  } catch (e) {
    // ignore
  }
}

console.log("Searching recursively in all brain folders...");
searchRecursive(brainDir);
console.log("Brain folder search complete.");
