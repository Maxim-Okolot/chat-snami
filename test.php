<?php

// Получаем корень текущей директории
$rootDir = __DIR__;

echo "<h1>Информация о корневой директории сайта</h1>";
echo "<p>Корень сайта (директория, где находится этот файл): <strong>" . htmlspecialchars($rootDir) . "</strong></p>";
echo "<p>Для доступа к файлу, например, <code>my_script.php</code>, расположенному в этой же директории, используйте URL: <code>https://snami.mpchat.com/my_script.php</code></p>";
echo "<p>Для доступа к файлу <code>another.php</code> из подпапки <code>subdir</code>, используйте: <code>https://snami.mpchat.com/subdir/another.php</code></p>";

// Список файлов в этой директории (для примера)
echo "<h2>Файлы в корневой директории:</h2>";
$files = scandir($rootDir);
if ($files) {
    echo "<ul>";
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            echo "<li><code>" . htmlspecialchars($file) . "</code></li>";
        }
    }
    echo "</ul>";
} else {
    echo "<p>Не удалось прочитать директорию.</p>";
}

?>