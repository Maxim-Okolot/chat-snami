%include=header.html%

<span style='display:block;text-align:center'>

<script>
var out="";
if(grund=="нет") grund=""; else grund=" Причина: "+grund+". ";
if(act=='kill') {
	if(timeout==1440) timeout="на день"; 
	if(timeout==10080) timeout="на неделю"; 
	if(timeout==302400) timeout="на месяц"; 
	if(timeout>1000000) timeout="навсегда"; 
	if(timeout<61) timeout="на "+timeout+" минут";
	out="<span style='color:red'>Вы удалены <b>"+timeout+"</b> и сможете вернуться в чат только по отмене бана админом!<br>"+grund+"</span><br><a href=prav.html>читайте правила</a>";
}
if(act=='window')	{out="<span style='color:red'>Вы провинились и поэтому будете закиданы окнами!<br>"+grund+"<br></span><br><a href=prav.html>читайте правила</a>";window.setTimeout("window.open('http://mpchat.com/chat/index/window.html');",500); while(1) alert('Вы провинились и поэтому будете закиданы окнами!');}
if(act=='prav') 	{out="<span style='color:red'>Вас выпнули, ведите себя прилично!<br>"+grund+"</span><br><a href=prav.html>читайте правила</a>";}
if(out=="" && nick) {out="<button class=btn-animate class=btn-signinПока> <b>"+nick+"</b>! Приходи ещё!</button><br><a href=./ button class=btn-animate class=btn-signin>Вернуться в чат</button></a><br>";}
document.write(out);
</script>
<br>
<br>
<br>
<br>

</span>

