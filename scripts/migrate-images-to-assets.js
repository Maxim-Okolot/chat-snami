/**
 * Перенос статических картинок из img/ → assets/img/ и обновление путей в коде.
 * User-uploads (data/foto, data/gn, data/gallery/image, …) не трогаем.
 * Usage: node scripts/migrate-images-to-assets.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const imgRoot = path.join(root, 'img');
const assetsImgRoot = path.join(root, 'assets/img');

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.cur']);

const SKIP_DIRS = new Set(['node_modules', '.git', '.idea']);

const TEXT_EXT = new Set(['.inc', '.php', '.js', '.css', '.dat', '.html', '.htm', '.mdc']);

function walkImages(dir, base = dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (SKIP_DIRS.has(name)) continue;
      results.push(...walkImages(full, base));
    } else if (IMAGE_EXT.has(path.extname(name).toLowerCase())) {
      results.push(path.relative(base, full));
    }
  }
  return results;
}

function walkTextFiles(dir, base = dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (SKIP_DIRS.has(name) || name === 'node_modules') continue;
      if (full === imgRoot) continue;
      results.push(...walkTextFiles(full, base));
    } else if (TEXT_EXT.has(path.extname(name).toLowerCase())) {
      const rel = path.relative(base, full);
      if (rel.startsWith(`img${path.sep}`) && path.extname(name).toLowerCase() === '.js') continue;
      results.push(full);
    }
  }
  return results;
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function moveImages() {
  const files = walkImages(imgRoot);
  let moved = 0;
  let skipped = 0;
  let removedDup = 0;

  for (const rel of files) {
    const src = path.join(imgRoot, rel);
    const dest = path.join(assetsImgRoot, rel.split(path.sep).join('/'));
    ensureDir(dest);
    if (fs.existsSync(dest)) {
      fs.unlinkSync(src);
      removedDup++;
    } else {
      fs.renameSync(src, dest);
      moved++;
    }
  }

  return { moved, skipped, removedDup, total: files.length };
}

function createMissingAssets() {
  const forumDir = path.join(assetsImgRoot, 'forum');
  ensureDir(path.join(forumDir, 'ava_f.png'));

  const pairs = [
    [path.join(assetsImgRoot, 'no_avatar_par.png'), path.join(forumDir, 'ava_f.png')],
    [path.join(assetsImgRoot, 'no_avatar.png'), path.join(forumDir, 'ava_m.png')],
    [path.join(assetsImgRoot, 'users/default-icon.jpg'), path.join(assetsImgRoot, 'nophoto.jpg')],
  ];

  for (const [src, dest] of pairs) {
    if (fs.existsSync(src) && !fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
    }
  }
}

function updateReferences() {
  const replacements = [
    [/data\/vhod\/images\/favicon\.ico/g, '/assets/img/favicon.ico'],
    [/https:\/\/snami\.mpchat\.com\/img\//g, 'https://snami.mpchat.com/assets/img/'],
    [/'\/img\//g, "'/assets/img/"],
    [/"\/img\//g, '"/assets/img/'],
    [/`\/img\//g, '`/assets/img/'],
    [/\(\s*\/img\//g, '(/assets/img/'],
    [/\.\/img\//g, '/assets/img/'],
    [/'..\/img\//g, "'/assets/img/"],
    [/"..\/img\//g, '"/assets/img/'],
    [/url\(\s*['"]?img\//g, "url('/assets/img/"],
  ];

  const files = walkTextFiles(root);
  let changed = 0;

  for (const file of files) {
    if (file.includes(`${path.sep}assets${path.sep}js${path.sep}script.js`)) continue;
    if (file.includes(`${path.sep}assets${path.sep}css${path.sep}style.css`)) continue;
    let text = fs.readFileSync(file, 'utf8');
    let next = text;
    for (const [pattern, replacement] of replacements) {
      next = next.replace(pattern, replacement);
    }
    if (next !== text) {
      next = next.replace(/\/\/assets\/img\//g, '/assets/img/');
      fs.writeFileSync(file, next, 'utf8');
      changed++;
    }
  }

  return changed;
}

function patchHtaccess() {
  const htaccess = path.join(root, '.htaccess');
  if (!fs.existsSync(htaccess)) return false;
  let text = fs.readFileSync(htaccess, 'utf8');
  const rule = 'RewriteRule ^img/(.*)$ assets/img/$1 [L]\n';
  if (text.includes('RewriteRule ^img/')) return false;
  text = text.replace(
    'RewriteEngine on\n',
    `RewriteEngine on\n${rule}`
  );
  fs.writeFileSync(htaccess, text, 'utf8');
  return true;
}

const moveStats = moveImages();
createMissingAssets();
const refFiles = updateReferences();
const htaccessPatched = patchHtaccess();

console.log('=== migrate-images-to-assets ===');
console.log('Moved:', moveStats.moved);
console.log('Removed duplicates from img/:', moveStats.removedDup);
console.log('Total scanned in img/:', moveStats.total);
console.log('Reference files updated:', refFiles);
console.log('.htaccess img→assets/img rule:', htaccessPatched ? 'added' : 'already present or skipped');
