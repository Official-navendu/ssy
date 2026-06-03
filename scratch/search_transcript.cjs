const fs = require('fs');
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
    if (line.toLowerCase().includes('twin flame')) {
      console.log(`--- Match at line ${lineCount} ---`);
      try {
        const obj = JSON.parse(line);
        console.log(`Type: ${obj.type}, Source: ${obj.source}`);
        console.log(`Content:`, obj.content);
        if (obj.tool_calls) {
          console.log(`Tool calls:`, JSON.stringify(obj.tool_calls, null, 2));
        }
      } catch (e) {
        console.log("Error parsing", e);
      }
    }
  }
}

search();
