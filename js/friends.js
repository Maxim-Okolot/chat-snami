// Элегантный вывод уведомлений
function showMessage(message) {
    alert(message); // Можно заменить на модальное окно или кастомный UI
}

// Объект с методами управления друзьями
const FriendManager = {
    sendRequest(userId) {
        if (!userId) return;

        fetch(`index.php?inc=frends&add=${userId}`)
            .then(response => response.json())
            .then(result => {
                const messages = {
                    "add": "Заявка успешно отправлена!",
                    "no users": "Такой пользователь не найден.",
                    "yes frend": "Этот человек уже в списке ваших друзей.",
                    "yes add": "Вы уже отправили заявку этому пользователю.",
                    "no my": "Вы не можете добавить самого себя.",
                };

                showMessage(messages[result] || "Произошла неизвестная ошибка.");

                if (result === "add") {
                    setTimeout(() => location.reload(), 5000);
                }
            })
            .catch(() => showMessage("Ошибка соединения. Попробуйте позже."));
    },

    cancelRequest(userId) {
        if (!userId) return;

        if (confirm("Вы уверены, что хотите отменить заявку в друзья?")) {
            fetch(`index.php?inc=frends&otm=${userId}`)
                .then(response => response.json())
                .then(result => {
                    if (result === "otm") {
                        showMessage("Заявка успешно отменена.");
                        setTimeout(() => location.reload(), 5000);
                    } else if (result === "no users") {
                        showMessage("Пользователь не найден.");
                    } else {
                        showMessage("Не удалось отменить заявку. Обратитесь в техподдержку.");
                    }
                })
                .catch(() => showMessage("Ошибка связи с сервером."));
        }
    },

    removeFriend(userId, username) {
        if (!userId) return;

        const confirmation = confirm(`Вы действительно хотите удалить ${username} из друзей?`);
        if (!confirmation) return;

        fetch(`index.php?inc=frends&del=${userId}`)
            .then(response => response.json())
            .then(result => {
                if (result === "del") {
                    showMessage(`Пользователь ${username} был удалён из списка друзей.`);
                    setTimeout(() => location.reload(), 5000);
                } else if (result === "no users") {
                    showMessage("Пользователь не найден.");
                } else {
                    showMessage("Удаление не удалось. Обратитесь в техподдержку.");
                }
            })
            .catch(() => showMessage("Ошибка при удалении пользователя."));
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.show-friends-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const more = document.getElementById('more-friends');
            if (more.style.display === 'none') {
                more.style.display = 'block';
                toggleBtn.textContent = 'Скрыть остальных';
            } else {
                more.style.display = 'none';
                toggleBtn.textContent = 'Показать остальных';
            }
        });
    }
});