<!DOCTYPE html>
<html lang="ru">
<head>
  <script src="/assets/js/site-theme-boot.js"></script>
  <link rel="stylesheet" href="/assets/css/site-theme.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Отправить заявку - Радио Ленин ФМ</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary-gradient: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            --card-bg: rgba(255, 255, 255, 0.1);
            --text-color: #fff;
            --error-color: #ffa3a3;
            --success-color: #a3ffa3;
        }

        * {
            box-sizing: border-box;
        }

        body {
            background: var(--primary-gradient);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: var(--text-color);
            margin: 0;
            padding: 15px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .request-form-container {
            background-color: var(--card-bg);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
        }

        .form-title {
            text-align: center;
            font-size: clamp(1.5rem, 5vw, 2rem);
            margin-bottom: 15px;
            background: linear-gradient(to right, #fff, #e0d6ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1.3;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-control {
            background: rgba(255, 255, 255, 0.15);
            border: none;
            border-radius: 10px;
            color: white;
            padding: 12px 15px;
            font-size: 16px;
            width: 100%;
        }

        .form-control::placeholder {
            color: rgba(255, 255, 255, 0.7);
        }

        .form-control:focus {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            box-shadow: none;
            outline: none;
        }

        .form-label {
            font-weight: 600;
            margin-bottom: 8px;
            display: block;
            font-size: 0.95rem;
        }

        .btn-submit {
            background: linear-gradient(135deg, #8a2be2, #6a0dad);
            border: none;
            border-radius: 50px;
            color: white;
            font-size: 1rem;
            font-weight: 600;
            padding: 14px 20px;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            width: 100%;
            margin-top: 10px;
            cursor: pointer;
            min-height: 50px;
        }

        .btn-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .btn-submit:active {
            transform: translateY(0);
        }

        .btn-submit:disabled {
            background: linear-gradient(135deg, #555, #777);
            transform: none;
            box-shadow: none;
            opacity: 0.6;
            cursor: not-allowed;
        }

        .feedback {
            color: var(--success-color);
            text-align: center;
            margin-top: 15px;
            display: none;
            font-size: 0.9rem;
            padding: 10px;
            border-radius: 8px;
        }

        .feedback.error {
            color: var(--error-color);
            background: rgba(255, 163, 163, 0.1);
        }

        .user-info {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 10px;
            padding: 12px;
            margin-bottom: 15px;
            text-align: center;
            font-size: 0.9rem;
        }

        .guest-notice {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 8px;
            margin-top: 10px;
            font-size: 0.85rem;
            text-align: center;
        }

        .requests-stats {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 10px;
            padding: 12px;
            margin-bottom: 15px;
            text-align: center;
            font-weight: 600;
            font-size: 0.9rem;
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        .limit-warning {
            color: var(--error-color);
            font-size: 0.85rem;
            margin-top: 5px;
        }

        .table-status {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 10px;
            padding: 12px;
            margin-bottom: 15px;
            text-align: center;
            font-size: 1rem;
            font-weight: 600;
        }

        .table-status.closed {
            background: rgba(255, 100, 100, 0.2);
            color: var(--error-color);
        }

        .table-status.open {
            background: rgba(100, 255, 100, 0.2);
            color: var(--success-color);
        }
        
        .character-count {
            font-size: 0.75rem;
            text-align: right;
            margin-top: 5px;
            opacity: 0.7;
        }
        
        .character-count.warning {
            color: #ffa3a3;
        }
        
        .character-count.limit {
            color: #ff6b6b;
        }

        .user-requests-section {
            margin-top: 25px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 20px;
        }

        .user-requests-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 15px;
            text-align: center;
            background: linear-gradient(to right, #fff, #e0d6ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .user-requests-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .user-request-item {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 15px;
            border-left: 4px solid;
            transition: all 0.3s ease;
        }

        .user-request-item:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
        }

        .request-song {
            font-weight: 600;
            font-size: 1rem;
            margin-bottom: 8px;
            color: white;
        }

        .request-status {
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .status-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
        }

        .status-pending {
            border-left-color: #ffa500;
        }
        .status-pending .status-indicator {
            background-color: #ffa500;
        }
        .status-pending .request-status {
            color: #ffa500;
        }

        .status-queue {
            border-left-color: #32cd32;
        }
        .status-queue .status-indicator {
            background-color: #32cd32;
        }
        .status-queue .request-status {
            color: #32cd32;
        }

        .status-completed {
            border-left-color: #32cd32;
        }
        .status-completed .status-indicator {
            background-color: #32cd32;
        }
        .status-completed .request-status {
            color: #32cd32;
        }

        .no-requests {
            text-align: center;
            padding: 20px;
            color: rgba(255, 255, 255, 0.7);
            font-style: italic;
        }

        @media (max-width: 480px) {
            body {
                padding: 10px;
                align-items: flex-start;
            }
            
            .request-form-container {
                padding: 15px;
                margin: 10px auto;
                border-radius: 15px;
            }
            
            .form-title {
                margin-bottom: 10px;
            }
            
            .form-group {
                margin-bottom: 12px;
            }
            
            .form-control {
                padding: 10px 12px;
                font-size: 16px;
            }
            
            .btn-submit {
                padding: 12px 15px;
                font-size: 1rem;
            }
            
            .user-info, .requests-stats, .table-status {
                padding: 10px;
                font-size: 0.85rem;
            }
            
            .requests-stats {
                flex-direction: row;
                justify-content: space-around;
                flex-wrap: wrap;
            }
            
            .user-requests-section {
                padding: 15px;
            }
            
            .user-request-item {
                padding: 12px;
            }
            
            .request-song {
                font-size: 0.95rem;
            }
        }

        @media (max-width: 360px) {
            .requests-stats {
                flex-direction: column;
                gap: 5px;
            }
        }

        @media (min-height: 800px) {
            body {
                align-items: center;
            }
        }
    </style>
		
</head>
<body>
    <div class="request-form-container">
        <h1 class="form-title">Отправить заявку на песню</h1>
        
        <div class="user-info">
            <div id="user-status">Статус: проверка...</div>
        </div>

        <div class="table-status closed" id="table-status">
            <i class="fas fa-times-circle"></i> Стол заявок закрыт
        </div>

        <div class="requests-stats" id="requests-stats">
            <span>Всего заявок: <span id="total-requests">0</span></span>
            <span>Ваших заявок: <span id="user-requests">0</span></span>
            <div class="limit-warning" id="limit-warning" style="display: none;">
                Лимит: не более 3 заявок на пользователя
            </div>
        </div>

        <form id="request-form">
            <div class="form-group">
                <label class="form-label" for="to">Для кого *</label>
                <input type="text" class="form-control" id="to" placeholder="Например: для моей подруги" required maxlength="100">
                <div class="character-count" id="to-count">0/100</div>
            </div>

            <div class="form-group">
                <label class="form-label" for="song">Песня *</label>
                <input type="text" class="form-control" id="song" placeholder="Исполнитель - Название песни" required maxlength="150">
                <div class="character-count" id="song-count">0/150</div>
            </div>

            <div class="form-group">
                <label class="form-label" for="comment">Комментарий (необязательно)</label>
                <textarea class="form-control" id="comment" placeholder="Ваш комментарий к заявке" rows="3" maxlength="300"></textarea>
                <div class="character-count" id="comment-count">0/300</div>
            </div>

            <div class="form-group">
                <label class="form-label" for="name">Ваше имя</label>
                <input type="text" class="form-control" id="name" placeholder="Ваше имя" readonly>
                <div class="guest-notice" id="guest-notice" style="display: none;">
                    Вы авторизованы как гость. Чтобы изменить имя, войдите в чат.
                </div>
            </div>

            <button type="submit" class="btn-submit" id="submit-btn" disabled>Отправить заявку</button>
            <div class="feedback" id="feedback"></div>
        </form>

        <div class="user-requests-section" id="user-requests-section" style="display: none;">
            <h3 class="user-requests-title">Ваши заявки</h3>
            <div class="user-requests-list" id="user-requests-list">
            </div>
        </div>
    </div>

    <script>
    let userRequestsCount = 0;
    let totalRequestsCount = 0;
    let currentRequestLimit = 3;
    let isTableOpen = false;
    let userRequestsPollingInterval = null;
    let settingsPollingInterval = null;

    // Функция загрузки лимита
    function loadRequestLimit() {
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
                const oldLimit = currentRequestLimit;
                currentRequestLimit = data.request_limit;
                updateLimitDisplay();
                
                // Если лимит изменился, обновляем кнопку и статистику
                if (oldLimit !== currentRequestLimit) {
                    console.log('Лимит изменен:', currentRequestLimit);
                    updateSubmitButton();
                    loadRequestsStats(); // Перезагружаем статистику для обновления отображения
                }
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки лимита:', error);
        });
    }

    // Функция обновления отображения лимита
    function updateLimitDisplay() {
        const limitWarning = document.getElementById('limit-warning');
        if (currentRequestLimit === 0) {
            limitWarning.style.display = 'none';
        } else {
            limitWarning.style.display = 'block';
            if (currentRequestLimit === 1) {
                limitWarning.textContent = `Лимит: не более 1 заявки на пользователя`;
            } else if (currentRequestLimit <= 4) {
                limitWarning.textContent = `Лимит: не более ${currentRequestLimit} заявки на пользователя`;
            } else {
                limitWarning.textContent = `Лимит: не более ${currentRequestLimit} заявок на пользователя`;
            }
        }
    }

    function cleanText(text) {
        if (!text) return '';
        
        text = text.replace(/[\r\n\t]/g, ' ');
        text = text.replace(/[\x00-\x1F\x7F]/g, '');
        text = text.replace(/\s+/g, ' ').trim();
        
        return text;
    }

    function removeLeadingFor(text) {
        if (!text) return '';
        
        const regex = /^\s*для\s+/i;
        text = text.replace(regex, '');
        
        return text.trim();
    }

    function updateCharacterCount(element, countElement, maxLength) {
        const length = element.value.length;
        countElement.textContent = `${length}/${maxLength}`;
        
        if (length > maxLength * 0.8) {
            countElement.className = 'character-count warning';
        } else if (length > maxLength) {
            countElement.className = 'character-count limit';
        } else {
            countElement.className = 'character-count';
        }
    }

    document.getElementById('to').addEventListener('input', function() {
        updateCharacterCount(this, document.getElementById('to-count'), 100);
    });

    document.getElementById('song').addEventListener('input', function() {
        updateCharacterCount(this, document.getElementById('song-count'), 150);
    });

    document.getElementById('comment').addEventListener('input', function() {
        updateCharacterCount(this, document.getElementById('comment-count'), 300);
    });

    function checkAuth() {
        fetch('index.php?inc=zaya', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'GetUserInfo' })
        })
        .then(response => response.json())
        .then(data => {
            if (data.authenticated) {
                document.getElementById('user-status').textContent = `Статус: авторизован как ${data.name}`;
                document.getElementById('name').value = data.name;
                document.getElementById('guest-notice').style.display = 'none';
            } else {
                document.getElementById('user-status').textContent = 'Статус: гость';
                document.getElementById('name').value = 'Гость';
                document.getElementById('guest-notice').style.display = 'block';
            }
            
            loadRequestLimit(); // Загружаем лимит первым
            loadRequestsStats();
            checkTableState();
            loadUserRequests();
            updateSubmitButton();
            
            // Запускаем периодическую проверку настроек
            startSettingsPolling();
        })
        .catch(error => {
            console.error('Ошибка проверки авторизации:', error);
            document.getElementById('user-status').textContent = 'Статус: ошибка проверки';
            document.getElementById('name').value = 'Гость';
            document.getElementById('guest-notice').style.display = 'block';
            
            loadRequestLimit();
            loadRequestsStats();
            checkTableState();
            loadUserRequests();
            updateSubmitButton();
            
            // Запускаем периодическую проверку настроек
            startSettingsPolling();
        });
    }

    function checkTableState() {
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
            const tableStatus = document.getElementById('table-status');
            
            if (isTableOpen) {
                tableStatus.innerHTML = '<i class="fas fa-check-circle"></i> Стол заявок открыт';
                tableStatus.className = 'table-status open';
            } else {
                tableStatus.innerHTML = '<i class="fas fa-times-circle"></i> Стол заявок закрыт';
                tableStatus.className = 'table-status closed';
            }
            
            updateSubmitButton();
        })
        .catch(error => {
            console.error('Ошибка проверки состояния стола:', error);
        });
    }

    function updateSubmitButton() {
        const submitBtn = document.getElementById('submit-btn');
        
        if (isTableOpen && (currentRequestLimit === 0 || userRequestsCount < currentRequestLimit)) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить заявку';
        } else {
            submitBtn.disabled = true;
            if (!isTableOpen) {
                submitBtn.textContent = 'Стол заявок закрыт';
            } else {
                submitBtn.textContent = 'Лимит заявок исчерпан';
            }
        }
    }

    function loadRequestsStats() {
        fetch('index.php?inc=zaya', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'GetRequestsStats' })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                userRequestsCount = data.user_requests;
                totalRequestsCount = data.total_requests;
                
                document.getElementById('total-requests').textContent = totalRequestsCount;
                document.getElementById('user-requests').textContent = userRequestsCount;
                
                updateSubmitButton(); // Обновляем кнопку после загрузки статистики
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки статистики:', error);
        });
    }

    function loadUserRequests() {
        fetch('index.php?inc=zaya', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'GetUserRequests' })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayUserRequests(data.requests);
            } else {
                console.error('Ошибка загрузки заявок пользователя:', data.error);
            }
        })
        .catch(error => {
            console.error('Ошибка сети при загрузке заявок:', error);
        });
    }

    function displayUserRequests(requests) {
        const container = document.getElementById('user-requests-list');
        const section = document.getElementById('user-requests-section');
        
        if (requests.length === 0) {
            container.innerHTML = '<div class="no-requests">У вас пока нет отправленных заявок</div>';
            section.style.display = 'none';
            return;
        }
        
        requests.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        let html = '';
        requests.forEach(request => {
            let statusText = '';
            switch (request.status) {
                case 'pending': statusText = 'В ожидании'; break;
                case 'queue': statusText = 'В очереди'; break;
                case 'completed': statusText = 'Выполнено'; break;
                case 'rejected': statusText = 'Отклонено'; break;
                default: statusText = 'В ожидании';
            }
            
            html += `
                <div class="user-request-item status-${request.status || 'pending'}">
                    <div class="request-song">${escapeHtml(request.song)}</div>
                    <div class="request-status">
                        <span class="status-indicator"></span>
                        Статус: ${statusText}
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        section.style.display = 'block';
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function startUserRequestsTracking() {
        loadUserRequests();
        
        if (userRequestsPollingInterval) {
            clearInterval(userRequestsPollingInterval);
        }
        
        userRequestsPollingInterval = setInterval(loadUserRequests, 5000);
    }

    function startSettingsPolling() {
        // Загружаем настройки сразу
        loadRequestLimit();
        
        // Затем каждые 3 секунды проверяем изменения
        if (settingsPollingInterval) {
            clearInterval(settingsPollingInterval);
        }
        
        settingsPollingInterval = setInterval(loadRequestLimit, 3000);
    }

    function stopUserRequestsTracking() {
        if (userRequestsPollingInterval) {
            clearInterval(userRequestsPollingInterval);
            userRequestsPollingInterval = null;
        }
    }

    function stopSettingsPolling() {
        if (settingsPollingInterval) {
            clearInterval(settingsPollingInterval);
            settingsPollingInterval = null;
        }
    }

    document.getElementById('request-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!isTableOpen) {
            showFeedback('Стол заявок закрыт. Невозможно отправить заявку.', true);
            return;
        }
        
        if (currentRequestLimit > 0 && userRequestsCount >= currentRequestLimit) {
            showFeedback(`Вы уже отправили максимальное количество заявок (${currentRequestLimit})`, true);
            return;
        }
    
        const toRaw = cleanText(document.getElementById('to').value.trim());
        const song = cleanText(document.getElementById('song').value.trim());
        const comment = cleanText(document.getElementById('comment').value.trim());
        const name = cleanText(document.getElementById('name').value);
        
        const to = removeLeadingFor(toRaw);
        
        if (!to) {
            showFeedback('Пожалуйста, укажите, для кого заявка', true);
            return;
        }
        
        if (!song) {
            showFeedback('Пожалуйста, укажите песню', true);
            return;
        }
        
        if (song.length > 150) {
            showFeedback('Название песни слишком длинное (максимум 150 символов)', true);
            return;
        }
        
        if (to.length > 100) {
            showFeedback('Поле "Для кого" слишком длинное (максимум 100 символов)', true);
            return;
        }
        
        if (comment.length > 300) {
            showFeedback('Комментарий слишком длинный (максимум 300 символов)', true);
            return;
        }
        
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        
        const requestData = {
            action: 'AddRequest',
            to: to,
            song: song,
            comment: comment,
            name: name
        };
        
        fetch('index.php?inc=zaya', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showFeedback(`Заявка успешно отправлена! ID: ${data.id}`);
                document.getElementById('request-form').reset();
                document.getElementById('name').value = name;
                
                document.getElementById('to-count').textContent = '0/100';
                document.getElementById('song-count').textContent = '0/150';
                document.getElementById('comment-count').textContent = '0/300';
                
                loadRequestsStats();
                loadUserRequests();
            } else {
                showFeedback('Ошибка: ' + data.error, true);
                submitBtn.disabled = false;
                updateSubmitButton();
            }
        })
        .catch(error => {
            showFeedback('Ошибка сети: ' + error, true);
            submitBtn.disabled = false;
            updateSubmitButton();
        });
    });

    function showFeedback(message, isError = false) {
        const feedback = document.getElementById('feedback');
        feedback.textContent = message;
        feedback.style.display = 'block';
        
        if (isError) {
            feedback.classList.add('error');
        } else {
            feedback.classList.remove('error');
        }
        
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 5000);
    }

    // Обновленный интервал - проверяем состояние стола и статистику каждые 10 секунд
    setInterval(function() {
        checkTableState();
        loadRequestsStats();
    }, 10000);

    document.addEventListener('DOMContentLoaded', function() {
        checkAuth();
        
        updateCharacterCount(document.getElementById('to'), document.getElementById('to-count'), 100);
        updateCharacterCount(document.getElementById('song'), document.getElementById('song-count'), 150);
        updateCharacterCount(document.getElementById('comment'), document.getElementById('comment-count'), 300);
        
        startUserRequestsTracking();
    });

    window.addEventListener('beforeunload', function() {
        stopUserRequestsTracking();
        stopSettingsPolling();
    });

    document.addEventListener('touchstart', function() {}, {passive: true});
</script>


</body>
</html>