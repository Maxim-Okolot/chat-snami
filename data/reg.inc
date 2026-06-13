%include=header.html%

<style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    background: url("https://vmfile.com/upload/751/4272577882.jpg") no-repeat center center fixed;
    background-size: cover;
    font-family: Arial, sans-serif;
    color: #ffffff;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    z-index: 0;
  }

  .page-wrap {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .reg-card {
    width: 100%;
    max-width: 420px;
    background: rgba(15, 23, 42, 0.88);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 18px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
    padding: 28px 26px;
    text-align: center;
    backdrop-filter: blur(10px);
  }

  .reg-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 16px;
    color: #ffffff;
  }

  .note {
    font-size: 13px;
    color: #cbd5e1;
    margin-bottom: 18px;
    line-height: 1.5;
  }

  .field-label {
    display: block;
    text-align: left;
    font-size: 14px;
    font-weight: bold;
    margin: 12px 0 6px;
    color: #e2e8f0;
  }

  .text {
    width: 100%;
    box-sizing: border-box;
    padding: 11px 12px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
    outline: none;
    font-size: 15px;
  }

  .text:focus {
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.18);
  }

  .captcha-img {
    display: block;
    margin: 12px auto 10px;
    border-radius: 8px;
    max-width: 100%;
  }

  .checkbox-wrap {
    margin: 12px 0 16px;
    text-align: left;
    font-size: 14px;
    color: #e2e8f0;
  }

  .checkbox-wrap input {
    vertical-align: middle;
    margin-right: 6px;
  }

  .ok {
    width: 100%;
    padding: 12px 14px;
    border: none;
    border-radius: 10px;
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .ok:hover {
    transform: translateY(-1px);
    opacity: 0.95;
  }

  .msg-error {
    color: #fca5a5;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 14px;
  }

  .msg-success {
    color: #93c5fd;
    font-size: 14px;
    line-height: 1.5;
    margin-top: 14px;
  }
</style>

<div class="page-wrap">
  <div class="reg-card">
    <div class="reg-title">Регистрация</div>

    <div id="errorBlock" class="msg-error"></div>

    <form action="" method="post" id="regform">
      <script>
        if (typeof i_aidn !== 'undefined' && i_aidn) {
          document.write('<input type="hidden" name="i_aidn" value="' + i_aidn + '">');
        }
      </script>

      <div class="note">Логин 3-15 букв или цифр</div>

      <label class="field-label" for="nick">Логин</label>
      <input id="nick" name="nick" type="text" class="text" autocomplete="username">

      <label class="field-label" for="email">E-mail</label>
      <input id="email" name="email" type="text" class="text" autocomplete="email">

      <label class="field-label" for="pass">Пароль</label>
      <input id="pass" name="pass" type="password" class="text" autocomplete="new-password">

      <img src="index.php?inc=code" alt="Код" class="captcha-img">

      <input type="text" name="code" class="text" autocomplete="off" placeholder="Введите код с картинки">

      <div class="checkbox-wrap">
        <label>
          <input name="subscribe" type="checkbox">
          рассылка
        </label>
      </div>

      <input type="submit" name="done" value="Регистрация" class="ok">
    </form>

    <div id="successBlock" class="msg-success"></div>
  </div>
</div>

<script>
  (function () {
    var errValue = (typeof err !== 'undefined') ? String(err) : '';
    var regokValue = (typeof regok !== 'undefined') ? String(regok) : '';
    var subscribeValue = (typeof setsubscribe !== 'undefined') ? String(setsubscribe) : '';

    var errorBlock = document.getElementById('errorBlock');
    var successBlock = document.getElementById('successBlock');
    var form = document.getElementById('regform');

    var errors = {
      '1': 'Слишком много зарегистрированных, обратитесь к админу!',
      '2': 'Вы забыли заполнить одно из обязательных полей!',
      '3': 'Ошибка синтаксиса или длинны ника.',
      '4': 'Не используйте латиницу и кирилицу одновременно!',
      '5': 'Извините, но такой участник уже зарегистрирован.',
      '6': 'Неправильно указан E-mail.',
      '7': 'Код введён неверно или устарел, попробуйте ещё раз!',
      '8': 'Указанный E-mail адрес уже используется другим пользователем.',
      '9': 'Ошибка подтверждения регистрации, обратитесь к администратору!'
    };

    if (errors[errValue]) {
      errorBlock.textContent = errors[errValue];
    } else {
      errorBlock.innerHTML = '';
    }

    if (parseInt(regokValue, 10) > 0) {
      if (form) form.style.display = 'none';

      if (regokValue === '1') {
        successBlock.innerHTML = 'Регистрация завершена!<br>Вы будете перенаправлены в чат автоматически!';
        setTimeout(function () {
          location.href = '?inc=chat';
        }, 3000);
      }

      if (regokValue === '2') {
        successBlock.textContent = 'Регистрация завершена, дождитесь подтверждения регистрации админом!';
      }

      if (regokValue === '3') {
        successBlock.textContent = 'Регистрация завершена, вам отправлено письмо для подтверждения регистрации!';
      }

      if (subscribeValue === '1') {
        successBlock.innerHTML += '<br>Проверьте почту и подтвердите подписку на рассылку!';
      }
    }
  })();
</script>
