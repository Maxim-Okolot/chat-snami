<?php
header('Content-Type: application/json');
session_start();

$json = json_decode(file_get_contents('php://input'), true);
if (!$json) {
    echo json_encode(['success' => false, 'error' => 'Неверные данные JSON']);
    exit;
}

$action = $json['action'] ?? '';

$noAuthActions = ['AddRequest', 'Проверка', 'Load', 'GetUserInfo', 'GetRequestsStats', 'GetUserRequests', 'GetSettings'];

if (!in_array($action, $noAuthActions)) {
    if (!isset($u) || !$u['id']) {
        echo json_encode(['success' => false, 'error' => 'Пользователь не авторизован']);
        exit;
    }
}

// Файл для хранения настроек
$settingsFile = 'radio_settings.json';

// Инициализация настроек
function initSettings() {
    global $settingsFile;
    
    if (!file_exists($settingsFile)) {
        $defaultSettings = [
            'request_limit' => 3 // По умолчанию 3 заявки
        ];
        file_put_contents($settingsFile, json_encode($defaultSettings));
        return $defaultSettings;
    }
    
    $settings = json_decode(file_get_contents($settingsFile), true);
    return $settings ?: ['request_limit' => 3];
}

// Сохранение настроек
function saveSettings($settings) {
    global $settingsFile;
    file_put_contents($settingsFile, json_encode($settings));
}

// Получение текущего лимита заявок
function getRequestLimit() {
    $settings = initSettings();
    return $settings['request_limit'] ?? 3;
}

// Функции initGlobalState, saveGlobalState, cleanForJs, getUserIP остаются без изменений
function initGlobalState() {
    $stateFile = 'radio_stateTest.json';
    
    if (!file_exists($stateFile)) {
        $initialState = [
            'efir' => 0,
            'stol' => 0,
            'theme' => '',
            'flag' => 1
        ];
        file_put_contents($stateFile, json_encode($initialState));
        return $initialState;
    }
    
    $state = json_decode(file_get_contents($stateFile), true);
    return $state ?: ['efir' => 0, 'stol' => 0, 'theme' => '', 'flag' => 1];
}

function saveGlobalState($state) {
    $stateFile = 'radio_stateTest.json';
    file_put_contents($stateFile, json_encode($state));
}

function cleanForJs($text) {
    if (empty($text)) return '';
    
    $text = str_replace(["\r", "\n", "\t"], ' ', $text);
    $text = preg_replace('/[\\x00-\\x1F\\x7F]/', '', $text);
    $text = addslashes($text);
    $text = htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
    
    return trim($text);
}

function getUserIP() {
    $ip_keys = ['HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR'];
    
    foreach ($ip_keys as $key) {
        if (array_key_exists($key, $_SERVER) === true) {
            foreach (explode(',', $_SERVER[$key]) as $ip) {
                $ip = trim($ip);
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false) {
                    return $ip;
                }
            }
        }
    }
    
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

// Обработка действий
switch ($action) {
    case 'SendMessage':
        handleSendMessage($json, $u);
        break;
        
    case 'В эфир':
        $state = initGlobalState();
        $state['efir'] = 1;
        saveGlobalState($state);
        echo json_encode(['success' => true, 'state' => $state]);
        break;
        
    case 'Выйти из эфира':
        $state = initGlobalState();
        $state['efir'] = 0;
        $state['stol'] = 0;
        saveGlobalState($state);
        echo json_encode(['success' => true, 'state' => $state]);
        break;
        
    case 'Открыть стол заявок':
        $state = initGlobalState();
        $state['stol'] = 1;
        saveGlobalState($state);
        echo json_encode(['success' => true, 'state' => $state]);
        break;
        
    case 'Закрыть стол заявок':
        $state = initGlobalState();
        $state['stol'] = 0;
        saveGlobalState($state);
        echo json_encode(['success' => true, 'state' => $state]);
        break;
        
    case 'Load':
        handleLoadRequests();
        break;
        
    case 'Play':
        handlePlayRequest($json, $u);
        break;
        
    case 'Delete':
        handleDeleteRequest($json);
        break;
        
    case 'AddRequest':
        handleAddRequest($json);
        break;
        
    case 'GetUserInfo':
        handleGetUserInfo();
        break;
        
    case 'GetRequestsStats':
        handleGetRequestsStats();
        break;
        
    case 'GetUserRequests':
        handleGetUserRequests();
        break;
        
    case 'UpdateStatus':
        handleUpdateStatus($json);
        break;

    // Новые действия для работы с настройками
    case 'GetSettings':
        handleGetSettings();
        break;
        
    case 'UpdateSettings':
        handleUpdateSettings($json);
        break;
        
    case 'Проверка':
        $state = initGlobalState();
        echo json_encode($state);
        break;
        
    default:
        echo json_encode(['success' => false, 'error' => 'Неизвестное действие']);
        break;
}

// Обработчик получения настроек
function handleGetSettings() {
    $settings = initSettings();
    echo json_encode([
        'success' => true,
        'request_limit' => $settings['request_limit']
    ]);
}

// Обработчик обновления настроек
function handleUpdateSettings($json) {
    $requestLimit = intval($json['request_limit'] ?? 3);
    
    // Валидация значения
    if ($requestLimit < 0) {
        echo json_encode(['success' => false, 'error' => 'Некорректное значение лимита']);
        return;
    }
    
    $settings = initSettings();
    $settings['request_limit'] = $requestLimit;
    saveSettings($settings);
    
    echo json_encode([
        'success' => true,
        'request_limit' => $requestLimit
    ]);
}

// Остальные функции остаются без изменений, кроме handleAddRequest
function handleGetUserInfo() {
    global $u;
    
    if (isset($u) && $u['id']) {
        echo json_encode([
            'authenticated' => true,
            'name' => $u['nick'],
            'id' => $u['id']
        ]);
    } else {
        echo json_encode([
            'authenticated' => false,
            'name' => 'Гость'
        ]);
    }
}

function handleGetRequestsStats() {
    global $u;
    
    $filename = 'requestsTest.json';
    $requests = [];
    
    if (file_exists($filename)) {
        $requests = json_decode(file_get_contents($filename), true) ?? [];
    }
    
    $totalRequests = count($requests);
    $userRequests = 0;
    
    $userIdentifier = '';
    if (isset($u) && $u['id']) {
        $userIdentifier = 'user_' . $u['id'];
    } else {
        $userIdentifier = 'guest_' . md5($_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT']);
    }
    
    foreach ($requests as $request) {
        if (isset($request['user_identifier']) && $request['user_identifier'] === $userIdentifier) {
            $userRequests++;
        }
    }
    
    echo json_encode([
        'success' => true,
        'total_requests' => $totalRequests,
        'user_requests' => $userRequests
    ]);
}

function handleGetUserRequests() {
    global $u;
    
    $filename = 'requestsTest.json';
    $requests = [];
    
    if (file_exists($filename)) {
        $requests = json_decode(file_get_contents($filename), true) ?? [];
    }
    
    $userIdentifier = '';
    if (isset($u) && $u['id']) {
        $userIdentifier = 'user_' . $u['id'];
    } else {
        $userIdentifier = 'guest_' . md5($_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT']);
    }
    
    $userRequests = array_filter($requests, function($request) use ($userIdentifier) {
        return isset($request['user_identifier']) && $request['user_identifier'] === $userIdentifier;
    });
    
    echo json_encode([
        'success' => true,
        'requests' => array_values($userRequests)
    ]);
}

function handleSendMessage($json, $user) {
    $type = $json['type'] ?? 'normal';
    $text = trim($json['text'] ?? '');
    $name = trim($json['name'] ?? '');
    
    if (empty($text)) {
        echo json_encode(['success' => false, 'error' => 'Текст сообщения не может быть пустым']);
        exit;
    }
    
    try {
        $messageText = '';
        
        switch ($type) {
            case 'normal': $messageText = $text; break;
            default: $messageText = $text;
        }
        
$simpleMessage = "<div style='color: white; background-color: #453b4a; font-family: Comic Sans MS; font-size: 18px; padding: 5px; display: inline-block; border-radius: 5px; margin: 2px; text-shadow: -0.5px -0.5px 0 #fff, 0.5px -0.5px 0 #fff, -0.5px 0.5px 0 #fff, 0.5px 0.5px 0 #fff;'>
<img width='50' height='45' src='https://vmfile.com/upload/838/386616193.png' align='middle'> " . $messageText . "</div>";
        
        if (function_exists('sendmsg')) {
            sendmsg(array(
                CHAT, 
                0,
                0,
                $user['nick'],
                '',
                $simpleMessage,
                time(),
                'FFFFFF',
                'FFFFFF',
                '', '', '', '', '', '',
                $user['id'],
                ''
            ), 0);
        }
        
        echo json_encode(['success' => true]);
        
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}

function handleLoadRequests() {
    $filename = 'requestsTest.json';
    $requests = [];
    
    if (file_exists($filename)) {
        $requests = json_decode(file_get_contents($filename), true) ?? [];
    }
    
    if (empty($requests)) {
        echo '<tr><td colspan="6" style="text-align: center;">Заявок пока нет</td></tr>';
    } else {
        $requests = array_reverse($requests);
        
        foreach ($requests as $request) {
            $currentStatus = $request['status'] ?? 'pending';
            
            $cleanSong = cleanForJs($request['song']);
            $cleanTo = cleanForJs($request['to']);
            $cleanComment = cleanForJs($request['comment']);
            $cleanName = cleanForJs($request['name']);
            
            $displayDate = isset($request['date_display']) ? $request['date_display'] : 
                          (isset($request['timestamp']) ? date('d.m.Y H:i', strtotime($request['timestamp'])) : '---');
            
            $displayIP = isset($request['ip']) ? $request['ip'] : '---';
            
            $ipLink = $displayIP !== '---' ? 
                'https://check-host.net/ip-info?host=' . urlencode($displayIP) : 
                '#';
            
            echo '<tr class="status-' . $currentStatus . '" data-request-id="' . $request['id'] . '" data-song="' . $cleanSong . '" data-to="' . $cleanTo . '" data-comment="' . $cleanComment . '" data-name="' . $cleanName . '">';
            
            echo '<td>';
            echo '<div class="song-title">' . htmlspecialchars($request['song']) . '</div>';
            echo '<div class="request-date">' . htmlspecialchars($displayDate) . '</div>';
            echo '</td>';
            
            echo '<td>';
            echo '<div class="user-name">' . htmlspecialchars($request['name']) . '</div>';
            echo '<div class="user-ip">';
            if ($displayIP !== '---') {
                echo '<a href="' . $ipLink . '" target="_blank" class="ip-link" title="Информация об IP-адресе">' . htmlspecialchars($displayIP) . '</a>';
            } else {
                echo htmlspecialchars($displayIP);
            }
            echo '</div>';
            echo '</td>';
            
            echo '<td>' . htmlspecialchars($request['to']) . '</td>';
            echo '<td>' . htmlspecialchars($request['comment']) . '</td>';
            
            echo '<td>';
            echo '<div class="search-buttons">';
            echo '<button class="search-btn copy" onclick="copySongName(\'' . $cleanSong . '\')" title="Копировать название">';
            echo '<i class="fas fa-copy"></i>';
            echo '</button>';
            echo '<button class="search-btn yandex" onclick="searchYandex(\'' . $cleanSong . '\')" title="Поиск в Яндексе">';
            echo '<i class="fab fa-yandex"></i>';
            echo '</button>';
            echo '<button class="search-btn vk" onclick="searchVK(\'' . $cleanSong . '\')" title="Поиск во ВКонтакте">';
            echo '<i class="fab fa-vk"></i>';
            echo '</button>';
            echo '<button class="search-btn hitmotop" onclick="searchHitmotop(\'' . $cleanSong . '\')" title="Поиск на Hitmotop">';
            echo '<i class="fas fa-music"></i>';
            echo '</button>';
            echo '</div>';
            echo '</td>';
            
            echo '<td>';
            echo '<select class="status-select" data-request-id="' . $request['id'] . '">';
            echo '<option value="pending" ' . ($currentStatus == 'pending' ? 'selected' : '') . '>В ожидании</option>';
            echo '<option value="queue" ' . ($currentStatus == 'queue' ? 'selected' : '') . '>В очереди</option>';
            echo '<option value="completed" ' . ($currentStatus == 'completed' ? 'selected' : '') . '>Выполнено</option>';
            echo '<option value="rejected" ' . ($currentStatus == 'rejected' ? 'selected' : '') . '>Отклонено</option>';
            echo '</select>';
            echo '</td>';
            echo '</tr>';
        }
    }
}

function handlePlayRequest($json, $user) {
    $id = $json['id'] ?? '';
    $zakaz = $json['zakaz'] ?? '';
    $to = $json['to'] ?? '';
    $comment = $json['comment'] ?? '';
    $nick = $json['nick'] ?? '';
    
    if (empty($id)) {
        echo json_encode(['success' => false, 'error' => 'ID заявки не указан']);
        return;
    }
    
    try {
        $messageText = "В эфире заказ: $zakaz от $nick";
        
        if (!empty($to)) {
            $messageText .= " для $to";
        }
        
        if (!empty($comment)) {
            $messageText .= ". Комментарий: $comment";
        }
        
$simpleMessage = "<div style='color: white; background-color: #453b4a; font-family: Comic Sans MS; font-size: 18px; padding: 5px; display: inline-block; border-radius: 5px; margin: 2px; text-shadow: -0.5px -0.5px 0 #fff, 0.5px -0.5px 0 #fff, -0.5px 0.5px 0 #fff, 0.5px 0.5px 0 #fff;'>
<img width='100' height='50' src='https://vmfile.com/upload/838/3109535810.png' align='middle'> " . $messageText . "</div>";
        
        if (function_exists('sendmsg')) {
            sendmsg(array(
                CHAT, 
                0,
                0,
                $user['nick'],
                '',
                $simpleMessage,
                time(),
                'FFFFFF',
                'FFFFFF',
                '', '', '', '', '', '',
                $user['id'],
                ''
            ), 0);
        }
        
        echo json_encode(['success' => true]);
        
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}

function handleDeleteRequest($json) {
    $id = $json['id'] ?? '';
    
    if (empty($id)) {
        echo json_encode(['success' => false, 'error' => 'ID заявки не указан']);
        return;
    }
    
    try {
        $filename = 'requestsTest.json';
        $requests = [];
        
        if (file_exists($filename)) {
            $requests = json_decode(file_get_contents($filename), true) ?? [];
        }
        
        $id = (int)$id;
        
        $newRequests = array_filter($requests, function($request) use ($id) {
            return (int)$request['id'] !== $id;
        });
        
        $newRequests = array_values($newRequests);
        
        if (file_put_contents($filename, json_encode($newRequests, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) === false) {
            throw new Exception('Не удалось записать файл');
        }
        
        echo json_encode(['success' => true]);
        
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}

function handleUpdateStatus($json) {
    $id = $json['id'] ?? '';
    $status = $json['status'] ?? '';
    
    if (empty($id)) {
        echo json_encode(['success' => false, 'error' => 'ID заявки не указан']);
        return;
    }
    
    $allowedStatuses = ['pending', 'queue', 'completed', 'rejected'];
    if (!in_array($status, $allowedStatuses)) {
        echo json_encode(['success' => false, 'error' => 'Неверный статус']);
        return;
    }
    
    try {
        $filename = 'requestsTest.json';
        $requests = [];
        
        if (file_exists($filename)) {
            $requests = json_decode(file_get_contents($filename), true) ?? [];
        }
        
        $id = (int)$id;
        
        $found = false;
        foreach ($requests as &$request) {
            if ((int)$request['id'] === $id) {
                $request['status'] = $status;
                $found = true;
                break;
            }
        }
        
        if (!$found) {
            echo json_encode(['success' => false, 'error' => 'Заявка не найдена']);
            return;
        }
        
        if (file_put_contents($filename, json_encode($requests, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) === false) {
            throw new Exception('Не удалось записать файл');
        }
        
        echo json_encode(['success' => true]);
        
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}

// Обновленная функция добавления заявки с поддержкой настраиваемого лимита
function handleAddRequest($json) {
    global $u;
    
    $to = trim($json['to'] ?? '');
    $song = trim($json['song'] ?? '');
    $comment = trim($json['comment'] ?? '');
    $name = trim($json['name'] ?? 'Гость');
    
    $to = cleanForJs($to);
    $song = cleanForJs($song);
    $comment = cleanForJs($comment);
    $name = cleanForJs($name);
    
    $ip = getUserIP();
    
    $currentDate = date('d.m.Y H:i');
    
    if (empty($song)) {
        echo json_encode(['success' => false, 'error' => 'Поле "Песня" обязательно для заполнения']);
        return;
    }
    
    $state = initGlobalState();
    if ($state['stol'] == 0) {
        echo json_encode(['success' => false, 'error' => 'Стол заявок закрыт. Невозможно отправить заявку.']);
        return;
    }
    
    try {
        $userIdentifier = '';
        if (isset($u) && $u['id']) {
            $userIdentifier = 'user_' . $u['id'];
        } else {
            $userIdentifier = 'guest_' . md5($_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT']);
        }
        
        $filename = 'requestsTest.json';
        $allRequests = [];
        
        if (file_exists($filename)) {
            $allRequests = json_decode(file_get_contents($filename), true) ?? [];
        }
        
        // Получаем текущий лимит из настроек
        $requestLimit = getRequestLimit();
        
        // Если лимит не равен 0 (без ограничений), проверяем количество заявок
        if ($requestLimit > 0) {
            $userRequestsCount = 0;
            foreach ($allRequests as $request) {
                if (isset($request['user_identifier']) && $request['user_identifier'] === $userIdentifier) {
                    $userRequestsCount++;
                }
            }
            
            if ($userRequestsCount >= $requestLimit) {
                echo json_encode(['success' => false, 'error' => "Вы уже отправили максимальное количество заявок ($requestLimit)"]);
                return;
            }
        }
        
        $requestId = generateNumericId();
        
        $requestData = [
            'id' => $requestId,
            'to' => $to,
            'song' => $song,
            'comment' => $comment,
            'name' => $name,
            'user_identifier' => $userIdentifier,
            'timestamp' => date('Y-m-d H:i:s'),
            'date_display' => $currentDate,
            'ip' => $ip,
            'status' => 'pending'
        ];
        
        $allRequests[] = $requestData;
        
        if (file_put_contents($filename, json_encode($allRequests, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) === false) {
            throw new Exception('Не удалось записать файл');
        }
        
        echo json_encode(['success' => true, 'id' => $requestId]);
        
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}

function generateNumericId() {
    $filename = 'requestsTest.json';
    $requests = [];
    
    if (file_exists($filename)) {
        $requests = json_decode(file_get_contents($filename), true) ?? [];
    }
    
    $maxId = 0;
    foreach ($requests as $request) {
        if (isset($request['id']) && is_numeric($request['id']) && $request['id'] > $maxId) {
            $maxId = $request['id'];
        }
    }
    
    return $maxId + 1;
}
?>