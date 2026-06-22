<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Анкета %nick%</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href='/data/vhod/images/favicon.ico' type="image/x-icon">
  <link rel="stylesheet" href="../assets/css/profile.css">

  <script src="/profile-rating.js"></script>
  <script src="?inc=informer&jsonp=mp_init&getmsg=1&inchat=1&lastreg=10&counter=1&birthday=1"></script>
</head>

<body>

<div class="profile-card">

  <aside class="sidebar">
    <div class="avatar-block">
      <div class="avatar-placeholder" id="avatar"></div>
    </div>

    <div class="stats-group">
      <div class="stat-item">
        <span class="stat-value">%gamewins%</span>
        <span class="stat-label">Очков викторины</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">%msg%</span>
        <span class="stat-label">Сообщений</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">%views%</span>
        <span class="stat-label">Просмотров профиля</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">%points%</span>
        <span class="stat-label">Пунктов</span>
      </div>
      <div class="stat-item">
        <span class="stat-value" id="likes">0</span>
        <span class="stat-label" title="Счётчик обнуляется 1-го числа каждого месяца">Лайков за месяц</span>
      </div>
    </div>
  </aside>

  <div class="main-content">
    <div class="header">
      <div class="title-block">
        <h1>%nick%</h1>
      </div>
      <div class="status-badge">
        <script>
          var child = new Array;
          child['FunnyBunnu']='<span style="color:#2a7ae2;"><b>Админ</b></span>';
          child['Каспер']='<span style="color:#2a7ae2;"><b>Техник</b></span>';
          child['Igor_Moscow']='<span style="color:#2a7ae2;"><b>Dj</b></span>';
          if(child['%nick%']!=null) document.write(child['%nick%']);
          else document.write("<span style='color:#888;'>Житель</span>");
          if('%nick%'=='Магнэто') document.write('<style>.info-body {background-image: url(http://zoohall.com.ua/uploads/posts/2010-09/1284281751_abstact-background-mix-8.jpg);}</style>')
          if('%nick%'=='cyber') document.write('<style>.info-body {background-image: url(http://i58.fastpic.ru/big/2013/0829/5a/7c0cb74189576681afc614097127155a.jpg); background-size: 800px 600px;}</style>')
        </script>

        <script>
          window.friendAvatars = {
            "FunnyBunny": "https://snami.mpchat.com/img/no_avatar_par.png",
            "Каспер": "/data/foto/1751810217.jpg",
            "SweetBanny": "https://snami.mpchat.com/data/foto/1761526736.jpg",
            "PassionFlower": "/data/foto/1748424287.jpg",
            "Лесной_зверь": "/img/no_avatar.png",
            "Сергей-36": "/img/no_avatar.png",
            "Лена-О": "/img/no_avatar.png",
            "Домовенок": "/img/no_avatar.png",
            "Арчи": "/img/no_avatar.png",
            "Света-О": "/img/no_avatar.png",
            "Mint_Sparkle": "/data/foto/1750356240.jpg",
            "Фортуна": "/img/no_avatar.png",
            "MeloDia": "/data/foto/1750773206.jpg",
            "дракон": "/img/no_avatar.png",
            "Незабываемая": "/img/no_avatar.png",
            "Dylan": "/img/no_avatar.png",
            "Zeynep": "/img/no_avatar.png",
            "фАнТаЗиЯ": "/img/no_avatar.png",
            "Иволга": "/img/no_avatar.png",
            "Caramel": "/img/no_avatar.png"
          };
        </script>
      </div>
    </div>

    <div class="info-list">
      <div class="info-row">
        <span class="key">Имя</span>
        <span class="value">%name%</span>
      </div>
      <div class="info-row">
        <span class="key">Дата рождения</span>
        <span class="value">%birthday%</span>
      </div>
      <div class="info-row">
        <span class="key">Пол</span>
        <span class="value" id="gender"></span>
      </div>
      <div class="info-row">
        <span class="key">Знак зодиака</span>
        <span class="value">
          <script>
            den='%birthday%';
            xden=den.substr(3,2)+den.substr(0,2);
            if (xden<="0100"){document.write("-");}
            else if(xden>="0321"&&xden<="0420")document.write("Овен");
            else if(xden>="0421"&&xden<="0521")document.write("Телец");
            else if(xden>="0522"&&xden<="0621")document.write("Близнецы");
            else if(xden>="0622"&&xden<="0722")document.write("Рак");
            else if(xden>="0723"&&xden<="0823")document.write("Лев");
            else if(xden>="0824"&&xden<="0923")document.write("Дева");
            else if(xden>="0924"&&xden<="1023")document.write("Весы");
            else if(xden>="1024"&&xden<="1122")document.write("Скорпион");
            else if(xden>="1123"&&xden<="1221")document.write("Стрелец");
            else if(xden>="1222"||xden<="0120")document.write("Козерог");
            else if(xden>="0121"&&xden<="0219")document.write("Водолей");
            else if(xden>="0220"&&xden<="0320")document.write("Рыбы");
            </script>
        </span>
      </div>
      <div class="info-row">
        <span class="key">Любовь</span>
        <span class="value">
          <script>var love='%love%'; if(love=='') love='нет';document.write(love);</script>
        </span>
      </div>
      <div class="info-row">
        <span class="key">Семья</span>
        <span class="value"><a href="?inc=love&act=family&tonick=%nick%" onclick="window.open(this.href,'_blank','width=500,height=500'); return false;">Посмотреть семью</a></span>
      </div>
      <div class="info-row">
        <span class="key">Дата регистрации</span>
        <span class="value">%regdate%</span>
      </div>
      <div class="info-row">
        <span class="key">Дней в чате</span>
        <span class="value">
          <script language=JavaScript>
            den='%regdate%';
            var ret =/(\d\d).(\d\d).(\d\d)/;
            ret.exec(den);
            xmes=RegExp.$2+"/"+RegExp.$1+"/20"+RegExp.$3;
            datareg = new Date(xmes);
            datanew = new Date();
            datan = (datanew.getTime() - datareg.getTime()) / (1000*60*60*24);
            if (RegExp.$1){document.write(Math.round(datan));}
          </script>
        </span>
      </div>
      <div class="info-row">
        <span class="key">Последний визит</span>
        <span class="value">%lastvisit%</span>
      </div>
      <div class="info-row">
        <span class="key">Пробыл(a)</span>
        <span class="value">%time_h% час. %time_m% мин</span>
      </div>
      <div class="info-row">
        <span class="key">Состоит в группах</span>
        <span class="value">
          <script>
            var wr='';
            if(!clans.length) wr='нет';
            for(var i=0;i<clans.length;i++) {clan=clans[i];
              if(clan[7]) wr+='<img src=clan/'+clan[0]+'.gif> ';
              wr+='<a href=?inc=clan&clan='+clan[0]+' target=_blank>'+clan[1]+' ('+clan[6]+')</a> ';
              if(clan[3]=='%nick%') wr+='(админ)';
              wr+='<br>';
              break;
            }
            document.write(wr);
            </script>
        </span>

      </div>
    </div>

    <div class="actions">
      <div class="button-row">
        <button type="button" class="btn btn-primary" id="set-like">Лайкнуть профиль</button>
        <button type="button" class="btn btn-primary" id="get-likes">Кто лайкнул</button>
        <button type="button" class="btn btn-secondary" id="likes-top">Топ 10 лайков</button>
      </div>
      %friend_profile_block%
      <input type="button" class="btn btn-ghost" value="📂 Фотогалерея" onclick="window.open('index.php?inc=gallery&only=12345678','top','width=730,height=500,resizable=yes,scrollbars=yes,status=yes');return false" target="Фотогалерея" unselectable="on">
    </div>
  </div>

  <div class="add-section">
    <div class="add-section__wrap">
      %friends%
    </div>

    <div class="add-section__wrap">
      <h2>Подарки и награды</h2>
      <!-- Блок подарков и наград на всю ширину -->
      <div class="awards">
          <div id=shoptable>У вас нет вещей из магазина!</div>
          <script>
            var obj = document.getElementById('shoptable');
            var maxPerPage = 8;
            var reverse = 1;

            function printitems(page) {
              if (typeof items === "undefined" || !items.length) {
                obj.innerHTML = '<div class="awards-empty">У вас нет вещей из магазина!</div>';
                return;
              }

              var total = items.length;
              var start = page * maxPerPage;
              if (start >= total) {
                printitems(Math.max(0, Math.ceil(total / maxPerPage) - 1));
                return;
              }
              var end = Math.min(start + maxPerPage, total);
              var totalPages = Math.ceil(total / maxPerPage);

              var list = "<div class='awards-list'>";
              for (var j = start; j < end; j++) {
                var k = reverse ? (total - 1 - j) : j;
                list += "<div><img src=data/shop/" + items[k][0] + ".jpg title='" + items[k][1] + "\n" + items[k][2] + " " + items[k][3] + "\n" + items[k][4] + "'></div>";
              }
              list += "</div>";

              var pager = "";
              if (totalPages > 1) {
                pager = "<div class='awards-pager'>";
                pager += "<span class='awards-pager__meta'>" + (start + 1) + "–" + end + " из " + total + " · стр. " + (page + 1) + " из " + totalPages + "</span>";
                pager += "<span class='awards-pager__nav'>";
                if (page > 0) {
                  pager += "<a href=\"#\" onclick=\"printitems(" + (page - 1) + "); return false;\">Назад</a>";
                }
                if (end < total) {
                  if (page > 0) pager += " ";
                  pager += "<a href=\"#\" onclick=\"printitems(" + (page + 1) + "); return false;\">Дальше</a>";
                }
                pager += "</span></div>";
              }

              obj.innerHTML = list + pager;
            }

            printitems(0);
          </script>

      </div>
    </div>
  </div>
</div>






<div id="likesModal" class="likes-modal" style="display:none" aria-hidden="true">
  <div class="likes-modal-content" role="dialog" aria-labelledby="likesModalTitle">
    <div class="likes-modal-header">
      <h2 class="likes-modal-title" id="likesModalTitle">Кто лайкнул профиль</h2>
      <button type="button" class="likes-modal-close" id="likesModalClose" aria-label="Закрыть">&times;</button>
    </div>
    <div id="likesList" class="likes-list">
      <div class="loading-message">Загрузка...</div>
    </div>
  </div>
</div>

<div id="likesTopModal" class="likes-modal" style="display:none" aria-hidden="true">
  <div class="likes-modal-content likes-modal-content--top" role="dialog" aria-labelledby="likesTopModalTitle">
    <div class="likes-modal-header">
      <div>
        <h2 class="likes-modal-title" id="likesTopModalTitle">Топ 10 по лайкам</h2>
        <p class="likes-modal-subtitle" id="likesTopPeriod"></p>
      </div>
      <button type="button" class="likes-modal-close" id="likesTopModalClose" aria-label="Закрыть">&times;</button>
    </div>
    <div id="likesTopList" class="likes-list likes-top-list">
      <div class="loading-message">Загрузка...</div>
    </div>
  </div>
</div>




<script src="../assets/js/friends.js?46.%loadtime%"></script>

<script>
  const profile = {
    photo: '%foto%',
    gender: '%mw%',
  }

  let setAvatar = (photoLink, gender) => {
    const defaultImg = {
      male: 'man.jpg',
      female: 'woman.webp',
      unknown: 'unknown.jpg'
    }

    if (photoLink === '-' || photoLink === '') {
      let avatarSrc = null;

      switch (gender) {
        case '0':
          avatarSrc = defaultImg.male;
          break;
        case '1':
          avatarSrc = defaultImg.female;
          break;
        default:
          avatarSrc = defaultImg.unknown;
      }

      let img = document.createElement('img');
      img.src = `./img/default-avatar/${avatarSrc}`;
      img.alt = 'Фото профиля';

      document.querySelector('#avatar').append(img);
    } else {

      let link = document.createElement('a');
      let img = document.createElement('img');

      link.href = photoLink;
      link.target = '_blank';
      link.title = 'Посмотреть в полном размере';

      img.src = photoLink;
      img.alt = 'Фото профиля';

      link.append(img);
      document.querySelector('#avatar').append(img);
    }
  }

  setAvatar(profile.photo, profile.gender);


  let setGender = (gender) => {
    Number(gender) === 0 ? gender = 'Мужской' : gender = "Женский"
    document.querySelector('#gender').innerHTML = gender;
    console.log(profile.gender)
  }

  setGender(profile.gender);



  var PROFILE_VIEWER = %profile_viewer_json%;
  var PROFILE_OWNER = '%nick%';
  /* Через index.php?inc=info: отдельные get_likes.php на хостинге часто 404 */
  function profileLikesGetUrl() {
    var q = 'index.php?inc=info&profile_api=get_likes&photo_owner=' + encodeURIComponent(PROFILE_OWNER);
    if (PROFILE_VIEWER && PROFILE_VIEWER.nick) {
      q += '&voter_nick=' + encodeURIComponent(PROFILE_VIEWER.nick);
    }
    return q;
  }

  var PROFILE_SET_LIKE_URL = 'index.php?inc=info&profile_api=set_like';

  function setLikeButtonState(opts) {
    var btn = document.getElementById('set-like');
    if (!btn) return;
    if (!PROFILE_VIEWER || !PROFILE_VIEWER.nick) {
      btn.disabled = true;
      btn.textContent = 'Войдите, чтобы лайкнуть';
      btn.title = 'Нужна авторизация в чате';
      return;
    }
    if (PROFILE_VIEWER.nick === PROFILE_OWNER) {
      btn.disabled = true;
      btn.textContent = 'Это ваш профиль';
      btn.title = '';
      return;
    }
    if (opts && opts.alreadyLiked) {
      btn.disabled = true;
      btn.textContent = 'Вы уже лайкнули';
      btn.title = '';
      return;
    }
    btn.disabled = false;
    btn.textContent = 'Лайкнуть профиль';
    btn.title = '';
  }

  function refreshProfileLikesCount() {
    var el = document.getElementById('likes');
    fetch(profileLikesGetUrl(), { credentials: 'same-origin' })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data.success) return;
        if (el) el.textContent = String(data.total_likes);
        if (typeof data.viewer_has_liked === 'boolean') {
          setLikeButtonState({ alreadyLiked: data.viewer_has_liked });
        } else {
          setLikeButtonState({});
        }
      })
      .catch(function () {});
  }

  function openLikesModal() {
    var modal = document.getElementById('likesModal');
    if (!modal) return;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    loadLikesList();
  }

  function closeLikesModal() {
    var modal = document.getElementById('likesModal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }

  function loadLikesList() {
    var listContainer = document.getElementById('likesList');
    if (!listContainer) return;
    listContainer.innerHTML = '<div class="loading-message">Загрузка...</div>';

    fetch('index.php?inc=info&profile_api=get_likes&photo_owner=' + encodeURIComponent(PROFILE_OWNER), {
      credentials: 'same-origin'
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data.success) {
          listContainer.innerHTML = '<div class="no-likes-message">Не удалось загрузить список</div>';
          return;
        }
        if (!data.users || !data.users.length) {
          listContainer.innerHTML = '<div class="no-likes-message">Пока никто не лайкнул этот профиль в этом месяце</div>';
          return;
        }
        listContainer.innerHTML = '';
        data.users.forEach(function (user) {
          var row = document.createElement('div');
          row.className = 'like-user-item';
          var img = document.createElement('img');
          img.className = 'like-user-avatar';
          img.alt = '';
          img.src = (user.voter_avatar && String(user.voter_avatar).trim()) ? user.voter_avatar : '/img/no_avatar.png';
          img.onerror = function () { this.src = '/img/no_avatar.png'; };
          var info = document.createElement('div');
          info.className = 'like-user-info';
          var nickEl = document.createElement('div');
          nickEl.className = 'like-user-nick';
          nickEl.textContent = user.voter_nick || '';
          var dateEl = document.createElement('div');
          dateEl.className = 'like-user-date';
          var d = user.created_at ? new Date(user.created_at) : null;
          dateEl.textContent = d && !isNaN(d.getTime())
            ? d.toLocaleDateString('ru-RU') + ' ' + d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
            : '';
          info.appendChild(nickEl);
          info.appendChild(dateEl);
          row.appendChild(img);
          row.appendChild(info);
          listContainer.appendChild(row);
        });
      })
      .catch(function () {
        listContainer.innerHTML = '<div class="no-likes-message">Ошибка загрузки данных</div>';
      });
  }

  var PROFILE_TOP_LIKES_URL = 'index.php?inc=info&profile_api=top_likes';

  function openLikesTopModal() {
    var modal = document.getElementById('likesTopModal');
    if (!modal) return;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    loadLikesTopList();
  }

  function closeLikesTopModal() {
    var modal = document.getElementById('likesTopModal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }

  function loadLikesTopList() {
    var listContainer = document.getElementById('likesTopList');
    var periodEl = document.getElementById('likesTopPeriod');
    if (!listContainer) return;
    listContainer.innerHTML = '<div class="loading-message">Загрузка...</div>';
    if (periodEl) periodEl.textContent = '';

    fetch(PROFILE_TOP_LIKES_URL, { credentials: 'same-origin' })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data.success) {
          listContainer.innerHTML = '<div class="no-likes-message">Не удалось загрузить рейтинг</div>';
          return;
        }
        if (periodEl) {
          periodEl.textContent = data.period_title ? 'За ' + data.period_title : '';
        }
        var top = data.top || [];
        if (!top.length) {
          listContainer.innerHTML = '<div class="no-likes-message">В этом месяце ещё нет лайков</div>';
          return;
        }
        listContainer.innerHTML = '';
        top.forEach(function (row, i) {
          var line = document.createElement('div');
          line.className = 'likes-top-row';
          var rank = document.createElement('span');
          rank.className = 'likes-top-rank';
          rank.textContent = String(i + 1);
          var nickWrap = document.createElement('div');
          nickWrap.className = 'likes-top-nick';
          var a = document.createElement('a');
          a.href = 'index.php?inc=info&nick=' + encodeURIComponent(row.nick || '');
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.textContent = row.nick || '';
          nickWrap.appendChild(a);
          var cnt = document.createElement('span');
          cnt.className = 'likes-top-count';
          cnt.textContent = String(row.likes_count != null ? row.likes_count : 0);
          line.appendChild(rank);
          line.appendChild(nickWrap);
          line.appendChild(cnt);
          listContainer.appendChild(line);
        });
      })
      .catch(function () {
        listContainer.innerHTML = '<div class="no-likes-message">Ошибка загрузки данных</div>';
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!PROFILE_VIEWER || !PROFILE_VIEWER.nick || PROFILE_VIEWER.nick === PROFILE_OWNER) {
      setLikeButtonState({});
    }
    refreshProfileLikesCount();

    var setLikeBtn = document.getElementById('set-like');
    if (setLikeBtn) {
      setLikeBtn.addEventListener('click', function () {
        if (!PROFILE_VIEWER || !PROFILE_VIEWER.nick) {
          alert('Для лайка нужно войти в чат');
          return;
        }
        if (PROFILE_VIEWER.nick === PROFILE_OWNER) return;
        if (setLikeBtn.disabled) return;

        var avatar = (PROFILE_VIEWER.avatar && String(PROFILE_VIEWER.avatar).trim())
          ? PROFILE_VIEWER.avatar
          : '/img/no_avatar.png';

        fetch(PROFILE_SET_LIKE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify({
            photo_owner: PROFILE_OWNER,
            voter_nick: PROFILE_VIEWER.nick,
            voter_avatar: avatar
          })
        })
          .then(function (res) { return res.json(); })
          .then(function (data) {
            if (data.success) {
              var el = document.getElementById('likes');
              if (el && typeof data.total_likes === 'number') el.textContent = String(data.total_likes);
              setLikeButtonState({ alreadyLiked: true });
            } else {
              alert(data.error || 'Не удалось поставить лайк');
              if (data.error && String(data.error).indexOf('уже лайкнули') !== -1) {
                setLikeButtonState({ alreadyLiked: true });
              }
            }
          })
          .catch(function () {
            alert('Ошибка соединения с сервером');
          });
      });
    }

    var getLikesBtn = document.getElementById('get-likes');
    if (getLikesBtn) {
      getLikesBtn.addEventListener('click', function () {
        openLikesModal();
      });
    }

    var closeBtn = document.getElementById('likesModalClose');
    if (closeBtn) closeBtn.addEventListener('click', closeLikesModal);

    var modal = document.getElementById('likesModal');
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeLikesModal();
      });
    }

    var topBtn = document.getElementById('likes-top');
    if (topBtn) {
      topBtn.addEventListener('click', function () {
        openLikesTopModal();
      });
    }

    var topClose = document.getElementById('likesTopModalClose');
    if (topClose) topClose.addEventListener('click', closeLikesTopModal);

    var topModal = document.getElementById('likesTopModal');
    if (topModal) {
      topModal.addEventListener('click', function (e) {
        if (e.target === topModal) closeLikesTopModal();
      });
    }

  });
</script>
</body>
</html>
