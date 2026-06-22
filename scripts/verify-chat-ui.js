/**
 * Проверка связки chat.inc ↔ chat-ui.js и синтаксиса jscripts.dat
 * Usage: node scripts/verify-chat-ui.js
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');
const chatInc = fs.readFileSync(path.join(root, 'data/chat.inc'), 'utf8');
const chatUi = fs.readFileSync(path.join(root, 'assets/js/chat-ui.js'), 'utf8');
const jscripts = fs.readFileSync(path.join(root, 'data/jscripts.dat'), 'utf8');

let errors = [];
let warnings = [];

function ok(msg) {
  console.log('  OK  ' + msg);
}

function fail(msg) {
  errors.push(msg);
  console.log('  FAIL ' + msg);
}

function warn(msg) {
  warnings.push(msg);
  console.log('  WARN ' + msg);
}

console.log('=== Синтаксис JS ===');
for (const [label, file] of [
  ['chat-ui.js', path.join(root, 'assets/js/chat-ui.js')],
  ['snamik.js', path.join(root, 'assets/js/snamik.js')],
  ['jscripts.dat', path.join(root, 'data/jscripts.dat')],
]) {
  const checkPath = file.endsWith('.dat')
    ? path.join(root, 'data/_verify-syntax.js')
    : file;
  if (file.endsWith('.dat')) fs.writeFileSync(checkPath, jscripts);
  try {
    execSync(`node --check "${checkPath}"`, { stdio: 'pipe' });
    ok(`${label}`);
  } catch (e) {
    fail(`${label}: ${e.stderr?.toString().trim() || e.message}`);
  }
  if (file.endsWith('.dat') && fs.existsSync(checkPath)) fs.unlinkSync(checkPath);
}

console.log('\n=== data-action: chat.inc → chat-ui.js ===');
const actionsInHtml = [...chatInc.matchAll(/data-action="([^"]+)"/g)].map((m) => m[1]);
const actionsInJs = [...chatUi.matchAll(/case '([^']+)':/g)].map((m) => m[1]);
const uniqueHtml = [...new Set(actionsInHtml)];

for (const action of uniqueHtml) {
  if (actionsInJs.includes(action)) ok(`handler: ${action}`);
  else fail(`нет обработчика для data-action="${action}"`);
}

for (const action of actionsInJs) {
  if (!uniqueHtml.includes(action)) warn(`обработчик '${action}' не используется в chat.inc`);
}

console.log('\n=== Обязательные id/data-атрибуты в chat.inc ===');
for (const id of ['time', 'chat-date', 'idpost', 'checkGraphNick', 'pauseScrollButton', 'leftdiv']) {
  if (chatInc.includes(`id="${id}"`) || chatInc.includes(`id=${id}`)) ok(`#${id}`);
  else fail(`нет элемента #${id}`);
}

if (chatInc.includes('data-chat-submenu="personal"')) ok('data-chat-submenu="personal"');
else fail('нет data-chat-submenu="personal"');

if (chatInc.includes('data-dj-banner-host')) ok('data-dj-banner-host');
else fail('нет data-dj-banner-host');

console.log('\n=== Подключение скриптов в chat.inc ===');
if (chatInc.includes('%scripts%')) ok('%scripts% (jscripts.dat через PHP)');
else fail('нет %scripts%');

if (chatInc.includes('chat-ui.js')) ok('chat-ui.js подключён');
else fail('chat-ui.js не подключён');

if (/<script(?![^>]*src=)[^>]*>[\s\S]*?<\/script>/i.test(chatInc.replace('%scripts%', ''))) {
  warn('в chat.inc остались inline <script> (кроме %scripts%)');
} else {
  ok('inline-скриптов в chat.inc нет (кроме %scripts%)');
}

console.log('\n=== .htaccess: доступ к assets ===');
const htaccess = fs.readFileSync(path.join(root, '.htaccess'), 'utf8');
if (/deny from all/i.test(htaccess) && htaccess.includes('.dat')) {
  ok('data/*.dat закрыты от прямого доступа');
} else {
  warn('.htaccess: проверьте блокировку .dat вручную');
}
if (!htaccess.includes('assets')) ok('assets/ не заблокированы в .htaccess');
else fail('assets/ могут быть заблокированы .htaccess');

console.log('\n=== Глобалы, используемые chat-ui.js ===');
const optionalGlobals = [
  'rooms', 'setmyroom', 'post', 'admin', 'sendto', 'loadfile_on',
  'startgame', 'mainsmileon', 'mp_recording', 'loadframes', 'ws', 'wo', 'yourkey',
  'setstatus', 'focus', 'snamik',
];
for (const g of optionalGlobals) {
  const usedInUi = new RegExp(`\\b${g}\\b`).test(chatUi);
  const definedInJs = new RegExp(`\\b(function ${g}|var ${g}|let ${g}|const ${g}|${g}\\s*=)`).test(jscripts)
    || (g === 'snamik' && fs.existsSync(path.join(root, 'assets/js/snamik.js')));
  if (!usedInUi) continue;
  if (definedInJs || ['post', 'admin', 'loadfile_on', 'yourkey', 'mainsmileon', 'mp_recording', 'focus'].includes(g)) {
    ok(`${g} — из PHP или jscripts (или опционален)`);
  } else {
    warn(`${g} используется в chat-ui.js, в jscripts.dat не найден (может быть из PHP)`);
  }
}

console.log('\n=== center → span (регрессия) ===');
const centerLeft = (chatInc.match(/<center>|(<\/center>)/gi) || []).length;
if (centerLeft === 0) ok('chat.inc: тегов <center> нет');
else fail(`chat.inc: осталось ${centerLeft} вхождений <center>`);

console.log('\n=== Права администратора ===');
if (jscripts.includes('applyAdminPrivileges')) ok('ChatConfig.applyAdminPrivileges() есть');
else fail('нет applyAdminPrivileges в jscripts.dat');

const adminUiChecks = [
  ['ChatAdminMenu', chatUi.includes('class ChatAdminMenu') && chatUi.includes('Number(typeof admin')],
  ['ChatAdminActions', chatUi.includes('class ChatAdminActions') && chatUi.includes('Модерация')],
  ['optgroup clear/reload', /clear.*reload/s.test(chatUi) && !chatUi.includes('алерт-вызов')],
];
for (const [name, pass] of adminUiChecks) {
  if (pass) ok(`admin UI: ${name}`);
  else fail(`admin UI: ${name}`);
}

const modCommands = ['/clear', '/reload'];
for (const cmd of modCommands) {
  if (jscripts.includes(`"${cmd}"`) || jscripts.includes(`'${cmd}'`) || jscripts.includes(`=== "${cmd}"`) || jscripts.includes(`=== '${cmd}'`) || jscripts.includes(`substr(0, ${cmd.length}) === "${cmd}"`) || jscripts.includes(`substr(0, ${cmd.length + 1}) === "${cmd}"`)) {
    ok(`команда ${cmd} обрабатывается в jscripts.dat`);
  } else if (jscripts.includes(cmd)) {
    ok(`команда ${cmd} упоминается в jscripts.dat`);
  } else {
    fail(`команда ${cmd} не найдена в jscripts.dat`);
  }
}

if (chatInc.includes('data-chat-submenu="personal"')) ok('меню для пункта Админка');
else fail('нет personal submenu для Админки');

if (chatInc.includes('footer-form__actions')) ok('select cmd для модерации');
else fail('нет select.footer-form__actions');

console.log('\n=== Итог ===');
console.log(`Ошибок: ${errors.length}, предупреждений: ${warnings.length}`);
process.exit(errors.length ? 1 : 0);
