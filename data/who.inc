<!DOCTYPE html>
<html>
<head>
<META http-equiv=Content-Type content="text/html; charset=UTF-8">
<link rel="stylesheet" href="https://snami.mpchat.com/gb.css" type="text/css" media="all" />
<link rel="icon" href='/data/vhod/images/favicon.ico' type="image/x-icon">
<link id="style" rel="stylesheet" type="text/css" href="/2.css">

</head>
<body class=who-body>
<span style="display:block;text-align:center">
<b>Кто сегодня был</b><br><br>
<table>
<script>
for(var i=0;i<u.length;i++) {
	var realip=""; if(u[i][7]) realip="<br><font color=red>("+u[i][7]+")</font>";
	var ipinfo=""; if(u[i][3]) ipinfo="<td><a href=http://ipgeobase.ru/?address="+u[i][3]+" target=_blank>"+u[i][3]+"</a>"+u[i][5]+" <font color=blue>"+u[i][6]+"</font>"+realip+"</td>";
	document.write("<tr><td width=100><a href=index.php?inc=info&userid="+u[i][0]+" target=_blank><font color="+u[i][2]+">"+u[i][1]+"</font></a></td>"+ipinfo+"<td>"+u[i][4]+"</td></tr>\n");
}
</script>
</table><br>
Всего за день: <b><script>document.write(u.length);</script></b>
</span>
</body>
</html>