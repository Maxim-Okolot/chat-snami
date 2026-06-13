<?php
$db = new PDO('mysql:host=localhost;dbname=snami_mp;charset=utf8', 'snami', '13011987E');
session_start();
$user = $_SESSION['user'] ?? $_COOKIE['user'] ?? 'Гость';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($_POST['delete']) && !empty($_POST['id'])) {
        $id = (int)$_POST['id'];
        $stmt = $db->prepare("SELECT user FROM comments WHERE id=?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if ($row && ($row['user'] == $user)) {
            $db->prepare("DELETE FROM comments WHERE id=?")->execute([$id]);
        }
        echo json_encode(['ok'=>1]);
        exit;
    }
    $nick = $_POST['nick'] ?? '';
    $text = strip_tags($_POST['text'] ?? '');
    $date = date('d.m.Y H:i');
    if ($nick && $text) {
        $stmt = $db->prepare("INSERT INTO comments (nick, user, text, date) VALUES (?, ?, ?, ?)");
        $stmt->execute([$nick, $user, $text, $date]);
        echo json_encode(['ok'=>1]);
    } else {
        echo json_encode(['error'=>'Invalid data']);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $nick = $_GET['nick'] ?? '';
    if ($nick) {
        $stmt = $db->prepare("SELECT * FROM comments WHERE nick=? ORDER BY id DESC LIMIT 100");
        $stmt->execute([$nick]);
        $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach($comments as &$c) {
            $c['is_owner'] = ($c['user'] == $user);
        }
        echo json_encode($comments);
    } else {
        echo json_encode([]);
    }
    exit;
}
?>