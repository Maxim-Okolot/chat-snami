<?php
// vote-webhook.php

// Получаем данные из POST-запроса
$data = json_decode(file_get_contents('php://input'), true);

// Проверяем, что пришли нужные параметры
$user_id = isset($data['user_id']) ? $data['user_id'] : null;
$vote = isset($data['vote']) ? $data['vote'] : null;

// Здесь должна быть твоя логика: проверка, запись в БД, подсчёт лайков/дизлайков и т.д.
// Пример ответа (замени на свою реальную обработку!):

if (!$user_id || !$vote) {
    echo json_encode([
        "success" => false,
        "error" => "Некорректные данные"
    ]);
    exit;
}

// Пример: всегда успех, просто для теста
echo json_encode([
    "success" => true,
    "nickname" => "FunnyBunny",
    "likes" => 123,
    "dislikes" => 10,
    "rating" => 113,
    "message" => "Ваш голос учтён!"
]);
?>