<?php
if(!defined('CHAT')) die();

if (!empty($_GET['profile_api'])) {
    require __DIR__ . '/profile_likes_bridge.php';
    exit;
}

//check user
$u1=readuser($nick, $userid);
if(!$u1) errorpage("Этот пользователь уже удален из базы.");  
elseif(!$u1['pass']) errorpage("Этот пользователь ещё не зарегистрирован."); 

//set views 
if($u1['viewip']!=$_SERVER['REMOTE_ADDR']) {
	$u1['views']+=1; $u1['viewip']=$_SERVER['REMOTE_ADDR']; 
	mysqli_query($db, "update `$tb_users` set views='".$u1['views']."', viewip='".$u1['viewip']."' where id='".(int)$u1['id']."'");
}

//SET OUTPUT
$vars=[];
$vars['userid']=$u1['id'];
$vars['chat']=''; //deprecated
$vars['nick']=$u1['nick'];
$vars['regdate']=$u1['regdate'];
$vars['name']=$u1['name'];
$vars['country']=$u1['country']; $vars['land']=$u1['country']; 
$vars['city']=$u1['city']; $vars['stadt']=$u1['city']; 
$vars['mw']=$u1['mw'];
$vars['email']="";
$vars['homepage']=$u1['homepage']; $vars['home']=$u1['homepage'];
$vars['icq']=$u1['icq'];
$vars['lastvisit']=date("d.m.y - H:i",$u1['lastvisit']);
$vars['about']=str_replace("&lt;br&gt;","<br>",$u1['about']);
$vars['colornick']=$u1['colornick']; $vars['nickcolor']=$u1['colornick'];
$vars['colortext']=$u1['colortext']; $vars['color']=$u1['colortext'];
$vars['time_h']=floor($u1['onlinetime']/60); 
$vars['time_m']=$u1['onlinetime']-$vars['time_h']*60; 
$vars['time']=$vars['time_h']." час. ".$vars['time_m']." мин"; 
$vars['msg']=$u1['msg'];
$vars['foto']=webpath($u1['foto']); 
$vars['icon']=webpath($u1['icon']);
$vars['avator']=webpath($u1['avator']);
$vars['views']=$u1['views'];
$vars['ref']=$u1['ref'];
$vars['love']=$u1['love'];
$vars['gamewins']=$u1['gamewins'];
$vars['points']=$u1['points'];
$vars['gallery']=0; if($cfg['gal_upload']) $vars['gallery']=$u1['gallery']; 


//set age
list($d1, $m1, $y1) = explode(".",date("j.n.Y",$s_time)); //numeric format 1.2.1990
$x=explode(".",$u1['birthday']);
$x[0]=(int)($x[0] ?? 0);
$x[1]=(int)($x[1] ?? 0);
$x[2]=(int)($x[2] ?? 0);
$age=$y1-$x[2];
$d=$d1-$x[0]; 
$m=$m1-$x[1];
if($m<0 || ($m==0 && $d<0)) $age--;
if($age<7 || $age>100) $age="";
$vars['age']=$age;

//set birthday
$birthday="";
if($x[0]<10) $x[0]="0".$x[0]; if($x[1]<10) $x[1]="0".$x[1];
if($x[0]>0 || $x[1]>0 || $x[2]>0) $birthday=implode(".",$x);
$vars['birthday']=$birthday;

//set status
$status="";
$a=file("data/status.sys");
for($i=0;$i<count($a);$i++) {$x=explode("|",$a[$i]); if($x[0]==$u1['status']) {$status=$x[1]; break;}}
$vars['status']=$status;

//set fields
$fields=explode("<",$u1['fields']);
for($i=1;$i<=20;$i++) $vars["field$i"]=$fields[$i] ?? '';

//set script
$script="";

//shop
if(is_file("data/shop.sys")) {
	$exp=0; $n=0;
	$script.="<script type=\"text/javascript\">\nvar items=new Array();\n";
	$shopfile="data/shop/".(int)$u1['id'].".sys";
	if(is_file($shopfile)) {
		$a=file($shopfile); 
		for($i=0;$i<count($a);$i++) {$x=explode("|",$a[$i]);
			$x[11]=(int)$x[11]; if($x[11] && $x[11]<$s_time) { $a[$i]=""; $exp++; continue;}
			$item=$x[0]; $name=$x[3]; $date=date("d.m.y",$x[7]); $from=$x[9]; $text=$x[4];
			$text=preg_replace('#\[hide\](.*?)\[/hide\]#s', "&laquo;скрытый текст&raquo;", $text);
			$script.="items[$n]=new Array('$item','$name','$date','$from','$text');\n";
			$n++;
		}
	}
	$script.="</script>\n";
	if($exp) file_put_contents($shopfile, implode("",$a), LOCK_EX);
}

//clans
if(is_file("data/clan/clan.sys")) {
	$inclans=explode(",", $u1['inclans']);
	$script.="<script type=\"text/javascript\">var clan=new Array();\nvar clans=new Array();\n";
	if($inclans[0]>0) {
		$clans=[]; $a=file("data/clan/clan.sys");
		for($i=0; $i<count($a); $i++) {
			$x=explode("|",$a[$i]); $clans[$x[0]]=$x;
		}
		for($i=0; $i<count($inclans); $i++) { 
			$x=$clans[$inclans[$i]] ?? [];
			if(!$x) continue;
			$x[2]=@date("d.m.y",$x[2]); 
			$x[7]=""; if(is_file("data/clan/$x[0].gif")) $x[7]=1;
			$x[8]=""; if(is_file("data/clan/$x[0].jpg")) $x[8]=1;
			unset($x[11]);
			$json=json_encode($x);
			if($i==0) $script.="clan=$json;\n";
			$script.="clans[$i]=$json;\n";
		}
	}
	$script.="</script>\n";
}

$u_nav_menu_c = '';

//################### Добавка в друзья кнопки ###################//
$user_id = (int)$u['id'];
$u1_id   = (int)$u1['id'];
// Проверка на наличие в друзьях (обоюдно)
$q1 = "SELECT COUNT(*) AS c FROM snami_frends 
       WHERE (user = $user_id AND frend = $u1_id) 
          OR (user = $u1_id AND frend = $user_id) 
       LIMIT 1";
$res1 = mysqli_query($db, $q1) or die(mysqli_error($db));
$frend = mysqli_fetch_assoc($res1)['c'];

// Проверка на наличие заявки в друзья
$q2 = "SELECT COUNT(*) AS c FROM snami_frends_new 
       WHERE user = $user_id AND `to` = $u1_id 
       LIMIT 1";
$res2 = mysqli_query($db, $q2) or die(mysqli_error($db));
$frend_new = mysqli_fetch_assoc($res2)['c'];

// Входящая заявка: владелец анкеты ($u1) отправил заявку текущему пользователю ($u)
$q3 = "SELECT COUNT(*) AS c FROM snami_frends_new 
       WHERE user = $u1_id AND `to` = $user_id 
       LIMIT 1";
$res3 = mysqli_query($db, $q3) or die(mysqli_error($db));
$frend_incoming = (int) mysqli_fetch_assoc($res3)['c'];

$frend_count = (int) $frend;

$vars['friend_profile_block'] = '';

// В друзья (старая навигация + блок в карточке анкеты)
if (
    $u1['id'] != $u['id'] && // чужая анкета
    $u1['nick'] != $cfg['nick_r'] &&    // не бот
    $vars['field17'] != '1'             // и не скрытая анкета
) {
    $uid = (int)$u1['id'];
    $nick = htmlspecialchars($u1['nick'], ENT_QUOTES);
    $nick_attr = htmlspecialchars($u1['nick'], ENT_QUOTES, 'UTF-8');

    if ($frend_count >= 1) {
        $u_nav_menu_c .= "<p class='active'>
            <a href='javascript:void(0);' onclick='FriendManager.removeFriend($uid, \"$nick\");' class='button'>
                <i class='fa fa-user-times'></i> Удалить из друзей
            </a>
        </p>\n";
        if (!empty($authorize)) {
            $vars['friend_profile_block'] = '<div class="friend-profile-actions-wrap"><button type="button" class="btn btn-secondary profile-friend-btn" data-action="remove" data-userid="' . $uid . '" data-nick="' . $nick_attr . '">Удалить из друзей</button></div>';
        }
    } elseif ($frend_incoming >= 1) {
        $u_nav_menu_c .= "<p class='active'>
            <a href='index.php?inc=frends&ok=$uid' class='button'><i class='fa fa-check'></i> Принять в друзья</a>
            &nbsp;
            <a href='index.php?inc=frends&no=$uid' class='button' style='background:#ff6e6e;'><i class='fa fa-times'></i> Отклонить</a>
        </p>\n";
        if (!empty($authorize)) {
            $vars['friend_profile_block'] = '<div class="friend-profile-actions-wrap friend-profile-actions-wrap--incoming">'
                . '<p class="friend-incoming-note">Этот пользователь хочет добавить вас в друзья.</p>'
                . '<div class="button-row friend-incoming-row">'
                . '<a class="btn btn-primary" href="index.php?inc=frends&ok=' . $uid . '">Принять</a>'
                . '<a class="btn btn-secondary" href="index.php?inc=frends&no=' . $uid . '">Отклонить</a>'
                . '</div></div>';
        }
    } elseif ((int)$frend_new === 1) {
        $u_nav_menu_c .= "<p class='active'>
            <a href='javascript:void(0);' onclick='FriendManager.cancelRequest($uid);' class='button' style='background: #ff6e6e;'>
                <i class='fa fa-times'></i> Отменить заявку
            </a>
        </p>\n";
        if (!empty($authorize)) {
            $vars['friend_profile_block'] = '<div class="friend-profile-actions-wrap"><button type="button" class="btn btn-secondary profile-friend-btn" data-action="cancel" data-userid="' . $uid . '">Отменить заявку</button></div>';
        }
    } else {
        $u_nav_menu_c .= "<p class='active'>
            <a href='javascript:void(0);' onclick='FriendManager.sendRequest($uid);' class='button'>
                <i class='fa fa-user-plus'></i> Добавить в друзья
            </a>
        </p>\n";
        if (!empty($authorize)) {
            $vars['friend_profile_block'] = '<div class="friend-profile-actions-wrap"><button type="button" class="btn btn-primary profile-friend-btn" data-action="add" data-userid="' . $uid . '">Добавить в друзья</button></div>';
        }
    }
}



//################### Навигация ###################//
$u_nav_menu = "";
$u_nav_menu.= '<span class='nav_btn'>';
$u_nav_menu.= $u_nav_menu_c;
$u_nav_menu.= '</span>';
if($u1['nick']==$cfg['nick_r']) $vars['u_nav']=''; else $vars['u_nav']=$u_nav_menu;


//################### Показ мини блока с друзьями ###################//

$uid = (int)$u1['id'];
$output = '';

// Получаем количество друзей
$result = mysqli_query($db, "SELECT COUNT(*) AS `c` FROM `snami_frends` WHERE `frend` = '$uid' AND `i` = '1'") or die(mysqli_error($db));
$k_post = mysqli_fetch_assoc($result)['c'];

// Получаем список друзей
$query = "SELECT * FROM `snami_frends` WHERE `frend` = '$uid' AND `i` = '1' ORDER BY RAND()";
$res = mysqli_query($db, $query) or die(mysqli_error($db));



$output .= "<div class='mini-wrap'>
<h2>Друзья в чате (<span class='count-friends'>$k_post</span>)</h2>
<div class='friends' id='friends'>";

if ($k_post == 0) {
    $output .= '<div class="u_noclan_text" style="text-align: center;">У пользователя нет друзей</div>';
} else {
    $counter = 0;
    $hidden_output = '';

    while ($row = mysqli_fetch_assoc($res)) {
        $user = readuser("", $row['user']);
        $avatar = ($user['icon'] == '' || $user['icon'] == '-' ? '/assets/img/nophoto.jpg' : $user['icon']);
        $nick = $user['nick'];
        $friend_html = '<div class="wrap-friends"><img src="'.$avatar.'" class="avatar"/><a href="index.php?inc=info&userid='.$row['user'].'" target="_blank">'.$nick.'</a></div>';

        if ($counter < 9) {
            $output .= $friend_html;
        } else {
            $hidden_output .= $friend_html;
        }

        $counter++;
    }

    if ($hidden_output != '') {
        $output .= '<div id="more-friends" style="display: none;">'.$hidden_output.'</div>';
        $output .= '<p style="text-align: center"><a href="#" class="show-friends-toggle">Показать остальных</a></p>';
    }
}

$output .= "</div></div>";

// Не показываем блок, если это бот или если в поле 17 указано 1
$vars['friends'] = (
    $u1['nick'] == $cfg['nick_r'] || 
    ($vars['field18'] == '1' && $u1['nick'] != $u['nick'])
) ? '' : $output;


// Текущий зритель (для лайков профиля в info.inc)
$viewer_avatar = '';
if (!empty($u['icon']) && $u['icon'] !== '-') {
    $viewer_avatar = webpath($u['icon']);
} elseif (!empty($u['avator']) && $u['avator'] !== '-') {
    $viewer_avatar = webpath($u['avator']);
} elseif (!empty($u['foto']) && $u['foto'] !== '-') {
    $viewer_avatar = webpath($u['foto']);
}
$profileViewerPayload = json_encode([
    'nick' => isset($u['nick']) ? (string) $u['nick'] : '',
    'avatar' => $viewer_avatar,
], JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS);
$vars['profile_viewer_json'] = $profileViewerPayload !== false
    ? $profileViewerPayload
    : '{"nick":"","avatar":""}';

//output
foreach($vars as $k=>$v) if(!strlen($v) && !substr_count($k,"field")) $vars[$k]="";

