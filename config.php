<?php
$config=[];
	
//секретные строки
$config['superpass']='$1$a4a2bfb3$XFl1Ex68FVJmTSPXiCnaq.'; //уникальный хеш менять не нужно
$config['secret']="a501dda360"; //секретная строка для md5 шифрования ключей
	
//подключение к базе данных
$config['db_host']="localhost";
$config['db_base']="snami_mp";
$config['db_user']="snami_mp";
$config['db_pass']="f7b1c49c72";
	
//лицензионный ключ чата
$config['engine_hash']="74a948b00999da5043cf4adbd8545104";		

//прочие настройки
$config['nick_syntax']='!#$%^&*[]()_+—=@®©™äöüґєіїў'; //разрешённые символы для ников в параметрах 
