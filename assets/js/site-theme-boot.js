(function (global) {
  'use strict';

  var KEY = 'chat_dark_theme';
  var CLASS = 'chat-theme-dark';
  var THEME_COLOR_DARK = '#070b18';
  var THEME_COLOR_LIGHT = '#4a90e2';

  function isEnabled() {
    try {
      return localStorage.getItem(KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function apply(enabled) {
    var root = document.documentElement;
    root.classList.toggle(CLASS, !!enabled);
    root.style.colorScheme = enabled ? 'dark' : 'light';

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.content = enabled ? THEME_COLOR_DARK : THEME_COLOR_LIGHT;
    }
  }

  function setEnabled(enabled) {
    try {
      localStorage.setItem(KEY, enabled ? '1' : '0');
    } catch (e) {}
    apply(enabled);
  }

  function initCheckbox(id) {
    var checkbox = document.getElementById(id || 'checkDarkTheme');
    if (!checkbox) return;

    checkbox.checked = isEnabled();
    checkbox.addEventListener('change', function () {
      setEnabled(checkbox.checked);
    });
  }

  global.SiteTheme = {
    KEY: KEY,
    CLASS: CLASS,
    isEnabled: isEnabled,
    apply: apply,
    setEnabled: setEnabled,
    applySaved: function () {
      apply(isEnabled());
    },
    initCheckbox: initCheckbox
  };

  apply(isEnabled());
})(window);
