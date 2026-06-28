<script>
  var grund = '';
  var act = '';
  var timeout = '';
  var nick = '';
</script>
<!DOCTYPE html>
<html lang="ru">
<head>
  <script src="/assets/js/site-theme-boot.js"></script>
  <link rel="stylesheet" href="/assets/css/site-theme.css">
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Выход — Чат «С нами»</title>
  <link rel="icon" href="/assets/img/favicon.ico" type="image/x-icon" />
  <link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v6.7.2/css/pro.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@700;800&display=swap" rel="stylesheet" />

  <style>
    :root {
      --bg: #070b18;
      --panel: rgba(15, 20, 39, 0.88);
      --border: rgba(255,255,255,0.08);
      --text: #eef2ff;
      --muted: #aab3d4;
      --primary: #7c8cff;
      --accent: #ff5ca8;
      --accent-2: #33d6c8;
      --danger: #ff6b7a;
      --warning: #ffcb66;
      --success: #2be39f;
      --radius-lg: 22px;
      --grad-main: linear-gradient(135deg, #7c8cff 0%, #ff5ca8 55%, #33d6c8 100%);
      --shadow: 0 18px 45px rgba(0,0,0,.28);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      color: var(--text);
      background:
        radial-gradient(circle at top left, rgba(124,140,255,.15), transparent 28%),
        radial-gradient(circle at top right, rgba(255,92,168,.14), transparent 24%),
        radial-gradient(circle at bottom left, rgba(51,214,200,.10), transparent 28%),
        linear-gradient(180deg, #090d1b 0%, #0b1020 45%, #070b18 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
    }

    body::before {
      content: "";
      position: fixed;
      inset: 0;
      background:
        linear-gradient(120deg, rgba(255,255,255,.03) 0%, transparent 40%),
        radial-gradient(circle at 50% 0%, rgba(124,140,255,.10), transparent 35%);
      pointer-events: none;
    }

    .exit-shell {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 520px;
    }

    .exit-brand {
      text-align: center;
      margin-bottom: 18px;
    }

    .exit-brand a {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 1.35rem;
      color: #fff;
      text-decoration: none;
      letter-spacing: .3px;
    }

    .exit-card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow);
      padding: 32px 28px;
      text-align: center;
      backdrop-filter: blur(14px);
    }

    .exit-icon {
      width: 72px;
      height: 72px;
      margin: 0 auto 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      background: rgba(124,140,255,.12);
      border: 1px solid rgba(124,140,255,.22);
      color: var(--primary);
    }

    .exit-icon--danger {
      background: rgba(255,107,122,.12);
      border-color: rgba(255,107,122,.28);
      color: var(--danger);
    }

    .exit-icon--success {
      background: rgba(43,227,159,.12);
      border-color: rgba(43,227,159,.28);
      color: var(--success);
    }

    .exit-icon--warning {
      background: rgba(255,203,102,.12);
      border-color: rgba(255,203,102,.28);
      color: var(--warning);
    }

    .exit-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.65rem;
      font-weight: 800;
      margin-bottom: 10px;
      line-height: 1.25;
    }

    .exit-message {
      color: var(--muted);
      font-size: 0.98rem;
      line-height: 1.65;
      margin-bottom: 22px;
    }

    .exit-message strong {
      color: var(--text);
      font-weight: 700;
    }

    .exit-reason {
      margin-top: 10px;
      padding: 10px 14px;
      border-radius: 12px;
      background: rgba(255,255,255,.04);
      border: 1px solid rgba(255,255,255,.06);
      color: #d5dcf7;
      font-size: 0.92rem;
    }

    .exit-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
    }

    .btn-exit {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-width: 180px;
      padding: 12px 18px;
      border: none;
      border-radius: 14px;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      transition: transform .2s ease, opacity .2s ease, box-shadow .2s ease;
    }

    .btn-exit:hover {
      transform: translateY(-1px);
      opacity: .96;
    }

    .btn-exit--primary {
      background: var(--grad-main);
      color: #fff;
      box-shadow: 0 10px 28px rgba(124,140,255,.22);
    }

    .btn-exit--soft {
      background: rgba(255,255,255,.06);
      color: var(--text);
      border: 1px solid rgba(255,255,255,.10);
    }

    .btn-exit--soft:hover {
      background: rgba(124,140,255,.12);
      border-color: rgba(124,140,255,.22);
    }

    @media (max-width: 480px) {
      .exit-card {
        padding: 26px 20px;
      }

      .exit-actions {
        flex-direction: column;
      }

      .btn-exit {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="exit-shell">
    <div class="exit-brand">
      <a href="index.php">Чат «С нами»</a>
    </div>

    <div class="exit-card" id="exit-card">
      <div class="exit-icon exit-icon--success" id="exit-icon">
        <i class="fas fa-door-open"></i>
      </div>
      <h1 class="exit-title" id="exit-title">До скорой встречи!</h1>
      <div class="exit-message" id="exit-message"></div>
      <div class="exit-actions" id="exit-actions"></div>
    </div>
  </div>

  <script>
    (function () {
      var params = new URLSearchParams(location.search);

      function readValue(name) {
        var fromWindow = window[name];
        if (fromWindow !== undefined && fromWindow !== null && fromWindow !== '') {
          return String(fromWindow);
        }
        return params.get(name) || '';
      }

      var nickVal = readValue('nick') || readValue('mynick');
      var actVal = readValue('act');
      var timeoutVal = readValue('timeout');
      var grundVal = readValue('grund');

      if (grundVal === 'нет') grundVal = '';

      var iconEl = document.getElementById('exit-icon');
      var titleEl = document.getElementById('exit-title');
      var messageEl = document.getElementById('exit-message');
      var actionsEl = document.getElementById('exit-actions');

      function escapeHtml(value) {
        return String(value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      }

      function formatTimeout(value) {
        var num = Number(value);
        if (!value && value !== 0) return '';
        if (num === 1440) return 'на день';
        if (num === 10080) return 'на неделю';
        if (num === 302400 || num === 43200) return 'на месяц';
        if (num > 1000000) return 'навсегда';
        if (num > 0 && num < 61) return 'на ' + num + ' минут';
        return String(value);
      }

      function setIcon(type, iconClass) {
        iconEl.className = 'exit-icon exit-icon--' + type;
        iconEl.innerHTML = '<i class="fas ' + iconClass + '"></i>';
      }

      function addRulesLink() {
        actionsEl.innerHTML +=
          '<a class="btn-exit btn-exit--soft" href="index.php?inc=prav">' +
          '<i class="fas fa-book"></i> Правила чата</a>';
      }

      function addHomeButton(label) {
        actionsEl.innerHTML =
          '<a class="btn-exit btn-exit--primary" href="index.php">' +
          '<i class="fas fa-comments"></i> ' + escapeHtml(label || 'Вернуться в чат') + '</a>' +
          actionsEl.innerHTML;
      }

      if (actVal === 'kill') {
        var banDuration = formatTimeout(timeoutVal);
        setIcon('danger', 'fa-ban');
        titleEl.textContent = 'Доступ ограничен';
        messageEl.innerHTML =
          'Вы удалены <strong>' + escapeHtml(banDuration) + '</strong> и сможете вернуться в чат только после отмены бана администратором.';
        if (grundVal) {
          messageEl.innerHTML += '<div class="exit-reason">Причина: ' + escapeHtml(grundVal) + '</div>';
        }
        addRulesLink();
        addHomeButton('На главную');
        return;
      }

      if (actVal === 'window') {
        setIcon('warning', 'fa-window-restore');
        titleEl.textContent = 'Нарушение правил';
        messageEl.innerHTML = 'Вы провинились и поэтому будете закиданы окнами.';
        if (grundVal) {
          messageEl.innerHTML += '<div class="exit-reason">Причина: ' + escapeHtml(grundVal) + '</div>';
        }
        addRulesLink();
        window.setTimeout(function () {
          window.open('http://mpchat.com/chat/index/window.html');
        }, 500);
        return;
      }

      if (actVal === 'prav') {
        setIcon('warning', 'fa-triangle-exclamation');
        titleEl.textContent = 'Предупреждение';
        messageEl.innerHTML = 'Вас выпнули из чата. Ведите себя прилично!';
        if (grundVal) {
          messageEl.innerHTML += '<div class="exit-reason">Причина: ' + escapeHtml(grundVal) + '</div>';
        }
        addRulesLink();
        addHomeButton('Вернуться в чат');
        return;
      }

      if (nickVal) {
        setIcon('success', 'fa-heart');
        titleEl.textContent = 'Пока, ' + nickVal + '!';
        messageEl.textContent = 'Спасибо, что были с нами. Приходите ещё — мы всегда рады!';
      } else {
        setIcon('success', 'fa-door-open');
        titleEl.textContent = 'Вы вышли из чата';
        messageEl.textContent = 'Сессия завершена. Будем рады видеть вас снова!';
      }

      addHomeButton('Вернуться в чат');
    })();
  </script>
</body>
</html>
