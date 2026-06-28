<!DOCTYPE html>
<html lang="ru">
<head>
  <script src="/assets/js/site-theme-boot.js"></script>
  <meta charset="UTF-8">
  <title>Рейтинг пользователей — Чат «С нами»</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#4a90e2">
  <meta name="color-scheme" content="light dark">
  <link rel="icon" href="/assets/img/favicon.ico" type="image/x-icon">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/top100.css">
  <link rel="stylesheet" href="/assets/css/site-theme.css">
  <script src="/index.php?inc=informer&getmsg=1&inchat=1&lastreg=10&counter=1&birthday=1&lasttopics=10&forum=0&randfotos=20&lastmsgs=10"></script>
</head>
<body class="top100-body">
  <div class="top100-brand">
    <a href="index.php">Чат «С нами»</a>
  </div>

  <div class="top100-container">
    <h1 class="top100-title">Рейтинг пользователей</h1>
    <div class="top100-grid-wrap">
      <div class="top100-grid" id="top100-grid"></div>
    </div>
    <div class="top100-nav" id="top100-nav"></div>
  </div>

  <script>
    var onlytitle = ['', 'Участник', 'Время', 'Сообщ.', 'Активн.', 'Просм.', 'Реф.', 'Викторина', 'Пункты'];
    var onlyfield = ['', 'nick', 'onlinetime', 'msg', 'activity', 'views', 'ref', 'gamewins', 'points'];

    function isDarkTheme() {
      return document.documentElement.classList.contains('chat-theme-dark') ||
        (window.SiteTheme && SiteTheme.isEnabled());
    }

    function escapeHtml(value) {
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function cellHtml(content, label, className) {
      var cls = 'top100-cell' + (className ? ' ' + className : '');
      return '<div class="' + cls + '" data-label="' + escapeHtml(label) + '">' + content + '</div>';
    }

    function buildNickCell(user) {
      var nick = user[1];
      var href = '?inc=info&userid=' + encodeURIComponent(user[0]);
      var label = escapeHtml(nick);
      var inner;

      if (isDarkTheme()) {
        inner = '<a href="' + href + '" target="_blank" rel="noopener noreferrer"><span class="top100-nick">' + label + '</span></a>';
      } else {
        inner = '<a href="' + href + '" target="_blank" rel="noopener noreferrer"><span class="top100-nick" style="color:' + escapeHtml(user.color) + '">' + label + '</span></a>';
      }

      return cellHtml(inner, onlytitle[1], 'top100-cell--nick');
    }

    var colCount = only.length + 1;
    var grid = document.getElementById('top100-grid');
    grid.style.setProperty('--top100-cols', colCount);

    var headHtml = cellHtml('№', '№', 'top100-cell--head');
    for (var i = 0; i < only.length; i++) {
      var field = only.charAt(i);
      headHtml += cellHtml('<a href="?inc=top100&only=' + only + '&sort=' + onlyfield[field] + '">' + onlytitle[field] + '</a>', onlytitle[field], 'top100-cell--head');
    }
    grid.innerHTML = '<div class="top100-grid__head">' + headHtml + '</div>';

    for (var num in u) {
      var user = u[num];
      var rowHtml = cellHtml(num + '.', '№');

      for (var j = 0; j < only.length; j++) {
        field = only.charAt(j);

        if (field === '1') {
          rowHtml += buildNickCell(user);
        } else if (field === '2') {
          var hours = Math.floor(user[2] / 60);
          var mins = user[2] % 60;
          rowHtml += cellHtml(hours + ' ч. ' + mins + ' мин.', onlytitle[2]);
        } else if (field === '4') {
          var activity = Math.round(user[4] * 30);
          rowHtml += cellHtml(String(activity), onlytitle[4]);
        } else {
          rowHtml += cellHtml(escapeHtml(user[field]), onlytitle[field]);
        }
      }

      var row = document.createElement('div');
      row.className = 'top100-grid__row';
      row.innerHTML = rowHtml;
      grid.appendChild(row);
    }

    var count = Object.keys(u).length;
    var prev = '<b>&laquo; Назад</b>';
    if (s > 0) {
      prev = '<a href="?inc=top100&only=' + only + '&sort=' + sort + '&limit=' + limit + '&s=' + (s * 1 - 1) + '">' + prev + '</a>';
    }

    var next = '<b>Далее &raquo;</b>';
    if (count >= limit) {
      next = '<a href="?inc=top100&only=' + only + '&sort=' + sort + '&limit=' + limit + '&s=' + (s * 1 + 1) + '">' + next + '</a>';
    }

    document.getElementById('top100-nav').innerHTML = prev + ' <b>' + (s * 1 + 1) + '</b> ' + next;
  </script>
</body>
</html>
