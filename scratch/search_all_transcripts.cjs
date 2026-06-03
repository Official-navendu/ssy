const fs = require('fs');
const path = require('path');
const readline = require('readline');

const brainDir = 'C:\\Users\\DELLL\\.gemini\\antigravity\\brain';

async function searchInTranscript(convDir) {
  const filePath = path.join(brainDir, convDir, '.system_generated', 'logs', 'transcript.jsonl');
  if (!fs.existsSync(filePath)) return;

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineCount = 0;
  for await (const line of rl) {
    lineCount++;
    if (line.includes('Twin Flame') || line.includes('Ho’oponopono') || line.includes('NLP Transformation') || line.includes('11 Lisa Street')) {
      // Check if it's NOT our current conversation and not the current prompt
      if (convDir !== 'f6b65e7a-ff84-4b97-9f53-80581cfeb8c5') {
        console.log(`--- MATCH FOUND in conversation ${convDir} at line ${lineCount} ---`);
        try {
          const obj = JSON.parse(line);
          console.log(`Type: ${obj.type}, Source: ${obj.source}`);
          if (obj.content) {
            console.log(`Content length: ${obj.content.length}`);
            fs.writeFileSync(`scratch/found_in_${convDir}_line_${lineCount}.txt`, obj.content);
            console.log(`Saved to scratch/found_in_${convDir}_line_${lineCount}.txt`);
          }
        } catch (e) {
          console.log("Error parsing", e);
        }
      }
    }
  }
}

async function searchAll() {
  try {
    const folders = fs.readdirSync(brainDir);
    for (const folder of folders) {
      const fullPath = path.join(brainDir, folder);
      if (fs.statSync(fullPath).isDirectory()) {
        await searchInTranscript(folder);
      }
    }
  } catch (e) {
    console.error("Error searching transcripts:", e);
  }
}

searchAll();
