<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Рейтинг пользователей</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href='/data/vhod/images/favicon.ico' type="image/x-icon">
<link id="style" rel="stylesheet" type="text/css" href="/2.css">

<style>
@font-face {
  font-family: 'Kapelka';
  src: url('https://snami.mpchat.com/fonts/Kapelka.ttf');
}
@font-face {
  font-family: 'FoxcroftNF RUS Regular';
  src: url('https://snami.mpchat.com/fonts/FoxcroftNF RUS Regular.otf');
}
@font-face {
  font-family: 'Bounded';
  src: url('https://snami.mpchat.com/fonts/Bounded.ttf');
}
@font-face {
  font-family: 'Bressay Trial';
  src: url('https://snami.mpchat.com/fonts/Bressay Trial.ttf');
}
@font-face {
  font-family: 'Artemis cursive';
  src: url('https://snami.mpchat.com/fonts/Artemis cursive.ttf');
}

/* Стиль тела */
body.top100-body {
  background: linear-gradient(135deg, #89f7fe, #66a6ff);
  font-family: 'Artemis cursive', sans-serif;
  margin: 0;
  padding: 0;
  color: #222;
}

/* Контейнер */
.top100-container {
  max-width: 1100px;
  margin: 40px auto;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  padding: 50px 30px;
  transition: all 0.3s ease;
  position: relative;
}

/* Заголовок */
.top100-title {
  color: #2a7ae2;
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
  letter-spacing: 1.2px;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.2);
}

/* Обертка таблицы с эффектом */
.top100-table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 20px;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.05);
  margin-bottom: 40px;
  background: linear-gradient(135deg, #f0f4f8, #e0e7ff);
  padding: 10px;
}

/* Таблица */
.top100-table {
  width: 100%;
  min-width: 600px;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  font-family: 'Artemis cursive', sans-serif;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}
.top100-table th, .top100-table td {
  padding: 16px 20px;
  border-bottom: 1px solid #e0e7ff;
  font-size: 1.1em;
}
.top100-table th {
  background: linear-gradient(135deg, #d0e7f9, #e7f0fd);
  color: #2a7ae2;
  font-weight: 700;
  text-align: center;
  font-size: 1.2em;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.top100-table th:hover {
  background: linear-gradient(135deg, #e7f0fd, #d0e7f9);
  transform: scale(1.02);
}
.top100-table tr:hover td {
  background: #f0f4f8;
}
.top100-table td {
  text-align: center;
  transition: all 0.2s ease;
}
.top100-table td a {
  color: #2a7ae2;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  transition: all 0.3s ease;
}
.top100-table td a:hover {
  color: #055a8c;
  transform: scale(1.05);
}

/* Навигация */
.top100-nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 40px;
}
.top100-nav a, .top100-nav b {
  padding: 12px 24px;
  border-radius: 25px;
  background: linear-gradient(135deg, #2a7ae2, #66a6ff);
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  font-size: 1em;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}
.top100-nav a:hover {
  background: linear-gradient(135deg, #055a8c, #003f66);
  transform: translateY(-3px);
}
.top100-nav b {
  background: linear-gradient(135deg, #2a7ae2, #66a6ff);
  cursor: default;
  opacity: 0.9;
}

/* Мобильная адаптация */
@media(max-width: 700px){
  .top100-container { padding: 20px 4vw; }
  .top100-title { font-size: 2em; }
  .top100-table {
    min-width: 100%;
  }
  .top100-table th, .top100-table td {
    padding: 10px 14px;
    font-size: 1em;
  }
  .top100-nav { justify-content: center; }
  .top100-nav a, .top100-nav b {
    padding: 10px 20px;
    font-size: 0.9em;
  }
}
</style>


<script src="/index.php?inc=informer&getmsg=1&inchat=1&lastreg=10&counter=1&birthday=1&lasttopics=10&forum=0&randfotos=20&lastmsgs=10"></script>

</head>
<body class="top100-body">
<div class="top100-container">
  <div class="top100-title">Рейтинг пользователей</div>
  <div class="top100-table-wrap">
    <table class="top100-table" id="top100-table">
      <!-- JS заполнит таблицу -->
    </table>
  </div>
  <div class="top100-nav" id="top100-nav"></div>
</div>
<script>
/* Вывод заголовков */
var onlytitle= ['','Участник','Время','Сообщ.','Активн.','Просм.','Реф.','Викторина','Пункты'];
var onlyfield= ['','nick','onlinetime','msg','activity','views','ref','gamewins','points'];
var wr='<th>№</th>';
for(var i=0;i<only.length;i++) {
  var field=only.charAt(i);
  wr+='<th><a href="?inc=top100&only='+only+'&sort='+onlyfield[field]+'">'+onlytitle[field]+'</a></th>';
}
document.getElementById('top100-table').innerHTML = '<tr>'+wr+'</tr>';

/* Вывод пользователей */
for(var num in u) {
  var user=u[num], wr='<td>'+num+'.</td>';
  for(var i=0;i<only.length;i++) {
    var field=only.charAt(i);
    if(field=='1')
      wr+='<td><a href="?inc=info&userid='+user[0]+'" target="_blank"><font color="'+user['color']+'">'+user[field]+'</font></a></td>';
    else if(field=='2') {
      var hours=Math.floor(user[2]/60), mins=user[2]%60;
      wr+='<td align=right>'+hours+' час. '+mins+' мин.</td>';
    }
    else if(field=='4') {
      var activity=Math.round(user[4]*30);
      wr+='<td align=right>'+activity+'</td>';
    }
    else
      wr+='<td align=right>'+user[field]+'</td>';  
    }
  var tr=document.createElement('tr');
  tr.innerHTML=wr;
  document.getElementById('top100-table').appendChild(tr);
}

/* Навигация */
var count=Object.keys(u).length;
var prev='<b>&laquo; Назад</b>'; if(s>0) prev='<a href="?inc=top100&only='+only+'&sort='+sort+'&limit='+limit+'&s='+(s*1-1)+'">'+prev+'</a>';
var next='<b>Далее &raquo;</b>'; if(count>=limit) next='<a href="?inc=top100&only='+only+'&sort='+sort+'&limit='+limit+'&s='+(s*1+1)+'">'+next+'</a>';
document.getElementById('top100-nav').innerHTML = prev+' <b>'+(s*1+1)+'</b> '+ next;
</script>
</body>
</html>