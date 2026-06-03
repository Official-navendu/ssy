const fs = require('fs');
const path = require('path');

function listBrain() {
  const dir = 'C:\\Users\\DELLL\\.gemini\\antigravity\\brain';
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      console.log(file);
    }
  } catch (e) {
    console.error("Error reading brain folder:", e);
  }
}

listBrain();
