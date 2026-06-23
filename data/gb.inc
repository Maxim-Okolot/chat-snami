<!DOCTYPE html>
<html>
<head>
<META http-equiv=Content-Type content='text/html; charset=UTF-8'>
<link rel="icon" href='/data/vhod/images/favicon.ico' type="image/x-icon">
<link rel="stylesheet" href="https://snami.mpchat.com/gb.css" type="text/css" media="all" />
<link id="style" rel="stylesheet" type="text/css" href="/2.css">

</head>
<body class=gb-body>
<span style='display:block;text-align:center'><b>Гостевая</b><br><br> 
<a href=#sendmess>Добавить сообщение</a><br><br>
<script>
/* Печатает строку */
function wr(text) {document.write(text);}

/* Обработчик ошибок */
if(error=='0') error="<span style='color:green'>Сообщение удачно отправленно!</span>";
if(error==1) error="<span style='color:red'>Ошибка удаления, попробуйте ещё раз!</span>";
if(error==2) error="<span style='color:red'>Ошибка, гостевая только для зарегистрированных, укажите пароль!</span>";
if(error==3) error="<span style='color:red'>Ошибка, этот ник зарегистрирован, пароль указан неверно!</span>";
if(error==4) error="<span style='color:red'>Ошибка длинны или синкаксиса ника!</span>";
if(error==5) error="<span style='color:red'>Ошибка длинны сообщения!</span>";
if(error==6) error="<span style='color:red'>Вы заблокированны администратором!</span>";
if(error==7) error="<span style='color:red'>Вы недавно уже отправили сообщение!</span>";
if(error==8) error="<span style='color:red'>Неверно введён код, попробуйте ещё раз!</span>";
if(error) wr(error+"<br><br>");

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
nick=g_p[num][1];
txt=g_p[num][2];
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
//etags[i]=new Array(/\[black\](.*?)\[\/black\]/g,'<span style='color:black'>$1</span>');i++;
etags[i]=new Array(/\[color=(#?[a-z0-9]{3,10})\](.*?)\[\/color\]/g,'<span style='color:$1'>$2</span>',1);i++;
etags[i]=new Array(/\[size=([1-9]{1})\](.*?)\[\/size\]/g,'<span style='font-size:$1'>$2</span>',1);i++;
etags[i]=new Array(/\[font=([A-z ]{3,20})\](.*?)\[\/font\]/g,'<span style='font-family:$1'>$2</span>',1);i++;
etags[i]=new Array(/\[sub\](.*?)\[\/sub\]/g,'<sub>$1</sub>');i++;
etags[i]=new Array(/\[sup\](.*?)\[\/sup\]/g,'<sup>$1</sup>');i++;
etags[i]=new Array(/\[hr\]/g,'<hr>');i++;
etags[i]=new Array(/\[left\](.*?)\[\/left\]/g,'<div style="float:left;padding: 4px 10px;">$1</div>');i++;
etags[i]=new Array(/\[right\](.*?)\[\/right\]/g,'<div style="float:right;padding: 4px 10px;">$1</div>');i++;
etags[i]=new Array(/\[center\](.*?)\[\/center\]/g,'<span style='display:block;text-align:center'>$1</span>');i++;
etags[i]=new Array(/\[img\](https?:\/\/[^ "]+?)\[\/img\]/,'<img src="$1" border=0 style="position:relative;">',1);i++; //одноразовая замена для лимита
etags[i]=new Array(/\[url=((ftp|https?):\/\/[^ "]+?)\](.*?)\[\/url\]/g,'<a href="$1" target=_blank>$3</a>');i++;
etags[i]=new Array(/\[url\]((ftp|https?):\/\/[^ "]+?)\[\/url\]/g,'<a href="$1" target=_blank>$1</a>');i++;
etags[i]=new Array(/\[email=([A-z0-9._-]+\@[A-z0-9.-]+?)\](.*?)\[\/email\]/g,'<a href="mailto:$1" target=_blank>$2</a>');i++;
etags[i]=new Array(/\[email\]([A-z0-9._-]+\@[A-z0-9.-]+?)\[\/email\]/g,'<a href="mailto:$1" target=_blank>$1</a>');i++; 
etags[i]=new Array(/\[quote\](.*?)\[\/quote\]/g,'<div style="background-color:eeeeee; border: 1px solid #000; margin:2px;padding:8px;">$1</div>',1);i++;
etags[i]=new Array(/\[quote=([^\] ]{2,30})\](.*?)\[\/quote\]/g,'<div style="background-color:eeeeee; border: 1px solid #000; margin:2px;padding:8px;"><b>$1</b> пишет:<br><br>$2</div>',1);i++;
etags[i]=new Array(/\[code\](.*?)\[\/code\]/g,'<div style="background-color:dddddd; border: 1px solid #000; margin:2px;padding:8px;"><b>Код:</b><br><br><div style="width:100%;overflow:auto;white-space:nowrap;">$1<br><br></div></div>',1);i++;


/* Для вывода кнопок BB-тегов */
var tags="";
tags+="<input title=жирный class=ok type=button value=' B ' onclick=ftags('[b]','[/b]') style='font-weight:bold'> ";
tags+="<input title=курсив class=ok type=button value=' I ' onclick=ftags('[i]','[/i]') style='font-style:italic'> ";
tags+="<input title=подчеркнуть class=ok type=button value=' U ' onclick=ftags('[u]','[/u]') style='text-decoration:underline'> ";
tags+="<input title=зачеркнуть class=ok type=button value=' S ' onclick=ftags('[s]','[/s]') style='text-decoration:line-through'> ";
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
tags+="<input title=влево class=ok type=button value=' &laquo; ' onclick=ftags('[left]','[/left]') style='font-weight:bold'> ";
tags+="<input title='по-центру' class=ok type=button value=' o ' onclick=ftags('[center]','[/center]') style='font-weight:bold'> ";
tags+="<input title=вправо class=ok type=button value=' &raquo; ' onclick=ftags('[right]','[/right]') style='font-weight:bold'> ";
tags+="<input title=черта class=ok type=button value='&mdash;' onclick=put('[hr]') style='font-weight:bold'> ";
tags+="<input title=код class=ok type=button value=' # ' onclick=ftags('[code]','[/code]') style='font-weight:bold'> ";
tags+="<input title=цитата class=ok type=button value='&ldquo; &bdquo;' onclick=ftags('[quote]','[/quote]') style='font-weight:bold'> ";
tags+="<input title=адрес class=ok type=button value='Url' onclick=ftags('[url]','[/url]')> ";
//tags+="<input title=картинка class=ok type=button value='Img' onclick=ftags('[img]','[/img]')> ";
tags+="<input id=trbutton type=button onclick='checktrans();' value='TR' title='Включить автоматическую транслитерацию Ctrl+Alt'> ";
tags+="<input class=ok type=button value=':)'  onclick='var obj=document.getElementById(\"smiles\"); if(obj.innerHTML) obj.innerHTML=\"\"; else obj.innerHTML=smiles;' > ";



/* Управление смайлами */
var i=0;
var smdir="http://mpchat.com/blank/img/smiles/";
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

/* Фильтрирует текст - смайлы, теги, ссылки, картинки */
/* img_max - макс. картинок к отображению в одном сообщении вместо ссылок */
var message_img_max=0; /* сообщение */
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

/* Подготовка сообщений и ссылок */
var posts=new Array();
var all_posts="";
for(var i=0; i<g_p.length;i++) {
mod="";
if(moderator==1) mod+="<input type=checkbox name='delpost["+g_p[i][9]+"]'><a href='?inc=gb&site="+site+"&delpost="+g_p[i][9]+"' onclick='return confirm(\"Вы действительно хотите удалить это сообщение?\");'><span class='low'>Удалить</span></a> | ";
mod+="<a href=# onclick='quote("+i+"); return false;'><span class='low'>Цитировать</span></a>";
avator="";if(g_p[i][5]) avator="<img src='"+g_p[i][5]+"' style='margin-top:5px;margin-bottom:5px;'>";
message=filter(g_p[i][2],message_img_max);
posts[i]="<table  width=500 align=center style='table-layout:fixed;'><tr><td class=title align=left width=150>"+g_p[i][3]+"<td class=title align=right> #"+g_p[i][0]+"</tr><tr><td width=150 valign=top align=left style=padding:10px;padding-left:4px;><a href=# onclick='put(\""+g_p[i][1]+", \"); return false;'><span style='color:"+g_p[i][4]+"'>"+g_p[i][1]+"</span></a>  [<a href=?inc=info&userid="+g_p[i][8]+" target=info>?</a>]<br>"+avator+"</td><td valign=top align=left style='padding:10px;word-wrap:break-word;'>"+message+"<tr><td align=left>"+g_p[i][6]+"<td align=right>"+mod+"</table><br>";
all_posts+=posts[i];
}
var links=genlinks("?inc=gb&site=",sites,site,1);

/* Вывод сообщений */
if(sites>0) {
if(moderator==1) wr("<form name=postsform action='' method=post style=display:inline>");
wr(links+'<br><br>');
wr(all_posts);
wr(links+'<br><br>');
if(moderator==1) wr("<input type=submit value='Удалить выбранные сообщения' class=ok></form><br><br>");
}

</script>

<form action='' name=form method=post>
<input type=hidden name=act value=add>
<table width=505>
<tr><td class=title><a name=sendmess></a>Добавить сообщение
<tr><td>
<script>
if(mynick!='' && myid!='') html="<input type=hidden name=nick value="+mynick+"><input type=hidden name=id value="+myid+"><b>"+mynick+"</b> <a href=?inc=gb&cookie_off=1>Выйти</a>";
else html=" Ник: <input type=text name=nick class=text size=15> Пароль: <input type=password name=pass class=text size=15 title='для зарегистрированных'> <input type=checkbox name=cookie_on> - запомнить";
document.write(html);
</script>
<tr><td><style>#tags {padding-bottom:3px;} #tags input {padding-left:4px; padding-right:4px;}</style><div id=tags><script>wr(tags);</script></div>
<textarea name=message wrap=virtual rows=5 style="width:99%;" onkeypress="if(enabletrans) return autotrans(this,event);" onkeydown="if(event.ctrlKey && event.altKey) {checktrans(); return false;}"></textarea>
<div id=smiles></div>
<tr><td>
<script>if(xcode && !myid) document.write('<img src=index.php?inc=code title="для незарегистрированных" align=absmiddle> <input type=text name=code class=text size=10>');</script>
<input type=submit value='Отправить сообщение' class=ok>
</td></tr>
</table>
</form><br>

Загружено за: <script>document.write(loadtime);</script>
</span>
</body>
</html>
