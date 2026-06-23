<!DOCTYPE html>
<html>
<head>
<title>Настройки</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link type="text/css" rel="StyleSheet" href="/forum.css" />
<link rel="stylesheet" type="text/css" href="/base.css">
<link type="text/css" rel="StyleSheet" href="/table.css" />


<style>

@font-face {
font-family: 'OldTown';
src: url('https://snami.mpchat.com/fonts/OldTown.ttf');
}

@font-face {
font-family: 'Kapelka';
src: url('https://snami.mpchat.com/fonts/Kapelka.ttf');
}

@font-face {
font-family: 'Artemis cursive';
src: url('https://snami.mpchat.com/fonts/Artemis cursive.ttf');
}

@font-face {
font-family: 'Farabee';
src: url('https://snami.mpchat.com/fonts/Farabee.ttf');
}

@font-face {
font-family: 'Monotype Corsiva';
src: url('https://snami.mpchat.com/fonts/Monotype Corsiva.ttf');
}

@font-face {
font-family: 'Equilibrist';
src: url('https://snami.mpchat.com/fonts/Equilibrist.ttf');
}

@font-face {
font-family: 'Spectral';
src: url('https://snami.mpchat.com/fonts/Spectral.ttf');
}

@font-face {
font-family: 'Sriracha';
src: url('https://snami.mpchat.com/fonts/Sriracha.ttf');
}

@font-face {
font-family: 'DR Agu Script';
src: url('https://snami.mpchat.com/fonts/DR Agu Script.ttf');
}

@font-face {
font-family: 'Lobster';
src: url('https://snami.mpchat.com/fonts/Lobster.ttf');
}

@font-face {
font-family: 'Candara';
src: url('https://snami.mpchat.com/fonts/Candara.ttf');
}

@font-face {
font-family: 'Bressay Trial';
src: url('https://snami.mpchat.com/fonts/Bressay Trial.ttf');
}

@font-face {
font-family: 'Gunny Rewritten';
src: url('https://snami.mpchat.com/fonts/Gunny Rewritten.ttf');
}

@font-face {
font-family: 'Segoe Print';
src: url('https://snami.mpchat.com/fonts/Segoe Print.ttf');
}

@font-face {
font-family: 'Faberge';
src: url('https://snami.mpchat.com/fonts/Faberge.ttf');
}

@font-face {
font-family: 'Oktyabrina-script';
src: url('https://snami.mpchat.com/fonts/Oktyabrina-script.ttf');
}


@font-face {
font-family: 'lucidaconsole';
src: url('https://snami.mpchat.com/fonts/lucidaconsole.ttf');
}

@font-face {
font-family: 'Palatino Linotype';
src: url('https://snami.mpchat.com/fonts/Palatino Linotype.ttf');
}

@font-face {
font-family: 'couriercyrillic';
src: url('https://snami.mpchat.com/fonts/couriercyrillic.ttf');
}

@font-face {
font-family: 'Kereru';
src: url('https://snami.mpchat.com/fonts/Kereru.ttf');
}

@font-face {
font-family: 'carlomelow';
src: url('https://snami.mpchat.com/fonts/carlomelow.ttf');
}

@font-face {
font-family: 'ST-Warmovie-noncommercial';
src: url('https://snami.mpchat.com/fonts/ST-Warmovie-noncommercial.otf');
}

@font-face {
font-family: 'Romanesque';
src: url('https://snami.mpchat.com/fonts/Romanesque.ttf');
}

@font-face {
font-family: 'Stonehenge';
src: url('https://snami.mpchat.com/fonts/Stonehenge.ttf');
}

@font-face {
font-family: 'Andy_Bold';
src: url('https://snami.mpchat.com/fonts/Andy_Bold.otf');
}

@font-face {
font-family: 'XPLOR_Bold-Regular';
src: url('https://snami.mpchat.com/fonts/XPLOR_Bold-Regular.otf');
}

@font-face {
font-family: 'FoxcroftNF RUS Regular';
src: url('https://snami.mpchat.com/fonts/FoxcroftNF RUS Regular.otf');
}

@font-face {
font-family: 'Bounded';
src: url('https://snami.mpchat.com/fonts/Bounded.ttf');
}









body {
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  min-height: 100vh;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', 'Candara', 'Arial', sans-serif;
  color: #222;
}
.set-body {
  background: none;
}
.centered-box {
  max-width: 600px;
  margin: 40px auto 20px auto;
  background: rgba(255,255,255,0.95);
  border-radius: 22px;
  box-shadow: 0 8px 32px 0 rgba(31,38,135,0.13);
  padding: 32px 24px 24px 24px;
  border: 1px solid #e0e0e0;
}
h1, b {
  font-family: 'Pattaya', 'Lobster', 'Candara', cursive, sans-serif;
  color: #b07d7d;
  letter-spacing: 1px;
}
input[type="text"], input[type="password"], input[type="color"], select, textarea {
  border: 1.5px solid #b07d7d;
  border-radius: 8px;
  padding: 7px 10px;
  font-size: 16px;
  margin-bottom: 8px;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
  background: #fff;
  box-shadow: 0 1px 3px rgba(176,125,125,0.04);
}
input[type="text"]:focus, input[type="password"]:focus, select:focus, textarea:focus {
  border: 2px solid #fda085;
  box-shadow: 0 0 0 2px #fda08544;
}
input[type="checkbox"] {
  accent-color: #b07d7d;
  transform: scale(1.2);
  margin-right: 6px;
}
input[type="submit"], .ok, .btn, button {
  background: linear-gradient(90deg,#f6d365 0%,#fda085 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 10px 24px;
  font-size: 17px;
  font-family: inherit;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 2px 6px rgba(176,125,125,0.13);
  transition: background 0.2s, box-shadow 0.2s;
}
input[type="submit"]:hover, .ok:hover, .btn:hover, button:hover {
  background: linear-gradient(90deg,#fda085 0%,#f6d365 100%);
  box-shadow: 0 4px 16px rgba(176,125,125,0.23);
}
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  background: none;
}
td {
  padding: 8px 10px;
  vertical-align: top;
  border: none !important;
  font-size: 16px;
}
tr {
  background: none !important;
}
@media (max-width: 700px) {
  .centered-box {
    max-width: 98vw;
    padding: 12px 2vw 12px 2vw;
  }
  table, td {
    font-size: 15px;
  }
  input[type="text"], input[type="password"], select, textarea {
    font-size: 15px;
    padding: 6px 7px;
  }
  input[type="submit"], .ok, .btn, button {
    font-size: 15px;
    padding: 8px 8vw;
  }
}
label, .set-checkbox {
  font-size: 15px;
  color: #b07d7d;
}
input[type="file"] {
  border: none;
  background: none;
  font-size: 15px;
}
img {
  border-radius: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  max-width: 100%;
}
hr {
  border: none;
  border-top: 1.5px solid #fda08544;
  margin: 20px 0;
}
</style>
</head>
<body class="set-body">
<div class="centered-box">
<span style='display:block;text-align:center'>
<h1>Настройки</h1>
<script>
if(saveok!='') {
if(saveok==0) print='<span style='color:red'>Сохранение данных невозможно!</span><br>';
if(saveok>0) print='<span style='color:#336699'> Данные успешно сохранены!</span><br>';
if(saveok>1) print+='<span style='color:red'>Файл незагружен - слишком велик или неправильный формат!</span><br>';
if(setpass=='0') print+='<span style='color:#ff0000'>Пароль не изменён. <br>(неправильно введён или пользователь незарег.)</span><br>';
if(setpass=='1') print+='<span style='color:#336699'>Пароль изменён. Перезайдите в чат!</span><br>';
if(setsubscribe=='1') print+='<span style='color:#336699'>Проверьте почту и подтвердите подписку на рассылку!</span><br>';
print=print+'<a href="javascript:window.close();">закрыть</a><br><br>';
document.write(print);
}
</script>
</span>
<form action='' method=post enctype="multipart/form-data" name=set onsubmit="document.set.submit.value='Подождите ...';document.set.submit.disabled=true;">
<input type=hidden name=save value=ok>
<input type=hidden name=id value=%id%>
<input type=hidden name=adminsess value=%adminsess%>
<table>
<tr><td>Имя</td><td>
<input type=text name=name  maxlength=20 class=text value='%name%'>
</td></tr>
<tr><td>День рожд.</td><td>
<script>
var print='<select name=day class=text><option value="\">--</option>';
var sel='';
for(i=1;i<32;i++){
if(i<10) i0='0'+i; else i0=i;
if('%day%'==i) sel='selected'; else sel='';
print+='<option value='+i+' '+sel+'>'+i0+'</option>';
}
print+='</select> . <select name=month class=text><option value="\">--</option>';
for(i=1;i<13;i++){
if(i<10) i0='0'+i; else i0=i;
if('%month%'==i) sel='selected'; else sel='';
print+='<option value='+i+' '+sel+'>'+i0+'</option>';
}
print+='</select> . <select name=year class=text><option value="\">----</option>';
for(i=1951;i<2000;i++){
if('%year%'==i) sel='selected'; else sel='';
print+='<option value='+i+' '+sel+'>'+i+'</option>';
}
print+='</select>';
document.write(print);
</script>
</td></tr>
<tr><td>Пол</td><td>
<script>
if('%mw%'==1) sel='selected'; else sel='';
print='<select name=mw class=text>';
print+='<option value=0>мужской</option>';
print+='<option value=1 '+sel+'>женский</option>';
print+='</select>';
document.write(print);
</script>
</td></tr>
<tr><td>Страна</td><td>
<input type=text name=land  maxlength=20 class=text value=%land%>
</td></tr>
<tr><td>Город</td><td>
<input type=text name=home  class=text value=%home%>
</td></tr>
<tr><td>Email</td><td>
<input type=text name=email class=text value='%email%'><br>
(при смене укажите старый пароль)<br>
<script>
if('%emailview%'==1) sel='checked'; else sel='';
print='<input type=checkbox name=emailview '+sel+'> - отображать в анкете<br>';
document.write(print);
if('%subscribe%'==1) sel='checked'; else sel='';
print='<input type=checkbox name=subscribe '+sel+'> - подписаться на рассылку';
document.write(print);
</script>
</td></tr>
<tr><td>О себе</td><td>
<textarea rows=3 cols=30 wrap=auto name=about >%about%</textarea>
</td></tr>
<script>
if(icon_on==1){
var icon='%icon%';
print='<tr><td>Иконка</td><td><input name=icon  class=text> - <a href=index.php?inc=icon target=_blank>выбрать номер</a><br>';
if(icon!='') print+='<img src='+icon+'>';
print+='</td></tr>';
document.write(print);
}
if(icon_on>1) {
var icon='%icon%';
if(icon_on==100) maxsize='128x32'; else maxsize=icon_on+'x'+icon_on;
print='<tr><td>Иконка(max '+maxsize+')</td><td><input name=icon type=file class=text><br>';
if(icon!='') print+='<img src='+icon+'><br><input name=icondel type=checkbox > - удалить<br>';
print+='</td></tr>';
document.write(print);
}
var foto='%foto%';
print='<tr><td>Фотография</td><td><input name=foto type=file class=text><br>';
if(foto!='-') print+='<a href='+foto+' target=_blank title="Посмотреть в полном размере"><img src='+foto+' width=150 border=0></a><br><input name=fotodel type=checkbox > - удалить';
print+='</td></tr>';
document.write(print);
if(avator_on==1){
var avator='%avator%';
print='<tr><td>Аватор на форуме</td><td><input name=avator  type=file class=text><br>';
if(avator) print+='<img src='+avator+'><br><input name=avatordel type=checkbox > - удалить';
print+='</td></tr>';
document.write(print);
}
if(signature_on==1){
print='<tr><td>Подпись на форуме</td><td><input name=signature  type=text maxlength=100 class=text value=\'%signature%\'></td></tr>';
document.write(print);
}
</script>
<tr><td name=colortable>Настройка <br>ника и фразы</td><td>
<script>
var print='';
var CHAT_FONT_SIZE_PX={1:10,2:13,3:16,4:18,5:24,6:32,7:48};
function chatFsLabel(n){return CHAT_FONT_SIZE_PX[n]+'px';}
function chatFsStyle(n){return ' style="font-size:'+CHAT_FONT_SIZE_PX[n]+'px"';}
function setall(){
if(document.set.fontsize1) 
size1=chatFsStyle(document.set.fontsize1.value); else size1='';
if(document.set.colornick) 
color1=" color="+document.set.colornick.value; else color1='';
if(document.set.fontface1) 
face1=" face='"+jsfonts[document.set.fontface1.value]+"'"; else face1='';
if(document.set.fontsize2) 
size2=chatFsStyle(document.set.fontsize2.value); else size2='';
if(document.set.color)			
color2=" color="+document.set.color.value; else color2='';
if(document.set.fontface2) 
face2=" face='"+jsfonts[document.set.fontface2.value]+"'"; else face2='';
out1="<a href=# onclick='return false;'><span>%nick%</span></a>";
out2="<span>мой текст в чате</span>";
document.getElementById("setform").innerHTML=out1+' '+out2;
}
print='<input onchange="setall();" type=color name=colornick size=6 maxlength=6  class=text  value=#%nickcolor%> ';
document.write(print);
if(fontsize_on==1){
print='<select name=fontsize1 class=text  onchange=setall()>';
for(i=1;i<8;i++) if('%fontsize1%'==i) print+='<option value='+i+' selected>'+chatFsLabel(i); else print+='<option value='+i+'>'+chatFsLabel(i);
print+='</select> ';
document.write(print);
}
if(fontface_on==1){
print='<select name=fontface1 class=text  onchange=setall()>';
for(i=0;i<jsfonts.length;i++) if('%fontface1%'==jsfonts[i]) print+='<option value='+i+' selected>'+jsfonts[i]; else print+='<option value='+i+'>'+jsfonts[i];
print+='</select> ';
document.write(print);
}
document.write('<br>');
print='<input onchange="setall();" type=color name=color size=6 maxlength=6  class=text value=#%color%> ';
document.write(print);
if(fontsize_on==1){
print='<select name=fontsize2 class=text  onchange=setall()>';
for(i=2;i<6;i++) if('%fontsize2%'==i) print+='<option value='+i+' selected>'+chatFsLabel(i); else print+='<option value='+i+'>'+chatFsLabel(i);
print+='</select> ';
document.write(print);
}
if(fontface_on==1){
print='<select name=fontface2 class=text  onchange=setall()>';
for(i=0;i<jsfonts.length;i++) if('%fontface2%'==jsfonts[i]) print+='<option value='+i+' selected>'+jsfonts[i]; else print+='<option value='+i+'>'+jsfonts[i];
print+='</select> ';
document.write(print);
}
</script>
<div id=setform></div>
<script>setall();</script>
</td></tr>
<tr><td>Музыка</td><td><input name=field1 class=text value='%field1%'></td></tr>
<!--<tr><td>Друзья</td><td><input type=text name=field3 class=text value=%field3%></td></tr>-->
<tr><td>Изменить пароль</td><td>
<input type=password name=altpass class=text> - текущий пароль<br>
<input type=password name=newpass class=text> - новый  пароль<br>
<input type=checkbox name=delaccount onclick='if(this.checked) return confirm("Для удаления необходимо ввести текущий пароль. Вы уверены что хотите удалить свой аккаунт полностью? ");'> - полностью удалить свой аккаунт<br>
</td></tr>

<tr><td>Моё время</td><td><script>
var print='<select name=field6 class=text>';
var sel='';
for(i=-23;i<24;i++){
if('%field6%'==i) sel='selected'; else sel='';
print+='<option value='+i+' '+sel+'>'+i+'</option>';
}
print+='</select>';
document.write(print);
</script>
<span id=my_time></span><script language="JavaScript" type="text/javascript">
/* Корректировка времени */
function time_now(){
var mess_time="Установите своё время";
if(document.set.field6.value!='') {
var now = new Date();
now.setHours(now.getHours()+(now.getTimezoneOffset()/60)+parseInt(document.set.field6.value));
var secs=now.getSeconds();
if (secs < 10)secs = '0'+secs;
var mins=now.getMinutes();
if (mins < 10)mins = '0'+mins;
var hours=now.getHours();
if (hours < 10)hours = '0'+hours;
mess_time=hours+":"+mins+":"+secs}
return mess_time;
}

setInterval('document.getElementById("my_time").innerHTML=time_now()',1000)

</script>
</td></tr>


</table>
<span style='display:block;text-align:center'><input type=submit name=submit value='Сохранить настройки' class=ok></span>
</form>
</div>
</body>
</html>

