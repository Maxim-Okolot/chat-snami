<?php
header('Content-Type: application/json; charset=utf-8');

// Подключение к БД (замените на ваши данные)
$host = 'localhost';
$dbname = 'snami_mp';
$username = 'snami_mp';
$password = 'f7b1c49c72';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['success' => false, 'error' => 'Ошибка подключения к БД']));
}

// Получаем данные из POST
$data = json_decode(file_get_contents('php://input'), true);

$photo_owner = $data['photo_owner'] ?? '';
$voter_nick = $data['voter_nick'] ?? '';
$voter_avatar = $data['voter_avatar'] ?? '';

// Проверка данных
if (empty($photo_owner) || empty($voter_nick)) {
    die(json_encode(['success' => false, 'error' => 'Не указаны обязательные параметры']));
}

// Проверка: нельзя лайкать свою фотографию
if ($photo_owner === $voter_nick) {
    die(json_encode(['success' => false, 'error' => 'Нельзя лайкать собственное фото']));
}

// Проверка лимита времени (24 часа)
$stmt = $pdo->prepare("
    SELECT created_at 
    FROM photo_likes 
    WHERE photo_owner = ? AND voter_nick = ?
");
$stmt->execute([$photo_owner, $voter_nick]);
$existing = $stmt->fetch(PDO::FETCH_ASSOC);

if ($existing) {
    $last_vote = strtotime($existing['created_at']);
    $now = time();
    $hours_passed = ($now - $last_vote) / 3600;
    
    if ($hours_passed < 24) {
        $hours_left = ceil(24 - $hours_passed);
        die(json_encode([
            'success' => false, 
            'error' => "Вы уже лайкали это фото. Повторить можно через $hours_left ч."
        ]));
    }
    
    // Обновляем время лайка
    $stmt = $pdo->prepare("
        UPDATE photo_likes 
        SET created_at = NOW(), voter_avatar = ?
        WHERE photo_owner = ? AND voter_nick = ?
    ");
    $stmt->execute([$voter_avatar, $photo_owner, $voter_nick]);
    $action = 'updated';
} else {
    // Добавляем новый лайк
    $stmt = $pdo->prepare("
        INSERT INTO photo_likes (photo_owner, voter_nick, voter_avatar, created_at)
        VALUES (?, ?, ?, NOW())
    ");
    $stmt->execute([$photo_owner, $voter_nick, $voter_avatar]);
    $action = 'created';
}

// Получаем общее количество лайков
$stmt = $pdo->prepare("SELECT COUNT(*) as total FROM photo_likes WHERE photo_owner = ?");
$stmt->execute([$photo_owner]);
$total = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

echo json_encode([
    'success' => true,
    'action' => $action,
    'total_likes' => $total,
    'message' => $action === 'created' ? '❤️ Лайк поставлен!' : '❤️ Лайк обновлён!'
]);