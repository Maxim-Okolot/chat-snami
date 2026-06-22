/**
 * Конвертирует var → let/const в script.js.
 * gna, gra, use_gn — на window (gn.js, gr.js, chat.inc).
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../assets/js/script.js');
let src = fs.readFileSync(filePath, 'utf8');

const WINDOW_GLOBALS = {
  'var gna = new Array;': 'window.gna = [];',
  'var gna = new Array()': 'window.gna = [];',
  'var gra = new Array;': 'window.gra = [];',
  'var gra = new Array()': 'window.gra = [];',
  'var use_gn = 1;': 'window.use_gn = 1;',
};

for (const [from, to] of Object.entries(WINDOW_GLOBALS)) {
  src = src.replace(from, to);
}

/** var → let (все оставшиеся) */
src = src.replace(/\bvar\b/g, 'let');

/** Очевидные const внутри функций/методов */
const constPatterns = [
  [/let self = this;/g, 'const self = this;'],
  [/let promise = new Audio/g, 'const promise = new Audio'],
  [/let container = this\.getContainer\(\);/g, 'const container = this.getContainer();'],
  [/let div = document\.createElement\('div'\);/g, 'const div = document.createElement(\'div\');'],
  [/let row = document\.createElement\('div'\);/g, 'const row = document.createElement(\'div\');'],
  [/let leftdiv = document\.getElementById\('leftdiv'\);/g, 'const leftdiv = document.getElementById(\'leftdiv\');'],
  [/let ul = document\.getElementById\('ul'\);/g, 'const ul = document.getElementById(\'ul\');'],
  [/let canvas = document\.createElement\('canvas'\);/g, 'const canvas = document.createElement(\'canvas\');'],
  [/let ctx = canvas\.getContext\('2d'\);/g, 'const ctx = canvas.getContext(\'2d\');'],
  [/let gradient = ctx\.createLinearGradient/g, 'const gradient = ctx.createLinearGradient'],
  [/let form = document\.fmsg;/g, 'const form = document.fmsg;'],
  [/let saved = localStorage\.getItem/g, 'const saved = localStorage.getItem'],
  [/let soundSrc = this\.sounds\[cmd\];/g, 'const soundSrc = this.sounds[cmd];'],
  [/let id = String\(msgId\);/g, 'const id = String(msgId);'],
  [/let date = new Date\(\);/g, 'const date = new Date();'],
  [/let lp = \(screen\.width\)/g, 'const lp = (screen.width)'],
  [/let tp = \(screen\.height\)/g, 'const tp = (screen.height)'],
  [/let str = document\.cookie;/g, 'const str = document.cookie;'],
  [/let len = str\.length;/g, 'const len = str.length;'],
  [/let candidates = \[\];/g, 'const candidates = [];'],
  [/let sBot = 'Снамик';/g, 'const sBot = \'Снамик\';'],
  [/let isDeportation = getcookie/g, 'const isDeportation = getcookie'],
  [/let l = us\.length;/g, 'const l = us.length;'],
  [/let nickid = '!' \+ nick;/g, 'const nickid = \'!\' + nick;'],
  [/let set_nick = setGraphNick\(11, nick\);/g, 'const set_nick = setGraphNick(11, nick);'],
  [/let set_privat = privat_s;/g, 'let set_privat = privat_s;'], // reassigned
  [/let st = stn\[stat\]/g, 'const st = stn[stat]'],
  [/let icqst = stn2\[stat2\]/g, 'const icqst = stn2[stat2]'],
  [/let mw = mw_n;/g, 'let mw = mw_n;'], // reassigned
  [/let ign_st = 'off', ign_img = ign_imgoff;/g, 'let ign_st = \'off\', ign_img = ign_imgoff;'],
  [/let nickColor = color/g, 'const nickColor = color'],
  [/let set_mw = /g, 'const set_mw = '],
  [/let messageRouter = new MessageRouter\(\);/g, 'const messageRouter = new MessageRouter();'],
  [/let roomCounter = new RoomCounter\(\);/g, 'const roomCounter = new RoomCounter();'],
  [/let chatInputController = new ChatInputController\(\);/g, 'const chatInputController = new ChatInputController();'],
  [/let statusManager = new StatusManager\(\);/g, 'const statusManager = new StatusManager();'],
  [/let roomSwitcher = new RoomSwitcher\(\);/g, 'const roomSwitcher = new RoomSwitcher();'],
  [/let quizGame = new QuizGame\(\);/g, 'const quizGame = new QuizGame();'],
  [/let historyViewer = new HistoryViewer\(\);/g, 'const historyViewer = new HistoryViewer();'],
  [/let chatFrameLoader = new ChatFrameLoader\(\);/g, 'const chatFrameLoader = new ChatFrameLoader();'],
  [/let chatLoadHandler = new ChatLoadHandler\(\);/g, 'const chatLoadHandler = new ChatLoadHandler();'],
  [/let chatMessageWriter = new ChatMessageWriter\(\);/g, 'const chatMessageWriter = new ChatMessageWriter();'],
  [/let nickListManager = new NickListManager\(\);/g, 'const nickListManager = new NickListManager();'],
  [/let sound = new SoundService\(\);/g, 'const sound = new SoundService();'],
  [/let replyBlinker = new ReplyBlinker\(\);/g, 'const replyBlinker = new ReplyBlinker();'],
  [/let graphNickRenderer = new GraphNickRenderer\(\);/g, 'const graphNickRenderer = new GraphNickRenderer();'],
  [/let chatImageResizer = new ChatImageResizer\(\);/g, 'const chatImageResizer = new ChatImageResizer();'],
  [/let titleNotifier = new TitleNotifier\(\);/g, 'const titleNotifier = new TitleNotifier();'],
  [/let windowOpener = new WindowOpener\(\);/g, 'const windowOpener = new WindowOpener();'],
  [/let cookieStorage = new CookieStorage\(\);/g, 'const cookieStorage = new CookieStorage();'],
  [/let ignoreService = new IgnoreService\(\);/g, 'const ignoreService = new IgnoreService();'],
  [/let nickMessageFormatter = new NickMessageFormatter\(\);/g, 'const nickMessageFormatter = new NickMessageFormatter();'],
  [/let chatScrollManager = new ChatScrollManager\(\);/g, 'const chatScrollManager = new ChatScrollManager();'],
  [/let gettime = new Date\(\)\.getTime\(\);/g, 'let gettime = new Date().getTime();'], // reassigned
  [/let userlist = /g, 'const userlist = '],
];

for (const [re, rep] of constPatterns) {
  src = src.replace(re, rep);
}

/** Сервисные экземпляры и неизменяемые конфиги на верхнем уровне */
const topConst = [
  'topic', 'img_no', 'roomlog', 'privatok', 'useseparate', 'myhistory1', 'myhistory',
  'setcursor', 'nomousemenu', 'slowscroll', 'maxmsgs', 'maxabc', 'privat_s', 'icon1',
  'mw_n', 'mw_m', 'mw_w', 'ign_imgoff', 'ign_imgon', 'title_zip', 'userlist',
];
for (const name of topConst) {
  src = src.replace(new RegExp(`^let ${name} =`, 'm'), `const ${name} =`);
}

/** Массивы/объекты, мутируются но не переприсваиваются */
const topConstArrays = [
  'invisible', 'clearer', 'remover', 'ad_access', 'reloader', 'alerter', 'censor', 'ignorer',
  'gnok', 'grok', 'grna', 'tadda', 'tdela', 'symbols', 'deltxt', 'fontnick', 'fonttext',
  'stn2', 'icqtxt', 'away', 'pu', 'pt', 'us', 'ucc', 'amess',
];
for (const name of topConstArrays) {
  src = src.replace(new RegExp(`^let ${name} =`, 'm'), `const ${name} =`);
}

/** ign — ссылка на массив, не переприсваивается */
src = src.replace(/^let ign = ignoreService\.list;/m, 'const ign = ignoreService.list;');

if (/\bvar\b/.test(src)) {
  console.error('Remaining var declarations:', src.match(/\bvar\b/g).length);
  process.exit(1);
}

fs.writeFileSync(filePath, src, 'utf8');
console.log('Converted:', filePath);
