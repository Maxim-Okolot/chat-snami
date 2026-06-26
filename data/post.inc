<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Личная почта</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href='/assets/img/favicon.ico' type="image/x-icon">
<link rel="stylesheet" href="https://snami.mpchat.com/gb.css" type="text/css" media="all" />
<link rel=stylesheet type=text/css href=sovremenuy.css>
<style>
body.post-body {
  background: linear-gradient(120deg, #e0e7ff 0%, #f7fafc 100%);
  font-family: 'Segoe UI', Arial, sans-serif;
  margin: 0;
  color: #222;
}
.mail-container {
  max-width: 900px;
  margin: 40px auto 40px auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px #0002;
  padding: 32px 18px 28px 18px;
}
.mail-title {
  color: #2a7ae2;
  font-size: 2.1em;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;
  letter-spacing: 1px;
}
.mail-nav {
  text-align: center;
  margin-bottom: 20px;
}
.mail-nav a, .mail-nav span {
  display: inline-block;
  margin: 0 7px;
  padding: 7px 16px;
  border-radius: 7px;
  background: #e7f0fd;
  color: #2a7ae2;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.2s, color 0.2s;
}
.mail-nav a:hover {
  background: #2a7ae2;
  color: #fff;
}
.mail-nav .active {
  background: #2a7ae2;
  color: #fff;
}
.mail-table-wrap {
  overflow-x: auto;
}
.mail-table {
  width: 100%;
  border-collapse: collapse;
  background: #f7fafc;
  border-radius: 12px;
  box-shadow: 0 1px 8px #0001;
  margin-bottom: 22px;
}
.mail-table th, .mail-table td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid #e0e7ff;
  font-size: 1em;
}
.mail-table th {
  background: #e7f0fd;
  color: #2a7ae2;
  font-weight: bold;
  text-align: center;
  font-size: 1.08em;
}
.mail-table tr:hover td {
  background: #e7f0fd;
  transition: background 0.15s;
}
.mail-table td {
  text-align: center;
}
.mail-form {
  background: #f7fafc;
  border-radius: 12px;
  box-shadow: 0 1px 4px #0001;
  padding: 18px 14px 12px 14px;
  margin: 0 auto 18px auto;
  max-width: 600px;
  display: none;
}
.mail-form input[type="text"], .mail-form textarea {
  width: 95%;
  font-size: 1em;
  border: 1px solid #c0d3f7;
  border-radius: 6px;
  padding: 6px 8px;
  margin-bottom: 10px;
  background: #fff;
  color: #222;
}
.mail-form textarea {
  min-height: 80px;
  resize: vertical;
}
.mail-form input[type="file"] {
  margin: 8px 0;
}
.mail-form .ok {
  background: #2a7ae2;
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 8px 22px;
  font-size: 1em;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s;
}
.mail-form .ok:hover {
  background: #1e5db6;
}
.mail-btn {
  background: #2a7ae2;
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 8px 22px;
  font-size: 1em;
  cursor: pointer;
  margin: 0 7px 12px 7px;
  transition: background 0.2s;
  text-decoration: none;
  display: inline-block;
}
.mail-btn:hover {
  background: #1e5db6;
  color: #fff;
}
.mail-status {
  margin: 18px 0 10px 0;
  text-align: center;
  font-size: 1.08em;
}
.mail-status .ok { color: #1e8c1e; }
.mail-status .err { color: #d32f2f; }
@media (max-width: 700px) {
  .mail-container { padding: 10px 2vw; }
  .mail-title { font-size: 1.3em; }
  .mail-table th, .mail-table td { padding: 7px 6px; font-size: 0.98em; }
}
</style>
</head>
<body class="post-body">
<div class="mail-container">
  <div class="mail-title">Личная почта</div>
  <div class="mail-nav">
    <a href="#" id="write-btn">Написать</a> |
    <a href="?inc=post&userid=%userid%&id=%id%&limit=%limit%" id="inbox-link">Входящие(<span id="inbox-count"></span>)</a> |
    <a href="?inc=post&userid=%userid%&id=%id%&limit=%limit%&out=1" id="outbox-link">Исходящие</a> |
    <a href="#" onclick="window.close();return false;">Закрыть</a>
  </div>
  <div class="mail-status" id="mail-status"></div>
  <form id="sendform" class="mail-form" action='?inc=post&userid=%userid%&id=%id%&limit=%limit%' method=post enctype=multipart/form-data>
    <div>
      Кому: <input type="text" id="tonick" name="tonick" class="text" value=''>
      &nbsp; Тема: <input type="text" id="subject" name="subject" class="text" size="30" maxlength="100">
    </div>
    <div>
      <textarea cols="52" rows="8" name="text" class="area" placeholder="Введите текст сообщения..."></textarea>
    </div>
    <div>
      Изображение: <input name="file" type="file" class="text" size="3"> - .gif/.jpg/.png/.bmp (до 200кб)
    </div>
    <div style="text-align:center;">
      <input type="submit" name="send" class="ok" value="Отправить сообщение">
    </div>
  </form>
  <div id="mail-table-wrap" class="mail-table-wrap"></div>
  <div id="mail-nav-bottom" class="top100-nav"></div>
</div>
<script>
/* Статусы */
if(err==1) document.getElementById('mail-status').innerHTML="<span class='err'>Данный участник не зарегистрирован!</span>";
if(err==2) document.getElementById('mail-status').innerHTML="<span class='err'>Вы не можете отправлять почту, Ваш ящик переполнен - удалите входящие!</span>";
if(err==3) document.getElementById('mail-status').innerHTML="<span class='err'>Вы недавно писали этому пользователю, попробуйте немного позже!</span>";
if(err==4) document.getElementById('mail-status').innerHTML="<span class='err'>Файл не отправлен, слишком велик или неверный формат!</span>";
if(ok==1) document.getElementById('mail-status').innerHTML="<span class='ok'>Сообщение удачно отправлено!</span>";
if(ok==2) document.getElementById('mail-status').innerHTML="<span class='ok'>Сообщение и файл удачно отправлены!</span>";
if(ok==3) document.getElementById('mail-status').innerHTML="<span class='ok'>Выбранные сообщения удалены!</span>";
if(ok==4) document.getElementById('mail-status').innerHTML="<span class='ok'>Статус выбранных сообщений изменен!</span>";

/* Кнопка "Написать" */
document.getElementById('write-btn').onclick = function(e){
  e.preventDefault();
  var form = document.getElementById('sendform');
  form.style.display = (form.style.display=='block' ? 'none' : 'block');
};

/* Открытие формы с заполнением */
function openform(tonick,subject) {
  document.getElementById("tonick").value=tonick;
  document.getElementById("subject").value=subject; 
  document.getElementById("sendform").style.display="block";
}
if(tonick || subject) openform(tonick,subject);

/* Входящие/исходящие/чтение писем */
var msgtype = (out==1) ? "Исходящие" : "Входящие";
document.getElementById('inbox-count').innerHTML = newpost>0 ? "<span style='color:red;'>"+newpost+"</span>" : newpost;

/* Фильтр писем */
var filterForm = "<form action='' method='get' style='margin-bottom:10px;'><input type='hidden' name='inc' value='post'><input type='hidden' name='userid' value='%userid%'><input type='hidden' name='id' value='%id%'><input type='hidden' name='limit' value='%limit%'><input type='hidden' name='out' value='"+out+"'><b>"+msgtype+"</b>: <input type='text' name='filter' size='30' maxlength='50' class='text'> <input type='submit' value='Найти' class='ok'></form>";
document.getElementById('mail-table-wrap').innerHTML = filterForm;

/* Вывод писем */
if(!msgs.length) {
  document.getElementById('mail-table-wrap').innerHTML += "<div style='text-align:center; color:#888; margin:20px 0 30px 0;'>Писем не найдено!</div>";
} else {
  var wr = "";
  /* Чтение письма */
  if(read>0) {
    var x=msgs[0];
    var status="&nbsp;"; if(x[6]==0) status="<b style='color:red;' title='новое'>&raquo;</b>"; if(x[6]==2) status="<b style='color:red;' title='важное'>!!!</b>";
    var actions=""; if(out==0) actions="<a href=# onclick='openform(\""+x[3]+"\",\"Re: "+x[7].replace(/\"/g,'\\\"')+"\");return false;' class='mail-btn'>Ответить</a> <a href=?inc=post&userid=%userid%&id=%id%&limit=%limit%&del[]="+x[0]+" class='mail-btn'>Удалить</a>";
    wr+="<table class='mail-table'><tr><th>&nbsp;</th><th>Тема сообщения</th><th>Отправитель</th><th>Дата сообщения</th><th>&nbsp;</th></tr>";
    wr+="<tr><td>"+status+"</td><td align=left><a href=?inc=post&userid=%userid%&id=%id%&limit=%limit%&out="+out+"&read="+x[0]+">"+x[7]+"</a></td><td><a href=?inc=info&userid="+x[2]+" target=_blank><font color="+x[4]+"><b>"+x[3]+"</b></font></a></td><td>"+x[5]+"</td><td>&nbsp;</td></tr>";
    wr+="<tr><td colspan=5 align=left style='background:#fff;'><div style='padding:14px 8px 10px 8px;'>"+x[8]+"<br><br>"+actions+"</div></td></tr>";
    wr+="</table><div style='text-align:center; margin:12px 0 0 0;'><a href=# onclick='history.back(); return false;' class='mail-btn'>Вернуться назад</a></div>";
    document.getElementById('mail-table-wrap').innerHTML += wr;
  }
  /* Входящие */
  else if(out==0) {	 
    wr+="<form id='form' action='' method='post'><table class='mail-table'><tr><th>&nbsp;</th><th>Тема сообщения</th><th>Отправитель</th><th>Дата сообщения</th><th><input type=checkbox onclick='var a=document.getElementsByName(\"del[]\"); for(var i=0;i<a.length;i++) a[i].checked=this.checked;' title='выбрать все'></th></tr>";
    for(i=0;i<msgs.length;i++) {
      var x=msgs[i];
      var status="&nbsp;"; if(x[6]==0) status="<b style='color:red;' title='новое'>&raquo;</b>"; if(x[6]==2) status="<b style='color:red;' title='важное'>!!!</b>";
      wr+="<tr><td>"+status+"</td><td align=left><a href=?inc=post&userid=%userid%&id=%id%&limit=%limit%&out="+out+"&read="+x[0]+">"+x[7]+"</a></td><td><a href=?inc=info&userid="+x[2]+" target=_blank><font color="+x[4]+"><b>"+x[3]+"</b></font></a></td><td>"+x[5]+"</td><td><input type=checkbox name='del[]' value='"+x[0]+"'></td></tr>";
    }
    wr+="</table><div style='margin:12px 0 0 0;'><select name=setas onchange='document.getElementById(\"form\").submit();' class='text'><option value=''>Отметить выбранные как:<option value=2>- важные<option value=1>- прочитанные<option value=0>- непрочитанные</select> <input type=submit value='Удалить выбранные' class='ok'></div></form>";
    document.getElementById('mail-table-wrap').innerHTML += wr;
  }
  /* Исходящие */
  else if(out==1) {	
    wr+="<form id='form' action='' method='post'><table class='mail-table'><tr><th>&nbsp;</th><th>Тема сообщения</th><th>Получатель</th><th>Дата сообщения</th><th>&nbsp;</th></tr>";
    for(i=0;i<msgs.length;i++) {
      var x=msgs[i];
      var status="&nbsp;"; if(x[6]==0) status="<b style='color:red;' title='новое'>&raquo;</b>"; if(x[6]==2) status="<b style='color:red;' title='важное'>!!!</b>";
      wr+="<tr><td>"+status+"</td><td align=left><a href=?inc=post&userid=%userid%&id=%id%&limit=%limit%&out="+out+"&read="+x[0]+">"+x[7]+"</a></td><td><a href=?inc=info&userid="+x[2]+" target=_blank><font color="+x[4]+"><b>"+x[3]+"</b></font></a></td><td>"+x[5]+"</td><td>&nbsp;</td></tr>";
      if(x[8]) wr+="<tr><td colspan=5 style='background:#fff;'><div style='padding:10px 8px 7px 8px;'>"+x[8]+"</div></td></tr>";
    }
    wr+="</table></form>";
    document.getElementById('mail-table-wrap').innerHTML += wr;
  }

  /* Навигация */
  var count=msgs.length;
  var prev='<b>&laquo; Назад</b>'; if(s>0) prev='<a href=?inc=post&userid=%userid%&id=%id%&out='+out+'&s='+(s*1-1)+'>'+prev+'</a>';
  var next='<b>Далее &raquo;</b>'; if(count>=limit) next='<a href=?inc=post&userid=%userid%&id=%id%&out='+out+'&s='+(s*1+1)+'>'+next+'</a>';
  document.getElementById('mail-nav-bottom').innerHTML = prev+' <b>['+(s*1+1)+']</b> '+ next;
}

/* Время загрузки */
document.getElementById('mail-nav-bottom').innerHTML += "<div style='color:#888; font-size:0.98em; margin-top:10px;'>Загружено за: "+loadtime+"</div>";
</script>
</body>
</html>