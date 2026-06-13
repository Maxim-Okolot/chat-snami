<?php
session_start();
include("/usr/share/php/mpchat/ini.php");

header('Content-Type: application/json; charset=utf-8');

$user_id = intval($_GET['user_id']);

if (!$user_id) {
    die(json_encode(['error' => 'Некорректный user_id'], JSON_UNESCAPED_UNICODE));
}

$stmt = mysqli_query($db, "SELECT 
    SUM(vote_type = 1) as likes, 
    SUM(vote_type = 0) as dislikes 
    FROM photo_votes WHERE user_id = '".$user_id."'");
$result = mysqli_fetch_assoc($stmt);

echo json_encode([
    'likes' => intval($result['likes']),
    'dislikes' => intval($result['dislikes'])
], JSON_UNESCAPED_UNICODE);
?>