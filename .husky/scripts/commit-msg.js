const fs = require('fs');
const { execSync } = require('child_process'); 
const msgPath = process.argv[2]; 
let msg = fs.readFileSync(msgPath, 'utf-8').trim();
const validMessagePattern = /\d+/; 
if (!validMessagePattern.test(msg)) {
  const commitCount = execSync('git rev-list --count HEAD').toString().trim();
  msg = `🔱Commit #${commitCount} 🔱 ${msg}`; 
  fs.writeFileSync(msgPath, msg);
  console.log(`Commit message was updated: ${msg}`);
} else {
  console.log('Commit message is valid.');
}
process.exit(0);