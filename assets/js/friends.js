(function () {
  'use strict';

  const API = 'index.php?inc=frends';

  const MESSAGES = {
    add: 'Заявка успешно отправлена!',
    otm: 'Заявка успешно отменена.',
    del: 'Пользователь удалён из списка друзей.',
    'no users': 'Пользователь не найден.',
    'yes frend': 'Этот человек уже в списке ваших друзей.',
    'yes add': 'Вы уже отправили заявку этому пользователю.',
    'no my': 'Вы не можете добавить самого себя.',
    'no request': 'Активной заявки не найдено.',
    'no frend': 'Этот пользователь не в списке ваших друзей.',
    error: 'Не удалось выполнить действие. Попробуйте позже.',
  };

  function notify(message) {
    alert(message);
  }

  function parseUserId(userId) {
    const id = parseInt(userId, 10);
    return Number.isFinite(id) && id > 0 ? id : 0;
  }

  async function callFriendApi(action, userId) {
    const url = `${API}&${action}=${userId}`;
    const response = await fetch(url, { credentials: 'same-origin' });
    const text = await response.text();

    try {
      return JSON.parse(text);
    } catch {
      throw new Error('invalid_json');
    }
  }

  const FriendManager = {
    async sendRequest(userId) {
      const id = parseUserId(userId);
      if (!id) return;

      try {
        const result = await callFriendApi('add', id);
        notify(MESSAGES[result] || MESSAGES.error);
        if (result === 'add') {
          location.reload();
        }
      } catch {
        notify('Ошибка соединения. Попробуйте позже.');
      }
    },

    async cancelRequest(userId) {
      const id = parseUserId(userId);
      if (!id) return;
      if (!confirm('Вы уверены, что хотите отменить заявку в друзья?')) return;

      try {
        const result = await callFriendApi('otm', id);
        notify(MESSAGES[result] || MESSAGES.error);
        if (result === 'otm') {
          location.reload();
        }
      } catch {
        notify('Ошибка связи с сервером.');
      }
    },

    async removeFriend(userId, username) {
      const id = parseUserId(userId);
      if (!id) return;

      const nick = username || 'пользователя';
      if (!confirm(`Вы действительно хотите удалить ${nick} из друзей?`)) return;

      try {
        const result = await callFriendApi('del', id);
        if (result === 'del') {
          notify(`Пользователь ${nick} удалён из списка друзей.`);
          location.reload();
          return;
        }
        notify(MESSAGES[result] || MESSAGES.error);
      } catch {
        notify('Ошибка при удалении пользователя.');
      }
    },
  };

  function initFriendsListToggle() {
    const toggleBtn = document.querySelector('.show-friends-toggle');
    const more = document.getElementById('more-friends');
    if (!toggleBtn || !more) return;

    toggleBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const hidden = more.style.display === 'none' || more.style.display === '';
      more.style.display = hidden ? 'block' : 'none';
      toggleBtn.textContent = hidden ? 'Скрыть остальных' : 'Показать остальных';
    });
  }

  function initProfileFriendButtons() {
    document.querySelectorAll('.profile-friend-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = parseUserId(btn.getAttribute('data-userid'));
        const action = btn.getAttribute('data-action');
        if (!id || !action) return;

        if (action === 'add') {
          FriendManager.sendRequest(id);
        } else if (action === 'cancel') {
          FriendManager.cancelRequest(id);
        } else if (action === 'remove') {
          FriendManager.removeFriend(id, btn.getAttribute('data-nick') || '');
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initFriendsListToggle();
    initProfileFriendButtons();
  });

  window.FriendManager = FriendManager;
})();
