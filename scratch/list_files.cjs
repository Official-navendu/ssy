const fs = require('fs');
const path = require('path');

function listAllFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.lovable') {
        listAllFiles(fullPath);
      }
    } else {
      console.log(fullPath);
    }
  }
}

console.log("Listing all files in workspace...");
listAllFiles('c:/Users/DELLL/Downloads/ssy');
