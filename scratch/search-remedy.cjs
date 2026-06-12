const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = 'C:\\Users\\DELLL\\.gemini\\antigravity\\brain\\f6b65e7a-ff84-4b97-9f53-80581cfeb8c5\\.system_generated\\logs\\transcript.jsonl';

async function main() {
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const inputs = [];
  for await (const line of rl) {
    if (line.includes('"type":"USER_INPUT"')) {
      try {
        const obj = JSON.parse(line);
        inputs.push(obj);
      } catch (err) {
        // ignore
      }
    }
  }

  console.log(`Found ${inputs.length} user inputs. Showing the last 5:`);
  const lastFive = inputs.slice(-5);
  for (let i = 0; i < lastFive.length; i++) {
    console.log(`\n--- Input ${inputs.length - 5 + i + 1} ---`);
    console.log(lastFive[i].content);
  }
}

main().catch(console.error);
