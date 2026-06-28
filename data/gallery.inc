<!DOCTYPE html>
<html lang="ru">
<head>
  <script src="/assets/js/site-theme-boot.js"></script>
  <meta charset="utf-8">
  <title>Фотогалерея — Чат «С нами»</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#4a90e2">
  <meta name="color-scheme" content="light dark">
  <link rel="icon" href="/assets/img/favicon.ico" type="image/x-icon">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/gallery.css">
  <link rel="stylesheet" href="/assets/css/site-theme.css">
  <base href="./">
  <script src="//mpchat.com/api.js"></script>
  <script src="?inc=informer&jsonp=mp_init&getmsg=1&inchat=1&lastreg=10&counter=1&birthday=1"></script>
</head>
<body class="gallery-body">
  <div class="gallery-brand">
    <a href="index.php">Чат «С нами»</a>
  </div>
  <div class="gallery-shell">
    <center>
    <script>


/* Печатает строку */
function wr(text) {document.write(text);}

/* Обработчик ошибок загрузки фото */
if(error=='0') error="<font color=green>Сообщение удачно отправленно!</font>";
if(error==1) error="<font color=red>Ошибка удаления, попробуйте ещё раз!</font>";
if(error==2) error="<font color=red>Ошибка, только для зарегистрированных, укажите правильный пароль!</font>";
if(error==3) error="<font color=red>Ошибка, этот ник зарегистрирован, пароль указан неверно!</font>";
if(error==4) error="<font color=red>Ошибка длинны или синкаксиса ника!</font>";
if(error==5) error="<font color=red>Введите сообщение!</font>";
if(error==6) error="<font color=red>Вы заблокированны администратором!</font>";
if(error==7) error="<font color=red>Вы недавно уже отправили сообщение!</font>";
if(error==8) error="<font color=red>Невозможно загрузить фотографию, слишком большая или неправильный формат!</font>";
if(error==9) error="<font color=red>Вы неможете загружать так много фотографий - удалите ненужные!</font>";
if(error==10) error="<font color=green>Фотография удачно загруженна!</font>";
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

/* Транслирует на русский весь или только выделенный текст */
function translate(msg) {
for (i=0; i<engRegSmall.length; i++) {msg = msg.replace(engRegSmall[i], rusSmall[i])}
for (i=0; i<engRegBig.length; i++) {msg = msg.replace(engRegBig[i], rusBig[i])}
return msg;
}
function translateall(){
var obj=document.getElementsByName("message")[0]; obj.focus();
var pos1 = obj.selectionStart, pos2 = obj.selectionEnd;
if(typeof(pos1)=="number") {
obj.value = obj.value.substring(0, pos1) + translate(obj.value.substring(pos1, pos2)) + obj.value.substring(pos2, obj.value.length);
obj.setSelectionRange(pos2,pos2);
}
else if(document.selection) {
var range=document.selection.createRange();
if(range.text) range.text=translate(range.text); 
else obj.value=translate(obj.value);
range.select();
}
else {obj.value=translate(obj.value);}
}

/* Обработчик BB-тегов */
var etags=new Array(); var i=0;
etags[i]=new Array(/\[b\](.*?)\[\/b\]/g,'<b>$1</b>');i++;
etags[i]=new Array(/\[i\](.*?)\[\/i\]/g,'<i>$1</i>');i++;
etags[i]=new Array(/\[u\](.*?)\[\/u\]/g,'<u>$1</u>');i++;
etags[i]=new Array(/\[s\](.*?)\[\/s\]/g,'<s>$1</s>');i++;
etags[i]=new Array(/\[color=(#?[a-z0-9]{3,10})\](.*?)\[\/color\]/g,'<font color="$1">$2</font>',1);i++;
etags[i]=new Array(/\[size=([1-9]{1})\](.*?)\[\/size\]/g,'<font size="$1">$2</font>',1);i++;
etags[i]=new Array(/\[font=([A-z ]{3,20})\](.*?)\[\/font\]/g,'<font face="$1">$2</font>',1);i++;
etags[i]=new Array(/\[sub\](.*?)\[\/sub\]/g,'<sub>$1</sub>');i++;
etags[i]=new Array(/\[sup\](.*?)\[\/sup\]/g,'<sup>$1</sup>');i++;
etags[i]=new Array(/\[hr\]/g,'<hr>');i++;
etags[i]=new Array(/\[left\](.*?)\[\/left\]/g,'<div style="float:left;padding: 4px 10px;">$1</div>');i++;
etags[i]=new Array(/\[right\](.*?)\[\/right\]/g,'<div style="float:right;padding: 4px 10px;">$1</div>');i++;
etags[i]=new Array(/\[center\](.*?)\[\/center\]/g,'<center>$1</center>');i++;
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
tags+="<input title='на русский' class=ok type=button value='Ru'  onclick='translateall();' > ";
tags+="<input class=ok type=button value='Смайлы'  onclick='var obj=document.getElementById(\"smiles\"); if(obj.innerHTML) obj.innerHTML=\"\"; else obj.innerHTML=smiles;' > ";


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

/* Функция формирования информации о фотографии */
function fotoinfo(x, link) {
var info="";
if(x[3]) info+=x[3]+"<br>";
info+="<a href=?inc=gallery&gallery="+x[8]+">"+x[2]+"</a>";
info+="<br>"+x[1]+"<br>";
var zvezda = "";
if(x[4]>0) {ball=Math.round(x[5]/x[4]*10)/10;for(var i=0; i<ball; i++){zvezda+="<img width=20 src=https://soulty.ru/img/status/orange_status.gif >"};info+=""+zvezda+" <div style='display:flex; justify-content: center;'><div class='like_count' style='margin-right: 15px;'><img src=https://soulty.ru/img/likeAnimation.gif width=25px /> <span <a style='color: #979797; font-weight: normal; font-family: Kurale; font-size: 18px;'>  "+x[4]+"</span></div>";};
if(link && x[6])
 info+="<div class='like_count' style='width: 50px;'><font style='cursor:pointer;' title='Последний: "+x[7]+"'><a style='color: #979797; font-weight: normal; font-size: 18px !important;' href='"+link+"'> <img src=https://soulty.ru/img/comments.png width=25px /> "+x[6]+"</a></font></div></div><br>";
else if(x[6])
	info+="<div class='like_count' style='width: 50px'><font style='cursor:pointer; color: #979797; font-weight: normal; font-size: 18px !important;' title='Последний: "+x[7]+"'><img src=https://soulty.ru/img/comments.png width=25px /> "+x[6]+"</font></div></div><br>";
return info;
}

/* Печатает ссылку на галерею с всеми фотографиями */
wr("<a href=?inc=gallery class='gallery-home-link'><b>Галерея чата ("+gal_c+")</b></a><br><br>");

/* Печатает алфавит галерей для режима загрузки юзерами */
if(gal_upload>0) {
wr("<div class='gallery-abc'>");
sym="0-9"; if(g_a[sym]) sym="<a href=?inc=gallery&abc="+sym+" title='Галерей: "+g_a[sym]+"'>"+sym+"</a>"; wr(sym+" ");
for(var i=65;i<1072;i++) {
sym=String.fromCharCode(i); 
if(g_a[sym]) sym="<a href=?inc=gallery&abc="+sym+" title='Галерей: "+g_a[sym]+"'>"+sym+"</a>"; wr(sym+" ");
if(i==90) {i=1039;wr("<br>");}
}
wr("</div><br>");
}

/* ФОРМИРОВАНИЕ ГАЛЕРЕИ */

/* Печатает список галерей */
if(g_g.length) {
wr("<div class='gallery-albums'>");
for(var i=0;i<g_g.length;i++) wr("<a href='?inc=gallery&gallery="+g_g[i][2]+"'>"+g_g[i][0]+"("+g_g[i][1]+")</a> ");
wr("</div><br>");
}

/* Печатает название актуальной галереи */
if(gallery) wr("<b>"+galleryname+"</b><br><br>");

if(!afoto) {
/* Вывод мини-фотографий выбранной галереи или последние добавления */
if(!g_f.length) wr("<font color=red>Фотографии не найденны!</font><br><br>");
else {
var sites=Math.ceil(gal_ac/gal_ps);
var links=mp_genlinks("?inc=gallery&gallery="+gallery+"&site=",sites,site);
var tr=5;
var atr=0;
wr("<div class='gallery-pager'>"+links+"</div><br><table class='table_gal' id='gitems'>");
for(var i=0;i<g_f.length;i++) {if(atr==0) wr("<tr>");atr++;if(atr==5) atr=0;
if(moderator==1) todel="<div><a href='?inc=gallery&gallery="+gallery+"&delfoto="+g_f[i][0]+"' onclick='return confirm(\"Вы действительно хотите удалить эту фотографию?\");' class=low><img src='https://soulty.ru/img/button_del.jpg' width=40px/></a></div><br>"; else todel="";
wr("<td align=center valign=top><a href='?inc=gallery&gallery="+gallery+"&foto="+g_f[i][0]+"'><img class='photo_2' src=data/gallery/image/"+g_f[i][0]+".jpg border=0 ></a><br>"+fotoinfo(g_f[i], "?inc=gallery&gallery="+gallery+"&foto="+g_f[i][0])+todel+"</td>");
}
wr("</table><br><div class='gallery-pager'>"+links+"</div><br>");
}
/* Форма для загрузки фото пользователями если вкл. */
if(gal_upload>0) {
wr("<form action='' class='form' name=upload method=post enctype=multipart/form-data onsubmit='this.submit.value=\"Подождите ...\";this.submit.disabled=true;'>");
wr("<table><tr><td class=title>Загрузить свою фотографию <tr><td>");
if(mynick!='' && myid!='') html="<input type=hidden name=nick value="+mynick+"><input type=hidden name=id value="+myid+"><b>"+mynick+"</b> (<a href=?inc=gallery&gallery="+myuserid+">моя галерея</a>) <a href=?inc=gallery&cookie_off=1>Выйти</a>";
else html=" Ник: <input type=text name=nick class=text size=15> Пароль: <input type=password name=pass class=text size=15> <input type=checkbox name=cookie_on> - запомнить";
wr(html);
wr("<tr><td>Коментарий: <input type=text name=txt maxlength=50 size=50></td></tr>");
wr("<tr><td><input type=file size=1 name=img class=text> <input type=hidden name=upload value=1> <input type=submit name=submit value=Загрузить class='btn btn-warning'></td></tr></table></form>");
}
/* конец вывода списка фоток */
}



/* Выводим выбранную фотографию */
if(afoto) {
	if(moderator==1) todel="<div><a href='?inc=gallery&gallery="+gallery+"&delfoto="+afoto[0]+"' onclick='return confirm(\"Вы действительно хотите удалить эту фотографию?\");'><img src='https://soulty.ru/img/button_del.jpg' width=40px; style='padding-top:10px;'/></a></div><br>"; else todel="";
	if(pfoto) prev="<a href='?inc=gallery&gallery="+gallery+"&foto="+pfoto[0]+"'><img style='border-radius: 5px;' src=data/gallery/trumb/"+pfoto[0]+".jpg border=0></a><br>"+fotoinfo(pfoto); else prev="";
	if(nfoto) next="<a href='?inc=gallery&gallery="+gallery+"&foto="+nfoto[0]+"'><img style='border-radius: 5px;' src=data/gallery/trumb/"+nfoto[0]+".jpg border=0></a><br>"+fotoinfo(nfoto); else next="";
	wr("<table class='table_gal2'><tr><td width=120 align=center valign=top>"+prev+"<td  align=center><img style='border-radius: 5px;' src=data/gallery/image/"+afoto[0]+".jpg><br>"+fotoinfo(afoto)+todel+"</td><td width=120 align=center valign=top>"+next+"</td></tr></table><br><br>");



/* Подготовка комментариев и ссылок страниц */
var posts=new Array();
var all_posts="";
for(var i=0; i<g_p.length;i++) {
mod="";
if(moderator==1) mod+="<div style='display: flex; justify-content: space-between;'><div class='like_count' style='background: #fff; width:35px;margin-right: 10px;'><div style='float:left;'><img src=https://soulty.ru/img/status/orange_status.gif width=20px/></div><div>"+g_p[i][8]+"</div></div>";
if(moderator==1) mod+="<div><a href='?inc=gallery&gallery="+gallery+"&foto="+afoto[0]+"&site="+site+"&delpost="+g_p[i][9]+"' onclick='return confirm(\"Вы действительно хотите удалить это сообщение?\");'><font class=low><img src='https://soulty.ru/img/button_del.jpg' width=40px/></font></a> | ";
mod+="<a href=# onclick='quote("+i+"); return false;'><font class=low>Цитировать</font></a></div></div>";
var noAva = (g_p[i][12] == 1) ? '/assets/img/forum/ava_f.png' : '/assets/img/forum/ava_m.png';
var avator = g_p[i][5] ? g_p[i][5] : noAva;
avator = '<img src="' + avator + '" alt="" style="margin-top:5px; margin-bottom:5px; border-radius: 50px; width:100px; height:100px;"><br>';
message=filter(g_p[i][2],message_img_max);
posts[i]="<table  class='table table-striped' align=center style='table-layout:fixed; width: 40%;'><tr><td class=title width=150>"+g_p[i][3]+"<td class=title align=right> #"+g_p[i][0]+"</tr><tr><td width=150 valign=top style='padding:10px;padding-left:4px; text-align:center;'><a href=# onclick='put(\""+g_p[i][1]+", \"); return false;'><font color='"+g_p[i][4]+"'>"+g_p[i][1]+"</font></a>  [<a href=?inc=info&nick="+g_p[i][1]+" target=info>?</a>]<br>"+avator+"</td><td valign=top style='padding:10px;word-wrap:break-word;'>"+message+"<tr><td>"+g_p[i][6]+"<td align=right>"+mod+"</table><br>";
all_posts+=posts[i];
}
var links=genlinks("?inc=gallery&gallery="+gallery+"&foto="+afoto[0]+"&site=",sites,site,1);

/* Вывод комментариев */
if(sites>0) {
if(moderator==1) wr("<form name=postsform action='' method=post style=display:inline>");
wr("<div class='gallery-pager'>"+links+"</div><br>");
wr(all_posts);
wr("<div class='gallery-pager'>"+links+"</div><br>");
if(moderator==1) wr("</form>");
}

/* Форма для комментариев к выбранной фотографии */
wr("<form action='' name=form method=post><input type=hidden name=act value=add>");
wr("<table><tr><td class=title><a name=sendmess></a>Добавить сообщение<tr><td>");
if(mynick!='' && myid!='') html="<input type=hidden name=nick value="+mynick+"><input type=hidden name=id value="+myid+"><b>"+mynick+"</b> <a href=?inc=gallery&cookie_off=1>Выйти</a>";
else html=" Ник: <input type=text name=nick size=15> Пароль: <input type=password name=pass size=15><br> <input type=checkbox name=cookie_on> - запомнить";
document.write(html);
wr("<tr><td>"+tags);
wr("<TEXTAREA name=message wrap=virtual rows=5 style='width:98%;'></TEXTAREA><div id=smiles></div>");
var zvezda = "";
for(var i=1; i<6; i++){zvezda+="<img id="+i+" width=30 src=https://soulty.ru/img/status/orange_status.gif title='"+i+"' onload=opacity_img(this.id,50) onmousemove=opacity_img(this.id,100) onmouseout=opacity_img(this.id,50) onclick='if (n_s!=id) {n_s=0;opacity_img(this.id,100);document.form.vote.value=n_s=id} else {n_s=0;opacity_img(this.id,50);document.form.vote.value=\"-\"}' border=0 class='star-image'>&nbsp;"};
if(vote1==1) tovote="Оценка: <input name=vote maxlength='1' type=text  style='width: 14px;text-align: center'  readonly='readonly' size=1 value='-' > "+zvezda; else tovote="";
wr("<tr><td> "+tovote+" <input type=submit value=Отправить class='btn btn-warning'></td></tr></table></form>");
}
var n_s = 0;
function opacity_img(id,opacity)
   { opacity=opacity||100;
     id=id||0;
     if (n_s == 0) {for(var i=1; i<6; i++){if (i>id) opacity=50  ;if (window.ActiveXObject) { document.getElementById(i).style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity="+opacity+")";}
else {document.getElementById(i).style.opacity = opacity/100};} } ;
}


</script>
    </center>
  </div>
  <div class="gallery-footer">Загружено за: <script>document.write(loadtime);</script></div>
</body>
</html>
