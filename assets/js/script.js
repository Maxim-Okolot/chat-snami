// ============================================================================
// --- SNAMIK BOT v5 (multi-player games, persistent score) — 25-Jun-2025 -----
// ============================================================================

var SNAMIK_BOT = (function () {
  "use strict";

  /* =================== НАБОРЫ ФРАЗ И ДАННЫЕ =================== */
  const RPS = ['камень', 'ножницы', 'бумага'];

  const DICE_PHRASES = [
    '🎲 Я бросил {a} и {b} (сумма {s}). Твой ход — напиши /бросить!',
    '🎲 Кубики сказали {a}+{b}={s}. Теперь ты!',
    '🎲 Выпало {a} и {b}. Всего {s}. Жду твоего броска!',
    '🎲 Кости показали {a} плюс {b} = {s}. Действуй!'
  ];
  const DICE_WIN = ['🔥 Ты победил!', '👏 Круто, твой бросок выше.', '🎉 Очко в твою пользу!'];
  const DICE_LOSE = ['😎 Я выиграл!', '🤭 Эх, мне повезло больше.', '😜 Моё очко!'];

  const COIN_TOSS = ['ОРЁЛ', 'РЕШКА'];
  const COIN_WIN = ['🎉 Угадал, +1 очко!', '👍 Верно!', '🤑 Фартовый!'];
  const COIN_LOSE = ['🙈 Не угадал.', '😬 Мимо!', '🤞 В следующий раз повезёт.'];


  /* =================== ВИКТОРИНА (слова) =================== */
  const QUIZ_WORDS = ['солнце', 'луна', 'звезда', 'город', 'музыка', 'море', 'лес', 'книга', 'тайна', 'дружба',
    'кошка', 'собака', 'машина', 'компьютер', 'телефон', 'дорога', 'улыбка', 'праздник', 'цветок', 'гора', 'река',
    'океан', 'планета', 'звук', 'свет', 'тень', 'дождь', 'ветер', 'облако', 'снег', 'гром', 'молния', 'огонь', 'дым',
    'пепел', 'камень', 'песок', 'трава', 'лист', 'дерево', 'яблоко', 'груша', 'виноград', 'арбуз', 'тыква', 'карта',
    'глобус', 'страна', 'язык', 'письмо', 'городок', 'станция', 'поезд', 'самолёт', 'аэропорт', 'проект', 'идея',
    'мечта', 'радость', 'смех', 'слово', 'якорь', 'порт', 'корабль', 'парус', 'капитан', 'берег', 'путешествие',
    'тропинка', 'мост', 'секунда', 'минута', 'час', 'день', 'неделя', 'месяц', 'год', 'век', 'история', 'память',
    'культура', 'искусство', 'театр', 'фильм', 'музей', 'картина', 'рисунок', 'музыкант', 'нота', 'песня', 'зеркало',
    'маска', 'ключ', 'замок', 'дверь', 'окно', 'крыло', 'сердце', 'рука', 'глаз', 'искра', 'слеза', 'сон', 'битва',
    'герой', 'сказка', 'загадка', 'шаг', 'след', 'легко'];


  /* =================== ГОРОСКОПЫ =================== */
  const ZODIAC_SIGNS = ['овен', 'телец', 'близнецы', 'рак', 'лев', 'дева', 'весы', 'скорпион', 'стрелец', 'козерог',
    'водолей', 'рыбы'];

  /* =================== АНЕКДОТЫ / ШУТКИ / СОВЕТЫ / ФАКТЫ =================== */
  const ANECDOTES = [
    'Программист — это машина для преобразования кофе в код.',
    '— Ты кто по жизни? — По жизни я root!',
    'Как программисты знакомятся? — Через переменные.',
    'Админ не опаздывает, он задерживается из-за аптайма.',
    '— Мама, я женился! — У тебя баг, сынок.',
    'Два байта идут по улице. Один — ноль, другой — единица.',
    'Почему программисты не боятся темноты? — Там всё равно всё в логах!',
    '— Что делать, если всё сломалось? — Выключи и включи обратно!',
    '— Ты чего такой грустный? — Гугл не помог.',
    'Почему у айтишников нет личной жизни? — У них всегда "ожидание подключения".',
    'Если долго смотреть на монитор, можно увидеть, как приходит дедлайн.',
    'Почему программисты путают Новый год и Хэллоуин? — Потому что Oct 31 = Dec 25!',
    'Кошка упала на клавиатуру и написала лучше, чем я.',
    'Если работаешь айтишником — к тебе все приходят с фразой: "А у меня не работает..."',
    'Учёный: "Теория вероятностей" — Программист: "Наверное, заработает".',
    'Программист в отпуске не отдыхает, а дебажит жизнь.',
    'Самая страшная кнопка — "Форматировать диск".',
    'Как зовут жену программиста? — Переменная!',
    '— Почему не работает интернет? — Сосед качает обновления.',
    'Системный администратор: всегда на связи, даже во сне.'
  ];

  const JOKES_DAY = [
    '— Знаешь, почему у меня нет будильника? — Потому что баги будят по ночам!',
    'Айтишник не уходит — он просто disconnect.',
    'Удалёнка — когда весь офис у тебя под одеялом.',
    'Программист не ошибается — он так закодировал!',
    'В пятницу баги считаются фичами.',
    '— Где кофе? — Без кофе кода не будет!',
    'Работаешь айтишником — значит, умеешь чинить чайник.',
    'Понедельник — это пятница, только наоборот.',
    'Программистов трудно удивить. Они уже всё видели в логах.',
    '— Как дела? — Стабильно зависаю.',
    'У меня два режима: пишу код и думаю о коде.',
    '— На улице дождь? — Сейчас обновлю погоду!',
    'Короткая шутка: релиз без багов.',
    'Если не ошибся — значит, ещё не запускал.',
    'Срок сдачи проекта — это мираж.',
    '— Чем занят? — Оптимизирую прокрастинацию.',
    'Самый короткий отпуск — выходные айтишника.',
    'Любое утро начинается с Ctrl+Alt+Del.',
    'Программист не стареет, он обновляется.',
    '— Кто не работает, тот не багует!'
  ];

  const TIPS_DAY = [
    'Начни день с улыбки — это заразно!',
    'Сделай сегодня хотя бы одну добрую вещь.',
    'Позвони старому другу — это всегда приятно.',
    'Не бойся пробовать новое — успех ждёт за углом.',
    'Найди время для прогулки на свежем воздухе.',
    'Не забывай благодарить людей рядом.',
    'Позволь себе небольшой отдых.',
    'Слушай музыку — она поднимает настроение.',
    'Поставь цель на день и выполни её.',
    'Делай перерывы во время работы за компом.',
    'Пей больше воды — организм скажет спасибо.',
    'Не стесняйся просить помощи.',
    'Пробуй радоваться мелочам.',
    'Не сравнивай себя с другими — ты уникален!',
    'Обними кого-нибудь — просто так.',
    'Запиши свою маленькую победу сегодня.',
    'Поделись хорошей новостью с близким.',
    'Не откладывай приятные встречи.',
    'Занимайся тем, что приносит радость.',
    'Чаще говори себе: "Я молодец!"'
  ];

  const FACTS_DAY = [
    'Сердце креветки находится в её голове!',
    'Муравьи никогда не спят.',
    'В Японии есть остров, где живут только кролики.',
    'Мёд никогда не портится — его можно есть через тысячи лет.',
    'Осьминоги имеют три сердца.',
    'Бананы — это ягоды, а клубника нет!',
    'Дельфины дают друг другу имена.',
    'Колибри — единственная птица, способная летать назад.',
    'У жирафа такой же шейный отдел, как у человека — 7 позвонков.',
    'Вулканическая молния возникает прямо внутри извержения.',
    'Молоко фламинго розовое!',
    'Бабочка пробует вкус лапками.',
    'У акулы нет костей — только хрящи.',
    'Кенгуру не могут двигаться назад.',
    'Вода в облаке может весить больше тонны!',
    'У слона ухо весит до 30 кг.',
    'У пчёл пять глаз.',
    'Морские звёзды могут переворачивать желудок наружу.',
    'Самый маленький динозавр размером с курицу.',
    'У устриц меняется пол много раз за жизнь.'
  ];


  function resolveHoroscopeAsk(command, parts) {
    if (command === 'гороскоп') {
      const s = (parts[0] || '').toLowerCase();
      if (!s) return 'HELP';
      if (ZODIAC_SIGNS.indexOf(s) !== -1) return s;
      return 'HELP';
    }
    if (ZODIAC_SIGNS.indexOf(command) !== -1) return command;
    return null;
  }

  function snamikHoroscopeApiUrl(signRu) {
    var base = '/index.php';
    try {
      if (typeof location !== 'undefined' && location.pathname) {
        base = location.pathname;
        if (base.slice(-1) === '/') base += 'index.php';
      }
    } catch (e) {
    }
    return base + '?snamik_horoscope=1&sign=' + encodeURIComponent(signRu);
  }

  /** Ключ строки лога: при F5 история снова гонится через f() — без дедупа повторяется запрос к API. */
  function snamikHoroscopeLogKey(room, cmd, time, nick, text) {
    return 'snamik_horo_msg|' + String(room != null ? room : '') + '|' + String(cmd != null ? cmd : '') + '|' + String(time != null ? time : '') + '|' + String(nick) + '|' + String(text).trim();
  }

  function snamikHoroscopeReplaySeen(key) {
    try {
      return typeof sessionStorage !== 'undefined' && sessionStorage.getItem(key) === '1';
    } catch (e) {
      return false;
    }
  }

  function snamikHoroscopeReplayMark(key) {
    try {
      if (typeof sessionStorage !== 'undefined' && key) sessionStorage.setItem(key, '1');
    } catch (e) {
    }
  }

  var snamikHoroscopeInFlight = {};

  function fetchDailyHoroscope(signRu, dedupeKey) {
    var flightKey = 'horo|' + String(signRu);
    if (snamikHoroscopeInFlight[flightKey] && (Date.now() - snamikHoroscopeInFlight[flightKey]) < 8000) return;
    snamikHoroscopeInFlight[flightKey] = Date.now();
    var DELAY = 1500;
    var url = snamikHoroscopeApiUrl(signRu);
    var fallback = function () {
      setTimeout(function () {
        send('[Снамик] Не удалось загрузить гороскоп. Попробуй чуть позже.');
      }, DELAY);
    };
    try {
      if (typeof fetch !== 'function') {
        fallback();
        return;
      }
      fetch(url, {credentials: 'same-origin', cache: 'no-store'})
        .then(function (r) {
          if (!r.ok) throw new Error('http');
          return r.text();
        })
        .then(function (raw) {
          var j;
          try {
            j = JSON.parse(raw);
          } catch (e) {
            throw new Error('json');
          }
          if (j && j.ok && j.text) {
            if (dedupeKey) snamikHoroscopeReplayMark(dedupeKey);
            setTimeout(function () {
              send('[Снамик] ' + j.text);
            }, DELAY);
          } else {
            fallback();
          }
        })
        .catch(function () {
          fallback();
        });
    } catch (e) {
      fallback();
    }
  }

  /* =================== ГЛОБАЛЬНЫЕ ТЕГИ =================== */
  const SCORE_TAG = '[Снамик:счёт]';
  const STATE_TAG = '[Снамик:state]'; // оставили, но теперь это map ник→state
  const SNAMIK_MSG_PREFIX = '[Снамик] ';

  /* =================== ПАМЯТЬ =================== */
  let scores = {};  // { nick: points }
  let states = {};  // { nick: {game:…, …} }

  /* =================== КОЛЛЕКЦИОННЫЕ КАРТОЧКИ =================== */
// Список всех возможных карточек
  const CARDS = [
    {name: 'Мем-кот', rarity: 'обычная', desc: 'Кот с мемной рожей', img: 'https://i.imgur.com/1.jpg'},
    {name: 'Смешной баг', rarity: 'обычная', desc: 'Легендарный баг чата', img: 'https://i.imgur.com/2.jpg'},
    {name: 'Звезда чата', rarity: 'редкая', desc: 'Самый активный участник', img: 'https://i.imgur.com/3.jpg'},
    {name: 'Кубик удачи', rarity: 'обычная', desc: 'Символ удачи в играх', img: 'https://i.imgur.com/4.jpg'},
    {name: 'Шутка дня', rarity: 'редкая', desc: 'Эксклюзивная шутка', img: 'https://i.imgur.com/5.jpg'},
    {name: 'Золотой ник', rarity: 'эпик', desc: 'Владелец золотого ника', img: 'https://i.imgur.com/6.jpg'},
    {name: 'Кот-админ', rarity: 'редкая', desc: 'Кот с правами админа', img: 'https://i.imgur.com/7.jpg'},
    {name: 'Секретный мем', rarity: 'легенда', desc: 'Очень редкая карточка!', img: 'https://i.imgur.com/8.jpg'},
    {name: 'Удачный бросок', rarity: 'обычная', desc: 'Выпал дубль шестерок!', img: 'https://i.imgur.com/9.jpg'},
    {name: 'Победитель викторины', rarity: 'эпик', desc: 'За победу в викторине', img: 'https://i.imgur.com/10.jpg'},
    {name: 'Чат-бот', rarity: 'обычная', desc: 'Карточка с ботом чата', img: 'https://i.imgur.com/11.jpg'},
    {name: 'Смайлик дня', rarity: 'обычная', desc: 'Самый популярный смайл', img: 'https://i.imgur.com/12.jpg'},
    {name: 'Праздничная', rarity: 'редкая', desc: 'Выпадает только в праздники', img: 'https://i.imgur.com/13.jpg'},
    {name: 'Топ-1 недели', rarity: 'легенда', desc: 'Только для лучших!', img: 'https://i.imgur.com/14.jpg'},
    {name: 'Секретный код', rarity: 'эпик', desc: 'Найди секретную команду!', img: 'https://i.imgur.com/15.jpg'}
  ];

// Хранилище коллекций пользователей
  let collections = {}; // { nick: [ {card, date}, ... ] }
  try {
    collections = JSON.parse(localStorage.getItem('SNAMIK_COLLECTIONS') || '{}');
  } catch (e) {
    collections = {};
  }

// Сохраняет коллекцию
  function saveCollection() {
    localStorage.setItem('SNAMIK_COLLECTIONS', JSON.stringify(collections));
  }

// Получить список уникальных карточек пользователя
  function getUserCards(nick) {
    if (!collections[nick]) return [];
    // Вернуть только уникальные карточки по имени
    const seen = {};
    return collections[nick].filter(c => {
      if (seen[c.card.name]) return false;
      seen[c.card.name] = true;
      return true;
    });
  }

  /* ========== ФУНКЦИИ ДЛЯ КАРТОЧЕК =================== */

// Выдать случайную карточку (раз в 5 минут)
  const CARD_COOLDOWN = 5 * 60 * 1000; // 5 минут
  let lastCardTime = {}; // { nick: timestamp }

  function giveCard(nick, forcedRarity) {
    const now = Date.now();
    if (!lastCardTime[nick]) lastCardTime[nick] = 0;
    if (!forcedRarity && now - lastCardTime[nick] < CARD_COOLDOWN) {
      const mins = Math.ceil((CARD_COOLDOWN - (now - lastCardTime[nick])) / 60000);
      return `⏳ Получать карточку можно раз в 5 минут. Осталось ждать: ${mins} мин.`;
    }
    // Выбор карточки: если задана редкость — только из этой редкости
    let pool = CARDS;
    if (forcedRarity) pool = CARDS.filter(c => c.rarity === forcedRarity);
    if (!pool.length) return 'Сейчас нет карточек для выдачи. Попробуй позже.';
    const card = rand(pool);
    if (!card) return 'Не удалось выбрать карточку. Попробуй ещё раз.';
    if (!collections[nick]) collections[nick] = [];
    collections[nick].push({card, date: now});
    saveCollection();
    lastCardTime[nick] = now;
    return `🎴 Поздравляем! Вы получили карточку: «${card.name}» [${card.rarity}] — ${card.desc}`;
  }

// Показать альбом пользователя
  function showAlbum(nick) {
    const cards = getUserCards(nick);
    if (!cards.length) return 'У вас пока нет карточек. Получите первую командой /карточка!';
    let txt = `Альбом карточек ${nick}:\n`;
    cards.forEach(c => {
      txt += `• ${c.card.name} [${c.card.rarity}] — ${c.card.desc}\n`;
    });
    txt += `\nВсего уникальных: ${cards.length}`;
    return txt;
  }

// Показать топ коллекционеров
  function showCollectorsTop() {
    const arr = Object.entries(collections)
      .map(([nick, arr]) => [nick, getUserCards(nick).length])
      .filter(([nick, cnt]) => cnt > 0)
      .sort((a, b) => b[1] - a[1]);
    if (!arr.length) return 'Коллекционеров пока нет!';
    let txt = 'Топ коллекционеров:\n';
    arr.forEach(([nick, cnt], i) => {
      txt += `${i + 1}. ${nick} — ${cnt} карточек\n`;
    });
    return txt;
  }

// Обмен карточками
  function exchangeCards(from, to, cardName) {
    if (!collections[from] || !collections[to]) return 'Оба пользователя должны иметь хотя бы одну карточку!';
    const fromCards = getUserCards(from);
    const toCards = getUserCards(to);
    const card = fromCards.find(c => c.card.name.toLowerCase() === cardName.toLowerCase());
    if (!card) return 'У вас нет такой карточки для обмена!';
    if (toCards.find(c => c.card.name === card.card.name)) return 'У второго пользователя уже есть эта карточка!';
    // Удаляем у отправителя (только одну!)
    let removed = false;
    collections[from] = collections[from].filter(c => {
      if (!removed && c.card.name === card.card.name) {
        removed = true;
        return false;
      }
      return true;
    });
    // Добавляем получателю
    collections[to].push({card: card.card, date: Date.now()});
    saveCollection();
    return `✅ Карточка «${card.card.name}» передана пользователю ${to}.`;
  }

// Битва карточек (рандомная карточка vs рандомная карточка)
  function cardBattle(nick1, nick2) {
    const cards1 = getUserCards(nick1);
    const cards2 = getUserCards(nick2);
    if (!cards1.length || !cards2.length) return 'У обоих участников должна быть хотя бы одна карточка!';
    const card1 = rand(cards1).card;
    const card2 = rand(cards2).card;
    // Система очков: легенда > эпик > редкая > обычная
    const power = {'обычная': 1, 'редкая': 2, 'эпик': 3, 'легенда': 4};
    let txt = `⚔️ Битва карточек!\n${nick1}: «${card1.name}» [${card1.rarity}]\n${nick2}: «${card2.name}» [${card2.rarity}]\n`;
    if (power[card1.rarity] > power[card2.rarity]) txt += `🏆 Победил ${nick1}!`;
    else if (power[card1.rarity] < power[card2.rarity]) txt += `🏆 Победил ${nick2}!`;
    else txt += '🤝 Ничья!';
    return txt;
  }


  /* ==== загружаем счёт из localStorage (автосоздание при первом запуске) */
  try {
    scores = JSON.parse(localStorage.getItem('SNAMIK_SCORES') || '{}');
  } catch (e) {
    scores = {};
  }

  /* =================== ВСПОМОГАТЕЛЬНЫЕ =================== */
  const rand = arr => {
    if (!arr || !arr.length) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  };

  function snamikGetHiddenFrame() {
    try {
      if (typeof hidden !== 'undefined' && hidden) return hidden;
      if (typeof window !== 'undefined' && window.frames && window.frames.hidden) return window.frames.hidden;
      if (typeof parent !== 'undefined' && parent.hidden) return parent.hidden;
    } catch (e) {
    }
    return null;
  }

  function snamikGetYourkey() {
    try {
      if (typeof yourkey !== 'undefined' && yourkey) return yourkey;
      if (typeof parent !== 'undefined' && parent.yourkey) return parent.yourkey;
    } catch (e) {
    }
    return '';
  }

  function snamikPostWrite(msg) {
    /* Отправка через ту же форму fmsg, что и обычные сообщения (form.submit() без onsubmit) */
    var form = document.fmsg;
    if (!form) return false;
    var textEl = form.elements['text'];
    if (!textEl) return false;
    var saved = textEl.value;
    textEl.value = msg;
    try {
      form.submit();
    } catch (e) {
      textEl.value = saved;
      return false;
    }
    textEl.value = saved;
    return true;
  }

  function snamikWriteUrl(msg) {
    var key = snamikGetYourkey();
    return 'index.php?inc=write' + (key ? '&' + key : '') + '&text=' + encodeURIComponent(msg) + '&r=' + Math.random();
  }

  var snamikPendingReplies = {};

  function snamikTrackOutgoingReply(msg) {
    snamikPendingReplies[String(msg)] = Date.now();
  }

  function snamikShouldSkipDuplicateReply(nick, text) {
    text = String(text == null ? '' : text);
    if (text.indexOf(SNAMIK_MSG_PREFIX) !== 0) return false;
    var myNick = (typeof mynick !== 'undefined' && mynick) ? snamikNormalizeNick(mynick) : '';
    if (!myNick || !snamikNickEqual(nick, myNick)) return false;
    var key = text;
    var stamp = snamikPendingReplies[key];
    if (!stamp) return false;
    if (stamp === 'shown') return true;
    if (typeof stamp === 'number' && (Date.now() - stamp) < 20000) {
      snamikPendingReplies[key] = 'shown';
      return false;
    }
    return false;
  }

  var snamikSuppressServerBotUntil = 0;

  function snamikMarkServerBotSuppress(ms) {
    snamikSuppressServerBotUntil = Date.now() + (ms || 10000);
  }

  function snamikIsServerBotNick(nick) {
    var n = snamikNormalizeNick(nick).toLowerCase();
    return n === 'снамик' || n === 'snamik';
  }

  function snamikOnBotCommandHandled() {
    snamikMarkServerBotSuppress(10000);
  }

  const send = msg => {
    snamikTrackOutgoingReply(msg);
    if (!snamikPostWrite(msg)) {
      var key = snamikGetYourkey();
      var url = 'index.php?inc=write' + (key ? '&' + key : '') + '&text=' + encodeURIComponent(msg) + '&r=' + Math.random();
      try {
        var frame = snamikGetHiddenFrame();
        if (frame) frame.location.href = url;
      } catch (e) {
      }
    }
    snamikOnBotCommandHandled();
  };

  function snamikNormalizeNick(nick) {
    return String(nick == null ? '' : nick).replace(/\s+/g, ' ').trim();
  }

  function snamikNickEqual(a, b) {
    return snamikNormalizeNick(a).toLowerCase() === snamikNormalizeNick(b).toLowerCase();
  }

  function snamikParseUserText(text) {
    var t = String(text == null ? '' : text).replace(/\s+/g, ' ').trim();
    var addrMatch = t.match(/^[^:\/]+\s*:\s+(\S.*)$/);
    if (addrMatch) t = addrMatch[1].trim();
    var prefixes = ['/vsem ', '/dev ', '/parn ', '/privat ', '/privat2 ', '/me ', '/call '];
    for (var i = 0; i < prefixes.length; i++) {
      if (t.indexOf(prefixes[i]) === 0) {
        t = t.slice(prefixes[i].length).trim();
        break;
      }
    }
    var isCmd = t.charAt(0) === '/';
    var raw = isCmd ? t.slice(1).trim() : t;
    var parts = raw ? raw.split(/\s+/) : [];
    var command = isCmd && parts.length ? parts.shift().toLowerCase() : '';
    return {isCmd: isCmd, raw: raw, parts: parts, command: command, fullText: t};
  }

  var snamikHandledOutgoing = {};

  function snamikMarkHandled(key) {
    if (key) snamikHandledOutgoing[key] = Date.now();
  }

  function snamikWasHandled(key) {
    return !!(key && snamikHandledOutgoing[key] && (Date.now() - snamikHandledOutgoing[key]) < 2500);
  }

  const broadcast = (obj, tag) =>
    setTimeout(() => send(tag + JSON.stringify(obj)), 300);

  /* ======== SCORE ======== */
  const addScore = (nick, pts) => {
    scores[nick] = (scores[nick] || 0) + pts;
    localStorage.setItem('SNAMIK_SCORES', JSON.stringify(scores));
    broadcast(scores, SCORE_TAG);
  };
  const applyScore = txt => {
    try {
      scores = JSON.parse(txt.slice(SCORE_TAG.length));
    } catch (e) {
    }
  };

  /* ======== STATE ======== */
  const saveState = (nick, st) => {
    if (st) states[nick] = st; else delete states[nick];
    broadcast(states, STATE_TAG);
  };
  const applyState = txt => {
    try {
      states = JSON.parse(txt.slice(STATE_TAG.length));
    } catch (e) {
    }
  };


  /* ======== RPS GAME ======== */
  function playRPS(nick, userMove) {
    const botMove = rand(RPS);
    let outcome;
    if (botMove === userMove) outcome = 'Ничья!';
    else if (
      (userMove === 'камень' && botMove === 'ножницы') ||
      (userMove === 'ножницы' && botMove === 'бумага') ||
      (userMove === 'бумага' && botMove === 'камень')
    ) {
      addScore(nick, 1);
      outcome = '🎉 Ты победил! | Твой счёт: ' + scores[nick];
    } else {
      outcome = '😜 Я победил!';
    }
    return `Я выбрал ${botMove}. ${outcome}`;
  }

  /* ======== DICE GAME ======== */
  function startDice(nick) {
    const a = 1 + Math.floor(Math.random() * 6),
      b = 1 + Math.floor(Math.random() * 6),
      s = a + b;
    saveState(nick, {game: 'dice', botSum: s});
    return rand(DICE_PHRASES)
      .replace('{a}', a).replace('{b}', b).replace('{s}', s);
  }

  function finishDice(nick) {
    const st = states[nick];
    if (!st) return;
    const a = 1 + Math.floor(Math.random() * 6),
      b = 1 + Math.floor(Math.random() * 6),
      s = a + b, bot = st.botSum;
    let txt = `Твой бросок: ${a} и ${b} = ${s}. `;
    if (s > bot) {
      addScore(nick, 1);
      txt += rand(DICE_WIN) + ` | Твой счёт: ${scores[nick]}`;
    } else if (s < bot) {
      txt += rand(DICE_LOSE);
    } else txt += 'Ничья!';
    saveState(nick, null);
    return txt;
  }

  /* ======== COIN GAME ======== */
  function startCoin(nick) {
    saveState(nick, {game: 'coin'});
    return 'Загадай сторону – /орёл или /решка';
  }

  function finishCoin(nick, call) {
    const flip = rand(COIN_TOSS);
    let txt = `Выпал ${flip}! `;
    if (flip.toLowerCase() === call.toLowerCase()) {
      addScore(nick, 1);
      txt += rand(COIN_WIN) + ` | Твой счёт: ${scores[nick]}`;
    } else txt += rand(COIN_LOSE);
    saveState(nick, null);
    return txt;
  }

  /* Команды чата mpchat — не показывать по ним справку бота */
  var CHAT_SLASH_COMMANDS = {
    privat: 1, privat2: 1, vsem: 1, dev: 1, parn: 1, me: 1, call: 1, msg: 1,
    remove: 1, kill: 1, reload: 1, clear: 1, alert: 1, obya: 1, ban: 1, kick: 1,
    deportation: 1, amnesty: 1, camcam: 1, quote: 1, nick: 1, status: 1, room: 1,
    ping: 1, ignore: 1
  };

  function isChatSlashCommand(cmd) {
    return !!(cmd && CHAT_SLASH_COMMANDS[cmd]);
  }

  var CMDLIST_MARKER = '[[CMDLIST]]';
  var CMDLIST_UNKNOWN_MARKER = '[[CMDLIST_UNKNOWN]]';

  function getCommandsHelp() {
    return CMDLIST_MARKER;
  }

  function buildCommandsHelpHtml(unknown) {
    function chips(cmds) {
      return cmds.map(function (c) {
        return '<code class="snimik-cmd">' + c + '</code>';
      }).join('');
    }
    function section(title, cmds, note) {
      var s = '<div class="snimik-bot-cmdlist__section">';
      s += '<div class="snimik-bot-cmdlist__heading">' + title + '</div>';
      s += '<div class="snimik-bot-cmdlist__cmds">' + chips(cmds) + '</div>';
      if (note) s += '<div class="snimik-bot-cmdlist__note">' + note + '</div>';
      return s + '</div>';
    }
    var h = '<div class="snimik-bot-cmdlist">';
    if (unknown) h += '<div class="snimik-bot-cmdlist__alert">Неизвестная команда</div>';
    h += '<div class="snimik-bot-cmdlist__title">Команды Снамика</div>';
    h += section('Гороскоп', ['/гороскоп'].concat(ZODIAC_SIGNS.map(function (z) { return '/' + z; })));
    h += section('Развлечения', ['/анекдот', '/шутка', '/совет', '/факт']);
    h += section('Игры', ['/камень', '/ножницы', '/бумага', '/кости', '/бросить', '/монетка', '/орёл', '/решка', '/число', '/слово', '/отмена'],
      'После /кости — /бросить, после /монетка — /орёл или /решка');
    h += section('Счёт', ['/очки', '/топ']);
    h += section('Карточки', ['/карточка', '/альбом', '/коллекторы', '/обмен', '/битва'],
      '/альбом [ник], /обмен ник название, /битва ник');
    h += section('Справка', ['/помощь']);
    return h + '</div>';
  }

  function formatBotMessage(body) {
    body = String(body == null ? '' : body).trim();
    if (body === CMDLIST_MARKER) return buildCommandsHelpHtml(false);
    if (body === CMDLIST_UNKNOWN_MARKER) return buildCommandsHelpHtml(true);
    if (body.indexOf('Доступные команды') >= 0 || body.indexOf('&lt;b&gt;') >= 0 || body.indexOf('<b>') >= 0) {
      return buildCommandsHelpHtml(body.indexOf('Неизвестная') >= 0);
    }
    return body;
  }

  /* Продолжение текущей игры (остальные /команды — новая команда, старая игра сбрасывается) */
  function isGameContinuation(cmd, game) {
    if (!cmd || !game) return false;
    if (game === 'dice') return cmd === 'бросить';
    if (game === 'coin') return cmd === 'орёл' || cmd === 'орел' || cmd === 'решка';
    if (game === 'guess') return /^\d+$/.test(cmd);
    return false;
  }

  /* ======== ОБРАБОТКА КОМАНД ======== */
  function handle(cmd, args, raw, nick, fullText) {
    const ft = String(fullText != null ? fullText : '').trim();
    /* продолжение раунда, если он есть именно у автора */
    let st = states[nick];
    if (st && (cmd === 'отмена' || cmd === 'cancel')) {
      saveState(nick, null);
      return 'Ок, остановили игру.';
    }
    if (st && ft.startsWith('/') && cmd && !isGameContinuation(cmd, st.game)) {
      saveState(nick, null);
      st = null;
    }
    if (st) {

      if (st.game === 'quiz') {
        if (raw.startsWith('[Снамик]')) return;
        if (!ft.startsWith('/')) return finishQuiz(nick, raw);
      }

      if (st.game === 'guess') {
        if (!ft.startsWith('/')) {
          const g = parseInt(raw, 10);
          if (!isNaN(g)) return finishGuess(nick, g);
        } else if (cmd && /^\d+$/.test(cmd)) {
          return finishGuess(nick, parseInt(cmd, 10));
        }
      }
      if (st.game === 'dice' && cmd === 'бросить')
        return finishDice(nick);

      if (st.game === 'coin' && (cmd === 'орёл' || cmd === 'орел' || cmd === 'решка'))
        return finishCoin(nick, cmd);

    }
// --- ГОРОСКОПЫ: актуальный текст через index.php?snamik_horoscope=1 (см. listener + fetchDailyHoroscope) ---

// --- АНЕКДОТЫ / ШУТКИ / СОВЕТЫ / ФАКТЫ ---
    if (cmd === 'анекдот' || cmd === 'анек') {
      return rand(ANECDOTES);
    }
    if (cmd === 'шутка' || cmd === 'шуткадня') {
      return rand(JOKES_DAY);
    }
    if (cmd === 'совет' || cmd === 'советдня') {
      return rand(TIPS_DAY);
    }
    if (cmd === 'факт' || cmd === 'фактдня' || cmd === 'интересныйфакт') {
      return rand(FACTS_DAY);
    }


    // --- КОЛЛЕКЦИОННЫЕ КАРТОЧКИ ---
    if (cmd === 'карточка') {
      return giveCard(nick);
    }
    if (cmd === 'альбом') {
      // /альбом ник — посмотреть чужой альбом
      const target = args[0] ? args[0] : nick;
      return showAlbum(target);
    }
    if (cmd === 'коллекторы' || cmd === 'коллекционеры' || cmd === 'топкарт') {
      return showCollectorsTop();
    }
    if (cmd === 'обмен') {
      // /обмен ник карточка
      const to = args[0];
      const cardName = args.slice(1).join(' ');
      if (!to || !cardName) return 'Используйте: /обмен ник название_карточки';
      if (to === nick) return 'Нельзя обмениваться с самим собой!';
      if (!collections[nick] || !getUserCards(nick).length) return 'У вас пока нет карточек для обмена!';
      if (!collections[to]) return 'У этого пользователя нет карточек!';
      return exchangeCards(nick, to, cardName);
    }
    if (cmd === 'битва') {
      // /битва ник
      const enemy = args[0];
      if (!enemy) return 'Используйте: /битва ник';
      if (enemy === nick) return 'Битва с самим собой невозможна!';
      if (!collections[enemy]) return 'У этого пользователя нет карточек!';
      return cardBattle(nick, enemy);
    }


    if (cmd === 'бросить') return 'Сначала начни игру: /кости';
    if (cmd === 'орёл' || cmd === 'орел' || cmd === 'решка') return 'Сначала брось монетку: /монетка';

    /* запуск новых игр или сервис-команды */
    switch (cmd) {
      case 'счёт':
      case 'счет':
      case 'очки':
        return `Твой счёт: ${scores[nick] || 0}`;

      case 'топ': {
        const rows = Object.entries(scores)
          .sort((a, b) => b[1] - a[1])
          .map(([n, p]) => `${n} — ${p}`)
          .join('\n');
        return 'Таблица очков:\n' + (rows || 'Пока пусто');
      }


      case 'камень':
      case 'ножницы':
      case 'бумага':
        return playRPS(nick, cmd);
      case 'кости':
        return startDice(nick);
      case 'монетка':
        return startCoin(nick);
      case 'слово':
      case 'викторина':
      case 'угадайслово':
        return startQuiz(nick);
      case 'число':
      case 'угадай':
        return startGuess(nick);

      case 'помощь':
      case 'help':
      case 'команды':
        return getCommandsHelp();
    }
    return null;
  }


  /* ======== GUESS NUMBER GAME ======== */
  function startGuess(nick) {
    const num = 1 + Math.floor(Math.random() * 100);
    saveState(nick, {game: 'guess', number: num, tries: 0});
    return '🔢 Я загадал число от 1 до 100. Попробуй угадать!';
  }

  function finishGuess(nick, guess) {
    const st = states[nick];
    if (!st) return;
    st.tries++;
    if (guess === st.number) {
      addScore(nick, 1);
      saveState(nick, null);
      return `🎉 Верно! Я загадал ${st.number}. Ты угадал с ${st.tries}-й попытки. +1 очко, теперь у тебя: ${scores[nick]}`;
    }
    saveState(nick, st);
    return guess < st.number ? '🔼 Больше!' : '🔽 Меньше!';
  }


  /* ======== QUIZ WORD GAME ======== */
  function startQuiz(nick) {
    const word = rand(QUIZ_WORDS);
    saveState(nick, {game: 'quiz', word: word, tries: 0});
    return `📝 Я загадал слово из ${word.length} букв. Попробуй угадать!`;
  }

  function finishQuiz(nick, guessRaw) {
    const st = states[nick];
    if (!st) return;
    const guess = guessRaw.toLowerCase().replace(/^\//, '').trim();
    if (!guess) return 'Напиши слово!';
    st.tries = (st.tries || 0) + 1;

    if (guess === st.word) {
      addScore(nick, 1);
      saveState(nick, null);
      return `🎉 Верно! Я загадал «${st.word}». Ты угадал с ${st.tries}-й попытки. +1 очко, теперь у тебя: ${scores[nick]}`;
    }

    let hint;
    if (st.tries <= 2) {
      hint = guess < st.word ? '📈 Моё слово позже по алфавиту.' : '📉 Моё слово раньше по алфавиту.';
    } else if (st.tries <= 4) {
      hint = `🔤 Моё слово начинается на «${st.word[0].toUpperCase()}…».`;
    } else if (st.tries <= 6) {
      hint = `🔡 Начинается на «${st.word[0].toUpperCase()}» и заканчивается на «${st.word.slice(-1).toUpperCase()}».`;
    } else {
      if (!st.revealed) {
        if (st.word.length <= 1) st.revealed = [0];
        else st.revealed = [0, st.word.length - 1];
      }
      const open = [];
      for (let i = 0; i < st.word.length; i++) {
        if (!st.revealed.includes(i)) open.push(i);
      }
      if (open.length > 0) {
        const pick = open[Math.floor(Math.random() * open.length)];
        st.revealed.push(pick);
      }
      const pattern = st.word.split('').map((ch, i) => (st.revealed.includes(i) ? ch : '_')).join('');
      hint = `⏳ Подсказка: ${pattern}`;
    }

    saveState(nick, st);
    return hint;
  }

  /* ======== LISTENER (вызывается из основного f) ======== */
  function listener(room, cmd, nick, tonick, text, time) {
    text = String(text == null ? '' : text);
    /* --- Всегда применяем счёт/состояние, чтобы синхронизироваться между клиентами --- */
    if (text.startsWith(SCORE_TAG)) {
      applyScore(text);
      return;
    }
    if (text.startsWith(STATE_TAG)) {
      applyState(text);
      return;
    }

    /* --- Определяем собственный ник, который известен в разных реализациях --- */
    var myNick = (typeof mynick !== 'undefined' && mynick) ? mynick :
      (typeof parent !== 'undefined' && parent.mynick ? parent.mynick : null);
    myNick = snamikNormalizeNick(myNick);
    nick = snamikNormalizeNick(nick);

    /* Если не удалось определить собственный ник — подстраховка: не отвечаем во избежание дублей */
    if (!myNick) return;

    /* --- Реагируем ТОЛЬКО на сообщения, отправленные текущим пользователем --- */
    if (!snamikNickEqual(nick, myNick)) return;

    var parsed = snamikParseUserText(text);
    var isCmd = parsed.isCmd;
    var raw = parsed.raw;
    var parts = parsed.parts;
    var command = parsed.command;
    var dedupeKey = myNick + '|' + parsed.fullText;

    if (snamikWasHandled(dedupeKey)) return;

    const horoAsk = resolveHoroscopeAsk(command, parts);
    if (horoAsk !== null) {
      var horoKey = snamikHoroscopeLogKey(room, cmd, time, nick, text);
      if (snamikHoroscopeReplaySeen(horoKey)) return;
      snamikMarkHandled(dedupeKey);
      if (horoAsk === 'HELP') {
        snamikHoroscopeReplayMark(horoKey);
        const msg = 'Напиши свой знак, например: /овен, /рак, /рыбы\n\nДоступны: ' + ZODIAC_SIGNS.join(', ');
        setTimeout(function () {
          send('[Снамик] ' + msg);
        }, 1500);
        return;
      }
      fetchDailyHoroscope(horoAsk, horoKey);
      return;
    }

    const reply = handle(command, parts, raw, myNick, parsed.fullText);

    if (reply) {
      snamikMarkHandled(dedupeKey);
      const DELAY = 1500; // «человечная» задержка ответа
      setTimeout(function () {
        send('[Снамик] ' + reply);
      }, DELAY);
    } else if (isCmd && command && !isChatSlashCommand(command)) {
      snamikMarkHandled(dedupeKey);
      setTimeout(function () {
        send('[Снамик] ' + CMDLIST_UNKNOWN_MARKER);
      }, 1500);
    }
  }

  function onOutgoingMessage(text) {
    var nick = (typeof mynick !== 'undefined' && mynick) ? snamikNormalizeNick(mynick) : '';
    if (!nick) return;
    var now = new Date();
    var time = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2);
    var room = (typeof myroom !== 'undefined') ? myroom : 0;
    listener(room, 0, nick, '', String(text), time);
  }

  function shouldSkipEcho(nick, text) {
    return snamikShouldSkipDuplicateReply(nick, text);
  }

  function shouldSkipServerBot(nick, text) {
    if (Date.now() >= snamikSuppressServerBotUntil) return false;
    return snamikIsServerBotNick(nick);
  }

  return {
    listener: listener,
    onOutgoingMessage: onOutgoingMessage,
    shouldSkipEcho: shouldSkipEcho,
    shouldSkipServerBot: shouldSkipServerBot,
    parseUserText: snamikParseUserText,
    formatMessage: formatBotMessage,
    version: '5.4'
  };

})(); // --- END SNAMIK BOT v5 --------------------------------------

//  --- НАСТРОЙКИ ЧАТА -----------------------------------------------
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


/* Топик - выводится в фрейме сообщений сразу после загрузки */
var topic = "<br><center><img src=''></center>";

/* 1 - картинки не отображаются, 0 - отображаются */
var img_no = 0;

/* Загрузка посл. сообщ. при переходе в комнату, 1 - вкл (перезагрузка фрейма) */
var roomlog = 0;

/* Приват в отдельном фрейме: 0 - выкл, 1 - вкл (необходимо настроить фреймовую систему) */
var privatok = 0;

/* Использовать никлист с разделением по полам: 0 - выкл, 1 - вкл */
var useseparate = 1;


/* Начальный HTML - код истории ваших и отправленных вам сообщений */
var myhistory1 = "<!DOCTYPE html><html><head><META http-equiv=Content-Type content='text/html; charset=UTF-8'><link rel=STYLESHEET type=text/css href=style.css></head><body class=header-body>";
var myhistory = "";

/* Автоматический перенос курсора встроку ввода текста при печатании, 1 - вкл */
var setcursor = 1;

/* Запретить правую кнопку мышки, 1 - вкл */
var nomousemenu = 0;

/* Замедление прокрутки фрейма сообщений, 0 - выкл, 15 - плавно */
var slowscroll = 12;

/* Максимум отображать сообщений в фрейме сообщений, 0 - неогр */
var maxmsgs = 0;

/* Урезать повторяющиеся символы в сообщениях до maxabc, 0 - выкл */
var maxabc = 5;


/* Ники невидимок, пример: invisible['nick']=1; */
var invisible = new Array();
invisible[''] = 1;

/* Ники чистильщиков экрана(/clear): clearer['nick']=1; */
var clearer = new Array();
clearer['Домовенок'] = 1;

/* Ники модераторов удаляющих сообщения командой /remove */
var remover = new Array();
remover['FunnyBunny'] = 1;

/* Ники доступ к объявлению (/obya): alerter['nick']=1; */
var ad_access = new Array();
ad_access['FunnyBunny'] = 1;


/* Ники перезагрузчиков чата(/reload): reloader['nick']=1; */
var reloader = new Array();
reloader ['FunnyBunny'] = 1;


/* Ники вызывальщиков алертом(/alert): alerter['nick']=1; */
var alerter = new Array();

/* Ники перенаправляющих в комнаты чата */
var censor = [];
censor['FunnyBunny'] = 1;

/* Ники установщиков тотального игнора (/ignore): ignorer['nick']=1; */
var ignorer = new Array();
ignorer['FunnyBunny'] = 1;



/* Граф. ники: 0 - выкл, 1 - вкл, позиции в списке - это номера функций "cmd" от 0-10(11-никлист) */
var use_gn = 1;
var gnok = new Array(1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1);
/* для добавления граф. ников (img/flash) используйте фаил gn.js */
var gna = new Array;
document.write('<scr' + 'ipt src=../../assets/js/gn.js?' + Math.random() + '></scr' + 'ipt>');

/* Градиент: 0 - выкл, 1 - вкл, позиции в списке - это номера функций "cmd" от 0-10(11-никлист)  */
var use_gr = 1;
var grok = new Array(1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0);
if (use_gr == 1) document.write("<" + "script src=../../assets/js/gradient.js></" + "script>");

/* Градиент текста */
/* для добавления градиента тексту используйте фаил gr.js */
var gra = new Array;
document.write('<scr' + 'ipt src=../../assets/js/gr.js?' + Math.random() + '></scr' + 'ipt>');

/* Градиент ника */
var grna = new Array;
grna['adm'] = new Array('#ff0000', '#00ff00', '#0000ff');

/* Личный текст приветствия при входе в чат, используйте %nick% для расположения ника */
var tadda = new Array;
tadda[' '] = "К нам приходит %nick%. Всем привет!";
tadda['Фортуна'] = 'Меня зовут, %nick% и мне поручено передать вам привет.  От кого? От моего сердца вам мои любимые! <img src=https://imgs.su/upload/737/4168556838.gif>';


/* Личный текст прощания входе в чат, используйте %nick% для расположения ника */
var tdela = new Array;
tdela[''] = "От нас уходит %nick%. Всем пока!";
tdela['FunnyBunny'] = "От нас уходит Администратор чата  %nick%. Всем пока, до скорого!";
tdela['SweetBanny'] = "От нас уходит Администратор чата  %nick%. Всем пока, до скорого!";


/* Отметка сообщений: 0-обычные, 1-мои, 2-мне, 3-приват_мой, 4-приват_мне, 5-приват_мой2, 6-приват_мне2 */
var symbols = new Array();
symbols[0] = "<p>";
symbols[1] = "<p>";
symbols[2] = "<p>";
symbols[3] = ""
symbols[4] = "";
symbols[5] = "<p>";
symbols[6] = "<p>";


/* Сообщения о наказании: Ник1 сообщение Ник2 */
var deltxt = new Array();
deltxt[1] = 'удаляет';
deltxt[2] = 'удаляет';
deltxt[3] = 'удаляет';
deltxt[4] = 'закидывает окнами';
deltxt[5] = 'выпинывает';
deltxt[6] = 'предупреждает';
deltxt[7] = 'запрещает разговаривать';


/* Стандартные настройки ника и текста - если пользователем невыбран */
var fontnick = new Array('black', '4', 'Comic Sans MS');
var fonttext = new Array('black', '4', 'Comic Sans MS');

/* Значок привата */
var privat_s = '@';

/* Стандартная иконка */
var icon1 = 'http://imgs.su/avators/561.jpg';

/* Вывод статусов */
let stn = [];
stn[0] = '<img title="Житель" src="https://imgs.su/upload/827/535147782.gif">';
stn[1] = '<img title="Администрация" src="https://imgs.su/upload/780/1802090102.gif">';
stn[2] = '<img src=https://chat8215.mpchat.com/status_icon/zam_adm.png width=35  title=Зам Админа>';
stn[3] = '<img src=https://imgs.su/upload/737/1906560560.gif width=35  title=Гл.Модер>';
stn[4] = '<img title="Житель" src="https://imgs.su/upload/827/535147782.gif">';
stn[5] = '<img title="Житель" src="https://imgs.su/upload/827/535147782.gif">';
stn[6] = '<img src=https://snami.mpchat.com/texnik.png width=35  title=Техник>';
stn[7] = '<img src=https://snami.mpchat.com/djm.png width=35  title=Радиоведущий>';
stn[8] = '<img src=https://snami.mpchat.com/djj.png width=35  title=Радиоведушая>';
stn[9] = '<img src=https://snami.mpchat.com/moder.png width=35  title=Модератор>';


var stn2 = new Array();
stn2[0] = '<img src=https://imgs.su/upload/809/815178708.png width=24 height=24>';
stn2[1] = '<img src=https://imgs.su/upload/737/2400295761.gif width=32 height=25>';
stn2[2] = '<img src=https://chat.radio-paradise.de/chat/img/857850421.gif?0 width=50 height=34>';
stn2[3] = '<img src=https://chat.radio-paradise.de/chat/img/708506484.gif?0 width=37 height=37>';
stn2[4] = '<img src=https://chat.radio-paradise.de/chat/img/2913136571.gif?0 width=46 height=31>';
stn2[5] = '<img src=https://chat.radio-paradise.de/chat/img/3032080122.gif?0 width=40 height=24>';
stn2[6] = '<img src=https://chat.radio-paradise.de/chat/img/1689849732.gif?0 width=47 height=40>';
stn2[7] = '<img src=https://chat.radio-paradise.de/chat/img/432995265.gif?0 width=41 height=35>';
stn2[8] = '<img src=https://chat.radio-paradise.de/chat/img/1259938037.gif?0 width=38 height=30>';
stn2[9] = '<img src=https://chat.radio-paradise.de/chat/img/72922674.gif?0 width=30 height=40>';
stn2[10] = '<img src=https://chat.radio-paradise.de/chat/img/72922674.gif?0 width=28 height=25>';
stn2[11] = '<img src=https://chat.radio-paradise.de/chat/img/913233072.gif?0 width=60 height=35>';
stn2[12] = '<img src=https://chat.radio-paradise.de/chat/img/2834168126.gif?0 width=35 height=35 >';

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


/* Авто смена статуса при молчании */
/* добавьте к примеру: away[4]=15; (включение статуса 4 через 15 мин) */
/* если вы укажите время для статуса 100, то пользователя выкинет из чата */
var away = new Array();
away[17] = 15;
away[13] = 30;
away[14] = 60;
away[15] = 90;


/* Вывод пола */
var mw_n = '?';
var mw_m = '<img src=https://imgs.su/upload/809/2657440385.png>';
var mw_w = '<img src=https://imgs.su/upload/809/436031054.png>';

/* Картинки игнора */
var ign_imgoff = "https://imgs.su/upload/809/3860897265.png";
var ign_imgon = "https://imgs.su/upload/809/1639481662.png";


//  --- ОБЩИЕ ФУНКЦИИ ЧАТА -----------------------------------------------


// Воспроизведение звуков
const sound = {
  status: true, //для кнопки вкл/откл по умолчанию true - вкл, false - откл

  checkSound: () => {
    if (!document.querySelector('#checkSound').checked) sound.status = false;
  },

  play: (cmd) => {
    if (getcookie("sound")) sound.status = getcookie("sound");

    let soundSrc = null;

    switch (cmd) {
      case 0: /*входящее сообщение*/
        soundSrc = '../assets/audio/personal-message.mp3';
        break;
      case 1: /*приватное сообщение*/
        soundSrc = '../assets/audio/privat-message.mp3';
        break;
      case 6: /*вход пользователя в чат*/
        soundSrc = '../assets/audio/chat-login.mp3';
        break;
      case 7: /*выход пользователя из чата*/
        soundSrc = '../assets/audio/exit.mp3';
    }

    const audio = new Audio(soundSrc);
    audio.play();
  }
}



/* Мигалка */
var showdivtimer = new Array();

function showdiv(id, cmd, repet, opacity, n) {
  repet = repet || 11;
  //сколько раз мигать +1
  opacity = opacity || 100;
  n = n || -10;
  if (opacity == 100) {
    n = -10;
    repet--
  }
  if (opacity == 0) {
    n = 10;
  }
  var div = document.getElementById(id);
  if (cmd == 1 && privatok == 1) {
    var privatDiv = document.getElementById(id);
    if (privatDiv) div = privatDiv;
  }
  if (!div) return;
  if (window.ActiveXObject) {
    var h = div.offsetHeight;
    div.style.height = h;
    div.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + opacity + ")";
  } else {
    div.style.opacity = opacity / 100
  }
  ;opacity += n;
  showdivtimer[id] = setTimeout("showdiv('" + id + "'," + cmd + "," + repet + "," + opacity + "," + n + ")", 100);
  if (repet == 0)
    clearTimeout(showdivtimer[id]);
}

/* Функция изменения загружаемой картинки */
var id_img = 0;

function imgminimum(obj) {
  var imgmax = 200; // максимальный размер картинки
  var h = obj.height;
  var w = obj.width;
  if (h > imgmax || w > imgmax) {
    if (h > w) {
      obj.height = imgmax;
    } else {
      obj.width = imgmax;
    }
  }
  if (!obj.id) {
    var logArea = document.getElementById("leftdiv");
    logArea.scrollTop = logArea.scrollHeight;
    obj.id = id_img++;
  }
}

/* Функция сколько фраз написано вам пока вы молчали */
var title_zip = document.title;

function str_plus(a) {
  if (!this.b) {
    this.b = 0
  }

  if (a == 1) {
    document.title = "[" + ++this.b + "] " + title_zip
  } else {
    document.title = title_zip;
    this.b = 0
  }
}

/* Открывает новое окно с нужными размерами(для удобства) */
function wo(url, name, w, h, scroll) {
  lp = (screen.width) ? (screen.width - w) / 2 : 0;
  tp = (screen.height) ? (screen.height - h) / 2 : 0;
  window.open(url, name, 'height=' + h + ',width=' + w + ',top=' + tp + ',left=' + lp + ',scrollbars=' + scroll + ',resizable');
}

/* Функции чтения Cookie */
function getcookie(key) {
  str = document.cookie;
  len = str.length;
  if (len == 0) return "";
  start = str.indexOf(key + "=");
  if (start == -1) return "";
  start = start + key.length + 1;
  end = str.indexOf(";", start);
  if (end == -1) end = len;
  return unescape(str.substring(start, end));
}

/* Функции записи Cookie */
function setcookie(key, str, min) {
  if (!key) return;
  if (!min) min = 60 * 24 * 365;
  var date = new Date();
  date.setTime(date.getTime() + (min * 60 * 1000));
  document.cookie = key + "=" + str + "; expires=" + date.toGMTString() + "; path=/";
}

/* Функции проверки и добавлиния игнора в массив/cookie  */
var ign = new Array('');
ign = getcookie(chatlogin.replace("-", "_") + "_mpign").split(",");

function ign_sel(nick) {
  ok = ign_ok(nick);
  for (var i = 0; i < ign.length; i++) {
    if (ok && nick == ign[i]) ign[i] = null;
    if (!ok && !ign[i]) break;
  }
  if (!ok) ign[i] = nick;
  setcookie(chatlogin.replace("-", "_") + "_mpign", escape(ign.join(",")), 1000000);
}

function ign_ok(nick) {
  for (var i = 0; i < ign.length; i++) if (nick == ign[i]) return 1;
}

/* Функция добавления граф. ника или градиента для ника */
function setgn(cmd, nick) {
  var set_out = nick;
  if (use_gn == 1 && gnok[cmd] == 1) {
    if (gna[nick] != null && gna[nick]) {
      if (gna[nick].match(/^[0-9a-z.:\/_-]+\.(swf)$/i)) set_out = '<embed src=' + gna[nick] + '>';
      else set_out = '<img src=' + gna[nick] + ' class="graf_nick">';
    } else {
      set_out = '<span style="position:relative;"><img src="https://vmfile.com/upload/849/3984787100.jpg"><span style="position:absolute; width:160px; bottom:0;left:50%;transform:translateX(-50%);color:#4d2b0d;font: bold 15px Bressay Trial;letter-spacing:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center;">' + nick + '</span></span>'
    }

  } else if (use_gr == 1 && grna[nick] != null && grna[nick] && grok[cmd] == 1) set_out = gr(nick, grna[nick]);
  return set_out;
}

/* Убирает дублирующий ник в начале текста (если set_nick уже выводит отправителя) */
function stripLeadingNickFromText(text, nick, tonick) {
  var candidates = [];
  if (tonick) candidates.push(tonick);
  if (nick && nick !== tonick) candidates.push(nick);
  for (var i = 0; i < candidates.length; i++) {
    var p = candidates[i];
    if (!p || text.indexOf(p) !== 0) continue;
    var rest = text.substring(p.length);
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

/* Ссылка на ник в ленте: графический ник без обёртки <font>, иначе — цвет/шрифт как раньше */
function wrapNickForMsg(cmd, nick, colornick, sizenick, facenick, tonickMode) {
  var gn = setgn(cmd, nick);
  var graphic = (gn.indexOf('<') !== -1);
  var oc = (tonickMode === 'priv') ? ("ptonick('" + nick + ": '); return false;") : (tonickMode === 'none' ? "return false;" : ("tonick('" + nick + ": '); return false;"));
  var open = " <a href='' onclick=\"" + oc + "\">";
  if (graphic) return open + gn + "</a> ";
  return open + "<span size=" + sizenick + " color=" + colornick + " face='" + facenick + "'>" + gn + "</span></a> ";
}

/* Префикс ника в начале текста (общий / приват) — графник без <font>, если есть */
function wrapInlineTonick(cmd, tonick, size, color, face, tonickMode) {
  var gn = setgn(cmd, tonick);
  var graphic = (gn.indexOf('<') !== -1);
  var oc = (tonickMode === 'priv') ? ("parent.ptonick('" + tonick + ": '); return false;") : ("parent.tonick('" + tonick + ": '); return false;");
  var open = "<a href='' onclick=\"" + oc + "\">";
  if (graphic) return open + gn + "</a>";
  return open + "<span size=" + size + " color=" + color + " face='" + face + "'>" + gn + "</span></a>";
}

/* Подпись бота «Снамик» в ленте: свой графник из gna/градиент setgn, иначе зелёный текст (не заглушка без gna) */
function snamikBotLabelHtml(cmd, sizenick, facenick) {
  var sBot = 'Снамик';
  var gn = setgn(cmd, sBot);
  var isDefaultNickPlate = (gn.indexOf('position:relative') !== -1 &&
    (gn.indexOf('4080531237') !== -1 || gn.indexOf('3984787100') !== -1));
  if (gn.indexOf('<') !== -1 && !isDefaultNickPlate) {
    return " <span class=\"snimik-bot-label snimik-bot-label--graphic\">" + gn + "</span> ";
  }
  return " <span class=\"snimik-bot-label\"><span class=\"snimik-bot-label__fallback\" face='" + facenick + "'><b>" + sBot + "</b></span></span> ";
}


/* Функция добавления град. текста */
function setgr(cmd, nick, text) {
  if (use_gr != 1) return text;
  var set_out = text;
  if (gra[nick] != null && gra[nick] && grok[cmd] == 1) set_out = gr(text, gra[nick]);
  return set_out;
}

/* Устанавливает другой стиль(дизайн) для чата внутри */
function setstyle(cssfile) {
  if (!cssfile) return;
  var obj = document.getElementsByTagName("link");
  if (obj && obj[0]) obj[0].href = cssfile;
}

/* Дозагрузка - выполняется после загрузки фрейма сообщений */
function onloaded() {
  window.setTimeout('scrolled=1;', 5000);
  if (interval) {
    window.clearTimeout(interval);
    interval = "";
  }
  if (topic) wr(topic);
  for (var i = 0; i < rooms.length; i++) update(i, 0);

  // проверка в ссылке ли пользователь
  var isDeportation = getcookie(chatlogin.replace('-', '_') + '_deportation');
  if (isDeportation == 1 && myroom != 5) window.setTimeout('setmyroom(5)', 2000);// 3 - это индекс комнаты для депортации

  /* Запретить правую кнопку мышки и ставить курсор в текстовое поле */
  if (setcursor) document.onkeydown = function () {
    document.fmsg.text0.focus();
  }
  if (nomousemenu) {
    document.oncontextmenu = function () {
      return false;
    }
    document.onmousedown = function (e) {
      if (e && e.type == "contextmenu") return false;
    }
  }
  /* Добавления в никлист бота-робота, ниже структура */
  room_r = 0;
  status_r = 0;
  inchat_r = '1';
  if (nick_r) {
    loaded = 1;
    f(room_r, 6, nick_r, '', inchat_r, '', color_r, '', mw_r, st_r, icon_r, status_r, love_r, clan_r, userid_r);
    loaded = 0;
  }
}

/* Функции плавной прокрутки и включение дозагрузки */
var loaded = 0;
var scrolled = 0;
var delayed = 0;

function up() {
  var leftdiv = document.getElementById("leftdiv");
  if (loaded == 0) {
    leftdiv.scrollTop = 0;
    onloaded();
  }
  var left = leftdiv.scrollHeight - leftdiv.clientHeight - leftdiv.scrollTop;
  if ((left <= 0 && ++delayed > 20) || (scrolled == 1 && left > 250)) {
    delayed = 0;
    return;
  }
  leftdiv.scrollTop = Math.ceil(leftdiv.scrollTop + left / (1 + slowscroll));
  setTimeout('up()', 20);
}

/* Удаляет старое сообщ. печатает новое и прокручивает вниз */
function isMessageAddressedToMe(nick, tonick, text) {
  if (nick === mynick) return false;
  if (tonick === mynick) return true;
  return text.split(' ' + mynick + ':').length > 1;
}

function wrapMessageForMe(content) {
  return '<div class="message-for-me"><div class="message-for-me__header">Вам: </div>' + content + '</div>';
}

function wr(text) {
  var leftdiv = document.getElementById("leftdiv");
  if (loaded == 1 && maxmsgs > 0) {
    var count = leftdiv.getElementsByTagName('div').length;
    if (maxmsgs < count) leftdiv.removeChild(leftdiv.getElementsByTagName('div')[0]);
  }
  var div = document.createElement('div');
  div.innerHTML = text;
  leftdiv.appendChild(div);
  if (loaded == 1) up();
}


/* [Функции - формирования никлиста] */

function nicklistInsertAt(index) {
  var ul = document.getElementById('ul');
  var row = document.createElement('div');
  row.className = 'nick-list__row';
  if (!ul.children.length || index >= ul.children.length) ul.appendChild(row);
  else ul.insertBefore(row, ul.children[index]);
  return row;
}

function nicklistRemove(el) {
  if (el && el.parentNode) el.parentNode.removeChild(el);
}

/* Функции добавления и удаления пользователей в массиве никлиста */
var uc = 0;
var us = new Array();
var ucc = new Array();
var index = 0;

function separate(obj, c) {
  if (ucc[obj + "c"] == null) ucc[obj + "c"] = c; else ucc[obj + "c"] += c;
  var section = document.getElementById(obj);
  if (!section) return 0;
  section.style.display = "";
  if (ucc[obj + "c"] == 0) section.style.display = "none";
  if (c == 1) {
    var ul = document.getElementById('ul');
    for (var j = 0; j < ul.children.length; j++) if (ul.children[j] === section) return j + 1;
  }
}

function seprules(type, st, mw) {
  if (!useseparate) return;
  if (mw == '0') index = separate("man", type);
  else if (mw == '1') index = separate("woman", type);
  else if (mw == '') index = separate("noman", type);
  if (st == '1') index = separate("adm", type);
  if (st == '2') index = separate("adm", type);
  if (st == '3') index = separate("adm", type);
  if (st == '9') index = separate("adm", type);
  if (st == '11') index = separate("adm", type);
  if (st == '14') index = separate("adm", type);
}

function add(nick, colornick, st, mw, icon, status, inchat, time, room, love, clan, userid) {
  if (loaded == 0) return;
  var l = us.length;
  for (var i = 0; i < l; i++) if (us[i] != null && us[i][0] == nick) break;
  us[i] = new Array(nick, colornick, st, mw, icon, status, room, love, clan, userid);
  if (i == l) {
    uc++;
    update(room, 1);
  }
  if (room == myroom) {
    nickid = "!" + nick;
    obj = document.getElementById(nickid);
    if (obj) nicklistRemove(obj);
    index = document.getElementById('ul').children.length;
    seprules(1, st, mw);
    obj = nicklistInsertAt(index);
    obj.id = nickid;
    format(i, obj);
  }
}

function deleteUser(nick, colornick, st, mw, icon, status, inchat, time, room, userid) {

  if (loaded == 0) return;
  for (var i = 0; i < us.length; i++)
    if (us[i] != null && us[i][0] == nick) {
      uc--;
      update(us[i][6], -1);
      us[i] = null;
      break;
    }
  if (room == myroom) {
    nickid = "!" + nick;
    obj = document.getElementById(nickid);
    nicklistRemove(obj);
    seprules(-1, st, mw);
  }
}

/* Добавление ника в список участников */
function format(i, row) {
  if (us[i] == null) return "";
  var nick = us[i][0], color = us[i][1], stat = us[i][2], stat2 = us[i][5], mw_u = us[i][3], icon = us[i][4],
    love = us[i][7], clan = us[i][8], userid = us[i][9];
  var set_nick = setgn(11, nick);
  var set_privat = privat_s;
  if (icon_on) {
    if (icon == "" || icon == 0) icon = icon1;
    icon = `<img class='icon_img' src='${icon}'>`;
    set_privat = icon
  }
  var st = stn[stat] != null ? stn[stat] : '';
  var icqst = stn2[stat2] != null ? stn2[stat2] : '';

  var mw = mw_n;
  if (mw_u == '0') mw = mw_m;
  if (mw_u == '1') mw = mw_w;
  var set_love = "";
  if (love) set_love = `<a href='index.php?inc=info&nick=${love}' class="icon-love" title='Обручен(а) с ${love}' target=_blank></a>`;
  var set_clan = "";
  if (clan > 0) set_clan = `<a href='index.php?inc=clan&clan=${clan}' class="icon-clan" title='Клан' target='_blank'></a>`;

  /* === ИГНОР (зелёная/красная иконка) === */
  var ign_st = "off", ign_img = ign_imgoff;
  if (ign_ok(us[i][0])) {
    ign_st = "on";
    ign_img = ign_imgon
  }

  var set_ign = "<img src='" + ign_img + "' style='width:18px;height:18px;cursor:pointer;border:0;vertical-align:middle;transition:all .2s' title='Игнор: " + ign_st + "' onclick=\"ign_sel('" + nick + "');if(ign_ok('" + nick + "')){this.src='" + ign_imgon + "';this.title='Игнор: on';this.style.filter='hue-rotate(0deg)'}else{this.src='" + ign_imgoff + "';this.title='Игнор: off';this.style.filter=''}\">";
  if (nick == mynick) set_ign = "<span class='nick-list__ign-spacer'></span>";

  set_privat = "<a href='' onclick=\"ptonick('" + nick + ": ');return false\" class='nick-list__privat-link'>" + set_privat + "</a>";
  var nickColor = color ? (String(color).charAt(0) === '#' ? color : '#' + color) : '';
  set_nick = "<a href=''" + (nickColor ? " style='color:" + nickColor + "'" : "") + " onclick=\"tonick('" + nick + ": ');return false\">" + set_nick + "</a>";
  var set_mw = "<a href=\"index.php?inc=info&nick=" + us[i][0] + "\" target=\"_blank\" class='nick-list__mw'>" + mw + "</a>";

  row.className = 'nick-list__row';
  row.innerHTML =
    '<div class="nick-list__privat">' + set_privat + '</div>' +
    '<div class="nick-list__body">' +
    '<div class="nick-list__nick">' + set_nick + '</div>' +
    '<div class="nick-list__icons">' + icqst + set_mw + st  + set_clan  + set_love + '</div>' +
    '</div>' +
    '<div class="nick-list__ign">' + set_ign + '</div>';
}


/* [Функция - вывода сообщений и команд] */

var pu = new Array;
var pt = new Array;

function f(room, cmd, nick, tonick, text, time, colornick, color, var9, var10, var11, var12, var13, var14) {
  try {
    SNAMIK_BOT.listener.apply(null, arguments);
  } catch (e) {
  }
  try {
    if (typeof SNAMIK_BOT !== 'undefined' && SNAMIK_BOT) {
      if (SNAMIK_BOT.shouldSkipServerBot && SNAMIK_BOT.shouldSkipServerBot(nick, text)) return;
      if (SNAMIK_BOT.shouldSkipEcho && SNAMIK_BOT.shouldSkipEcho(nick, text)) return;
    }
  } catch (e) {
  }
  if (ign_ok(nick) && cmd != 6 && cmd != 7) return;
  try {
    if (text.split('src=tmp').length > 1 && parent.users.document.getElementById('kartinka').checked) {
      text = text.replace(/.br..img.src.(tmp.(.+\.jpg)).border.0..br./igm, "<a href=$1 target=_blank><img src=http://mpchat.com/blank/img/ftp/img.gif border=0> $2</a>")
    } else {
      text = text.replace(/.br..img.src.(tmp.(.+\.jpg)).border.0..br./igm, "<img onload=parent.imgminimum(this) src=$1 border=0>")
    }
  } catch (e) {
    text = text.replace(/.br..img.src.(tmp.(.+\.jpg)).border.0..br./igm, "<img onload=imgminimum(this) src=$1 border=0>");
  }


  /* скрываем внутренние сообщения бота */
  if (text.startsWith('[Снамик:state]') || text.startsWith('[Снамик:счёт]')) return;
  if (nick == nick_r && room != room_r) return;
  if (tonick == mynick && loaded == 1) str_plus(1);

  // автоматическое уменьшение размера загружаемых изображений в чат через кнопку обзор
  text = text.replace(/.br..img.src.(tmp.(.+\.(gif|jpg|jpeg|bmp|png|tif|tiff))).border.0..br./igm, "<img onload=imgminimum(this) src=$1 border=0>");
// начало обработки тега media
  if (img_no == 0) {
    text = text.replace(/\[media\]((?:http|https):\/\/(.*?)\.(gif|jpg|jpeg|bmp|png|tif|tiff|webp))\[\/media\]/mig, '<a href="$1" target="_blank" ><img onload=parent.imgminimum(this) src=$1 title="открыть в новом окне"  style="max-height:100px;" border=0></a> ')
  } else {
    text = text.replace(/\[media\]((?:http|https):\/\/(.*?)\.(gif|jpg|jpeg|bmp|png|tif|tiff|webp))\[\/media\]/mig, '<a href=./index.php?inc=go&url=$1 target=_blank><img src=http://mpchat.com/blank/img/ftp/img.gif border=0 alt=""> $2.$3</a>')
  }

  if (img_no == 1) {
    text = text.replace(/\[media\](http:\/\/(.*?))\[\/media\]/mig, '<a href=./index.php?inc=go&url=$1 target=_blank>$1</a>')
  }

  text = text.replace(/\[media\](http:\/\/zoom\.it\/(.*?))\[\/media\]/mig, '<script src="$1.js?width=auto&height=200px"></script><a href="$1" target="_blank" title="ссылка откроется в новом окне">link</a>');

  text = text.replace(/\[media\](http:\/\/www\.divshare\.com\/download\/(.*?))\[\/media\]/mig, '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="335" height="28" id="divplaylist">' + '<param name="movie" value="http://www.divshare.com/flash/playlist?myId=$2" />' + '<param name="allowScriptAccess" value="always" />' + '<embed src="http://www.divshare.com/flash/playlist?myId=$2" width="335" height="28" allowScriptAccess="always" name="divplaylist" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>' + '</object>');

  text = text.replace(/\[media\](http:\/\/prostopleer\.com\/tracks\/(.*?))\[\/media\]/mig, '<object width="411" height="28"><param name="movie" value="http://embed.prostopleer.com/track?id=$2"></param><embed src="http://embed.prostopleer.com/track?id=$2" type="application/x-shockwave-flash" width="411" height="28"></embed></object>');

  text = text.replace(/\[media\](http:\/\/pleer\.com\/tracks\/(.*?))\[\/media\]/mig, '<object width="411" height="28"><param name="wmode" value="transparent"><param name="movie" value="http://embed.prostopleer.com/track?id=$2"></param><embed src="http://embed.prostopleer.com/track?id=$2" wmode="transparent"  type="application/x-shockwave-flash" width="411" height="28"></embed></object>');

  text = text.replace(/\[media\](http:\/\/muzebra\.com\/l\/(.*?)\/)\[\/media\]/mig, '<object width="395" height="42"><param name="movie" value="http://embed.muzebra.com/player?id=$2"></param><embed src="http://embed.muzebra.com/player?id=$2" type="application/x-shockwave-flash" width="395" height="42"></embed><param name="wmode" value="transparent"/><param name="scale" value="noscale" /></object>');

  text = text.replace(/\[media\]http:\/\/music\.yandex\.ru\/#!\/track\/(.*?)\/album\/(.*?)\[\/media\]/mig, '<object width="350" height="28"><param name="muz" value="http://music.yandex.ru/embed/$1/track.swf"/><param value="noscale" name="scale"/><param value="bg-color=%23D8D8D8&amp;text-color=%23555555&amp;hover-text-color=%23000000" name="flashvars"/><embed type="application/x-shockwave-flash" width="350" height="28" scale="noscale" flashvars="bg-color=%23D8D8D8&amp;text-color=%23555555&amp;hover-text-color=%23000000" src="http://music.yandex.ru/embed/$1/track.swf"/></object>');

  text = text.replace(/\[media\]((?:http|https):\/\/.*mp3)\[\/media\]/mig, '<audio src="$1" controls></audio>');

  /* Присвоение переменных */
  if (cmd == 5) {
    kill = var9;
    timeout = var10;
  } else if (cmd == 6 || cmd == 7) {
    inchat = text;
    mw = var9;
    st = var10;
    icon = var11;
    status = var12;
    love = var13;
    clan = var14;
    if (colornick == '') colornick = fontnick[0]; else colornick = '#' + colornick;
    if (color == '') color = fonttext[0]; else color = '#' + color;
    /* скрыть ник невидимки */
    if (invisible[nick]) return;
  } else {
    sizenick = var9;
    size = var10;
    facenick = var11;
    face = var12;
    if (colornick == '') colornick = fontnick[0]; else colornick = '#' + colornick;
    if (sizenick == '') sizenick = fontnick[1];
    if (facenick == '') facenick = fontnick[2];
    if (color == '') color = fonttext[0]; else color = '#' + color;
    if (size == '') size = fonttext[1];
    if (face == '') face = fonttext[2];
  }

  /* BB-коды, например для загруженного файла [file] или [media] из интеренета */
  var etags = new Array();
  var i = 0;
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
  etags[i] = new Array(/\[media\]https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtu\.be\/)([a-z0-9\?=_-]+)\[\/media\]/i, '<br><iframe src="https://www.youtube.com/embed/$3" width=458 height=258 frameborder=0 allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
  i++;
  /* Выполним все замены */
  for (var k = 0; k < etags.length; k++) text = text.replace(etags[k][0], etags[k][1]);

  /* Автоответчик */
  if (loaded == 1 && tonick == mynick && nick != mynick) {
    var autotext = document.fmsg.text0.value;
    var obj = document.getElementsByName('autotext');
    if (obj) obj = obj[0];
    if (autotext && obj && obj.checked) {
      window.hidden.location.href = 'index.php?inc=write&text=/privat ' + nick + ': Автоответчик -> ' + autotext + '&r=' + Math.random();
    }
  }

  function alpha() {
    var a = [9, 6, 8, 3, 14, 4, 5, 2, 19, 7, 18, 17, 13, 11, 12, 16, 20, 15, 10, 1, 19, 8, 6, 15, 1, 12, 7, 9, 5, 11,
        16, 2, 17, 13, 18, 10, 4, 14, 20, 3, 10, 11, 16, 9, 6, 4, 18, 20, 1, 7, 3, 13, 12, 14, 5, 19, 15, 2, 8, 17],
      b = time.replace(/0(\d)/g, "$1").match(/\d+/g),
      a = a.slice(b[1]).concat(a.slice(0, b[1]));
    return ' На кубике выпало: <font size="6" face="Kapelka" color="#55aa00"><img src=https://imgs.su/upload/782/412600249.gif>' + a[b[2]] + '</font> '
  };

  text = text.replace('*кубик*', alpha);

  /* Проверка пользовательских команд для простого сообщения */
  if (cmd == 0) {
    if (text.substr(0, 7) == "/remove" && remover[nick]) {
      var timeremovez;
      text = text.replace("/remove", "");
      timeremovez = text.match(/см\.\s(\d\d.\d\d.\d\d)|\S+/g);
      if (timeremovez != null) {
        var obj = document.getElementById("leftdiv");
        var div = obj.getElementsByTagName('div');
        for (var i = 0; i < timeremovez.length; i++) {
          for (var k = 0; k < div.length; k++) {
            if (div[k].innerHTML.indexOf(timeremovez[i]) >= 0 && (remover[nick] || div[k].innerHTML.indexOf(">" + nick + ":<") >= 0)) {
              obj.removeChild(div[k]);
              k--;
            }
          }
        }
      }
      ;
      if (nick != mynick || timeremovez == null) return;
      text = 'Вы удалили сообщение/я с ' + timeremovez;
    }
    if (text.substr(0, 7) == "/remove") {
      var timeremovez;
      var deleted = 0;
      text = text.replace("/remove", "");
      timeremovez = text.match(/см\.\s(\d\d.\d\d.\d\d)|[^\s\(\)]{3,50}/g);
      if (timeremovez == null) return;
      var obj = document.getElementById("leftdiv");
      var div = obj.getElementsByTagName('div');
      for (var i = 0; i < timeremovez.length; i++) {
        for (var k = 0; k < div.length; k++) {
          if (div[k].innerHTML.indexOf(timeremovez[i]) >= 0 && (remover[nick])) {
            obj.removeChild(div[k]);
            k--;
            deleted++;
          }
        }
      }
      if (nick != mynick || !deleted) return;
      text = 'Вы удалили сообщение/я с ' + timeremovez;
    }
    if (text.substr(0, 5) == "/ping" && nick == mynick && loaded == 1) {
      var ping = (new Date().getTime() - gettime) / 1000;
      text = "<font color=red><i>ping: " + ping + " sec</i></font> ";
    }
    if (text.substr(0, 6) == "/clear" && clearer[nick]) {
      if (loaded == 1) document.getElementById("leftdiv").innerHTML = "";
      text = "очищаю фрейм сообщений";
    }
    if (text.substr(0, 7) == "/reload" && reloader[nick]) {
      if (loaded == 1) location.reload();
      text = "перезагружаю чат";
    }
    if (text.substr(0, 6) == "/alert" && alerter[nick]) {
      text = text.substr(text.indexOf(": ") + 2);
      if (loaded == 1 && mynick == tonick) alert(text);
      if (nick != mynick) return;
      text = tonick + ": отправленна команда алерт";
    }
    if (text.substr(0, 7) == "/ignore" && ignorer[nick]) {
      if (tonick && mynick != tonick && loaded == 1) ign_sel(tonick);
      if (nick != mynick || !tonick) return;
      if (ign_ok(tonick)) text = "Вы поставили полный игнор на ник " + tonick; else text = "Вы сняли полный игнор с ника " + tonick;

    }
  }


  /* Вывод пользователя в другую комнату */
  if (text.indexOf('/deportation') == 0 && censor[nick]) {
    var term = 30; // время ссылки в минутах
    if (loaded == 1 && mynick == tonick) {
      window.setTimeout('setmyroom(5)', 2000);// 3 - это индекс комнаты для депортации
      setcookie(chatlogin.replace('-', '_') + '_deportation', '1', term);
    }
    text = '<span style="font-style: italic; color: red"> запирает в Темнице&nbsp;' + tonick + ' на ' + term + ' минут</span>';
  }
  if (text.indexOf('/amnesty') == 0 && censor[nick]) {
    if (loaded == 1 && mynick == tonick) {
      setcookie(chatlogin.replace('-', '_') + '_deportation', '0', 1);
    }
    text = '<span style="font-style: italic; color: red"> амнистирует&nbsp;' + tonick + '. Можно вернуться в общую комнату.</span>';
  }

  /* Задержка времени бота на 2 секунды + 1 секунда за каждые написанные им 10 символов */
  if (nick == nick_r) {
    var delay_r = 2 + Math.round(text.length / 10);
    var d = new Date();
    d.setTime(Date.parse("Jan 1, 1970, " + time) + delay_r * 1000);
    time = d.toTimeString().substr(0, 8);
  }

  /* Мигалка */
  var timeremovez = [];
  var timeremovez = text.match(/см\.\s(\d\d.\d\d.\d\d)/g);
  if (timeremovez != null) {
    for (var i = 0; i < timeremovez.length; i++) {
      var obj = document.getElementById("leftdiv");
      var div = obj.getElementsByTagName('div');
      for (var k = 0; k < div.length; k++) {
        if (div[k].innerHTML.search(timeremovez[i]) >= 0) {
          timeremoveid = timeremovez[i].replace(/см\.\s|\:/g, "");
          text = text.replace(timeremovez[i], "<span  onclick=\"showdiv('" + timeremoveid + "',0);\">" + timeremovez[i] + "</span>");
          div[k].id = timeremoveid;
          if (loaded == 1 && mynick == tonick)
            showdiv(timeremoveid, 0)
        }
      }
    }
  }

  /* Добавление граф ников, градиента и формат времени */
  set_nick = setgn(cmd, nick);

  if (tonick && text.substring(0, 1) != "/") {
    if (cmd == 1 || cmd == 2) {
      text = text.replace(tonick + ":", wrapInlineTonick(cmd, tonick, size, color, face, 'priv'));
    } else {
      text = text.replace(tonick + ":", wrapInlineTonick(cmd, tonick, size, color, face, 'pub'));
    }
  }// граф для собеседника и его нажимаемый ник

  if (cmd == 0 || cmd == 1 || cmd == 2) {
    text = stripLeadingNickFromText(text, nick, tonick);
  }

  set_text = setgr(cmd, nick, text);
  set_time = "<span class='time-message' onclick='parent.sendto(\" см. " + time + " \");'>" + time + "</span> ";

  switch (cmd) {
    /* Вывод простого сообщения */
    case 0:
      symbol = symbols[0];

      if (nick === mynick) symbol = symbols[1];

      if (tonick == mynick || text.split(" " + mynick + ":").length > 1) {
        symbol = symbols[2];
        if (nick != nick_r) sound.play(cmd);
      }

      if (text.indexOf('[Снамик] ') === 0) {
        var snamikRest = text.substring('[Снамик] '.length);
        try {
          if (typeof SNAMIK_BOT !== 'undefined' && SNAMIK_BOT.formatMessage) {
            snamikRest = SNAMIK_BOT.formatMessage(snamikRest);
          }
        } catch (e) {
        }
        var snamikMsgClass = snamikRest.indexOf('snimik-bot-cmdlist') >= 0
          ? 'snimik-bot-msg snimik-bot-msg--rich'
          : 'snimik-bot-msg';
        set_nick = snamikBotLabelHtml(cmd, sizenick, facenick) +
          wrapNickForMsg(cmd, nick, colornick, sizenick, facenick, 'tonick');
        set_text = " <span class=\"" + snamikMsgClass + "\" size=" + size + " color=" + color + " face='" + face + "'>" + setgr(cmd, nick, snamikRest) + "</span> ";
      } else {
        set_nick = wrapNickForMsg(cmd, nick, colornick, sizenick, facenick, 'tonick');
        set_text = " <font size=" + size + " color=" + color + " face='" + face + "'>" + set_text + "</font> ";
      }
      a1 = '/vsem ';
      if (text.substring(0, a1.length) == a1) {
        text = text.substr(a1.length, text.length - a1.length);
        text = text.substr(tonick.length);
        wr(`<div class='message-everyone'><div>Всем:</div> ${set_time} ${set_nick} ${text}</div>`);
        if (zvukmsgno == 1 && loaded) wr("<audio src='chat/img/4278361492.mp3' autoplay></audio>");
        return 1;
      }
      a2 = '/dev ';
      if (text.substring(0, a2.length) == a2) {
        text = text.substr(a2.length, text.length - a2.length);
        text = text.substr(tonick.length);
        wr("<p style='background-color:rgba(255, 192, 203, 0.5); -webkit-border-radius:5px;border:3px double rgba(72, 6, 7, 0.7);margin: 5px 0px'>" + set_time + "</font>" + set_nick + "<img src=https://i.postimg.cc/SKZpgcJL/image.png> </font></a><font color=480607 face=Arial Black font size=4px><b>" + text + "</b></font></p>");
        if (zvukmsgno == 1 && loaded) wr("<audio src='chat/img/2023391579.mp3' autoplay></audio>");
        return 1;
      }
      a3 = '/parn ';
      if (text.substring(0, a3.length) == a3) {
        text = text.substr(a3.length, text.length - a3.length);
        text = text.substr(tonick.length);
        wr("<p style='background-color:rgba(255, 192, 203, 0.5); -webkit-border-radius:5px;border:3px double rgba(25, 25, 112, 0.7);margin: 5px 0px'>" + set_time + "</font>" + set_nick + "<img src=https://i.postimg.cc/bvw7Sd3Z/image.png> </font></a><font color=191970 face=Arial Black font size=4px><b>" + text + "</b></font></p>");
        if (zvukmsgno == 1 && loaded) wr("<audio src='chat/img/70197033.mp3' autoplay></audio>");
        return 1;
      }
      var msgBody = symbol + set_time + set_nick + set_text;
      if (isMessageAddressedToMe(nick, tonick, text)) {
        towr = wrapMessageForMe(msgBody);
      } else {
        towr = msgBody + '<br>';
      }
      if (nick == mynick || tonick == mynick) myhistory += towr;
      if (nick == nick_r && loaded == 1) {
        window.setTimeout("wr('" + towr.split("'").join("\\'") + "');if('" + tonick + "'=='" + mynick + "') sound.play(0);", delay_r * 1000);
      } else wr(towr);

      break;

    /* Вывод приватных сообщений */
    case 1:
    case 2:
      symbol = symbols[0];
      if (nick == mynick) symbol = symbols[3];
      if (tonick == mynick) {
        symbol = symbols[4];
        sound.play(cmd);
      }

      symbol2 = "";
      if (nick == mynick) symbol2 = symbols[5];
      if (tonick == mynick) symbol2 = symbols[6];

      if (cmd == 2) {
        symbol2 = "";
        set_nick = wrapNickForMsg(cmd, nick, colornick, sizenick, facenick, 'none');
      } else {
        set_nick = wrapNickForMsg(cmd, nick, colornick, sizenick, facenick, 'priv');
      }

      set_text = "<font size=" + size + " color=" + color + " face='" + face + "'> " + set_text + "</font>";

      // Формируем сообщение
      var towrContent = symbol + set_nick + set_text + set_time;

      // Создаем приватное сообщение с классом
      var privMsgHtml = `<div class="private-message"><div class="private-header">Приватно от ${nick}:</div>${towrContent}</div>`;

      // Вставляем сообщение в нужный контейнер
      if (nick == mynick || tonick == mynick) myhistory += towrContent;

      if (cmd == 1 && privatok == 1) {
        var obj = document.getElementById("privatdiv");
        var newDiv = document.createElement('div');
        newDiv.innerHTML = privMsgHtml;
        obj.appendChild(newDiv);
        obj.scrollTop = obj.scrollHeight;
      } else if (cmd == 1) {
        wr(privMsgHtml);
      } else if (cmd == 2) {
        if (nick == mynick) pnick = tonick; else pnick = nick;

        if (pu[pnick] == null || pu[pnick].closed) {
          if (pt[pnick] == undefined) pt[pnick] = "";
          pt[pnick] += towrContent;
          let text = '';

          if (nick != mynick) text = "приглашаю начать общение в отдельном ";
          wr(set_time + symbol + set_nick + text +
            " <a href='#' onclick='var pnick1=\"" + pnick + "\"; " +
            "pu[pnick1]=window.open(\"index.php?inc=privat&pnick=\"+pnick1,\"\",\"scrollbars=no,width=500,height=400,resizable=yes\"); return false;'>приват окне</a>");
        } else {
          pu[pnick].wr(towrContent);
        }
      }
      break;

    /* Вывод выделенного сообщения '/me' или '/msg' */
    case 3:
      sound.play(cmd);
      wr(set_time + "<b>Сообщение от <font size=2 color=" + colornick + ">" + set_nick + "</font></b> <i>" + set_text + "</i><br>");

    /* [ cmd==4 Вывод сообщения о вызове ] и сам вызов окном с музыкой '/call nick' */
    case 4:
      if (loaded == 1) {
        if (!times_call[tonick]) times_call[tonick] = 0;
        if (timeCall() - times_call[tonick] > times_call_delay) {
          times_call[tonick] = timeCall();
          times_call_who[tonick] = set_nick;
          if (tonick == mynick && loaded == 1)
            if (snd_call_on == 1) {
              getSound('/by-FeNIX/call');
              setTimeout('var tocall=document.getElementById("sounddiv"); tocall.innerHTML="";', 50000);
              ChatAlert("Вас пытаются разбудить пользователь " + nick + "!");
            }
          if (!invisible[nick]) wr(set_time + "<img src='https://s1.iconbird.com/ico/0912/fugue/w16h161349011841alarmclockblue.png' border='0'> " + set_nick + " <i> Запустил будильник для " + tonick + ".</i><br>");
        } else if (set_nick == mynick && tonick != mynick && loaded == 1) {
          var call_alert_txt = "<font>Пользователю с ником \"" + tonick + "\" уже был запущен будильник </font>";
          if (times_call_who[tonick] == mynick) call_alert_txt += "<font> вами!</font>";
          else call_alert_txt += "<font>.</font><br><font>Запустил будильник пользователь с ником \"" + times_call_who[tonick] + "\".</font>";
          call_alert_txt += "<br><div style='margin-top:20px;'><font>Повторный вызов возможен через: </font>";
          ChatAlert(call_alert_txt + "<form name='count' style='display: inline-block;'><input type='text' size='20' name='count2' class='count2' readonly></form></div>");
          countdown(times_call_delay - timeCall() + times_call[tonick], tonick);
        }
      }
      break;

    /* Вывод сообщения об удалении '/kill nick' и сам процесс */
    case 5:
      sound.play(cmd);
      if (tonick == mynick && loaded == 1 && kill != 6 && kill != 7) {
        if ((kill == 1) || (kill == 2) || (kill == 3)) {
          act = "kill";
          setcookie(parent.chatlogin.replace("-", "_") + "_mpban", tonick, timeout);
        }
        if (kill == 4) act = "window";
        if (kill == 5) act = "prav";
        parent.location.href = "exit.html?" + parent.yourkey + "&act=" + act + "&timeout=" + timeout + "&grund=" + text;
      }
      var kill_timeout = 0;
      if (text.length > 0) text = " Причина: " + text + ". ";
      if (timeout > 0) {
        kill_timeout = timeout * 60;
        if (timeout < 61) timeout = "На " + timeout + " минут.";
        if (timeout == 1440) timeout = "На день!";
        if (timeout == 10080) timeout = "На неделю!";
        if (timeout == 43200) timeout = "На месяц!";
        if (timeout > 1000000) timeout = "Навсегда!";
      }
      if (loaded == 1 && mynick == tonick) {
        kill_timer(kill_timeout);
      }
      wr("<font onclick='sendto(\" см. " + time + " \");'>" + time + "</font><i><a href='' onclick=\"parent.tonick('" + nick + ": '); return false;\"><font color=" + colornick + ">АДМИНИСТРАЦИЯ</font></a> " + deltxt[kill] + " " + tonick + ".</i> " + timeout + text + "<br>");

      break;

    /* Вывод входа юзера в чат и добавление в нклист через add() */
    case 6:
      if (inchat == '0' && room == myroom) {
        sound.play(cmd);
        set_nick = "<a href='' onclick=\"tonick('" + nick + ": '); return false;\"><font color=" + colornick + "><b><font color=ff0000 face=Verdana font size=10px>" + set_nick + "</font></a>";
        tadd = "<img src=https://i.postimg.cc/zfGtkbzb/onlin-1.gif><b><font color=000080 face=Verdana font size=4px>Добро пожаловать в чат С нами! </font> %nick%  ";
        if (tadda[nick] != null && tadda[nick]) tadd = tadda[nick].replace(nick, "%nick%");
        if (tadd.search("%nick%") == -1) tadd = "%nick% " + tadd;
        tadd = tadd.replace("%nick%", set_nick);
        wr(set_time + "<b><font color=000080 face=Verdana font size=4px>" + tadd + "</font><br>");
      }
      add(nick, colornick, st, mw, icon, status, inchat, time, room, love, clan, userid);

      break;

    /* Вывод выхода юзера из чата и удаление из никлиста через deleteUser() */
    case 7:
      if (inchat === '1' && room === myroom) {
        sound.play(cmd);
        set_nick = "<b><font color=#ff0000>" + set_nick + "</b>";
        tdel = "<b><font color=000080 face=Verdana font size=4px>Нас покидает %nick%  </font>";
        if (tdela[nick] != null && tdela[nick]) tdel = tdela[nick].replace(nick, "%nick%");
        if (tdel.search("%nick%") == -1) tdel = "%nick% " + tdel;
        tdel = tdel.replace("%nick%", set_nick);
        wr(set_time + "<b><font color=000080 face=Verdana font size=4px>" + tdel + "</font><br>");
      }
      deleteUser(nick, colornick, st, mw, icon, status, inchat, time, room, userid);
      break;

    /* Сообщение о смене статуса участника и его изменение */
    case 8:
      sound.play(cmd);
      status = text;
      for (var i = 0; i < us.length; i++) if (us[i] != null && us[i][0] == nick) {
        us[i][5] = status;
        if (icqtxt[status]) wr(set_time + "<font size=2 color=" + colornick + "><b>" + set_nick + "</b></font> <i>" + icqtxt[status] + "</i><br>");
        var obj = document.getElementById("!" + nick);
        if (obj) format(i, obj);
      }

      break;


    /* Функция обработки сообщений викторины */
    case 9:
      if (text == "end") text1 = "это слово уже угаданно или время вышло";
      else if (text == "") text1 = "вы не угадали это слово";
      else {
        if (mynick == nick) text1 = 'вы только что отгадали слово "' + text + '" и получаете 30 пунктов';
        else text1 = 'только что отгадал(а) слово "' + text + '"';
      }
      wr(set_time + "<font size=4 color=" + colornick + "><b>" + set_nick + "</b></font> <i>" + text1 + "</i><br>");

      break;

    case 10:
      oldroom = room;
      setroom = text;
      if (loaded == 1) {
        for (var i = 0; i < us.length; i++) if (us[i] != null && us[i][0] == nick) {
          us[i][6] = setroom;
          update(oldroom, -1);
          update(setroom, 1);
        }
        if (nick == mynick) {
          myroom = setroom;
          if (roomlog == 1) {
            document.getElementById("leftdiv").innerHTML = "Подождите, осуществляется переход в другую комнату ...";
            window.setTimeout("loadframes();", 2000);
            mystyle = rooms[myroom][2];
            window.setTimeout("setstyle(mystyle);", 4000);
            return;
          }
          ucc = new Array();
          document.getElementById("leftdiv").innerHTML = "";
          document.getElementById('users').innerHTML = userlist;
          window.setTimeout("for(var i=0;i<us.length;i++) if(us[i]!=null) add(us[i][0],us[i][1],us[i][2],us[i][3],us[i][4],us[i][5],'','',us[i][6],us[i][7],us[i][8],us[i][9]);", 500);
          mystyle = rooms[myroom][2];
          setstyle(mystyle);
        } else {
          for (var i = 0; i < us.length; i++) if (us[i] != null && us[i][0] == nick) {
            if (myroom == setroom) {
              add(us[i][0], us[i][1], us[i][2], us[i][3], us[i][4], us[i][5], '', '', us[i][6], us[i][7], us[i][8], us[i][9]);
            } else if (myroom == oldroom) {
              var obj = document.getElementById("!" + nick);
              if (obj) nicklistRemove(obj);
              seprules(-1, us[i][2], us[i][3]);
            }
          }
        }
      }
      towr = "";
      if (nick == mynick && loaded == 1) towr = set_time + "<i>Вы перешли в комнату -> <b>" + rooms[setroom][0] + "</b>.</i><br>";
      else if (myroom == setroom) towr = set_time + "<i><a href='' onclick=\"tonick('" + nick + ": '); return false;\"><font color=" + colornick + ">" + nick + "</font></a> приходит к нам из комнаты -> <b>" + rooms[oldroom][0] + "</b>.</i><br>";
      else if (myroom == oldroom) towr = set_time + "<i>" + nick + " уходит в комнату -> <b>" + rooms[setroom][0] + "</b>.</i><br>";
      if (nick == mynick) myhistory += towr;
      wr(towr);

      break;

    /* Функция вывода уведомлений */
    case 11:
      if (text == "post" && tonick == mynick) wr(set_time + "Мажордом (шопотом): <i>Вам от <a href=?inc=info&nick=" + nick + " target=_blank><font color=" + colornick + ">" + set_nick + "</font></a> новое письмо-с, извольте прочесть: <a href=?inc=post&" + yourkey + " target=_blank>\"" + var9 + "\"</a></i><br>");
      if (text == "reg") wr(set_time + "Мажордом (торжественно): <i>У нас новый пользователь <a href=?inc=info&nick=" + nick + " target=_blank><font color=" + colornick + ">" + set_nick + "</font></a>.</i><br>");
      if (text == "clan") wr(set_time + "Мажордом (громогласно): <i>Пользователь <a href=?inc=info&nick=" + nick + " target=_blank><font color=" + colornick + ">" + set_nick + "</font></a> вступил(а) в клан \"" + var9 + "\".</i><br>");
      if (text == "gallery") wr(set_time + "Мажордом (громогласно): <i>Пользователь <a href=?inc=info&nick=" + nick + " target=_blank><font color=" + colornick + ">" + set_nick + "</font></a> добавил(а) новую <a href=?inc=gallery&gallery=" + nick + "&foto=" + var9 + " target=_blank>фотографию</a> в галерею.</i><br>");
      if (text == "gb") wr(set_time + "Мажордом (громогласно): <i>Новое сообщение от <a href=?inc=info&nick=" + nick + " target=_blank><font color=" + colornick + ">" + set_nick + "</font></a> в <a href=?inc=gb target=_blank>гостевой</a>.</i><br>");

      if (text == "forum")
        wr(
          "<div style='max-width: 500px; margin: 15px auto; padding: 15px; border-radius: 12px; background-color: #f0f4f8; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: Arial, sans-serif; color: #333; display: flex; align-items: center; flex-wrap: nowrap;'>" +
          "<div style='flex: 0 0 auto; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; margin-right: 15px;'>" +
          "<div style='width: 40px; height: 40px; background-color: #4CAF50; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; color: white; font-weight: bold;'>!</div>" +
          "</div>" +
          "<div style='flex: 1 1 auto;'>" +
          "<h2 style='margin: 0 0 5px; font-size: 18px; font-weight: 600; color: #2c3e50;'>Внимание!</h2>" +
          "<p style='margin: 0; font-size: 14px; line-height: 1.4;'>" +
          "Новое сообщение от <a href='?inc=info&nick=" + nick + "' target='_blank' style='color: #2980b9; font-weight: 600; text-decoration: underline;'>" + set_nick + "</a> в теме форума " +
          "<a href='?inc=forum&forum=" + var11 + "&topic=" + var10 + "' target='_blank' style='color: #2980b9; font-weight: 600; text-decoration: underline;'>\"" + var9 + "\"</a>." +
          "</p>" +
          "</div>" +
          "</div>" +
          "<style>" +
          "@media(max-width: 600px) {" +
          "div[style*='max-width: 500px'] { flex-direction: column; align-items: flex-start; padding: 10px; }" +
          "div[style*='width: 50px'] { width: 40px; height: 40px; margin-bottom: 10px; }" +
          "h2 { font-size: 16px; }" +
          "p { font-size: 13px; }" +
          "}" +
          "</style>"
        );
  }

}


/* Функция обновления числа юзеров и выбора комнат */
function update(room, plus) {
  obj = document.getElementById("count");
  if (obj) obj.innerHTML = uc;
  if (!rooms[room] || rooms.length < 2) return;
  rooms[room][1] += plus;
  obj = document.getElementsByName("selectroom")[0];
  if (obj) obj.options[room].innerHTML = rooms[room][0] + " (" + rooms[room][1] + ")";
  if (room == myroom) {
    obj = document.getElementById("roomcount");
    if (obj) obj.innerHTML = rooms[room][1];
  }
}


/* [Функции - нижнего фрейма] */

/* Функции для работы со строкой ввода и др. */
function sendto(nick) {
  document.fmsg.text0.focus();
  document.fmsg.text0.value = document.fmsg.text0.value + nick;
}

function tonick(nick) {
  if (document.fmsg.cmd != null) document.fmsg.cmd.value = "";
  if (document.fmsg.tonick == null) sendto(nick); else {
    document.fmsg.tonick.value = nick;
    document.fmsg.text0.focus();
  }
}

function ptonick(nick) {
  if (document.fmsg.cmd == null) sendto("/privat " + nick); else {
    tonick(nick);
    document.fmsg.cmd.value = "/privat ";
  }
}

/* Проверяет текст и удаляет повторяющиеся символы */
function abc_flood(text) {
  var text1 = "", s = "", n = 0;
  for (var i = 0; i < text.length; i++) {
    if (text.charAt(i) == s && text.charAt(i) != '0') n++; else n = 0;
    s = text.charAt(i);
    if (n < maxabc || maxabc == 0) text1 += s;
  }
  return text1;
}

/* Переводит текст в русскую раскладку */
function russ() {
  var msg = document.fmsg.text0.value;
  msg_cmd = '';
  msg_nick = '';
  msg_text = '';
  if (msg.charAt(0) == "/" || msg.substr(0, 6) == 'privat') {
    msg_cmd = msg.substr(0, msg.indexOf(" ") + 1);
    msg = msg.substr(msg.indexOf(" ") + 1);
  }
  msg_nick = msg.substr(0, msg.indexOf(":") + 1);
  msg_text = msg.substr(msg.indexOf(":") + 1);
  if (msg_nick.search(/ /) != -1) {
    msg_nick = "";
    msg_text = msg;
  }
  var chars = ' !Э№;%?э()*+б-ю.0123456789ЖжБ=Ю,"ФИСВУАПРШОЛДЬТЩЗЙКЫЕГМЦЧНЯх/ъ:_ёфисвуапршолдьтщзйкыегмцчняХ\ЪЁ';
  var newmsg = '';
  for (var i = 0; i < msg_text.length; i++) {
    mychar = msg_text.charAt(i).charCodeAt();
    newmsg += mychar < 0x80 ? chars.charAt(mychar - 0x20) : msg_text.charAt(i);
  }
  document.fmsg.text0.value = msg_cmd + msg_nick + newmsg;
  document.fmsg.text0.focus();
}

/* Переключение отправленных сообщений << >> */
var pos = 0
var amess = new Array('');

function go(n) {
  pos += n;
  if (pos < 0) pos = 0;
  if (pos > amess.length - 1) pos = amess.length - 1;
  return amess[pos];
}

/* Обрабатывает строку ввода текста для отправления */
var oldmsg = "";

function msg_send() {
  str_plus(0);
  var form = document.fmsg;
  var msg = form.text0.value;
  if (form.cmd.value == '%') form.tonick.value = '';
  if (form.tonick) {
    if (form.tonick.value != 'Всем') {
      var tn = form.tonick.value;
      if (tn && msg.indexOf(tn) !== 0) {
        if (tn.charAt(tn.length - 1) !== ':') tn += ':';
        if (tn.charAt(tn.length - 1) === ':') tn += ' ';
        msg = tn + msg;
      }
    }
  }
  if (form.cmd) {
    msg = form.cmd.value + msg;
    if (form.cmd.value != '/privat ' && form.cmd.value != '%') form.cmd.value = '';
  }
  if (msg == '') return false;
  var snamikOutgoing = msg;
  if (document.fmsg.deltonick.checked) form.tonick.value = '';
  msg_cmd = '';
  msg_nick = '';
  msg_text = '';
  if (msg.charAt(0) == "/") {
    msg_cmd = msg.substr(0, msg.indexOf(" ") + 1);
    msg = msg.substr(msg.indexOf(" ") + 1);
  }
  msg_nick = msg.substr(0, msg.indexOf(": ") + 1);
  msg_text = msg.substr(msg.indexOf(": ") + 1);
  if (msg_nick.search(/ /) != -1) {
    msg_nick = "";
    msg_text = msg;
  }


  msg_text = abc_flood(msg_text);
  msg = msg_cmd + msg_nick + msg_text;

  if (document.getElementById('bt')) if (document.getElementById('bt').checked && !/^\s*%[А-яЁё]+/.test(msg_text)) {
    msg_text = " (b) " + msg_text + " (/b)"
  }

  if (document.getElementById('it')) if (document.getElementById('it').checked && !/^\s*%[А-яЁё]+/.test(msg_text)) {
    msg_text = " (i) " + msg_text + " (/i)"
  }

  if (document.getElementById('ut')) if (document.getElementById('ut').checked && !/^\s*%[А-яЁё]+/.test(msg_text)) {
    msg_text = " (u) " + msg_text + " (/u)"
  }

  if (document.getElementById('et')) if (document.getElementById('et').checked && !/^\s*%[А-яЁё]+/.test(msg_text)) {
    msg_text = " (center) " + msg_text + " (center)"
  }

  if (document.getElementById('at')) if (document.getElementById('at').checked && !/^\s*%[А-яЁё]+/.test(msg_text)) {
    msg_text = " (size) " + msg_text + " (size)"
  }



  form.text0.value = "";
  form.text0.focus();
  form.text.value = msg;

  try {
    if (typeof SNAMIK_BOT !== 'undefined' && SNAMIK_BOT.onOutgoingMessage && snamikOutgoing) {
      var hookText = String(snamikOutgoing).replace(/^\s+/, '');
      SNAMIK_BOT.onOutgoingMessage(hookText);
    }
  } catch (e) {
  }

  pos = amess.length;
  amess[pos] = msg;
  gettime = new Date().getTime();
  if (away[laststatus]) window.setTimeout("setstatus(0);", 2000);
  return true;
}

/* Функция очистки поля загрузки файла после отправки */
function msg_reset() {
  var obj = document.fmsg.loadfile;
  var obj1 = document.createElement("input");
  obj1.type = "file";
  obj1.name = obj.name;
  obj1.size = obj.size;
  obj1.className = obj.className;
  obj1.style.cssText = obj.style.cssText;
  obj.parentNode.replaceChild(obj1, obj);
  return false;
}

/* Функция автоизменения статуса при молчании */
var gettime = new Date().getTime();
var laststatus = 0;

function goaway() {
  var offtime = new Date().getTime() - gettime;
  var newstatus = 0;
  for (var i in away) {
    if (away[i] * 60 * 1000 < offtime) {
      {
        if (away[i] > away[newstatus] || away[newstatus] == undefined) newstatus = i;
      }
    }
  }

  /* Выкинуть из чата для статуса 100 */
  if (newstatus == 100) {
    location.href = 'index.php';
    return;
  }
  if (newstatus > 0 && (away[newstatus] > away[laststatus] || away[laststatus] == undefined)) {
    setstatus(newstatus, 1);
  }
}

window.setInterval("goaway()", 1000 * 10);

/* Функция ручного изменения статуса */
function setstatus(status) {
  laststatus = status;
  hidden.location.href = 'index.php?inc=write&text=/status ' + status + '&r=' + Math.random();
  document.getElementsByName("setstatus")[0].value = status;
  document.fmsg.text0.focus();
}

/* Функция ручного изменения комнаты */
function setmyroom(room) {
  if (myroom == room) return false;
  if (!rooms[room][3]) {
    alert('У Вас нет доступа в эту комнату!');
    return false;
  }
  hidden.location.href = 'index.php?inc=write&text=/room ' + room + '&r=' + Math.random();
  gettime = new Date().getTime();
  document.fmsg.text0.focus();
}

/* Загружает викторину */
var gameon = 0;
var gamews = "";

function startgame() {
  if (gameon == 0) {
    if (!window.WebSocket) return false;
    gameon = 1;

    const quiz = document.querySelector('#gamediv');
    quiz.classList.add('open');
    quiz.innerHTML = 'Загрузка...';

    if (location.protocol == "https:") gamews = new WebSocket("wss://" + engine_host + ":" + (engine_port + 1) + "/?app=game&chat=" + chatlogin + "&engine=WebSocket"); else
      gamews = new WebSocket("ws://" + engine_host + ":" + engine_port + "/?app=game&chat=" + chatlogin + "&engine=WebSocket");
    gamews.onmessage = function (e) {
      eval(e.data.replace(new RegExp('<scr' + 'ipt>', 'gm'), '').replace(new RegExp('</scr' + 'ipt>', 'gm'), ''));
    };

  } else {
    gameon = 0;
    quiz.classList.remove('open');

    if (gamews) {
      gamews.close();
      gamews = "";
    }
  }
}

function setgame(sec, word, ask) {
  var gd = document.getElementById('gamediv');
  if (!gd) return;

  if (ask) {
    gd.innerHTML =
      '<div id="gameword" style="margin-bottom:8px"></div>' +
      '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">' +
      '<a href="?" onclick="alert(\'Введите ответ с % в поле ввода чата\');return false" ' +
      'style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;' +
      'background:var(--accent);color:#fff;border-radius:8px;font-weight:700;font-size:16px;text-decoration:none">?</a>' +
      '<span style="font-size:16px;font-weight:500;line-height:1.4">' + ask + '</span>' +
      '</div>';
  }

  var obj = document.getElementById('gameword');
  if (!obj) return;

  var html = '<div style="display:flex;gap:4px;flex-wrap:wrap;align-items:center">';
  for (var i = 0; i < word.length; i++) {
    var sym = word.substr(i, 1);
    if (sym == ' ') sym = '&nbsp;';
    var filled = (sym !== '_' && sym !== '&nbsp;');
    html +=
      '<div style="' +
      'width:38px;height:42px;' +
      'display:flex;align-items:center;justify-content:center;' +
      'background:' + (filled ? '#ffffff' : '#f8fafc') + ';' +
      'border:2px solid ' + (filled ? 'var(--accent)' : '#cbd5e1') + ';' +
      'border-radius:8px;' +
      'font-size:20px;font-weight:700;' +
      'color:' + (filled ? 'var(--accent)' : '#94a3b8') + ';' +
      'box-shadow:0 2px 4px rgba(0,0,0,0.06);' +
      'transition:all .3s;' +
      'font-family:monospace;' +
      'text-transform:uppercase;' +
      '">' + sym + '</div>';
  }
  /* Таймер */
  html +=
    '<div style="' +
    'width:42px;height:42px;' +
    'display:flex;align-items:center;justify-content:center;' +
    'background:linear-gradient(135deg,#fef2f2,#fee2e2);' +
    'border:2px solid #fca5a5;' +
    'border-radius:8px;' +
    'font-size:16px;font-weight:800;' +
    'color:#dc2626;' +
    'box-shadow:0 2px 4px rgba(220,38,38,0.15);' +
    'margin-left:8px;' +
    (sec <= 5 ? 'animation:timer-pulse 0.5s infinite;' : '') +
    '">' + sec + '</div>';
  html += '</div>';

  obj.innerHTML = html;
}

/* Открывает окно с историей сообщений */
function openhistory() {
  h = window.open("", "", "scrollbars=yes,width=600,height=400,noresize");
  h.document.write(myhistory);
}

/* [Подготовка фреймов и загрузка сообщений] */
var userlist = '<div id="ul" class="nick-list"></div>';
if (useseparate) userlist = '<div id="ul" class="nick-list">' +
  '<div id="adm" class="nick-list__section" style="display:none"><div class="nick-list__section-title">Администрация</div></div>' +
  '<div id="woman" class="nick-list__section" style="display:none"><div class="nick-list__section-title">Девушки</div></div>' +
  '<div id="man" class="nick-list__section" style="display:none"><div class="nick-list__section-title">Парни</div></div>' +
  '<div id="noman" class="nick-list__section" style="display:none"><div class="nick-list__section-title">Гости</div></div>' +
  '</div>';

function loadframes() {
  /* Последняя стадия загрузки */
  if (interval) window.clearTimeout(interval);
  /* Подготовка фрейма привата */
  if (privatok == 1) {
    document.getElementById("privatdiv").innerHTML = '';
  }
  /* Обнуление переменных */
  loaded = 0;
  scrolled = 0;
  myhistory = myhistory1;
  for (var i = 0; i < rooms.length; i++) rooms[i][1] = 0;
  if (mystyle) setstyle(mystyle);
  /* Подготовка никлиста */
  uc = 0;
  us = new Array();
  ucc = new Array();
  document.getElementById('users').innerHTML = userlist;
  /* Проверка непрерывного соединения */
  interval = window.setTimeout('wr("<font color=red>Не удалось подключиться к движку чата.<br>Попробуйте использовать новый современный браузер <a href=https://www.google.com/chrome target=_blank>Google Chrome</a>.</font>");', 10000);
  /* Загрузка движка сообщений */
  document.getElementById("leftdiv").innerHTML = 'Загрузка ...';
  loadengine();
}

var interval = window.setTimeout('wr("<font color=red>Чат не был загружен в установленное время, вероятно некоторые элементы страницы грузятся очень долго, <a href=# onclick=\'loadframes(); return false;\'>нажмите для продолжения</a> ...</font>");', 10000);



/* Загрузка чата сразу после загрузки DOM */
document.addEventListener('DOMContentLoaded', loadframes);