const fs = require('fs');
const path = require('path');

const downloadsDir = 'c:/Users/DELLL/Downloads';

function searchByFilename() {
  try {
    const files = fs.readdirSync(downloadsDir);
    const keywords = ['shivani', 'spiritual', 'yatri', 'ssy', 'course', 'content', 'client', 'data', 'text', 'brief', 'info', 'copy', 'about', 'service', 'lisa', 'address', 'doc', 'txt', 'pdf', 'brampton'];
    for (const file of files) {
      const lowerFile = file.toLowerCase();
      const matches = keywords.filter(k => lowerFile.includes(k));
      if (matches.length > 0) {
        const stats = fs.statSync(path.join(downloadsDir, file));
        if (stats.isFile()) {
          console.log(`Matching file: ${file} (${stats.size} bytes)`);
        }
      }
    }
  } catch (e) {
    console.error("Error reading downloads dir:", e);
  }
}

searchByFilename();
