// ============================================================================
// --- SNAMIK BOT v5 (multi-player games, persistent score) — 25-Jun-2025 -----
// ============================================================================

var SNAMIK_BOT = (function () {
  "use strict";

  console.log(1111)

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
    var key = snamikGetYourkey();
    var doc = document;
    var f = doc.createElement('form');
    f.method = 'POST';
    f.action = 'index.php?inc=write' + (key ? '&' + key : '');
    f.target = 'hidden';
    f.style.display = 'none';

    function addField(name, value) {
      var i = doc.createElement('input');
      i.type = 'hidden';
      i.name = name;
      i.value = value;
      f.appendChild(i);
    }

    addField('text', msg);
    addField('trans', '0');
    if (typeof mynick !== 'undefined' && mynick) addField('nick', mynick);
    if (typeof myid !== 'undefined' && myid) addField('id', String(myid));
    doc.body.appendChild(f);
    f.submit();
    setTimeout(function () {
      try {
        doc.body.removeChild(f);
      } catch (e) {
      }
    }, 2000);
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
    if (text.substring(0, 9) !== '[Снамик] ') return false;
    var myNick = (typeof mynick !== 'undefined' && mynick) ? snamikNormalizeNick(mynick) : '';
    if (!myNick || snamikNormalizeNick(nick) !== myNick) return false;
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
    snamikPostWrite(msg);
    snamikOnBotCommandHandled();
  };

  function snamikNormalizeNick(nick) {
    return String(nick == null ? '' : nick).replace(/\s+/g, ' ').trim();
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
    if (nick !== myNick) return;

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
    version: '5.3'
  };

})(); // --- END SNAMIK BOT v5 -----------------------------------------------