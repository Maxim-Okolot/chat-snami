<!DOCTYPE html>
<html>
<head>
<title>Форум чата "С нами"</title>
<meta charset="utf-8">
<link id="style" rel="stylesheet" type="text/css" href="/1.css">
<link rel="icon" href='/assets/img/favicon.ico' type="image/x-icon">
<script src="//mpchat.com/api.js"></script>
<script src="?inc=informer&jsonp=mp_init&getmsg=1&inchat=1&lastreg=10&counter=1&birthday=1"></script>

<script>
var mynick='';
var myid=0;
var loadtime='0';
var error='0';
var forum='0';
var topic='0';
var site='0';
var sites='0';
var mods='FunnyBunny, SweetBanny, PassionFlower';
var moderator='0';
var closedtopic='0';
var lasttopics='0';
var lastposts='0';
var search='';
var f_on=new Array();
f_on[0]=new Array('','0','0');

var f_f=new Array();
var f_t=new Array();
var f_p=new Array();
var top10 = (typeof top10 !== "undefined" && top10) ? top10 : new Array();
f_f[0]=new Array('1','Тестовый форум','Описание','','','','','','','','0','','');

var edittopic='';
var editmessage='';
var newpost='0';
</script>
</head>

<body class=forum-body>


<div style='width: 100% !important; min-height: 100%; margin:0 auto;'>

<div>
<center>
<header>
<br>
<center><img src="https://vmfile.com/upload/833/177832375.png"><br></center> 
</header> 
 
<script>
/* Поля для авторизации */
document.write("<table width=90%><tr><td align=center><form action='?inc=forum' method='post'>");
if(!mynick || !myid)  document.write("<b>Ник[<a href=?inc=reg target=_blank title='Зарегистрировать ник'>Р</a>]:</b> <input name=nick type=text size=15 class=text> <b>Пароль[<a href=?inc=mail target=_blank title='Выслать пароль'>?</a>]:</b> <input name=pass type=password  size=15 class=text> <input type=hidden name=cookie_on value=1> <input type=submit value='Войти' class=ok>");
else document.write("<b>Здравствуйте "+mynick+"!</b> <a href=?inc=forum&cookie_off=1>Выйти</a>");
document.write("<br><a href=?inc=forum&lasttopics=10>Последние активные темы</a> | <a href=?inc=forum&mark=readed>Отметить все темы как прочитанные</a> | <a href=# onclick='document.getElementById(\"searchform\").style.display=\"block\";return false;'>Поиск по темам</a><br><div id=searchform style='display:none;'>Поиск: <input type=text name=search class=text> <input type=submit class=ok value='Найти'></div></td></tr></form></table><br>");

/* Обработчик ошибок */
if(error==1) alert('Ошибка авторизации!');
if(error==2) alert('Вы заблокированы модератором!');
if(error==3) alert('Попытка флуда - не пишите так часто!');
if(error==4) alert('Нельзя писать в закрытой теме!');
if(error==5) alert('Нет доступа!');
if(error==6) alert('Нет доступа - только для авторизованных!');
if(error==7) alert('Нет доступа - только для модераторов!');
if(error==8) alert('Тема не найдена!');
if(error==9) alert('Раздел форума не найден!');

/* Печатает строку */
function wr(text) {document.write(text);}

/* Безопасное масштабирование изображений из BBCode */
function imgminimum(img) {
if(!img) return;
var maxW=500, maxH=500;
if(img.naturalWidth && img.naturalHeight) {
  var k=Math.min(maxW/img.naturalWidth, maxH/img.naturalHeight, 1);
  img.style.width=Math.round(img.naturalWidth*k)+"px";
  img.style.height=Math.round(img.naturalHeight*k)+"px";
}
}

/* Определение ранга по кол-ву сообщений*/
function rang(nick,c) {
st="<img src='https://vmfile.com/upload/833/673784209.png'/>";
if(c>100) st="<img src='https://vmfile.com/upload/833/2142366752.png'/>";
if(c>500) st="<img src='https://vmfile.com/upload/833/1722473825.png'/>";
if(c>1000) st="<img src='https://vmfile.com/upload/833/1300729506.png'/>";
if(c>2000) st="<img src='https://vmfile.com/upload/833/46536805.png'/>";
if(c>5000) st="<img src='https://vmfile.com/upload/833/3039746161.png'/>";
if(nick=="FunnyBunny") st="<img  src='https://vmfile.com/upload/833/1308842700.png'/>";
if(nick=="SweetBanny") st="<img  src='https://vmfile.com/upload/833/1308842700.png'/>";
if(nick=="PassionFlower") st="<img  src='https://vmfile.com/upload/833/1308842700.png'/>";
a=mods.split(", ");  
for(k=0; k<a.length; k++) if(nick==a[k]) st="<img  src='https://vmfile.com/upload/833/1308842700.png'/>";
if(status==9) st="<img src='/data/forum/ranks/vip.png'/>";
return "Ранг: "+st+"<br>";
}

/* Генерирует укороченные ссылки */
function genlinks(url,c,cur,r) {
var d=4; var tmp=""; var t=""; var last=0;
for(var i=0;i<c;i++) {
if(i!=0 && i!=c-1 && (cur-d>i || cur*1+d<i)) continue;
if(i==cur) t=" <b>"+(i+1)+"</b>"; else t=" <a href="+url+i+">"+(i+1)+"</a>";
if(i>last+1) {if(r) t=t+" ..."; else t=" ..."+t;} last=i;
if(r) tmp=t+tmp; else tmp+=t;}
return tmp;
}

/* Управление тегами */
function put(text) {document.form.message.value+=text;document.form.message.focus();}

function ftags(t1,t2) { 
var obj=document.getElementsByName("message")[0]; obj.focus();
var pos1 = obj.selectionStart, pos2 = obj.selectionEnd;
if(typeof(pos1)=="number") {
obj.value = obj.value.substring(0, pos1) + t1 + obj.value.substring(pos1, pos2) + t2 + obj.value.substring(pos2, obj.value.length);
var pos3=pos2+t1.length+t2.length; obj.setSelectionRange(pos3,pos3);
}
else if(document.selection) {
var range=document.selection.createRange();
range.text=t1+range.text+t2; range.select();
}
else obj.value += t1 + t2;
obj.focus();
}

function quote(num) {
a1=new Array('<br>','&quot;','&#039;','&#124;','&lt;','&gt;','&#92;','&#96;','&amp;');
a2=new Array('\r\n','"',"'",'|','<','>','\\','`','&');
nick=f_p[num][1];
txt=f_p[num][2];
for(i=0;i<a1.length;i++) txt=txt.split(a1[i]).join(a2[i]);
put("[quote="+nick.replace(/\]/g,"&#093;")+"] "+txt+" [/quote]");
}

/* Транслирует текст на русский по звучанию */
var tr={'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'jo','ж':'zh','з':'z','и':'i','й':'j','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'c','ш':'sh','щ':'w','ы':'y','ь':"'",'ъ':"''",'э':'je','ю':'ju','я':'ja'};
var enabletrans=0;
function checktrans() {
	var obj=document.getElementById('trbutton');
	if(enabletrans==1) {enabletrans=0; obj.style.fontWeight='normal';} 
	else {enabletrans=1; obj.style.fontWeight='bold';}
	document.getElementsByName('message')[0].focus();
}  
function autotrans(el,e) { 
	var e=e || window.event;
	var code = e.which; 
	if(typeof el.selectionStart != "number" || !((code>=65 && code<=123) || code==35 || code==39)) return true;
	var txt=String.fromCharCode(code); 
	var pos=el.selectionStart; 
	el.value=el.value.substr(0,el.selectionStart)+el.value.substr(el.selectionEnd);
	var pre=""; if(pos) {pre=el.value.substr(pos-1,1); if(tr[pre]) pre=tr[pre]; else pre="";}
	var pretxt = pre+txt; var r=""; var del=0;
	if(pretxt.length==2) for(k in tr) if(tr[k]==pretxt) {r=k; del=1; break;} 
	if(!r) for(k in tr) if(tr[k]==txt) {r=k; break;} 
	el.value=el.value.substr(0,pos-del)+r+el.value.substr(pos);
	pos=pos+1-del; el.setSelectionRange(pos, pos);
	return false; 
} 

/* Обработчик BB-тегов, ненужные закоментировать (шаблон, замена, повторно) */
var etags=new Array(); var i=0;
etags[i]=new Array(/\[b\](.*?)\[\/b\]/g,'<b>$1</b>');i++;
etags[i]=new Array(/\[i\](.*?)\[\/i\]/g,'<i>$1</i>');i++;
etags[i]=new Array(/\[u\](.*?)\[\/u\]/g,'<u>$1</u>');i++;
etags[i]=new Array(/\[s\](.*?)\[\/s\]/g,'<s>$1</s>');i++;
//etags[i]=new Array(/\[black\](.*?)\[\/black\]/g,'<font color=black>$1</font>');i++;
etags[i]=new Array(/\[color=(#?[a-z0-9]{3,10})\](.*?)\[\/color\]/g,'<font color="$1">$2</font>',1);i++;
etags[i]=new Array(/\[size=([1-9]{1})\](.*?)\[\/size\]/g,'<font size="$1">$2</font>',1);i++;
etags[i]=new Array(/\[font=([A-z ]{3,20})\](.*?)\[\/font\]/g,'<font face="$1">$2</font>',1);i++;
etags[i]=new Array(/\[sub\](.*?)\[\/sub\]/g,'<sub>$1</sub>');i++;
etags[i]=new Array(/\[sup\](.*?)\[\/sup\]/g,'<sup>$1</sup>');i++;
etags[i]=new Array(/\[hr\]/g,'<hr>');i++;
etags[i]=new Array(/\[left\](.*?)\[\/left\]/g,'<div style="float:left;padding: 4px 10px;">$1</div>');i++;
etags[i]=new Array(/\[right\](.*?)\[\/right\]/g,'<div style="float:right;padding: 4px 10px;">$1</div>');i++;
etags[i]=new Array(/\[center\](.*?)\[\/center\]/g,'<center>$1</center>');i++;
etags[i]=new Array(/\[img\](https?:\/\/[^ "]+?)\[\/img\]/,'<img src="$1"onload="imgminimum(this)" border=0 style="position:relative; max-width: 500px; max-height: 500px;">',1);i++; //одноразовая замена для лимита
etags[i]=new Array(/\[url=((ftp|https?):\/\/[^ "]+?)\](.*?)\[\/url\]/g,'<a href="$1" target=_blank>$3</a>');i++;
etags[i]=new Array(/\[url\]((ftp|https?):\/\/[^ "]+?)\[\/url\]/g,'<a href="$1" target=_blank>$1</a>');i++;
etags[i]=new Array(/\[email=([A-z0-9._-]+\@[A-z0-9.-]+?)\](.*?)\[\/email\]/g,'<a href="mailto:$1" target=_blank>$2</a>');i++;
etags[i]=new Array(/\[email\]([A-z0-9._-]+\@[A-z0-9.-]+?)\[\/email\]/g,'<a href="mailto:$1" target=_blank>$1</a>');i++;
etags[i]=new Array(/\[quote\](.*?)\[\/quote\]/g,'<div style="background-color:eeeeee; border: 1px solid #000; margin:2px;padding:8px;">$1</div>',1);i++;
etags[i]=new Array(/\[quote=([^\] ]{2,30})\](.*?)\[\/quote\]/g,'<div style="border: 1px solid rgb(201, 235, 216); box-shadow: rgb(0 0 0 / 7%) 0px 1px 6px; border-radius: 5px;"><div style="background: rgb(232, 245, 237); border-bottom: 1px solid rgb(201, 235, 210); padding: 5px 8px 5px 8px; color: rgb(105, 163, 139);"><b>$1</b> пишет:</div><div style="padding: 15px 10px 15px 10px;">$2</div></div>',1);i++;
etags[i]=new Array(/\[video\]https?:\/\/www.youtube.com\/watch\?v=([^&]*?)(&[^#&]*)?(#t=(.*?))?\[\/video\]/g,'<iframe width="560" height="315" src="//www.youtube.com/embed/$1?rel=0&amp;start=$4;theme=light" frameborder="0" allowfullscreen></iframe>');i++;
etags[i]=new Array(/\[play\](https?:\/\/[^ "]+\.(mp3|m4a|ogg|weba))\[\/play\]/i,'<audio src="$1" controls style="box-shadow: 0 0 10px rgb(0 0 0 / 10%);border-radius: 25px;margin-top: 10px;"></audio>'); i++;
etags[i]=new Array(/\[code\](.*?)\[\/code\]/g,'<div style="background-color:dddddd; border: 1px solid #000; margin:2px;padding:8px;"><b>Код:</b><br><br><div style="width:100%;overflow:auto;white-space:nowrap;">$1<br><br></div></div>',1);i++;
// 1. Обычные видео ВК (vk.com/video)
etags[i]=new Array(/\[vk\]https?:\/\/vk\.com\/video(-?\d+)_(\d+)(\?.*?)?\[\/vk\]/g,'<iframe src="https://vk.com/video_ext.php?oid=$1&id=$2" width="560" height="315" frameborder="0" allowfullscreen></iframe>');i++;
// 2. Клипы ВК (vk.com/clip)
etags[i]=new Array(/\[vk\]https?:\/\/vk\.com\/clip(-?\d+)_(\d+)(\?.*?)?\[\/vk\]/g,'<iframe src="https://vk.com/video_ext.php?oid=$1&id=$2" width="315" height="560" frameborder="0" allowfullscreen></iframe>');i++;
// 3. Видео через vkvideo.ru
etags[i]=new Array(/\[vk\]https?:\/\/vkvideo\.ru\/video(-?\d+)_(\d+)(\?.*?)?\[\/vk\]/g,'<iframe src="https://vk.com/video_ext.php?oid=$1&id=$2" width="560" height="315" frameborder="0" allowfullscreen></iframe>');i++;

/* Для вывода кнопок BB-тегов */
var tags="";
tags+="<select class=ok onchange='if(this.value) ftags(\"[color=\"+this.value+\"]\",\"[/color]\"); this.value=\"\";'><option value=''>-=цвет=-</option>";
tags+="<option value=black style='color:black'>черный</option>";
tags+="<option value=red style='color:red'>красный</option>";
tags+="<option value=blue style='color:blue'>синий</option>";
tags+="<option value=green style='color:green'>зелёный</option>";
tags+="<option value=orange style='color:orange'>оранжевый</option>";
tags+="<option value=yellow style='color:yellow'>желтый</option>";
tags+="<option value=purple style='color:purple'>фиолетовый</option>";
tags+="<option value=gray style='color:gray'>серый</option>";
tags+="</select> ";
tags+="<select class=ok onchange='if(this.value) ftags(\"[font=\"+this.value+\"]\",\"[/font]\"); this.value=\"\";'><option value=''>-=шрифт=-</option>";
tags+="<option value='Arial Black' style='font-family:Arial Black'>Arial Black</option>";
tags+="<option value='Comic Sans MS' style='font-family:Comic Sans MS'>Comic Sans MS</option>";
tags+="<option value='Andy_Bold' style='font-family:Andy_Bold'>Andy_Bold</option>";
tags+="<option value='lucidaconsole' style='font-family:lucidaconsole'>lucidaconsole</option>";
tags+="<option value='Monotype Corsiva' style='font-family:Monotype Corsiva'>Monotype Corsiva</option>";
tags+="<option value='Kapelka' style='font-family:Kapelka'>Kapelka</option>";
tags+="<option value='Times New Roman' style='font-family:Times New Roman'>Times New Roman</option>";
tags+="<option value='Sriracha' style='font-family:Sriracha'>Sriracha</option>";
tags+="<option value='Palatino Linotype' style='font-family:Palatino Linotype' >Palatino Linotype</option>";
tags+="<option value='Farabee' style='font-family:Farabee'>Farabee</option>";
tags+="<option value='Candara' style='font-family:Candara'>Candara</option>";
tags+="<option value='Montserrat' style='font-family:Montserrat'>Montserrat</option>";
tags+="<option value='Spectral' style='font-family:Spectral'>Spectral</option>";
tags+="<option value='Lobster' style='font-family:Lobster'>Lobster</option>";
tags+="<option value='Gunny Rewritten' style='font-family:Gunny Rewritten'>Gunny Rewritten</option>";
tags+="<option value='OldTown' style='font-family:OldTown'>OldTown</option>";
tags+="<option value='Equilibrist' style='font-family:Equilibrist'>Equilibrist</option>";
tags+="<option value='Bressay Trial' style='font-family:Bressay Trial'>Bressay Trial</option>";
tags+="</select> ";
tags+="<select class=ok onchange='if(this.value) ftags(\"[size=\"+this.value+\"]\",\"[/size]\"); this.value=\"\";'><option value=''>-=размер=-</option>";
tags+="<option value=1 >1</option>";
tags+="<option value=2 >2</option>";
tags+="<option value=3 >3</option>";
tags+="<option value=4 >4</option>";
tags+="<option value=5 >5</option>";
tags+="<option value=6 >6</option>";
tags+="</select><br>";
tags+="<input title=жирный class=ok type=button value='' onclick=ftags('[b]','[/b]') style='font-weight:bold; background-image: url(https://vmfile.com/upload/834/4004596064.png); background-position: 0 -42px; width: 15px;'> ";
tags+="<input title=курсив class=ok type=button value='' onclick=ftags('[i]','[/i]') style='font-style:italic; background-image: url(https://vmfile.com/upload/834/4004596064.png); background-position: 0 -68px; width: 15px;'> ";
tags+="<input title=подчеркнуть class=ok type=button value='' onclick=ftags('[u]','[/u]') style='text-decoration:underline; background-image: url(https://vmfile.com/upload/834/4004596064.png); background-position: 0 -93px; width: 15px;'> ";
tags+="<input title=зачеркнуть class=ok type=button value='' onclick=ftags('[s]','[/s]') style='text-decoration:line-through; background-image: url(https://vmfile.com/upload/834/4004596064.png); background-position: 0 -120px; width: 15px;'> ";
tags+="<input title=влево class=ok type=button value='' onclick=ftags('[left]','[/left]') style='font-weight:bold; background-image: url(https://vmfile.com/upload/834/4004596064.png); background-position: 0 -146px; width: 15px;'> ";
tags+="<input title='по-центру' class=ok type=button value='' onclick=ftags('[center]','[/center]') style='font-weight:bold; background-image: url(https://vmfile.com/upload/834/4004596064.png); background-position: 0 -172px; width: 15px;'> ";
tags+="<input title=вправо class=ok type=button value='' onclick=ftags('[right]','[/right]') style='font-weight:bold; background-image: url(https://vmfile.com/upload/834/4004596064.png); background-position: 0 -198px; width: 15px;'> ";
tags+="<input title=код class=ok type=button value='' onclick=ftags('[code]','[/code]') style='font-weight:bold; background-image: url(https://vmfile.com/upload/834/4004596064.png); background-position: 0 -380px; width: 15px;'> ";
tags+="<input title=цитата class=ok type=button value='' onclick=ftags('[quote]','[/quote]') style='font-weight:bold; background-image: url(https://vmfile.com/upload/834/4004596064.png); background-position: 0 -354px; width: 15px;'> ";
tags+="<input title=адрес class=ok type=button value='' onclick=ftags('[url]','[/url]') style='background-image: url(https://vmfile.com/upload/834/4004596064.png); background-position: 0 -224px; width: 16px;'>";
tags+="<input title=картинка class=ok type=button value='' onclick=ftags('[img]','[/img]') style='background-image: url(https://vmfile.com/upload/834/4004596064.png); background-position: 0 -276px; width: 16px; margin-left: 5px;'>  ";
tags+="<input class=ok type=button value=''  onclick='var obj=document.getElementById(\"smiles\"); if(obj.innerHTML) obj.innerHTML=\"\"; else obj.innerHTML=smiles;' style='background-image: url(https://vmfile.com/upload/834/4004596064.png); background-position: 0 -433px; width: 16px;'>   ";
tags+="<input title='скрытый текст' class=ok type=button value='' onclick=ftags('[hide]','[/hide]') style='background-image: url(https://vmfile.com/upload/834/4004596064.png); background-position: 0 -251px; width: 16px;'> ";
tags+="<input title='видеоролик с youtube' class=ok type=button value='' onclick=ftags('[video]','[/video]') style='background-image: url(https://vmfile.com/upload/834/4004596064.png); background-position: 0 -303px; width: 16px; '> ";
tags+="<input title='Плеер для mp3' class=ok type=button value='' onclick=ftags('[play]','[/play]') style='background-image: url(https://vmfile.com/upload/833/1135583547.png); width: 16px; background-repeat: no-repeat; background-position: 0px 7px;'> ";
// Добавьте эту строку в переменную tags (после кнопки [play])
tags+="<input title='Видео из ВКонтакте' class=ok type=button value='' onclick=ftags('[vk]','[/vk]') style='background-image: url(https://vmfile.com/upload/834/449478895.png); background-size: 14px; background-repeat: no-repeat; background-position: center; width: 16px;'> ";
tags+="<input title='Просмотр набранного сообщения' class=ok type=button value=''  onclick='view_mess();' style='background-image: url(https://vmfile.com/upload/834/4004596064.png); background-position: 0 -518px; width: 16px; height:16px'> ";

/* Управление смайлами */
var i=0;
var smdir="https://snami.mpchat.com/smile/";
var sm=new Array();
sm[i]=new Array('*1','1.gif');i++;
sm[i]=new Array('*2','2.gif');i++;
sm[i]=new Array('*3','3.gif');i++;
sm[i]=new Array('*4','4.gif');i++;
sm[i]=new Array('*5','5.gif');i++;
sm[i]=new Array('*6','6.gif');i++;
sm[i]=new Array('*7','7.gif');i++;
sm[i]=new Array('*8','8.gif');i++;
sm[i]=new Array('*9','9.gif');i++;
sm[i]=new Array('*10','10.gif');i++;
sm[i]=new Array('*11','11.gif');i++;
sm[i]=new Array('*12','12.gif');i++;
sm[i]=new Array('*13','13.gif');i++;
sm[i]=new Array('*14','14.gif');i++;
sm[i]=new Array('*15','15.gif');i++;
sm[i]=new Array('*16','16.gif');i++;
sm[i]=new Array('*17','17.gif');i++;
sm[i]=new Array('*18','18.gif');i++;
sm[i]=new Array('*19','19.gif');i++;
sm[i]=new Array('*20','20.gif');i++;


/* Для вывода смайлов */
var smiles="";
for(i=0;i<sm.length;i++) smiles+="<img src="+smdir+sm[i][1]+" onclick=put(this.title) title=' "+sm[i][0]+" ' style=cursor:pointer;> ";

/* Для вывода смайлов */
var smiles="";
for(i=0;i<sm.length;i++) smiles+="<img src="+smdir+sm[i][1]+" onclick=put(this.title) title=' "+sm[i][0]+" ' style=cursor:pointer;> ";

/* Фильтрирует текст - смайлы, теги, ссылки, картинки */
/* img_max - макс. картинок к отображению в одном сообщении вместо ссылок */
var message_img_max=1000; /* сообщение */
var signature_img_max=0; /* подпись */
function filter(text,img_max) { var img_c=0;
a=text.split("[code]"); for(k=1;k<a.length;k++) {a1=a[k].split("[/code]");a1[0]=a1[0].replace(/\[/g,'&#091;'); a[k]=a1.join('[/code]');} text=a.join('[code]'); //подготовка для code
for(k=0;k<etags.length;k++) {
if(etags[k][2]) 
  while(text.search(etags[k][0])>=0) {
    if(etags[k][1].search("<img")!=-1) {if(img_c<img_max) img_c++; else break; }
    text = text.replace(etags[k][0],etags[k][1]);  
  }
else text = text.replace(etags[k][0],etags[k][1]);
}
text=" "+text+" "; text=text.replace(/( |>)((ftp|https?):\/\/[^ "]+?)(?= |<)/g,'$1<a href="$2" target=_blank>$2</a>'); //автозамена ссылок
a=text.split(" "); for(k=0;k<a.length;k++) {for(j=0;j<sm.length;j++) if(a[k]==sm[j][0]) a[k]='<img src='+smdir+sm[j][1]+'>';} text=a.join(' '); //замена смайлов
return text;
}

/* Функция просмотра набранного сообщения*/
var smiles_value = "";
function view_mess()
{
  var mess = document.form.message;
  var mess_value = document.form.message.value;
  mess_value=filter(mess_value,message_img_max);
  mess_value=mess_value.replace(/\r?\n/g, '<br />');
  var obj=document.getElementById("smiles");
  if (mess.style.display != "none") {smiles_value=obj.innerHTML;mess.style.display = "none";obj.align="";obj.style.padding='10px';obj.style.border='#7897BB solid 1px';obj.innerHTML=mess_value;}
  else {obj.style.padding='';obj.style.border='';obj.align="center";obj.innerHTML=smiles_value;mess.style.display = "block";};
}

/* Голоса за сообщения в теме */
function forumVoteParseResponse(raw) {
  if (raw == null) return null;
  var text = String(raw).trim();
  if (!text) return null;
  /* Сервер иногда отдаёт корректный JSON и сразу после него целую HTML-страницу — тогда JSON.parse падает. */
  var cut = text.search(/<!doctype\b/i);
  if (cut >= 0) text = text.substring(0, cut).trim();
  try {
    return JSON.parse(text);
  } catch (e1) {}
  var start = text.indexOf("{");
  if (start < 0) return null;
  var depth = 0;
  var inStr = false;
  var esc = false;
  var q = "";
  for (var i = start; i < text.length; i++) {
    var ch = text.charAt(i);
    if (inStr) {
      if (esc) {
        esc = false;
      } else if (ch === "\\") {
        esc = true;
      } else if (ch === q) {
        inStr = false;
      }
      continue;
    }
    if (ch === '"' || ch === "'") {
      inStr = true;
      q = ch;
      continue;
    }
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        var slice = text.substring(start, i + 1);
        try {
          return JSON.parse(slice);
        } catch (e2) {
          return null;
        }
      }
    }
  }
  return null;
}

function forumVoteRequest(method, url, payload, onSuccess, onError, _isRetry) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) return;
    if (xhr.status === 404 && !_isRetry) {
      var fallbackUrl = url.replace("/forum_post_votes.php", "/index.php");
      if (fallbackUrl !== url) {
        forumVoteRequest(method, fallbackUrl, payload, onSuccess, onError, true);
        return;
      }
    }
    var data = forumVoteParseResponse(xhr.responseText);
    if (xhr.status >= 200 && xhr.status < 300 && data && data.success) {
      if (onSuccess) onSuccess(data);
      return;
    }
    if (onError) onError(data && data.error ? data.error : "Ошибка запроса");
  };
  xhr.send(payload ? JSON.stringify(payload) : null);
}

function renderForumPostVote(postId) {
  return "<div id='postVote_"+postId+"' style='margin-top:10px; border-top:1px dashed #d0d0d0; padding-top:6px; font-size:12px;'>"
    + "<a href=# id='postVoteHeartBtn_"+postId+"' title='Очень хорошо' onclick='setForumPostVote("+postId+",2); return false;' style='margin-right:12px; text-decoration:none;'>❤ <span id='postVoteHeart_"+postId+"'>0</span></a>"
    + "<a href=# id='postVoteUpBtn_"+postId+"' title='Хорошо' onclick='setForumPostVote("+postId+",1); return false;' style='margin-right:12px; text-decoration:none;'>👍 <span id='postVoteLike_"+postId+"'>0</span></a>"
    + "<a href=# id='postVoteDownBtn_"+postId+"' title='Плохо' onclick='setForumPostVote("+postId+",-1); return false;' style='text-decoration:none;'>👎 <span id='postVoteDislike_"+postId+"'>0</span></a>"
    + "<span id='postVoteHint_"+postId+"' style='margin-left:10px; color:#777;'></span>"
    + "</div>";
}

function paintForumPostVote(postId, stats) {
  var heartsNode = document.getElementById("postVoteHeart_" + postId);
  var likesNode = document.getElementById("postVoteLike_" + postId);
  var dislikesNode = document.getElementById("postVoteDislike_" + postId);
  var heartBtn = document.getElementById("postVoteHeartBtn_" + postId);
  var upBtn = document.getElementById("postVoteUpBtn_" + postId);
  var downBtn = document.getElementById("postVoteDownBtn_" + postId);
  if (!heartsNode || !likesNode || !dislikesNode || !heartBtn || !upBtn || !downBtn) return;

  heartsNode.innerHTML = stats.hearts || 0;
  likesNode.innerHTML = stats.likes || 0;
  dislikesNode.innerHTML = stats.dislikes || 0;
  heartBtn.style.fontWeight = (stats.my_vote == 2) ? "bold" : "normal";
  upBtn.style.fontWeight = (stats.my_vote == 1) ? "bold" : "normal";
  downBtn.style.fontWeight = (stats.my_vote == -1) ? "bold" : "normal";
  heartBtn.style.color = (stats.my_vote == 2) ? "#cc0f4f" : "";
  upBtn.style.color = (stats.my_vote == 1) ? "#0a8f39" : "";
  downBtn.style.color = (stats.my_vote == -1) ? "#bd1f1f" : "";
}

function loadForumPostVotes() {
  if (!(forum > 0 && topic > 0 && f_p && f_p.length > 0)) return;
  var ids = [];
  for (var i = 0; i < f_p.length; i++) {
    ids.push(f_p[i][0]);
  }
  var url = "?forum_api=get_post_votes&forum_id=" + encodeURIComponent(forum)
    + "&topic_id=" + encodeURIComponent(topic)
    + "&post_ids=" + encodeURIComponent(ids.join(","));

  forumVoteRequest("GET", url, null, function(resp) {
    if (!resp.stats) return;
    for (var pid in resp.stats) {
      if (!resp.stats.hasOwnProperty(pid)) continue;
      paintForumPostVote(pid, resp.stats[pid]);
    }
  });
}

function setForumPostVote(postId, voteType) {
  if (!mynick || !myid) {
    alert("Голосовать могут только авторизованные пользователи.");
    return;
  }
  forumVoteRequest("POST", "?forum_api=set_post_vote", {
    forum_id: forum,
    topic_id: topic,
    post_id: postId,
    vote: voteType
  }, function(resp) {
    if (resp && resp.stats) {
      paintForumPostVote(postId, resp.stats);
      var hint = document.getElementById("postVoteHint_" + postId);
      if (hint) {
        hint.innerHTML = "Оценка сохранена";
        setTimeout(function() { hint.innerHTML = ""; }, 1200);
      }
    }
  }, function(err) {
    alert(err || "Не удалось сохранить оценку");
  });
}

/* Загрузка форумов и селекта быстрого перехода, проверка доступа */
var forums=new Array();
var alltopics=0;
var allposts=0;
for(var i=0; i<f_f.length;i++) {
if(f_f[i][0]==forum) var fa=i;
icon="oldforumicon";
if(f_f[i][10]==1) icon='newforumicon';
if(f_f[i][8]==4) icon='closedforumicon';
moders='';
if(f_f[i][3]) moders='<br><i>Модераторы: '+f_f[i][3]+'</i>';
lasttopic=""; if(f_f[i][11]) lasttopic="<a href=?inc=forum&forum="+f_f[i][0]+"&topic="+f_f[i][11]+">"+f_f[i][12]+"</a><br>"+f_f[i][5]+" от "+f_f[i][4]+"";
forums[f_f[i][0]]="<tr><td width=20><div class="+icon+"></div></td><td align=left> <a href=?inc=forum&forum="+f_f[i][0]+" onclick='return access("+i+");'>"+f_f[i][1]+"</a><br>"+f_f[i][2]+moders+"</td><td align=center>"+f_f[i][6]+"</td><td align=center>"+f_f[i][7]+"</td><td>"+lasttopic+"</td></tr>";
alltopics+=f_f[i][6]*1;
allposts+=f_f[i][7]*1;
}

/* Проверка доступа к форуму */
function access(f_id) {
acc=f_f[f_id][8];
mod=f_f[f_id][3]; mod=mod.split(", ");ismod=0; for(i=0;i<mod.length;i++) if(mod[i]==mynick) ismod=1;
if(moderator==1) ismod=1;
if(acc==4) if(!mynick || !myid || !ismod) {alert("Чтение этого форума только для модераторов."); return false;}
if(acc==3) if(!mynick || !myid) {alert("Чтение этого форума только для зарегистрированных."); return false;}
return true;
}

/* ЧАСТЬ ПЕРВАЯ */
/* Отображение форумов */ 
if(forum==0 && topic==0 && lasttopics==0) {
  wr("<table width=90% align=center >");
  wr("<tr><td class=title colspan=2 style='border-radius: 5px 0 0 0;  border-left: none;'>Раздел о чате</td><td width=60 class=title align=center>Тем</td><td width=60 class=title align=center>Ответов</td><td width=30% class=title style='border-radius: 0 5px 0 0;'>Обновления</td></tr>");
  
  if(1) {
    // Основной раздел //
    if(forums[1]) wr(forums[1]);
    if(forums[2]) wr(forums[2]);
    if(forums[5]) wr(forums[5]);
    if(forums[6]) wr(forums[6]);
    if(forums[11]) wr(forums[11]);
  }
  
  wr("<tr><td class=title colspan=2 style='border-radius: 5px 0 0 0;  border-left: none;'>Радио чата</td><td width=60 class=title align=center>Тем</td><td width=60 class=title align=center>Ответов</td><td width=30% class=title style='border-radius: 0 5px 0 0;'>Обновления</td></tr>");
  
  if(1) {
    // Радио чата //
    if(forums[3]) wr(forums[3]);
    if(forums[4]) wr(forums[4]);
  }
  
  wr("<tr><td class=title colspan=2 style='border-radius: 5px 0 0 0;  border-left: none;'>Досуг</td><td width=60 class=title align=center>Тем</td><td width=60 class=title align=center>Ответов</td><td width=30% class=title style='border-radius: 0 5px 0 0;'>Обновления</td></tr>");
  
  if(1) {
    // Досуг //
    if(forums[7]) wr(forums[7]);
    if(forums[8]) wr(forums[8]);
    if(forums[9]) wr(forums[9]);
    if(forums[10]) wr(forums[10]);
    if(forums[12]) wr(forums[12]);
    if(forums[13]) wr(forums[13]);
  }
  else {
    for(x in forums) {
      if(forums[x]) wr(forums[x]);
    }
  }
  wr("</table><br>");
}

/* ЧАСТЬ ВТОРАЯ */
/* Отображение тем в форуме */
else if(forum>0 && topic==0 || lasttopics>0) {
/* функция - форма для переноса темы */
function movehtml(id) {
var elem=document.getElementById("move"+id);
var html="<form action=?inc=forum&forum="+forum+"&movetopic="+id+" method=post style=display:inline><select name=toforum class=text><option value=0>-=выбрать форум=-";
for(var i=0; i<f_f.length;i++) html+="<option value="+f_f[i][0]+">"+f_f[i][1];
html+="</select> <input type=checkbox name=leave title='оставить переадресацию темы'> - переадресация <input type=submit value=ok class=ok></form>";
elem.innerHTML=html;
}
var topics=new Array();
var all_topics="";
for(var i=0; i<f_t.length;i++) {
icon='oldicon';toclose='закрыть';topinne='закрепить';
if(f_t[i][7]==1) {icon='pinnedicon';topinne='снять закрепление';}
if(f_t[i][8]==1) {icon='closedicon';toclose='открыть';}
if(f_t[i][9]>0) icon='movedicon';
if(f_t[i][10]==1) icon='newicon';
mod=''; 
if(moderator==1) {
mod+=" - <a href=?inc=forum&forum="+forum+"&deltopic="+f_t[i][0]+" onclick='return confirm(\"Вы действительно хотите удалить эту тему?\");'><font class=low>удалить</a>";
mod+=" - <a href=?inc=forum&forum="+forum+"&closetopic="+f_t[i][0]+"><font class=low>"+toclose+"</a>";
mod+=" - <a href=?inc=forum&forum="+forum+"&pinnetopic="+f_t[i][0]+"><font class=low>"+topinne+"</a>";
if(!f_t[i][9]) mod+=" - <a href=# onclick=\"movehtml('"+f_t[i][0]+"'); return false;\"><font class=low>перенести</font></a><div id=move"+f_t[i][0]+"></div>";
}
t_links=""; s=++f_t[i][6]; if(s>10) t_links=" - ["+genlinks("?inc=forum&forum="+f_t[i][11]+"&topic="+f_t[i][0]+"&site=",Math.ceil(s/10),-1)+"]";
if(f_t[i][9]) is_moved="Перенесенна: "; else is_moved="";
topics[i]="<tr><td width=20><div class="+icon+"></div></td><td align=left>"+is_moved+"<a href=?inc=forum&forum="+f_t[i][11]+"&topic="+f_t[i][0]+">"+f_t[i][1]+"</a> "+t_links+"<br>"+f_t[i][3]+mod+"</td><td>"+f_t[i][2]+"</td><td align=center>"+f_t[i][6]+"</td><td>"+f_t[i][4]+"<br>"+f_t[i][5]+"</td></tr>";
all_topics+=topics[i];
}
if(f_t.length==0) {all_topics="<tr><td colspan=5 align=center>В этом форуме нет тем.</td></tr>";sites=1;}
if(f_t.length==0 && search) {all_topics="<tr><td colspan=5 align=center>Ничего не найдено!</td></tr>";sites=1;}
var links=genlinks("?inc=forum&forum="+forum+"&site=",sites,site); 

if(search) panel="<table width=90%><tr><td style='border:0px;' align=left><a href=?inc=forum>Forum</a> » <b>Результаты поиска</b></tr></table><br>";
else if(lasttopics>0) panel="<table width=90%><tr><td style='border:0px;' align=left><a href=?inc=forum>Forum</a> » <b>Последние активные темы</b></tr></table><br>";
else panel="<table width=90%><tr><td style='border:0px;' align=left><a href=?inc=forum>Forum</a> » <a href=?inc=forum&forum="+forum+"><font color=#B00000>"+f_f[fa][1]+"</font></a> » <a href=#sendmess><font color=green>Создать новую тему</font></a><td align=right style='border:0px;'>Страницы: "+links+"</tr></table><br>";
wr(panel);
wr("<table width=90% align=center >");
wr("<tr><td colspan=2 class=title>Тема</td><td width=100 class=title>Автор</td><td width=60 class=title align=center>Ответов</td><td width=150 class=title>Обновления</td></tr>");
wr(all_topics);
wr("</table><br>");
wr(panel);
}

/* ЧАСТЬ ТРЕТЬЯ */
/* Отображение сообщений в теме */
else if(forum>0 && topic>0) {
var posts=new Array();
var all_posts="";
for(var i=0; i<f_p.length;i++) {
num=site*10+i+1;
isonline="<font color=red>Неактивен</font>"; 
for(k=0;k<f_on.length;k++) if(f_on[k][0]==f_p[i][1]) isonline="<font color=green>Активен</font>";
mod="";
if(f_p[i][4]) mod+="<i style='float:left;'>Отредактированно в "+f_p[i][5]+" - "+f_p[i][4]+"</i>";
if(moderator==1 && num>1) mod+="<input type=checkbox name='delpost["+f_p[i][0]+"]'><a href=?inc=forum&forum="+forum+"&topic="+topic+"&site="+site+"&delpost="+f_p[i][0]+" onclick='return confirm(\"Вы действительно хотите удалить это сообщение?\");'><font class=low>Удалить</font></a> | ";
if(mynick==f_p[i][1] || moderator==1) mod+="<a href=?inc=forum&forum="+forum+"&topic="+topic+"&site="+site+"&editpost="+f_p[i][0]+"><font class=low>Редактировать</font></a> | ";
if(mynick && myid) mod+="<a href=# onclick='quote("+i+"); return false;'><font class=low>Цитировать</font></a>";
avator=""; if(f_p[i][8]) avator="<img src="+f_p[i][8]+" style='margin-top:5px;margin-bottom:5px;'><br>";
name=""; if(f_p[i][11]) name="Имя: "+f_p[i][11]+"<br>";
mw=""; if(f_p[i][12]=='0') mw="Пол: мужской<br>"; if(f_p[i][12]=='1') mw="Пол: женский<br>";

message=filter(f_p[i][2],message_img_max);
if(f_p[i][10]) message+="<div class=signature><hr></div>"+filter(f_p[i][10],signature_img_max);
posts[i]="<table  width=90% align=center style='table-layout:fixed;'><tr><td class=title width=150 align=left><a name=post"+f_p[i][0]+" href=?inc=forum&forum="+forum+"&topic="+topic+"&post="+f_p[i][0]+"#post"+f_p[i][0]+" class=title>"+f_p[i][3]+"</a></td><td class=title align=right> #"+num+"</td></tr><tr><td width=150 valign=top align=left style=padding-top:10px;><a href=# onclick='put(\""+f_p[i][1]+", \"); return false;'>"+f_p[i][1]+"</a> [<a href=?inc=info&userid="+f_p[i][13]+" target=info>?</a>]<br>"+avator+name+mw+rang(f_p[i][1],f_p[i][7])+"Сообщений:"+f_p[i][7]+"<br>  <a href=?inc=post&act=new&nick="+mynick+"&id="+myid+"&tonick="+f_p[i][1]+"  target=pm><font class=low>Написать письмо</font></a><br><font class=low>"+f_p[i][6]+"</font>&nbsp;</td><td valign=top align=left style='padding:10px; word-wrap: break-word;'>"+message+renderForumPostVote(f_p[i][0])+"<tr><td align=left>"+isonline+"<td align=right>"+mod+"</td></tr></table><br>";
all_posts+=posts[i];
}
var links=genlinks("?inc=forum&forum="+forum+"&topic="+topic+"&site=",sites,site); 
panel="<table width=90%><tr><td style='border:0px;' align=left><a href=?inc=forum>Forum</a> » <a href=?inc=forum&forum="+forum+">"+f_f[fa][1]+"</a> » <a href=?inc=forum&forum="+forum+"&topic="+topic+"><font color=#B00000>"+f_ta[1]+"</font></a> » <a href=#sendmess><font color=green>Написать ответ</font></a><td align=right style='border:0px;'>Страницы: "+links+"</tr></table><br>";

if(moderator==1) wr("<form name=postsform action='' method=post style=display:inline>");



wr(panel);
wr(all_posts);
loadForumPostVotes();
wr(panel);
if(moderator==1) wr("<input type=submit value='Удалить выбранные сообщения' class=ok></form><br><br>");
}
/* КОНЕЦ ЧАСТИ */

/* Отображение формы для создания тем, сообщений и их редактирования */
if(closedtopic==1 && moderator==0) wr("<center><a name=sendmess></a><b>Эта тема закрыта, вы не можете здесь отправить сообщение!</b></center><br>");
else if(forum>0 && topic>0 && f_f[fa][8]==2 && moderator==0) wr("<center><a name=sendmess></a><b>Этот раздел только для модераторов!</b></center><br>");
else if(forum>0 && topic==0 && (f_f[fa][8]==1 || f_f[fa][8]==2) && moderator==0) wr("<center><a name=sendmess></a><b> Создание тем в этом разделе только для модераторов!</b></center><br>");
else 
if(forum>0 && mynick && myid) {
wr("<form name=form action='' method='post'>");
wr("<input name=nick type=hidden value="+mynick+"><input name=id type=hidden value="+myid+">");
wr("<table width=540 align=center>");
if(topic==0) {if(editmessage) atitle="Редактировать тему"; else atitle="Создать новую тему";}
else {if(editmessage) atitle="Редактировать сообщение"; else atitle="Написать ответ";}
wr("<tr><td class=title align=left><a name=sendmess></a>"+atitle);
if(editmessage) wr("<input name=toedit type=hidden value=1>");
if(topic==0 || edittopic) wr("<tr><td align=left>Заголовок<br><input name=newtopic class=text style='width:99%;' maxlength=50 value='"+edittopic+"'>");
wr("<tr><td><style>#tags {padding-bottom:3px;} #tags input {padding-left:4px; padding-right:4px;}</style><div id=tags>"+tags+"</div><textarea style='width:99%;' rows=10 name=message class=text  onkeypress='if(enabletrans) return autotrans(this,event);' onkeydown='if(event.ctrlKey && event.altKey) {checktrans(); return false;}'>"+editmessage+"</textarea><div id=smiles align=center></div>");
wr("<tr><td><input type=submit value='Отправить сообщение' class=ok></table>");
wr("</form><br>");
}
 
/* Отображение быстрого перехода по форумам */
wr("<select onchange='location.href=\"?inc=forum&forum=\"+this.value;' class=text><option value=0>-=выбрать форум=-")
for(var i=0; i<f_f.length;i++) wr("<option value="+f_f[i][0]+">"+f_f[i][1]);
wr("</select><br>");

/* Вывод юзеров Он-Лайн - Общая статистика */
var guests=0;
var regusers=0;
var nickson="";
var for_name = "";
var title_txt = "сейчас смотрит разделы на форуме";
wr("<br><div class='box_bottom'><table  width='90%' align=center style='border-radius: 6px;'><tr><td class=title align=left style='border-radius: 5px 5px 0 0; border-left:none;'>Статистика форума</td></tr><tr><td align=left>")
for(i=0;i<f_on.length;i++) {
if(f_on[i][0]) {
 if(f_on[i][1] && forum>0 && topic==0){
    for(var x=0; x<f_f.length;x++) {
        if(f_f[x][0] == f_on[i][1]) {
          for_name=f_f[x][1];
        }
    }
title_txt = "сейчас смотрит темы в форуме "+for_name;
}

if(f_on[i][1] && forum>0 && topic>0){
        if(f_ta[8] == f_on[i][2]) {
          for_name=f_ta[1];
    }
title_txt = "сейчас читает ответы в теме "+for_name;
}

    regusers++; if(nickson) nickson+=', '; ishere=''; if(forum!=f_on[i][1] || topic!=f_on[i][2]) ishere='<font color=gray>'; nickson+='<a href=/info/'+f_on[i][0]+' target=_chat title="'+title_txt+'">'+ishere+f_on[i][0]+'</font></a>'; 
 }
else guests++;
}
wr('<div style="float:left;">Гости: <b>'+guests+'</b><br>');
wr('Участники: <b>'+regusers+'</b><br>');
if(nickson) wr('Онлайн: '+nickson+'<br>');
wr('</div><div style="float:right;">Всего тем: <b>'+alltopics+'</b><br>Всего ответов: <b>'+allposts+'</b><br>');
wr('Новых ответов: <b>'+lastposts+'</b></div><br style="clear:both;">');
wr('</table>'); 
wr('<div class="h_utop_b">');
wr('<div class="h_utop_t">Рейтинг 10-ка</div>');
wr('<div class="h_utop">');
var htmls="";
if(top10 && top10.length>1) {
for(i=1;i<top10.length;i++) {
document.write('<div class="hs_pos" id="hs_'+top10[i][2]+'"><span class="hs_p"></span><span class="hs_t">'+top10[i][2]+'-е место<br/><b>'+top10[i][3]+'</b></span><div class="hu_s hu_'+top10[i][2]+'" onmouseover="utop('+top10[i][2]+')"><div><a href="" title="'+top10[i][0]+'">'+top10[i][1]+'</a></div></div></div>');
}
} else {
wr('<div class="u_noclan_text" style="text-align:center;">Рейтинг пока недоступен</div>');
}
wr('</div></div>');
wr('</div>');

function utop(nm) {
    $('#hs_1,#hs_2,#hs_3,#hs_4,#hs_5,#hs_6,#hs_7,#hs_8,#hs_9,#hs_10,#hs_11').attr('class','hs_pos');
    $('#hs_'+nm).addClass('hs_active');
} 
if(top10 && top10.length>1) utop(1);


/* Перенаправление вниз для редактирования */
if(editmessage) {scroll(0,100000);scroll(0,100000);}

/* Скрытия кнопки просмотра набранного сообщения*/
document.addEventListener("DOMContentLoaded", function () {
    button = document.querySelector("#view");
    textarea = document.querySelector("#message");

    if (textarea && button) {
        textarea.oninput = function () {
            if (this.value === "") return (button.style.display = "none");
            button.style.display = "block";
        };
    }
});
</script>

<script>
// Dark Mode
(function() {
  var theme = localStorage.getItem('forum_theme') || 'light';
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
  }
  
  var btn = document.createElement('button');
  btn.className = 'theme-toggle';
  btn.innerHTML = theme === 'dark' ? '☀️ Светлая' : '🌙 Темная';
  btn.onclick = function() {
    document.body.classList.toggle('dark-mode');
    var isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('forum_theme', isDark ? 'dark' : 'light');
    this.innerHTML = isDark ? '☀️ Светлая' : '🌙 Темная';
  };
  document.body.appendChild(btn);
})();
</script>



</body>
</html>
