<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <link rel="shortcut icon" href="by-FeNIX/favicon-chatike.png" type="image/x-icon">
  <title>Друзья</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://chatike.ru/forms.css">
	<style rel="stylesheet" type="text/css">
	@font-face {
    font-family: 'PT Sans Narrow';
    font-style: normal;
    font-weight: 400;
    src: local('PT Sans Narrow'), local('PTSansNarrow-Regular'),
        url(https://allfont.ru/cache/fonts/pt-sans-narrow_77616f6623d117b08eae3ab5009871ad.woff) format('woff'),
        url(https://allfont.ru/cache/fonts/pt-sans-narrow_77616f6623d117b08eae3ab5009871ad.ttf) format('truetype');
}
.body {
    max-width: 600px;
    margin: -10px auto;
    padding: 40px;
}
body {
    background: url(https://livedemo00.template-help.com/wordpress_53878/wp-content/themes/theme53878/images/content-texture.jpg) center center repeat-y;
    -webkit-background-size: 100% auto;
    -moz-background-size: 100% auto;
    -o-background-size: 100% auto;
    background-size: 100% auto;
}
header {
  font:500 24px "PT Sans Narrow", Verdana, Arial, Helvetica, sans-serif !important;
}
#setError {
background: none repeat scroll 0% 0% #FF4747;
    font: 500 17px "PT Sans Narrow", Verdana, Arial, Helvetica, sans-serif !important;
    color: #fff;
    padding: 10px;
    text-align: center;
}
#setNote, #setTitle {
    background: none repeat scroll 0% 0% rgb(230, 210, 141);
    font: 500 17px "PT Sans Narrow", Verdana, Arial, Helvetica, sans-serif !important;
    color: #6F6A6A;
    padding: 5px;
    text-align: center;
}
.ok{
    width: 100%;
    height: 25px;
    overflow: hidden;
    padding: 0 10px;
    outline: none;
    border: 3px solid #FFF;
    font: 300 15px/25px 'Open Sans', Helvetica, Arial, sans-serif;
    text-decoration: none;
    color: #fff;
    cursor: pointer;
    opacity: 0.8;
    -ms-transition: opacity 0.2s;
    -moz-transition: opacity 0.2s;
    -webkit-transition: opacity 0.2s;
}
.del{background-color: #d9534f;}
.delvse{background-color: #ec971f;}
.ok2{background-color: #5cb85c;}
.ok:hover{     
    opacity: 1;
}   
   
.ok:active,
.ok:focus{   
    opacity: 1;
}
	</style>
	<script>
/* Функции чтения Cookie */
function getcookie(key) {
	str=document.cookie;len=str.length; if(len==0) return "";
	start=str.indexOf(key + "="); if(start==-1) return "";
	start=start+key.length+1; 
	end=str.indexOf(";",start); if(end==-1) end=len;
	return unescape(str.substring(start,end));
}

/* Функции записи Cookie */
function setcookie(key,str,min) {
	if(!key) return;
	if(!min) min=60*24*365;
	var date = new Date();
	date.setTime(date.getTime()+(min*60*1000));
	document.cookie = key+"="+str+"; expires="+date.toGMTString()+"; path=/";
}
/* Функции удаления Cookie */
function delcookie(name) {
  document.cookie = name + "=" + "; expires=Thu, 01 Jan 1970 00:00:01 GMT";
}
</script>
</head>
<body class="body">
<form action="" class="sky-form">
				<header>Друзья в чате </header>
				<script>if(getcookie('zvukno')=='1' ||getcookie('zvukno')=='' )document.write('<p id="setError">У вас отключена функция воспроизведения звука в чате. Без неё некоторые параметры могут не работать. Для стабильной работы нажмите на кнопку включения звука в меню.</p>'); </script>
  <p id="setNote">Все настройки хранятся на стороне браузера.</p>
  
<fieldset>


        <section style="position: absolute;margin-left: 270px;">
						<label class="label">Введите ник друга</label>
						<label class="input" style="width: 265px;">
		<input id="nick" autocomplete="off" type="text" placeholder="Ник друга" =""="" style="width:100%">
						</label>
					</section>
   <section style="position: absolute;margin-left: 270px;margin-top: 70px;">
		<input onclick="adduser();" type="button" value="Добавить" class="ok ok2"> <br>
		<input id="buttonDel" onclick="deluser();" type="button" value="Удалить" class="ok del"> <br>
		<input id="buttonDelAll" onclick="$(&quot;#userlist&quot;).empty();$(&quot;#buttonDelAll&quot;).prop(&quot;disabled&quot;, true);$(&quot;#buttonDel&quot;).prop(&quot;disabled&quot;, true);" type="button" value="Удалить всё" class="ok delvse"> 
		</section>
      <section>
						<label class="label">Список друзей</label>
						<label class="select select-multiple" style="width: 255px;">
						<select multiple="" id="userlist" style="height: 150px;">
							</select>
						</label>
						<div class="note"><strong>ВНИМАНИЕ:</strong> При вводе ника должен учитываться регистр букв (заглавные и строчные).</div>
					</section>

				</fieldset>
 <p id="setTitle" > Параметры - (<span id=selectNick>---</span>)</p>
  
<fieldset>
			<section>
		<label class="label">Цвет в ник-листе</label>
			<label class="select">
	<select id=colorNick onchange="this.style.backgroundColor=this.value" disabled>
			<option value='#FFF' style="background-color:#FFF;"> По умолчанию</option>
			<option value='#AFD9DB' style="background-color:#AFD9DB;">#AFD9DB</option>
			<option value='#B3DBAF' style="background-color:#B3DBAF;">#B3DBAF</option>
			<option value='#DBD9AF' style="background-color:#DBD9AF;">#DBD9AF</option>
			<option value='#D7B6B5' style="background-color:#D7B6B5;">#D7B6B5</option>
			<option value='#AFBCDB' style="background-color:#AFBCDB;">#AFBCDB</option>
			<option value='#B5AFDB' style="background-color:#B5AFDB;">#B5AFDB</option>
			<option value='#DBAFD9' style="background-color:#DBAFD9;">#DBAFD9</option>
							</select>
							<i></i>
						</label>
                      <div class="note"><strong>Note:</strong> Функция заработает при обновлении окна чата или перезаходе в чат выбранного пользователя. </div>
					</section>
					
					
				</fieldset>
  
  <script>if(getcookie('soundVhod')=='off' ||getcookie('soundVhod')=='' )document.write('<p id="setError">Параметр не включен в настройках.</p>'); </script>
  <fieldset>
<section>
						<label class="label">Звук входа в чат</label>
						<label class="select select-multiple">
							<select multiple="" id="soundIn" disabled>
		  <option value='0' onclick="ion.sound.play('userjoin');"> По умолчанию </option>
		  <option value='1' onclick="ion.sound.play('userjoin1');"> Звук 1 </option>
		  <option value='2' onclick="ion.sound.play('userjoin2');"> Звук 2 </option>
		  <option value='3' onclick="ion.sound.play('userjoin3');"> Звук 3 </option>
		  <option value='4' onclick="ion.sound.play('userjoin4');"> Звук 4 </option>
		  <option value='5' onclick="ion.sound.play('userjoin5');"> Звук 5 </option>
							</select>
						</label>
						<div class="note"><strong>Note:</strong> Для прослушивание звука нажмите на вариант. </div>
					</section>
    </fieldset>
  <script>if(getcookie('soundExit')=='off' ||getcookie('soundExit')=='' )document.write('<p id="setError">Параметр не включен в настройках.</p>'); </script>
  <fieldset>
<section>
						<label class="label">Звук выхода из чата</label>
						<label class="select select-multiple">
							<select multiple="" id="soundOut" disabled>
		 <option value='0' onclick="ion.sound.play('userleav');"> По умолчанию  </option>
		  <option value='1' onclick="ion.sound.play('userleav1');"> Звук 1 </option>
		  <option value='2' onclick="ion.sound.play('userleav2');"> Звук 2 </option>
							</select>
						</label>
						<div class="note"><strong>Note:</strong> Для прослушивание звука нажмите на вариант. </div>
					</section>
    </fieldset>
 <script>if(getcookie('msgMusic')=='off' ||getcookie('msgMusic')=='' )document.write('<p id="setError">Параметр не включен в настройках.</p>'); </script>
  <fieldset>
<section>
						<label class="label">Звук основных сообщений</label>
						<label class="select select-multiple">
							<select multiple="" id="soundMsg" disabled>
		 <option value='0'  onclick="ion.sound.play('chat');"> По умолчанию  </option>
		  <option value='1'  onclick="ion.sound.play('chat1');"> Звук 1 </option>
		  <option value='2'  onclick="ion.sound.play('chat2');"> Звук 2 </option>
		  <option value='3'  onclick="ion.sound.play('chat3');"> Звук 3 </option>
		  <option value='4'  onclick="ion.sound.play('chat4');"> Звук 4 </option>
		  <option value='5'  onclick="ion.sound.play('chat5');"> Звук 5 </option>
		  <option value='6'  onclick="ion.sound.play('chat6');"> Звук 6 </option>
							</select>
						</label>
						<div class="note"><strong>Note:</strong> Для прослушивание звука нажмите на вариант. </div>
					</section>
    </fieldset>
	
<script>
//Функция добавления друга
function adduser(){
	if ($("#nick").val() != ""){
		nn = $("#nick").val();
		nn = nn.replace(/\s+/g, '');
		val = nn+'##0##0##0###FFF';
		add =  '<option value="'+val+'">'+nn+'</option>';

		$("#userlist").append(add);
		console.info($("#nick").val()+' - добавлен.(##0##0##0##0)');
		$("#nick").val('');
		$("#nick").focus();
	} 
}
function adduser2(data){
		arr=data.split('##');
		add =  '<option value="'+data+'">'+arr[0]+'</option>';

		$("#userlist").append(add);
		console.info(arr[0]+' - добавлен');
}
// Функция удаления друга
function deluser(){
	$("#userlist :selected").remove();
	console.info('Друг удалён');
	$("#userlist :last").attr("selected", "selected");
	$("#nick").focus();
	if ($("select[id=userlist] option").size() == 0) {$("#buttonDel").prop('disabled', true);$("#buttonDelAll").prop("disabled", true);} else {$("#buttonDel").prop('disabled', false); $("#buttonDelAll").prop("disabled", false);}
}

function saveUserVal(){
	set_nick = $("#userlist :selected").text();
	if ($("#soundIn :selected").val() == undefined) set_in = 0; else set_in = $("#soundIn :selected").val();
	if ($("#soundOut :selected").val() == undefined) set_out = 0; else set_out = $("#soundOut :selected").val();
	if ($("#soundMsg :selected").val() == undefined) set_msg = 0; else set_msg = $("#soundMsg :selected").val();
	if ($("#colorNick :selected").val() == undefined) set_color = '#FFF'; else set_color = $("#colorNick :selected").val();
	val=set_nick +'##'+ set_in  +'##'+ set_out +'##'+ set_msg +'##'+ set_color;
	$("#userlist :selected").val(val);
	console.log('У '+ $("#userlist :selected").text()+' измененые параметры на - '+ val);
}







//Событие при клике на список друзей
$("#userlist").change(function(){
    //if($(this).val() == 0) return false;
	console.log('Выбран: '+$("#userlist :selected").text() );
	friend_set = $(this).val().split('##');
	$("#selectNick").text($("#userlist :selected").text());
	
	 $("#soundIn option[value='"+friend_set[1]+"']").prop("selected", true);
	 $("#soundOut option[value='"+friend_set[2]+"']").prop("selected", true);
	 $("#soundMsg option[value='"+friend_set[3]+"']").prop("selected", true);
	 $("#colorNick option[value='"+friend_set[4]+"']").prop("selected", true);
	
	$("#colorNick").css('backgroundColor',friend_set[4]);
	
	if ($("#soundIn").prop('disabled')) {
		$("#soundIn").prop('disabled', false);
		$("#soundOut").prop('disabled', false);
		$("#soundMsg").prop('disabled', false);
		$("#colorNick").prop('disabled', false);
	}
	if ($("select[id=userlist] option").size() == 0){ 
		$("#buttonDel").prop('disabled', true); 
		$("#buttonDelAll").prop('disabled', true); 
	}else {$("#buttonDel").prop('disabled', false); $("#buttonDelAll").prop('disabled', false); }

});




$("#soundIn").change(function(){
	saveUserVal();
});
$("#soundOut").change(function(){
	saveUserVal();
});
$("#soundMsg").change(function(){
	saveUserVal();
});
$("#colorNick").change(function(){
	saveUserVal();
});


// При открытии окна
get_friends = getcookie('friends');
$("#nick").focus();
if (get_friends!=null) {
	arr_friends = get_friends.split('$$');
	for (j=0 ;j < arr_friends.length-1;j++) adduser2(arr_friends[j]);
} else { $("#buttonDelAll").prop("disabled", true); $("#buttonDel").prop("disabled", true);}

// Сохраняем
function saveForm(){
	if ($("select[id=userlist] option").size() != 0){
	str='';
	$('#userlist option').each(function(){
		str=str+this.value+'$$';
		console.log(str);
	});
	setcookie('friends',str,99999999); alert('Сохранено');} else delcookie('friends');

}
</script>
				<footer>
                  <img src="https://chatike.ru/by-FeNIX/index/images/324.png">
					<button onclick="saveForm();" type="submit" class="button">Сохранить</button>
					<button type="button" class="button button-secondary" onclick="window.history.back();">Назад</button>
				</footer>
			</form>
			<script src="https://sociotime.ru/src/ion.sound.min.js"></script>
<script src="https://sociotime.ru/sounds/sound-settings.js"></script>
</body>
</html>