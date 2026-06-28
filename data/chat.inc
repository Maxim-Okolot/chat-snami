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

    <!-- start smiles -->
    <div class="smiles" id="mainsmilediv">
      <iframe src="index.php?inc=smile&table=1-50-0&cat=%D0%91%D0%BE%D0%BA%D0%BE%D0%B2%D1%8B%D0%B5" height="100%" width="100%" border="0" frameborder="0">
        Ваш обозреватель не поддерживает встроенные рамки или он не настроен на их отображение.
      </iframe>
    </div>
    <!-- end smiles -->
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
        <button type="button" class="footer__btn rect-button" data-action="toggle-smiles">Смайлы</button>
        <button type="button" class="footer__btn rect-button" data-action="lovesmile">LoveSmile</button>
        <button type="button" class="footer__btn" data-action="insert-percent" title="Вставить % в сообщение">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 5L5 19" stroke="#21272A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.5 9C7.88071 9 9 7.88071 9 6.5C9 5.11929 7.88071 4 6.5 4C5.11929 4 4 5.11929 4 6.5C4 7.88071 5.11929 9 6.5 9Z" stroke="#21272A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17.5 20C18.8807 20 20 18.8807 20 17.5C20 16.1193 18.8807 15 17.5 15C16.1193 15 15 16.1193 15 17.5C15 18.8807 16.1193 20 17.5 20Z" stroke="#21272A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button type="button" class="footer__btn" data-action="media-link" title='Медиа-ссылка'>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="#21272A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 16L10 13L21 18" stroke="#21272A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8C18 9.10457 17.1046 10 16 10Z" stroke="#21272A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button type="button" class="footer__btn" data-action="insert-slash" title="Вставить / в сообщение ">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8546 2.14592C13.9012 2.19236 13.9381 2.24754 13.9633 2.30828C13.9886 2.36903 14.0015 2.43415 14.0015 2.49992C14.0015 2.56568 13.9886 2.63081 13.9633 2.69155C13.9381 2.7523 13.9012 2.80747 13.8546 2.85392L2.85463 13.8539C2.76075 13.9478 2.63341 14.0005 2.50063 14.0005C2.36786 14.0005 2.24052 13.9478 2.14663 13.8539C2.05274 13.76 2 13.6327 2 13.4999C2 13.3671 2.05274 13.2398 2.14663 13.1459L13.1466 2.14592C13.1931 2.09935 13.2483 2.06241 13.309 2.0372C13.3697 2.012 13.4349 1.99902 13.5006 1.99902C13.5664 1.99902 13.6315 2.012 13.6923 2.0372C13.753 2.06241 13.8082 2.09935 13.8546 2.14592Z" fill="#21272A"/>
          </svg>
        </button>
        <button type="button" class="footer__btn" data-action="start-quiz" title="Викторина">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.02269 3.94928C6.50407 3.81466 7.00182 3.74759 7.50166 3.75C8.15176 3.75034 8.75296 3.91985 9.30849 4.07647C9.39931 4.10208 9.4889 4.12734 9.57729 4.15146C10.2317 4.33004 10.9703 4.5 11.9997 4.5C13.029 4.5 13.7672 4.33005 14.4213 4.15148C14.5095 4.1274 14.5989 4.10219 14.6895 4.07664C15.2452 3.91993 15.8466 3.75033 16.4978 3.75C16.9831 3.74776 17.4663 3.81565 17.9322 3.95157L17.9335 3.95195L17.9348 3.95233C19.2061 4.32814 20.1711 5.27213 20.9132 6.55796C21.6522 7.83839 22.208 9.5197 22.6465 11.5019C23.0963 13.5345 23.347 15.3964 23.2141 16.8636C23.0824 18.3177 22.5376 19.6367 21.1521 20.1099L21.1517 20.11C20.302 20.3997 19.4959 20.2153 18.8006 19.8111C18.1248 19.4182 17.5163 18.7996 16.977 18.1277C16.4686 17.4944 15.943 17.1079 15.2247 16.8637C14.4748 16.6087 13.477 16.4958 11.9997 16.4958C10.5228 16.4958 9.50913 16.6086 8.74333 16.8648C8.00828 17.1108 7.47165 17.4992 6.9684 18.1273L6.96764 18.1282C6.43279 18.7935 5.83428 19.4166 5.16301 19.8116C4.46612 20.2216 3.65989 20.4001 2.79701 20.1014L2.7966 20.1013C1.49289 19.6491 0.958309 18.3051 0.804046 16.8749C0.644876 15.3991 0.84538 13.5268 1.29888 11.5001L1.29889 11.5001C1.74209 9.52032 2.29756 7.83958 3.03506 6.55937C3.7758 5.27355 4.7388 4.32821 6.01234 3.95225L6.0175 3.95073L6.02269 3.94928ZM6.43196 5.39238C5.65441 5.62363 4.9583 6.22583 4.33481 7.30813C3.70674 8.39838 3.19182 9.91074 2.76268 11.8277M6.43196 5.39238C6.77829 5.29605 7.13631 5.24813 7.4958 5.24999L7.49774 5.25H7.49968C7.92808 5.25 8.30926 5.3561 8.87549 5.51371C8.97202 5.54058 9.07394 5.56895 9.18239 5.59854C9.90213 5.79496 10.7842 6 11.9997 6C13.2152 6 14.0968 5.79495 14.8163 5.59853C14.9244 5.56903 15.0259 5.54075 15.1222 5.51396C15.6887 5.35624 16.0703 5.25 16.4997 5.25H16.5016L16.5034 5.24999C16.8443 5.24829 17.1836 5.29585 17.5109 5.39118C18.2894 5.62174 18.9887 6.22433 19.6141 7.30778C20.2429 8.39724 20.7579 9.90906 21.1819 11.8259L21.1819 11.8259C21.6232 13.8204 21.8316 15.4982 21.7202 16.7282C21.6076 17.9713 21.2046 18.5069 20.6673 18.6904C20.3307 18.8051 19.9786 18.7609 19.5546 18.5144C19.1109 18.2564 18.6387 17.8018 18.1468 17.1888C17.4813 16.3597 16.7266 15.79 15.7076 15.4435C14.7202 15.1079 13.5237 14.9958 11.9997 14.9958C10.4751 14.9958 9.26648 15.108 8.26732 15.4424C7.23764 15.7869 6.4668 16.3546 5.79828 17.1887C5.30107 17.8072 4.83866 18.262 4.40237 18.5187C3.9916 18.7604 3.64354 18.8071 3.28767 18.6839C2.85059 18.5321 2.43429 18.0018 2.2954 16.714C2.16136 15.4713 2.32554 13.7812 2.76266 11.8278" fill="#21272A"/>
            <path d="M13.6875 11.4375C14.2053 11.4375 14.625 11.0178 14.625 10.5C14.625 9.98223 14.2053 9.5625 13.6875 9.5625C13.1697 9.5625 12.75 9.98223 12.75 10.5C12.75 11.0178 13.1697 11.4375 13.6875 11.4375Z" fill="#21272A"/>
            <path d="M15.75 13.5C15.5645 13.5 15.3831 13.445 15.2289 13.3418C15.0747 13.2387 14.9545 13.0922 14.8836 12.9207C14.8128 12.7493 14.7943 12.5607 14.8307 12.3787C14.8671 12.1968 14.9566 12.0298 15.0879 11.8988C15.2193 11.7677 15.3865 11.6786 15.5685 11.6427C15.7506 11.6068 15.9391 11.6257 16.1104 11.697C16.2817 11.7684 16.4279 11.8889 16.5306 12.0434C16.6334 12.1978 16.688 12.3793 16.6875 12.5648C16.6869 12.8131 16.5878 13.0509 16.4121 13.2262C16.2363 13.4016 15.9982 13.5 15.75 13.5Z" fill="#21272A"/>
            <path d="M15.75 9.375C16.2678 9.375 16.6875 8.95527 16.6875 8.4375C16.6875 7.91973 16.2678 7.5 15.75 7.5C15.2322 7.5 14.8125 7.91973 14.8125 8.4375C14.8125 8.95527 15.2322 9.375 15.75 9.375Z" fill="#21272A"/>
            <path d="M17.8125 11.4375C18.3303 11.4375 18.75 11.0178 18.75 10.5C18.75 9.98223 18.3303 9.5625 17.8125 9.5625C17.2947 9.5625 16.875 9.98223 16.875 10.5C16.875 11.0178 17.2947 11.4375 17.8125 11.4375Z" fill="#21272A"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 7.5C7.91421 7.5 8.25 7.83579 8.25 8.25V12.75C8.25 13.1642 7.91421 13.5 7.5 13.5C7.08579 13.5 6.75 13.1642 6.75 12.75V8.25C6.75 7.83579 7.08579 7.5 7.5 7.5Z" fill="#21272A"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 10.5C4.5 10.0858 4.83579 9.75 5.25 9.75H9.75C10.1642 9.75 10.5 10.0858 10.5 10.5C10.5 10.9142 10.1642 11.25 9.75 11.25H5.25C4.83579 11.25 4.5 10.9142 4.5 10.5Z" fill="#21272A"/>
          </svg>
        </button>
        <button type="button" class="footer__btn" data-action="clear-log" title="Очистить лог/фрейм сообщений">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 32H38V36H30V32ZM30 16H44V20H30V16ZM30 24H42V28H30V24ZM6 36C6 38.2 7.8 40 10 40H22C24.2 40 26 38.2 26 36V16H6V36ZM28 10H22L20 8H12L10 10H4V14H28V10Z" fill="black"/>
            <clipPath id="clip0_0_1165"><rect width="48" height="48" fill="white"/></clipPath>
          </svg>
        </button>
        <button type="button" class="footer__btn mp_record" title="Голосовое сообщение" data-action="voice-record">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16.25C9.38 16.25 7.25 14.12 7.25 11.5V6C7.25 3.38 9.38 1.25 12 1.25C14.62 1.25 16.75 3.38 16.75 6V11.5C16.75 14.12 14.62 16.25 12 16.25ZM12 2.75C10.21 2.75 8.75 4.21 8.75 6V11.5C8.75 13.29 10.21 14.75 12 14.75C13.79 14.75 15.25 13.29 15.25 11.5V6C15.25 4.21 13.79 2.75 12 2.75Z" fill="#292D32"/>
            <path d="M12.0001 19.7499C7.3701 19.7499 3.6001 15.9799 3.6001 11.3499V9.6499C3.6001 9.2399 3.9401 8.8999 4.3501 8.8999C4.7601 8.8999 5.1001 9.2399 5.1001 9.6499V11.3499C5.1001 15.1499 8.2001 18.2499 12.0001 18.2499C15.8001 18.2499 18.9001 15.1499 18.9001 11.3499V9.6499C18.9001 9.2399 19.2401 8.8999 19.6501 8.8999C20.0601 8.8999 20.4001 9.2399 20.4001 9.6499V11.3499C20.4001 15.9799 16.6301 19.7499 12.0001 19.7499Z" fill="#292D32"/>
            <path d="M13.3899 7.18007C13.3099 7.18007 13.2199 7.17007 13.1299 7.14007C12.3999 6.87007 11.5999 6.87007 10.8699 7.14007C10.4799 7.28007 10.0499 7.08007 9.90988 6.69007C9.76988 6.30007 9.96988 5.87007 10.3599 5.73007C11.4199 5.35007 12.5899 5.35007 13.6499 5.73007C14.0399 5.87007 14.2399 6.30007 14.0999 6.69007C13.9799 6.99007 13.6899 7.18007 13.3899 7.18007Z" fill="#292D32"/>
            <path d="M12.8001 9.30007C12.7301 9.30007 12.6701 9.29007 12.6001 9.27007C12.2001 9.16007 11.7901 9.16007 11.3901 9.27007C10.9901 9.38007 10.5801 9.14007 10.4701 8.74007C10.3601 8.35007 10.6001 7.94007 11.0001 7.83007C11.6501 7.65007 12.3501 7.65007 13.0001 7.83007C13.4001 7.94007 13.6401 8.35007 13.5301 8.75007C13.4401 9.08007 13.1301 9.30007 12.8001 9.30007Z" fill="#292D32"/>
            <path d="M12 22.75C11.59 22.75 11.25 22.41 11.25 22V19C11.25 18.59 11.59 18.25 12 18.25C12.41 18.25 12.75 18.59 12.75 19V22C12.75 22.41 12.41 22.75 12 22.75Z" fill="#292D32"/>
          </svg>
        </button>
        <button type="button" class="footer__btn footer__btn--scroll-pause" id="pauseScrollButton" data-action="toggle-scroll-pause" title="Остановить прокрутку чата" aria-pressed="false">
          <span class="footer__scroll-icon-wrap" aria-hidden="true">
            <svg class="footer__scroll-icon footer__scroll-icon--pause" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 38H20V10H12V38ZM28 10V38H36V10H28Z" fill="currentColor"/>
            </svg>
            <svg class="footer__scroll-icon footer__scroll-icon--play" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 10V38L38 24L16 10Z" fill="currentColor"/>
            </svg>
          </span>
        </button>
        <button type="button" class="footer__btn" data-action="reload-chat" title="Обновить фрейм">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 8V2L16 10L24 18V12C30.63 12 36 17.37 36 24C36 26.03 35.49 27.93 34.61 29.61L37.53 32.53C39.08 30.05 40 27.14 40 24C40 15.16 32.84 8 24 8ZM24 36C17.37 36 12 30.63 12 24C12 21.97 12.51 20.07 13.39 18.39L10.47 15.47C8.92 17.95 8 20.86 8 24C8 32.84 15.16 40 24 40V46L32 38L24 30V36Z" fill="black"/>
            <clipPath id="clip0_0_797"><rect width="48" height="48" fill="white"/></clipPath>
          </svg>
        </button>
        <label type="button" class="footer__btn" data-action="pick-file" title="Выбрать картинку для загрузки">
          <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.5623 10.7501V31.3542C29.5623 35.3138 26.3553 38.5209 22.3957 38.5209C18.4361 38.5209 15.229 35.3138 15.229 31.3542V8.95841C15.229 6.48591 17.2357 4.47925 19.7082 4.47925C22.1807 4.47925 24.1873 6.48591 24.1873 8.95841V27.7709C24.1873 28.7563 23.3811 29.5626 22.3957 29.5626C21.4103 29.5626 20.604 28.7563 20.604 27.7709V10.7501H17.9165V27.7709C17.9165 30.2434 19.9232 32.2501 22.3957 32.2501C24.8682 32.2501 26.8748 30.2434 26.8748 27.7709V8.95841C26.8748 4.99883 23.6678 1.79175 19.7082 1.79175C15.7486 1.79175 12.5415 4.99883 12.5415 8.95841V31.3542C12.5415 36.8009 16.949 41.2084 22.3957 41.2084C27.8423 41.2084 32.2498 36.8009 32.2498 31.3542V10.7501H29.5623Z" fill="black" fill-opacity="0.87"/>
          </svg>

          <input type="file" name=loadfile size=1>
        </label>
        <button type="button" class="footer__btn" data-action="open-settings" title="Настройки профиля">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.3403 16.9998C2.91758 16.2688 2.58897 15.4873 2.3623 14.6738C2.85561 14.4229 3.2699 14.0404 3.55933 13.5687C3.84877 13.097 4.00207 12.5544 4.00228 12.0009C4.00248 11.4475 3.84959 10.9048 3.56051 10.4328C3.27143 9.96088 2.85742 9.57809 2.3643 9.32682C2.81634 7.69231 3.67703 6.19977 4.8653 4.98982C5.3294 5.29155 5.86792 5.45898 6.42128 5.4736C6.97464 5.48822 7.52126 5.34945 8.00063 5.07265C8.48001 4.79586 8.87346 4.39182 9.13743 3.90526C9.4014 3.41871 9.52561 2.8686 9.4963 2.31582C11.1384 1.89145 12.8615 1.89213 14.5033 2.31782C14.4743 2.87059 14.5987 3.42061 14.8629 3.90703C15.1271 4.39345 15.5207 4.7973 16.0001 5.07388C16.4796 5.35047 17.0262 5.48901 17.5796 5.47417C18.1329 5.45934 18.6713 5.2917 19.1353 4.98982C19.7143 5.57982 20.2283 6.25082 20.6603 6.99982C21.0933 7.74882 21.4173 8.52982 21.6383 9.32582C21.145 9.57672 20.7307 9.9592 20.4413 10.4309C20.1518 10.9027 19.9985 11.4453 19.9983 11.9987C19.9981 12.5522 20.151 13.0949 20.4401 13.5668C20.7292 14.0388 21.1432 14.4216 21.6363 14.6728C21.1843 16.3073 20.3236 17.7999 19.1353 19.0098C18.6712 18.7081 18.1327 18.5407 17.5793 18.526C17.026 18.5114 16.4794 18.6502 16 18.927C15.5206 19.2038 15.1272 19.6078 14.8632 20.0944C14.5992 20.5809 14.475 21.131 14.5043 21.6838C12.8622 22.1082 11.1391 22.1075 9.4973 21.6818C9.52635 21.1291 9.4019 20.579 9.13773 20.0926C8.87355 19.6062 8.47995 19.2023 8.00048 18.9258C7.52101 18.6492 6.97436 18.5106 6.42103 18.5255C5.8677 18.5403 5.32927 18.7079 4.8653 19.0098C4.2743 18.4068 3.7619 17.7314 3.3403 16.9998ZM9.0003 17.1958C10.0659 17.8105 10.8672 18.7968 11.2503 19.9658C11.7493 20.0128 12.2503 20.0138 12.7493 19.9668C13.1327 18.7977 13.9343 17.8113 15.0003 17.1968C16.0655 16.5805 17.3208 16.3793 18.5253 16.6318C18.8153 16.2238 19.0653 15.7888 19.2733 15.3338C18.4527 14.4173 17.9994 13.23 18.0003 11.9998C18.0003 10.7398 18.4703 9.56282 19.2733 8.66582C19.0638 8.21097 18.8128 7.77646 18.5233 7.36782C17.3196 7.62013 16.0651 7.4193 15.0003 6.80382C13.9347 6.18919 13.1335 5.20281 12.7503 4.03382C12.2513 3.98682 11.7503 3.98582 11.2513 4.03282C10.8679 5.20197 10.0663 6.18838 9.0003 6.80282C7.93509 7.41914 6.67978 7.62034 5.4753 7.36782C5.18587 7.77611 4.93544 8.21069 4.7273 8.66582C5.54788 9.58238 6.00119 10.7696 6.0003 11.9998C6.0003 13.2598 5.5303 14.4368 4.7273 15.3338C4.93678 15.7887 5.18784 16.2232 5.4773 16.6318C6.68102 16.3795 7.93551 16.5803 9.0003 17.1958ZM12.0003 14.9998C11.2047 14.9998 10.4416 14.6838 9.87898 14.1211C9.31637 13.5585 9.0003 12.7955 9.0003 11.9998C9.0003 11.2042 9.31637 10.4411 9.87898 9.8785C10.4416 9.31589 11.2047 8.99982 12.0003 8.99982C12.796 8.99982 13.559 9.31589 14.1216 9.8785C14.6842 10.4411 15.0003 11.2042 15.0003 11.9998C15.0003 12.7955 14.6842 13.5585 14.1216 14.1211C13.559 14.6838 12.796 14.9998 12.0003 14.9998ZM12.0003 12.9998C12.2655 12.9998 12.5199 12.8945 12.7074 12.7069C12.8949 12.5194 13.0003 12.265 13.0003 11.9998C13.0003 11.7346 12.8949 11.4803 12.7074 11.2927C12.5199 11.1052 12.2655 10.9998 12.0003 10.9998C11.7351 10.9998 11.4807 11.1052 11.2932 11.2927C11.1057 11.4803 11.0003 11.7346 11.0003 11.9998C11.0003 12.265 11.1057 12.5194 11.2932 12.7069C11.4807 12.8945 11.7351 12.9998 12.0003 12.9998Z" fill="#03053D"/>
            <clipPath id="clip0_3190_17681"><rect width="24" height="24" fill="white"/></clipPath>
          </svg>
        </button>
        </div>
      </div>
    </div>

    <div class="footer-form__bottom">
      <input type="text" class="footer__message" name="text0" size="30" maxlength="700" title="Введите сообщение">
      <button type="submit" class="footer__btn-send" title="Отправить сообщение">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
      </button>
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