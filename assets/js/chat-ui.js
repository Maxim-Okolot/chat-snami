/**
 * UI чата (chat.inc): часы, комнаты, меню, форма, пауза прокрутки, загрузка файлов.
 * Зависит от глобалов из PHP и data/jscripts.dat (rooms, sendto, setmyroom, …).
 */
'use strict';

const MEDIA_LINK_PROMPT =
  'Укажите ссылку на картинку, музыку, видео или YouTube, форматы: jpeg jpg gif png bmp ico tif tiff mp3 m4a ogg weba mp4 webm mov';

const CYRILLIC_LATIN =
  'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const CYRILLIC_ENCODED = [
  '%C0', '%C1', '%C2', '%C3', '%C4', '%C5', '%A8', '%C6', '%C7', '%C8', '%C9', '%CA', '%CB', '%CC', '%CD', '%CE', '%CF',
  '%D0', '%D1', '%D2', '%D3', '%D4', '%D5', '%D6', '%D7', '%D8', '%D9', '%DA', '%DB', '%DC', '%DD', '%DE', '%DF',
  '%E0', '%E1', '%E2', '%E3', '%E4', '%E5', '%B8', '%E6', '%E7', '%E8', '%E9', '%EA', '%EB', '%EC', '%ED', '%EE', '%EF',
  '%F0', '%F1', '%F2', '%F3', '%F4', '%F5', '%F6', '%F7', '%F8', '%F9', '%FA', '%FB', '%FC', '%FD', '%FE', '%FF',
];

/** Часы и дата в левом сайдбаре. */
class ChatClock {
  static init() {
    const timeEl = document.querySelector('#time');
    if (!timeEl) return;

    const dateEl = document.querySelector('#chat-date');
    const pad = (n) => (n < 10 ? `0${n}` : String(n));
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа',
      'сентября', 'октября', 'ноября', 'декабря',
    ];

    const tick = () => {
      const now = new Date();
      timeEl.textContent = `${pad(now.getHours())} : ${pad(now.getMinutes())} : ${pad(now.getSeconds())}`;
    };

    tick();
    setInterval(tick, 1000);

    if (dateEl) {
      const now = new Date();
      dateEl.textContent = `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} `;
    }
  }
}

/** Селект комнат (если rooms.length > 1). */
class ChatRoomSelect {
  static init() {
    if (typeof rooms === 'undefined' || rooms.length <= 1) return;

    const container = document.querySelector('.left-sidebar__select-status');
    if (!container) return;

    const select = document.createElement('select');
    select.className = 'ok';
    select.name = 'selectroom';
    select.addEventListener('change', () => {
      if (typeof setmyroom === 'function') setmyroom(select.value);
    });

    for (let i = 0; i < rooms.length; i++) {
      const option = document.createElement('option');
      option.value = String(i);
      option.textContent = `${rooms[i][0]} (0)`;
      if (Number(i) === Number(typeof myroom !== 'undefined' ? myroom : 0)) {
        option.selected = true;
      }
      select.append(option);
    }

    container.append(select);
  }
}

/** Раскрытие пунктов главного меню. */
class ChatMenu {
  static init() {
    document.querySelectorAll('.chat-menu__item').forEach((item) => {
      item.addEventListener('click', () => item.classList.toggle('active'));
    });
  }
}

/** Чекбокс «графические ники» (#checkGraphNick). */
class ChatGraphNickToggle {
  static init() {
    const checkbox = document.getElementById('checkGraphNick');
    if (!checkbox) return;

    const saved = localStorage.getItem('use_gn');
    if (saved !== null) {
      checkbox.checked = saved === '1';
      window.use_gn = checkbox.checked ? 1 : 0;
    }

    checkbox.addEventListener('change', () => {
      localStorage.setItem('use_gn', checkbox.checked ? '1' : '0');
      window.use_gn = checkbox.checked ? 1 : 0;
    });
  }
}

/** Чекбокс «тёмная тема» (#checkDarkTheme). */
class ChatDarkTheme {
  static init() {
    if (window.SiteTheme) {
      SiteTheme.initCheckbox('checkDarkTheme');
    }
  }
}

/** Панель смайлов в футере (#mainsmilediv). */
class ChatSmilePanel {
  static init() {
    const iframe = document.querySelector('#mainsmilediv iframe');
    if (iframe) ChatSmilePanel.bindIframe(iframe);

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const panel = document.getElementById('mainsmilediv');
      if (panel?.classList.contains('smiles--open') && typeof mainsmileon === 'function') {
        mainsmileon({ matches: 1 });
      }
    });

    window.ChatSmilePanelRefresh = () => ChatSmilePanel.refreshIframe();
  }

  static bindIframe(iframe) {
    iframe.addEventListener('load', () => ChatSmilePanel.decorateIframe(iframe));
    if (iframe.contentDocument?.readyState === 'complete') {
      ChatSmilePanel.decorateIframe(iframe);
    }
  }

  static refreshIframe() {
    const iframe = document.querySelector('#mainsmilediv iframe');
    if (iframe) ChatSmilePanel.decorateIframe(iframe);
  }

  static decorateIframe(iframe) {
    const doc = iframe.contentDocument;
    if (!doc?.head || !doc.body) return;

    doc.body.classList.add('smile-body');

    if (!doc.getElementById('smile-panel-css')) {
      const link = doc.createElement('link');
      link.id = 'smile-panel-css';
      link.rel = 'stylesheet';
      link.href = '/assets/css/smile-panel.css';
      doc.head.appendChild(link);
    }

    doc.documentElement.classList.toggle(
      'chat-theme-dark',
      document.documentElement.classList.contains('chat-theme-dark')
    );
  }
}

/** Уведомление о новой почте. */
class ChatPostNotifier {
  static init() {
    if (typeof post === 'undefined' || !(post > 0)) return;

    const badge = document.getElementById('idpost');
    if (badge) badge.textContent = post;

    if (typeof focus === 'function') focus();
    alert('У вас новая почта!');
  }
}

/** Пункт «Админка» в личном меню. */
class ChatAdminMenu {
  static init() {
    if (Number(typeof admin !== 'undefined' ? admin : 0) !== 1) return;

    const submenu = document.querySelector('[data-chat-submenu="personal"]');
    if (!submenu) return;

    const item = document.createElement('li');
    item.className = 'chat-submenu__item';
    item.innerHTML =
      '<a href="#" class="chat-submenu__link">' +
      '<img src="../assets/img/menu-icons/admin.png" alt="Админка"> Админка</a>';

    const link = item.querySelector('a');
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof wo === 'function') wo('index.php?inc=admin', 'admin', '640', '500', 'yes');
    });

    submenu.append(item);
  }
}

/** Баннер DJ-страницы для радиоведущих. */
class ChatDjBanner {
  static init() {
    const host = document.querySelector('[data-dj-banner-host]');
    if (!host) return;

    const status = typeof mystatus !== 'undefined'
      ? mystatus
      : (typeof parent !== 'undefined' && parent.mystatus !== undefined ? parent.mystatus : 0);
    const nick = typeof mynick !== 'undefined' ? mynick : '';
    const show = [1, 6, 7, 8].includes(Number(status)) || nick === 'FunnyBunny';

    if (!show) return;

    const link = document.createElement('a');
    link.href = '/index.php?inc=1';
    link.className = 'dj-page';
    link.target = '_blank';
    link.innerHTML = '<img src="../assets/img/radio/djeyka.png" alt="DJ">';
    host.append(link);
  }
}

/** Аккордеон блока радио. */
class ChatAccordion {
  static init() {
    const header = document.querySelector('.accordion__header');
    if (!header) return;

    header.addEventListener('click', () => header.classList.toggle('open'));
  }
}

/** Скрытые поля nick/id в форме отправки. */
class ChatFormHiddenFields {
  static init() {
    const form = document.forms.fmsg;
    if (!form || typeof mynick === 'undefined') return;

    const nickInput = document.createElement('input');
    nickInput.type = 'hidden';
    nickInput.name = 'nick';
    nickInput.value = mynick;
    form.append(nickInput);

    if (typeof myid !== 'undefined') {
      const idInput = document.createElement('input');
      idInput.type = 'hidden';
      idInput.name = 'id';
      idInput.value = myid;
      form.append(idInput);
    }
  }
}

/** Optgroup модерации в select[name=cmd] — команды из jscripts.dat (cmd === 0). */
class ChatAdminActions {
  static MODERATION_ACTIONS = [
    { cmd: 'alert', label: 'алерт-вызов' },
    { cmd: 'clear', label: 'очистить фрейм' },
    { cmd: 'reload', label: 'перезагрузить чат' },
    { cmd: 'ignore', label: 'полный игнор' },
    { cmd: 'remove', label: 'стереть сообщение' },
    { cmd: 'deportation', label: 'в темницу' },
    { cmd: 'amnesty', label: 'амнистия' },
  ];

  static init() {
    if (Number(typeof admin !== 'undefined' ? admin : 0) !== 1) return;

    const select = document.querySelector('.footer-form__actions');
    if (!select || select.tagName !== 'SELECT') return;

    const label = 'Модерация';
    if (select.querySelector(`optgroup[label="${label}"]`)) return;

    const group = document.createElement('optgroup');
    group.label = label;

    ChatAdminActions.MODERATION_ACTIONS.forEach(({ cmd, label: text }) => {
      const option = document.createElement('option');
      option.value = `/${cmd} `;
      option.textContent = text;
      group.append(option);
    });

    select.append(group);
  }
}

/** Пауза автопрокрутки ленты (#leftdiv). */
class ChatScrollPause {
  constructor() {
    this.paused = false;
    this.frame = null;
    this.savedScrollTop = 0;
    this.button = null;
    this._observer = null;
    this._patchScrollMethods();
  }

  init() {
    this.button = document.getElementById('pauseScrollButton');
    this.frame = document.getElementById('leftdiv');
    if (!this.frame) return;

    this._observer = new MutationObserver(() => {
      if (this.paused && this.frame) {
        this.frame.scrollTop = this.savedScrollTop;
      }
    });

    this._observer.observe(this.frame, { childList: true, subtree: true });

    this.frame.addEventListener('scroll', () => {
      if (this.paused) this.savedScrollTop = this.frame.scrollTop;
    }, { passive: true });

    if (localStorage.getItem('scroll_paused') === '1') {
      setTimeout(() => this.toggle(), 500);
    }
  }

  toggle() {
    if (!this.frame) {
      alert('Фрейм чата не найден');
      return;
    }

    this.paused = !this.paused;

    if (this.button) {
      this.button.classList.toggle('scroll-paused', this.paused);
      this.button.setAttribute('aria-pressed', this.paused ? 'true' : 'false');
      this.button.title = this.paused ? 'Возобновить прокрутку' : 'Остановить прокрутку';
    }

    this.frame.classList.toggle('chat-paused', this.paused);

    if (this.paused) {
      this.savedScrollTop = this.frame.scrollTop;
    } else {
      this.frame.scrollTop = this.frame.scrollHeight;
    }

    localStorage.setItem('scroll_paused', this.paused ? '1' : '0');
  }

  _patchScrollMethods() {
    const self = this;
    const originalScrollTo = Element.prototype.scrollTo;
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    const scrollTopDesc = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollTop');

    Element.prototype.scrollTo = function (...args) {
      if (this.id === 'leftdiv' && self.paused) return;
      return originalScrollTo.apply(this, args);
    };

    Element.prototype.scrollIntoView = function (...args) {
      if (self.paused && this.closest && this.closest('#leftdiv')) return;
      return originalScrollIntoView.apply(this, args);
    };

    if (scrollTopDesc) {
      Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
        set(val) {
          if (this.id === 'leftdiv' && self.paused) return;
          scrollTopDesc.set.call(this, val);
        },
        get() {
          return scrollTopDesc.get.call(this);
        },
      });
    }
  }
}

/** Сжатие JPG/PNG и проверка GIF перед отправкой. */
class ChatFileUpload {
  static init() {
    const fileInput = document.querySelector('input[name="loadfile"]');
    if (!fileInput) return;

    const uploadsEnabled = Number(typeof loadfile_on !== 'undefined' ? loadfile_on : 0) > 0;

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (typeof sendto === 'function') sendto(` ${file.name}`);

      if (!uploadsEnabled || !file.type.match('image.*')) return;

      if (file.type === 'image/gif') {
        const maxSizeKB = 500;
        const fileSizeKB = file.size / 1024;
        if (fileSizeKB > maxSizeKB) {
          alert(`GIF слишком большой! Максимальный размер: ${maxSizeKB} КБ. Ваш файл: ${Math.round(fileSizeKB)} КБ`);
          fileInput.value = '';
        }
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxWidth = 500;
          const maxHeight = 350;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            const newFile = new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(newFile);
            fileInput.files = dataTransfer.files;
          }, 'image/jpeg', 0.9);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
}

/** Сворачивание левой и правой панелей. */
class ChatSidebarToggle {
  static CONFIG = {
    left: {
      sidebar: '#leftSidebar',
      bodyClass: 'chat-body--left-sidebar-collapsed',
      storageKey: 'chat-ui-left-sidebar',
      expandTitle: 'Показать меню',
      collapseTitle: 'Скрыть меню',
    },
    right: {
      sidebar: '#rightSidebar',
      bodyClass: 'chat-body--right-sidebar-collapsed',
      storageKey: 'chat-ui-right-sidebar',
      expandTitle: 'Показать панель',
      collapseTitle: 'Скрыть панель',
    },
  };

  static init() {
    for (const side of Object.keys(this.CONFIG)) {
      const cfg = this.CONFIG[side];
      const sidebar = document.querySelector(cfg.sidebar);
      if (!sidebar) continue;

      try {
        if (localStorage.getItem(cfg.storageKey) === '1') {
          this.setCollapsed(side, true, false);
        }
      } catch (_) {}
    }
  }

  static toggle(side) {
    const cfg = this.CONFIG[side];
    if (!cfg) return;

    const sidebar = document.querySelector(cfg.sidebar);
    if (!sidebar) return;

    this.setCollapsed(side, !sidebar.classList.contains('is-collapsed'));
  }

  static setCollapsed(side, collapsed, persist = true) {
    const cfg = this.CONFIG[side];
    const sidebar = document.querySelector(cfg.sidebar);
    const button = document.querySelector(`[data-action="toggle-${side}-sidebar"]`);
    if (!sidebar || !button) return;

    sidebar.classList.toggle('is-collapsed', collapsed);
    document.body.classList.toggle(cfg.bodyClass, collapsed);
    button.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    button.title = collapsed ? cfg.expandTitle : cfg.collapseTitle;

    if (persist) {
      try {
        localStorage.setItem(cfg.storageKey, collapsed ? '1' : '0');
      } catch (_) {}
    }
  }
}

/** Выпадающее меню кнопок футера при ширине ≤1500px. */
class ChatFooterToolsDropdown {
  static init() {
    const root = document.querySelector('.footer-form__tools');
    if (!root) return;

    const mq = window.matchMedia('(max-width: 1500px)');
    mq.addEventListener('change', () => this.close());

    document.addEventListener('click', (event) => {
      if (!root.classList.contains('is-open')) return;
      if (event.target.closest('.footer-form__tools')) return;
      this.close();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.close();
    });
  }

  static toggle() {
    const root = document.querySelector('.footer-form__tools');
    if (!root) return;

    root.classList.toggle('is-open');
    this.syncAria(root);
  }

  static close() {
    const root = document.querySelector('.footer-form__tools');
    if (!root) return;

    root.classList.remove('is-open');
    this.syncAria(root);
  }

  static syncAria(root) {
    const button = root.querySelector('[data-action="toggle-footer-tools"]');
    if (!button) return;
    button.setAttribute('aria-expanded', root.classList.contains('is-open') ? 'true' : 'false');
  }
}

/** Обработчики кнопок футера и меню (data-action). */
class ChatFooterActions {
  static init() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-action]');
      if (!trigger) return;

      const action = trigger.dataset.action;
      const form = document.forms.fmsg;

      if (action !== 'toggle-footer-tools' && trigger.closest('.footer-form__tools-panel')) {
        ChatFooterToolsDropdown.close();
      }

      switch (action) {
        case 'chat-exit':
          e.preventDefault();
          if (typeof ws !== 'undefined' && ws) ws.close();
          (window.top || window).location.href = 'index.php?inc=exit';
          break;

        case 'media-link': {
          e.preventDefault();
          const url = prompt(MEDIA_LINK_PROMPT, '');
          if (url && typeof sendto === 'function') sendto(` [media]${url}[/media] `);
          break;
        }

        case 'upload-photo':
          e.preventDefault();
          if (Number(typeof loadfile_on !== 'undefined' ? loadfile_on : 0) === 0) return;
          document.getElementsByName('loadfile')[0]?.click();
          break;

        case 'start-quiz':
          e.preventDefault();
          if (typeof startgame === 'function') startgame();
          break;

        case 'toggle-smiles': {
          e.preventDefault();
          const panel = document.getElementById('mainsmilediv');
          if (!panel || typeof mainsmileon !== 'function') return;
          const open = panel.classList.contains('smiles--open');
          mainsmileon({ matches: open ? 1 : 0 });
          break;
        }

        case 'lovesmile':
          e.preventDefault();
          if (typeof wo === 'function') {
            wo(`index.php?inc=smile&table=5-35-1&${typeof parent !== 'undefined' ? parent.yourkey : yourkey}`, 'smile', '950', '750', 'yes');
          }
          break;

        case 'insert-percent':
          e.preventDefault();
          if (form?.text0) {
            form.text0.value += '%';
            form.text0.focus();
          }
          break;

        case 'insert-slash':
          e.preventDefault();
          if (form?.text0) {
            form.text0.value += '/';
            form.text0.focus();
          }
          break;

        case 'clear-log':
          e.preventDefault();
          document.getElementById('leftdiv').innerHTML = '';
          break;

        case 'voice-record':
          e.preventDefault();
          if (typeof mp_recording === 'function') mp_recording();
          break;

        case 'reload-chat':
          e.preventDefault();
          if (typeof loadframes === 'function') loadframes();
          break;

        case 'pick-file':
          e.preventDefault();
          document.getElementsByName('loadfile')[0]?.click();
          break;

        case 'open-settings':
          e.preventDefault();
          if (typeof wo === 'function' && typeof yourkey !== 'undefined') {
            wo(`index.php?inc=set&${yourkey}`, 'set', '500', '550', 'yes');
          }
          break;

        case 'clear-tonick':
          e.preventDefault();
          if (form?.tonick) form.tonick.value = '';
          if (form?.cmd) form.cmd.value = '';
          break;

        case 'toggle-scroll-pause':
          e.preventDefault();
          chatScrollPause.toggle();
          break;

        case 'toggle-left-sidebar':
          e.preventDefault();
          ChatSidebarToggle.toggle('left');
          break;

        case 'toggle-right-sidebar':
          e.preventDefault();
          ChatSidebarToggle.toggle('right');
          break;

        case 'toggle-footer-tools':
          e.preventDefault();
          ChatFooterToolsDropdown.toggle();
          break;

        default:
          break;
      }
    });

    const statusSelect = document.querySelector('select[name="setstatus"]');
    if (statusSelect) {
      statusSelect.addEventListener('change', () => {
        gettime = new Date().getTime();
        if (typeof setstatus === 'function') setstatus(statusSelect.value);
      });
    }
  }
}

/** Кодирование кириллицы для legacy-форм (window.converter). */
function converter(text) {
  let result = text;
  for (let i = 0; i < CYRILLIC_LATIN.length; i++) {
    const ch = CYRILLIC_LATIN.charAt(i);
    while (result.split(ch).length > 1) {
      result = result.replace(ch, CYRILLIC_ENCODED[i]);
    }
  }
  return result;
}

const chatScrollPause = new ChatScrollPause();

function toggleScrollPause() {
  chatScrollPause.toggle();
}

function toggleGn() {
  document.getElementById('checkGraphNick')?.dispatchEvent(new Event('change'));
}

window.converter = converter;
window.toggleScrollPause = toggleScrollPause;
window.toggleGn = toggleGn;

document.addEventListener('DOMContentLoaded', () => {
  ChatClock.init();
  ChatRoomSelect.init();
  ChatMenu.init();
  ChatGraphNickToggle.init();
  ChatDarkTheme.init();
  ChatSmilePanel.init();
  ChatPostNotifier.init();
  ChatAdminMenu.init();
  ChatDjBanner.init();
  ChatAccordion.init();
  ChatFormHiddenFields.init();
  ChatAdminActions.init();
  ChatSidebarToggle.init();
  ChatFooterToolsDropdown.init();
  chatScrollPause.init();
  ChatFileUpload.init();
  ChatFooterActions.init();
});
