const fs = require('fs');
const path = require('path');

function searchWorkspace(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.lovable') {
        searchWorkspace(fullPath);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.jsx' || ext === '.js' || ext === '.json' || ext === '.ts' || ext === '.css' || ext === '.html') {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.toLowerCase().includes('brampton') || content.toLowerCase().includes('lisa')) {
          console.log(`FOUND IN WORKSPACE: ${fullPath}`);
          const lines = content.split('\n');
          lines.forEach((line, idx) => {
            if (line.toLowerCase().includes('brampton') || line.toLowerCase().includes('lisa')) {
              console.log(`  Line ${idx + 1}: ${line.trim()}`);
            }
          });
        }
      }
    }
  }
}

searchWorkspace('c:/Users/DELLL/Downloads/ssy');
console.log("Workspace search complete.");
