<!DOCTYPE html>
<html>
<head> 
<META http-equiv=Content-Type content="text/html; charset=UTF-8">
<link rel=STYLESHEET type=text/css href=style.css>
<title>Приват с %pnick%</title>
<script src=http://mpchat.com/blank/translit.js></script>
<script>
/* Отправить сообщение */
function sendto(nick) { document.fmsg.text0.focus(); document.fmsg.text0.value=document.fmsg.text0.value + nick ;}
var oldmsg='';
function msg_send(msg) { 
	if(document.fmsg.trans.checked && msg) {
		for(i=0; i<engRegSmall.length; i++) msg = msg.replace(engRegSmall[i], rusSmall[i]);
		for(i=0; i<engRegBig.length; i++) msg = msg.replace(engRegBig[i], rusBig[i]);
	}	
	document.fmsg.text.value='/privat2 %pnick%: '+msg; 
	if (msg==oldmsg) {document.fmsg.text.value=''; alert('Повторять нехорошо!');}
	document.fmsg.text0.value='';
	document.fmsg.text0.focus();
	oldmsg=msg;
} 
/* Вывести сообщение */
function wr(text) {
var leftdiv=document.getElementById("leftdiv");
var div=document.createElement('div'); div.innerHTML=text; 
leftdiv.appendChild(div);
leftdiv.scrollTop=1000000;
document.fmsg.text0.focus();
}
/* Первое сообщение после загрузки */
function onload() {
	wr(opener.pt['%pnick%']);
}
</script>
</head> 
<body class=privat-body onload="onload();">

<!-- LEFT FRAME -->
<div id=leftdiv  style="position:absolute; overflow-y:scroll; left:5px; right:5px; top:5px; bottom:70px; padding-left:10px; border:1px gray solid;">

</div>

<!-- CHAT FRAME -->
<div id=chatdiv style='position:absolute; height:40px; left:5px; right:5px; bottom:5px; padding:10px; border:1px gray solid;'>
<form name=fmsg action=index.php?inc=write&nick=%nick%&id=%id% method=post target=hidden onsubmit="msg_send(text0.value);"> 
<b><span style='color:%color%'>%nick%:</span></b> 
<input name=text0 class=text style='width:70%;'> <input type=submit value=' >> ' class=ok style='width:40px;'><br>
<input type=hidden name=text> <input type=checkbox name=trans> - Транслит
</form>
</div>

</body>
</html>