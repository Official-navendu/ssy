const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\DELLL\\.gemini\\antigravity\\brain\\f6b65e7a-ff84-4b97-9f53-80581cfeb8c5';
const destDir = 'c:\\Users\\DELLL\\Downloads\\ssy\\src\\assets\\images';

const imageMap = {
  'hero_astrology_1780144200601.png': 'hero_astrology.png',
  'hero_tarot_1780144226141.png': 'hero_tarot.png',
  'hero_healing_1780144248385.png': 'hero_healing.png',
  'hero_portal_1780144267727.png': 'hero_portal.png'
};

function copyImages() {
  try {
    for (const [srcName, destName] of Object.entries(imageMap)) {
      const srcPath = path.join(srcDir, srcName);
      const destPath = path.join(destDir, destName);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Successfully copied ${srcName} -> ${destName}`);
      } else {
        console.error(`Source file not found: ${srcPath}`);
      }
    }
  } catch (e) {
    console.error("Error copying images:", e);
  }
}

copyImages();
