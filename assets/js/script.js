
//  --- НАСТРОЙКИ ЧАТА -----------------------------------------------

/** Создаёт sparse-массив «ник → флаг» для прав доступа. */
function nickFlags(nicks) {
  const map = [];
  for (const nick of nicks) map[nick] = 1;
  return map;
}

/** Sparse-массив «ник → значение» (приветствия, прощания и т.п.). */
function nickMap(entries) {
  const map = [];
  for (const [nick, value] of Object.entries(entries)) map[nick] = value;
  return map;
}

/**
 * Конфигурация чата: UI, права, оформление, статусы.
 * Глобальные const/let ниже — для engine.js и остального кода.
 */
class ChatConfig {
  constructor() {
    this._initDisplay();
    this._initBehavior();
    this._initPrivileges();
    this._initGraphics();
    this._initMessages();
    this._initStatus();
    this._initGenderAndIgnore();
  }

  _initDisplay() {
    this.topic = '<span style="display:block;text-align:center"><img src=\'\'></span>';
    this.img_no = 0;
    this.roomlog = 0;
    this.privatok = 0;
    this.useseparate = 1;
    this.myhistory1 = '<!DOCTYPE html><html><head><META http-equiv=Content-Type content=\'text/html; charset=UTF-8\'><link rel=STYLESHEET type=text/css href=style.css></head><body class=header-body>';
    this.myhistory = '';
  }

  _initBehavior() {
    this.setcursor = 1;
    this.nomousemenu = 0;
    this.slowscroll = 12;
    this.maxmsgs = 0;
    this.maxabc = 5;
  }

  _initPrivileges() {
    this.invisible = nickFlags(['']);
    this.clearer = nickFlags(['Домовенок']);
    this.remover = nickFlags(['FunnyBunny']);
    this.ad_access = nickFlags(['FunnyBunny']);
    this.reloader = nickFlags(['FunnyBunny']);
    this.alerter = nickFlags([]);
    this.censor = nickFlags(['FunnyBunny']);
    this.ignorer = nickFlags(['FunnyBunny']);
  }

  _initGraphics() {
    window.use_gn = 1;
    this.gnok = [1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    window.gna = [];

    this.use_gr = 1;
    this.grok = [1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0];
    window.gra = [];

    this.grna = [];
    this.grna.adm = ['#ff0000', '#00ff00', '#0000ff'];
  }

  _initMessages() {
    this.tadda = nickMap({
      ' ': 'К нам приходит %nick%. Всем привет!',
      'Фортуна': 'Меня зовут, %nick% и мне поручено передать вам привет.  От кого? От моего сердца вам мои любимые! <img src=https://imgs.su/upload/737/4168556838.gif>',
    });

    this.tdela = nickMap({
      '': 'От нас уходит %nick%. Всем пока!',
      'FunnyBunny': 'От нас уходит Администратор чата  %nick%. Всем пока, до скорого!',
      'SweetBanny': 'От нас уходит Администратор чата  %nick%. Всем пока, до скорого!',
    });

    this.symbols = [];
    this.symbols[0] = '<p>';
    this.symbols[1] = '<p>';
    this.symbols[2] = '<p>';
    this.symbols[3] = '';
    this.symbols[4] = '';
    this.symbols[5] = '<p>';
    this.symbols[6] = '<p>';

    this.deltxt = [];
    this.deltxt[1] = 'удаляет';
    this.deltxt[2] = 'удаляет';
    this.deltxt[3] = 'удаляет';
    this.deltxt[4] = 'закидывает окнами';
    this.deltxt[5] = 'выпинывает';
    this.deltxt[6] = 'предупреждает';
    this.deltxt[7] = 'запрещает разговаривать';

    this.fontnick = ['black', '3', 'Comic Sans MS'];
    this.fonttext = ['black', '3', 'Comic Sans MS'];
    /** Индекс size (1–7) → px; size 3 — по умолчанию (16px). */
    this.fontSizePx = { 1: 10, 2: 13, 3: 16, 4: 18, 5: 24, 6: 32, 7: 48 };
    this.privat_s = '@';
    this.icon1 = 'http://imgs.su/avators/561.jpg';
  }

  _initStatus() {
    this.stn = [];
    this.stn[0] = '<img title="Житель" src="https://imgs.su/upload/827/535147782.gif">';
    this.stn[1] = '<img title="Администрация" src="https://imgs.su/upload/780/1802090102.gif">';
    this.stn[2] = '<img src=https://chat8215.mpchat.com/status_icon/zam_adm.png width=35  title=Зам Админа>';
    this.stn[3] = '<img src=https://imgs.su/upload/737/1906560560.gif width=35  title=Гл.Модер>';
    this.stn[4] = '<img title="Житель" src="https://imgs.su/upload/827/535147782.gif">';
    this.stn[5] = '<img title="Житель" src="https://imgs.su/upload/827/535147782.gif">';
    this.stn[6] = '<img src=https://snami.mpchat.com/texnik.png width=35  title=Техник>';
    this.stn[7] = '<img src=https://snami.mpchat.com/djm.png width=35  title=Радиоведущий>';
    this.stn[8] = '<img src=https://snami.mpchat.com/djj.png width=35  title=Радиоведушая>';
    this.stn[9] = '<img src=https://snami.mpchat.com/moder.png width=35  title=Модератор>';

    this.stn2 = [];

    this.statusGifDir = '../assets/img/status/current/';
    /** Индексы статусов → файлы 0.gif … 11.gif (12 шт., индекс 3 в чате не используется). */
    this.statusGifOrder = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    this.icqtxt = [];
    this.icqtxt[0] = '<img src="https://i.postimg.cc/LXnYHPzX/3.png">свободен <img src="https://i.postimg.cc/Px2gMLcm/im-free-cute.gif">';
    this.icqtxt[1] = '<img src="https://i.postimg.cc/LXnYHPzX/3.png">работаю <img src="https://i.postimg.cc/RhJHTtF8/ryry-slept-on-me-milk-and-mocha.gif">';
    this.icqtxt[2] = '<img src="https://i.postimg.cc/LXnYHPzX/3.png">влюблен{на} <img src="https://i.postimg.cc/6Q18FrMM/hugging-heart-snoopy.gif">';
    this.icqtxt[4] = '<img src="https://i.postimg.cc/LXnYHPzX/3.png">меня нет <img src="https://i.postimg.cc/kggtjLBK/the-cat-line.gif">';
    this.icqtxt[5] = '<img src="https://i.postimg.cc/LXnYHPzX/3.png">сплю <img src="https://i.postimg.cc/HWSmwKDf/the-cat-line-1.gif">';
    this.icqtxt[6] = '<img src="https://i.postimg.cc/LXnYHPzX/3.png">кушаю <img src="https://i.postimg.cc/BQSwZQjF/birbhaus-food.gif">';
    this.icqtxt[7] = '<img src="https://i.postimg.cc/LXnYHPzX/3.png">бухаю <img src="https://i.postimg.cc/R0XJMQqr/lethargic-bliss-wine.gif">';
    this.icqtxt[8] = '<img src="https://i.postimg.cc/LXnYHPzX/3.png">курю <img src="https://i.postimg.cc/66mvF04F/smoke-cash-2.gif">';
    this.icqtxt[9] = '<img src="https://i.postimg.cc/LXnYHPzX/3.png">водн.процедуры <img src="https://i.postimg.cc/kG95K22N/relax-relaxing.gif">';
    this.icqtxt[10] = '<img src="https://i.postimg.cc/LXnYHPzX/3.png">слушаю музыку <img src="https://i.postimg.cc/cHFzMjHD/listening-musica.gif">';
    this.icqtxt[11] = '<img src="https://i.postimg.cc/LXnYHPzX/3.png">в эфире <img src="https://i.postimg.cc/B65Kr9Dg/live-on-air.gif">';
    this.icqtxt[12] = '<img src="https://i.postimg.cc/LXnYHPzX/3.png">в ярости <img src="https://i.postimg.cc/158z61tj/dudu-cooking-bubu-fire.gif">';

    this.statusMeta = [];
    this.statusMeta[0] = this._statusMetaEntry(0, 'свободен', '✓');
    this.statusMeta[1] = this._statusMetaEntry(1, 'работаю', '💼');
    this.statusMeta[2] = this._statusMetaEntry(2, 'влюблен{на}', '💕');
    this.statusMeta[4] = this._statusMetaEntry(4, 'меня нет', '🚶');
    this.statusMeta[5] = this._statusMetaEntry(5, 'сплю', '😴');
    this.statusMeta[6] = this._statusMetaEntry(6, 'кушаю', '🍽');
    this.statusMeta[7] = this._statusMetaEntry(7, 'бухаю', '🍷');
    this.statusMeta[8] = this._statusMetaEntry(8, 'курю', '🚬');
    this.statusMeta[9] = this._statusMetaEntry(9, 'водн. процедуры', '🛁');
    this.statusMeta[10] = this._statusMetaEntry(10, 'слушаю музыку', '🎵');
    this.statusMeta[11] = this._statusMetaEntry(11, 'в эфире', '📻');
    this.statusMeta[12] = this._statusMetaEntry(12, 'в ярости', '😤');

    this._initStatusNickListIcons();

    this.away = [];
    this.away[17] = 15;
    this.away[13] = 30;
    this.away[14] = 60;
    this.away[15] = 90;
  }

  _initGenderAndIgnore() {
    this.mw_n = '?';
    this.mw_m = '<img src=https://imgs.su/upload/809/2657440385.png>';
    this.mw_w = '<img src=https://imgs.su/upload/809/436031054.png>';
    this.ign_imgoff = 'https://imgs.su/upload/809/3860897265.png';
    this.ign_imgon = 'https://imgs.su/upload/809/1639481662.png';
  }

  /** Подключает gn.js, gr.js и при необходимости gradient.js. */
  loadExternalScripts() {
    document.write(`<script src=../../assets/js/gn.js?${Math.random()}></script>`);
    if (this.use_gr === 1) {
      document.write(`<script src=../../assets/js/gradient.js></script>`);
    }
    document.write(`<script src=../../assets/js/gr.js?${Math.random()}></script>`);
  }

  /** PHP admin=1 → полный набор клиентских прав модерации для mynick. */
  applyAdminPrivileges() {
    if (typeof admin === 'undefined' || Number(admin) !== 1) return;
    if (typeof mynick === 'undefined' || !mynick) return;

    const keys = ['clearer', 'reloader', 'alerter', 'ignorer', 'remover', 'censor'];
    for (const key of keys) this[key][mynick] = 1;
  }

  /** Локальный gif: assets/img/status/current/0.gif … 11.gif — по позиции в statusGifOrder. */
  statusGifUrl(statusIndex) {
    const idx = Number(statusIndex);
    const pos = this.statusGifOrder.indexOf(idx);
    const fileNum = pos < 0 ? 0 : pos;
    return `${this.statusGifDir}${fileNum}.gif`;
  }

  _statusMetaEntry(statusIndex, label, icon) {
    return { label, icon, gif: this.statusGifUrl(statusIndex) };
  }

  /** Иконка статуса в никлисте — emoji из statusMeta.icon. */
  statusNickListIconHtml(statusIndex) {
    if (statusIndex === '' || statusIndex === null || statusIndex === undefined) return '';
    const idx = Number(statusIndex);
    if (Number.isNaN(idx)) return '';
    const meta = this.statusMeta[idx];
    if (!meta) return '';
    return `<span class="nick-list__status-icon nick-list__status-icon--${idx}" title="${meta.label}" aria-hidden="true">${meta.icon}</span>`;
  }

  _initStatusNickListIcons() {
    this.stn2 = [];
    for (let k = 0; k < this.statusGifOrder.length; k++) {
      const idx = this.statusGifOrder[k];
      this.stn2[idx] = this.statusNickListIconHtml(idx);
    }
  }

  /** Числовой индекс размера (1–9) или значение с px → font-size в px. */
  fontSizeToPx(size) {
    if (size === null || size === undefined || size === '') return '16px';
    const s = String(size).trim();
    if (/^\d+(\.\d+)?(px|em|rem|pt|%)$/i.test(s)) return s;
    const n = parseInt(s, 10);
    if (!Number.isNaN(n) && this.fontSizePx[n] !== undefined) return `${this.fontSizePx[n]}px`;
    if (!Number.isNaN(n) && n > 7) return `${this.fontSizePx[7]}px`;
    if (!Number.isNaN(n)) return `${n}px`;
    return s;
  }
}

const chatConfig = new ChatConfig();
chatConfig.applyAdminPrivileges();
chatConfig.loadExternalScripts();

const topic = chatConfig.topic;
const img_no = chatConfig.img_no;
const roomlog = chatConfig.roomlog;
const privatok = chatConfig.privatok;
const useseparate = chatConfig.useseparate;
const myhistory1 = chatConfig.myhistory1;
let myhistory = chatConfig.myhistory;
const setcursor = chatConfig.setcursor;
const nomousemenu = chatConfig.nomousemenu;
const slowscroll = chatConfig.slowscroll;
const maxmsgs = chatConfig.maxmsgs;
const maxabc = chatConfig.maxabc;
const invisible = chatConfig.invisible;
const clearer = chatConfig.clearer;
const remover = chatConfig.remover;
const ad_access = chatConfig.ad_access;
const reloader = chatConfig.reloader;
const alerter = chatConfig.alerter;
const censor = chatConfig.censor;
const ignorer = chatConfig.ignorer;
const gnok = chatConfig.gnok;
let use_gr = chatConfig.use_gr;
const grok = chatConfig.grok;
const grna = chatConfig.grna;
const tadda = chatConfig.tadda;
const tdela = chatConfig.tdela;
const symbols = chatConfig.symbols;
const deltxt = chatConfig.deltxt;
const fontnick = chatConfig.fontnick;
const fonttext = chatConfig.fonttext;
const privat_s = chatConfig.privat_s;
const icon1 = chatConfig.icon1;
const stn = chatConfig.stn;
const stn2 = chatConfig.stn2;
const icqtxt = chatConfig.icqtxt;
const away = chatConfig.away;
const mw_n = chatConfig.mw_n;
const mw_m = chatConfig.mw_m;
const mw_w = chatConfig.mw_w;
const ign_imgoff = chatConfig.ign_imgoff;
const ign_imgon = chatConfig.ign_imgon;

/** Размер шрифта сообщения/ника: индекс → px. */
function chatFontSizePx(size) {
  return chatConfig.fontSizeToPx(size);
}


//  --- ОБЩИЕ ФУНКЦИИ ЧАТА (ООП) -----------------------------------------------
//
//  Архитектура: каждый класс отвечает за одну область, глобальные функции —
//  тонкие обёртки для engine.js, onclick и setTimeout("...").
//
//  SoundService          — звуки
//  ReplyBlinker          — мерцание ответа
//  GraphNickRenderer     — графические ники
//  ChatImageResizer      — ресайз картинок
//  TitleNotifier         — счётчик в title
//  CookieStorage         — cookie
//  IgnoreService         — игнор
//  NickMessageFormatter  — форматирование ников/текста
//  ChatScrollManager     — прокрутка ленты
//  ChatLoadHandler       — onloaded
//  ChatMessageWriter     — wr()
//  NickListManager       — никлист
//  MessageRouter         — f()
//  RoomCounter           — update()
//  ChatInputController   — ввод сообщений
//  StatusManager         — ICQ-статус
//  RoomSwitcher          — смена комнаты
//  QuizGame              — викторина
//  HistoryViewer         — история
//  ChatFrameLoader       — loadframes()
//

/**
 * Воспроизведение звуков чата.
 * Управляет вкл/откл через чекбокс и localStorage.
 */
class SoundService {
  constructor(options = {}) {
    this._status = 1;
    this.storageKey = options.storageKey || 'sound';
    this.checkboxSelector = options.checkboxSelector || '#checkSound';
    this._checkbox = null;

    this._audioFiles = {
      0: 'personal-message.mp3',
      1: 'privat-message.mp3',
      6: 'chat-login.mp3',
      7: 'exit.mp3',
    };
    this._pool = {};
    this._audioUnlocked = false;
    this._unlockBound = false;
  }

  /** Совместимость со старыми проверками sound.status */
  get status() {
    return this._status;
  }

  /** Инициализация: чекбокс, чтение localStorage, обработчик change. */
  init() {
    this._checkbox = document.querySelector(this.checkboxSelector);
    this.loadStatus();
    if (this._checkbox) this.bindEvents();
    this.bindAudioUnlock();
  }

  /** Разблокировка autoplay после первого взаимодействия с чатом. */
  bindAudioUnlock() {
    if (this._unlockBound) return;
    this._unlockBound = true;

    const unlock = () => {
      if (this._audioUnlocked) return;
      this._audioUnlocked = true;
      this._warmUpAudio(1);
    };

    ['click', 'keydown', 'touchstart'].forEach((eventName) => {
      document.addEventListener(eventName, unlock, { once: true, capture: true });
    });

    const bindInputUnlock = () => {
      const input = document.querySelector('input[name="text0"]');
      if (input) input.addEventListener('focus', unlock, { once: true });
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bindInputUnlock, { once: true });
    } else {
      bindInputUnlock();
    }
  }

  /** Предзагрузка и разблокировка аудио для типа сообщения. */
  _warmUpAudio(type) {
    this._preparePool(type);
    const audio = this._pool[type];
    if (!audio) return;

    const prevVolume = audio.volume;
    audio.volume = 0.001;
    const promise = audio.play();
    if (!promise || typeof promise.then !== 'function') {
      audio.volume = prevVolume || 1;
      return;
    }

    promise.then(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 1;
    }).catch(() => {
      audio.volume = prevVolume || 1;
    });
  }

  _preparePool(type) {
    if (this._pool[type]) return;

    const candidates = this._audioCandidates(type);
    if (!candidates.length) return;

    const audio = new Audio(candidates[0]);
    audio.preload = 'auto';
    audio.addEventListener('error', () => {
      delete this._pool[type];
    }, { once: true });
    this._pool[type] = audio;
  }

  /** URL аудиофайла — сначала относительный путь, как у картинок в chat.inc. */
  _audioCandidates(type) {
    let file = this._audioFiles[type];
    if (type === 2) file = this._audioFiles[1];

    if (!file) return [];

    const bases = ['../assets/audio/', '/assets/audio/', 'assets/audio/'];
    const urls = [];

    for (const base of bases) {
      const url = `${base}${file}`;
      if (urls.indexOf(url) === -1) urls.push(url);
    }

    return urls;
  }

  /** Загружает сохранённую настройку звука из localStorage. */
  loadStatus() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved !== null) {
      this._status = Number(saved) === 1 ? 1 : 0;
    } else if (this._checkbox) {
      this._status = this._checkbox.checked ? 1 : 0;
    }

    if (this._checkbox) this._checkbox.checked = this._status === 1;
  }

  /** Сохраняет настройку при переключении чекбокса. */
  bindEvents() {
    this._checkbox.addEventListener('change', () => {
      this._status = this._checkbox.checked ? 1 : 0;
      localStorage.setItem(this.storageKey, String(this._status));
    });
  }

  isEnabled() {
    return this._status === 1;
  }

  /**
   * Воспроизводит звук по типу команды.
   * @param {number} cmd — 0: входящее, 1: приват, 2: приват-окно, 6: вход, 7: выход
   */
  play(cmd) {
    if (!this.isEnabled()) return false;

    const type = Number(cmd) === 2 ? 1 : Number(cmd);
    const candidates = this._audioCandidates(type);
    if (!candidates.length) return false;

    if (this._audioUnlocked) this._preparePool(type);

    const pooled = this._pool[type];
    if (pooled) {
      pooled.currentTime = 0;
      pooled.volume = 1;
      const promise = pooled.play();
      if (promise && typeof promise.catch === 'function') {
        promise.catch(() => {
          delete this._pool[type];
          this._playFromCandidates(candidates, 0);
        });
      }
      return true;
    }

    this._playFromCandidates(candidates, 0);
    return true;
  }

  _playFromCandidates(candidates, index) {
    if (index >= candidates.length) return;

    const audio = new Audio(candidates[index]);
    audio.preload = 'auto';

    const tryNext = () => {
      this._playFromCandidates(candidates, index + 1);
    };

    audio.addEventListener('error', tryNext, { once: true });

    const promise = audio.play();
    if (!promise || typeof promise.catch !== 'function') return;

    promise.catch(tryNext);
  }

  playPrivate() {
    return this.play(1);
  }
}

/** Глобальный экземпляр — используется как sound.play() по всему чату. */
const sound = new SoundService();

(function initSoundService() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => sound.init());
  } else {
    sound.init();
  }
})();


/**
 * Мерцание сообщения при клике на ссылку «см. ЧЧ:ММ:СС».
 */
class ReplyBlinker {
  constructor(options = {}) {
    this.containerSelector = options.containerSelector || '#leftdiv';
    this.blinkClass = options.blinkClass || 'blink';
    this.durationMs = options.durationMs || 3000;
  }

  /**
   * @param {string|number} msgId — data-id сообщения (ЧЧММСС)
   * @returns {boolean}
   */
  blink(msgId) {
    if ((msgId === null || msgId === undefined) || msgId === '') return false;

    const id = String(msgId);
    let div = document.querySelector(`${this.containerSelector} > div[data-id="${id}"]`);
    if (!div) return false;

    div.classList.add(this.blinkClass);

    const self = this;
    setTimeout(function () {
      div.classList.remove(self.blinkClass);
    }, this.durationMs);

    return true;
  }
}

const replyBlinker = new ReplyBlinker();

function blinking(msgId) {
  return replyBlinker.blink(msgId);
}


/**
 * Рендер графических ников (графник из gna или canvas-заглушка).
 */
class GraphNickRenderer {
  /** Генерирует PNG-заглушку с градиентом и текстом ника. */
  generateWelcomeImage(username) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 150;
    canvas.height = 50;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#FDF2F5');
    gradient.addColorStop(1, '#FFFFFF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = 'bold 15px Bressay Trial, sans-serif';
    ctx.fillStyle = '#4d2b0d';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(username, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL('image/png');
  }

  /**
   * @param {number} cmd — тип команды сообщения
   * @param {string} nick
   * @returns {string|null}
   */
  render(cmd, nick) {
    if (window.use_gn !== 1) return null;

    if ((gna[nick] !== null && gna[nick] !== undefined) && gna[nick]) {
      return `<img src="${gna[nick]}" class="graf_nick">`;
    }

    return `<img src="${this.generateWelcomeImage(nick)}" class="graf_nick">`;
  }
}

const graphNickRenderer = new GraphNickRenderer();

function setGraphNick(cmd, nick) {
  return graphNickRenderer.render(cmd, nick);
}


//-------------------------------------------------------------------------------------------------------------


/**
 * Ограничение размера загружаемых картинок в ленте.
 */
class ChatImageResizer {
  constructor(options = {}) {
    this.maxSize = options.maxSize || 200;
    this.containerId = options.containerId || 'leftdiv';
    this.nextId = 0;
  }

  /** Уменьшает изображение и прокручивает ленту вниз. */
  resize(obj) {
    let h = obj.height;
    let w = obj.width;

    if (h > this.maxSize || w > this.maxSize) {
      if (h > w) obj.height = this.maxSize;
      else obj.width = this.maxSize;
    }

    if (!obj.id) {
      let logArea = document.getElementById(this.containerId);
      logArea.scrollTop = logArea.scrollHeight;
      obj.id = this.nextId++;
    }
  }
}

const chatImageResizer = new ChatImageResizer();
let id_img = 0;

function imgminimum(obj) {
  chatImageResizer.resize(obj);
  id_img = chatImageResizer.nextId;
}


/**
 * Счётчик непрочитанных сообщений в заголовке вкладки.
 */
class TitleNotifier {
  constructor() {
    this.originalTitle = document.title;
    this.unreadCount = 0;
  }

  /** @param {number} increment — 1: +1, иначе сброс */
  update(increment) {
    if (increment === 1) {
      document.title = `[${++this.unreadCount}] ${this.originalTitle}`;
    } else {
      document.title = this.originalTitle;
      this.unreadCount = 0;
    }
  }
}

const titleNotifier = new TitleNotifier();
const title_zip = document.title;

function str_plus(a) {
  titleNotifier.update(a);
}


/** Открытие вспомогательного окна по центру экрана. */
class WindowOpener {
  open(url, name, w, h, scroll) {
    const lp = (screen.width) ? (screen.width - w) / 2 : 0;
    const tp = (screen.height) ? (screen.height - h) / 2 : 0;
    window.open(url, name, `height=${h},width=${w},top=${tp},left=${lp},scrollbars=${scroll},resizable`);
  }
}

const windowOpener = new WindowOpener();

function wo(url, name, w, h, scroll) {
  windowOpener.open(url, name, w, h, scroll);
}


/** Чтение и запись cookie чата. */
class CookieStorage {
  get(key) {
    const str = document.cookie;
    const len = str.length;
    if (len === 0) return '';

    let start = str.indexOf(`${key}=`);
    if (start === -1) return '';

    start = start + key.length + 1;
    let end = str.indexOf(';', start);
    if (end === -1) end = len;

    return unescape(str.substring(start, end));
  }

  set(key, value, min) {
    if (!key) return;
    if (!min) min = 60 * 24 * 365;

    const date = new Date();
    date.setTime(date.getTime() + (min * 60 * 1000));
    document.cookie = `${key}=${value}; expires=${date.toGMTString()}; path=/`;
  }
}

const cookieStorage = new CookieStorage();

function getcookie(key) {
  return cookieStorage.get(key);
}

function setcookie(key, str, min) {
  cookieStorage.set(key, str, min);
}

/**
 * Управление списком игнора (cookie + массив ign).
 */
class IgnoreService {
  constructor() {
    this.list = [''];
    this.reload();
  }

  /** Перечитывает список игнора из cookie. */
  reload() {
    this.list = getcookie(`${chatlogin.replace('-', '_')}_mpign`).split(',');
    window.ign = this.list;
  }

  /** Проверяет, находится ли ник в игноре. */
  isIgnored(nick) {
    for (let i = 0; i < this.list.length; i++) {
      if (nick === this.list[i]) return 1;
    }
    return 0;
  }

  /** Переключает игнор для ника и сохраняет в cookie. */
  toggle(nick) {
    let alreadyIgnored = this.isIgnored(nick);

    for (let i = 0; i < this.list.length; i++) {
      if (alreadyIgnored && nick === this.list[i]) this.list[i] = null;
      if (!alreadyIgnored && !this.list[i]) break;
    }

    if (!alreadyIgnored) this.list[i] = nick;

    setcookie(`${chatlogin.replace('-', '_')}_mpign`, escape(this.list.join(',')), 1000000);
    window.ign = this.list;
  }
}

const ignoreService = new IgnoreService();
window.ign = ignoreService.list;

function ign_sel(nick) {
  ignoreService.toggle(nick);
}

function ign_ok(nick) {
  return ignoreService.isIgnored(nick);
}


const CHAT_DARK_MSG_COLOR = '#eef2ff';

function isChatDarkTheme() {
  try {
    if (document.documentElement.classList.contains('chat-theme-dark')) return true;
    if (typeof SiteTheme !== 'undefined' && SiteTheme.isEnabled && SiteTheme.isEnabled()) return true;
    if (typeof localStorage !== 'undefined' && localStorage.getItem('chat_dark_theme') === '1') return true;
  } catch (e) {}
  return false;
}

function chatMessageTextColor(color) {
  return isChatDarkTheme() ? CHAT_DARK_MSG_COLOR : color;
}

/**
 * Форматирование ников и текста в ленте сообщений.
 */
class NickMessageFormatter {
  /** Убирает дублирующий ник в начале текста. */
  stripLeadingNick(text, nick, tonick) {
    const candidates = [];
    if (tonick) candidates.push(tonick);
    if (nick && nick !== tonick) candidates.push(nick);

    for (let i = 0; i < candidates.length; i++) {
      let p = candidates[i];
      if (!p || text.indexOf(p) !== 0) continue;

      let rest = text.substring(p.length);
      if (rest.charAt(0) === ':') {
        rest = rest.substring(1);
        if (rest.charAt(0) === ' ') rest = rest.substring(1);
        return rest;
      }
      if (rest.length && rest.charAt(0) !== ' ') return rest;
      break;
    }

    return text;
  }

  /** onclick для клика по нику: pub — [ник], priv — /privat. */
  buildNickClickAction(nick, tonickMode) {
    if (tonickMode === 'none') return 'return false;';
    const safe = String(nick).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    if (tonickMode === 'priv') return `ptonick('${safe}: '); return false;`;
    return `insertNickTag('${safe}'); return false;`;
  }

  /** Ссылка на ник в ленте (графник или font-обёртка). */
  wrapNickForMsg(cmd, nick, colornick, sizenick, facenick, tonickMode) {
    let gn = setGraphNick(cmd, nick);
    let graphic = (gn && gn.indexOf('<') !== -1);
    let oc = this.buildNickClickAction(nick, tonickMode);
    let open = ` <a href='' onclick="${oc}">`;

    if (graphic) return `${open}${gn}</a>`;
    return `${open}<span class="chat-msg__nick" style="color:${colornick};font-size:${chatFontSizePx(sizenick)};font-family:${facenick}">${gn}</span></a> `;
  }

  /** Префикс ника в начале текста сообщения. */
  wrapInlineTonick(cmd, tonick, size, color, face, tonickMode) {
    let gn = setGraphNick(cmd, tonick);
    let graphic = (gn && gn.indexOf('<') !== -1);
    let oc = this.buildNickClickAction(tonick, tonickMode);
    let open = `<a href='' onclick="${oc}">`;

    if (graphic) return `${open}${gn}</a>`;
    return `${open}<span class="chat-msg__nick" style="color:${color};font-size:${chatFontSizePx(size)};font-family:${face}">${gn}</span></a>`;
  }

  /** Заменяет [ник] в тексте на кликабельный графник (можно несколько раз в одном сообщении). */
  expandNickTokens(text, cmd, size, color, face, tonickMode) {
    if (!text || text.indexOf('[') === -1) return text;
    const mode = tonickMode || ((cmd === 1 || cmd === 2) ? 'priv' : 'pub');
    return text.replace(/\[([^\[\]\r\n]+?)\]/g, (match, nickName) => {
      const nick = String(nickName).trim();
      if (!nick) return match;
      return this.wrapInlineTonick(cmd, nick, size, color, face, mode);
    });
  }

  /** Подпись бота «Снамик» в ленте. */
  snamikBotLabel(cmd, sizenick, facenick) {
    const sBot = 'Снамик';
    let gn = setGraphNick(cmd, sBot);
    let isDefaultNickPlate = (gn && gn.indexOf('position:relative') !== -1 &&
      (gn.indexOf('4080531237') !== -1 || gn.indexOf('3984787100') !== -1));

    if (gn && gn.indexOf('<') !== -1 && !isDefaultNickPlate) {
      return ` <span class='snimik-bot-label snimik-bot-label--graphic'>${gn}</span> `;
    }

    return ` <span class='snimik-bot-label'><span class="snimik-bot-label__fallback" face='${facenick}'><span class="chat-msg__bold">${sBot}</span></span></span> `;
  }

  /** Градиентный текст (если включён use_gr). */
  applyGradient(cmd, nick, text) {
    if (use_gr !== 1) return text;
    if ((gra[nick] !== null && gra[nick] !== undefined) && gra[nick] && grok[cmd] === 1) return gr(text, gra[nick]);
    return text;
  }

  /** Есть ли в тексте обращение к нику: [ник] или « ник:». */
  messageMentionsNick(sourceText, targetNick) {
    if (!sourceText || !targetNick) return false;
    const esc = String(targetNick).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (new RegExp(`\\[${esc}\\]`).test(sourceText)) return true;
    return sourceText.split(` ${targetNick}:`).length > 1;
  }

  /** Проверяет, адресовано ли сообщение текущему пользователю. */
  isAddressedToMe(nick, tonick, text, rawText) {
    if (nick === mynick) return false;
    if (tonick === mynick) return true;
    const source = rawText != null ? rawText : text;
    return this.messageMentionsNick(source, mynick);
  }

  /** Обёртка «Сообщение для Вас» для адресованных сообщений. */
  wrapForMe(content) {
    return `<div class="message-for-me"><div class="message-for-me__header"><span class="message-for-me__icon" aria-hidden="true">✉</span><span class="message-for-me__label">Сообщение для Вас</span></div><div class="message-for-me__body">${content}</div></div>`;
  }

  /** Обёртка «Сообщение для всех» для команды /vsem. */
  wrapForEveryone(set_time, set_nick, text) {
    return `<div class="message-for-everyone"><div class="message-for-everyone__header"><span class="message-for-everyone__icon" aria-hidden="true">📢</span><span class="message-for-everyone__label">Сообщение для всех</span></div><div class="message-for-everyone__body">${set_time}${set_nick}${text}</div></div>`;
  }

  /** Текст сообщения с цветом/размером/шрифтом пользователя. */
  wrapMsgText(content, color, size, face, extraClass) {
    const cls = extraClass ? `chat-msg__text ${extraClass}` : 'chat-msg__text';
    return ` <span class="${cls}" style="color:${color};font-size:${chatFontSizePx(size)};font-family:${face}">${content}</span> `;
  }

  /** Ник с динамическим цветом; modClass: sm | lg. */
  wrapColoredNick(content, colornick, modClass) {
    const mod = modClass ? ` chat-msg__nick--${modClass}` : '';
    return `<span class="chat-msg__nick${mod}" style="color:${colornick}">${content}</span>`;
  }

  wrapGreet(content) {
    return `<span class="chat-msg__greet">${content}</span>`;
  }

  wrapJoinWelcome(bodyContent) {
    return `<div class="message-join"><div class="message-join__header"><span class="message-join__icon" aria-hidden="true">🎉</span><span class="message-join__label">Вход в чат</span></div><div class="message-join__body">${bodyContent}</div></div>`;
  }

  wrapLeaveWelcome(bodyContent) {
    return `<div class="message-leave"><div class="message-leave__header"><span class="message-leave__icon" aria-hidden="true">👋</span><span class="message-leave__label">Выход из чата</span></div><div class="message-leave__body">${bodyContent}</div></div>`;
  }

  wrapAdminNickLink(nick, colornick) {
    return `<a href='' class="chat-msg__admin-nick-link" onclick="insertNickTag('${nick}'); return false;">${this.wrapColoredNick('АДМИНИСТРАЦИЯ', colornick)}</a>`;
  }

  wrapAdminModeration(nick, colornick, action, target, duration, reason, kill) {
    let modClass = 'moderation';
    if (kill === 6) modClass = 'warn';
    else if (kill === 5) modClass = 'kick';
    else if (kill === 4) modClass = 'spam';
    let extra = '';
    if (duration) extra += `<span class="chat-msg__admin-duration">${duration}</span>`;
    if (reason) extra += `<span class="chat-msg__admin-reason">${reason}</span>`;
    const extraBlock = extra ? `<div class="chat-msg__admin-extra">${extra}</div>` : '';
    return `<div class="chat-msg__admin chat-msg__admin--${modClass}"><span class="chat-msg__admin-icon" aria-hidden="true">⚖</span><div class="chat-msg__admin-body"><span class="chat-msg__admin-badge">Модерация</span><div class="chat-msg__admin-line">${this.wrapAdminNickLink(nick, colornick)} <span class="chat-msg__admin-action">${action}</span> <span class="chat-msg__admin-target">${target}</span>.</div>${extraBlock}</div></div>`;
  }

  wrapAdminNotice(type, title, message) {
    const icons = {
      clear: '⌫',
      reload: '↻',
      alert: '⚠',
      ignore: '⊘',
      remove: '✕',
      deportation: '🔒',
      amnesty: '🔓',
      ping: '◎'
    };
    const icon = icons[type] || '⚙';
    return `<div class="chat-msg__admin chat-msg__admin--${type}"><span class="chat-msg__admin-icon" aria-hidden="true">${icon}</span><div class="chat-msg__admin-body"><span class="chat-msg__admin-badge">${title}</span><div class="chat-msg__admin-line">${message}</div></div></div>`;
  }

  wrapAdminPublicAction(nick, colornick, type, action, target, detail) {
    const titles = { deportation: 'Темница', amnesty: 'Амнистия' };
    const icons = { deportation: '🔒', amnesty: '🔓' };
    const title = titles[type] || 'Модерация';
    const icon = icons[type] || '⚖';
    const detailBlock = detail ? `<div class="chat-msg__admin-extra"><span class="chat-msg__admin-detail">${detail}</span></div>` : '';
    return `<div class="chat-msg__admin chat-msg__admin--${type}"><span class="chat-msg__admin-icon" aria-hidden="true">${icon}</span><div class="chat-msg__admin-body"><span class="chat-msg__admin-badge">${title}</span><div class="chat-msg__admin-line">${this.wrapAdminNickLink(nick, colornick)} <span class="chat-msg__admin-action">${action}</span> <span class="chat-msg__admin-target">${target}</span>.</div>${detailBlock}</div></div>`;
  }

  wrapStatusChange(nick, set_nick, colornick, statusIndex) {
    const idx = Number(statusIndex);
    const meta = (chatConfig.statusMeta && chatConfig.statusMeta[idx])
      ? chatConfig.statusMeta[idx]
      : { label: 'обновил статус', icon: '●', gif: chatConfig.statusGifUrl(idx) };
    const gifSrc = meta.gif || chatConfig.statusGifUrl(idx);
    const nickLink = `<a href='' class="chat-msg__status-nick-link" onclick="insertNickTag('${nick}'); return false;">${this.wrapColoredNick(set_nick, colornick, 'sm')}</a>`;
    const mediaBlock = gifSrc
      ? `<div class="chat-msg__status-media"><img src="${gifSrc}" alt="" width="44" height="44"></div>`
      : `<div class="chat-msg__status-media chat-msg__status-media--icon"><span class="chat-msg__status-icon" aria-hidden="true">${meta.icon}</span></div>`;
    return `<div class="chat-msg__status chat-msg__status--${idx}">${mediaBlock}<div class="chat-msg__status-content"><div class="chat-msg__status-head"><span class="chat-msg__status-chip"><span class="chat-msg__status-chip-icon" aria-hidden="true">${meta.icon}</span>${meta.label}</span></div><div class="chat-msg__status-nick">${nickLink}</div></div></div>`;
  }

  wrapJoinNick(content) {
    return `<span class="chat-msg__join-nick">${content}</span>`;
  }

  wrapLeaveNick(content) {
    return `<span class="chat-msg__leave-nick">${content}</span>`;
  }

  wrapWarn(content) {
    return `<span class="chat-msg__warn">${content}</span>`;
  }

  wrapModeration(content) {
    return `<span class="chat-msg__moderation">${content}</span>`;
  }

  wrapDice(content) {
    return `<span class="chat-msg__dice">${content}</span>`;
  }

  wrapDevBroadcast(set_time, set_nick, text) {
    return `<div class="message-for-dev"><div class="message-for-dev__header"><span class="message-for-dev__icon" aria-hidden="true">🌸</span><span class="message-for-dev__label">Сообщение для девушек</span></div><div class="message-for-dev__body">${set_time}${set_nick}${text}</div></div>`;
  }

  wrapParnBroadcast(set_time, set_nick, text) {
    return `<div class="message-for-parn"><div class="message-for-parn__header"><span class="message-for-parn__icon" aria-hidden="true">👔</span><span class="message-for-parn__label">Сообщение для парней</span></div><div class="message-for-parn__body">${set_time}${set_nick}${text}</div></div>`;
  }

  wrapForumNotice(nick, set_nick, topicTitle, topicId, forumId) {
    return `<div class="chat-msg__forum"><div class="chat-msg__forum-icon-wrap"><div class="chat-msg__forum-icon">!</div></div><div class="chat-msg__forum-body"><h2 class="chat-msg__forum-title">Внимание!</h2><p class="chat-msg__forum-text">Новое сообщение от <a href="?inc=info&nick=${nick}" target="_blank" class="chat-msg__forum-link">${set_nick}</a> в теме форума <a href="?inc=forum&forum=${forumId}&topic=${topicId}" target="_blank" class="chat-msg__forum-link">"${topicTitle}"</a>.</p></div></div>`;
  }
}

const nickMessageFormatter = new NickMessageFormatter();

function stripLeadingNickFromText(text, nick, tonick) {
  return nickMessageFormatter.stripLeadingNick(text, nick, tonick);
}

function wrapNickForMsg(cmd, nick, colornick, sizenick, facenick, tonickMode) {
  return nickMessageFormatter.wrapNickForMsg(cmd, nick, colornick, sizenick, facenick, tonickMode);
}

function wrapInlineTonick(cmd, tonick, size, color, face, tonickMode) {
  return nickMessageFormatter.wrapInlineTonick(cmd, tonick, size, color, face, tonickMode);
}

function snamikBotLabelHtml(cmd, sizenick, facenick) {
  return nickMessageFormatter.snamikBotLabel(cmd, sizenick, facenick);
}

function setgr(cmd, nick, text) {
  return nickMessageFormatter.applyGradient(cmd, nick, text);
}


/** Плавная прокрутка ленты и триггер onloaded при первой загрузке. */
class ChatScrollManager {
  scrollUp() {
    const leftdiv = document.getElementById('leftdiv');

    if (loaded === 0) {
      leftdiv.scrollTop = 0;
      chatLoadHandler.onLoaded();
    }

    let left = leftdiv.scrollHeight - leftdiv.clientHeight - leftdiv.scrollTop;
    if ((left <= 0 && ++delayed > 20) || (scrolled === 1 && left > 250)) {
      delayed = 0;
      return;
    }

    leftdiv.scrollTop = Math.ceil(leftdiv.scrollTop + left / (1 + slowscroll));
    const self = this;
    setTimeout(function () { self.scrollUp(); }, 20);
  }
}

const chatScrollManager = new ChatScrollManager();
if (typeof loaded === 'undefined') window.loaded = 0;
if (typeof scrolled === 'undefined') window.scrolled = 0;
if (typeof delayed === 'undefined') window.delayed = 0;

/**
 * Переменные бота (nick_r, color_r, room_r и др. задаются PHP через var).
 * room_r/status_r/inchat_r здесь не объявляем — иначе конфликт с PHP после замены var→let.
 */
if (typeof room_r === 'undefined') window.room_r = 0;
if (typeof status_r === 'undefined') window.status_r = 0;
if (typeof inchat_r === 'undefined') window.inchat_r = '1';
if (typeof mymw === 'undefined') window.mymw = '';


/**
 * Действия после загрузки фрейма сообщений.
 */
class ChatLoadHandler {
  onLoaded() {
    const self = this;
    window.setTimeout(function () { scrolled = 1; }, 5000);

    if (interval) {
      window.clearTimeout(interval);
      interval = '';
    }

    if (topic) wr(topic);

    for (let i = 0; i < rooms.length; i++) update(i, 0);

    const isDeportation = getcookie(`${chatlogin.replace('-', '_')}_deportation`);
    if (isDeportation === 1 && myroom !== 5) {
      window.setTimeout(function () { setmyroom(5); }, 2000);
    }

    if (setcursor) {
      document.onkeydown = function () {
        document.fmsg.text0.focus();
      };
    }

    if (nomousemenu) {
      document.oncontextmenu = function () { return false; };
      document.onmousedown = function (e) {
        if (e && e.type === 'contextmenu') return false;
      };
    }

    room_r = 0;
    status_r = 0;
    inchat_r = '1';

    if (nick_r) {
      loaded = 1;
      f(room_r, 6, nick_r, '', inchat_r, '', color_r, '', mw_r, st_r, icon_r, status_r, love_r, clan_r, userid_r);
      loaded = 0;
    }

    loaded = 1;
    nickListManager.rebuildVisibleNickList();
    roomCounter.syncOnlineCount();
  }
}

const chatLoadHandler = new ChatLoadHandler();

function onloaded() {
  chatLoadHandler.onLoaded();
}

function up() {
  chatScrollManager.scrollUp();
}

function isMessageAddressedToMe(nick, tonick, text, rawText) {
  return nickMessageFormatter.isAddressedToMe(nick, tonick, text, rawText);
}

function wrapMessageForMe(content) {
  return nickMessageFormatter.wrapForMe(content);
}

function nickEquals(a, b) {
  const left = chatStr(a).trim().toLowerCase();
  const right = chatStr(b).trim().toLowerCase();
  return left !== '' && left === right;
}

/** Входящее приватное сообщение для текущего пользователя. */
function shouldNotifyPrivateSound(nick, tonick) {
  if (typeof mynick === 'undefined' || !mynick) return false;
  if (nickEquals(nick, mynick)) return false;
  return nickEquals(tonick, mynick);
}

function notifyIncomingPrivateSound(nick, tonick) {
  if (!shouldNotifyPrivateSound(nick, tonick)) return;
  sound.playPrivate();
}

/** Пол текущего пользователя: 0 — мужской, 1 — женский. */
function getMyMw() {
  const cached = chatStr(mymw);
  if (cached === '0' || cached === '1') return cached;
  if (typeof us === 'undefined' || typeof mynick === 'undefined' || !mynick) return '';
  for (let i = 0; i < us.length; i++) {
    if (us[i] && us[i][0] === mynick) {
      const mw = chatStr(us[i][3]);
      if (mw === '0' || mw === '1') return mw;
    }
  }
  return '';
}

/** Звук для /dev и /parn — только целевой аудитории. */
function shouldPlayGenderBroadcastSound(kind) {
  const mw = getMyMw();
  if (kind === 'dev') return mw === '1';
  if (kind === 'parn') return mw === '0';
  return false;
}

/**
 * Запись HTML-сообщений в ленту чата (#leftdiv).
 * Создаёт DOM-элемент, привязывает data-id по времени и прокручивает ленту.
 */
class ChatMessageWriter {
  /**
   * @param {Object} options
   * @param {string} [options.containerId='leftdiv'] — id контейнера ленты сообщений
   * @param {string} [options.timeClass='time-message'] — CSS-класс элемента времени
   */
  constructor(options = {}) {
    this.containerId = options.containerId || 'leftdiv';
    this.timeClass = options.timeClass || 'time-message';
    this.timePattern = /\b(\d{2}:\d{2}:\d{2})\b/;
  }

  /** Возвращает DOM-контейнер ленты сообщений. */
  getContainer() {
    return document.getElementById(this.containerId);
  }

  /**
   * Удаляет самое старое сообщение, если превышен лимит maxmsgs.
   * Работает только после полной загрузки чата (loaded === 1).
   * @param {HTMLElement} container
   */
  trimOldMessages(container) {
    if (loaded !== 1 || !(maxmsgs > 0)) return;

    let count = container.getElementsByTagName('div').length;
    if (maxmsgs >= count) return;

    container.removeChild(container.getElementsByTagName('div')[0]);
  }

  /**
   * Создаёт DOM-элемент сообщения из HTML-строки.
   * @param {string} text — HTML-разметка сообщения
   * @returns {HTMLDivElement}
   */
  createMessageElement(text) {
    const div = document.createElement('div');
    div.innerHTML = text;
    return div;
  }

  /**
   * Извлекает время сообщения для data-id.
   * Сначала ищет элемент .time-message, затем — паттерн ЧЧ:ММ:СС в тексте.
   * @param {string} text — исходная HTML-строка
   * @param {HTMLElement} element — созданный DOM-элемент
   * @returns {string|null}
   */
  extractTime(text, element) {
    let timeEl = element.querySelector(`.${this.timeClass}`);
    let timeStr = timeEl ? timeEl.textContent : null;

    if (!timeStr) {
      let timeMatch = text.match(this.timePattern);
      if (timeMatch) timeStr = timeMatch[1];
    }

    return timeStr;
  }

  /**
   * Привязывает data-id к сообщению (формат: ЧЧММСС без двоеточий).
   * Используется для мерцания при клике на «см. ЧЧ:ММ:СС».
   * @param {HTMLElement} element
   * @param {string|null} timeStr
   */
  setMessageId(element, timeStr) {
    if (!timeStr) return;

    element.dataset.id = timeStr.replace(/\:/g, '');
  }

  /** Прокручивает ленту вниз после добавления сообщения. */
  scrollIfLoaded() {
    if (loaded === 1) up();
  }

  /**
   * Добавляет HTML-сообщение в ленту чата.
   * @param {string} text — HTML-разметка сообщения
   */
  write(text) {
    const container = this.getContainer();
    if (!container) return;

    this.trimOldMessages(container);

    let div = this.createMessageElement(text);
    let timeStr = this.extractTime(text, div);
    this.setMessageId(div, timeStr);

    container.appendChild(div);
    this.scrollIfLoaded();
  }
}

/** Экземпляр писателя сообщений — единая точка вывода в ленту. */
const chatMessageWriter = new ChatMessageWriter();

/**
 * Глобальная обёртка — сохранена для вызовов из f(), onclick и setTimeout.
 * @param {string} text — HTML-разметка сообщения
 */
function wr(text) {
  chatMessageWriter.write(text);
}


/* [Функции - формирования никлиста] */

/** Число из PHP/WebSocket (строка "3" и число 3 — одна комната). */
function chatNum(value) {
  const n = Number(value);
  return Number.isNaN(n) ? value : n;
}

function sameRoom(a, b) {
  return chatNum(a) === chatNum(b);
}

function chatStr(value) {
  return value === null || value === undefined ? '' : String(value);
}

/**
 * Управление никлистом: добавление, удаление, секции по полу/рангу.
 */
class NickListManager {
  constructor() {
    this.userCount = 0;
    this.users = [];
    this.sectionCounts = [];
    this.insertIndex = 0;
  }

  /** Вставляет строку никлиста на позицию index. */
  insertRowAt(index) {
    const ul = document.getElementById('ul');
    const row = document.createElement('div');
    row.className = 'nick-list__row';

    if (!ul.children.length || index >= ul.children.length) ul.appendChild(row);
    else ul.insertBefore(row, ul.children[index]);

    return row;
  }

  /** Удаляет DOM-элемент строки никлиста. */
  removeRow(el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  /** Обновляет счётчик секции (man/woman/adm/...) и возвращает позицию вставки. */
  updateSection(sectionId, delta) {
    if ((ucc[`${sectionId}c`] === null || ucc[`${sectionId}c`] === undefined)) ucc[`${sectionId}c`] = delta;
    else ucc[`${sectionId}c`] += delta;

    let section = document.getElementById(sectionId);
    if (!section) return 0;

    section.style.display = '';
    if (ucc[`${sectionId}c`] === 0) section.style.display = 'none';

    if (delta === 1) {
      const ul = document.getElementById('ul');
      for (let j = 0; j < ul.children.length; j++) {
        if (ul.children[j] === section) return j + 1;
      }
    }
  }

  /** Определяет секцию никлиста по полу и статусу. */
  applySeparateRules(type, st, mw) {
    if (!useseparate) return;

    const mwS = chatStr(mw);
    const stS = chatStr(st);

    if (mwS === '0') index = this.updateSection('man', type);
    else if (mwS === '1') index = this.updateSection('woman', type);
    else if (mwS === '') index = this.updateSection('noman', type);

    if (stS === '1' || stS === '2' || stS === '3' || stS === '9' || stS === '11' || stS === '14') {
      index = this.updateSection('adm', type);
    }
  }

  /** Перерисовывает никлист из массива us (после onloaded или смены комнаты). */
  rebuildVisibleNickList() {
    const ul = document.getElementById('ul');
    if (!ul) return;

    ul.querySelectorAll('.nick-list__row[id^="!"]').forEach(function (row) {
      row.parentNode.removeChild(row);
    });
    ucc = new Array();

    for (let i = 0; i < us.length; i++) {
      if ((us[i] === null || us[i] === undefined)) continue;
      if (!sameRoom(us[i][6], myroom)) continue;

      const nickid = `!${us[i][0]}`;
      index = ul.children.length;
      this.applySeparateRules(1, us[i][2], us[i][3]);

      const obj = this.insertRowAt(index);
      obj.id = nickid;
      this.renderRow(i, obj);
    }
  }

  /** Добавляет или обновляет пользователя в массиве и DOM. */
  addUser(nick, colornick, st, mw, icon, status, inchat, time, room, love, clan, userid) {
    const l = us.length;
    let i;
    for (i = 0; i < l; i++) if ((us[i] !== null && us[i] !== undefined) && us[i][0] === nick) break;

    us[i] = [nick, colornick, st, mw, icon, status, room, love, clan, userid];

    if (i === l) {
      uc++;
      update(room, 1);
    }

    if (loaded !== 1) return;

    if (sameRoom(room, myroom)) {
      const nickid = `!${nick}`;
      let obj = document.getElementById(nickid);
      if (obj) this.removeRow(obj);

      index = document.getElementById('ul').children.length;
      this.applySeparateRules(1, st, mw);

      obj = this.insertRowAt(index);
      obj.id = nickid;
      this.renderRow(i, obj);
    }
  }

  /** Удаляет пользователя из массива и DOM. */
  removeUser(nick, colornick, st, mw, icon, status, inchat, time, room, userid) {
    for (let i = 0; i < us.length; i++) {
      if ((us[i] !== null && us[i] !== undefined) && us[i][0] === nick) {
        uc--;
        update(us[i][6], -1);
        us[i] = null;
        break;
      }
    }

    if (loaded !== 1) return;

    if (sameRoom(room, myroom)) {
      const nickid = `!${nick}`;
      let obj = document.getElementById(nickid);
      this.removeRow(obj);
      this.applySeparateRules(-1, st, mw);
    }
  }

  /** Рендерит HTML одной строки никлиста. */
  renderRow(i, row) {
    if ((us[i] === null || us[i] === undefined)) return '';

    let nick = us[i][0], color = us[i][1], stat = us[i][2], stat2 = us[i][5];
    let mw_u = us[i][3], icon = us[i][4], love = us[i][7], clan = us[i][8];

    let set_nick = setGraphNick(11, nick);
    let set_privat = privat_s;

    if (icon_on) {
      if (icon === '' || icon === 0) icon = icon1;
      icon = `<img class='icon_img' src='${icon}'>`;
      set_privat = icon;
    }

    const st = (stn[stat] !== null && stn[stat] !== undefined) ? stn[stat] : '';
    const icqst = chatConfig.statusNickListIconHtml(stat2);

    let mw = mw_n;
    const mwS = chatStr(mw_u);
    if (mwS === '0') mw = mw_m;
    if (mwS === '1') mw = mw_w;

    let set_love = '';
    if (love) {
      set_love = `<a href='index.php?inc=info&nick=${love}' class="icon-love" title='Обручен(а) с ${love}' target=_blank></a>`;
    }

    let set_clan = '';
    if (clan > 0) {
      set_clan = `<a href='index.php?inc=clan&clan=${clan}' class="icon-clan" title='Клан' target='_blank'></a>`;
    }

    let ign_st = 'off', ign_img = ign_imgoff;
    if (ign_ok(us[i][0])) {
      ign_st = 'on';
      ign_img = ign_imgon;
    }

    let set_ign = `<img src='${ign_img}' style='width:18px;height:18px;cursor:pointer;border:0;vertical-align:middle;transition:all .2s' title='Игнор: ${ign_st}' onclick="ign_sel('${nick}');if(ign_ok('${nick}')){this.src='${ign_imgon}';this.title='Игнор: on';this.style.filter='hue-rotate(0deg)'}else{this.src='${ign_imgoff}';this.title='Игнор: off';this.style.filter=''}">`;
    if (nick === mynick) set_ign = "<span class='nick-list__ign-spacer'></span>";

    set_privat = `<a href='' onclick="ptonick('${nick}: ');return false" class='nick-list__privat-link'>${set_privat}</a>`;

    const nickColor = color ? (String(color).charAt(0) === '#' ? color : `#${color}`) : '';
    set_nick = `<a href=''${nickColor ? ` style='color:${nickColor}'` : ''} onclick="insertNickTag('${nick}');return false">${set_nick}</a>`;
    const set_mw = `<a href="index.php?inc=info&nick=${us[i][0]}" target="_blank" class='nick-list__mw'>${mw}</a>`;

    row.className = 'nick-list__row';
    row.innerHTML =
      `<div class="nick-list__privat">${set_privat}</div><div class="nick-list__body"><div class="nick-list__nick">${set_nick}</div><div class="nick-list__icons">${icqst}${set_mw}${st}${set_clan}${set_love}</div></div><div class="nick-list__ign">${set_ign}</div>`;
  }
}

const nickListManager = new NickListManager();
if (typeof uc === 'undefined') window.uc = 0;
let us = new Array();
let ucc = new Array();
let index = 0;

function nicklistInsertAt(index) {
  return nickListManager.insertRowAt(index);
}

function nicklistRemove(el) {
  nickListManager.removeRow(el);
}

function separate(obj, c) {
  return nickListManager.updateSection(obj, c);
}

function seprules(type, st, mw) {
  nickListManager.applySeparateRules(type, st, mw);
}

function add(nick, colornick, st, mw, icon, status, inchat, time, room, love, clan, userid) {
  nickListManager.addUser(nick, colornick, st, mw, icon, status, inchat, time, room, love, clan, userid);
}

function deleteUser(nick, colornick, st, mw, icon, status, inchat, time, room, userid) {
  nickListManager.removeUser(nick, colornick, st, mw, icon, status, inchat, time, room, userid);
}

function format(i, row) {
  nickListManager.renderRow(i, row);
}


/* [Функция - вывода сообщений и команд] */

const pu = new Array;
const pt = new Array;

/**
 * Runtime-переменные MessageRouter
 * var — намеренно: PHP может объявить те же имена (status, mw…); let даёт SyntaxError.
 */
var inchat, mw, st, icon, status, love, clan;
var kill, timeout;
var sizenick, size, facenick, face;
var set_nick, set_text, set_time;
var symbol, symbol2, towr;
var timeremovez, delay_r;
var a1, a2, a3;
var pnick;
var act, kill_timeout;
var oldroom, setroom, text1;
var tadd, tdel;

/**
 * Маршрутизатор входящих сообщений чата.
 * Обрабатывает все типы cmd (0–11): текст, приват, вход/выход, модерация и т.д.
 */
class MessageRouter {
  handle(room, cmd, nick, tonick, text, time, colornick, color, var9, var10, var11, var12, var13, var14) {
    cmd = chatNum(cmd);
    room = chatNum(room);
    if (typeof SNAMIK_BOT !== 'undefined' && SNAMIK_BOT && SNAMIK_BOT.hookIncoming) {
      try {
        if (SNAMIK_BOT.hookIncoming.apply(null, arguments)) return;
      } catch (e) {
      }
    }
    if (ign_ok(nick) && cmd !== 6 && cmd !== 7) return;
    try {
      if (text.split('src=tmp').length > 1 && parent.users.document.getElementById('kartinka').checked) {
        text = text.replace(/.br..img.src.(tmp.(.+\.jpg)).border.0..br./igm, "<a href=$1 target=_blank><img src=http://mpchat.com/blank/img/ftp/img.gif border=0> $2</a>")
      } else {
        text = text.replace(/.br..img.src.(tmp.(.+\.jpg)).border.0..br./igm, "<img onload=parent.imgminimum(this) src=$1 border=0>")
      }
    } catch (e) {
      text = text.replace(/.br..img.src.(tmp.(.+\.jpg)).border.0..br./igm, "<img onload=imgminimum(this) src=$1 border=0>");
    }


    if (nick === nick_r && !sameRoom(room, room_r)) return;
    if (tonick === mynick && loaded === 1) str_plus(1);

    let adminNoticeHtml = null;

    // автоматическое уменьшение размера загружаемых изображений в чат через кнопку обзор
    text = text.replace(/.br..img.src.(tmp.(.+\.(gif|jpg|jpeg|bmp|png|tif|tiff))).border.0..br./igm, "<img onload=imgminimum(this) src=$1 border=0>");
// начало обработки тега media
    if (img_no === 0) {
      text = text.replace(/\[media\]((?:http|https):\/\/(.*?)\.(gif|jpg|jpeg|bmp|png|tif|tiff|webp))\[\/media\]/mig, '<a href="$1" target="_blank" ><img onload=parent.imgminimum(this) src=$1 title="открыть в новом окне"  style="max-height:100px;" border=0></a> ')
    } else {
      text = text.replace(/\[media\]((?:http|https):\/\/(.*?)\.(gif|jpg|jpeg|bmp|png|tif|tiff|webp))\[\/media\]/mig, '<a href=./index.php?inc=go&url=$1 target=_blank><img src=http://mpchat.com/blank/img/ftp/img.gif border=0 alt=""> $2.$3</a>')
    }

    if (img_no === 1) {
      text = text.replace(/\[media\](http:\/\/(.*?))\[\/media\]/mig, '<a href=./index.php?inc=go&url=$1 target=_blank>$1</a>')
    }

    text = text.replace(/\[media\](http:\/\/zoom\.it\/(.*?))\[\/media\]/mig, '<script src="$1.js?width=auto&height=200px"></script><a href="$1" target="_blank" title="ссылка откроется в новом окне">link</a>');

    text = text.replace(/\[media\](http:\/\/www\.divshare\.com\/download\/(.*?))\[\/media\]/mig, `<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="335" height="28" id="divplaylist"><param name="movie" value="http://www.divshare.com/flash/playlist?myId=$2" /><param name="allowScriptAccess" value="always" /><embed src="http://www.divshare.com/flash/playlist?myId=$2" width="335" height="28" allowScriptAccess="always" name="divplaylist" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed></object>`);

    text = text.replace(/\[media\](http:\/\/prostopleer\.com\/tracks\/(.*?))\[\/media\]/mig, '<object width="411" height="28"><param name="movie" value="http://embed.prostopleer.com/track?id=$2"></param><embed src="http://embed.prostopleer.com/track?id=$2" type="application/x-shockwave-flash" width="411" height="28"></embed></object>');

    text = text.replace(/\[media\](http:\/\/pleer\.com\/tracks\/(.*?))\[\/media\]/mig, '<object width="411" height="28"><param name="wmode" value="transparent"><param name="movie" value="http://embed.prostopleer.com/track?id=$2"></param><embed src="http://embed.prostopleer.com/track?id=$2" wmode="transparent"  type="application/x-shockwave-flash" width="411" height="28"></embed></object>');

    text = text.replace(/\[media\](http:\/\/muzebra\.com\/l\/(.*?)\/)\[\/media\]/mig, '<object width="395" height="42"><param name="movie" value="http://embed.muzebra.com/player?id=$2"></param><embed src="http://embed.muzebra.com/player?id=$2" type="application/x-shockwave-flash" width="395" height="42"></embed><param name="wmode" value="transparent"/><param name="scale" value="noscale" /></object>');

    text = text.replace(/\[media\]http:\/\/music\.yandex\.ru\/#!\/track\/(.*?)\/album\/(.*?)\[\/media\]/mig, '<object width="350" height="28"><param name="muz" value="http://music.yandex.ru/embed/$1/track.swf"/><param value="noscale" name="scale"/><param value="bg-color=%23D8D8D8&amp;text-color=%23555555&amp;hover-text-color=%23000000" name="flashvars"/><embed type="application/x-shockwave-flash" width="350" height="28" scale="noscale" flashvars="bg-color=%23D8D8D8&amp;text-color=%23555555&amp;hover-text-color=%23000000" src="http://music.yandex.ru/embed/$1/track.swf"/></object>');

    text = text.replace(/\[media\]((?:http|https):\/\/.*mp3)\[\/media\]/mig, '<audio src="$1" controls></audio>');

    /* Присвоение переменных */
    if (cmd === 5) {
      kill = var9;
      timeout = var10;
    } else if (cmd === 6 || cmd === 7) {
      inchat = text;
      mw = var9;
      st = var10;
      icon = var11;
      status = var12;
      love = var13;
      clan = var14;
      if (colornick === '') colornick = fontnick[0]; else colornick = `#${colornick}`;
      if (color === '') color = fonttext[0]; else color = `#${color}`;
      /* скрыть ник невидимки */
      if (invisible[nick]) return;
    } else {
      sizenick = var9;
      size = var10;
      facenick = var11;
      face = var12;
      if (colornick === '') colornick = fontnick[0]; else colornick = `#${colornick}`;
      if (sizenick === '') sizenick = fontnick[1];
      if (facenick === '') facenick = fontnick[2];
      if (color === '') color = fonttext[0]; else color = `#${color}`;
      if (size === '') size = fonttext[1];
      if (face === '') face = fonttext[2];
      sizenick = chatFontSizePx(sizenick);
      size = chatFontSizePx(size);
    }

    /* BB-коды, например для загруженного файла [file] или [media] из интеренета */
    let etags = new Array();
    let i = 0;
    /* Если выкл. медиа, то меняем все [media] и [file] на обычные ссылки */
    if (window['nomedia']) {
      etags[i] = new Array(/\[(media|file)\]((http|tmp|data)[^ "]+)\[\/(media|file)\]/mig, '<a href="$2" target="_blank" >$2</a>');
      i++;
    }
    /* Преобразование [file] загруженных файлов */
    etags[i] = new Array(/\[file\]((tmp|data)[^ "]+\.(jpeg|jpg|gif|png|bmp|ico|tif|tiff|webp))\[\/file\]/i, '<a href="$1" target="_blank" ><img src="$1" style="max-width:200px;" ></a>', 1);
    i++;
    etags[i] = new Array(/\[file\]((tmp|data)[^ "]+\.(mp3|m4a|ogg|weba))\[\/file\]/i, '<audio src="$1" controls></audio>');
    i++;
    etags[i] = new Array(/\[file\]((tmp|data)[^ "]+\.(mp4|webm|mov))\[\/file\]/i, '<video src="$1" controls style="max-height:150px;"></video>');
    i++;
    /* Преобразование [media] ссылок из интернета  */
    etags[i] = new Array(/\[media\](https?:\/\/[^ "]+\.(jpeg|jpg|gif|png|bmp|ico|tif|tiff|webp))\[\/media\]/i, '<a href="$1" target="_blank" ><img src="$1" style="max-width:300px;" ></a>');
    i++;
    etags[i] = new Array(/\[media\](https?:\/\/[^ "]+\.(mp3|m4a|ogg|weba))\[\/media\]/i, '<audio src="$1" controls></audio>');
    i++;
    etags[i] = new Array(/\[media\](https?:\/\/[^ "]+\.(mp4|webm|mov))\[\/media\]/i, '<video src="$1" controls style="max-height:300px; !important"></video>');
    i++;
    etags[i] = new Array(/\[media\]https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtu\.be\/)([a-z0-9\?=_-]+)\[\/media\]/i, '<span class="chat-msg__break"></span><iframe src="https://www.youtube.com/embed/$3" width=458 height=258 frameborder=0 allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    i++;
    /* Выполним все замены */
    for (let k = 0; k < etags.length; k++) text = text.replace(etags[k][0], etags[k][1]);

    /* Автоответчик */
    if (loaded === 1 && tonick === mynick && nick !== mynick) {
      let autotext = document.fmsg.text0.value;
      let obj = document.getElementsByName('autotext');
      if (obj) obj = obj[0];
      if (autotext && obj && obj.checked) {
        window.hidden.location.href = `index.php?inc=write&text=/privat ${nick}: Автоответчик -> ${autotext}&r=${Math.random()}`;
      }
    }

    function alpha() {
      let a = [9, 6, 8, 3, 14, 4, 5, 2, 19, 7, 18, 17, 13, 11, 12, 16, 20, 15, 10, 1, 19, 8, 6, 15, 1, 12, 7, 9, 5, 11,
        16, 2, 17, 13, 18, 10, 4, 14, 20, 3, 10, 11, 16, 9, 6, 4, 18, 20, 1, 7, 3, 13, 12, 14, 5, 19, 15, 2, 8, 17];
      const b = time.replace(/0(\d)/g, "$1").match(/\d+/g);
      a = a.slice(b[1]).concat(a.slice(0, b[1]));
      return ` На кубике выпало: ${nickMessageFormatter.wrapDice(`<img src=https://imgs.su/upload/782/412600249.gif>${a[b[2]]}`)} `
    };

    text = text.replace('*кубик*', alpha);

    /* Проверка пользовательских команд для простого сообщения */
    if (cmd === 0) {
      if (text.substr(0, 7) === "/remove" && remover[nick]) {
        let timeremovez;
        text = text.replace("/remove", "");
        timeremovez = text.match(/см\.\s(\d\d.\d\d.\d\d)|\S+/g);
        if ((timeremovez !== null && timeremovez !== undefined)) {
          let obj = document.getElementById("leftdiv");
          let div = obj.getElementsByTagName('div');
          for (let i = 0; i < timeremovez.length; i++) {
            for (let k = 0; k < div.length; k++) {
              if (div[k].innerHTML.indexOf(timeremovez[i]) >= 0 && (remover[nick] || div[k].innerHTML.indexOf(`>${nick}:<`) >= 0)) {
                obj.removeChild(div[k]);
                k--;
              }
            }
          }
        }

        if (nick !== mynick || (timeremovez === null || timeremovez === undefined)) return;
        adminNoticeHtml = nickMessageFormatter.wrapAdminNotice('remove', 'Удаление сообщений', `Удалено из лога: ${timeremovez}`);
        text = '';
      }
      if (text.substr(0, 7) === "/remove") {
        let timeremovez;
        let deleted = 0;
        text = text.replace("/remove", "");
        timeremovez = text.match(/см\.\s(\d\d.\d\d.\d\d)|[^\s\(\)]{3,50}/g);
        if ((timeremovez === null || timeremovez === undefined)) return;
        let obj = document.getElementById("leftdiv");
        let div = obj.getElementsByTagName('div');
        for (let i = 0; i < timeremovez.length; i++) {
          for (let k = 0; k < div.length; k++) {
            if (div[k].innerHTML.indexOf(timeremovez[i]) >= 0 && (remover[nick])) {
              obj.removeChild(div[k]);
              k--;
              deleted++;
            }
          }
        }
        if (nick !== mynick || !deleted) return;
        adminNoticeHtml = nickMessageFormatter.wrapAdminNotice('remove', 'Удаление сообщений', `Удалено из лога: ${timeremovez}`);
        text = '';
      }
      if (text.substr(0, 5) === "/ping" && nick === mynick && loaded === 1) {
        let ping = (new Date().getTime() - gettime) / 1000;
        adminNoticeHtml = nickMessageFormatter.wrapAdminNotice('ping', 'Ping', `Задержка соединения: <strong>${ping} сек</strong>`);
        text = '';
      }
      if (text.substr(0, 6) === "/clear" && clearer[nick]) {
        if (loaded === 1) document.getElementById("leftdiv").innerHTML = "";
        adminNoticeHtml = nickMessageFormatter.wrapAdminNotice('clear', 'Очистка чата', 'Фрейм сообщений очищен');
        text = '';
      }
      if (text.substr(0, 7) === "/reload" && reloader[nick]) {
        if (loaded === 1) location.reload();
        adminNoticeHtml = nickMessageFormatter.wrapAdminNotice('reload', 'Перезагрузка', 'Чат перезагружается…');
        text = '';
      }
      if (text.substr(0, 6) === "/alert" && alerter[nick]) {
        text = text.substr(text.indexOf(": ") + 2);
        if (loaded === 1 && mynick === tonick) alert(text);
        if (nick !== mynick) return;
        adminNoticeHtml = nickMessageFormatter.wrapAdminNotice('alert', 'Алерт', `Пользователю <strong>${tonick}</strong> отправлен alert`);
        text = '';
      }
      if (text.substr(0, 7) === "/ignore" && ignorer[nick]) {
        if (tonick && mynick !== tonick && loaded === 1) ign_sel(tonick);
        if (nick !== mynick || !tonick) return;
        if (ign_ok(tonick)) adminNoticeHtml = nickMessageFormatter.wrapAdminNotice('ignore', 'Полный игнор', `На ник <strong>${tonick}</strong> установлен полный игнор`);
        else adminNoticeHtml = nickMessageFormatter.wrapAdminNotice('ignore', 'Полный игнор', `С ника <strong>${tonick}</strong> снят полный игнор`);
        text = '';
      }
    }

    /* Вывод пользователя в другую комнату */
    if (text.indexOf('/deportation') === 0 && censor[nick]) {
      let term = 30; // время ссылки в минутах
      if (loaded === 1 && mynick === tonick) {
        window.setTimeout('setmyroom(5)', 2000);// 3 - это индекс комнаты для депортации
        setcookie(`${chatlogin.replace('-', '_')}_deportation`, '1', term);
      }
      adminNoticeHtml = nickMessageFormatter.wrapAdminPublicAction(nick, colornick, 'deportation', 'запирает в Темнице', tonick, `на ${term} минут`);
      text = '';
    }
    if (text.indexOf('/amnesty') === 0 && censor[nick]) {
      if (loaded === 1 && mynick === tonick) {
        setcookie(`${chatlogin.replace('-', '_')}_deportation`, '0', 1);
      }
      adminNoticeHtml = nickMessageFormatter.wrapAdminPublicAction(nick, colornick, 'amnesty', 'амнистирует', tonick, 'можно вернуться в общую комнату');
      text = '';
    }

    /* Задержка времени бота на 2 секунды + 1 секунда за каждые написанные им 10 символов */
    if (nick === nick_r) {
      let delay_r = 2 + Math.round(text.length / 10);
      let d = new Date();
      d.setTime(Date.parse(`Jan 1, 1970, ${time}`) + delay_r * 1000);
      time = d.toTimeString().substr(0, 8);
    }

    /* Добавление мерцания (ссылка «см. ЧЧ:ММ:СС» → data-id на строке лога) */
    timeremovez = text.match(/см\.\s(\d\d.\d\d.\d\d)/g);

    if ((timeremovez !== null && timeremovez !== undefined)) {
      for (let i = 0; i < timeremovez.length; i++) {
        let msgId = timeremovez[i].replace(/см\.\s|\:/g, '');
        text = text.replace(
          timeremovez[i],
          `<span class="reply-ref" onclick="blinking('${msgId}'); return false;">${timeremovez[i]}</span>`
        );
        if (loaded === 1 && mynick === tonick) blinking(msgId);
      }
    }

    /* Добавление граф ников, градиента и формат времени */
    set_nick = setGraphNick(cmd, nick);

    if (tonick && text.substring(0, 1) !== "/") {
      if (cmd === 1 || cmd === 2) {
        text = text.replace(`${tonick}:`, wrapInlineTonick(cmd, tonick, size, color, face, 'priv'));
      } else {
        text = text.replace(`${tonick}:`, wrapInlineTonick(cmd, tonick, size, color, face, 'pub'));
      }
    }// граф для собеседника и его нажимаемый ник

    if (cmd === 0 || cmd === 1 || cmd === 2) {
      text = stripLeadingNickFromText(text, nick, tonick);
    }

    const textForMentionCheck = text;

    text = nickMessageFormatter.expandNickTokens(text, cmd, size, color, face);

    set_text = setgr(cmd, nick, text);
    set_time = `<span class='time-message' onclick='parent.sendto(" см. ${time} ");'>${time}</span> `;

    switch (cmd) {
      /* Вывод простого сообщения */
      case 0:
        if (adminNoticeHtml) {
          wr(`${set_time}${adminNoticeHtml}`);
          break;
        }
        symbol = symbols[0];

        if (nick === mynick) symbol = symbols[1];

        if (tonick === mynick || nickMessageFormatter.messageMentionsNick(textForMentionCheck, mynick)) {
          symbol = symbols[2];
          if (nick !== nick_r) sound.play(cmd);
        }

        if (typeof SNAMIK_BOT !== 'undefined' && SNAMIK_BOT && SNAMIK_BOT.isPublicBotMessage && SNAMIK_BOT.isPublicBotMessage(text)) {
          let snamikRest = SNAMIK_BOT.formatPublicMessage(text);
          if ((snamikRest === null || snamikRest === undefined)) snamikRest = text.substring('[Снамик] '.length);
          let snamikMsgClass = snamikRest.indexOf('snimik-bot-cmdlist') >= 0
            ? 'snimik-bot-msg snimik-bot-msg--rich'
            : 'snimik-bot-msg';
          set_nick = snamikBotLabelHtml(cmd, sizenick, facenick) +
            wrapNickForMsg(cmd, nick, colornick, sizenick, facenick, 'tonick');
          set_text = nickMessageFormatter.wrapMsgText(setgr(cmd, nick, snamikRest), color, size, face, snamikMsgClass);
        } else {
          set_nick = wrapNickForMsg(cmd, nick, colornick, sizenick, facenick, 'tonick');
          set_text = nickMessageFormatter.wrapMsgText(set_text, color, size, face);
        }
        a1 = '/vsem ';
        if (text.substring(0, a1.length) === a1) {
          text = text.substr(a1.length, text.length - a1.length);
          text = text.substr(tonick.length);
          wr(nickMessageFormatter.wrapForEveryone(set_time, set_nick, text));
          if (loaded) sound.play(0);
          return 1;
        }
        a2 = '/dev ';
        if (text.substring(0, a2.length) === a2) {
          text = text.substr(a2.length, text.length - a2.length);
          text = text.substr(tonick.length);
          wr(nickMessageFormatter.wrapDevBroadcast(set_time, set_nick, text));
          if (loaded && shouldPlayGenderBroadcastSound('dev')) sound.play(0);
          return 1;
        }
        a3 = '/parn ';
        if (text.substring(0, a3.length) === a3) {
          text = text.substr(a3.length, text.length - a3.length);
          text = text.substr(tonick.length);
          wr(nickMessageFormatter.wrapParnBroadcast(set_time, set_nick, text));
          if (loaded && shouldPlayGenderBroadcastSound('parn')) sound.play(0);
          return 1;
        }
        let msgBody = symbol + set_time + set_nick + set_text;
        if (isMessageAddressedToMe(nick, tonick, text, textForMentionCheck)) {
          towr = wrapMessageForMe(msgBody);
        } else {
          towr = `${msgBody}`;
        }
        if (nick === mynick || tonick === mynick) myhistory += towr;
        if (nick === nick_r && loaded === 1) {
          window.setTimeout(`wr('${towr.split("'").join("\\'")}');if('${tonick}'==='${mynick}') sound.play(0);`, delay_r * 1000);
        } else wr(towr);

        break;

      /* Вывод приватных сообщений */
      case 1:
      case 2:
        symbol = symbols[0];
        if (nick === mynick) symbol = symbols[3];
        if (tonick === mynick) {
          symbol = symbols[4];
        }
        notifyIncomingPrivateSound(nick, tonick);

        symbol2 = "";
        if (nick === mynick) symbol2 = symbols[5];
        if (tonick === mynick) symbol2 = symbols[6];

        if (cmd === 2) {
          symbol2 = "";
          set_nick = wrapNickForMsg(cmd, nick, colornick, sizenick, facenick, 'none');
        } else {
          set_nick = wrapNickForMsg(cmd, nick, colornick, sizenick, facenick, 'priv');
        }

        set_text = nickMessageFormatter.wrapMsgText(` ${set_text}`, color, size, face);

        // Формируем сообщение
        let towrContent = symbol + set_nick + set_text + set_time;

        // Создаем приватное сообщение с классом
        let privMsgHtml = `<div class="private-message"><div class="private-header">Приватно от ${nick}:</div>${towrContent}</div>`;

        // Вставляем сообщение в нужный контейнер
        if (nick === mynick || tonick === mynick) myhistory += towrContent;

        if (cmd === 1 && privatok === 1) {
          let obj = document.getElementById("privatdiv");
          if (obj) {
            let newDiv = document.createElement('div');
            newDiv.innerHTML = privMsgHtml;
            obj.appendChild(newDiv);
            obj.scrollTop = obj.scrollHeight;
          } else {
            wr(privMsgHtml);
          }
        } else if (cmd === 1) {
          wr(privMsgHtml);
        } else if (cmd === 2) {
          if (nick === mynick) pnick = tonick; else pnick = nick;

          if ((pu[pnick] === null || pu[pnick] === undefined) || pu[pnick].closed) {
            if (pt[pnick] === undefined) pt[pnick] = "";
            pt[pnick] += towrContent;
            let text = '';

            if (nick !== mynick) text = "приглашаю начать общение в отдельном ";
            wr(`${set_time}${symbol}${set_nick}${text} <a href='#' onclick='let pnick1="${pnick}"; pu[pnick1]=window.open("index.php?inc=privat&pnick="+pnick1,"","scrollbars=no,width=500,height=400,resizable=yes"); return false;'>приват окне</a>`);
          } else {
            pu[pnick].wr(towrContent);
          }
        }
        break;

      /* Вывод выделенного сообщения '/me' или '/msg' */
      case 3:
        sound.play(cmd);
        wr(`${set_time}<span class="chat-msg__bold">Сообщение от ${nickMessageFormatter.wrapColoredNick(set_nick, colornick, 'sm')}</span> <i>${set_text}</i>`);

      /* [ cmd===4 Вывод сообщения о вызове ] и сам вызов окном с музыкой '/call nick' */
      case 4:
        if (loaded === 1) {
          if (!times_call[tonick]) times_call[tonick] = 0;
          if (timeCall() - times_call[tonick] > times_call_delay) {
            times_call[tonick] = timeCall();
            times_call_who[tonick] = set_nick;
            if (tonick === mynick && loaded === 1)
              if (snd_call_on === 1) {
                getSound('/by-FeNIX/call');
                setTimeout('let tocall=document.getElementById("sounddiv"); tocall.innerHTML="";', 50000);
                ChatAlert(`Вас пытаются разбудить пользователь ${nick}!`);
              }
            if (!invisible[nick]) wr(`${set_time}<img src='https://s1.iconbird.com/ico/0912/fugue/w16h161349011841alarmclockblue.png' border='0'> ${set_nick} <i> Запустил будильник для ${tonick}.</i>`);
          } else if (set_nick === mynick && tonick !== mynick && loaded === 1) {
            let call_alert_txt = `<span>Пользователю с ником "${tonick}" уже был запущен будильник </span>`;
            if (times_call_who[tonick] === mynick) call_alert_txt += "<span> вами!</span>";
            else call_alert_txt += `<span>.</span><span class="chat-msg__break"></span><span>Запустил будильник пользователь с ником "${times_call_who[tonick]}".</span>`;
            call_alert_txt += "<span class='chat-msg__break'></span><div class='chat-msg__call-form'><span>Повторный вызов возможен через: </span>";
            ChatAlert(`${call_alert_txt}<form name='count'><input type='text' size='20' name='count2' class='count2' readonly></form></div>`);
            countdown(times_call_delay - timeCall() + times_call[tonick], tonick);
          }
        }
        break;

      /* Вывод сообщения об удалении '/kill nick' и сам процесс */
      case 5:
        sound.play(cmd);
        if (tonick === mynick && loaded === 1 && kill !== 6 && kill !== 7) {
          if ((kill === 1) || (kill === 2) || (kill === 3)) {
            act = "kill";
            setcookie(`${parent.chatlogin.replace("-", "_")}_mpban`, tonick, timeout);
          }
          if (kill === 4) act = "window";
          if (kill === 5) act = "prav";
          parent.location.href = `index.php?inc=exit&${parent.yourkey}&act=${act}&timeout=${timeout}&grund=${encodeURIComponent(text)}`;
        }
        let kill_timeout = 0;
        if (text.length > 0) text = ` Причина: ${text}. `;
        if (timeout > 0) {
          kill_timeout = timeout * 60;
          if (timeout < 61) timeout = `На ${timeout} минут.`;
          if (timeout === 1440) timeout = "На день!";
          if (timeout === 10080) timeout = "На неделю!";
          if (timeout === 43200) timeout = "На месяц!";
          if (timeout > 1000000) timeout = "Навсегда!";
        }
        if (loaded === 1 && mynick === tonick) {
          kill_timer(kill_timeout);
        }
        wr(`${set_time}${nickMessageFormatter.wrapAdminModeration(nick, colornick, deltxt[kill], tonick, timeout, text, kill)}`);

        break;

      /* Вывод входа юзера в чат и добавление в нклист через add() */
      case 6:
        if (chatStr(inchat) === '0' && sameRoom(room, myroom)) {
          sound.play(cmd);
          set_nick = `<a href='' class="chat-msg__welcome-nick-link" onclick="insertNickTag('${nick}'); return false;"><span class="chat-msg__nick" style="color:${colornick}">${set_nick}</span></a>`;
          let joinBody = 'Добро пожаловать в чат С нами! %nick%';
          if ((tadda[nick] !== null && tadda[nick] !== undefined) && tadda[nick]) joinBody = tadda[nick].replace(nick, '%nick%');
          if (joinBody.search('%nick%') === -1) joinBody = `%nick% ${joinBody}`;
          joinBody = joinBody.replace('%nick%', set_nick);
          tadd = nickMessageFormatter.wrapJoinWelcome(joinBody);
          wr(`${set_time}${tadd}`);
        }
        add(nick, colornick, st, mw, icon, status, inchat, time, room, love, clan, userid);
        if (nick === mynick) mymw = mw;

        break;

      /* Вывод выхода юзера из чата и удаление из никлиста через deleteUser() */
      case 7:
        if (chatStr(inchat) === '1' && sameRoom(room, myroom)) {
          sound.play(cmd);
          set_nick = `<a href='' class="chat-msg__leave-nick-link" onclick="insertNickTag('${nick}'); return false;"><span class="chat-msg__nick" style="color:${colornick}">${set_nick}</span></a>`;
          let leaveBody = 'Нас покидает %nick%';
          if ((tdela[nick] !== null && tdela[nick] !== undefined) && tdela[nick]) leaveBody = tdela[nick].replace(nick, '%nick%');
          if (leaveBody.search('%nick%') === -1) leaveBody = `%nick% ${leaveBody}`;
          leaveBody = leaveBody.replace('%nick%', set_nick);
          tdel = nickMessageFormatter.wrapLeaveWelcome(leaveBody);
          wr(`${set_time}${tdel}`);
        }
        deleteUser(nick, colornick, st, mw, icon, status, inchat, time, room, userid);
        break;

      /* Сообщение о смене статуса участника и его изменение */
      case 8:
        sound.play(cmd);
        status = text;
        for (let i = 0; i < us.length; i++) if ((us[i] !== null && us[i] !== undefined) && us[i][0] === nick) {
          us[i][5] = status;
          if (icqtxt[status] || (chatConfig.statusMeta && chatConfig.statusMeta[status])) wr(`${set_time}${nickMessageFormatter.wrapStatusChange(nick, set_nick, colornick, status)}`);
          let obj = document.getElementById(`!${nick}`);
          if (obj) format(i, obj);
        }

        break;


      /* Функция обработки сообщений викторины */
      case 9:
        if (text === "end") text1 = "это слово уже угаданно или время вышло";
        else if (text === "") text1 = "вы не угадали это слово";
        else {
          if (mynick === nick) text1 = `вы только что отгадали слово "${text}" и получаете 30 пунктов`;
          else text1 = `только что отгадал(а) слово "${text}"`;
        }
        wr(`${set_time}${nickMessageFormatter.wrapColoredNick(`<span class="chat-msg__bold">${set_nick}</span>`, colornick, 'lg')} <i>${text1}</i>`);

        break;

      case 10:
        oldroom = room;
        setroom = chatNum(text);
        if (loaded === 1) {
          for (let i = 0; i < us.length; i++) if ((us[i] !== null && us[i] !== undefined) && us[i][0] === nick) {
            us[i][6] = setroom;
            update(oldroom, -1);
            update(setroom, 1);
          }
          if (nick === mynick) {
            myroom = setroom;
            if (roomlog === 1) {
              document.getElementById("leftdiv").innerHTML = "Подождите, осуществляется переход в другую комнату ...";
              window.setTimeout("loadframes();", 2000);
              return;
            }
            ucc = new Array();
            document.getElementById("leftdiv").innerHTML = "";
            document.getElementById('users').innerHTML = userlist;
            window.setTimeout("for(let i=0;i<us.length;i++) if((us[i] !== null && us[i] !== undefined)) add(us[i][0],us[i][1],us[i][2],us[i][3],us[i][4],us[i][5],'','',us[i][6],us[i][7],us[i][8],us[i][9]);", 500);
          } else {
            for (let i = 0; i < us.length; i++) if ((us[i] !== null && us[i] !== undefined) && us[i][0] === nick) {
              if (sameRoom(myroom, setroom)) {
                add(us[i][0], us[i][1], us[i][2], us[i][3], us[i][4], us[i][5], '', '', us[i][6], us[i][7], us[i][8], us[i][9]);
              } else if (sameRoom(myroom, oldroom)) {
                let obj = document.getElementById(`!${nick}`);
                if (obj) nicklistRemove(obj);
                seprules(-1, us[i][2], us[i][3]);
              }
            }
          }
        }
        towr = "";
        if (nick === mynick && loaded === 1) towr = `${set_time}<i>Вы перешли в комнату -> <span class="chat-msg__bold">${rooms[setroom][0]}</span>.</i>`;
        else if (sameRoom(myroom, setroom)) towr = `${set_time}<i><a href='' onclick="insertNickTag('${nick}'); return false;">${nickMessageFormatter.wrapColoredNick(nick, colornick)}</a> приходит к нам из комнаты -> <span class="chat-msg__bold">${rooms[oldroom][0]}</span>.</i>`;
        else if (sameRoom(myroom, oldroom)) towr = `${set_time}<i>${nick} уходит в комнату -> <span class="chat-msg__bold">${rooms[setroom][0]}</span>.</i>`;
        if (nick === mynick) myhistory += towr;
        wr(towr);

        break;

      /* Функция вывода уведомлений */
      case 11:
        if (text === "post" && tonick === mynick) wr(`${set_time}Мажордом (шопотом): <i>Вам от <a href=?inc=info&nick=${nick} target=_blank>${nickMessageFormatter.wrapColoredNick(set_nick, colornick)}</a> новое письмо-с, извольте прочесть: <a href=?inc=post&${yourkey} target=_blank>"${var9}"</a></i>`);
        if (text === "reg") wr(`${set_time}Мажордом (торжественно): <i>У нас новый пользователь <a href=?inc=info&nick=${nick} target=_blank>${nickMessageFormatter.wrapColoredNick(set_nick, colornick)}</a>.</i>`);
        if (text === "clan") wr(`${set_time}Мажордом (громогласно): <i>Пользователь <a href=?inc=info&nick=${nick} target=_blank>${nickMessageFormatter.wrapColoredNick(set_nick, colornick)}</a> вступил(а) в клан "${var9}".</i>`);
        if (text === "gallery") wr(`${set_time}Мажордом (громогласно): <i>Пользователь <a href=?inc=info&nick=${nick} target=_blank>${nickMessageFormatter.wrapColoredNick(set_nick, colornick)}</a> добавил(а) новую <a href=?inc=gallery&gallery=${nick}&foto=${var9} target=_blank>фотографию</a> в галерею.</i>`);
        if (text === "gb") wr(`${set_time}Мажордом (громогласно): <i>Новое сообщение от <a href=?inc=info&nick=${nick} target=_blank>${nickMessageFormatter.wrapColoredNick(set_nick, colornick)}</a> в <a href=?inc=gb target=_blank>гостевой</a>.</i>`);

        if (text === "forum") wr(nickMessageFormatter.wrapForumNotice(nick, set_nick, var9, var10, var11));
    }

  }

}

const messageRouter = new MessageRouter();

/** Глобальная обёртка — вызывается движком WebSocket (engine.js). */
function f(room, cmd, nick, tonick, text, time, colornick, color, var9, var10, var11, var12, var13, var14) {
  return messageRouter.handle(room, cmd, nick, tonick, text, time, colornick, color, var9, var10, var11, var12, var13, var14);
}


/* Функция обновления числа юзеров и выбора комнат */

/** Счётчики пользователей в комнатах и селекте комнат. */
class RoomCounter {
  /** Обновляет «Сейчас онлайн» (#count). */
  syncOnlineCount() {
    const el = document.getElementById('count');
    if (!el) return;
    let total = uc;
    if (!total && typeof i_inchat !== 'undefined') total = i_inchat;
    el.textContent = total;
  }

  update(room, plus) {
    this.syncOnlineCount();
    if (!rooms[room] || rooms.length < 2) return;

    rooms[room][1] += plus;

    let obj = document.getElementsByName('selectroom')[0];
    if (obj) obj.options[room].innerHTML = `${rooms[room][0]} (${rooms[room][1]})`;

    if (sameRoom(room, myroom)) {
      obj = document.getElementById('roomcount');
      if (obj) obj.innerHTML = rooms[room][1];
    }
  }
}

const roomCounter = new RoomCounter();

function update(room, plus) {
  roomCounter.update(room, plus);
}


/* [Функции - нижнего фрейма] */

/**
 * Работа со строкой ввода: вставка ника, приват, антифлуд, отправка.
 */
class ChatInputController {
  appendToInput(nick) {
    document.fmsg.text0.focus();
    document.fmsg.text0.value = document.fmsg.text0.value + nick;
  }

  /** Обычное сообщение: сброс «приватно» и поля «кому». */
  resetPublicMessageMode() {
    const form = document.fmsg;
    if (!form) return;
    if (form.cmd) form.cmd.value = '';
    if (form.tonick) form.tonick.value = '';
  }

  /** Вставляет [ник] в поле сообщения (без ограничения количества). */
  insertNickTag(nick) {
    nick = String(nick).replace(/:\s*$/, '').trim();
    if (!nick) return;
    this.resetPublicMessageMode();
    const field = document.fmsg.text0;
    if (!field) return;
    field.focus();
    field.value += `[${nick}]`;
  }

  setTonick(nick) {
    if ((document.fmsg.cmd !== null && document.fmsg.cmd !== undefined)) document.fmsg.cmd.value = '';
    if ((document.fmsg.tonick === null || document.fmsg.tonick === undefined)) this.appendToInput(nick);
    else {
      document.fmsg.tonick.value = nick;
      document.fmsg.text0.focus();
    }
  }

  setPrivateTonick(nick) {
    const clean = String(nick).replace(/:\s*$/, '').trim();
    if (!clean) return;
    const tonickValue = `${clean}: `;
    if ((document.fmsg.cmd === null || document.fmsg.cmd === undefined)) {
      this.appendToInput(`/privat ${tonickValue}`);
      return;
    }
    document.fmsg.cmd.value = '/privat ';
    if ((document.fmsg.tonick === null || document.fmsg.tonick === undefined)) {
      this.appendToInput(tonickValue);
    } else {
      document.fmsg.tonick.value = tonickValue;
      document.fmsg.text0.focus();
    }
  }

  /** Удаляет повторяющиеся символы (антифлуд). */
  filterRepeatedChars(text) {
    let text1 = '', s = '', n = 0;
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) === s && text.charAt(i) !== '0') n++;
      else n = 0;
      s = text.charAt(i);
      if (n < maxabc || maxabc === 0) text1 += s;
    }
    return text1;
  }

  /** Переводит текст из английской раскладки в русскую. */
  convertToRussianLayout() {
    let msg = document.fmsg.text0.value;
    let msg_cmd = '', msg_nick = '', msg_text = '';

    if (msg.charAt(0) === '/' || msg.substr(0, 6) === 'privat') {
      msg_cmd = msg.substr(0, msg.indexOf(' ') + 1);
      msg = msg.substr(msg.indexOf(' ') + 1);
    }

    msg_nick = msg.substr(0, msg.indexOf(':') + 1);
    msg_text = msg.substr(msg.indexOf(':') + 1);

    if (msg_nick.search(/ /) !== -1) {
      msg_nick = '';
      msg_text = msg;
    }

    let chars = ' !Э№;%?э()*+б-ю.0123456789ЖжБ=Ю,"ФИСВУАПРШОЛДЬТЩЗЙКЫЕГМЦЧНЯх/ъ:_ёфисвуапршолдьтщзйкыегмцчняХ\\ЪЁ';
    let newmsg = '';

    for (let i = 0; i < msg_text.length; i++) {
      let mychar = msg_text.charAt(i).charCodeAt();
      newmsg += mychar < 0x80 ? chars.charAt(mychar - 0x20) : msg_text.charAt(i);
    }

    document.fmsg.text0.value = msg_cmd + msg_nick + newmsg;
    document.fmsg.text0.focus();
  }

  /** Навигация по истории отправленных сообщений. */
  navigateHistory(delta) {
    pos += delta;
    if (pos < 0) pos = 0;
    if (pos > amess.length - 1) pos = amess.length - 1;
    return amess[pos];
  }

  /** /privat [ник] текст → /privat ник: текст для сервера. */
  normalizePrivatOutgoing(msg) {
    return msg.replace(/^(\/privat2?\s+)\[([^\[\]\r\n]+?)\](\s*)/, (_, cmd, nick) => `${cmd}${String(nick).trim()}: `);
  }

  /** Обрабатывает и отправляет сообщение из формы. */
  send() {
    str_plus(0);
    const form = document.fmsg;
    let msg = form.text0.value;

    if (form.cmd.value === '%') form.tonick.value = '';

    if (form.tonick) {
      if (form.tonick.value !== 'Всем') {
        let tn = form.tonick.value;
        if (tn && msg.indexOf(tn) !== 0) {
          if (tn.charAt(tn.length - 1) !== ':') tn += ':';
          if (tn.charAt(tn.length - 1) === ':') tn += ' ';
          msg = tn + msg;
        }
      }
    }

    if (form.cmd) {
      msg = form.cmd.value + msg;
      if (form.cmd.value !== '/privat ' && form.cmd.value !== '%') form.cmd.value = '';
    }

    if (msg === '') return false;

    let snamikOutgoing = msg;
    if (document.fmsg.deltonick.checked) form.tonick.value = '';

    let msg_cmd = '', msg_nick = '', msg_text = '';

    if (msg.charAt(0) === '/') {
      msg_cmd = msg.substr(0, msg.indexOf(' ') + 1);
      msg = msg.substr(msg.indexOf(' ') + 1);
    }

    msg_nick = msg.substr(0, msg.indexOf(': ') + 1);
    msg_text = msg.substr(msg.indexOf(': ') + 1);

    if (msg_nick.search(/ /) !== -1) {
      msg_nick = '';
      msg_text = msg;
    }

    msg_text = this.filterRepeatedChars(msg_text);

    if (document.getElementById('bt') && document.getElementById('bt').checked && !/^\s*%[А-яЁё]+/.test(msg_text)) {
      msg_text = ` (b) ${msg_text} (/b)`;
    }
    if (document.getElementById('it') && document.getElementById('it').checked && !/^\s*%[А-яЁё]+/.test(msg_text)) {
      msg_text = ` (i) ${msg_text} (/i)`;
    }
    if (document.getElementById('ut') && document.getElementById('ut').checked && !/^\s*%[А-яЁё]+/.test(msg_text)) {
      msg_text = ` (u) ${msg_text} (/u)`;
    }
    if (document.getElementById('et') && document.getElementById('et').checked && !/^\s*%[А-яЁё]+/.test(msg_text)) {
      msg_text = ` (center) ${msg_text} (center)`;
    }
    if (document.getElementById('at') && document.getElementById('at').checked && !/^\s*%[А-яЁё]+/.test(msg_text)) {
      msg_text = ` (size) ${msg_text} (size)`;
    }

    msg = this.normalizePrivatOutgoing(msg_cmd + msg_nick + msg_text);

    form.text0.value = '';
    form.text0.focus();
    form.text.value = msg;

    try {
      if (typeof SNAMIK_BOT !== 'undefined' && SNAMIK_BOT && SNAMIK_BOT.hookOutgoing && snamikOutgoing) {
        SNAMIK_BOT.hookOutgoing(snamikOutgoing);
      }
    } catch (e) {
    }

    pos = amess.length;
    amess[pos] = msg;
    gettime = new Date().getTime();

    if (away[laststatus]) window.setTimeout(function () { setstatus(0); }, 2000);

    return true;
  }

  /** Сбрасывает поле загрузки файла после отправки. */
  resetFileInput() {
    let obj = document.fmsg.loadfile;
    let obj1 = document.createElement('input');
    obj1.type = 'file';
    obj1.name = obj.name;
    obj1.size = obj.size;
    obj1.className = obj.className;
    obj1.style.cssText = obj.style.cssText;
    obj.parentNode.replaceChild(obj1, obj);
    return false;
  }
}

const chatInputController = new ChatInputController();
let pos = 0;
const amess = new Array('');
let oldmsg = '';

function sendto(nick) {
  chatInputController.appendToInput(nick);
}

function tonick(nick) {
  chatInputController.insertNickTag(nick);
}

function insertNickTag(nick) {
  chatInputController.insertNickTag(nick);
}

function ptonick(nick) {
  chatInputController.setPrivateTonick(nick);
}

function abc_flood(text) {
  return chatInputController.filterRepeatedChars(text);
}

function russ() {
  chatInputController.convertToRussianLayout();
}

function go(n) {
  return chatInputController.navigateHistory(n);
}

function msg_send() {
  return chatInputController.send();
}

function msg_reset() {
  return chatInputController.resetFileInput();
}


/**
 * Автоизменение ICQ-статуса при молчании и ручное переключение.
 */
class StatusManager {
  constructor() {
    this.lastActivityTime = new Date().getTime();
    this.lastStatus = 0;
  }

  /** Проверяет время молчания и меняет статус. */
  checkAway() {
    let offtime = new Date().getTime() - gettime;
    let newstatus = 0;

    for (let i in away) {
      if (away[i] * 60 * 1000 < offtime) {
        if (away[i] > away[newstatus] || away[newstatus] === undefined) newstatus = i;
      }
    }

    if (newstatus === 100) {
      location.href = 'index.php';
      return;
    }

    if (newstatus > 0 && (away[newstatus] > away[this.lastStatus] || away[this.lastStatus] === undefined)) {
      this.set(newstatus, 1);
    }
  }

  /** Отправляет команду смены статуса на сервер. */
  set(status) {
    this.lastStatus = status;
    laststatus = status;
    hidden.location.href = `index.php?inc=write&text=/status ${status}&r=${Math.random()}`;
    document.getElementsByName('setstatus')[0].value = status;
    document.fmsg.text0.focus();
  }
}

const statusManager = new StatusManager();
let gettime = new Date().getTime();
let laststatus = 0;

function goaway() {
  statusManager.checkAway();
}

window.setInterval(function () { goaway(); }, 1000 * 10);

function setstatus(status) {
  statusManager.set(status);
}


/** Переключение комнаты чата. */
class RoomSwitcher {
  switchTo(room) {
    if (sameRoom(myroom, room)) return false;
    if (!rooms[room][3]) {
      alert('У Вас нет доступа в эту комнату!');
      return false;
    }

    hidden.location.href = `index.php?inc=write&text=/room ${room}&r=${Math.random()}`;
    gettime = new Date().getTime();
    document.fmsg.text0.focus();
  }
}

const roomSwitcher = new RoomSwitcher();

function setmyroom(room) {
  return roomSwitcher.switchTo(room);
}


/**
 * WebSocket-викторина: подключение и отображение слова/таймера.
 */
class QuizGame {
  constructor() {
    this.isActive = 0;
    this.ws = '';
  }

  toggle() {
    if (this.isActive === 0) {
      if (!window.WebSocket) return false;

      this.isActive = 1;
      gameon = 1;

      let quiz = document.querySelector('#gamediv');
      quiz.classList.add('open');
      quiz.innerHTML = 'Загрузка...';

      if (location.protocol === 'https:') {
        this.ws = new WebSocket(`wss://${engine_host}:${engine_port}${1}/?app=game&chat=${chatlogin}&engine=WebSocket`);
      } else {
        this.ws = new WebSocket(`ws://${engine_host}:${engine_port}/?app=game&chat=${chatlogin}&engine=WebSocket`);
      }

      gamews = this.ws;

      this.ws.onmessage = function (e) {
        eval(e.data.replace(new RegExp(`<script>`, 'gm'), '').replace(new RegExp(`</script>`, 'gm'), ''));
      };
    } else {
      this.isActive = 0;
      gameon = 0;

      let quiz = document.querySelector('#gamediv');
      quiz.classList.remove('open');

      if (this.ws) {
        this.ws.close();
        this.ws = '';
        gamews = '';
      }
    }
  }

  /** Обновляет UI викторины: слово, таймер, подсказку. */
  render(sec, word, ask) {
    let gd = document.getElementById('gamediv');
    if (!gd) return;

    if (ask) {
      gd.innerHTML =
        `<div id="gameword" style="margin-bottom:8px"></div><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><a href="?" onclick="alert('Введите ответ с % в поле ввода чата');return false" style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:let(--accent);color:#fff;border-radius:8px;font-weight:700;font-size:16px;text-decoration:none">?</a><span style='font-size:16px;font-weight:500;line-height:1.4'>${ask}</span></div>`;
    }

    let obj = document.getElementById('gameword');
    if (!obj) return;

    let html = '<div style="display:flex;gap:4px;flex-wrap:wrap;align-items:center">';

    for (let i = 0; i < word.length; i++) {
      let sym = word.substr(i, 1);
      if (sym === ' ') sym = '&nbsp;';
      let filled = (sym !== '_' && sym !== '&nbsp;');
      html +=
        `<div style="width:38px;height:42px;display:flex;align-items:center;justify-content:center;background:${filled ? '#ffffff' : '#f8fafc'};border:2px solid ${filled ? 'let(--accent)' : '#cbd5e1'};border-radius:8px;font-size:20px;font-weight:700;color:${filled ? 'let(--accent)' : '#94a3b8'};box-shadow:0 2px 4px rgba(0,0,0,0.06);transition:all .3s;font-family:monospace;text-transform:uppercase;">${sym}</div>`;
    }

    html +=
      `<div style="width:42px;height:42px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#fef2f2,#fee2e2);border:2px solid #fca5a5;border-radius:8px;font-size:16px;font-weight:800;color:#dc2626;box-shadow:0 2px 4px rgba(220,38,38,0.15);margin-left:8px;${sec <= 5 ? 'animation:timer-pulse 0.5s infinite;' : ''}">${sec}</div>`;
    html += '</div>';

    obj.innerHTML = html;
  }
}

const quizGame = new QuizGame();

if (typeof gameon === 'undefined') window.gameon = 0;
if (typeof gamews === 'undefined') window.gamews = '';

function startgame() {
  return quizGame.toggle();
}

function setgame(sec, word, ask) {
  quizGame.render(sec, word, ask);
}


/** Открывает окно с историей сообщений текущей сессии. */
class HistoryViewer {
  open() {
    let h = window.open('', '', 'scrollbars=yes,width=600,height=400,noresize');
    h.document.write(myhistory);
  }
}

const historyViewer = new HistoryViewer();

function openhistory() {
  historyViewer.open();
}

/* [Подготовка фреймов и загрузка сообщений] */

/**
 * HTML-шаблон никлиста.
 * Если включено разделение по полам (useseparate), создаётся структура с секциями.
 */
let userlist = '<div id="ul" class="nick-list"></div>';
if (useseparate) userlist = `<div id="ul" class="nick-list"><div id="adm" class="nick-list__section" style="display:none"><div class="nick-list__section-title">Администрация</div></div><div id="woman" class="nick-list__section" style="display:none"><div class="nick-list__section-title">Девушки</div></div><div id="man" class="nick-list__section" style="display:none"><div class="nick-list__section-title">Парни</div></div><div id="noman" class="nick-list__section" style="display:none"><div class="nick-list__section-title">Гости</div></div></div>`;

/**
 * Загрузчик фреймов чата.
 * Отвечает за сброс состояния, подготовку DOM и запуск движка сообщений.
 */
class ChatFrameLoader {
  /**
   * @param {Object} options
   * @param {number} [options.timeoutMs=10000] — таймаут ожидания загрузки (мс)
   */
  constructor(options = {}) {
    this.timeoutMs = options.timeoutMs || 10000;
    this._timeoutId = null;
  }

  /** ID активного таймера (используется в onloaded для отмены предупреждения). */
  get interval() {
    return this._timeoutId;
  }

  /** Отменяет текущий таймер загрузки, если он есть. */
  clearTimeout() {
    if (!this._timeoutId) return;

    window.clearTimeout(this._timeoutId);
    this._timeoutId = null;
    interval = null;
  }

  /**
   * Планирует показ предупреждения через заданное время.
   * @param {Function} callback — функция, которая выведет сообщение в чат
   */
  scheduleTimeout(callback) {
    this.clearTimeout();
    this._timeoutId = window.setTimeout(callback, this.timeoutMs);
    interval = this._timeoutId;
  }

  /** Очищает фрейм приватных сообщений перед перезагрузкой. */
  resetPrivateFrame() {
    if (privatok !== 1) return;

    document.getElementById('privatdiv').innerHTML = '';
  }

  /**
   * Сбрасывает глобальное состояние чата перед новой загрузкой:
   * флаги, историю и счётчики комнат.
   */
  resetChatState() {
    loaded = 0;
    scrolled = 0;
    myhistory = myhistory1;

    for (let i = 0; i < rooms.length; i++) {
      rooms[i][1] = 0;
    }
  }

  /** Сбрасывает массивы пользователей и восстанавливает HTML никлиста. */
  resetUserList() {
    uc = 0;
    us = new Array();
    ucc = new Array();
    document.getElementById('users').innerHTML = userlist;
  }

  /** Предупреждение: не удалось подключиться к WebSocket-движку чата. */
  showEngineConnectionWarning() {
    wr('<span style="color:red">Не удалось подключиться к движку чата.<span class="chat-msg__break"></span>Попробуйте использовать новый современный браузер <a href=https://www.google.com/chrome target=_blank>Google Chrome</a>.</span>');
  }

  /** Предупреждение: страница грузится слишком долго, можно продолжить вручную. */
  showPageLoadWarning() {
    wr('<span style="color:red">Чат не был загружен в установленное время, вероятно некоторые элементы страницы грузятся очень долго, <a href=# onclick=\'loadframes(); return false;\'>нажмите для продолжения</a> ...</span>');
  }

  /**
   * Основной сценарий загрузки чата.
   * Вызывается при старте страницы, смене комнаты и по кнопке «Обновить».
   */
  load() {
    this.clearTimeout();
    this.resetPrivateFrame();
    this.resetChatState();
    this.resetUserList();

    this.scheduleTimeout(() => this.showEngineConnectionWarning());

    document.getElementById('leftdiv').innerHTML = 'Загрузка ...';
    loadengine();
  }

  /** Запускает таймер ожидания полной загрузки DOM (до вызова load). */
  schedulePageLoadWarning() {
    this.scheduleTimeout(() => this.showPageLoadWarning());
  }
}

/** Экземпляр загрузчика — единая точка управления фреймами чата. */
const chatFrameLoader = new ChatFrameLoader();

/**
 * Глобальная переменная таймера.
 * Нужна для обратной совместимости с onloaded(), которая отменяет предупреждение после успешной загрузки.
 */
if (typeof interval === 'undefined') window.interval = null;

/** Глобальная обёртка — сохранена для onclick, setTimeout("loadframes()") и DOMContentLoaded. */
function loadframes() {
  chatFrameLoader.load();
}

chatFrameLoader.schedulePageLoadWarning();



/* Загрузка чата сразу после загрузки DOM */
document.addEventListener('DOMContentLoaded', loadframes);