<?php
header('Content-Type: application/json; charset=utf-8');

// ========== НАСТРОЙКИ ПОДКЛЮЧЕНИЯ К БД ==========
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

// Получаем топ-10 фото за текущий месяц
$stmt = $pdo->prepare("
    SELECT 
        photo_owner,
        COUNT(*) as likes_count
    FROM photo_likes
    WHERE YEAR(created_at) = YEAR(CURDATE())
      AND MONTH(created_at) = MONTH(CURDATE())
    GROUP BY photo_owner
    ORDER BY likes_count DESC
    LIMIT 10
");
$stmt->execute();
$top_photos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    'success' => true,
    'month' => date('F Y'),
    'top_photos' => $top_photos
]);