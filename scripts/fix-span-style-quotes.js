/**
 * Fix span style quoting after font→span conversion.
 * Pass 1: style='...' → style="..."
 * Pass 2: style="..." → style='...' on lines with double-quoted HTML assignments
 * Usage: node scripts/fix-span-style-quotes.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const DOUBLE_QUOTED_HTML =
  /=\s*"[^']*<span style="|=\s*"[^']*<span style="|write\s*\(\s*"[^']*<span style="|\+=\s*"[^']*<span style="|\?\s*"[^']*<span style="/;

function fixContent(content) {
  let next = content.replace(/<span style='([^']*)'>/gi, '<span style="$1">');
  next = next
    .split('\n')
    .map((line) => {
      if (!/<span style="/.test(line) || !DOUBLE_QUOTED_HTML.test(line)) return line;
      return line.replace(/<span style="([^"]*?)">/gi, "<span style='$1'>");
    })
    .join('\n');
  return next;
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full === path.join(root, 'scripts')) continue;
      walk(full, files);
    } else if (/\.(inc|php|js|dat|html)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

let changed = 0;
for (const file of walk(root)) {
  const before = fs.readFileSync(file, 'utf8');
  if (!/<span style=['"]/.test(before)) continue;
  const after = fixContent(before);
  if (after !== before) {
    fs.writeFileSync(file, after, 'utf8');
    changed += 1;
    console.log(path.relative(root, file));
  }
}

console.log(`Fixed ${changed} file(s).`);
