# С нами (chat-snami)

Веб-чат на движке **mpchat** с форумом, магазином, галереей, профилями пользователей и дополнительными модулями, разработанными для сообщества «С нами».

## Возможности

- **Чат** — общение в реальном времени, смайлы, антифлуд, модерация
- **Форум** — темы, сообщения, голосование за посты
- **Профили** — анкеты, рейтинг, лайки, просмотры
- **Магазин** — покупка ников, цветов, иконок и других предметов за внутреннюю валюту
- **Галерея** — загрузка и просмотр фотографий
- **Стена любви** — признания и пожелания участникам
- **Гороскоп** — API для бота «Снамик» (`api/horoscope.php`)
- **Голосования** — рейтинг фотографий, webhook для внешних интеграций

## Технологии

- PHP (сессии, MySQL через mpchat)
- JavaScript (jQuery, клиентские скрипты чата)
- CSS (несколько тем оформления)
- Движок чата: **mpchat** (`/usr/share/php/mpchat/ini.php`)
- Хранение настроек и данных: файлы `.sys` в каталоге `data/`

## Требования

- PHP с поддержкой сессий и MySQLi
- MySQL-база данных
- Установленный движок **mpchat** на сервере
- Веб-сервер (Apache/Nginx) с поддержкой `.htaccess` (при использовании Apache)

## Структура проекта

```
chat-snami/
├── index.php              # Точка входа, маршрутизация API
├── config.php             # Подключение к БД, секреты, лицензия
├── info.php               # Страница профиля пользователя
├── shop.php               # Магазин
├── frends.php             # Список друзей
├── comments.php           # Комментарии
├── api/
│   └── horoscope.php      # Гороскоп для бота Снамик
├── assets/css/            # Стили (style.css, snimik.css, fonts.css)
├── data/                  # Конфигурация и данные чата (.sys, .dat)
├── img/                   # Изображения, JS-библиотеки
├── js/                    # Клиентские скрипты
├── smile/                 # Смайлы
└── *.css, *.js            # Темы оформления и расширения интерфейса
```

## Настройка

1. Скопируйте репозиторий на сервер с установленным mpchat.
2. Настройте `config.php`:
   - параметры подключения к MySQL (`db_host`, `db_base`, `db_user`, `db_pass`);
   - лицензионный ключ движка (`engine_hash`);
   - секретные строки (`secret`, `superpass`).
3. Основные настройки чата хранятся в `data/config.sys` (название, модераторы, лимиты и т.д.).
4. Для перевода гороскопа (en→ru) задайте ключ Яндекс.Переводчика:
   - переменная окружения `YANDEX_TRANSLATE_API_KEY`, или
   - файл `api/yandex_translate.local.php` с `return 'ключ';`

## API и расширения

| Эндпоинт | Описание |
|----------|----------|
| `?snamik_horoscope&sign=...` | Дневной гороскоп (JSON) |
| `?forum_api=...` | Голоса за посты форума |
| `?profile_api=...` | Лайки и рейтинг профиля |

Мосты для API: `forum_post_votes_bridge.php`, `profile_likes_bridge.php`.

## Разработка

- В `.gitignore` исключены каталог `.idea` и файлы `*.sys`.
- Файлы `data/*.sys` содержат рабочие данные чата — не коммитьте их без необходимости.
- Не публикуйте `config.php` и `api/yandex_translate.local.php` с реальными ключами.

Вход в чат
https://snami.mpchat.com

Шаблоны
https://snami.mpchat.com/news - новости
https://snami.mpchat.com/prav - правила
https://snami.mpchat.com/help - помощь
https://snami.mpchat.com/trans - транслит

Скрипты
https://snami.mpchat.com/who - кто был
https://snami.mpchat.com/smile - смайлы
https://snami.mpchat.com/icon - иконки
https://snami.mpchat.com/gb - гостевая
https://snami.mpchat.com/forum - форум
https://snami.mpchat.com/reg - регистрация
https://snami.mpchat.com/stat - статистика 
https://snami.mpchat.com/top100 - рейтинг ТОП100
https://snami.mpchat.com/mail - забыл пароль?
https://snami.mpchat.com/feedback - форма обратной связи
https://snami.mpchat.com/love - виртуальные семьи/загс
https://snami.mpchat.com/shop - виртуальный магазин
https://snami.mpchat.com/clan - виртуальные кланы
https://snami.mpchat.com/search - поиск по никам и анкетам
https://snami.mpchat.com/gallery - галерея чата
https://snami.mpchat.com/informer?imgcounter=1&text=snami&color=50-100-200 - счётчик
вставить как картинку, меняйте текст и цвет счётчика (числа от 0 до 255)
 
Анкеты
https://snami.mpchat.com/info?nick=ВАШНИК