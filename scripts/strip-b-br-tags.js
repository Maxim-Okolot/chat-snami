/**
 * Replace <b>/<br> in chat JS with span + CSS classes (single-quoted HTML attrs).
 * Usage: node scripts/strip-b-br-tags.js [file...]
 */
const fs = require('fs');
const path = require('path');

const files = process.argv.slice(2);
if (!files.length) {
  console.error('Usage: node scripts/strip-b-br-tags.js <file...>');
  process.exit(1);
}

function transform(content) {
  let next = content;
  next = next.replace(/<b>/gi, "<span class='chat-msg__bold'>");
  next = next.replace(/<\/b>/gi, '</span>');
  next = next.replace(/<br\s*\/?>/gi, "<span class='chat-msg__break'></span>");
  return next;
}

for (const file of files) {
  const full = path.resolve(file);
  const before = fs.readFileSync(full, 'utf8');
  const after = transform(before);
  if (after !== before) {
    fs.writeFileSync(full, after, 'utf8');
    console.log('Updated:', file);
  }
}
