<?php
session_start();

/* До mpchat/ini.php: иначе в ответ попадает вся HTML-страница вместе с JSON */
if (isset($_GET['snamik_horoscope'])) {
    require __DIR__ . '/api/horoscope.php';
    exit;
}

include("/usr/share/php/mpchat/ini.php");

if (!empty($_GET['forum_api'])) {
    require __DIR__ . '/forum_post_votes_bridge.php';
    exit;
}