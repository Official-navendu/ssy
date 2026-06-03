const fs = require('fs');
const path = require('path');
const readline = require('readline');

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
    if (line.includes('Twin Flame') || line.includes('Ho’oponopono') || line.includes('NLP Transformation') || line.includes('11 Lisa Street')) {
      console.log(`--- Match at line ${lineCount} ---`);
      // Parse JSON and print a summary or content
      try {
        const obj = JSON.parse(line);
        console.log(`Type: ${obj.type}, Source: ${obj.source}`);
        if (obj.content) {
          console.log(`Content length: ${obj.content.length}`);
          fs.writeFileSync(`scratch/extracted_match_${lineCount}.txt`, obj.content);
          console.log(`Saved match to scratch/extracted_match_${lineCount}.txt`);
        }
      } catch (e) {
        console.log("Error parsing line", e);
      }
    }
  }
}

search();
