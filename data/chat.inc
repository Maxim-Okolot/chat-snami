<!DOCTYPE html>
<html lang="ru">
<head>
  <script src="/assets/js/site-theme-boot.js"></script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <title>С нами — веб-чат для общения онлайн</title>
  <meta name="description" content="Чат «С нами» — общение в реальном времени, приватные сообщения, смайлы, викторина, радио и сообщество с форумом, галереей и магазином.">
  <meta name="keywords" content="чат, веб-чат, общение онлайн, с нами, mpchat, смайлы, приват, радио, форум, галерея">
  <meta name="author" content="С нами">
  <meta name="robots" content="index, follow">
  <meta name="language" content="Russian">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta name="format-detection" content="telephone=no">
  <meta name="theme-color" content="#4a90e2">
  <meta name="application-name" content="С нами">
  <meta name="color-scheme" content="light dark">
<link rel="canonical" href="https://snami.mpchat.com/">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="С нами">
  <meta property="og:locale" content="ru_RU">
  <meta property="og:title" content="С нами — веб-чат для общения онлайн">
  <meta property="og:description" content="Чат «С нами» — общение в реальном времени, приватные сообщения, смайлы, викторина, радио и сообщество с форумом, галереей и магазином.">
  <meta property="og:url" content="https://snami.mpchat.com/">
  <meta property="og:image" content="https://snami.mpchat.com/assets/img/logo.png">
  <meta property="og:image:alt" content="Логотип чата С нами">

  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="С нами — веб-чат для общения онлайн">
  <meta name="twitter:description" content="Чат «С нами» — общение в реальном времени, приватные сообщения, смайлы, викторина, радио и сообщество с форумом, галереей и магазином.">
  <meta name="twitter:image" content="https://snami.mpchat.com/assets/img/logo.png">
  <meta name="twitter:image:alt" content="Логотип чата С нами">

  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-title" content="С нами">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="mobile-web-app-capable" content="yes">

  <link rel="icon" href="../assets/img/favicon.ico" type="image/x-icon">
  <link rel="shortcut icon" href="../assets/img/favicon.ico" type="image/x-icon">
  <link rel="apple-touch-icon" href="../assets/img/favicon.ico">

  <script src="../assets/js/jquery.js"></script>
  <script src="../assets/js/snamik.js"></script>
  <script src="?inc=informer&getmsg=1&inchat=1&lastreg=10&birthday=1>"></script>
  <script>%scripts%</script>
  <script src="../assets/js/chat-ui.js" defer></script>

  <link href="../assets/css/style.css" rel="stylesheet" type="text/css">
  <link rel="stylesheet" href="/assets/css/site-theme.css">
</head>


<body class="chat-body" id="telo">
<iframe name=hidden width=0 height=0 style="display:none;"></iframe>

<aside class="left-sidebar" id="leftSidebar">
  <button type="button" class="sidebar-toggle" data-action="toggle-left-sidebar" aria-expanded="true" aria-controls="leftSidebar" title="Скрыть меню">
    <span class="sidebar-toggle__icon" aria-hidden="true"></span>
  </button>
  <div class="left-sidebar__wrapper">
    <span class='left-sidebar__date'>
      <span class="left-sidebar__time" id="time">00:00:00</span>
      <span id="chat-date"></span>
    </span>

    <div class="left-sidebar__select-status">
      <select name="setstatus" title="Статус">
        <option value="">Статус</option>
        <option value="0">свободен</option>
        <option value="1">работаю</option>
        <option value="2">влюбился(ась)</option>
        <option value="4">меня нет</option>
        <option value="5">сплю</option>
        <option value="6">кушаю</option>
        <option value="7">бухаю</option>
        <option value="8">курю</option>
        <option value="9">водные процедуры</option>
        <option value="10">слушаю музыку</option>
        <option value="11">в эфире</option>
        <option value="12">в ярости</option>
      </select>
    </div>

    <nav class="chat-menu">
      <ul class="chat-menu__list">
        <li class="chat-menu__item">Главное меню
          <ul class="chat-submenu">
            <li class="chat-submenu__item">
              <a href="https://snami.mpchat.com/top100?inc=top100&only=123578&sort=onlinetime" class="chat-submenu__link" target="_blank">
                <img src="../assets/img/menu-icons/top.png" alt="Топ 100">
                Топ100
              </a>
            </li>
            <li class="chat-submenu__item">
              <a href="https://snami.mpchat.com/gallery" class="chat-submenu__link" target="_blank">
                <img src="../assets/img/menu-icons/gallery.png" alt="Галерея">
                Галерея
              </a>
            </li>
            <li class="chat-submenu__item">
              <a href="index.php?inc=love" class="chat-submenu__link" target="_blank">
                <img src="../assets/img/menu-icons/love.png" alt="Моя семья">
                Моя семья
              </a>
            </li>
            <li class="chat-submenu__item">
              <a href="https://snami.mpchat.com/clan" class="chat-submenu__link" target="_blank">
                <img src="../assets/img/menu-icons/clan.png" alt="Кланы">
                Кланы
              </a>
            </li>
            <li class="chat-submenu__item">
              <a href="https://snami.mpchat.com/shop" class="chat-submenu__link" target="_blank">
                <img src="../assets/img/menu-icons/shop.png" alt="Магазин">
                Магазин
              </a>
            </li>
            <li class="chat-submenu__item">
              <a href="https://snami.mpchat.com/?inc=forum" class="chat-submenu__link" target="_blank">
                <img src="../assets/img/menu-icons/forum.png" alt="Форум">
                Форум
              </a>
            </li>
            <li class="chat-submenu__item">
              <a href="index.php?inc=exit" data-action="chat-exit" class="chat-submenu__link">
                <img src="../assets/img/menu-icons/exit.png" alt="Выход">
                Выход
              </a>
            </li>
          </ul>
        </li>

        <li class="chat-menu__item">Личное меню
          <ul class="chat-submenu" data-chat-submenu="personal">
            <li class="chat-submenu__item">
              <a href="https://snami.mpchat.com/index.php?inc=post" class="chat-submenu__link" target="_blank">
                <img src="../assets/img/menu-icons/post.png" alt="Почта">
                Почта <span id="idpost"></span>
              </a>
            </li>
            <li class="chat-submenu__item">
              <a href="https://snami.mpchat.com/index.php?inc=set" class="chat-submenu__link" target="_blank">
                <img src="../assets/img/menu-icons/set.png" alt="Настройки">
                Настройки
              </a>
            </li>
          </ul>
        </li>

        <li class="chat-menu__item">Функции чата
          <ul class="chat-submenu">
            <li class="chat-submenu__item">
              <a class="chat-submenu__link" href="#" data-action="media-link" target="_blank" title="Указать медиа ссылку на картинку, музыку, видео или YouTube">
                <img src="../assets/img/menu-icons/link.png" alt="Медиа-ссылка">
                Медиа-ссылка
              </a>
            </li>
            <li class="chat-submenu__item">
              <a href="#" class="chat-submenu__link" data-action="upload-photo" target="_blank" title="Выбрать картинку для загрузки">
                <img src="../assets/img/menu-icons/link.png" alt="Загрузка фото">
                Загрузка
              </a>
            </li>
            <li class="chat-submenu__item">
              <a href="#" class="chat-submenu__link" data-action="start-quiz" target="_blank" title="Викторина">
                <img src="../assets/img/menu-icons/game.png" alt="Викторина">
                Викторина
              </a>
            </li>
          </ul>
        </li>
      </ul>

      <label class="chat-menu__checkbox">
        <input type="checkbox" id="checkSound" checked title="вкл/откл звуки входящих сообщений">
        <span>Звуки в чате</span>
      </label>

      <label class="chat-menu__checkbox">
        <input type="checkbox" id="checkGraphNick" checked title="Вкл-выкл графические ники">
        <span>Показывать графники</span>
      </label>

      <label class="chat-menu__checkbox">
        <input type="checkbox" id="checkDarkTheme" title="Включить тёмную тему чата">
        <span>Тёмная тема</span>
      </label>
    </nav>

    <div class="users-wrap">
      <p class="users-wrap__online">Сейчас онлайн: <span class="users-wrap__online-count" id="count">0</span></p>
      <div class="user-list" id="users"></div>
    </div>

  </div>
</aside>

<!-- start content -->
<main class="content">
  <div class="chat-list" id="leftdiv">Загрузка ...</div>
</main>
<!-- end content-->

<!-- start right sidebar -->
<aside class="right-sidebar" id="rightSidebar">
  <button type="button" class="sidebar-toggle" data-action="toggle-right-sidebar" aria-expanded="true" aria-controls="rightSidebar" title="Скрыть панель">
    <span class="sidebar-toggle__icon" aria-hidden="true"></span>
  </button>
  <div class="right-sidebar__wrapper">
    <img src="../assets/img/logo.png" class="right-sidebar__logo" alt="Логотип чата" title="С нами чат">

    <a href="https://myradio24.com/lenin" class="right-sidebar__radio-banner" target=_blank>
      <img src="../assets/img/radio/radio-leninfm-banner.jpg" alt="Баннер радио ЛенинFM" title="Радио ЛенинFM">
    </a>

    <!--start player - Плееры: default, lite, energy или custom (свой плеер) (можно несколько) -->
    <div id="my_player" class="radio-player my_player" data-player="energy" data-skin="blue" data-width=200 data-autoplay=0 data-volume=50 data-streamurl="https://myradio24.org/lenin"></div>
    <!--end player-->

    <span data-dj-banner-host></span>
    <a href="https://myradio24.com/ru/table/lenin" target=_blank>
      <img src="https://vmfile.com/upload/822/2529182247.png">
    </a>
    <a href="https://snami.mpchat.com/index.php?inc=2" target="_blank">
      <img src="https://vmfile.com/upload/822/3405123897.png">
    </a>

    <div class="">В эфире: <span data-myinfo="streamname"></span>
        <div data-myinfo="htmlavatar"></div>
    </div>

    <div class="accordion" id="accordion-1">
      <div class="accordion__item">
        <div class="accordion__header">
          <img id="bnt_radio" src="https://vmfile.com/upload/810/1809705269.png">
        </div>
        <div class="accordion__body">
          <b>Радио Иволга</b><br>
          <span style='display:block;text-align:center'>
            <div id="my_player_ivolga" class="my_player"
              data-player="energy"
              data-skin="blue"
              data-width="270"
              data-autoplay="0"
              data-volume="5"
              data-streamurl="https://myradio24.org/ivolga"></div>
          </span>

          <span style='display:block;text-align:center'>
            <a target="_blank" href="https://volnorez.com/ognu-enuseya"><img src="https://forumstatic.ru/files/001c/59/63/67722.gif" alt=""></a>
            <a target="_blank" href="https://volnorez.com/ognu-enuseya">
              <div id="vplayer001dd061">
                <a href="http://volnorez.com/ognu-enuseya" title="радио OгNu Enuseя">радио OгNu Enuseя</a>
                <script async type="text/javascript" src="//andreiii99.github.io/radio/ciat/ognu-enuseya/ognu-enuseya.js"></script>
              </div>
            </a>
          </span>

          <b>Радио "Параллельный мир"</b>
          <span style='display:block;text-align:center'>
            <div id="my_player_dream" class="my_player"
              data-player="energy"
              data-skin="blue"
              data-width="270"
              data-autoplay="0"
              data-volume="5"
              data-streamurl="https://myradio24.org/dream"></div>
          </span>
        </div>
      </div>
      <!-- радио плеер заканчивается -->
    </div>
  </div>

</aside>
<!-- end sidebar -->

<!-- start footer -->
<footer class="footer" id="bottomdiv">
  <form class="footer-form" action="index.php?inc=write" method=post target="hidden" name="fmsg" enctype="multipart/form-data" onsubmit="return msg_send();" onreset="return msg_reset();">
    <input type=hidden name="text" value=''>
    <input type=hidden name="trans" value=0>

    <div class="footer-form__top">
      <div>
        <select name="cmd" class="footer-form__actions" title="Выберите действие">
          <option value="">-=cказать=-</option>
          <option style="background-color: #6de87d; color: #0b0212;" value="/vsem ">всем</option>
          <option style="background-color: #b776e3; color: #0b0212;" value="/dev ">девушкам</option>
          <option style="background-color: #76e3d4; color: #0b0212;" value="/parn ">парням</option>
          <option value="/privat ">приватно</option>
          <option value="%">викторина</option>
          <option value="/privat2 ">приват окно</option>
          <option value="/me ">сообщение</option>
          <option value="*кубик*">кубик</option>
          <option value="/call ">вызвать</option>
        </select>
        <label class="footer__checkbox" title="Удалить ник после отправки сообщения">
          <input type="checkbox" name="deltonick">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.0001 32.3402L9.66008 24.0002L6.83008 26.8302L18.0001 38.0002L42.0001 14.0002L39.1701 11.1702L18.0001 32.3402Z" fill="black"/>
            <clipPath id="clip0_0_2680">
              <rect width="48" height="48" fill="white"/>
            </clipPath>
          </svg>
        </label>
        <output class="footer__addressee" data-action="clear-tonick" name="tonick" size='6' readonly title="Очистить поле"></output>
      </div>

      <div class="footer-form__tools">
        <button type="button" class="footer-tools-toggle" data-action="toggle-footer-tools" aria-expanded="false" aria-haspopup="true" title="Инструменты чата">
          Инструменты
          <span class="footer-tools-toggle__icon" aria-hidden="true"></span>
        </button>
        <div class="footer-form__tools-panel">
        <button type="button" class="footer__btn" data-action="toggle-smiles" title="Смайлы">
          <span class="footer__btn-icon-wrap" aria-hidden="true">
            <svg class="footer__btn-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="19" stroke="currentColor" stroke-width="2.5"/>
              <circle cx="17.5" cy="20" r="2.5" fill="currentColor"/>
              <circle cx="30.5" cy="20" r="2.5" fill="currentColor"/>
              <path d="M16 31C18.5 37 29.5 37 32 31" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </span>
        </button>
        <button type="button" class="footer__btn" data-action="lovesmile" title="LoveSmile">
          <span class="footer__btn-icon-wrap" aria-hidden="true">
            <svg class="footer__btn-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 40L9.5 24.5C4.5 19.5 4.5 12 11 9C15 7 19 9.5 24 14.5C29 9.5 33 7 37 9C43.5 12 43.5 19.5 38.5 24.5L24 40Z" fill="currentColor"/>
            </svg>
          </span>
        </button>
        <button type="button" class="footer__btn" data-action="insert-percent" title="Вставить % в сообщение">
          <span class="footer__btn-icon-wrap" aria-hidden="true">
            <svg class="footer__btn-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M38 10L10 38" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
              <circle cx="15" cy="15" r="5" stroke="currentColor" stroke-width="3"/>
              <circle cx="33" cy="33" r="5" stroke="currentColor" stroke-width="3"/>
            </svg>
          </span>
        </button>
        <button type="button" class="footer__btn" data-action="media-link" title="Медиа-ссылка">
          <span class="footer__btn-icon-wrap" aria-hidden="true">
            <svg class="footer__btn-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="8" width="36" height="32" rx="3" stroke="currentColor" stroke-width="2.5"/>
              <path d="M6 32L20 24L46 36" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="32" cy="18" r="4" stroke="currentColor" stroke-width="2.5"/>
            </svg>
          </span>
        </button>
        <button type="button" class="footer__btn" data-action="insert-slash" title="Вставить / в сообщение">
          <span class="footer__btn-icon-wrap" aria-hidden="true">
            <svg class="footer__btn-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M36 10L12 38" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
            </svg>
          </span>
        </button>
        <button type="button" class="footer__btn" data-action="start-quiz" title="Викторина">
          <span class="footer__btn-icon-wrap" aria-hidden="true">
            <svg class="footer__btn-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 14C8 10.6863 10.6863 8 14 8H34C37.3137 8 40 10.6863 40 14V28C40 31.3137 37.3137 34 34 34H22L12 40V34H14C10.6863 34 8 31.3137 8 28V14Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
              <path d="M16 18H26" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M16 24H32" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              <circle cx="34" cy="18" r="2" fill="currentColor"/>
            </svg>
          </span>
        </button>
        <button type="button" class="footer__btn" data-action="clear-log" title="Очистить лог/фрейм сообщений">
          <span class="footer__btn-icon-wrap" aria-hidden="true">
            <svg class="footer__btn-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 32H38V36H30V32ZM30 16H44V20H30V16ZM30 24H42V28H30V24ZM6 36C6 38.2 7.8 40 10 40H22C24.2 40 26 38.2 26 36V16H6V36ZM28 10H22L20 8H12L10 10H4V14H28V10Z" fill="currentColor"/>
            </svg>
          </span>
        </button>
        <button type="button" class="footer__btn mp_record" title="Голосовое сообщение" data-action="voice-record">
          <span class="footer__btn-icon-wrap" aria-hidden="true">
            <svg class="footer__btn-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="18" y="6" width="12" height="22" rx="6" stroke="currentColor" stroke-width="2.5"/>
              <path d="M12 22C12 29.732 18.268 36 26 36H22C29.732 36 36 29.732 36 22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M24 36V42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M18 42H30" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </span>
        </button>
        <button type="button" class="footer__btn footer__btn--scroll-pause" id="pauseScrollButton" data-action="toggle-scroll-pause" title="Остановить прокрутку чата" aria-pressed="false">
          <span class="footer__btn-icon-wrap" aria-hidden="true">
            <svg class="footer__btn-icon footer__scroll-icon--pause" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 38H20V10H12V38ZM28 10V38H36V10H28Z" fill="currentColor"/>
            </svg>
            <svg class="footer__btn-icon footer__scroll-icon--play" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 10V38L38 24L16 10Z" fill="currentColor"/>
            </svg>
          </span>
        </button>
        <button type="button" class="footer__btn" data-action="reload-chat" title="Обновить фрейм">
          <span class="footer__btn-icon-wrap" aria-hidden="true">
            <svg class="footer__btn-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 8V2L16 10L24 18V12C30.63 12 36 17.37 36 24C36 26.03 35.49 27.93 34.61 29.61L37.53 32.53C39.08 30.05 40 27.14 40 24C40 15.16 32.84 8 24 8ZM24 36C17.37 36 12 30.63 12 24C12 21.97 12.51 20.07 13.39 18.39L10.47 15.47C8.92 17.95 8 20.86 8 24C8 32.84 15.16 40 24 40V46L32 38L24 30V36Z" fill="currentColor"/>
            </svg>
          </span>
        </button>
        <label type="button" class="footer__btn" data-action="pick-file" title="Выбрать картинку для загрузки">
          <span class="footer__btn-icon-wrap" aria-hidden="true">
            <svg class="footer__btn-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M33 14V34C33 38.4183 29.4183 42 25 42C20.5817 42 17 38.4183 17 34V12C17 9.23858 19.2386 7 22 7C24.7614 7 27 9.23858 27 12V30C27 31.1046 26.1046 32 25 32C23.8954 32 23 31.1046 23 30V14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </span>
          <input type="file" name=loadfile size=1>
        </label>
        <button type="button" class="footer__btn" data-action="open-settings" title="Настройки профиля">
          <span class="footer__btn-icon-wrap" aria-hidden="true">
            <svg class="footer__btn-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="6" stroke="currentColor" stroke-width="2.5"/>
              <path d="M24 6V10M24 38V42M6 24H10M38 24H42M11.5 11.5L14.3 14.3M33.7 33.7L36.5 36.5M11.5 36.5L14.3 33.7M33.7 14.3L36.5 11.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </span>
        </button>
        </div>
      </div>
    </div>

    <div class="footer-form__bottom">
      <div class="smiles" id="mainsmilediv" aria-hidden="true">
        <div class="smiles__header">
          <span class="smiles__title">Смайлы</span>
          <button type="button" class="smiles__close" data-action="toggle-smiles" aria-label="Закрыть панель смайлов">×</button>
        </div>
        <div class="smiles__body">
          <iframe src="index.php?inc=smile&table=1-50-0&cat=%D0%91%D0%BE%D0%BA%D0%BE%D0%B2%D1%8B%D0%B5" title="Панель смайлов" loading="lazy"></iframe>
        </div>
      </div>
      <div class="footer-form__input-row">
        <input type="text" class="footer__message" name="text0" size="30" maxlength="700" title="Введите сообщение">
        <button type="submit" class="footer__btn-send" title="Отправить сообщение">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
        </button>
      </div>
    </div>
  </form>

  <!-- start game quiz -->
  <div class="quiz" id="gamediv"></div>
  <!-- end game quiz -->
</footer>
<!-- end footer -->

<script src="https://myradio24.com/player/player.js?v3.31" data-radio="lenin" data-interval=15 data-vmid=0 data-lang="ru"></script>
</body>
</html>