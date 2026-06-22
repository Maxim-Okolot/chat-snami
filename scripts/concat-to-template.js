/**
 * Convert string concatenation (+) to template literals where a chain includes a string literal.
 * Usage: node scripts/concat-to-template.js [file...]
 */
const fs = require('fs');
const path = require('path');
const acorn = require('acorn');

function flattenPlus(node) {
  if (node.type === 'BinaryExpression' && node.operator === '+') {
    return flattenPlus(node.left).concat(flattenPlus(node.right));
  }
  if (node.type === 'ParenthesizedExpression') {
    return flattenPlus(node.expression);
  }
  return [node];
}

function hasStringLiteral(parts) {
  return parts.some(function (part) {
    return part.type === 'Literal' && typeof part.value === 'string';
  });
}

function escapeQuasi(text) {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

function partsToTemplate(parts, source) {
  let result = '`';
  for (const part of parts) {
    if (part.type === 'Literal' && typeof part.value === 'string') {
      result += escapeQuasi(part.value);
      continue;
    }
    result += '${' + source.slice(part.start, part.end) + '}';
  }
  result += '`';
  return result;
}

function walk(node, parent, source, replacements) {
  if (!node || typeof node !== 'object') return;

  if (node.type === 'BinaryExpression' && node.operator === '+') {
    const parentIsPlus =
      parent && parent.type === 'BinaryExpression' && parent.operator === '+';
    if (!parentIsPlus) {
      const parts = flattenPlus(node);
      if (parts.length >= 2 && hasStringLiteral(parts)) {
        replacements.push({
          start: node.start,
          end: node.end,
          text: partsToTemplate(parts, source),
        });
      }
    }
  }

  for (const key of Object.keys(node)) {
    if (key === 'start' || key === 'end') continue;
    const child = node[key];
    if (Array.isArray(child)) {
      child.forEach(function (c) {
        walk(c, node, source, replacements);
      });
    } else if (child && typeof child.type === 'string') {
      walk(child, node, source, replacements);
    }
  }
}

function convertSource(source) {
  const program = acorn.parse(source, {
    ecmaVersion: 2020,
    sourceType: 'script',
    allowReturnOutsideFunction: true,
  });

  const replacements = [];
  walk(program, null, source, replacements);

  const filtered = replacements.filter(function (rep, i) {
    return !replacements.some(function (other, j) {
      return i !== j && rep.start >= other.start && rep.end <= other.end;
    });
  });

  filtered.sort(function (a, b) {
    return b.start - a.start;
  });

  let out = source;
  for (const rep of filtered) {
    out = out.slice(0, rep.start) + rep.text + out.slice(rep.end);
  }

  return { out: out, count: filtered.length };
}

function convertFile(filePath) {
  const abs = path.resolve(filePath);
  let source = fs.readFileSync(abs, 'utf8');
  let total = 0;
  let pass = 0;

  while (pass < 20) {
    pass++;
    let result;
    try {
      result = convertSource(source);
    } catch (err) {
      console.error('Parse error in', abs, '-', err.message);
      process.exit(1);
    }
    if (result.count === 0) break;
    total += result.count;
    source = result.out;
  }

  if (total === 0) {
    console.log(path.relative(process.cwd(), abs) + ': no changes');
    return;
  }

  fs.writeFileSync(abs, source, 'utf8');
  console.log(path.relative(process.cwd(), abs) + ': ' + total + ' chains (' + pass + ' passes)');
}

const root = path.join(__dirname, '..');
const defaultFiles = [
  path.join(root, 'data/jscripts.dat'),
  path.join(root, 'assets/js/snamik.js'),
];

const files = process.argv.length > 2
  ? process.argv.slice(2).map(function (p) { return path.resolve(p); })
  : defaultFiles;

for (const file of files) {
  convertFile(file);
}
