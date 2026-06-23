<!DOCTYPE html>
<html>
<head>
<title>Форма обратной связи</title>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="STYLESHEET" type="text/css" href="style.css">
</head>
<body class=feedback-body>
<span style='display:block;text-align:center'>
<b>Форма обратной связи</b><br><br>

<script>
if(err==-1) document.write("<span style='color:green'>Ваше письмо отправленно!</span><br>");
if(err==1) document.write("<span style='color:red'>Заполните все поля пожалуйста!</span><br>");
if(err==2) document.write("<span style='color:red'>Вы неправильно указали Емеил!</span><br>");
if(err==3) document.write("<span style='color:red'>Вы неправильно указали код!</span><br>");
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
</span>
</body>
</html>