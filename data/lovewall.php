<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <title>Стена любви — чат "С нами"</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Стена любви — чат С нами: признания, пожелания, валентинки и добрые слова для всех участников!">
  <link href="https://fonts.googleapis.com/css2?family=Pattaya&family=Spectral:wght@400;700&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      min-height: 100vh;
      background: url('https://snami.mpchat.com/img/titul_bg.jpg') no-repeat center center fixed;
      background-size: cover;
      font-family: 'Spectral', 'Segoe UI', Arial, sans-serif;
      color: #222;
      margin: 0;
      padding: 0;
    }
    .love-wall-container {
      max-width: 700px;
      margin: 60px auto 30px auto;
      background: rgba(255,255,255,0.97);
      border-radius: 24px;
      box-shadow: 0 8px 32px 0 rgba(31,38,135,0.13);
      padding: 2.2rem 1.2rem 1.2rem 1.2rem;
      border: 1px solid #e0e0e0;
      position: relative;
    }
    .love-wall-title {
      font-family: 'Pattaya', cursive, Arial, sans-serif;
      color: #d46a8c;
      font-size: 2.1rem;
      text-align: center;
      margin-bottom: 1.2em;
      letter-spacing: 2px;
      text-shadow: 0 2px 12px #fff7;
    }
    .love-wall-form {
      background: #fff6fa;
      border-radius: 16px;
      box-shadow: 0 2px 12px #fda08533;
      padding: 1.2em 1em 0.7em 1em;
      margin-bottom: 2em;
      max-width: 420px;
      margin-left: auto;
      margin-right: auto;
      animation: fadeInDown 1.1s;
    }
    .love-wall-form h4 {
      color: #b07d7d;
      font-family: 'Pattaya', Arial, sans-serif;
      margin-bottom: 1em;
    }
    .love-wall-form textarea {
      resize: vertical;
      min-height: 60px;
      max-height: 180px;
    }
    .love-wall-form .btn {
      background: linear-gradient(90deg,#f6d365 0%,#fda085 100%);
      color: #fff;
      font-family: 'Pattaya', Arial, sans-serif;
      font-size: 1.15rem;
      border: none;
      border-radius: 12px;
      padding: 10px 24px;
      margin-top: 10px;
      box-shadow: 0 2px 6px rgba(176,125,125,0.13);
      transition: background 0.2s, box-shadow 0.2s;
    }
    .love-wall-form .btn:hover {
      background: linear-gradient(90deg,#fda085 0%,#f6d365 100%);
      box-shadow: 0 4px 16px rgba(176,125,125,0.23);
    }
    .love-wall-list {
      margin: 0 auto;
      max-width: 540px;
      min-height: 60px;
      margin-bottom: 1.2em;
    }
    .love-msg-card {
      background: #fff0f7;
      border-radius: 14px;
      padding: 13px 18px 10px 18px;
      margin-bottom: 15px;
      box-shadow: 0 1px 8px #fda08522;
      position: relative;
      animation: fadeInUp 0.7s;
      border-left: 5px solid #fda085;
    }
    .love-msg-card .love-msg {
      font-size: 1.13em;
      color: #d46a8c;
      font-family: 'Spectral', serif;
      margin-bottom: 4px;
      word-break: break-word;
    }
    .love-msg-card .love-meta {
      font-size: 0.97em;
      color: #b07d7d;
      margin-top: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
    .love-msg-card .love-to {
      font-weight: bold;
      color: #b07d7d;
    }
    .love-msg-card .love-from {
      font-style: italic;
      color: #b07d7d;
      font-size: 0.95em;
    }
    .love-msg-card .love-date {
      font-size: 0.93em;
      color: #b07d7d;
      opacity: 0.7;
      margin-left: 8px;
    }
    .love-msg-card .love-heart {
      color: #fda085;
      font-size: 1.2em;
      margin-right: 7px;
      vertical-align: middle;
    }
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-40px);}
      to { opacity: 1; transform: translateY(0);}
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(40px);}
      to { opacity: 1; transform: translateY(0);}
    }
    @media (max-width: 700px) {
      .love-wall-container { max-width: 99vw; padding: 1.1rem 0.2rem;}
      .love-wall-title { font-size: 1.3rem;}
      .love-wall-form { max-width: 99vw; }
      .love-wall-list { max-width: 99vw; }
    }
  </style>
</head>
<body>
  <div class="love-wall-container">
    <div class="love-wall-title">💖 Стена любви чата "С нами"</div>
    <div class="love-wall-form">
      <h4>Оставить признание</h4>
      <form id="loveForm" autocomplete="off">
        <input type="text" class="form-control mb-2" name="to" placeholder="Кому (ник, можно оставить пустым)">
        <textarea class="form-control mb-2" name="msg" placeholder="Ваше признание или пожелание..." required maxlength="200"></textarea>
        <div class="form-check mb-2">
          <input class="form-check-input" type="checkbox" name="anon" id="anonLove" checked>
          <label class="form-check-label" for="anonLove">Анонимно</label>
        </div>
        <button type="submit" class="btn w-100">Отправить</button>
      </form>
      <div id="loveWallMsg" style="margin-top:10px;color:#b07d7d"></div>
    </div>
    <div class="love-wall-list" id="love-wall-list">
      <!-- Здесь будут признания -->
    </div>
  </div>

  <script>
    // Локальное хранилище (для теста/демо)
    let loveWallData = JSON.parse(localStorage.getItem('loveWallData') || '[]');

    function formatDate(ts) {
      const d = new Date(ts);
      return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
    }

    function renderLoveWall() {
      const wall = document.getElementById('love-wall-list');
      if (!wall) return;
      wall.innerHTML = loveWallData.length ? loveWallData.slice().reverse().map(item => `
        <div class="love-msg-card">
          <div class="love-msg"><span class="love-heart">💌</span>${item.msg.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</div>
          <div class="love-meta">
            <span>
              ${item.to ? `<span class="love-to">Для: ${item.to}</span>` : ""}
              ${item.to && item.from ? " | " : ""}
              <span class="love-from">${item.anon ? "Анонимно" : ("от " + item.from)}</span>
            </span>
            <span class="love-date">${formatDate(item.ts)}</span>
          </div>
        </div>
      `).join('') : '<div style="color:#b07d7d;text-align:center;">Пока нет признаний. Будь первым!</div>';
    }

    document.getElementById('loveForm').onsubmit = function(e) {
      e.preventDefault();
      const msg = this.msg.value.trim();
      const to = this.to.value.trim();
      const anon = this.anon.checked;
      // Получить ник из глобальной переменной чата, если есть
      let from = anon ? "" : (typeof mynick !== "undefined" && mynick ? mynick : "Гость");
      if (!msg) return;
      loveWallData.push({msg, to, anon, from, ts: Date.now()});
      localStorage.setItem('loveWallData', JSON.stringify(loveWallData));
      this.msg.value = "";
      this.to.value = "";
      this.anon.checked = true;
      document.getElementById('loveWallMsg').innerHTML = "❤️ Признание отправлено!";
      renderLoveWall();
      setTimeout(()=>{document.getElementById('loveWallMsg').innerHTML=""},2000);
    };

    renderLoveWall();
  </script>
</body>
</html>