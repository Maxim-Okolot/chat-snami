/** Finds top-level const that are reassigned later in script.js */
const fs = require('fs');
const src = fs.readFileSync(require('path').join(__dirname, '../assets/js/script.js'), 'utf8');
const consts = [...src.matchAll(/^const (\w+) =/gm)].map(m => m[1]);
const bad = [];
for (const name of consts) {
  const re = new RegExp('(?<!\\.)\\b' + name + '\\s*=\\s*[^=]', 'g');
  const matches = src.match(re) || [];
  if (matches.length > 1) bad.push({ name, count: matches.length });
}
console.log(bad.length ? bad : 'No const reassignments found');
