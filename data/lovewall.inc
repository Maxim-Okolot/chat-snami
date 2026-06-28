<!DOCTYPE html>
<html lang="ru">
<head>
  <script src="/assets/js/site-theme-boot.js"></script>
  <link rel="stylesheet" href="/assets/css/site-theme.css">
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Стена любви — чат «С нами»</title>
  <meta name="description" content="Стена любви — чат С нами: признания, пожелания, валентинки и добрые слова для всех участников!" />
  <link rel="icon" href="/assets/img/favicon.ico" type="image/x-icon" />
  <link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v6.7.2/css/pro.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@700;800&display=swap" rel="stylesheet" />

  <style>
    :root {
      --bg: #070b18;
      --panel: rgba(15, 20, 39, 0.92);
      --border: rgba(255,255,255,0.08);
      --text: #eef2ff;
      --muted: #aab3d4;
      --primary: #7c8cff;
      --accent: #ff5ca8;
      --accent-2: #33d6c8;
      --success: #2be39f;
      --radius-lg: 22px;
      --grad-main: linear-gradient(135deg, #7c8cff 0%, #ff5ca8 55%, #33d6c8 100%);
      --grad-pink: linear-gradient(135deg, #ff5ca8 0%, #9a5cff 100%);
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
      padding: 24px 16px 40px;
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

    .love-brand {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 760px;
      margin: 0 auto 18px;
      text-align: center;
    }

    .love-brand a {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 1.35rem;
      color: #fff;
      text-decoration: none;
      letter-spacing: .3px;
    }

    .love-card {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 760px;
      margin: 0 auto 18px;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow);
      padding: 28px 24px 24px;
      backdrop-filter: blur(14px);
    }

    .love-icon {
      width: 56px;
      height: 56px;
      margin: 0 auto 14px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      background: rgba(255, 92, 168, 0.12);
      border: 1px solid rgba(255, 92, 168, 0.24);
      color: var(--accent);
    }

    .love-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.65rem;
      font-weight: 800;
      text-align: center;
      margin-bottom: 8px;
      line-height: 1.25;
    }

    .love-note {
      text-align: center;
      color: var(--muted);
      font-size: 0.98rem;
      line-height: 1.55;
      margin-bottom: 22px;
    }

    .love-form {
      max-width: 480px;
      margin: 0 auto 24px;
      padding: 18px;
      border-radius: 16px;
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--border);
    }

    .love-form h4 {
      font-family: 'Outfit', sans-serif;
      font-size: 1.05rem;
      font-weight: 700;
      margin-bottom: 14px;
      color: var(--text);
    }

    .field {
      width: 100%;
      margin-bottom: 12px;
      padding: 11px 12px;
      border: 1px solid var(--border);
      border-radius: 10px;
      background: rgba(255,255,255,0.06);
      color: var(--text);
      font: inherit;
      outline: none;
    }

    .field:focus {
      border-color: rgba(124,140,255,0.45);
      box-shadow: 0 0 0 3px rgba(124,140,255,0.14);
    }

    textarea.field {
      resize: vertical;
      min-height: 88px;
      max-height: 180px;
    }

    .field::placeholder {
      color: #8189ad;
    }

    .love-check {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 14px;
      color: var(--muted);
      font-size: 0.92rem;
      cursor: pointer;
    }

    .love-check input {
      width: 16px;
      height: 16px;
      accent-color: var(--primary);
    }

    .btn-love {
      width: 100%;
      padding: 12px 18px;
      border: none;
      border-radius: 12px;
      background: var(--grad-main);
      color: #fff;
      font: 700 0.95rem/1 'Inter', sans-serif;
      cursor: pointer;
      box-shadow: 0 10px 28px rgba(124,140,255,.18);
      transition: transform .2s ease, opacity .2s ease;
    }

    .btn-love:hover {
      transform: translateY(-1px);
      opacity: .96;
    }

    .love-msg-status {
      margin-top: 10px;
      text-align: center;
      color: #f9a8d4;
      font-size: 0.92rem;
      min-height: 1.2em;
    }

    .love-wall-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .love-msg-card {
      padding: 16px 18px;
      border-radius: 16px;
      background: linear-gradient(120deg, rgba(56, 24, 48, .72) 0%, rgba(30, 41, 82, .72) 100%);
      border: 1px solid rgba(255, 92, 168, 0.22);
      box-shadow: 0 2px 12px rgba(0, 0, 0, .18);
      animation: love-card-in .45s ease-out both;
    }

    .love-msg-card:hover {
      border-color: rgba(255, 92, 168, 0.34);
    }

    .love-msg-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 10px;
    }

    .love-avatar {
      flex: 0 0 auto;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--grad-pink);
      color: #fff;
      font-weight: 700;
      font-size: 0.95rem;
      box-shadow: 0 4px 14px rgba(255, 92, 168, 0.22);
    }

    .love-msg {
      flex: 1 1 auto;
      font-size: 1rem;
      line-height: 1.55;
      color: var(--text);
      word-break: break-word;
    }

    .love-heart {
      margin-right: 6px;
    }

    .love-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      font-size: 0.88rem;
      color: var(--muted);
      padding-left: 52px;
    }

    .love-to {
      color: #f9a8d4;
      font-weight: 600;
    }

    .love-from {
      font-style: italic;
    }

    .love-empty {
      text-align: center;
      color: var(--muted);
      padding: 28px 12px;
      border-radius: 14px;
      border: 1px dashed rgba(255,255,255,0.12);
      background: rgba(255,255,255,0.02);
    }

    @keyframes love-card-in {
      from {
        opacity: 0;
        transform: translateY(10px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 640px) {
      .love-card {
        padding: 22px 16px 18px;
      }

      .love-meta {
        padding-left: 0;
      }
    }
  </style>
</head>
<body>
  <div class="love-brand">
    <a href="index.php">Чат «С нами»</a>
  </div>

  <div class="love-card">
      <div class="love-icon" aria-hidden="true"><i class="fas fa-heart"></i></div>
      <h1 class="love-title">Стена любви</h1>
      <p class="love-note">Признания, пожелания и добрые слова для участников чата «С нами»</p>

      <div class="love-form">
        <h4>Оставить признание</h4>
        <form id="loveForm" autocomplete="off">
          <input type="text" class="field" name="to" placeholder="Кому (ник, можно оставить пустым)">
          <textarea class="field" name="msg" placeholder="Ваше признание или пожелание..." required maxlength="200"></textarea>
          <label class="love-check">
            <input type="checkbox" name="anon" id="anonLove" checked>
            <span>Анонимно</span>
          </label>
          <button type="submit" class="btn-love">Отправить</button>
        </form>
        <div id="loveWallMsg" class="love-msg-status"></div>
      </div>

      <div class="love-wall-list" id="love-wall-list"></div>
  </div>

  <script>
    let loveWallData = JSON.parse(localStorage.getItem('loveWallData') || '[]');

    function formatDate(ts) {
      const d = new Date(ts);
      return d.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    function getInitials(name) {
      if (!name) return '♥';
      const parts = name.trim().split(/\s+/);
      if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }

    function escapeHtml(value) {
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function renderLoveWall() {
      const wall = document.getElementById('love-wall-list');
      if (!wall) return;

      if (!loveWallData.length) {
        wall.innerHTML = '<div class="love-empty">Пока нет признаний. Будьте первым!</div>';
        return;
      }

      wall.innerHTML = loveWallData.slice().reverse().map(function (item) {
        const fromName = item.anon ? 'Анонимно' : (item.from || 'неизвестного');
        const initials = item.anon ? '♥' : getInitials(fromName);
        return (
          '<div class="love-msg-card">' +
            '<div class="love-msg-row">' +
              '<span class="love-avatar">' + escapeHtml(initials) + '</span>' +
              '<div class="love-msg"><span class="love-heart">💌</span>' + escapeHtml(item.msg) + '</div>' +
            '</div>' +
            '<div class="love-meta">' +
              '<span>' +
                (item.to ? '<span class="love-to">Для: ' + escapeHtml(item.to) + '</span>' : '') +
                (item.to ? ' · ' : '') +
                '<span class="love-from">' + (item.anon ? 'Анонимно' : ('от ' + escapeHtml(fromName))) + '</span>' +
              '</span>' +
              '<span class="love-date">' + formatDate(item.ts) + '</span>' +
            '</div>' +
          '</div>'
        );
      }).join('');
    }

    document.getElementById('loveForm').onsubmit = function (e) {
      e.preventDefault();
      const msg = this.msg.value.trim();
      const to = this.to.value.trim();
      const anon = this.anon.checked;
      const from = anon ? '' : (typeof mynick !== 'undefined' && mynick ? mynick : '');
      if (!msg) return;

      loveWallData.push({ msg: msg, to: to, anon: anon, from: from, ts: Date.now() });
      localStorage.setItem('loveWallData', JSON.stringify(loveWallData));
      this.msg.value = '';
      this.to.value = '';
      this.anon.checked = true;
      document.getElementById('loveWallMsg').textContent = 'Признание отправлено!';
      renderLoveWall();
      setTimeout(function () {
        document.getElementById('loveWallMsg').textContent = '';
      }, 2000);
    };

    renderLoveWall();
  </script>
</body>
</html>
