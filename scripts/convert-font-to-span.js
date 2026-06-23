/**
 * Replace deprecated <span> tags with <span style="...">.
 * After conversion run: node scripts/fix-span-style-quotes.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const FONT_SIZE_MAP = {
  1: 'xx-small',
  2: 'small',
  3: 'medium',
  4: 'large',
  5: 'x-large',
  6: 'xx-large',
  7: '48px',
};

function parseAttrs(attrString) {
  const attrs = {};
  const re = /([a-zA-Z_:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
  let match;
  while ((match = re.exec(attrString))) {
    attrs[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? '';
  }
  return attrs;
}

function normalizeColor(value) {
  if (!value) return '';
  const v = value.trim();
  if (/^#/.test(v)) return v;
  if (/^[0-9a-f]{3,8}$/i.test(v)) return `#${v}`;
  return v;
}

function sizeToCss(value) {
  if (!value) return '';
  const v = value.trim();
  if (/^\d+(\.\d+)?(px|em|rem|pt|%)$/i.test(v)) return v;
  if (/^\d+$/.test(v) && FONT_SIZE_MAP[v]) return FONT_SIZE_MAP[v];
  if (/^\d+(\.\d+)?$/.test(v)) return `${v}px`;
  return v;
}

function fontOpenToSpan(attrString) {
  const attrs = parseAttrs(attrString || '');
  const styles = [];

  if (attrs.color) styles.push(`color:${normalizeColor(attrs.color)}`);
  if (attrs.size) styles.push(`font-size:${sizeToCss(attrs.size)}`);
  if (attrs.face) styles.push(`font-family:${attrs.face}`);

  const classPart = attrs.class ? ` class="${attrs.class}"` : '';
  const stylePart = styles.length ? ` style="${styles.join(';')}"` : '';
  const onclickPart = attrs.onclick ? ` onclick="${attrs.onclick}"` : '';

  return `<span${classPart}${stylePart}${onclickPart}>`;
}

function convertContent(content) {
  return content.replace(/<\/?font\b([^>]*)>/gi, (full, attrString = '') => {
    if (/^<\//i.test(full)) return '</span>';
    return fontOpenToSpan(attrString);
  });
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(inc|php|js|dat|html)$/i.test(entry.name)) files.push(full);
  }
  return files;
}

let changed = 0;
for (const file of walk(root)) {
  const before = fs.readFileSync(file, 'utf8');
  if (!/<\/?font\b/i.test(before)) continue;
  const after = convertContent(before);
  if (after !== before) {
    fs.writeFileSync(file, after, 'utf8');
    changed += 1;
    console.log(path.relative(root, file));
  }
}

console.log(`Updated ${changed} file(s).`);
