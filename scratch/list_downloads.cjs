const fs = require('fs');
const path = require('path');

function listDownloads() {
  const dir = 'c:/Users/DELLL/Downloads';
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isFile()) {
        console.log(`${file} (${stat.size} bytes)`);
      } else {
        console.log(`[DIR] ${file}`);
      }
    }
  } catch (e) {
    console.error("Error reading downloads folder:", e);
  }
}

listDownloads();
