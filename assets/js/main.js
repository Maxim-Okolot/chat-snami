const user = {

  // --- Текущий пользователь
  id: typeof id !== 'undefined' ? id : '', // Служебный id (часто пустой)
  nick: typeof nick !== 'undefined' ? nick : (typeof mynick !== 'undefined' ? mynick : ''), // Ник (то же, что mynick)
  mynick: typeof mynick !== 'undefined' ? mynick : '', // Ник текущего пользователя
  myid: typeof myid !== 'undefined' ? myid : '', // Хеш сессии для POST (не id в БД!)
  userid: typeof userid !== 'undefined' ? userid : 0, // Числовой id пользователя в MySQL
  yourkey: typeof yourkey !== 'undefined' ? yourkey : '', // Ключ для URL (?inc=post, write и т.д.)

  myroom: typeof myroom !== 'undefined' ? myroom : 0, // Номер текущей комнаты
  mystyle: typeof mystyle !== 'undefined' ? mystyle : '', // CSS-файл оформления комнаты

  admin: typeof admin !== 'undefined' ? admin : 0, // 1 — админ, 0 — обычный пользователь
  priority: typeof priority !== 'undefined' ? priority : 0, // Приоритет статуса (ранг)

  mymw: typeof mymw !== 'undefined' ? mymw : '', // Пол: 0 — м, 1 — ж
  mystatus: typeof mystatus !== 'undefined' ? mystatus : 0, // Ранг/статус (0–9: гость, админ, модер…)
  status: typeof status !== 'undefined' ? status : 0, // ICQ-статус (свободен, сплю, в эфире…)
  mybirthday: typeof mybirthday !== 'undefined' ? mybirthday : 0, // 1 — сегодня день рождения

  regist: typeof regist !== 'undefined' ? regist : 0, // 1 — зарегистрирован, иначе гость
  post: typeof post !== 'undefined' ? post : 0, // Количество непрочитанных писем
  antiflood: typeof antiflood !== 'undefined' ? antiflood : 1, // Интервал антифлуда (секунды)

  loadfile_on: typeof loadfile_on !== 'undefined' ? loadfile_on : 0, // 1 — разрешена загрузка файлов
  icon_on: typeof icon_on !== 'undefined' ? icon_on : 0, // 1 — иконки в никлисте
  chatlogin: typeof chatlogin !== 'undefined' ? chatlogin : '', // Идентификатор чата (cookie, WebSocket)
  webcamhost: typeof webcamhost !== 'undefined' ? webcamhost : 0, // Флаг веб-камеры

  ua: typeof ua !== 'undefined' ? ua : '', // JSON профиля из БД (без pass, email, about, ip)
  rooms: typeof rooms !== 'undefined' ? rooms : [], // Комнаты: [имя, счётчик, CSS, доступ, мод]

  // --- Бот «Снамик» (если задан nick_r в конфиге) ---

  nick_r: typeof nick_r !== 'undefined' ? nick_r : '', // Ник робота
  userid_r: typeof userid_r !== 'undefined' ? userid_r : 0, // Id робота в БД
  color_r: typeof color_r !== 'undefined' ? color_r : '', // Цвет ника робота
  mw_r: typeof mw_r !== 'undefined' ? mw_r : '', // Пол робота
  st_r: typeof st_r !== 'undefined' ? st_r : '', // Иконка ICQ-статуса робота
  icon_r: typeof icon_r !== 'undefined' ? icon_r : '', // URL иконки робота
  status_r: typeof status_r !== 'undefined' ? status_r : 0, // Ранг робота
  love_r: typeof love_r !== 'undefined' ? love_r : '', // Пара робота
  clan_r: typeof clan_r !== 'undefined' ? clan_r : 0, // Id клана робота
  room_r: typeof room_r !== 'undefined' ? room_r : 0, // Комната робота

  // --- Информер (?inc=informer, core/informer.php) ---

  i_ip: typeof i_ip !== 'undefined' ? i_ip : '', // IP посетителя
  i_users: typeof i_users !== 'undefined' ? i_users : 0, // Всего зарегистрированных
  i_msg: typeof i_msg !== 'undefined' ? i_msg : 0, // Сообщений за сегодня
  i_inchat: typeof i_inchat !== 'undefined' ? i_inchat : 0, // Сколько сейчас онлайн
  i_inusers: typeof i_inusers !== 'undefined' ? i_inusers : [], // Онлайн: [nick, colornick, mw, ?, room, userid]
  i_lastreg: typeof i_lastreg !== 'undefined' ? i_lastreg : [], // Последние регистрации
  i_birthday: typeof i_birthday !== 'undefined' ? i_birthday : [], // Именинники сегодня
  i_loadtime: typeof i_loadtime !== 'undefined' ? i_loadtime : 0, // Время генерации информера (сек)

  // --- Движок (engine.js, mpchat) ---

  engine_host: typeof engine_host !== 'undefined' ? engine_host : '', // Хост WebSocket-движка
  engine_port: typeof engine_port !== 'undefined' ? engine_port : 0, // Порт WebSocket-движка

  // --- UI / runtime ---

  zvukmsgno: typeof zvukmsgno !== 'undefined' ? zvukmsgno : 1, // 1 — звуки сообщений включены

  // --- Cookie (ключи формируются через chatlogin) ---

  cookieIgn: typeof chatlogin !== 'undefined' ? chatlogin.replace('-', '_') + '_mpign' : '', // Список игнора
  cookieDeportation: typeof chatlogin !== 'undefined' ? chatlogin.replace('-', '_') + '_deportation' : '', // Депортация в комнату
  cookieBan: typeof chatlogin !== 'undefined' ? chatlogin.replace('-', '_') + '_mpban' : '', // Бан

  /** Полный профиль из ua (JSON-строка от PHP). */
  get profile() {
    if (!this.ua) return null;
    try {
      return typeof this.ua === 'string' ? JSON.parse(this.ua) : this.ua;
    } catch (e) {
      return null;
    }
  },

  /** Схема элемента us[] — один пользователь в никлисте (engine.js → add()). */
  onlineUserFields: {
    0: 'nick',       // Ник
    1: 'colornick',  // Цвет ника
    2: 'st',         // ICQ-статус (иконка)
    3: 'mw',         // Пол: 0 — м, 1 — ж
    4: 'icon',       // URL иконки
    5: 'status',     // Ранг/статус пользователя
    6: 'room',       // Номер комнаты
    7: 'love',       // Ник пары
    8: 'clan',       // Id клана
    9: 'userid',     // Id в БД
  },

  /** gna, gra, grna, tadda, tdela, invisible — по нику из shopextra.sys / gn.js */
  get shopByNick() {
    return {
      gna: typeof gna !== 'undefined' ? gna : {},
      gra: typeof gra !== 'undefined' ? gra : {},
      grna: typeof grna !== 'undefined' ? grna : {},
      tadda: typeof tadda !== 'undefined' ? tadda : {},
      tdela: typeof tdela !== 'undefined' ? tdela : {},
      invisible: typeof invisible !== 'undefined' ? invisible : {},
    };
  },

  /** clearer, remover, ad_access, reloader, alerter, censor, ignorer — по нику */
  get privilegesByNick() {
    return {
      clearer: typeof clearer !== 'undefined' ? clearer : {},
      remover: typeof remover !== 'undefined' ? remover : {},
      ad_access: typeof ad_access !== 'undefined' ? ad_access : {},
      reloader: typeof reloader !== 'undefined' ? reloader : {},
      alerter: typeof alerter !== 'undefined' ? alerter : {},
      censor: typeof censor !== 'undefined' ? censor : {},
      ignorer: typeof ignorer !== 'undefined' ? ignorer : {},
    };
  },

  /** Массив us[] — все пользователи онлайн (engine.js → add()). */
  get onlineList() {
    return typeof us !== 'undefined' ? us : [];
  },

  /** Массив ign[] — игнорируемые ники (из cookie). */
  get ignoreList() {
    return typeof ign !== 'undefined' ? ign : [];
  },

  /** Параметры f(): сообщение / вход-выход / модерация. */
  messageFields: {
    default: { 9: 'sizenick', 10: 'size', 11: 'facenick', 12: 'face' },
    enterExit: { 9: 'mw', 10: 'st', 11: 'icon', 12: 'status', 13: 'love', 14: 'clan' },
    moderation: { 9: 'kill', 10: 'timeout' },
  },
};

const settings = {
  mediaSrc: '../assets', // относительный адрес к медиа файлам
  defaultFont: { // Стандартные настройки шрифтов для ника и текста сообщений
    weight: 'black',
    family: 'Comic Sans MS'
  },

  defaultIcon: `${this.mediaSrc}/img/users/default-icon.jpg`, // Стандартная иконка

  nomerp: 0,
  nomers: 0,
  repeat: 0, // Количество сообщений в топике. 0 - отмена
  topicMessages: 15, // Через сколько сообщений
  numberRoom: 0, // Номер комнаты в которой выводить топик
  chatImages: 0, // 1 - картинки не отображаются, 0 - отображаются
  roomLog: 0, // Загрузка последних сообщений при переходе в комнату, 1 - вкл (перезагрузка фрейма)
  privateFrame: 0, // Приват в отдельном фрейме: 0 - выкл, 1 - вкл (необходимо настроить фреймовую систему)
  genderSeparate: 0, // Использовать никлист с разделением по полам: 0 - выкл, 1 - вкл
  moderStats: [1, 2, 3, 8, 14, 11, 12], // Статусы модераторов
  topic: '<div class="topic"></div>',  // Топик - выводится во фрейме сообщений сразу после загрузки

  // Стартовая разметка истории сообщений
  myhistory1: '<!DOCTYPE html><html lang="ru"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><link rel="stylesheet" type="text/css" href="style.css"></head><body class="header-body">',
  myhistory: '',

  setcursor: 1, // Автофокус поля ввода при наборе текста, 1 - вкл
  nomousemenu: 0, // Запретить правую кнопку мышки, 1 - вкл
  slowscroll: 12, // Скорость прокрутки фрейма сообщений, 0 - выкл, 15 - плавно
  maxmsgs: 0, // Максимальное кол-во сообщений во фрейме, 0 - неограниченно
  maxabc: 5, // Ограничение повторяющихся символов в сообщениях до value, 0 - выкл

  graphNick: 0, // Использовать графники 0 - выкл, 1 - вкл. Добавления графников (img/flash) в gn.js
  gradientNick: 0, // градиентные ники 0 - выкл, 1 - вкл
  gradientText: 0, // градиентный текст gr.js
}

//  --- ПРИВИЛЕГИИ ЧАТА -----------------------------------------------
const privileges = {
  // Невидимки:
  invisible: [],

  // Очистить фрейм (/clear):
  clearer: ['Домовенок'],

  // Удаление сообщений командой (/remove):
  remover: ['FunnyBunny'],

  // Доступ к объявлению (/obya):
  ad_access: ['FunnyBunny'],

  // Перезагрузить чат (/reload):
  reloader: ['FunnyBunny'],

  // Вызвать модальное окно (/alert):
  alerter: [],

  // Перенаправление в комнаты чата
  censor: ['FunnyBunny'],

  // Установить тотальный игнор (/ignore):
  ignorer: ['FunnyBunny'],
}

//  --- ЛИЧНЫЕ ФРАЗЫ -----------------------------------------------
const phrases = {
  /* Приветствие при входе в чат, используйте %nick% для вставки ника. 0 - дефолтный вариант */
  greeting: ['К нам приходит %nick%. Всем привет!', [['Фортуна'], 'Меня зовут, %nick%  и мне поручено передать вам привет. От кого? От моего сердца вам мои любимые!']],

  /* Прощание при выходе из чата. 0 - дефолтный вариант */
  farewell: ['От нас уходит %nick%. Всем пока!', ['FunnyBunny', 'SweetBanny'], 'От нас уходит Администратор чата %nick%. Всем пока, до скорого!']
}

// --- СТАТУСЫ ПОЛЬЗОВАТЕЛЕЙ ------------------------------------------
const status = {
  0: `<img title="Гость" src="${settings.mediaSrc}/img/status/0.gif">`,
  1: `<img title="Админ" src="${settings.mediaSrc}/img/status/1.gif">`,
  2: `<img title="Заместитель админа" src="${settings.mediaSrc}/img/status/2.gif">`,
  3: `<img title="Главный модератор" src="${settings.mediaSrc}/img/status/0.gif">`,
  4: `<img title="Пользователь" src="${settings.mediaSrc}/img/status/0.gif">`,
  5: `<img title="Житель" src="${settings.mediaSrc}/img/status/0.gif">`,
  6: `<img title="Техник" src="${settings.mediaSrc}/img/status/6.png">`,
  7: `<img title="Радиоведущий" src="${settings.mediaSrc}/img/status/7.png">`,
  8: `<img title="Радиоведушая" src="${settings.mediaSrc}/img/status/8.png">`,
  9: `<img title="Модератор" src="${settings.mediaSrc}/img/status/9.png">`,
}

const currentStatus = {
  0: `<img title="свободен" src="${settings.mediaSrc}/img/status/current/0.gif">`,
  1: `<img title="работаю" src="${settings.mediaSrc}/img/status/current/1.gif">`,
  2: `<img title="влюблен" src="${settings.mediaSrc}/img/status/current/2.gif">`,
  3: `<img title="меня нет" src="${settings.mediaSrc}/img/status/current/3.gif">`,
  4: `<img title="сплю" src="${settings.mediaSrc}/img/status/current/4.gif">`,
  5: `<img title="кушаю" src="${settings.mediaSrc}/img/status/current/5.gif">`,
  6: `<img title="бухаю" src="${settings.mediaSrc}/img/status/current/6.gif">`,
  7: `<img title="курю" src="${settings.mediaSrc}/img/status/current/7.gif">`,
  8: `<img title="принимаю ванну" src="${settings.mediaSrc}/img/status/current/8.gif">`,
  9: `<img title="слушаю музыку" src="${settings.mediaSrc}/img/status/current/9.gif">`,
  10: `<img title="в эфире" src="${settings.mediaSrc}/img/status/current/10.gif">`,
  11: `<img title="в ярости" src="${settings.mediaSrc}/img/status/current/11.gif">`,
}

/* --- СТАТУСЫ СООБЩЕНИЙ -----------------------------------------------
0 — Простое в общий чат
1 — Кому-то в общий чат
2 — Мне в общий чат
3 — Приватно кому-то
4 — Приватно мне
*/

/* Сообщение о смене статуса */
var icqtxt = new Array();
var imgChangeStatus = `${settings.mediaSrc}/img/status/current/change-status.png`;

icqtxt[0] = `<img src="${imgChangeStatus}">свободен <img src="${settings.mediaSrc}/img/status/current/0.gif">`;
icqtxt[1] = `<img src="${imgChangeStatus}">работаю <img src="${settings.mediaSrc}/img/status/current/1.gif">`;
icqtxt[2] = `<img src="${imgChangeStatus}">влюблен{на} <img src="${settings.mediaSrc}/img/status/current/2.gif">`;
icqtxt[4] = `<img src="${imgChangeStatus}">меня нет <img src="${settings.mediaSrc}/img/status/current/3.gif">`;
icqtxt[5] = `<img src="${imgChangeStatus}">сплю <img src="${settings.mediaSrc}/img/status/current/4.gif">`;
icqtxt[6] = `<img src="${imgChangeStatus}">кушаю <img src="${settings.mediaSrc}/img/status/current/5.gif">`;
icqtxt[7] = `<img src="${imgChangeStatus}">бухаю <img src="${settings.mediaSrc}/img/status/current/6.gif">`;
icqtxt[8] = `<img src="${imgChangeStatus}">курю <img src="${settings.mediaSrc}/img/status/current/7.gif">`;
icqtxt[9] = `<img src="${imgChangeStatus}">водн.процедуры <img src="${settings.mediaSrc}/img/status/current/8.gif">`;
icqtxt[10] = `<img src="${imgChangeStatus}">слушаю музыку <img src="${settings.mediaSrc}/img/status/current/9.gif">`;
icqtxt[11] = `<img src="${imgChangeStatus}">в эфире <img src="${settings.mediaSrc}/img/status/current/10.gif">`;
icqtxt[12] = `<img src="${imgChangeStatus}">в ярости <img src="${settings.mediaSrc}/img/status/current/11.gif">`;