const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'data');
const snippet = [
  '  <script src="/assets/js/site-theme-boot.js"></script>',
  '  <link rel="stylesheet" href="/assets/css/site-theme.css">',
].join('\n');

const files = fs.readdirSync(root).filter((f) => f.endsWith('.inc'));

let updated = 0;

for (const file of files) {
  const filePath = path.join(root, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('site-theme-boot.js')) {
    continue;
  }

  if (file === 'chat.inc') {
    content = content.replace(
      /\s*<script>\s*\(function \(\) \{\s*if \(localStorage\.getItem\('chat_dark_theme'\)[\s\S]*?\}\)\(\);\s*<\/script>\s*/,
      '\n'
    );
  }

  if (content.includes('<head>')) {
    content = content.replace('<head>', '<head>\n' + snippet);
  } else if (content.startsWith('%include=header.html%')) {
    content = snippet + '\n' + content;
  } else if (content.startsWith('<script>')) {
    content = '  <script src="/assets/js/site-theme-boot.js"></script>\n' + content;
    if (!content.includes('site-theme.css')) {
      const headIdx = content.indexOf('<head>');
      if (headIdx >= 0) {
        content = content.slice(0, headIdx + 6) + '\n' + snippet + content.slice(headIdx + 6);
      }
    }
  } else {
    continue;
  }

  fs.writeFileSync(filePath, content);
  updated += 1;
  console.log('updated', file);
}

console.log('done, updated', updated, 'files');
