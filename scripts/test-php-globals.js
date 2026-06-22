const fs = require('fs');
const php = [
  'var room_r=0', 'var status_r=0', 'var inchat_r=1',
  'var gameon=0', 'var gamews=""', 'var loaded=0',
  'var status=0', 'var interval=null', 'var scrolled=0', 'var delayed=0',
].join(';') + ';';
const js = fs.readFileSync(require('path').join(__dirname, '../assets/js/script.js'), 'utf8');
try {
  new Function(php + js);
  console.log('combined PHP + script.js: OK');
} catch (e) {
  console.error('FAIL:', e.message);
  process.exit(1);
}
