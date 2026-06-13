/* [MPCHAT - API] */
if(!window.mp) window.mp={};
mp.tmp=document.getElementsByTagName('script');
mp.ver=mp.tmp[mp.tmp.length-1].src.split('?')[1];
mp.script="?inc=informer";

/* Всегда требуется JSLib extended */
document.write('<scr'+'ipt src="//vmeste.eu/JSLib.js?'+mp.ver+'"></scr'+'ipt>');

/* Модифицированный alert() */
function alert(text) {
	$("body").append("<div class=myalert style='width:400px; position:fixed; top:50px; left:0px; right:0px; margin:auto; padding:10px; border:1px solid gray; z-index:1000; background:#f8f8f8;'>"+text+"<br><br><center><input type=button value='Закрыть' onclick='$(\".myalert\").remove();'></center></div>");
}

/* Инициализация информера */
function mp_init(data) {
	if(data) {
		for(var k in data) {mp[k]=data[k]; if(k.substr(0,2)=="i_") window[k]=data[k];} //инициализация mp и window переменных
		eval(mp.run); $.cookie(mp.chat+"_aidn",mp.aidn,100*86400); //получить ключ aidn и установить cookie	
	}
}

/* Отобразить авторизацию */
function mp_authview() {
 	var html=""; 
	if(mp.authorize) {$('.show_notauthorized').hide(); $('.show_authorized').show();} else {$('.show_authorized').hide(); $('.show_notauthorized').show();}
	if(mp.authorize || (mp.isguest && !mp.writable)) {
		$('.notauthorized').html("");
		html="<a href='?inc=set&userid="+mp.userid+"' target=_blank>"+mp.mynick+"</a> "+(mp.isguest?'(гость)':'')+" <a href=# onclick='mp_authexit(); return false;'>Выйти</a>";
	}
	$('.authorized').html(html);
}

/* Модальная форма авторизации */
function mp_authform(check) {
	if(check) {if(mp.authorize || (mp.isguest && !mp.writable)) return false;}
	var allowguest=''; if(!mp.writable) allowguest='<tr><td colspan=2><input type=radio name=asguest value=0 checked onclick="$(\'#passrow\')[0].style.display=\'table-row\';$(\'#coderow\')[0].style.display=\'none\';"> пользователь <input type=radio name=asguest value=1 onclick="$(\'#passrow\')[0].style.display=\'none\';$(\'#coderow\')[0].style.display=\'table-row\';"> вход гостем</td></tr>';
	var joinchat=''; if(location.href.search('inc=')==-1 || location.href.search('inc=chat')!=-1) joinchat='checked';
	var ul='';
	if(mp.reg_network>0) {
		$.getScript('//ulogin.ru/js/ulogin.js');
		ul='<div style="margin:5px; text-align:center;">Войти через &nbsp;<div id="uLogin" style="display:inline-block;" data-ulogin="callback=;display=small;theme=flat;fields=first_name,email;sort=default;providers=vkontakte,facebook,google,yandex,mailru;redirect_uri=;mobilebuttons=0;"></div></div>';
	}
	var html='<form action="" onsubmit="mp_auth(); return false;"><table><tr><td class=title colspan=2>Авторизация</td></tr>'+allowguest+'<tr><td>Логин:</td><td><input type=text id=mynick placeholder="введите логин"></td></tr><tr id=passrow><td>Пароль:</td><td style="position:relative;"><input type=password id=mypass><div style="position:absolute; top:7px; right:12px;"><a href=?inc=mail style="font-weight:normal;">забыли?</a></div></td></tr><tr id=coderow style="display:none;"><td><img id=mycodeimg src=?inc=code></td><td><input type=text id=mycode placeholder="введите код с картинки"></td></tr><tr><td colspan=2 align=center><input type=checkbox id=joinchat value=1 '+joinchat+'> - сразу выполнить вход в чат<br><input type=submit value="Авторизоваться">'+ul+'</td></tr></table></form>';
	$.modal(html);
	$('#mynick')[0].focus();
	return true;
}


/* Авторизация */
function mp_auth() {
	var asguest=0; if($('input[name="asguest"]:checked').val()==1) asguest=1;
	$.ajax({url:mp.script, dataType:'json', method:'POST', data:'api=1&cookie_on=1&nick='+$('#mynick').val()+'&pass='+$('#mypass').val()+'&code='+$('#mycode').val()+'&asguest='+asguest,
		success:function(data) {
			if(data.error) {if(data.error=='badcode') {$('#mycode').val(''); $('#mycodeimg')[0].src='?inc=code'; } mp_err(data.error);}
			else {for(var k in data) mp[k]=data[k]; mp_authview(); if($('#joinchat')[0].checked) location.href="?inc=chat"; $.modal();  }
		}
	});
}

/* Выход */
function mp_authexit() {
	$.ajax({url:mp.script, dataType:'json', method:'POST', data:'cookie_off=1',
		success:function(data) {
			if(!data.authorize) {for(var k in data) mp[k]=data[k]; location.href=location.href;}
			else {mp_err(data.error);}
		}
	});
}
 
/* Загрузить больше комментариев */
function mp_loadmore() {
	$.ajax({url:mp.script, dataType:'json', method:'POST', data:'type='+mp.type+'&limit='+mp.limit+'&sort='+mp.sort+'&lastid='+mp.lastid,
		success:function(data) {
			for (var k in data.comments) {mp_addcomment(data.comments[k]); mp.lastid=data.comments[k].id;}		
			if(data.count!=mp.limit) $('#loadmore').html('Больше нет сообщений.');
		}
	});
}

/* Результат отправки комментария и его добавление */
function mp_sendcomment(data) {
	if(data.ok) {$('#commentsform')[0].reset(); mp_addcomment(data.comments[0],1);}
	else mp_err(data.error);
}

/* Редактирование комментария */
function mp_editcomment(cid) {
	mp.calledit=function() {
		$.ajax({url:mp.script, dataType:'json', method:'POST', data:'type='+mp.type+'&edit='+cid+'&text='+encodeURIComponent($('#edittext').val()),
			success:function(data) {
				for (var k in data.comments) {mp_addcomment(data.comments[k]); mp.lastid=data.comments[k].id;}		
				$('#edittext').off('blur',mp.calledit).remove();
				mp_addcomment(data.comments[0],1);
			}
		});
	}
	if($('#tid'+cid).length) $('#tid'+cid).html("<textarea id=edittext style='width:95%; height:100px;'>"+mp.commentsok[cid].text.replace(/<br>/g,'\n')+"</textarea>");
	if($('#edittext').length) {$('#edittext')[0].focus(); $('#edittext').on('blur',mp.calledit);}
}
 
/* Удаление комментария */
function mp_delcomment(cid) {
	$.ajax({url:mp.script, dataType:'json', method:'POST', data:'type='+mp.type+'&delete='+cid,
		success:function(data) {
			if(data.ok) $('#cid'+cid).html('<center>Сообщение #'+cid+' удалено. (<a href=# onclick=\"mp_rescomment('+cid+'); return false;\">восстановить</a>)</center><br>');
			else mp_err('Ошибка удаления, возможно у вас нет прав.');
		}
	});
}

/* Восстановление комментария */
function mp_rescomment(cid) {
	$.ajax({url:mp.script, dataType:'json', method:'POST', data:'type='+mp.type+'&restore='+cid,
		success:function(data) {
			if(data.ok) mp_addcomment(data.comments[0]);
			else mp_err('Ошибка восстановления, возможно у вас нет прав.');
		}
	});
}

/* Добавление комментария в конец или начало */
function mp_addcomment(data,top) {
	if(mp.sort!='desc' && top==1) {top=0;}
	mp.commentsok[data.id]=data;
	var mod=""; 
	if(data.editor>0) mod+="<i style='float:left;'>Отредактировано в "+data.edited+" - "+data.editornick+"</i>";
	if(data.moderator==1) mod+="<a href=# onclick='mp_delcomment("+data.id+"); return false;'><font class=low>Удалить</font></a> | ";
	if(data.editable) mod+="<a href=# onclick='mp_editcomment("+data.id+"); return false;'><font class=low>Редактировать</font></a> | ";
	mod+="<a href=# onclick='mp_quote("+data.id+"); return false;'><font class=low>Цитировать</font></a>";
	var avator=""; if(data.avator) avator="<img src='"+data.avator+"' style='margin-top:5px;margin-bottom:5px;'>";
	var message=mp_filter(data.text,mp.message_img_max);
	var html="<table width='100%' align=center style='table-layout:fixed;'><tr><td class=title align=left width=150 title='#"+data.id+"'>"+data.date+"</td><td class=title align=right></td></tr><tr><td width=150 valign=top align=left style=padding:10px;padding-left:4px;><a href=# onclick='mp_put(\""+data.nick+", \"); return false;'><font color='"+data.colornick+"'>"+data.nick+"</font></a>  [<a href=?inc=info&userid="+data.userid+" target=info>?</a>]<br>"+avator+"</td><td valign=top align=left style='padding:10px;word-wrap:break-word;' id='tid"+data.id+"'>"+message+"<tr><td align=left>"+data.ip+"<td align=right>"+mod+"</table><br>";
	if($('#cid'+data.id).length) {$('#cid'+data.id).html(html); return;}
	var div = document.createElement("div"); div.id='cid'+data.id; div.innerHTML=html;
	var obj=$('#comments')[0];
	if(obj.firstChild && top) obj.insertBefore(div,obj.firstChild); else obj.appendChild(div);
}

/* Обработчик ошибок */
function mp_err(code) {	
	var error=code;
	if(code=='type') error="Ошибка настройки комментариев.";
	if(code=='disallow') error="У Вас нет доступа для данного действия.";
	if(code=='spam') error='Защита от спама, пожалуйста не пишите так часто.';
	if(code=='noguest') error='Писать гостям не разрешено, зарегистрируйтесь.';
	if(code=='noauth') error='Вы не авторизованы, введите данные для входа.';
	if(code=='badlogin') error='Неверно введены данные для входа!';
	if(code=='badnick') error='Ошибка длинны или синкаксиса логина!';
	if(code=='usednick') error='Этот пользователь уже зарегистрирован.';
	if(code=='nouser') error='Этот пользователь не зарегистрирован.';
	if(code=='badcode') error='Неверно введен защитный код с картинки.';
	if(code=='banned') error='Вы заблокированы, обратитесь к администратору.';
	if(code=='dberror') error='Ошибка базы данных, срочно свяжитесь с администрацией!';
	if(error) alert(error);
}

/* [MPCHAT - Вспомогательные функции] */

/* Генерирует укороченные ссылки */
function mp_genlinks(url,c,cur,r) {
	var d=4; var tmp=""; var t=""; var last=0;
	for(var i=0;i<c;i++) {
	if(i!=0 && i!=c-1 && (cur-d>i || cur*1+d<i)) continue;
	if(i==cur) t=" <b>"+(i+1)+"</b>"; else t=" <a href="+url+i+">"+(i+1)+"</a>";
	if(i>last+1) {if(r) t=t+" ..."; else t=" ..."+t;} last=i;
	if(r) tmp=t+tmp; else tmp+=t;}
	return tmp;
}

/* Добавление в поле текста */
function mp_put(t1,t2) {
	if(t2==undefined) t2='';
	var obj=$('textarea[name="text"]')[0]; obj.focus();
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

/* Функция цитирования */
function mp_quote(num) {
	var a1=new Array('<br>','&quot;','&#039;','&#124;','&lt;','&gt;','&#92;','&#96;','&amp;');
	var a2=new Array('\r\n','"',"'",'|','<','>','\\','`','&');
	var nick=mp.commentsok[num].nick; var text=mp.commentsok[num].text;
	for(i=0;i<a1.length;i++) text=text.split(a1[i]).join(a2[i]);
	mp_put("[quote="+nick.replace(/\]/g,"&#093;")+"] "+text+" [/quote]");
}

/* Трансляция текста на русский по звучанию */
mp.tr={'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'jo','ж':'zh','з':'z','и':'i','й':'j','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'c','ш':'sh','щ':'w','ы':'y','ь':"'",'ъ':"''",'э':'je','ю':'ju','я':'ja'};
mp.enabletrans=0;
function mp_checktrans() {
	var obj=document.getElementById('trbutton');
	if(mp.enabletrans==1) {mp.enabletrans=0; obj.style.fontWeight='normal';} 
	else {mp.enabletrans=1; obj.style.fontWeight='bold';}
	$('textarea[name="text"]')[0].focus();
}  
function mp_autotrans(el,e) { 
	var e=e || window.event;
	var code = e.which; 
	if(typeof el.selectionStart != "number" || !((code>=65 && code<=123) || code==35 || code==39)) return true;
	var txt=String.fromCharCode(code); 
	var pos=el.selectionStart; 
	el.value=el.value.substr(0,el.selectionStart)+el.value.substr(el.selectionEnd);
	var pre=""; if(pos) {pre=el.value.substr(pos-1,1); if(mp.tr[pre]) pre=mp.tr[pre]; else pre="";}
	var pretxt = pre+txt; var r=""; var del=0;
	if(pretxt.length==2) for(k in mp.tr) if(mp.tr[k]==pretxt) {r=k; del=1; break;} 
	if(!r) for(k in mp.tr) if(mp.tr[k]==txt) {r=k; break;} 
	el.value=el.value.substr(0,pos-del)+r+el.value.substr(pos);
	pos=pos+1-del; el.setSelectionRange(pos, pos);
	return false; 
} 

/* Обработчик BB-тегов, ненужные закоментировать (шаблон, замена, повторно) */
mp.etags=new Array(); var i=0;
mp.etags[i]=new Array(/\[b\](.*?)\[\/b\]/g,'<b>$1</b>');i++;
mp.etags[i]=new Array(/\[i\](.*?)\[\/i\]/g,'<i>$1</i>');i++;
mp.etags[i]=new Array(/\[u\](.*?)\[\/u\]/g,'<u>$1</u>');i++;
mp.etags[i]=new Array(/\[s\](.*?)\[\/s\]/g,'<s>$1</s>');i++;
//mp.etags[i]=new Array(/\[black\](.*?)\[\/black\]/g,'<font color=black>$1</font>');i++;
mp.etags[i]=new Array(/\[color=(#?[a-z0-9]{3,10})\](.*?)\[\/color\]/g,'<font color="$1">$2</font>',1);i++;
mp.etags[i]=new Array(/\[size=([1-9]{1})\](.*?)\[\/size\]/g,'<font size="$1">$2</font>',1);i++;
mp.etags[i]=new Array(/\[font=([A-z ]{3,20})\](.*?)\[\/font\]/g,'<font face="$1">$2</font>',1);i++;
mp.etags[i]=new Array(/\[sub\](.*?)\[\/sub\]/g,'<sub>$1</sub>');i++;
mp.etags[i]=new Array(/\[sup\](.*?)\[\/sup\]/g,'<sup>$1</sup>');i++;
mp.etags[i]=new Array(/\[hr\]/g,'<hr>');i++;
mp.etags[i]=new Array(/\[left\](.*?)\[\/left\]/g,'<div style="float:left;padding: 4px 10px;">$1</div>');i++;
mp.etags[i]=new Array(/\[right\](.*?)\[\/right\]/g,'<div style="float:right;padding: 4px 10px;">$1</div>');i++;
mp.etags[i]=new Array(/\[center\](.*?)\[\/center\]/g,'<center>$1</center>');i++;
mp.etags[i]=new Array(/\[img\](https?:\/\/[^ "]+?)\[\/img\]/,'<img src="$1" border=0 style="position:relative;">',1);i++; //одноразовая замена для лимита
mp.etags[i]=new Array(/\[url=((ftp|https?):\/\/[^ "]+?)\](.*?)\[\/url\]/g,'<a href="$1" target=_blank>$3</a>');i++;
mp.etags[i]=new Array(/\[url\]((ftp|https?):\/\/[^ "]+?)\[\/url\]/g,'<a href="$1" target=_blank>$1</a>');i++;
mp.etags[i]=new Array(/\[email=([A-z0-9._-]+\@[A-z0-9.-]+?)\](.*?)\[\/email\]/g,'<a href="mailto:$1" target=_blank>$2</a>');i++;
mp.etags[i]=new Array(/\[email\]([A-z0-9._-]+\@[A-z0-9.-]+?)\[\/email\]/g,'<a href="mailto:$1" target=_blank>$1</a>');i++; 
mp.etags[i]=new Array(/\[quote\](.*?)\[\/quote\]/g,'<div style="background-color:#eeeeee; border: 1px solid #000; margin:2px;padding:8px;">$1</div>',1);i++;
mp.etags[i]=new Array(/\[quote=([^\] ]{2,30})\](.*?)\[\/quote\]/g,'<div style="background-color:#eeeeee; border: 1px solid #000; margin:2px;padding:8px;"><b>$1</b> пишет:<br><br>$2</div>',1);i++;
mp.etags[i]=new Array(/\[code\](.*?)\[\/code\]/g,'<div style="background-color:#dddddd; border: 1px solid #000; margin:2px;padding:8px;"><b>Код:</b><br><br><div style="width:100%;overflow:auto;white-space:nowrap;">$1<br><br></div></div>',1);i++;

/* Для вывода кнопок BB-тегов */
mp.tags="";
mp.tags+="<input title=жирный class=ok type=button value=' B ' onclick=mp_put('[b]','[/b]') style='font-weight:bold'> ";
mp.tags+="<input title=курсив class=ok type=button value=' I ' onclick=mp_put('[i]','[/i]') style='font-style:italic'> ";
mp.tags+="<input title=подчеркнуть class=ok type=button value=' U ' onclick=mp_put('[u]','[/u]') style='text-decoration:underline'> ";
mp.tags+="<input title=зачеркнуть class=ok type=button value=' S ' onclick=mp_put('[s]','[/s]') style='text-decoration:line-through'> ";
mp.tags+="<select class=ok onchange='if(this.value) mp_put(\"[color=\"+this.value+\"]\",\"[/color]\"); this.value=\"\";'><option value=''>-=цвет=-</option>";
mp.tags+="<option value=black style='color:black'>черный</option>";
mp.tags+="<option value=red style='color:red'>красный</option>";
mp.tags+="<option value=blue style='color:blue'>синий</option>";
mp.tags+="<option value=green style='color:green'>зелёный</option>";
mp.tags+="<option value=orange style='color:orange'>оранжевый</option>";
mp.tags+="<option value=yellow style='color:yellow'>желтый</option>";
mp.tags+="<option value=purple style='color:purple'>фиолетовый</option>";
mp.tags+="<option value=gray style='color:gray'>серый</option>";
mp.tags+="</select> ";
mp.tags+="<input title=влево class=ok type=button value=' &laquo; ' onclick=mp_put('[left]','[/left]') style='font-weight:bold'> ";
mp.tags+="<input title='по-центру' class=ok type=button value=' o ' onclick=mp_put('[center]','[/center]') style='font-weight:bold'> ";
mp.tags+="<input title=вправо class=ok type=button value=' &raquo; ' onclick=mp_put('[right]','[/right]') style='font-weight:bold'> ";
mp.tags+="<input title=черта class=ok type=button value='&mdash;' onclick=mp_put('[hr]') style='font-weight:bold'> ";
mp.tags+="<input title=код class=ok type=button value=' # ' onclick=mp_put('[code]','[/code]') style='font-weight:bold'> ";
mp.tags+="<input title=цитата class=ok type=button value='&ldquo; &bdquo;' onclick=mp_put('[quote]','[/quote]') style='font-weight:bold'> ";
mp.tags+="<input title=адрес class=ok type=button value='Url' onclick=mp_put('[url]','[/url]')> ";
mp.tags+="<input id=imgbutton title=картинка class=ok type=button value='Img' onclick=mp_put('[img]','[/img]') style='display:none;'> ";
mp.tags+="<input id=trbutton type=button onclick='mp_checktrans();' value='TR' title='Включить автоматическую транслитерацию Ctrl+Alt'> ";
mp.tags+="<input class=ok type=button value='&#128522;'  onclick='var obj=document.getElementById(\"smiles\"); if(obj.innerHTML) obj.innerHTML=\"\"; else obj.innerHTML=mp.smiles;' > ";

/* Управление смайлами */
var i=0;
mp.smdir="http://mpchat.com/blank/img/smiles/";
mp.sm=new Array();
mp.sm[i]=new Array('*1','1.gif');i++;
mp.sm[i]=new Array('*2','2.gif');i++;
mp.sm[i]=new Array('*3','3.gif');i++;
mp.sm[i]=new Array('*4','4.gif');i++;
mp.sm[i]=new Array('*5','5.gif');i++;
mp.sm[i]=new Array('*6','6.gif');i++;
mp.sm[i]=new Array('*7','7.gif');i++;
mp.sm[i]=new Array('*8','8.gif');i++;
mp.sm[i]=new Array('*9','9.gif');i++;
mp.sm[i]=new Array('*10','10.gif');i++;
mp.sm[i]=new Array('*11','11.gif');i++;
mp.sm[i]=new Array('*12','12.gif');i++;
mp.sm[i]=new Array('*13','13.gif');i++;
mp.sm[i]=new Array('*14','14.gif');i++;
mp.sm[i]=new Array('*15','15.gif');i++;
mp.sm[i]=new Array('*16','16.gif');i++;
mp.sm[i]=new Array('*17','17.gif');i++;
mp.sm[i]=new Array('*18','18.gif');i++;
mp.sm[i]=new Array('*19','19.gif');i++;
mp.sm[i]=new Array('*20','20.gif');i++;

/* Для добавления смайлов */
mp.smiles=""; for(i=0;i<mp.sm.length;i++) mp.smiles+="<img src="+mp.smdir+mp.sm[i][1]+" onclick=mp_put(this.title) title=' "+mp.sm[i][0]+" ' style=cursor:pointer;> ";


/* Фильтрирует текст - смайлы, теги, ссылки, картинки */
/* img_max - макс. картинок к отображению в одном сообщении вместо ссылок */
mp.message_img_max=0; /* в сообщении */
mp.signature_img_max=0; /* в подписи */
function mp_filter(text,img_max) { var img_c=0;
	var a=text.split("[code]"); for(var k=1;k<a.length;k++) {a1=a[k].split("[/code]");a1[0]=a1[0].replace(/\[/g,'&#091;'); a[k]=a1.join('[/code]');} text=a.join('[code]'); //подготовка для code
	for(var k=0;k<mp.etags.length;k++) {
		if(mp.etags[k][2]) while(text.search(mp.etags[k][0])>=0) {
			if(mp.etags[k][1].search("<img")!=-1) {if(img_c<img_max) img_c++; else break; }
			text = text.replace(mp.etags[k][0],mp.etags[k][1]);  
		}
		else text = text.replace(mp.etags[k][0],mp.etags[k][1]);
	}
	text=" "+text+" "; text=text.replace(/( |>)((ftp|https?):\/\/[^ "]+?)(?= |<)/g,'$1<a href="$2" target=_blank>$2</a>'); //автозамена ссылок
	a=text.split(" "); for(k=0;k<a.length;k++) {for(j=0;j<mp.sm.length;j++) if(a[k]==mp.sm[j][0]) a[k]='<img src='+mp.smdir+mp.sm[j][1]+'>';} text=a.join(' '); //замена смайлов
	return text;
}
