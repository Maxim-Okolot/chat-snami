<!DOCTYPE html>
<html>
<head>
<META http-equiv=Content-Type content="text/html; charset=UTF-8">
<link rel="stylesheet" href="https://snami.mpchat.com/gb.css" type="text/css" media="all" />
<link type="text/css" rel="StyleSheet" href="/forum.css" />
<link rel="stylesheet" type="text/css" href="/base.css">
</head>
<body class=search-body>
<span style='display:block;text-align:center'>
<b>Поиск по никам и анкетам</b><br><br>
<form action=?inc=search method=post>
<script>
/* Возможен ли поиск */
if(hash) document.write("<input type=hidden name=hash value="+hash+">");
else alert("Поиск не доступен!");
</script>
<table  align=center border=0 >
<tr><td align=left><b>Ник:</b></td><td align=left><input type=text name=nick class=text> </td></tr>
<tr><td align=left><b>Имя:</b></td><td align=left><input name=name class=text></td></tr>
<tr><td align=left><b>Город:</b></td><td align=left><input name=city class=text></td></tr>
<tr><td align=left><b>Страна:</b></td><td align=left> <input name=country class=text></td></tr>
<tr><td align=left><b>Возраст:</b></td><td align=left>от <input name=age1 size=1 maxlength=2 class=text> до <input name=age2 size=1 maxlength=2 class=text></td></tr>
<tr><td align=left><b>Пол:</b></td><td align=left><input type=radio name=mw value=0> мужской <br><input type=radio name=mw value=1> женский <br></td></tr>
<tr><td align=left><b>Фото:</b></td><td align=left><input type=checkbox name=foto class=text> - с фотографией</td></tr>
<tr><td align=center colspan=2><input type=submit name=search value='Найти пользователей' class=ok></td></tr>
</form>
</table><br>
<script>
/* Показать результаты поиска */
if(search==1) {
document.write("<b>Результаты поиска</b><br><br>");
for(var i=0;i<u.length;i++) document.write("<a href=?inc=info&userid="+u[i][3]+"  target=_blank><span style='color:+u[i][1]+'>"+u[i][0]+"</span></a><br>");
if(u.length>0) document.write("<br>");
document.write("Всего найдено: <b>"+u.length+"</b>");
}
</script>
</span>
</body>
</html>