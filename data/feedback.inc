<!DOCTYPE html>
<html>
<head>
<title>Форма обратной связи</title>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="STYLESHEET" type="text/css" href="style.css">
</head>
<body class=feedback-body>
<center>
<b>Форма обратной связи</b><br><br>

<script>
if(err==-1) document.write("<font color=green>Ваше письмо отправленно!</font><br>");
if(err==1) document.write("<font color=red>Заполните все поля пожалуйста!</font><br>");
if(err==2) document.write("<font color=red>Вы неправильно указали Емеил!</font><br>");
if(err==3) document.write("<font color=red>Вы неправильно указали код!</font><br>");
</script>

<form action='' method=post>
<table>
<tr><td align=left>Имя:<td align=left><input type=text name=name maxlength=50 class=text></td></tr>
<tr><td align=left>Емеил:<td align=left><input type=text name=email  maxlength=50 class=text></td></tr>
<tr><td align=left>Тема:<td align=left><input type=text name=subject  maxlength=100 size=40 class=text></td></tr>
<tr><td colspan=2><textarea name=text cols=47 rows=10 class=text></textarea></td></tr>
<tr><td colspan=2><img src=index.php?inc=code> <input type=text name=code class=text> <input type=submit name=send class=ok value=Отправить></td></tr>
</table>
</form>
</body>
</html>