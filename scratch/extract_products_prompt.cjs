const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function search() {
  const filePath = 'C:\\Users\\DELLL\\.gemini\\antigravity\\brain\\f6b65e7a-ff84-4b97-9f53-80581cfeb8c5\\.system_generated\\logs\\transcript.jsonl';
  if (!fs.existsSync(filePath)) {
    console.error("Transcript file does not exist at path: " + filePath);
    return;
  }
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineCount = 0;
  for await (const line of rl) {
    lineCount++;
    if (lineCount === 4327) {
      try {
        const obj = JSON.parse(line);
        fs.writeFileSync(path.join(__dirname, 'user_input_4327.txt'), obj.content || '');
        console.log("Wrote line 4327 content.");
      } catch (e) {
        console.error("Error writing line 4327", e);
      }
    }
    
    // Also let's check for any USER_INPUT containing "Seven Chakra Bracelet" or "PRODUCTS PAGE UPDATE"
    if (line.includes('"type":"USER_INPUT"') && line.includes('Seven Chakra Bracelet')) {
      try {
        const obj = JSON.parse(line);
        console.log(`Found USER_INPUT line ${lineCount} with Seven Chakra Bracelet, length ${obj.content.length}`);
        fs.writeFileSync(path.join(__dirname, `user_input_${lineCount}.txt`), obj.content || '');
      } catch (e) {
        // Ignore
      }
    }
  }
}

search();
