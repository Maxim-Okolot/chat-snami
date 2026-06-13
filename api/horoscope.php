<?php
/**
 * Дневной гороскоп для бота Снамик (прокси к внешнему API).
 * Вызывается из index.php до ini.php при GET snamik_horoscope (и sign).
 * GET: sign — знак на русском (овен, телец, …)
 * Ответ: JSON { ok, text? } или { ok:false, error }
 *
 * Перевод текста гороскопа (en→ru) через Яндекс:
 *   — переменная окружения YANDEX_TRANSLATE_API_KEY, или файл api/yandex_translate.local.php (return 'ключ';)
 *   — Yandex Cloud (ключ сервисного аккаунта, обычно с префиксом AQV…): включается автоматически; при необходимости YANDEX_CLOUD_FOLDER_ID или YANDEX_TRANSLATE_USE_CLOUD=1
 *   — иначе используется API v1.5 https://translate.yandex.net (старый ключ Переводчика)
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');

/**
 * @return string
 */
function snamik_yandex_translate_key()
{
    $key = getenv('YANDEX_TRANSLATE_API_KEY');
    if ($key !== false && $key !== '') {
        return trim((string) $key);
    }
    $local = __DIR__ . '/yandex_translate.local.php';
    if (is_readable($local)) {
        $v = include $local;
        if (is_string($v)) {
            $t = trim($v);
            if ($t !== '') {
                return $t;
            }
        }
    }
    return '';
}

/**
 * @param string $text
 * @param string $apiKey
 * @param string $folderId
 * @param bool $useCloud
 * @return string
 */
function snamik_translate_en_ru($text, $apiKey, $folderId, $useCloud)
{
    if ($apiKey === '' || $text === '') {
        return $text;
    }
    if ($useCloud) {
        return snamik_yandex_cloud_translate_en_ru($text, $apiKey, trim($folderId));
    }
    return snamik_yandex_legacy_translate_en_ru($text, $apiKey);
}

/**
 * @param string $text
 * @param string $apiKey
 * @return string
 */
function snamik_yandex_legacy_translate_en_ru($text, $apiKey)
{
    $url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
    $post = http_build_query(
        [
            'key' => $apiKey,
            'text' => $text,
            'lang' => 'en-ru',
            'format' => 'plain',
        ],
        '',
        '&',
        PHP_QUERY_RFC1738
    );
    $ctx = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $post,
            'timeout' => 15,
        ],
    ]);
    $raw = @file_get_contents($url, false, $ctx);
    if ($raw === false || $raw === '') {
        return $text;
    }
    $j = json_decode($raw, true);
    if (!is_array($j)) {
        return $text;
    }
    if (isset($j['code']) && (int) $j['code'] !== 200) {
        return $text;
    }
    if (!empty($j['text'][0]) && is_string($j['text'][0])) {
        return $j['text'][0];
    }
    return $text;
}

/**
 * @param string $text
 * @param string $apiKey
 * @param string $folderId
 * @return string
 */
function snamik_yandex_cloud_translate_en_ru($text, $apiKey, $folderId)
{
    $url = 'https://translate.api.cloud.yandex.net/translate/v2/translate';
    $req = [
        'texts' => [$text],
        'targetLanguageCode' => 'ru',
        'sourceLanguageCode' => 'en',
    ];
    if ($folderId !== '') {
        $req['folderId'] = $folderId;
    }
    $payload = json_encode($req, JSON_UNESCAPED_UNICODE);
    if ($payload === false) {
        return $text;
    }
    $ctx = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => 'Authorization: Api-Key ' . $apiKey . "\r\n"
                . "Content-Type: application/json\r\n",
            'content' => $payload,
            'timeout' => 15,
        ],
    ]);
    $raw = @file_get_contents($url, false, $ctx);
    if ($raw === false || $raw === '') {
        return $text;
    }
    $j = json_decode($raw, true);
    if (!is_array($j) || empty($j['translations'][0]['text'])) {
        return $text;
    }
    $out = trim((string) $j['translations'][0]['text']);
    return $out !== '' ? $out : $text;
}

$map = [
    'овен' => 'aries',
    'телец' => 'taurus',
    'близнецы' => 'gemini',
    'рак' => 'cancer',
    'лев' => 'leo',
    'дева' => 'virgo',
    'весы' => 'libra',
    'скорпион' => 'scorpio',
    'стрелец' => 'sagittarius',
    'козерог' => 'capricorn',
    'водолей' => 'aquarius',
    'рыбы' => 'pisces',
];

$titles = [
    'овен' => '♈ Овен',
    'телец' => '♉ Телец',
    'близнецы' => '♊ Близнецы',
    'рак' => '♋ Рак',
    'лев' => '♌ Лев',
    'дева' => '♍ Дева',
    'весы' => '♎ Весы',
    'скорпион' => '♏ Скорпион',
    'стрелец' => '♐ Стрелец',
    'козерог' => '♑ Козерог',
    'водолей' => '♒ Водолей',
    'рыбы' => '♓ Рыбы',
];

$raw = isset($_GET['sign']) ? trim((string) $_GET['sign']) : '';
$signRu = function_exists('mb_strtolower') ? mb_strtolower($raw, 'UTF-8') : strtolower($raw);

if ($signRu === '' || !isset($map[$signRu])) {
    echo json_encode(['ok' => false, 'error' => 'bad_sign'], JSON_UNESCAPED_UNICODE);
    exit;
}

$api = 'https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign='
    . rawurlencode($map[$signRu])
    . '&day=TODAY';

$ctx = stream_context_create([
    'http' => [
        'timeout' => 8,
        'header' => "Accept: application/json\r\n",
    ],
]);

$body = @file_get_contents($api, false, $ctx);
if ($body === false || $body === '') {
    echo json_encode(['ok' => false, 'error' => 'upstream'], JSON_UNESCAPED_UNICODE);
    exit;
}

$data = json_decode($body, true);
if (!is_array($data) || empty($data['data']['horoscope'])) {
    echo json_encode(['ok' => false, 'error' => 'parse'], JSON_UNESCAPED_UNICODE);
    exit;
}

$d = isset($data['data']['date']) ? $data['data']['date'] : '';
$h = trim((string) $data['data']['horoscope']);
$yKey = snamik_yandex_translate_key();
$yFolder = getenv('YANDEX_CLOUD_FOLDER_ID');
$yFolder = ($yFolder !== false) ? trim((string) $yFolder) : '';
$yc = getenv('YANDEX_TRANSLATE_USE_CLOUD');
$yc = ($yc !== false) ? strtolower(trim((string) $yc)) : '';
$yUseCloud = ($yFolder !== '')
    || ($yc === '1' || $yc === 'true' || $yc === 'yes')
    || (strncmp($yKey, 'AQV', 3) === 0);
$h = snamik_translate_en_ru($h, $yKey, $yFolder, $yUseCloud);
$title = isset($titles[$signRu]) ? $titles[$signRu] : $signRu;

$text = $title . ' — гороскоп на ' . ($d !== '' ? $d : 'сегодня') . ":\n\n" . $h;

echo json_encode(['ok' => true, 'text' => $text], JSON_UNESCAPED_UNICODE);
exit;
