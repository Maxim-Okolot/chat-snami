<!DOCTYPE html>
<html>
<head>
<title>Востановление пароля</title>
<META http-equiv=Content-Type content='text/html; charset=UTF-8'>
<link rel=STYLESHEET type=text/css href=style.css>
<link rel="icon" href='/data/vhod/images/favicon.ico' type="image/x-icon">
</head>
<body class=mail-body><span style="display:block;text-align:center">
<b>Выслать пароль</b><br><br>
<script>
if(err==0) err='Заполните все поля!';
if(err==1) err='Неверный код, попробуите ещё раз!';
if(err==2) err='Логин в базе не найден!';
if(err==3) err='Логин несовпадает с введённым почтовым адресом!';
if(err==4) err='Ошибка изменения пароля, обратитесь к администратору!';
if(ok==1) err='<font color=green>Пароль выслан на указанный E-mail адрес.</font>';
if(ok==2) err='<font color=green>Изменение пароля удачно подтверждено, Вы можетей войти в чат.</font>';
if(err) document.write(err+"<br><br>");
</script>
<form action='' method=post>
<b>Ваш ник:</b><br><input type=text name=nick class=text><br>
<b>E-mail:</b><br><input type=text name=email class=text><br>
<img src=index.php?inc=code><br>
<input type=text name=code class=text><br>
<input type=submit value='Выслать' name=send class=ok>
</form>
</span>
</body>
</html>