<!DOCTYPE html>
<html lang="ru">
<head>
  <script src="/assets/js/site-theme-boot.js"></script>
  <meta charset="utf-8">
  <title>Настройки — Чат «С нами»</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#4a90e2">
  <meta name="color-scheme" content="light dark">
  <link rel="icon" href="/assets/img/favicon.ico" type="image/x-icon">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/set.css">
  <link rel="stylesheet" href="/assets/css/site-theme.css">
</head>
<body class="set-body">
  <div class="set-brand">
    <a href="index.php">Чат «С нами»</a>
  </div>

  <div class="set-container">
    <h1 class="set-title">Настройки</h1>
    <div class="set-status" id="set-status">
<script>
if (saveok != '') {
  var print = '';
  if (saveok == 0) print = '<span class="set-msg set-msg--error">Сохранение данных невозможно!</span><br>';
  if (saveok > 0) print = '<span class="set-msg set-msg--success">Данные успешно сохранены!</span><br>';
  if (saveok > 1) print += '<span class="set-msg set-msg--error">Файл не загружен — слишком велик или неправильный формат!</span><br>';
  if (setpass == '0') print += '<span class="set-msg set-msg--error">Пароль не изменён.<br>(неправильно введён или пользователь незарег.)</span><br>';
  if (setpass == '1') print += '<span class="set-msg set-msg--success">Пароль изменён. Перезайдите в чат!</span><br>';
  if (setsubscribe == '1') print += '<span class="set-msg set-msg--info">Проверьте почту и подтвердите подписку на рассылку!</span><br>';
  print = print + '<a href="javascript:window.close();" class="set-close">закрыть</a><br><br>';
  document.write(print);
}
</script>
    </div>

    <form action="" method="post" enctype="multipart/form-data" name="set" onsubmit="document.set.submit.value='Подождите ...';document.set.submit.disabled=true;">
      <input type="hidden" name="save" value="ok">
      <input type="hidden" name="id" value="%id%">
      <input type="hidden" name="adminsess" value="%adminsess%">
      <table>
        <tr><td>Имя</td><td>
          <input type="text" name="name" maxlength="20" class="text" value="%name%">
        </td></tr>
        <tr><td>День рожд.</td><td>
<script>
var print = '<select name=day class=text><option value="">--</option>';
var sel = '';
for (i = 1; i < 32; i++) {
  if (i < 10) i0 = '0' + i; else i0 = i;
  if ('%day%' == i) sel = 'selected'; else sel = '';
  print += '<option value=' + i + ' ' + sel + '>' + i0 + '</option>';
}
print += '</select> . <select name=month class=text><option value="">--</option>';
for (i = 1; i < 13; i++) {
  if (i < 10) i0 = '0' + i; else i0 = i;
  if ('%month%' == i) sel = 'selected'; else sel = '';
  print += '<option value=' + i + ' ' + sel + '>' + i0 + '</option>';
}
print += '</select> . <select name=year class=text><option value="">----</option>';
for (i = 1951; i < 2000; i++) {
  if ('%year%' == i) sel = 'selected'; else sel = '';
  print += '<option value=' + i + ' ' + sel + '>' + i + '</option>';
}
print += '</select>';
document.write(print);
</script>
        </td></tr>
        <tr><td>Пол</td><td>
<script>
if ('%mw%' == 1) sel = 'selected'; else sel = '';
print = '<select name=mw class=text>';
print += '<option value=0>мужской</option>';
print += '<option value=1 ' + sel + '>женский</option>';
print += '</select>';
document.write(print);
</script>
        </td></tr>
        <tr><td>Страна</td><td>
          <input type="text" name="land" maxlength="20" class="text" value="%land%">
        </td></tr>
        <tr><td>Город</td><td>
          <input type="text" name="home" class="text" value="%home%">
        </td></tr>
        <tr><td>Email</td><td>
          <input type="text" name="email" class="text" value="%email%"><br>
          (при смене укажите старый пароль)<br>
<script>
if ('%emailview%' == 1) sel = 'checked'; else sel = '';
print = '<label><input type=checkbox name=emailview ' + sel + '> — отображать в анкете</label><br>';
document.write(print);
if ('%subscribe%' == 1) sel = 'checked'; else sel = '';
print = '<label><input type=checkbox name=subscribe ' + sel + '> — подписаться на рассылку</label>';
document.write(print);
</script>
        </td></tr>
        <tr><td>О себе</td><td>
          <textarea rows="3" cols="30" wrap="auto" name="about" class="area">%about%</textarea>
        </td></tr>
<script>
if (icon_on == 1) {
  var icon = '%icon%';
  print = '<tr><td>Иконка</td><td><input name=icon class=text> — <a href=index.php?inc=icon target=_blank>выбрать номер</a><br>';
  if (icon != '') print += '<img src=' + icon + '>';
  print += '</td></tr>';
  document.write(print);
}
if (icon_on > 1) {
  var icon = '%icon%';
  if (icon_on == 100) maxsize = '128x32'; else maxsize = icon_on + 'x' + icon_on;
  print = '<tr><td>Иконка (max ' + maxsize + ')</td><td><input name=icon type=file class=text><br>';
  if (icon != '') print += '<img src=' + icon + '><br><label><input name=icondel type=checkbox> — удалить</label><br>';
  print += '</td></tr>';
  document.write(print);
}
var foto = '%foto%';
print = '<tr><td>Фотография</td><td><input name=foto type=file class=text><br>';
if (foto != '-') print += '<a href=' + foto + ' target=_blank title="Посмотреть в полном размере"><img src=' + foto + ' width=150 border=0></a><br><label><input name=fotodel type=checkbox> — удалить</label>';
print += '</td></tr>';
document.write(print);
if (avator_on == 1) {
  var avator = '%avator%';
  print = '<tr><td>Аватар на форуме</td><td><input name=avator type=file class=text><br>';
  if (avator) print += '<img src=' + avator + '><br><label><input name=avatordel type=checkbox> — удалить</label>';
  print += '</td></tr>';
  document.write(print);
}
if (signature_on == 1) {
  print = '<tr><td>Подпись на форуме</td><td><input name=signature type=text maxlength=100 class=text value=\'%signature%\'></td></tr>';
  document.write(print);
}
</script>
        <tr><td name="colortable">Настройка<br>ника и фразы</td><td>
<script>
var print = '';
var CHAT_FONT_SIZE_PX = {1: 10, 2: 13, 3: 16, 4: 18, 5: 24, 6: 32, 7: 48};
function chatFsLabel(n) { return CHAT_FONT_SIZE_PX[n] + 'px'; }
function chatFsStyle(n) { return ' style="font-size:' + CHAT_FONT_SIZE_PX[n] + 'px"'; }
function setall() {
  if (document.set.fontsize1)
    size1 = chatFsStyle(document.set.fontsize1.value); else size1 = '';
  if (document.set.colornick)
    color1 = ' color=' + document.set.colornick.value; else color1 = '';
  if (document.set.fontface1)
    face1 = " face='" + jsfonts[document.set.fontface1.value] + "'"; else face1 = '';
  if (document.set.fontsize2)
    size2 = chatFsStyle(document.set.fontsize2.value); else size2 = '';
  if (document.set.color)
    color2 = ' color=' + document.set.color.value; else color2 = '';
  if (document.set.fontface2)
    face2 = " face='" + jsfonts[document.set.fontface2.value] + "'"; else face2 = '';
  out1 = "<a href=# onclick='return false;'><font" + color1 + face1 + size1 + "><b>%nick%</b></font></a>";
  out2 = "<font" + color2 + face2 + size2 + ">мой текст в чате</font>";
  document.getElementById('setform').innerHTML = out1 + ' ' + out2;
}
print = '<input onchange="setall();" type=color name=colornick size=6 maxlength=6 class=text value=#%nickcolor%> ';
document.write(print);
if (fontsize_on == 1) {
  print = '<select name=fontsize1 class=text onchange=setall()>';
  for (i = 1; i < 8; i++) if ('%fontsize1%' == i) print += '<option value=' + i + ' selected>' + chatFsLabel(i); else print += '<option value=' + i + '>' + chatFsLabel(i);
  print += '</select> ';
  document.write(print);
}
if (fontface_on == 1) {
  print = '<select name=fontface1 class=text onchange=setall()>';
  for (i = 0; i < jsfonts.length; i++) if ('%fontface1%' == jsfonts[i]) print += '<option value=' + i + ' selected>' + jsfonts[i]; else print += '<option value=' + i + '>' + jsfonts[i];
  print += '</select> ';
  document.write(print);
}
document.write('<br>');
print = '<input onchange="setall();" type=color name=color size=6 maxlength=6 class=text value=#%color%> ';
document.write(print);
if (fontsize_on == 1) {
  print = '<select name=fontsize2 class=text onchange=setall()>';
  for (i = 2; i < 6; i++) if ('%fontsize2%' == i) print += '<option value=' + i + ' selected>' + chatFsLabel(i); else print += '<option value=' + i + '>' + chatFsLabel(i);
  print += '</select> ';
  document.write(print);
}
if (fontface_on == 1) {
  print = '<select name=fontface2 class=text onchange=setall()>';
  for (i = 0; i < jsfonts.length; i++) if ('%fontface2%' == jsfonts[i]) print += '<option value=' + i + ' selected>' + jsfonts[i]; else print += '<option value=' + i + '>' + jsfonts[i];
  print += '</select> ';
  document.write(print);
}
</script>
          <div id="setform" class="set-preview"></div>
<script>setall();</script>
        </td></tr>
        <tr><td>Музыка</td><td><input name="field1" class="text" value="%field1%"></td></tr>
        <tr><td>Изменить пароль</td><td>
          <input type="password" name="altpass" class="text" placeholder="текущий пароль"><br>
          <input type="password" name="newpass" class="text" placeholder="новый пароль"><br>
          <label><input type="checkbox" name="delaccount" onclick="if(this.checked) return confirm('Для удаления необходимо ввести текущий пароль. Вы уверены что хотите удалить свой аккаунт полностью? ');"> — полностью удалить свой аккаунт</label><br>
        </td></tr>
        <tr><td>Моё время</td><td><script>
var print = '<select name=field6 class=text>';
var sel = '';
for (i = -23; i < 24; i++) {
  if ('%field6%' == i) sel = 'selected'; else sel = '';
  print += '<option value=' + i + ' ' + sel + '>' + i + '</option>';
}
print += '</select>';
document.write(print);
</script>
          <span id="my_time" class="set-time"></span>
<script>
function time_now() {
  var mess_time = 'Установите своё время';
  if (document.set.field6.value != '') {
    var now = new Date();
    now.setHours(now.getHours() + (now.getTimezoneOffset() / 60) + parseInt(document.set.field6.value));
    var secs = now.getSeconds();
    if (secs < 10) secs = '0' + secs;
    var mins = now.getMinutes();
    if (mins < 10) mins = '0' + mins;
    var hours = now.getHours();
    if (hours < 10) hours = '0' + hours;
    mess_time = hours + ':' + mins + ':' + secs;
  }
  return mess_time;
}
setInterval('document.getElementById("my_time").innerHTML=time_now()', 1000);
</script>
        </td></tr>
      </table>
      <div class="set-actions">
        <input type="submit" name="submit" value="Сохранить настройки" class="ok">
      </div>
    </form>
  </div>
</body>
</html>
