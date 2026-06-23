<!DOCTYPE html>
<html>
<head>
    <title>Радио Ленин ФМ</title>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'>
   <style>
        body {
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #fff;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }

        .radio-container {
            background-color: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            width: 95%;
            max-width: 900px;
            margin: 30px auto;
            padding: 20px;
            display: none;
            position: relative;
        }

        .radio-header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            padding-bottom: 15px;
            position: relative;
        }

        .radio-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin: 0;
            background: linear-gradient(to right, #fff, #e0d6ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .timer-container {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 15px;
            padding: 20px;
            margin: 20px 0;
        }

        .timer {
            display: flex;
            justify-content: center;
            font-size: 2.5rem;
            font-weight: 700;
        }

        .timer-item {
            margin: 0 10px;
            text-align: center;
            min-width: 80px;
        }

        .timer-label {
            font-size: 0.9rem;
            margin-top: 5px;
            opacity: 0.8;
        }

        .controls {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        }

        .control-btn {
            background: linear-gradient(135deg, #8a2be2, #6a0dad);
            border: none;
            border-radius: 50px;
            color: white;
            font-size: 1.1rem;
            font-weight: 600;
            padding: 12px 30px;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .control-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .control-btn.exit {
            background: linear-gradient(135deg, #ff416c, #ff4b2b);
        }

        .requests-table {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            margin-top: 30px;
            padding: 20px;
        }

        .table-header {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 15px;
            text-align: center;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            color: white;
        }

        th {
            background: rgba(255, 255, 255, 0.2);
            padding: 12px 15px;
            text-align: left;
        }

        td {
            padding: 5px 0px 0px 8px;
            vertical-align: top;
        }

        tr:hover {
            background: rgba(255, 255, 255, 0.05);
        }

        .welcome-message {
            text-align: center;
            font-size: 1.2rem;
            margin: 20px 0;
            padding: 15px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
        }

        .main-btn {
            display: block;
            margin: 50px auto;
            background: linear-gradient(135deg, #8a2be2, #6a0dad);
            border: none;
            border-radius: 50px;
            color: white;
            font-size: 1.3rem;
            font-weight: 600;
            padding: 15px 50px;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .main-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        .main-btn.exit {
            background: linear-gradient(135deg, #ff416c, #ff4b2b);
        }

        .fade-in {
            animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .refresh-indicator {
            text-align: center;
            margin-top: 10px;
            font-size: 0.9rem;
            opacity: 0.7;
        }
        
        .new-request-indicator {
            background: rgba(0, 255, 0, 0.2);
            border-radius: 5px;
            padding: 2px 8px;
            margin-left: 10px;
            font-size: 0.8rem;
            animation: pulse 1s infinite;
        }
        
        @keyframes pulse {
            0% { opacity: 0.5; }
            50% { opacity: 1; }
            100% { opacity: 0.5; }
        }
        
        .sound-toggle {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            color: white;
            cursor: pointer;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .sound-toggle.muted {
            opacity: 0.5;
        }
        
        .table-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .search-btn {
            background: rgba(255, 255, 255, 0.15);
            border: none;
            border-radius: 5px;
            color: white;
            padding: 5px 8px;
            margin: 0 2px;
            transition: all 0.3s;
            cursor: pointer;
        }
        
        .search-btn:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: scale(1.1);
        }
        
        .search-btn.copy {
            background: rgba(100, 200, 255, 0.3);
        }
        
        .search-btn.yandex {
            background: rgba(255, 204, 0, 0.3);
        }
        
        .search-btn.vk {
            background: rgba(100, 150, 255, 0.3);
        }
        
        .search-btn.hitmotop {
            background: rgba(255, 100, 150, 0.3);
        }
        
        .search-buttons {
            display: flex;
            justify-content: center;
            gap: 5px;
        }
        
        .stream-info {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            margin: 15px 0;
            flex-wrap: wrap;
        }
        
        .stream-name {
            font-size: 1.4rem;
            font-weight: 600;
            background: linear-gradient(to right, #fff, #e0d6ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-align: center;
        }
        
        .stream-details {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
        }

        .avatar {
            width: 80px;
            height: 80px;
            background-size: cover;
            border-radius: 50%;
            border: 2px solid #8a2be2;
            background-color: #8a2be2;
            background-image: linear-gradient(45deg, #8a2be2, #9370db);
            position: relative;
        }
        
        #radioAvatar > div {
            position: absolute;
            top: 0;
            left: 0;
            width: 100% !important;
            height: 100% !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            margin: 0 !important;
        }
        
        #radioAvatar > div > div {
            width: 80px !important;
            height: 80px !important;
            border-radius: 50% !important;
            background-size: cover !important;
            border: 2px solid #8a2be2 !important;
            float: none !important;
            margin: 0 !important;
        }

        .song-title {
            font-weight: 600;
            margin-bottom: 2px;
            font-size: 0.95rem;
        }

        .request-date {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.7);
            margin-top: 2px;
        }

        .user-name {
            font-weight: 500;
            margin-bottom: 2px;
            font-size: 0.9rem;
        }

        .user-ip {
            font-size: 0.75rem;
            color: rgb(4 253 239 / 70%);
            margin-top: 2px;
        }

        .ip-link {
            color: rgb(4 253 239 / 70%);
            text-decoration: none;
            transition: all 0.3s ease;
            cursor: pointer;
            border-bottom: 1px dotted rgba(255, 255, 255, 0.4);
        }

        .ip-link:hover {
            color: rgba(255, 255, 255, 0.9);
            text-decoration: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.8);
        }

        .status-select {
            background: rgba(255, 255, 255, 0.15);
            border: none;
            border-radius: 5px;
            color: white;
            padding: 6px 8px;
            font-size: 0.85rem;
            width: 140px;
            cursor: pointer;
        }

        .status-select option {
            background: #4a4a4a;
            color: white;
        }

        /* Стили для разных статусов */
        .status-pending { 
            background: rgba(255, 165, 0, 0.3);
            border-left: 3px solid #ffa500;
        }
        
        .status-queue { 
            background: rgba(50, 205, 50, 0.3);
            border-left: 3px solid #32cd32;
        }
        
        .status-completed { 
            background: rgba(50, 205, 50, 0.3);
            border-left: 3px solid #32cd32;
        }
        
        .status-rejected { 
            background: rgba(255, 69, 0, 0.3);
            border-left: 3px solid #ff4500;
        }

        @media (max-width: 768px) {
            .requests-table {
                padding: 10px;
            }
            
            .song-title {
                font-size: 0.9rem;
            }
            
            .user-name {
                font-size: 0.85rem;
            }
            
            .request-date, .user-ip {
                font-size: 0.7rem;
            }
            
            .status-select {
                width: 120px;
                font-size: 0.8rem;
            }
        }
     /* стили для настроек ограничений */
        .settings-panel {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 20px;
            margin-top: 20px;
        }

        .settings-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 15px;
            text-align: center;
            background: linear-gradient(to right, #fff, #e0d6ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .settings-form {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .form-group {
            margin-bottom: 0;
        }

        .form-label {
            font-weight: 600;
            margin-bottom: 8px;
            display: block;
            font-size: 0.95rem;
        }

        .form-select {
            background: rgba(255, 255, 255, 0.15);
            border: none;
            border-radius: 10px;
            color: white;
            padding: 10px 15px;
            font-size: 1rem;
            width: 100%;
        }

        .form-select option {
            background: #4a4a4a;
            color: white;
        }

        .settings-btn {
            background: linear-gradient(135deg, #8a2be2, #6a0dad);
            border: none;
            border-radius: 10px;
            color: white;
            font-size: 1rem;
            font-weight: 600;
            padding: 12px 20px;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            width: 100%;
            cursor: pointer;
        }

        .settings-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .settings-feedback {
            color: #a3ffa3;
            text-align: center;
            margin-top: 10px;
            display: none;
            font-size: 0.9rem;
        }

        .current-limit-info {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 10px;
            padding: 12px;
            margin-top: 10px;
            text-align: center;
            font-size: 0.9rem;
        }    
    </style>
	 
</head>
<body>
  
    <button class="main-btn" id="broadcast-btn">Войти в эфир</button>

    <div class="radio-container fade-in" id="radio-container">
        <button class="sound-toggle" id="sound-toggle" title="Включить/выключить звук уведомлений">
            <i class="fas fa-bell"></i>
        </button>
        
        <div class="radio-header">
            <h1 class="radio-title">Радио Ленин ФМ</h1>
        </div>

        <div class="welcome-message">
            <span id="greeting">Приветствуем тебя на Радио Ленин ФМ и отличного эфира!</span>
        </div>
        
        <div class="stream-info">
            <div class="avatar" id="radioAvatar" data-myinfo="htmlavatar"></div><br>
        <div class="stream-details">
                <div class="stream-name" data-myinfo="streamname">Название стрима</div>
            </div>
        </div>
        
        <div class="timer-container">
            <div class="timer">
                <div class="timer-item">
                    <div id="hours">00</div>
                    <div class="timer-label">часов</div>
                </div>
                <div class="timer-item">
                    <div id="minutes">00</div>
                    <div class="timer-label">минут</div>
                </div>
                <div class="timer-item">
                    <div id="seconds">00</div>
                    <div class="timer-label">секунд</div>
                </div>
            </div>
        </div>

        <div class="controls">
            <button class="control-btn" id="announce-btn">Объявить открытие стола заявок</button>
        </div>

        <!-- Панель настроек ограничений -->
        <div class="settings-panel fade-in">
            <h3 class="settings-title">Настройки ограничений заявок</h3>
            <div class="settings-form">
                <div class="form-group">
                    <label class="form-label" for="request-limit">Лимит заявок на пользователя:</label>
                    <select class="form-select" id="request-limit">
                        <option value="1">1 заявка</option>
                        <option value="2">2 заявки</option>
                        <option value="3" selected>3 заявки</option>
                        <option value="4">4 заявки</option>
                        <option value="5">5 заявок</option>
                        <option value="10">10 заявок</option>
                        <option value="0">Без ограничений</option>
                    </select>
                </div>
                <button class="settings-btn" id="save-settings-btn">Сохранить настройки</button>
                <div class="settings-feedback" id="settings-feedback"></div>
                <div class="current-limit-info" id="current-limit-info">
                    Текущий лимит: 3 заявки на пользователя
                </div>
            </div>
        </div>

        <div class="requests-table fade-in" id="requests-table">
            <div class="table-controls">
                <div class="table-header">
                    Стол заявок
                    <span class="new-request-indicator" id="new-request-indicator" style="display: none;">Новая заявка!</span>
                </div>
            </div>
            <div class="refresh-indicator" id="refresh-indicator">Последнее обновление: <span id="last-update">--:--:--</span></div>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Заявка</th>
                            <th>От кого</th>
                            <th>Кому</th>
                            <th>Комментарий</th>
                            <th>Поиск</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody id="requests-body">
                    </tbody>
                </table>
            </div>
        </div>
    </div>

   <script>
    let startTime = Date.now();
    let requestsPollingInterval = null;
    let lastRequestCount = 0;
    let isSoundEnabled = true;
    let isTableOpen = false;
    let notificationAudio = null;
    let userInteracted = false;
    let currentRequestCount = 0;
    let isTrackingStarted = false;
    let isFirstLoadAfterOpening = true;
    
    // Текущий лимит заявок (будет загружаться с сервера)
    let currentRequestLimit = 3;
    
    function updateDJInfo() {
        const streamNameElement = document.querySelector('[data-myinfo="streamname"]');
        const streamName = streamNameElement ? streamNameElement.textContent : 'Радио Ленин ФМ';
        
        document.getElementById('greeting').textContent = `Приветствуем тебя ${streamName} и отличного эфира!`;
        document.title = streamName + ' - Панель диджея';

        fetch('https://myradio24.com/users/lenin/status.json')
            .then(response => response.json())
            .then(data => {
                if (data.img) {
                    document.getElementById('radioAvatar').style.backgroundImage = `url('https://myradio24.com/${data.img}')`;
                }
            })
            .catch(error => {
                console.error('Ошибка загрузки информации:', error);
            });
    }
    
    function startStreamInfoPolling() {
        updateDJInfo();
        setInterval(updateDJInfo, 10000);
    }
    
    function updateTimer() {
        const now = Date.now();
        const diff = now - startTime;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    setInterval(updateTimer, 1000);

    // Инициализация аудио с обработкой ошибок
    function initializeAudio() {
        if (!notificationAudio) {
            notificationAudio = new Audio();
            notificationAudio.src = 'https://ero.mpchat.com/sounds/enter2.mp3';
            notificationAudio.preload = 'auto';
            notificationAudio.volume = 0.7;
            
            notificationAudio.addEventListener('loadeddata', function() {
                console.log('Аудио данные загружены');
            });
            
            notificationAudio.addEventListener('canplaythrough', function() {
                console.log('Аудио готово к воспроизведению');
            });
            
            notificationAudio.addEventListener('error', function(e) {
                console.error('Ошибка загрузки аудио:', e);
                notificationAudio.src = 'https://ero.mpchat.com/sounds/enter2.mp3';
                notificationAudio.load();
            });
            
            notificationAudio.load();
        }
    }

    function playNotificationSound() {
        console.log('Попытка воспроизвести звук уведомления');
        
        if (!isSoundEnabled || !userInteracted) {
            return;
        }
        
        if (!notificationAudio) {
            initializeAudio();
        }
        
        try {
            notificationAudio.currentTime = 0;
            const playPromise = notificationAudio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Звуковое уведомление успешно воспроизведено');
                }).catch(error => {
                    console.error('Ошибка воспроизведения звука:', error);
                });
            }
        } catch (error) {
            console.error('Исключение при воспроизведении звука:', error);
        }
    }

    function showNewRequestIndicator() {
        const indicator = document.getElementById('new-request-indicator');
        if (indicator) {
            indicator.style.display = 'inline-block';
            setTimeout(() => {
                indicator.style.display = 'none';
            }, 5000);
        }
    }

    function sendBroadcastMessage(messageText) {
        const messageData = {
            action: 'SendMessage',
            type: 'normal',
            text: messageText,
            name: ''
        };
        
        fetch('index.php?inc=zaya', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Сообщение отправлено:', messageText);
            }
        })
        .catch(error => {
            console.error('Ошибка отправки сообщения:', error);
        });
    }

    function updateLastRefreshTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        document.getElementById('last-update').textContent = timeString;
    }

    function countRequestsInHTML(htmlData) {
        const tempContainer = document.createElement('tbody');
        tempContainer.innerHTML = htmlData;
        const requestRows = tempContainer.querySelectorAll('tr[data-request-id]');
        const count = requestRows.length;
        console.log(`Найдено заявок в HTML: ${count}`);
        return count;
    }

    function loadRequests() {
        const messageData = {
            action: 'Load'
        };
        
        fetch('index.php?inc=zaya', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData)
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById('requests-body').innerHTML = data;
            updateLastRefreshTime();
            
            currentRequestCount = countRequestsInHTML(data);
            console.log(`Заявок было: ${lastRequestCount}, стало: ${currentRequestCount}, первая загрузка: ${isFirstLoadAfterOpening}`);
            
            if (isTrackingStarted && !isFirstLoadAfterOpening && currentRequestCount > lastRequestCount) {
                console.log('Обнаружена новая заявка!');
                playNotificationSound();
                showNewRequestIndicator();
                showBrowserNotification('Новая заявка!', 'Поступила новая заявка на песню');
            }
            
            if (isFirstLoadAfterOpening) {
                isFirstLoadAfterOpening = false;
            }
            
            lastRequestCount = currentRequestCount;
            
            addSearchButtonsHandlers();
            addStatusSelectHandlers();
        })
        .catch(error => {
            console.error('Ошибка загрузки заявок:', error);
        });
    }

    // Функция загрузки текущих настроек ограничений
    function loadSettings() {
        fetch('index.php?inc=zaya', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'GetSettings' })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                currentRequestLimit = data.request_limit;
                
                // Устанавливаем значение в select
                document.getElementById('request-limit').value = currentRequestLimit;
                
                // Обновляем информацию о текущем лимите
                updateLimitInfo();
            } else {
                console.error('Ошибка загрузки настроек:', data.error);
            }
        })
        .catch(error => {
            console.error('Ошибка сети при загрузке настроек:', error);
        });
    }

    // Функция сохранения настроек
    function saveSettings() {
        const newLimit = parseInt(document.getElementById('request-limit').value);
        
        const messageData = {
            action: 'UpdateSettings',
            request_limit: newLimit
        };
        
        fetch('index.php?inc=zaya', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData)
        })
        .then(response => response.json())
        .then(data => {
            const feedback = document.getElementById('settings-feedback');
            if (data.success) {
                currentRequestLimit = newLimit;
                updateLimitInfo();
                
                feedback.textContent = 'Настройки успешно сохранены!';
                feedback.style.color = '#27ae60';
                feedback.style.display = 'block';
                
                setTimeout(() => {
                    feedback.style.display = 'none';
                }, 3000);
            } else {
                feedback.textContent = 'Ошибка: ' + data.error;
                feedback.style.color = '#e74c3c';
                feedback.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Ошибка сети при сохранении настроек:', error);
            const feedback = document.getElementById('settings-feedback');
            feedback.textContent = 'Ошибка сети при сохранении настроек';
            feedback.style.color = '#e74c3c';
            feedback.style.display = 'block';
        });
    }

    // Функция обновления информации о текущем лимите
    function updateLimitInfo() {
        const limitInfo = document.getElementById('current-limit-info');
        if (currentRequestLimit === 0) {
            limitInfo.textContent = 'Текущий лимит: без ограничений';
        } else if (currentRequestLimit === 1) {
            limitInfo.textContent = 'Текущий лимит: 1 заявка на пользователя';
        } else if (currentRequestLimit <= 4) {
            limitInfo.textContent = `Текущий лимит: ${currentRequestLimit} заявки на пользователя`;
        } else {
            limitInfo.textContent = `Текущий лимит: ${currentRequestLimit} заявок на пользователя`;
        }
    }

    function addSearchButtonsHandlers() {
        const rows = document.querySelectorAll('#requests-body tr[data-request-id]');
        
        rows.forEach(row => {
            const requestCell = row.cells[0];
            if (requestCell) {
                const songTitleElement = requestCell.querySelector('.song-title');
                
                if (!songTitleElement) {
                    return;
                }
                
                const songName = songTitleElement.textContent.trim();
                let searchContainer = row.cells[4].querySelector('.search-buttons');
                
                if (!searchContainer) {
                    searchContainer = document.createElement('div');
                    searchContainer.className = 'search-buttons';
                    row.cells[4].innerHTML = '';
                    row.cells[4].appendChild(searchContainer);
                }
                
                const escapedSongName = songName
                    .replace(/\\/g, '\\\\')
                    .replace(/'/g, "\\'")
                    .replace(/"/g, '\\"')
                    .replace(/\n/g, '\\n')
                    .replace(/\r/g, '\\r')
                    .replace(/\t/g, '\\t');
                
                searchContainer.innerHTML = `
                    <button class="search-btn copy" title="Копировать название" onclick="copySongName('${escapedSongName}')">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button class="search-btn yandex" title="Поиск в Яндекс" onclick="searchYandex('${escapedSongName}')">
                        <i class="fab fa-yandex"></i>
                    </button>
                    <button class="search-btn vk" title="Поиск ВКонтакте" onclick="searchVK('${escapedSongName}')">
                        <i class="fab fa-vk"></i>
                    </button>
                    <button class="search-btn hitmotop" title="Поиск на Hitmotop" onclick="searchHitmotop('${escapedSongName}')">
                        <i class="fas fa-music"></i>
                    </button>
                `;
            }
        });
    }

    function addStatusSelectHandlers() {
        const statusSelects = document.querySelectorAll('.status-select');
        
        statusSelects.forEach(select => {
            const newSelect = select.cloneNode(true);
            select.parentNode.replaceChild(newSelect, select);
        });
        
        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', function() {
                const requestId = this.getAttribute('data-request-id');
                const newStatus = this.value;
                
                handleStatusChange(requestId, newStatus);
            });
        });
    }

    function handleStatusChange(requestId, newStatus) {
        const row = document.querySelector(`tr[data-request-id="${requestId}"]`);
        if (!row) {
            return;
        }
        
        const song = row.getAttribute('data-song');
        const to = row.getAttribute('data-to');
        const comment = row.getAttribute('data-comment');
        const name = row.getAttribute('data-name');
        
        if (newStatus === 'completed') {
            sendPlayNotification(requestId, song, to, comment, name, function() {
                deleteRequest(requestId);
            });
        } else if (newStatus === 'rejected') {
            deleteRequest(requestId);
        } else {
            updateRequestStatus(requestId, newStatus);
        }
    }

    function updateRequestStatus(requestId, status) {
        const messageData = {
            action: 'UpdateStatus',
            id: requestId,
            status: status
        };
        
        fetch('index.php?inc=zaya', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateRowStatus(requestId, status);
            } else {
                loadRequests();
            }
        })
        .catch(error => {
            loadRequests();
        });
    }

    function updateRowStatus(requestId, status) {
        const row = document.querySelector(`tr[data-request-id="${requestId}"]`);
        if (row) {
            row.className = '';
            row.classList.add(`status-${status}`);
            
            const statusSelect = row.querySelector('.status-select');
            if (statusSelect) {
                statusSelect.value = status;
            }
        }
    }

    function sendPlayNotification(id, zakaz, to, comment, nick, callback) {
        const messageData = {
            action: 'Play',
            id: id,
            zakaz: zakaz,
            to: to,
            comment: comment,
            nick: nick
        };
        
        fetch('index.php?inc=zaya', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success && callback) {
                callback();
            }
        })
        .catch(error => {
            if (callback) callback();
        });
    }

    function deleteRequest(id) {
        const messageData = {
            action: 'Delete',
            id: id
        };
        
        fetch('index.php?inc=zaya', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadRequests();
            }
        })
        .catch(error => {
            console.error('Ошибка сети при удалении:', error);
        });
    }

    function showBrowserNotification(title, message) {
        if (!("Notification" in window)) return;
        
        if (Notification.permission === "granted") {
            new Notification(title, { body: message, icon: 'https://cdn-icons-png.flaticon.com/512/2098/2098402.png' });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification(title, { body: message, icon: 'https://cdn-icons-png.flaticon.com/512/2098/2098402.png' });
                }
            });
        }
    }

    function startRequestsTracking() {
        if (!isTrackingStarted) {
            isTrackingStarted = true;
            isFirstLoadAfterOpening = true;
            lastRequestCount = 0;
            currentRequestCount = 0;
            loadRequests();
        }
        
        if (requestsPollingInterval) {
            clearInterval(requestsPollingInterval);
        }
        
        requestsPollingInterval = setInterval(loadRequests, 5000);
    }
    
    function stopRequestsTracking() {
        if (requestsPollingInterval) {
            clearInterval(requestsPollingInterval);
            requestsPollingInterval = null;
        }
        
        isTrackingStarted = false;
        isFirstLoadAfterOpening = true;
    }

    function updateTableState() {
        fetch('index.php?inc=zaya', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'Проверка' })
        })
        .then(response => response.json())
        .then(data => {
            isTableOpen = data.stol == 1;
            const announceBtn = document.getElementById('announce-btn');
            
            if (isTableOpen) {
                announceBtn.textContent = 'Объявить закрытие стола заявок';
                announceBtn.classList.add('exit');
                startRequestsTracking();
            } else {
                announceBtn.textContent = 'Объявить открытие стола заявок';
                announceBtn.classList.remove('exit');
                stopRequestsTracking();
            }
        })
        .catch(error => {
            console.error('Ошибка проверки состояния:', error);
        });
    }

    function copySongName(songName) {
        const decodedSongName = songName
            .replace(/\\\\/g, '\\')
            .replace(/\\'/g, "'")
            .replace(/\\"/g, '"')
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\r')
            .replace(/\\t/g, '\t');
            
        const textArea = document.createElement('textarea');
        textArea.value = decodedSongName;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            showTempNotification('Название скопировано: ' + textArea.value);
        } catch (err) {
            console.error('Ошибка копирования: ', err);
        }
        
        document.body.removeChild(textArea);
    }

    function searchYandex(songName) {
        const decodedSongName = songName
            .replace(/\\\\/g, '\\')
            .replace(/\\'/g, "'")
            .replace(/\\"/g, '"')
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\r')
            .replace(/\\t/g, '\t');
        const searchUrl = 'https://yandex.ru/search/?text=' + encodeURIComponent(decodedSongName + ' скачать');
        window.open(searchUrl, '_blank');
    }

    function searchVK(songName) {
        const decodedSongName = songName
            .replace(/\\\\/g, '\\')
            .replace(/\\'/g, "'")
            .replace(/\\"/g, '"')
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\r')
            .replace(/\\t/g, '\t');
        const searchUrl = 'https://vk.com/audio?act=search&q=' + encodeURIComponent(decodedSongName);
        window.open(searchUrl, '_blank');
    }

    function searchHitmotop(songName) {
        const decodedSongName = songName
            .replace(/\\\\/g, '\\')
            .replace(/\\'/g, "'")
            .replace(/\\"/g, '"')
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\r')
            .replace(/\\t/g, '\t');
        const searchUrl = 'https://rus.hitmotop.com/search?q=' + encodeURIComponent(decodedSongName);
        window.open(searchUrl, '_blank');
    }

    function showTempNotification(message) {
        const existingNotifications = document.querySelectorAll('.temp-notification');
        existingNotifications.forEach(notification => {
            document.body.removeChild(notification);
        });
        
        const notification = document.createElement('div');
        notification.className = 'temp-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(52, 152, 219, 0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            z-index: 10000;
            font-size: 14px;
            max-width: 300px;
            word-wrap: break-word;
            box-shadow: 0 4px 15px rgba(41, 128, 185, 0.3);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }

    // Обработчики событий
    document.getElementById('broadcast-btn').addEventListener('click', function() {
        const container = document.getElementById('radio-container');
        const btn = document.getElementById('broadcast-btn');
        
        userInteracted = true;
        
        if (container.style.display === 'none' || !container.style.display) {
            container.style.display = 'block';
            btn.textContent = 'Выйти из эфира';
            btn.classList.add('exit');
            
            startTime = Date.now();
            updateTimer();
            startStreamInfoPolling();
            updateTableState();
            sendBroadcastMessage('  начал эфир');
            
            fetch('index.php?inc=zaya', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'В эфир' })
            });
            
            initializeAudio();
            loadSettings();
        } else {
            container.style.display = 'none';
            btn.textContent = 'Войти в эфир';
            btn.classList.remove('exit');
            
            stopRequestsTracking();
            sendBroadcastMessage(' вышел из эфира');
            
            fetch('index.php?inc=zaya', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'Закрыть стол заявок' })
            }).then(() => {
                updateTableState();
                fetch('index.php?inc=zaya', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ action: 'Выйти из эфира' })
                });
            });
        }
    });

    document.getElementById('announce-btn').addEventListener('click', function() {
        const btn = document.getElementById('announce-btn');
        userInteracted = true;
        
        if (isTableOpen) {
            fetch('index.php?inc=zaya', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'Закрыть стол заявок' })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    isTableOpen = false;
                    btn.textContent = 'Объявить открытие стола заявок';
                    btn.classList.remove('exit');
                    stopRequestsTracking();
                    sendBroadcastMessage('стол заявок закрыт');
                }
            });
        } else {
            fetch('index.php?inc=zaya', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'Открыть стол заявок' })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    isTableOpen = true;
                    btn.textContent = 'Объявить закрытие стола заявок';
                    btn.classList.add('exit');
                    startRequestsTracking();
                    sendBroadcastMessage('стол заявок открыт');
                }
            });
        }
    });

    // Обработчик сохранения настроек
    document.getElementById('save-settings-btn').addEventListener('click', function() {
        userInteracted = true;
        saveSettings();
    });

    document.getElementById('sound-toggle').addEventListener('click', function() {
        userInteracted = true;
        isSoundEnabled = !isSoundEnabled;
        const toggleBtn = document.getElementById('sound-toggle');
        
        if (isSoundEnabled) {
            toggleBtn.classList.remove('muted');
            toggleBtn.innerHTML = '<i class="fas fa-bell"></i>';
            toggleBtn.title = 'Звук уведомлений включен';
            initializeAudio();
        } else {
            toggleBtn.classList.add('muted');
            toggleBtn.innerHTML = '<i class="fas fa-bell-slash"></i>';
            toggleBtn.title = 'Звук уведомлений выключен';
        }
    });

    setInterval(function() {
        const messageData = {
            action: 'Проверка'
        };
        
        fetch('index.php?inc=zaya', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.efir == 0) {
                document.getElementById('broadcast-btn').textContent = 'Войти в эфир';
                document.getElementById('broadcast-btn').classList.remove('exit');
                document.getElementById('radio-container').style.display = 'none';
                stopRequestsTracking();
            } else if (data.efir == 1) {
                document.getElementById('broadcast-btn').textContent = 'Выйти из эфира';
                document.getElementById('broadcast-btn').classList.add('exit');
                document.getElementById('radio-container').style.display = 'block';
            }
            
            isTableOpen = data.stol == 1;
            const announceBtn = document.getElementById('announce-btn');
            
            if (isTableOpen) {
                announceBtn.textContent = 'Объявить закрытие стола заявок';
                announceBtn.classList.add('exit');
                if (!isTrackingStarted) {
                    startRequestsTracking();
                }
            } else {
                announceBtn.textContent = 'Объявить открытие стола заявок';
                announceBtn.classList.remove('exit');
                stopRequestsTracking();
            }
            
            if (data.flag == 0) {
                document.getElementById('radio-container').style.display = 'none';
                document.getElementById('broadcast-btn').textContent = 'Войти в эфир';
                document.getElementById('broadcast-btn').classList.remove('exit');
                stopRequestsTracking();
            }
        })
        .catch(error => {
            console.error('Ошибка проверки состояния:', error);
        });
    }, 4000);

    if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
    }

    document.addEventListener('click', function() {
        if (!userInteracted) {
            userInteracted = true;
            initializeAudio();
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        initializeAudio();
    });
</script>

    <script src="https://myradio24.com/player/player.js?v3.31" data-radio="lenin" data-interval=15 data-vmid=27639 data-lang="ru"></script>


<span style='display:block;text-align:center'><script type="text/javascript">
   var begin =  "2025";//год создания чата
  var date = new Date();
  var new_year =  date.getFullYear();
  var chat =  "snami.mpchat.com";//название чата
  var avtor = " - Все права защищены." ;//создатели
  var designer = "Андрей (Мистик) & Эмиль (ГНЕВ™)" ;// дизайнер
  document.write("  © "+begin+"-"+new_year+" \"<b>"+chat+"</b>\"<b>"+avtor+"</b>  <b>"+designer)
  </script>
</span>


</body>
</html>