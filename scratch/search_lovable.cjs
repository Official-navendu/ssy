const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchDir(fullPath);
    } else {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.toLowerCase().includes('lisa') || content.toLowerCase().includes('brampton') || content.toLowerCase().includes('ho’oponopono')) {
        console.log(`FOUND IN LOVABLE: ${fullPath}`);
        console.log(content.substring(0, 1000));
      }
    }
  }
}

try {
  searchDir('c:/Users/DELLL/Downloads/ssy/.lovable');
} catch (e) {
  console.log("Error searching .lovable:", e);
}
