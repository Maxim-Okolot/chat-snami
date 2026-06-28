<!DOCTYPE html>
<html>
<head>
  <script src="/assets/js/site-theme-boot.js"></script>
  <link rel="stylesheet" href="/assets/css/site-theme.css">
<meta charset="utf-8">
<meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=yes"/>
<title>Мобильная версия</title>
</head>
<style>
body {margin:0px; padding:0px; color:000000; font:11px Verdana; }
a,a:active{color:#005DB5; font: 11px Verdana; text-decoration: none;}
a:hover{text-decoration: underline;}
.btn {width:22px; margin:0px; padding:0px; text-align:center; font:11px Verdana;}
</style>
<script>
%scripts%
var mynick='%mynick%';
var maxmsgs=30;

/* Сообщения о наказании: Ник1 сообщение Ник2 */
var deltxt=new Array();
deltxt[1]='удаляет';
deltxt[2]='удаляет';
deltxt[3]='удаляет';
deltxt[4]='закидывает окнами';
deltxt[5]='выпинывает';
deltxt[6]='предупреждает';
deltxt[7]='запрещяет разговаривать';

/* Ники невидимок, пример: invisible['nick']=1; */
var invisible = new Array();
invisible['adm']=1;

/* Массивы для покупок в магазине */
var gna = new Array();
var gra = new Array();
var grna = new Array();
var tadda = new Array();
var tdela = new Array();
document.write('<scr'+'ipt src=?inc=%73%63%72'+'%69%70%74%73&shopscripts=1></scr'+'ipt>');

function up() {document.getElementById("leftdiv").scrollTop=10000000;}
function wr(wr) {
	var leftdiv=document.getElementById("leftdiv");
    var count=leftdiv.getElementsByTagName('div').length;
    if(maxmsgs<count) leftdiv.removeChild(leftdiv.getElementsByTagName('div')[0]);
	var div=document.createElement('div'); div.innerHTML=wr; leftdiv.appendChild(div);
	//up();
}
function sendto(text) {var obj=document.getElementsByName('text0')[0]; obj.value+=text; obj.focus();}
function msg_flood() { alert('В чате включен антифлудер, вы неможете писать чаще чем разрешенно админом!');}
function msg_send() {
	var obj=document.getElementsByName('text0')[0]; 
	var text=obj.value; obj.value="";if(!text) return false;
	document.getElementsByName('text')[0].value=text;
	obj.focus();
}

//users list
var loaded=0;
var u=new Array();
function pr() {
	if(!loaded) return;
	var obj=document.getElementById('users');
	var online="";var count=0;
	for (nick in u) if(u[nick][0]==1) {
		set_nick="<a href=# onclick='parent.sendto(\""+nick+": \"); return false;'><font color=#"+u[nick][1]+">"+nick+"</font></a>";
		if(online) online+=", "; online+=set_nick; count++;
	}
	obj.innerHTML="В чате ("+count+"): <b>"+online+"</b><br><br>";
}

//function f()
function f(room,cmd,nick,tonick,text,time,colornick,color,var9,var10,var11,var12,var13,var14) {
	if(cmd==6 || cmd==7) {if(invisible[nick]) return;}
	if(!smileon) text = text.replace(/<img src=(http\S+\.(?:gif|jpg)) onclick=\S+ title="(\s\S+\s)" style=cursor:pointer>/gim, '<a href=$1 target=_blank>$2</a>');
	symbol=""; if(nick==mynick) symbol="• "; if(tonick==mynick) symbol="» ";
	set_nick="<a href=# onclick='parent.sendto(\""+nick+": \"); return false;'><font color=#"+colornick+">"+nick+"</font></a>";
	if(cmd==0) wr(symbol+set_nick+": "+text+" ("+time+")");
	if(cmd==1 || cmd==2) wr(symbol+set_nick+":<b>(приватно)</b> "+text+" ("+time+")");
	if(cmd==3) wr(set_nick+":<b>(важно)</b> "+text+" ("+time+")");
	if(cmd==5) wr(set_nick+" "+deltxt[text]+" <b>"+tonick+"</b> ("+time+")");
	if(cmd==6) {if(text=='0') wr("<i>К нам приходит "+set_nick+" ("+time+")</i>");u[nick]=new Array(1,colornick); pr();}
	if(cmd==7) {if(text=='1') wr("<i>С нами прощается "+set_nick+" ("+time+")</i>");u[nick]=new Array(0,colornick); pr();}
}

//onload
function loadframes() {
	//display enter form
	if(mynick=='') {document.getElementById('enter').style.display='block'; return;}
	//get browser width
	var width=document.documentElement.clientWidth;
	if(!width) width=200; //alert(width);
	if(width>480) width=480; //alert(width+"x"+height);
	//display inchat form and set sizes
	document.getElementById('users').style.width=(width-20)+'px';
	document.getElementById('leftdiv').style.width=(width-20)+'px';
	document.getElementById('text0').style.width=(width-90)+'px';
	document.getElementById('inchat').style.display='block'; 
	/* Проверка непрерывного соединения */
	//interval=window.setTimeout('wr("<font color=red>Не удалось подключиться к движку чата.<br>Попробуйте использовать новый современный браузер <a href=https://www.google.com/chrome target=_blank>Google Chrome</a>.</font>");',10000);
  /* Загрузка движка сообщений */
	document.getElementById("leftdiv").innerHTML='Загрузка ...';
	loadengine();
}

/* Загрузка сообщений чата сразу после загрузки HTML */
if(document.addEventListener) document.addEventListener('DOMContentLoaded', loadframes, false);
else if(document.attachEvent) document.attachEvent('onreadystatechange', loadframes);

</script>

<script src=https://mpchat.com/engine.js></script>

<body id=body style='text-align:center;'>

<form id=enter action='' method=post style='text-align:center;display:none;'>
<b>Мобильная версия</b><br><br>
Ник<br>
<input type=text name=nick style='width:134px;'><br>
Пароль<br>
<input type=password name=pass style='width:134px;'><br>
<input type=submit value='Войти в чат' style='width:140px;'><br>
</form>

<iframe name=hidden width=0 height=0 style="display:none;"></iframe>
<form id=inchat name=fmsg action='index.php?inc=write' method=post  enctype="multipart/form-data" target=hidden onsubmit='return msg_send();' style='text-align:center;display:none;'>
<center>
<div id=leftdiv style='width:200px; padding:5px; border:1px gray solid;text-align:left;'>
Загрузка...
</div>
<script>
document.write("<input type=hidden name=nick value='"+parent.mynick+"'>");
</script>
<input type=hidden name=text>
<input id=text0 type=text name=text0 style='width:100px;' >
<input type=submit value='ОК' title='Отправить' class=btn>
<input type=submit value='@' title='Приватно' class=btn onclick="document.getElementById('text0').value='/privat '+document.getElementById('text0').value;">
<script>var smileon=0;</script>
<input type=submit value=':)' title='Отображать смайлы' class=btn onclick="if(smileon) {smileon=0; this.style.fontWeight='normal';} else {smileon=1; this.style.fontWeight='bold';}">
<div id=users style='width:200px; padding:5px; text-align:left;'></div>
</center>
</form>


</body>
</html>