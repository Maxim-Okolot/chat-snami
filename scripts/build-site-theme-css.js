const fs = require('fs');
const path = require('path');

const stylePath = path.join(__dirname, '../assets/css/style.css');
const outPath = path.join(__dirname, '../assets/css/site-theme.css');
const css = fs.readFileSync(stylePath, 'utf8');
const marker = '/* Dark theme';
const i = css.indexOf(marker);

if (i < 0) {
  console.error('Dark theme block not found in style.css');
  process.exit(1);
}

const global = `/* Site-wide dark theme (chat_dark_theme in localStorage) */

html.chat-theme-dark {
  --site-bg: #070b18;
  --site-panel: rgba(15, 20, 39, 0.92);
  --site-border: rgba(255,255,255,0.08);
  --site-text: #eef2ff;
  --site-muted: #aab3d4;
  --site-primary: #7c8cff;
  --bg-color: #070b18;
  --card-bg: rgba(15, 20, 39, 0.92);
  --sidebar-bg: rgba(17, 24, 44, 0.88);
  --text-main: #eef2ff;
  --text-muted: #aab3d4;
  --text-secondary: #8189ad;
  --border-color: rgba(255,255,255,0.08);
  --accent-dark: #eef2ff;
}

html.chat-theme-dark body:not(.chat-body):not(.love-body):not(.top100-body) {
  color: var(--site-text) !important;
  background:
    radial-gradient(circle at top left, rgba(124,140,255,.15), transparent 28%),
    radial-gradient(circle at top right, rgba(255,92,168,.14), transparent 24%),
    radial-gradient(circle at bottom left, rgba(51,214,200,.10), transparent 28%),
    linear-gradient(180deg, #090d1b 0%, #0b1020 45%, #070b18 100%) !important;
}

html.chat-theme-dark a {
  color: #aeb8ff;
}

html.chat-theme-dark a:hover {
  color: #fff;
}

html.chat-theme-dark input:not([type='checkbox']):not([type='radio']),
html.chat-theme-dark select,
html.chat-theme-dark textarea,
html.chat-theme-dark .text,
html.chat-theme-dark .form-control {
  background: rgba(255,255,255,0.06) !important;
  color: var(--site-text) !important;
  border-color: var(--site-border) !important;
}

html.chat-theme-dark table {
  color: var(--site-text);
}

html.chat-theme-dark table td,
html.chat-theme-dark table th {
  border-color: var(--site-border);
}

html.chat-theme-dark .error-msg,
html.chat-theme-dark font[color='red'] {
  color: #ffb4bc !important;
}

html.chat-theme-dark .feedback-body,
html.chat-theme-dark .error-body,
html.chat-theme-dark .gb-body {
  color: var(--site-text);
}

html.chat-theme-dark .avatar-block,
html.chat-theme-dark .stat-item {
  background: rgba(255,255,255,0.04);
  border-color: var(--site-border);
}

html.chat-theme-dark .avatar-placeholder {
  background: rgba(255,255,255,0.06);
}

html.chat-theme-dark .btn-primary,
html.chat-theme-dark .ok,
html.chat-theme-dark input[type='submit'] {
  background: linear-gradient(135deg, #7c8cff 0%, #ff5ca8 55%, #33d6c8 100%);
  color: #fff !important;
  border: none;
}

html.chat-theme-dark .btn-secondary {
  background: rgba(255,255,255,0.08);
  color: var(--site-text);
  border-color: var(--site-border);
}

html.chat-theme-dark .reg-card {
  background: rgba(15, 20, 39, 0.92);
  border-color: rgba(255,255,255,0.12);
}

html.chat-theme-dark center,
html.chat-theme-dark .body {
  color: var(--site-text);
}

`;

fs.writeFileSync(outPath, global + css.slice(i));
fs.writeFileSync(stylePath, css.slice(0, i).trimEnd() + '\n');
console.log('Created site-theme.css and trimmed style.css');
