/**
 * Сборка монолитного jscripts.dat (snamik.js + chat core).
 * Нужна только если чат грузится одним %scripts% без отдельного snamik.js.
 *
 * Usage: node scripts/build-jscripts.js [outputPath]
 * Default output: data/jscripts.monolith.dat
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const snamikPath = path.join(root, 'assets/js/snamik.js');
const chatPath = path.join(root, 'data/jscripts.dat');
const outPath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(root, 'data/jscripts.monolith.dat');

const snamik = fs.readFileSync(snamikPath, 'utf8').trimEnd();
const chat = fs.readFileSync(chatPath, 'utf8').trimStart();

fs.writeFileSync(outPath, snamik + '\n\n' + chat, 'utf8');
console.log('Written:', outPath);
