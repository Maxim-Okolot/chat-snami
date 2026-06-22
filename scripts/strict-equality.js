/**
 * Replace == / != with === / !== where safe.
 * - Skips strings and comments
 * - == null / != null → explicit null/undefined checks
 */
const fs = require('fs');
const path = require('path');

function nullCheckPattern(op) {
  return new RegExp(
    '((?:\\w+|this)(?:\\[[^\\]]*\\]|(?:\\.\\w+))*)\\s*' + op + '\\s*null\\b',
    'g'
  );
}

function preprocessNullChecks(source) {
  let out = source.replace(nullCheckPattern('=='), '($1 === null || $1 === undefined)');
  out = out.replace(nullCheckPattern('!='), '($1 !== null && $1 !== undefined)');
  return out;
}

function strictifyOperators(source) {
  let result = '';
  let i = 0;

  while (i < source.length) {
    const ch = source[i];

    if (ch === "'" || ch === '"') {
      const q = ch;
      result += q;
      i++;
      while (i < source.length) {
        if (source[i] === '\\') {
          result += source[i] + (source[i + 1] || '');
          i += 2;
          continue;
        }
        result += source[i];
        if (source[i] === q) {
          i++;
          break;
        }
        i++;
      }
      continue;
    }

    if (source.startsWith('//', i)) {
      const end = source.indexOf('\n', i);
      const sliceEnd = end === -1 ? source.length : end;
      result += source.slice(i, sliceEnd);
      i = sliceEnd;
      continue;
    }

    if (source.startsWith('/*', i)) {
      const end = source.indexOf('*/', i);
      if (end === -1) {
        result += source.slice(i);
        break;
      }
      result += source.slice(i, end + 2);
      i = end + 2;
      continue;
    }

    if (ch === '=' && source[i + 1] === '=') {
      if (source[i + 2] === '=') {
        result += '===';
        i += 3;
      } else {
        result += '===';
        i += 2;
      }
      continue;
    }

    if (ch === '!' && source[i + 1] === '=') {
      if (source[i + 2] === '=') {
        result += '!==';
        i += 3;
      } else {
        result += '!==';
        i += 2;
      }
      continue;
    }

    result += ch;
    i++;
  }

  return result;
}

function convertFile(filePath) {
  const abs = path.resolve(filePath);
  const original = fs.readFileSync(abs, 'utf8');
  const converted = strictifyOperators(preprocessNullChecks(original));

  if (converted !== original) {
    fs.writeFileSync(abs, converted, 'utf8');
    const before = (original.match(/[^=!]==[^=]|[^=]!=[^=]/g) || []).length;
    const after = (converted.match(/[^=!]==[^=]|[^=]!=[^=]/g) || []).length;
    console.log(path.relative(process.cwd(), abs) + ': ' + before + ' -> ' + after);
  } else {
    console.log(path.relative(process.cwd(), abs) + ': no changes');
  }
}

const root = path.join(__dirname, '..');
const files = [
  path.join(root, 'data/jscripts.dat'),
  path.join(root, 'assets/js/snamik.js'),
  path.join(root, 'assets/js/gradient.js'),
];

for (const file of files) {
  convertFile(file);
}
