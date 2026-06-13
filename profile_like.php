<?php
/**
 * Прямой POST (если веб-сервер отдаёт этот файл). Логика общая с profile_likes_bridge.php.
 */
$_GET['profile_api'] = 'set_like';
require __DIR__ . '/profile_likes_bridge.php';
