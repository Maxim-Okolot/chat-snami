<?php
/**
 * JSON API: forum post reactions.
 * Uses only mysqli_query/mysqli_fetch_assoc for maximum hosting compatibility.
 */
header('Content-Type: application/json; charset=utf-8');
ob_start();

if (!isset($db)) {
    while (ob_get_level() > 0) {
        ob_end_clean();
    }
    echo json_encode(['success' => false, 'error' => 'DB is not initialized'], JSON_UNESCAPED_UNICODE);
    exit;
}

mysqli_set_charset($db, 'utf8mb4');

function forum_votes_json_send($payload)
{
    while (ob_get_level() > 0) {
        ob_end_clean();
    }
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function forum_votes_json_error($message)
{
    forum_votes_json_send(['success' => false, 'error' => $message]);
}

function forum_votes_esc($value)
{
    return mysqli_real_escape_string($GLOBALS['db'], (string) $value);
}

function forum_votes_ensure_schema()
{
    $sql = "CREATE TABLE IF NOT EXISTS forum_post_votes (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        forum_id INT UNSIGNED NOT NULL,
        topic_id INT UNSIGNED NOT NULL,
        post_id INT UNSIGNED NOT NULL,
        voter_id INT UNSIGNED NOT NULL DEFAULT 0,
        voter_nick VARCHAR(64) NOT NULL,
        vote TINYINT NOT NULL,
        created_at INT UNSIGNED NOT NULL DEFAULT 0,
        updated_at INT UNSIGNED NOT NULL DEFAULT 0,
        PRIMARY KEY (id),
        UNIQUE KEY uniq_vote (forum_id, topic_id, post_id, voter_nick),
        KEY idx_lookup (forum_id, topic_id, post_id),
        KEY idx_voter (voter_nick)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

    if (!mysqli_query($GLOBALS['db'], $sql)) {
        forum_votes_json_error('Не удалось подготовить таблицу голосов');
    }
}

function forum_votes_get_current_user()
{
    $isAuthorized = !empty($GLOBALS['authorize']);
    $nick = '';
    $id = 0;

    if (!empty($GLOBALS['u']) && is_array($GLOBALS['u'])) {
        $nick = isset($GLOBALS['u']['nick']) ? trim((string) $GLOBALS['u']['nick']) : '';
        $id = isset($GLOBALS['u']['id']) ? (int) $GLOBALS['u']['id'] : 0;
    }

    return [
        'authorized' => ($isAuthorized && $nick !== '' && $id > 0),
        'nick' => $nick,
        'id' => $id,
    ];
}

function forum_votes_parse_post_ids($raw)
{
    $postIds = [];
    foreach (explode(',', (string) $raw) as $chunk) {
        $value = (int) trim($chunk);
        if ($value > 0) {
            $postIds[$value] = $value;
        }
    }
    return array_values($postIds);
}

function forum_votes_fetch_post_stats($forumId, $topicId, $postIds)
{
    $stats = [];
    foreach ($postIds as $pid) {
        $stats[(string) $pid] = ['hearts' => 0, 'likes' => 0, 'dislikes' => 0, 'my_vote' => 0];
    }
    if (!$postIds) {
        return $stats;
    }

    $inClause = implode(',', array_map('intval', $postIds));
    $forumId = (int) $forumId;
    $topicId = (int) $topicId;

    $sql = "SELECT post_id,
                   SUM(CASE WHEN vote = 2 THEN 1 ELSE 0 END) AS hearts_count,
                   SUM(CASE WHEN vote = 1 THEN 1 ELSE 0 END) AS likes_count,
                   SUM(CASE WHEN vote = -1 THEN 1 ELSE 0 END) AS dislikes_count
            FROM forum_post_votes
            WHERE forum_id = {$forumId} AND topic_id = {$topicId} AND post_id IN ({$inClause})
            GROUP BY post_id";
    $res = mysqli_query($GLOBALS['db'], $sql);
    if ($res) {
        while ($row = mysqli_fetch_assoc($res)) {
            $pid = (string) ((int) $row['post_id']);
            if (!isset($stats[$pid])) {
                continue;
            }
            $stats[$pid]['hearts'] = (int) $row['hearts_count'];
            $stats[$pid]['likes'] = (int) $row['likes_count'];
            $stats[$pid]['dislikes'] = (int) $row['dislikes_count'];
        }
    }

    $viewer = forum_votes_get_current_user();
    if ($viewer['authorized']) {
        $nickEsc = forum_votes_esc($viewer['nick']);
        $sql = "SELECT post_id, vote
                FROM forum_post_votes
                WHERE forum_id = {$forumId}
                  AND topic_id = {$topicId}
                  AND voter_nick = '{$nickEsc}'
                  AND post_id IN ({$inClause})";
        $res = mysqli_query($GLOBALS['db'], $sql);
        if ($res) {
            while ($row = mysqli_fetch_assoc($res)) {
                $pid = (string) ((int) $row['post_id']);
                if (isset($stats[$pid])) {
                    $stats[$pid]['my_vote'] = (int) $row['vote'];
                }
            }
        }
    }

    return $stats;
}

forum_votes_ensure_schema();

$api = isset($_GET['forum_api']) ? trim((string) $_GET['forum_api']) : '';

if ($api === 'get_post_votes') {
    $forumId = isset($_GET['forum_id']) ? (int) $_GET['forum_id'] : 0;
    $topicId = isset($_GET['topic_id']) ? (int) $_GET['topic_id'] : 0;
    $postIds = forum_votes_parse_post_ids($_GET['post_ids'] ?? '');

    if ($forumId <= 0 || $topicId <= 0 || !$postIds) {
        forum_votes_json_error('Некорректные параметры');
    }

    forum_votes_json_send([
        'success' => true,
        'stats' => forum_votes_fetch_post_stats($forumId, $topicId, $postIds),
    ]);
}

if ($api === 'set_post_vote' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $viewer = forum_votes_get_current_user();
    if (!$viewer['authorized']) {
        forum_votes_json_error('Голосовать могут только авторизованные');
    }

    $data = json_decode(file_get_contents('php://input'), true);
    if (!is_array($data)) {
        forum_votes_json_error('Некорректные данные');
    }

    $forumId = isset($data['forum_id']) ? (int) $data['forum_id'] : 0;
    $topicId = isset($data['topic_id']) ? (int) $data['topic_id'] : 0;
    $postId = isset($data['post_id']) ? (int) $data['post_id'] : 0;
    $vote = isset($data['vote']) ? (int) $data['vote'] : 0;

    if ($forumId <= 0 || $topicId <= 0 || $postId <= 0) {
        forum_votes_json_error('Некорректные параметры');
    }
    if ($vote !== 2 && $vote !== 1 && $vote !== -1) {
        forum_votes_json_error('Некорректный тип голоса');
    }

    $nickEsc = forum_votes_esc($viewer['nick']);
    $sql = "SELECT id, vote
            FROM forum_post_votes
            WHERE forum_id = {$forumId}
              AND topic_id = {$topicId}
              AND post_id = {$postId}
              AND voter_nick = '{$nickEsc}'
            LIMIT 1";
    $res = mysqli_query($GLOBALS['db'], $sql);
    if ($res === false) {
        forum_votes_json_error('Ошибка проверки существующего голоса');
    }
    $existing = mysqli_fetch_assoc($res);
    $now = time();

    if ($existing && (int) $existing['vote'] === $vote) {
        $voteId = (int) $existing['id'];
        $ok = mysqli_query($GLOBALS['db'], "DELETE FROM forum_post_votes WHERE id = {$voteId} LIMIT 1");
        if (!$ok) {
            forum_votes_json_error('Не удалось удалить голос');
        }
    } elseif ($existing) {
        $voteId = (int) $existing['id'];
        $ok = mysqli_query(
            $GLOBALS['db'],
            "UPDATE forum_post_votes
             SET vote = {$vote}, voter_id = " . (int) $viewer['id'] . ", updated_at = {$now}
             WHERE id = {$voteId}
             LIMIT 1"
        );
        if (!$ok) {
            forum_votes_json_error('Не удалось обновить голос');
        }
    } else {
        $ok = mysqli_query(
            $GLOBALS['db'],
            "INSERT INTO forum_post_votes (forum_id, topic_id, post_id, voter_id, voter_nick, vote, created_at, updated_at)
             VALUES ({$forumId}, {$topicId}, {$postId}, " . (int) $viewer['id'] . ", '{$nickEsc}', {$vote}, {$now}, {$now})"
        );
        if (!$ok) {
            forum_votes_json_error('Не удалось сохранить голос');
        }
    }

    $statsMap = forum_votes_fetch_post_stats($forumId, $topicId, [$postId]);
    $stats = $statsMap[(string) $postId] ?? ['hearts' => 0, 'likes' => 0, 'dislikes' => 0, 'my_vote' => 0];

    forum_votes_json_send([
        'success' => true,
        'post_id' => $postId,
        'stats' => $stats,
    ]);
}

forum_votes_json_error('Неверный запрос');
