<?php
/**
 * JSON API лайков профиля. Подключается из info.php при profile_api=…
 * (на хостинге отдельные get_likes.php / profile_like.php могут отдавать 404).
 */
header('Content-Type: application/json; charset=utf-8');

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

$api = isset($_GET['profile_api']) ? trim((string) $_GET['profile_api']) : '';

/** Только лайки текущего календарного месяца (с 1-го числа счётчик обнуляется логически). */
$sqlMonth = 'YEAR(created_at) = YEAR(CURDATE()) AND MONTH(created_at) = MONTH(CURDATE())';

if ($api === 'get_likes') {
    $photo_owner = trim($_GET['photo_owner'] ?? $_GET['nick'] ?? '');
    $voter_nick_param = trim($_GET['voter_nick'] ?? '');

    if ($photo_owner === '') {
        die(json_encode(['success' => false, 'error' => 'Не указан владелец фото']));
    }

    try {
        $stmt = $pdo->prepare("SELECT COUNT(*) as total FROM photo_likes WHERE photo_owner = ? AND $sqlMonth");
        $stmt->execute([$photo_owner]);
        $total = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

        $stmt = $pdo->prepare(
            "SELECT voter_nick, voter_avatar, created_at FROM photo_likes WHERE photo_owner = ? AND $sqlMonth ORDER BY created_at DESC LIMIT 50"
        );
        $stmt->execute([$photo_owner]);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $viewer_has_liked = null;
        if ($voter_nick_param !== '') {
            $st = $pdo->prepare(
                "SELECT 1 FROM photo_likes WHERE photo_owner = ? AND voter_nick = ? AND $sqlMonth LIMIT 1"
            );
            $st->execute([$photo_owner, $voter_nick_param]);
            $viewer_has_liked = (bool) $st->fetchColumn();
        }

        $out = [
            'success' => true,
            'total_likes' => (int) $total,
            'users' => $users,
        ];
        if ($viewer_has_liked !== null) {
            $out['viewer_has_liked'] = $viewer_has_liked;
        }
        echo json_encode($out);
    } catch (PDOException $e) {
        die(json_encode(['success' => false, 'error' => 'Ошибка при выполнении запроса']));
    }
    exit;
}

if ($api === 'set_like' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!is_array($data)) {
        die(json_encode(['success' => false, 'error' => 'Некорректные данные']));
    }

    $photo_owner = trim($data['photo_owner'] ?? '');
    $voter_nick = trim($data['voter_nick'] ?? '');
    $voter_avatar = trim($data['voter_avatar'] ?? '');

    if ($photo_owner === '' || $voter_nick === '') {
        die(json_encode(['success' => false, 'error' => 'Не указаны обязательные параметры']));
    }

    if ($photo_owner === $voter_nick) {
        die(json_encode(['success' => false, 'error' => 'Нельзя лайкнуть свой профиль']));
    }

    $sessionNick = (isset($u) && is_array($u) && !empty($u['nick'])) ? (string) $u['nick'] : '';
    if (!empty($authorize) && $sessionNick !== '' && $voter_nick !== $sessionNick) {
        die(json_encode(['success' => false, 'error' => 'Ник не совпадает с сессией']));
    }

    try {
        $stmt = $pdo->prepare(
            'SELECT created_at FROM photo_likes WHERE photo_owner = ? AND voter_nick = ? LIMIT 1'
        );
        $stmt->execute([$photo_owner, $voter_nick]);
        $existing = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($existing) {
            $rowMonth = date('Y-m', strtotime($existing['created_at']));
            $nowMonth = date('Y-m');
            if ($rowMonth === $nowMonth) {
                die(json_encode([
                    'success' => false,
                    'error' => 'Вы уже лайкнули этот профиль в этом месяце',
                ], JSON_UNESCAPED_UNICODE));
            }
            $stmt = $pdo->prepare(
                'UPDATE photo_likes SET created_at = NOW(), voter_avatar = ? WHERE photo_owner = ? AND voter_nick = ?'
            );
            $stmt->execute([$voter_avatar, $photo_owner, $voter_nick]);
        } else {
            $stmt = $pdo->prepare(
                'INSERT INTO photo_likes (photo_owner, voter_nick, voter_avatar, created_at)
                 VALUES (?, ?, ?, NOW())'
            );
            $stmt->execute([$photo_owner, $voter_nick, $voter_avatar]);
        }

        $stmt = $pdo->prepare("SELECT COUNT(*) FROM photo_likes WHERE photo_owner = ? AND $sqlMonth");
        $stmt->execute([$photo_owner]);
        $total = (int) $stmt->fetchColumn();

        echo json_encode([
            'success' => true,
            'total_likes' => $total,
            'message' => 'Лайк поставлен!',
        ], JSON_UNESCAPED_UNICODE);
    } catch (PDOException $e) {
        if ((int) $e->errorInfo[1] === 1062) {
            echo json_encode([
                'success' => false,
                'error' => 'Вы уже лайкнули этот профиль',
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
        die(json_encode(['success' => false, 'error' => 'Ошибка при сохранении лайка']));
    }
    exit;
}

if ($api === 'top_likes') {
    try {
        $stmt = $pdo->query(
            "SELECT photo_owner, COUNT(*) AS likes_count
             FROM photo_likes
             WHERE YEAR(created_at) = YEAR(CURDATE())
               AND MONTH(created_at) = MONTH(CURDATE())
             GROUP BY photo_owner
             ORDER BY likes_count DESC, photo_owner ASC
             LIMIT 10"
        );
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $ruMonths = [
            1 => 'январь', 2 => 'февраль', 3 => 'март', 4 => 'апрель', 5 => 'май', 6 => 'июнь',
            7 => 'июль', 8 => 'август', 9 => 'сентябрь', 10 => 'октябрь', 11 => 'ноябрь', 12 => 'декабрь',
        ];
        $m = (int) date('n');
        $periodTitle = ($ruMonths[$m] ?? date('F')) . ' ' . date('Y');
        $top = [];
        foreach ($rows as $r) {
            $top[] = [
                'nick' => $r['photo_owner'],
                'likes_count' => (int) $r['likes_count'],
            ];
        }
        echo json_encode([
            'success' => true,
            'period_title' => $periodTitle,
            'top' => $top,
        ], JSON_UNESCAPED_UNICODE);
    } catch (PDOException $e) {
        die(json_encode(['success' => false, 'error' => 'Ошибка при выполнении запроса']));
    }
    exit;
}

echo json_encode(['success' => false, 'error' => 'Неверный запрос']);
exit;
