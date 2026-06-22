<?php
/*========================================== 
    Appointment: Мод Друзья
    File: frends.php
    Author: Sloopy
    Данный код защищен авторскими правами
===========================================*/
if(!defined('CHAT')) die();

//check sess
if(!$authorize) {
    if($admin) errorpage("Для игры необходима авторизация под ником в чате.");
    else errorpage("Неправильная сессия или вы не зарегистрированы.");
}

//set nick
if($authorize) $nick=$u['nick']; elseif(!$nick) $nick=$mpnick;
global $db, $tb_users, $s_time;

function sictime($timediff){
    $oneMinute=60;
    $oneHour=60*60;
    $oneDay=60*60*24;
    $dayfield=floor($timediff/$oneDay);
    $hourfield=floor(($timediff-$dayfield*$oneDay)/$oneHour);
    $minutefield=floor(($timediff-$dayfield*$oneDay-$hourfield*$oneHour)/$oneMinute);
    $secondfield=floor(($timediff-$dayfield*$oneDay-$hourfield*$oneHour-$minutefield*$oneMinute));
    $time_1="$hourfield ч. $minutefield м. $secondfield сек.";
    return $time_1;
}

$user = $u;
if (isset($_GET['id']))$sid = intval($_GET['id']);
else $sid = $user['id'];
$ank = readuser("",$sid);
$time = $s_time;


/*=============== ГЕТ ЗАПРОСЫ МОДА НАЧАЛО ===============*/
if (isset($_GET['ok'])) {
$ok = intval($_GET['ok']);
$res=mysqli_query($db,"SELECT COUNT(*) AS `c` FROM `$tb_users` WHERE `id` = '".$ok."' LIMIT 1") or die(mysqli_error($db));
$row=mysqli_fetch_assoc($res); $count_users=$row['c'];
if($count_users == 0) {print json_encode('no users');exit;}
$a=mysqli_query($db,"SELECT COUNT(*) AS `c` FROM `snami_frends_new` WHERE `user`='".$ok."' AND `to`='".$user['id']."'") or die(mysqli_error($db));
$row1=mysqli_fetch_assoc($a); $a_count=$row1['c'];

$us_r=mysqli_query($db,"SELECT * FROM `$tb_users` WHERE `id` = '".$ok."' LIMIT 1") or die(mysqli_error($db));
$as=mysqli_fetch_assoc($us_r);

if ($a_count==0) {
print json_encode('error');
} else {

$a1=mysqli_query($db,"SELECT COUNT(*) AS `c` FROM `snami_frends_new` WHERE (`user` = '".$user['id']."' AND `to` = '".$ok."') OR (`user` = '".$ok."' AND `to` = '".$user['id']."')") or die(mysqli_error($db));
$row2=mysqli_fetch_assoc($a1); $c3=$row2['c'];
if($c3 >= 1) {
mysqli_query($db,"INSERT INTO `snami_frends` (`user`, `frend`, `time`, `i`) values('".$user['id']."', '".$ok."', '".$time."', '1')") or die(mysqli_error($db));
mysqli_query($db,"INSERT INTO `snami_frends` (`user`, `frend`, `time`, `i`) values('".$ok."', '".$user['id']."', '".$time."', '1')") or die(mysqli_error($db));
mysqli_query($db,"DELETE FROM `snami_frends_new` WHERE `user` = '".$ok."' AND `to` = '".$user['id']."' LIMIT 1") or die(mysqli_error($db));
mysqli_query($db,"DELETE FROM `snami_frends_new` WHERE `user` = '".$user['id']."' AND `to` = '".$ok."' LIMIT 1") or die(mysqli_error($db));
mysqli_query($db,"OPTIMIZE TABLE `snami_frends`") or die(mysqli_error($db));
mysqli_query($db,"OPTIMIZE TABLE `snami_frends_new`") or die(mysqli_error($db)); 

// уведомление в почту
$f_us = readuser("",$ok);
$nick_us = readuser("",$user['id']);
$text = "Добавил".($nick_us['mw'] == 0 ? null : "a")." ".$nick_us['nick']." вас в список своих друзей!";
 sendpost($f_us['nick'],"Система","Друзья",$text);       
}
header("Location: index.php?inc=info&userid=".$ok."&frend_ok=".$ok."");
exit;
}
}

if (isset($_GET['no'])) {
$no = intval($_GET['no']); 
$res=mysqli_query($db,"SELECT COUNT(*) AS `c` FROM `$tb_users` WHERE `id` = '".$no."' LIMIT 1") or die(mysqli_error($db));
$row=mysqli_fetch_assoc($res); $count_users=$row['c'];
if($count_users == 0) {print json_encode('no users'); exit;}
mysqli_query($db,"DELETE FROM `snami_frends` WHERE `user` = '".$user['id']."' AND `frend` = '".$no."' LIMIT 1") or die(mysqli_error($db));
mysqli_query($db,"DELETE FROM `snami_frends` WHERE `user` = '".$no."' AND `frend` = '".$user['id']."' LIMIT 1") or die(mysqli_error($db));
mysqli_query($db,"DELETE FROM `snami_frends_new` WHERE `user` = '".$no."' AND `to` = '".$user['id']."' LIMIT 1") or die(mysqli_error($db));
mysqli_query($db,"DELETE FROM `snami_frends_new` WHERE `user` = '".$user['id']."' AND `to` = '".$no."' LIMIT 1") or die(mysqli_error($db));
header("Location: index.php?inc=info&userid=".$no."&frend_no=".$no."");

exit; 
}
// Добавляем
if (isset($_GET['add'])) {
$add=intval($_GET['add']);
$res=mysqli_query($db,"SELECT COUNT(*) AS `c` FROM `$tb_users` WHERE `id` = '".$add."' LIMIT 1") or die(mysqli_error($db));
$row=mysqli_fetch_assoc($res); $count_users=$row['c'];
if($count_users == 0) {print json_encode('no users');exit;}

$res1=mysqli_query($db,"SELECT COUNT(*) AS `c` FROM `snami_frends` WHERE (`user` = '".$user['id']."' AND `frend` = '".$add."') OR (`user` = '".$add."' AND `frend` = '".$user['id']."') LIMIT 1") or die(mysqli_error($db));
$row1=mysqli_fetch_assoc($res1); $count_users2=$row1['c'];
if ($count_users2 >= 1)   {print json_encode('yes frend');exit;}
$res2=mysqli_query($db,"SELECT COUNT(*) AS `c` FROM `snami_frends_new` WHERE (`user` = '".$user['id']."' AND `to` = '".$add."') OR (`user` = '".$add."' AND `to` = '".$user['id']."') LIMIT 1") or die(mysqli_error($db));
$row2=mysqli_fetch_assoc($res2); $count_users3=$row2['c'];
if ($count_users3==1)   {print json_encode('yes add');exit;}
if ($add==$user['id']){print json_encode('no my');exit;}

  $query = "INSERT INTO `snami_frends_new` (`user`, `to`, `time`) VALUES ('".$user['id']."', '".$add."', '".$time."');";
  mysqli_query($db,$query) or die(mysqli_error($db));
//mysqli_query($db,"OPTIMIZE TABLE `snami_frends_new`") or die(mysqli_error($db));
$f_us = readuser("",$add);
// уведомление в почту
$text = "Вас хочет добавить в свой список друзей, пользователь [b]".$u['nick']."[/b] <a href=index.php?inc=frends&ok=".$u['id']." target=_blank class=p-btn-ok>Принять</a> &#124; <a href=index.php?inc=frends&no=".$u['id']." target=_blank class=p-btn-no>Отказаться</a>";
 sendpost($f_us['nick'],"Система","Друзья",$text);  
print json_encode('add');
exit;

}
// Отмена заявки
if (isset($_GET['otm'])) {
$no = intval($_GET['otm']);
$res=mysqli_query($db,"SELECT COUNT(*) AS `c` FROM `$tb_users` WHERE `id` = '".$no."' LIMIT 1") or die(mysqli_error($db));
$row=mysqli_fetch_assoc($res); $count_users=$row['c'];
if($count_users == 0) {print json_encode('no users'); exit;}
$res1=mysqli_query($db,"SELECT COUNT(*) AS `c` FROM `snami_frends_new` WHERE (`user` = '".$user['id']."' AND `to` = '".$no."') OR (`user` = '".$no."' AND `to` = '".$user['id']."') LIMIT 1") or die(mysqli_error($db));
$row1=mysqli_fetch_assoc($res1); $count_users2=$row1['c'];
if ($count_users2>0){
mysqli_query($db,"DELETE FROM `snami_frends` WHERE `user` = '".$user['id']."' AND `frend` = '".$no."' LIMIT 1") or die(mysqli_error($db));
mysqli_query($db,"DELETE FROM `snami_frends` WHERE `user` = '".$no."' AND `frend` = '".$user['id']."' LIMIT 1") or die(mysqli_error($db));
mysqli_query($db,"DELETE FROM `snami_frends_new` WHERE `user` = '".$no."' AND `to` = '".$user['id']."' LIMIT 1") or die(mysqli_error($db));
mysqli_query($db,"DELETE FROM `snami_frends_new` WHERE `user` = '".$user['id']."' AND `to` = '".$no."' LIMIT 1") or die(mysqli_error($db));
mysqli_query($db,"OPTIMIZE TABLE `snami_frends`") or die(mysqli_error($db));
mysqli_query($db,"OPTIMIZE TABLE `snami_frends_new`") or die(mysqli_error($db));
print json_encode('otm');
exit;
}
print json_encode('no request');
exit;
}
// Удаляем из друзей
if (isset($_GET['del'])) { 
$del = intval($_GET['del']); 
$res=mysqli_query($db,"SELECT COUNT(*) AS `c` FROM `$tb_users` WHERE `id` = '".$del."' LIMIT 1") or die(mysqli_error($db));
$row=mysqli_fetch_assoc($res); $count_users=$row['c'];
if($count_users == 0) {print json_encode('no users'); exit;}
$res1=mysqli_query($db,"SELECT COUNT(*) AS `c` FROM `snami_frends` WHERE (`user` = '".$user['id']."' AND `frend` = '".$del."') OR (`user` = '".$del."' AND `frend` = '".$user['id']."') LIMIT 1") or die(mysqli_error($db));
$row1=mysqli_fetch_assoc($res1); $count_users2=$row1['c'];
if ($count_users2>0)    {
mysqli_query($db,"DELETE FROM `snami_frends` WHERE `user` = '".$user['id']."' AND `frend` = '".$del."' LIMIT 1") or die(mysqli_error($db));
mysqli_query($db,"DELETE FROM `snami_frends` WHERE `user` = '".$del."' AND `frend` = '".$user['id']."' LIMIT 1") or die(mysqli_error($db));
mysqli_query($db,"DELETE FROM `snami_frends_new` WHERE `user` = '".$del."' AND `to` = '".$user['id']."' LIMIT 1") or die(mysqli_error($db));
mysqli_query($db,"DELETE FROM `snami_frends_new` WHERE `user` = '".$user['id']."' AND `to` = '".$del."' LIMIT 1") or die(mysqli_error($db));
mysqli_query($db,"OPTIMIZE TABLE `snami_frends`") or die(mysqli_error($db));
mysqli_query($db,"OPTIMIZE TABLE `snami_frends_new`") or die(mysqli_error($db));
print json_encode('del');
exit;
}
print json_encode('no frend');
exit; 
}
/*=============== ГЕТ ЗАПРОСЫ МОДА КОНЕЦ ===============*/
if(isset($_GET['ap'])) { 
$yes_user = '';
$save = $_POST['ok'] ?? '';
$nicks = $_POST['tonick'] ?? '';
$newpass = $_POST['newpass'] ?? '';
$ank = readuser($nicks,"");
if($save) {
//PASS
if($newpass) {
    writeuser(array('pass'=>cryptpass($newpass)),"",$ank['id']);
 }
}
die('
<form method="post" action="">
<div class="form-group">
<label for="them">Юзер:</label>
<input type="text" name="tonick" placeholder="Введите ник" />
<input type="text" name="newpass" placeholder="Введите новый пароль" />
</div>  
<input type="submit" name="ok" value="Изменить">
</form>');

}

if(isset($_GET['ast'])) { 
$yes_user = '';
$save = $_POST['ok'] ?? '';
$nicks = $_POST['tonick'] ?? '';
$newstatus = $_POST['status'] ?? '';
$ank = readuser($nicks,"");
if($save) {
//PASS
if($newstatus) {
    writeuser(array('status'=>$newstatus),"",$ank['id']);
 }
}
die('
<form method="post" action="">
<div class="form-group">
<label for="them">Юзер:</label>
<input type="text" name="tonick" placeholder="Введите ник" />
<input type="text" name="status" placeholder="Введите новый статус" />
</div>  
<input type="submit" name="ok" value="Изменить">
</form>');
}

?>
