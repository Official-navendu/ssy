const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function search() {
  const filePath = 'C:\\Users\\DELLL\\.gemini\\antigravity\\brain\\f6b65e7a-ff84-4b97-9f53-80581cfeb8c5\\.system_generated\\logs\\transcript.jsonl';
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineCount = 0;
  for await (const line of rl) {
    lineCount++;
    if (line.includes('PRODUCTS PAGE UPDATE') && line.includes('Seven Chakra Bracelet')) {
      console.log(`--- Match at line ${lineCount} ---`);
      try {
        const obj = JSON.parse(line);
        if (obj.content) {
          const outputPath = path.join(__dirname, 'products_prompt_content.txt');
          fs.writeFileSync(outputPath, obj.content);
          console.log(`Successfully wrote content to ${outputPath}`);
          return; // Stop after first match
        }
      } catch (e) {
        console.log("Error parsing JSON at line " + lineCount, e);
      }
    }
  }
  console.log("No match found.");
}

search();
