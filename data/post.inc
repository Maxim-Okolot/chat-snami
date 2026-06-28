<!DOCTYPE html>
<html lang="ru">
<head>
  <script src="/assets/js/site-theme-boot.js"></script>
  <meta charset="UTF-8">
  <title>Личная почта — Чат «С нами»</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#4a90e2">
  <meta name="color-scheme" content="light dark">
  <link rel="icon" href="/assets/img/favicon.ico" type="image/x-icon">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/post.css">
  <link rel="stylesheet" href="/assets/css/site-theme.css">
</head>
<body class="post-body">
  <div class="post-brand">
    <a href="index.php">Чат «С нами»</a>
  </div>

  <div class="mail-container">
    <h1 class="mail-title">Личная почта</h1>
    <div class="mail-nav">
      <a href="#" id="write-btn">Написать</a>
      <a href="?inc=post&userid=%userid%&id=%id%&limit=%limit%" id="inbox-link">Входящие (<span id="inbox-count"></span>)</a>
      <a href="?inc=post&userid=%userid%&id=%id%&limit=%limit%&out=1" id="outbox-link">Исходящие</a>
      <a href="#" onclick="window.close();return false;">Закрыть</a>
    </div>
    <div class="mail-status" id="mail-status"></div>
    <form id="sendform" class="mail-form" action="?inc=post&userid=%userid%&id=%id%&limit=%limit%" method="post" enctype="multipart/form-data">
      <div class="mail-form-row mail-form-inline">
        <div class="mail-form-field">
          <label for="tonick">Кому</label>
          <input type="text" id="tonick" name="tonick" class="text" value="">
        </div>
        <div class="mail-form-field">
          <label for="subject">Тема</label>
          <input type="text" id="subject" name="subject" class="text" maxlength="100">
        </div>
      </div>
      <div class="mail-form-row">
        <label for="mail-text">Сообщение</label>
        <textarea id="mail-text" cols="52" rows="8" name="text" class="area" placeholder="Введите текст сообщения..."></textarea>
      </div>
      <div class="mail-form-row">
        <label>Изображение</label>
        <input name="file" type="file" class="text" size="3">
        <span class="mail-form-label">.gif / .jpg / .png / .bmp (до 200 кб)</span>
      </div>
      <div class="mail-form-actions">
        <input type="submit" name="send" class="ok" value="Отправить сообщение">
      </div>
    </form>
    <div id="mail-table-wrap" class="mail-table-wrap"></div>
    <div id="mail-nav-bottom" class="post-nav"></div>
  </div>
<script>
/* Статусы */
if (err == 1) document.getElementById('mail-status').innerHTML = "<span class='mail-status-err'>Данный участник не зарегистрирован!</span>";
if (err == 2) document.getElementById('mail-status').innerHTML = "<span class='mail-status-err'>Вы не можете отправлять почту, Ваш ящик переполнен — удалите входящие!</span>";
if (err == 3) document.getElementById('mail-status').innerHTML = "<span class='mail-status-err'>Вы недавно писали этому пользователю, попробуйте немного позже!</span>";
if (err == 4) document.getElementById('mail-status').innerHTML = "<span class='mail-status-err'>Файл не отправлен, слишком велик или неверный формат!</span>";
if (ok == 1) document.getElementById('mail-status').innerHTML = "<span class='mail-status-ok'>Сообщение удачно отправлено!</span>";
if (ok == 2) document.getElementById('mail-status').innerHTML = "<span class='mail-status-ok'>Сообщение и файл удачно отправлены!</span>";
if (ok == 3) document.getElementById('mail-status').innerHTML = "<span class='mail-status-ok'>Выбранные сообщения удалены!</span>";
if (ok == 4) document.getElementById('mail-status').innerHTML = "<span class='mail-status-ok'>Статус выбранных сообщений изменён!</span>";

/* Кнопка "Написать" */
document.getElementById('write-btn').onclick = function (e) {
  e.preventDefault();
  document.getElementById('sendform').classList.toggle('is-open');
};

/* Открытие формы с заполнением */
function openform(tonick, subject) {
  var form = document.getElementById('sendform');
  document.getElementById('tonick').value = tonick;
  document.getElementById('subject').value = subject;
  form.classList.add('is-open');
}
if (tonick || subject) openform(tonick, subject);

function mailStatusBadge(x) {
  if (x[6] == 0) return "<b class='mail-badge mail-badge--new' title='новое'>&raquo;</b>";
  if (x[6] == 2) return "<b class='mail-badge mail-badge--important' title='важное'>!!!</b>";
  return '&nbsp;';
}

/* Входящие/исходящие/чтение писем */
var msgtype = (out == 1) ? 'Исходящие' : 'Входящие';
document.getElementById('inbox-count').innerHTML = newpost > 0
  ? "<span class='mail-new-count'>" + newpost + '</span>'
  : newpost;

/* Фильтр писем */
var filterForm = "<form action='' method='get' class='mail-filter'><input type='hidden' name='inc' value='post'><input type='hidden' name='userid' value='%userid%'><input type='hidden' name='id' value='%id%'><input type='hidden' name='limit' value='%limit%'><input type='hidden' name='out' value='" + out + "'><span class='mail-filter-title'>" + msgtype + "</span><input type='text' name='filter' size='30' maxlength='50' class='text' placeholder='Поиск...'><input type='submit' value='Найти' class='ok'></form>";
document.getElementById('mail-table-wrap').innerHTML = filterForm;

/* Вывод писем */
if (!msgs.length) {
  document.getElementById('mail-table-wrap').innerHTML += "<div class='mail-empty'>Писем не найдено!</div>";
} else {
  var wr = '';
  /* Чтение письма */
  if (read > 0) {
    var x = msgs[0];
    var status = mailStatusBadge(x);
    var actions = '';
    if (out == 0) {
      actions = "<div class='mail-message-actions'><a href=# onclick='openform(\"" + x[3] + "\",\"Re: " + x[7].replace(/"/g, '\\"') + "\");return false;' class='mail-btn'>Ответить</a> <a href=?inc=post&userid=%userid%&id=%id%&limit=%limit%&del[]=" + x[0] + " class='mail-btn'>Удалить</a></div>";
    }
    wr += "<table class='mail-table'><tr><th>&nbsp;</th><th>Тема сообщения</th><th>Отправитель</th><th>Дата сообщения</th><th>&nbsp;</th></tr>";
    wr += "<tr><td>" + status + "</td><td class='text-left'><a href=?inc=post&userid=%userid%&id=%id%&limit=%limit%&out=" + out + '&read=' + x[0] + '>' + x[7] + "</a></td><td><a href=?inc=info&userid=" + x[2] + " target=_blank><font color=" + x[4] + "><b>" + x[3] + "</b></font></a></td><td>" + x[5] + "</td><td>&nbsp;</td></tr>";
    wr += "<tr class='mail-message-body'><td colspan=5><div class='mail-message-content'>" + x[8] + actions + "</div></td></tr>";
    wr += "</table><div class='mail-back'><a href=# onclick='history.back(); return false;' class='mail-btn'>Вернуться назад</a></div>";
    document.getElementById('mail-table-wrap').innerHTML += wr;
  }
  /* Входящие */
  else if (out == 0) {
    wr += "<form id='form' action='' method='post'><table class='mail-table'><tr><th>&nbsp;</th><th>Тема сообщения</th><th>Отправитель</th><th>Дата сообщения</th><th><input type=checkbox onclick='var a=document.getElementsByName(\"del[]\"); for(var i=0;i<a.length;i++) a[i].checked=this.checked;' title='выбрать все'></th></tr>";
    for (i = 0; i < msgs.length; i++) {
      var x = msgs[i];
      var status = mailStatusBadge(x);
      wr += "<tr><td>" + status + "</td><td class='text-left'><a href=?inc=post&userid=%userid%&id=%id%&limit=%limit%&out=" + out + '&read=' + x[0] + '>' + x[7] + "</a></td><td><a href=?inc=info&userid=" + x[2] + " target=_blank><font color=" + x[4] + "><b>" + x[3] + "</b></font></a></td><td>" + x[5] + "</td><td><input type=checkbox name='del[]' value='" + x[0] + "'></td></tr>";
    }
    wr += "</table><div class='mail-toolbar'><select name=setas onchange='document.getElementById(\"form\").submit();' class='text'><option value=''>Отметить выбранные как:<option value=2>- важные<option value=1>- прочитанные<option value=0>- непрочитанные</select> <input type=submit value='Удалить выбранные' class='ok'></div></form>";
    document.getElementById('mail-table-wrap').innerHTML += wr;
  }
  /* Исходящие */
  else if (out == 1) {
    wr += "<form id='form' action='' method='post'><table class='mail-table'><tr><th>&nbsp;</th><th>Тема сообщения</th><th>Получатель</th><th>Дата сообщения</th><th>&nbsp;</th></tr>";
    for (i = 0; i < msgs.length; i++) {
      var x = msgs[i];
      var status = mailStatusBadge(x);
      wr += "<tr><td>" + status + "</td><td class='text-left'><a href=?inc=post&userid=%userid%&id=%id%&limit=%limit%&out=" + out + '&read=' + x[0] + '>' + x[7] + "</a></td><td><a href=?inc=info&userid=" + x[2] + " target=_blank><font color=" + x[4] + "><b>" + x[3] + "</b></font></a></td><td>" + x[5] + "</td><td>&nbsp;</td></tr>";
      if (x[8]) wr += "<tr class='mail-message-preview'><td colspan=5><div class='mail-message-content'>" + x[8] + "</div></td></tr>";
    }
    wr += "</table></form>";
    document.getElementById('mail-table-wrap').innerHTML += wr;
  }

  /* Навигация */
  var count = msgs.length;
  var prev = '<b>&laquo; Назад</b>';
  if (s > 0) prev = '<a href=?inc=post&userid=%userid%&id=%id%&out=' + out + '&s=' + (s * 1 - 1) + '>' + prev + '</a>';
  var next = '<b>Далее &raquo;</b>';
  if (count >= limit) next = '<a href=?inc=post&userid=%userid%&id=%id%&out=' + out + '&s=' + (s * 1 + 1) + '>' + next + '</a>';
  document.getElementById('mail-nav-bottom').innerHTML = prev + ' <b>[' + (s * 1 + 1) + ']</b> ' + next;
}

/* Время загрузки */
document.getElementById('mail-nav-bottom').innerHTML += "<div class='mail-loadtime'>Загружено за: " + loadtime + '</div>';
</script>
</body>
</html>
