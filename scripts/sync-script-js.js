/**
 * Copy chat core jscripts.dat → assets/js/script.js
 * Usage: node scripts/sync-script-js.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'data/jscripts.dat');
const dest = path.join(root, 'assets/js/script.js');

fs.copyFileSync(src, dest);
console.log('Synced:', path.relative(root, dest));
