<?php
if(!defined('CHAT')) die();

//vars
$p = (int)($_GET['p'] ?? 0);
$do = $_GET['do'] ?? '';
if(!$do) $do="buy";
$yes = $_GET['yes'] ?? '';
$no = $_GET['no'] ?? '';
$itemid = $_POST['itemid'] ?? $_GET['itemid'] ?? ''; //need both
$save = $_POST['save'] ?? '';
$creator = $_POST['creator'] ?? '';
$name = $_POST['name'] ?? '';
$text = $_POST['text'] ?? '';
$category = $_POST['category'] ?? '';
$price = $_POST['price'] ?? '';
$count = $_POST['count'] ?? '';
$expire = $_POST['expire'] ?? '';
$act = $_GET['act'] ?? '';
$forid = $_POST['forid'] ?? '';
$give = $_POST['give'] ?? '';
$from = $_POST['from'] ?? $_GET['from'] ?? ''; //need both
$givepoints = $_POST['givepoints'] ?? '';
$sell = $_GET['sell'] ?? '';
$cat = $_GET['cat'] ?? '';

$sellprocent=10;
$error="";
$output="";


//check sess
if(!$authorize) {
	if($admin) errorpage("Для управления магазином необходима авторизация под ником в чате.");
	else errorpage("Неправильная сессия или вы не зарегистрированы.");
}

//set nick
if($authorize) $nick=$u['nick']; elseif(!$nick) $nick=$mpnick;


//create dirs
if(!is_dir("data/shop")) newdir("data/shop");
if(!is_file("data/shop.sys")) newfile("data/shop.sys","");


//moderator?
$moderator=0; if($admin) $moderator=1;
$mods=explode(", ",$cfg['shop_mod']);
for($i=0;$i<count($mods);$i++) if($mods[$i]==$nick && $nick) $moderator=1;

//LOAD ITEMS[11] - ID|DENY|NICK|NAME|TEXT|PRICE|COUNT|DATE|CATEGORY|COMMENT|PAYS|EXPIRED|
$shop=[]; $items=[]; $cats=[]; $creators=[]; $c_items=0; $maxid=0;
$a=file("data/shop.sys");
for($i=0;$i<count($a);$i++) {
	$x=explode("|",$a[$i]);
	$shop[$x[0]]=$x; 
	if($x[8]) {$cats[$x[8]] = ($cats[$x[8]] ?? 0) + 1; }
	$creators[$x[2]] = ($creators[$x[2]] ?? 0) + 1; 
	$c_items+=(int)$x[10];
	if($x[0]>$maxid) $maxid=$x[0];
}
$maxid++;
$c_shop=count($shop);

//load my items
$c_myitems=0; $a1=array();
if(is_file("data/shop/$myid.sys")) {
	$a1=file("data/shop/$myid.sys");
	$c_myitems=count($a1);$exp=0;
	for($i=0;$i<$c_myitems;$i++) {$x=explode("|",$a1[$i]);
		$x[11]=(int)$x[11]; if($x[11] && $x[11]<$s_time) {$a1[$i]="";$exp++;continue;}
		$items[]=$x;
	}
	if($exp) file_put_contents("data/shop/$myid.sys",implode("",$a1),LOCK_EX);
}


//moderator links
$modlinks=""; if($moderator) $modlinks="| <a href=?inc=shop&do=create>Мастерская</a> | <a href=?inc=shop&do=moderate>Модерация</a> | <a href=?inc=shop&do=log>Логи</a>";

$changenickform=""; if($admin) 
$changenickform="<form action='' method=get>
<input type=hidden name=inc value='$inc'>
<input type=hidden name=do value='$do'>
<input type=hidden name=nick value='$nick'> 
<input type=submit value='$nick ▾' onclick='var nick=prompt(\"Для авторизации в магазине укажите другой ник:\"); this.parentNode.nick.value=nick;' title='Указать другой ник'>
</form><br>";

//moderator?
$moderator=0; if($admin) $moderator=1;
$mods=explode(", ",$cfg['shop_mod']);
for($i=0;$i<count($mods);$i++) if($mods[$i]==$nick && $nick) $moderator=1;

//LOAD ITEMS[11] - ID|DENY|NICK|NAME|TEXT|PRICE|COUNT|DATE|CATEGORY|COMMENT|PAYS|EXPIRED|
$shop=[]; $items=[]; $cats=[]; $creators=[]; $c_items=0; $maxid=0;
$a=file("data/shop.sys");
for($i=0;$i<count($a);$i++) {
	$x=explode("|",$a[$i]);
	$shop[$x[0]]=$x; 
	if($x[8]) {$cats[$x[8]] = ($cats[$x[8]] ?? 0) + 1; }
	$creators[$x[2]] = ($creators[$x[2]] ?? 0) + 1; 
	$c_items+=(int)$x[10];
	if($x[0]>$maxid) $maxid=$x[0];
}
$maxid++;
$c_shop=count($shop);

//load my items
$c_myitems=0; $a1=array();
if(is_file("data/shop/$myid.sys")) {
	$a1=file("data/shop/$myid.sys");
	$c_myitems=count($a1);$exp=0;
	for($i=0;$i<$c_myitems;$i++) {$x=explode("|",$a1[$i]);
		$x[11]=(int)$x[11]; if($x[11] && $x[11]<$s_time) {$a1[$i]="";$exp++;continue;}
		$items[]=$x;
	}
	if($exp) file_put_contents("data/shop/$myid.sys",implode("",$a1),LOCK_EX);
}


//moderator links
$modlinks=""; if($moderator) $modlinks="| <a href=?inc=shop&do=create>Мастерская</a> | <a href=?inc=shop&do=moderate>Модерация</a> | <a href=?inc=shop&do=log>Логи</a>";

$changenickform=""; if($admin) 
$changenickform="<form action='' method=get>
<input type=hidden name=inc value='$inc'>
<input type=hidden name=do value='$do'>
<input type=hidden name=nick value='$nick'> 
<input type=submit value='$nick ▾' onclick='var nick=prompt(\"Для авторизации в магазине укажите другой ник:\"); this.parentNode.nick.value=nick;' title='Указать другой ник'>
</form><br>";


//SEE LOG
if($do=="log" && $moderator) {
	if(!is_file("data/shoplog.sys")) newfile("data/shoplog.sys","");
	$output.="<b>Обзор движения пунктов и покупок</b><br><br>";
	$a=file("data/shoplog.sys"); $c=count($a);
	$output.="<table>"; $nn=0;
	for($i=$c-1; $i>=0; $i--) {
		$n=$c-$i; if($n<=$p*10 || $n>($p+1)*10) continue;
		$nn++; $x=explode("|",$a[$i]);$date=date("d.m.y - H:i",$x[0]);
		if($x[4]=="st") $desc="покупка статуса <b>$x[5]</b>";
		if($x[4]=="newnick") $desc="покупка нового ника <b>$x[5]</b>";
		elseif($x[4]=="gn") {
			if($x[2]) $desc="проверка граф. ника для <b>$x[2]</b> - $x[5]";
			elseif(!$x[5]) $desc="удаление услуги граф. ник";
			else $desc="покупка <a href='".webpath($x[5])."' target=_blank>граф. ника</a>";
		}
		elseif($x[4]=="gr")  {
			if($x[2]) $desc="проверка градиент текста для <b>$x[2]</b> - $x[5]";
			elseif(!$x[5]) $desc="удаление услуги градиент текста";
			else $desc="покупка <b>градиента текста</b> (<font size=4 color=".str_replace(",",">•</font>,<font size=4 color=",$x[5]).">•</font>)";
		}
		elseif($x[4]=="grn")  {
			if($x[2]) $desc="проверка градиент ника для <b>$x[2]</b> - $x[5]";
			elseif(!$x[5]) $desc="удаление услуги градиент ника";
			else $desc="покупка <b>градиента ника</b> (<font size=4 color=".str_replace(",",">•</font>,<font size=4 color=",$x[5]).">•</font>)";
		}
		elseif($x[4]=="tadd")  {
			if($x[2]) $desc="проверка личное приветствие для <b>$x[2]</b> - $x[5]";
			elseif(!$x[5]) $desc="удаление услуги личное приветствие";
			else $desc="покупка <b>личное приветствие</b> - <a href=# onclick='alert(\"$x[5]\");return false;'>[?]</a>";
		}
		elseif($x[4]=="tdel")  {
			if($x[2]) $desc="проверка личное прощание для <b>$x[2]</b> - $x[5]";
			elseif(!$x[5]) $desc="удаление услуги личное прощание";
			else $desc="покупка <b>личное прощание</b> - <a href=# onclick='alert(\"$x[5]\");return false;'>[?]</a>";
		}
		elseif($x[4]=="invis")  {
			if($x[2]) $desc="проверка невидимость для <b>$x[2]</b> - $x[5]";
			elseif(!$x[5]) $desc="удаление услуги невидимость";
			else $desc="покупка <b>невидимость</b>";
		}
		else {
			if(!$x[2] && $x[3] && !$x[4]) $desc="покупка <b>пунктов</b>";
			if(!$x[2] && $x[3] && $x[4]) $desc="покупка <b>".($shop[$x[4]][3] ?? '')."(#$x[4])</b>";
			if($x[2] && $x[3] && !$x[4]) $desc="подарок пунктами для <a href=?inc=info&nick=$x[2] target=_blank>$x[2]</a>";
			if($x[2] && !$x[3] && $x[4]) $desc="подарок <b>".($shop[$x[4]][3] ?? '')."(#$x[4])</b> для <a href=?inc=info&nick=$x[2] target=_blank>$x[2]</a>";
		}
		$output.="<tr><td><a href=?inc=info&nick=$x[1] target=_blank>$x[1]</a><td align=left>$desc<td align=right><b>$x[3]</b> пунктов<td>$date</tr>";
	}
	if(!$nn) $output.="<tr><td colspan=4>Ничего не найдено!</td></tr>";
	$output.="</table><br>";
	if($p) $output.="<a href=?inc=$inc&do=$do&p=".($p-1).">Назад</a> ";
	$output.="<b>[".($p+1)."]</b>";
	if($nn==10) $output.=" <a href=?inc=$inc&do=$do&p=".($p+1).">Дальше</a>";
}


//MODERATE
if($do=="moderate" && $moderator) {
	$output.="<b>Модерация дополнительных функций</b><br><br>";	
	$extra="";
	$a=@file("data/shopextra.sys");
	$output.="<table>"; $found=0;
	if(is_array($a)) for($i=count($a)-1; $i>=0; $i--) if(trim($a[$i])) { 
		$x=explode("|",$a[$i]); if(!$x[5]) continue;
		$date=date("d.m.Y - H:i", (int)$x[1]);
		$desc="неопределено";
		if($x[2]=="gn") $desc="графический ник <img src='".webpath($x[6])."'>";
		if($x[2]=="gr") $desc="градиент текста (<font size=4 color=$x[6]>•</font>,<font size=4 color=$x[7]>•</font>,<font size=4 color=$x[8]>•</font>)";
		if($x[2]=="grn") $desc="градиент ника (<font size=4 color=$x[6]>•</font>,<font size=4 color=$x[7]>•</font>,<font size=4 color=$x[8]>•</font>)";
		if($x[2]=="tadd") $desc="личное приветствие - <font color=blue>$x[6]</font>";
		if($x[2]=="tdel") $desc="личное прощание - <font color=blue>$x[6]</font>";
		if($x[2]=="invis") $desc="невидимость";
		$modok="<a href=?inc=$inc&do=$do&yes=$x[1]>да</a> / <a href=?inc=$inc&do=$do&no=$x[1]>нет</a>";
		$nick1=$x[0];
		if($yes==$x[1]) {
			$x[5]=0; $x[1]=$s_time; $a[$i]=implode("|",$x);$modok="<font color=green>OK</font>";
			shop_log($nick,$nick1,0,$x[2],"да");
		}
		elseif($no==$x[1]) {
			$u1=readuser($nick1); $u1['points']+=$x[3]; writeuser(array('points'=>$u1['points']),"",$u1['id']);
			if($x[2]=="gn" && preg_match("/\.jpg$/",$x[6]) && is_file("data/$x[6]")) unlink("data/$x[6]");
			$a[$i]="";$modok="<font color=red>удалено</font>";
			shop_log($nick,$nick1,0,$x[2],"нет");
		}
		$output.="<tr><td><a href=?inc=info&nick=$x[0] target=_blank>$x[0]</a></td><td class=shopaddon align=left>$desc</td><td>$date</td><td>$modok</td></tr>";
		$found++;
	}
	if(!$found) $output.="<tr><td>Пока нечего модерировать!</td></tr>";
	$output.="</table>";
	if($yes || $no) file_put_contents("data/shopextra.sys",implode("",$a));
}


//CREATE
if($do=="create" && $moderator) {
	$shop_itemsize=$cfg['shop_itemKB']*1000; 
	$shop_itemwh=$cfg['shop_itemwh'] ? $cfg['shop_itemwh'] : 100;
	//security
	$itemid=(int)$itemid; $item=$shop[$itemid] ?? [];
	if(!$item || ($item[2]!=$nick && !$admin)) {$itemid=0; $item=[];}
	//add or edit
	if($save) {
		//set edit id
		if($item) $maxid=$itemid; 
		$imgsrc="data/shop/$maxid.jpg";
		if(move_uploaded_file($_FILES["upload"]['tmp_name'],$imgsrc)) {
			$im=getimagesize($imgsrc); 
			if(in_array($im[2],[1,2,3,6,18])) {
				if(filesize($imgsrc)>$shop_itemsize || $im[0]>$shop_itemwh || $im[1]>$shop_itemwh) trumb($imgsrc, $imgsrc, $shop_itemwh, $shop_itemwh, "");
			}
			else unlink($imgsrc);
		}
		if(!is_file($imgsrc)) $error="Ошибка загрузки изображения, вероятно неверный формат файла.";
		else {
			$name=html($name,30,-1);
			$text=html($text,250,-1);
			$category=html($category,30,-1);
			
			if(!$admin) $creator=$nick;
			$isuser=readuser($creator);
			if(!$isuser || !$isuser['pass']) $error="Извините, но ник изготовителя не зарегистрирован, укажите другой.";
			elseif(!preg_match("/^[a-zА-яЁё0-9 _-]*$/iu",$category)) $error="Укажите правильно категорию, используя только буквы и цифры!";
			else {
				$price=(int)$price; if($price<100) $price=100;
				$count=(int)$count; if($count<1 || $count>=1000) $count=1;
				$expire=(int)$expire; if($expire<0 || $expire>=1000) $expire=0;
				//edit
				if($item) {
					$item[2]=$creator; $item[3]=$name; $item[4]=$text; $item[5]=$price; $item[6]=$count; $item[8]=$category; $item[11]=$expire; $item[12]="\n"; 
					$shop[$itemid]=$item;
					shop_save();
					$error="<font color=green>Редактирование прошло успешно.</font>";					
				}
				//create
				else {
					$item=explode("|","$maxid|0|$creator|$name|$text|$price|$count|$s_time|$category|||$expire|\n");
					$shop[$maxid]=$item;
					shop_save();
					$error="<font color=green>Товар создан.</font>";
				}
			}
		}
	}
	//deny item	
	if($act=="deny") {
		if(!$item) $error="Товар не найден!";
		else {
			if($item[1]) {$item[1]=0; $error="<font color=green>Товар допущен для продажи.</font>"; }
			else {$item[1]=1; $error="Товар запрещён для продажи."; }
			$shop[$itemid]=$item;
			shop_save();
		}
	}
	//delete item	
	if($act=="delete") {
		if(!$item) $error="Товар не найден!";
		else {
			//delete
			unset($shop[$itemid]);
			shop_save();		
			//delete image
			@unlink("data/shop/$itemid.jpg");
			//delete from users
			$c=0; $files = scandir("data/shop/"); 
			foreach($files as $file) if ($file[0] != "." && preg_match("/\.sys$/",$file)) { 
				$a2=file("data/shop/$file");
				for($i=0; $i<count($a2); $i++) {$x2=explode("|",$a2[$i]);if($x2[0]==$itemid) {$a2[$i]="";$c++;}}
				file_put_contents("data/shop/$file", implode("",$a2), LOCK_EX);
				if(!filesize("data/shop/$file")) unlink("data/shop/$file");
			}
			$error="<font color=green>Вы удалили этот товар из базы и у <b>$c</b> покупателей.</font>";
		}
	}
	

	//output create/edit item		
	$creatorhtml="";
	if(!$item) $item=['','','','','','','','','','','','']; //define default
	if(!$item[2]) $item[2]=$nick;
	if($admin) $creatorhtml="<input type=text name=creator value='$item[2]'>"; else $creatorhtml="<b>$item[2]</b>";
	$output.="<b>Мастерская</b><br><br>
	Получайте $sellprocent% от ваших продаж!<br><br>
	<form action='?inc=$inc&do=$do' method=post enctype='multipart/form-data'>
	<input type=hidden name=itemid value='$item[0]'>
	<table>
	<tr><td align=left>Изготовитель: <td align=left>$creatorhtml</tr>
	<tr><td align=left>Название: <td align=left><input type=text name=name maxlength=30 size=30 class=text value='$item[3]'></tr>
	<tr><td align=left>Описание: <a href=# onclick='alert(\"Вы можете скрывать часть текста описания, тогда он будет виден только после покупки! Для скрытия части текста используйте теги:\\n[hide]скрытый текст[/hide]\"); return false;'>[?]</a> 
		<td align=left><input type=text name=text maxlength=250 size=30 class=text value='$item[4]'></tr>
	<tr><td align=left>Категория: <td align=left><input type=text name=category maxlength=30 size=30 class=text value='$item[8]'><br>
	<select onchange='category.value=this.value;' class=text><option value=''>-=выбрать другую=-";
	foreach($cats as $key=>$val) {$output.="<option value='$key'>$key ($val)";}
	$output.="</select></tr>
	<tr><td align=left>Изображение: <td align=left><input type=file name=upload size=5 class=text><br>РЕКОМЕНДУЕТСЯ до ".$shop_itemwh."x".$shop_itemwh." - ".$cfg['shop_itemKB']."кб</tr>
	<tr><td align=left>Срок: <td align=left><input type=text name=expire maxlength=3 size=5 class=text value='$item[11]'> дней (0 - неограничено)</tr>
	<tr><td align=left>Кол-во: <td align=left><input type=text name=count maxlength=3 size=5 class=text value='$item[6]'> штук</tr>
	<tr><td align=left>Цена: <td align=left><input type=text name=price size=5 class=text value='$item[5]'> пунктов</tr>
	<tr><td colspan=2 align=center><input type=submit name=save value='Создать или изменить товар' class=ok></tr>
	</table>
	</form>
	<br>";
}

//MY+GIVE+SELL
if($do=="my") {
	//give item
	$forid=(int)$forid;
	if($give && $text && $forid && $tonick && $tonick!=$nick && $from) {
		$text=html($text,100,-1);
		$u1=readuser($tonick);
		if(!$u1) $error="Этот пользователь не зарегистрирован!";
		else {
			$found=0;
			for($i=0;$i<count($a1);$i++) {
				$x=explode("|",$a1[$i]);
				if($x[0]==$forid && $x[7]==$from) {$x[7]=time(); $x[9]="от $nick - $text";$a1[$i]="";$found=1;break;}
			}
			if($found) {
				file_put_contents("data/shop/".$u1['id'].".sys",implode("|",$x),FILE_APPEND|LOCK_EX); 
				file_put_contents("data/shop/$myid.sys",implode("",$a1),LOCK_EX);
				sendpost($tonick,$nick,"У вас новый подарок \"$x[3]\"!",$text);
				if(!filesize("data/shop/$myid.sys")) unlink("data/shop/$myid.sys");
				$items=[]; for($i=0;$i<count($a1);$i++) if($a1[$i]) {$x=explode("|",$a1[$i]);$items[]=$x;}
				shop_log($nick,$tonick,0,$forid);
				$error="<font color=green>Вы подарили эту вещь <b>$tonick</b>.</font>";		
			}
		}		
	}
	//give points	
	$givepoints=(int)$givepoints;
	if($cfg['givepoints_on'] && $give && $givepoints>0 && $tonick && $tonick!=$nick) {
		if($u['points']<$givepoints) $error="У Вас недостаточно пунктов!";
		else {
			$u1=readuser($tonick);
			if(!$u1) $error="Указанный ник не зарегистрирован!";
			else {
				$u['points']-=$givepoints; writeuser(array('points'=>$u['points']),"",$myid);
				$u1['points']+=$givepoints; writeuser(array('points'=>$u1['points']),"",$u1['id']);
				$error="<font color=green>Пользователю <b>$tonick</b> подарено <b>$givepoints</b> пунктов.</font>";
				shop_log($nick,$tonick,$givepoints,"");
			}
		}
	}
	//drop/sell item
	$sell=(int)$sell;
	if($sell && $from) {
		$found=0;
		for($i=0;$i<count($a1);$i++) {
			$x=explode("|",$a1[$i]);
			if($x[0]==$sell && $x[7]==$from) {$a1[$i]="";$found=1;break;}
		}
		if(!$found) $error="Вещь не найдена!";
		else {
			file_put_contents("data/shop/$myid.sys",implode("",$a1),LOCK_EX);
			if(!filesize("data/shop/$myid.sys")) unlink("data/shop/$myid.sys");
			$items=[]; for($i=0;$i<count($a1);$i++) if($a1[$i]) {$x=explode("|",$a1[$i]); $items[]=$x;}
			$error="<font color=green>Вы выбросили эту вещь.</font>";
		}
	}
	//give item	
	$output.="<b>Сделать подарок</b><br><br>
	<form action='' name=giveform method=post>
	<table>
	<tr><td align=left>ID подарка: <td align=left><input type=text name=forid size=5 readonly class=text> <input type=hidden name=from></tr>
	<tr><td align=left>Для ника: <td align=left><input type=text name=tonick class=text></tr>
	<tr><td align=left>Коментарий:<td align=left><input type=text name=text maxlength=100 class=text></tr>
	<tr><td colspan=2 align=center> <input type=submit name=give value='Подарить вещь' class=ok></tr>
	</table>
	</form><br>";
	//give points	
	if($cfg['givepoints_on'])
	$output.="<b>Передать пункты</b><br><br>
	<form action='' method=post>
	<table>
	<tr><td align=left>Пункты: <td align=left><input type=text name=givepoints size=5 class=text value=0></tr>
	<tr><td align=left>Для ника: <td align=left><input type=text name=tonick class=text></tr>
	<tr><td colspan=2 align=center> <input type=submit name=give value='Подарить пункты' class=ok></tr>
	</table>
	</form><br>";
}
//BUY ITEM
$itemid=(int)$itemid;
if($do=="buy" && $itemid) {
	$item=$shop[$itemid];
	if(!$item) $error="Вещь не найдена!";
	elseif($item[1]) $error="Вещь запрещена для покупки!";
	elseif($item[6]-(int)$item[10]<1) $error="Нет на складе!";
	elseif($item[5]>$u['points']) $error="Недостаточно средств!";
	elseif($c_myitems>=2000) $error="У вас слишком много вещей!";
	else {
		//save shop
		if(!$item[10]) $item[10]=0; //make as int
		$item[10]++; $shop[$itemid]=$item;
		shop_save();
		//add my item
		$item[7]=time();
		$exp=(int)$item[11]; if($exp) $item[11]=$s_time+$exp*86400;
		file_put_contents("data/shop/$myid.sys",implode("|",$item),FILE_APPEND|LOCK_EX);
		$tonick=$item[2]; $u1=readuser($tonick);
		if($u1) {$u1['points']+=round($item[5]/100*$sellprocent); writeuser(array('points'=>$u1['points']),"",$u1['id']);}
		$error="<font color=green>Вы купили эту вещь за $item[5] пунктов.</font>";
		$u['points']-=$item[5]; writeuser(array('points'=>$u['points']),"",$myid);
		shop_log($nick,"",$item[5],$item[0]);
	}
}

//SHOP ITEMS
$num=0;
if($do=="buy" || $do=="create") {
if(count($cats)) {
    // Подсчитываем общее количество товаров (без учета запрещенных)
    $total_items = 0;
    foreach($shop as $item) {
        if($do=="buy" && $item[1]) continue; // Пропускаем запрещенные товары в режиме покупки
        if($do=="create" && $item[2]!=$nick && !$admin) continue; // Пропускаем чужие товары в режиме создания
        $total_items++;
    }
    
    // Создаем сайдбар с категориями
    $categories_html = "<div class='categories-sidebar'><h3>📂 Категории</h3>";
    $categories_html .= "<a href='?inc=$inc&do=$do&cat=' class='category-item".($cat=="" ? " active" : "")."'>Все товары <span class='category-count'>$total_items</span></a>";
    foreach($cats as $key=>$val) {
        $active = ($cat==$key) ? " active" : "";
        $categories_html .= "<a href='?inc=$inc&do=$do&cat=$key' class='category-item$active'>$key <span class='category-count'>$val</span></a>";
    }
    $categories_html .= "</div>";
    
    // Оборачиваем товары в контейнер
    $output = "<div class='shop-container'>" . $categories_html . "<div class='products-content'>";
}
// Открываем сетку товаров
$output .= "<div class='products-grid'>";

foreach($shop as $key=>$x) {
    $text=$x[4];
    $text=preg_replace('#\[hide\](.*?)\[/hide\]#s', "<font color=red>скрытый текст</font>", $text);
    $date=date("d.m.y",$x[7]);
    $cc=$x[6]-(int)$x[10];
    $count=$x[6]; if(!$count) $count="неограничено";
    $expire=(int)$x[11]; if($expire) $expire="⏱ Срок: <b>$expire</b> дней"; else $expire="";
    if($cat && $x[8]!=$cat) continue;
    $actions="";
    if($do=="buy") {
        if($x[1]) continue; 
        if($cc>0) $actions="<a href='?inc=$inc&do=buy&cat=$cat&itemid=$x[0]'>🛒 Купить</a>";
    }
    elseif($do=="create") {
        if($x[2]!=$nick && !$admin) continue; 
        if($x[1]) $action="<font color=green>Разрешить</font>"; else $action="Запретить"; 
        $actions="<a href='?inc=shop&do=create&cat=$cat&itemid=$x[0]&act=edit'>✏️ Редактировать</a> <a href='?inc=shop&do=create&cat=$cat&itemid=$x[0]&act=deny'>$action</a>"; 
        if($admin) $actions.=" <a href='?inc=shop&do=create&cat=$cat&itemid=$x[0]&act=delete' onclick='return confirm(\"При удалении эта вещь будет удалена у всех пользователей! Вы действительно хотите удалить эту вещь?\");'>🗑️ Удалить</a>";
    }
    
    // Карточка товара
    $output.="<div class='product-card'>
        <img src='".webpath("shop/$x[0].jpg")."' class='product-image' alt='$x[3]'>
        <div class='product-id'>#$x[0]</div>
        <div class='product-title'>$x[3]</div>
        <div class='product-description'>$text</div>
        <div class='product-meta'>
            👤 <a href='?inc=info&nick=$x[2]' target=_blank>$x[2]</a><br>
            📅 $date
        </div>
        <div class='product-footer'>
            ".($expire ? "<div class='product-meta'>$expire</div>" : "")."
            <div class='product-stock'>📦 На складе: <b>$cc/$count</b></div>
            <div class='product-price'>💰 $x[5] пунктов</div>
            <div class='product-actions'>$actions</div>
        </div>
    </div>";
    $num++;
}

// Закрываем сетку товаров
$output .= "</div>";

$output.="Всего найдено <b>$num</b>";
	if(count($cats)) {
    $output .= "</div></div>"; // Закрываем products-content и shop-container
}
}

//MY ITEMS	
if($do=="my") { 
	$htmlitems=[];
	foreach($items as $key=>$x) {
		$text=$x[4];
		$text=preg_replace('#\[hide\](.*?)\[/hide\]#s', "<font color=red>$1</font>", $text);
		$date=date("d.m.y",$x[7]);
		$expire=(int)$x[11]; if($expire) $expire="Срок годности до: <b>".date("d.m.y",$x[11])."</b><br>"; else $expire="";
		$actions="<a href=# onclick='give(\"$x[0]\",\"$x[7]\");'>Подарить</a> | <a href='?inc=$inc&do=my&sell=$x[0]&from=$x[7]' onclick='return confirm(\"Вы уверенны?\");'>Выкинуть</a>";
		$htmlitems[]="<table width=500><tr><td width=100 align=center><img src='".webpath("shop/$x[0].jpg")."'> </td>
		<td align=left><b>#$x[0] - $x[3]</b><br><i>$text</i><br><i>$x[9]</i><br>Приобретено: $date</b><br>$expire Стоимость: <b>$x[5]</b> пунктов<br>$actions</td></tr></table><br>";
		$num++;
	}
	//sort reverse
	krsort($htmlitems);
	$output.="<script>function give(forid,from) {document.giveform.forid.value=forid; document.giveform.from.value=from;}</script>
	".implode("",$htmlitems)."
	Всего найдено <b>$num</b>";
}

//PAYMENT EXTRAS
if($do=="extra") {
	define('EXTRA',1);
	include("shop_extra.php");
}

//OUTPUT HTML
$points=$u['points'] ?? 0;
if($error) $error="<font color=red>$error</font><br><br>";
echo "<!DOCTYPE html>
<html>
<head>
<Title>Виртуальный магазин</title>
<meta charset=\"utf-8\">
<link rel=stylesheet type=text/css href=sovremenuy.css>
<style>
body.shop-body { 
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); 
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
    min-height: 100vh; 
    padding: 20px; 
}

.shop-container {
    display: flex;
    gap: 20px;
    max-width: 1400px;
    margin: 0 auto;
    align-items: flex-start;
}

.categories-sidebar {
    width: 250px;
    background: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    position: sticky;
    top: 20px;
}

.categories-sidebar::-webkit-scrollbar {
    width: 8px;
}

.categories-sidebar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.categories-sidebar::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 10px;
}

.categories-sidebar::-webkit-scrollbar-thumb:hover {
    background: #764ba2;
}

.categories-sidebar h3 {
    color: #667eea;
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 18px;
    border-bottom: 2px solid #667eea;
    padding-bottom: 10px;
}

.category-item {
    display: block;
    padding: 12px 15px;
    margin: 5px 0;
    background: #f5f7fa;
    border-radius: 8px;
    color: #333;
    text-decoration: none;
    transition: all 0.3s;
    border-left: 3px solid transparent;
}

.category-item:hover {
    background: #667eea;
    color: white;
    border-left-color: #764ba2;
    transform: translateX(5px);
}

.category-item.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-left-color: #764ba2;
}

.category-count {
    float: right;
    background: rgba(255,255,255,0.3);
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
}

.products-content {
    flex: 1;
    min-width: 0;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin: 20px 0;
}

.product-card {
    background: white;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.product-image {
    width: 150px;
    height: 150px;
    object-fit: contain;
    border-radius: 8px;
    margin: 0 auto 12px auto;
    display: block;
    background: #f5f7fa;
    padding: 10px;
}

.product-id {
    color: #999;
    font-size: 12px;
    margin-bottom: 5px;
}

.product-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
    min-height: 40px;
}

.product-description {
    font-size: 13px;
    color: #666;
    margin-bottom: 10px;
    line-height: 1.4;
    flex-grow: 1;
}

.product-meta {
    font-size: 12px;
    color: #888;
    margin-bottom: 8px;
}

.product-footer {
    border-top: 1px solid #eee;
    padding-top: 10px;
    margin-top: 10px;
}

.product-stock {
    font-size: 13px;
    color: #666;
    margin-bottom: 8px;
}

.product-price {
    font-size: 18px;
    font-weight: bold;
    color: #667eea;
    margin-bottom: 12px;
}

.product-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.product-actions a {
    flex: 1;
    text-align: center;
    padding: 8px 12px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white !important;
    border-radius: 6px;
    font-size: 13px;
    text-decoration: none;
    transition: all 0.3s;
}

.product-actions a:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

@media (max-width: 1200px) {
    .products-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .shop-container {
        flex-direction: column;
    }
    .categories-sidebar {
        width: 100%;
        position: static;
    }
    .products-grid {
        grid-template-columns: 1fr;
    }
}

/* НЕ затрагиваем select для градиентов - только прячем селект категорий */
.shop-container + select.text {
    display: none;
}

/* Стили для таблиц - НЕ трогаем font внутри */
table { 
    border-collapse: collapse; 
    width: 100%; 
    background: white; 
    border-radius: 10px; 
    overflow: hidden; 
    box-shadow: 0 5px 15px rgba(0,0,0,0.1); 
    margin: 15px 0; 
}

table tr:hover { 
    background: #f5f5f5; 
}

table td { 
    padding: 12px; 
    border-bottom: 1px solid #eee; 
}

table img { 
    border-radius: 8px; 
    box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
    max-width: 100px; 
}

/* Ссылки - НЕ трогаем внутри таблиц и форм */
center > a { 
    color: #667eea; 
    text-decoration: none; 
    transition: color 0.3s; 
}

center > a:hover { 
    color: #764ba2; 
    text-decoration: underline; 
}

.product-card a {
    color: #667eea;
    text-decoration: none
}


</style>
</head>
<body class=shop-body>
<span style="display:block;text-align:center"><b>Виртуальный магазин</b><br><br>
<a href=?inc=$inc&do=buy>Магазин</a> | <a href=?inc=$inc&do=my>Мои вещи</a> | <a href=?inc=$inc&do=extra>Функции</a> $modlinks
<br><br>
$changenickform
У вас <b>$points</b> пунктов. В магазине уже куплено <b>$c_items</b>. <br><br>
$error
$output
<br><br>
</span>
</body>
</html>
";