<!DOCTYPE html>
<html lang="ru">
<head>
<title>Смайлы</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/assets/css/smile-panel.css">
<script>
function put(smile) { if(opener) opener.sendto(smile); else if(parent) parent.sendto(smile); return false;}
function cf(add) { if(add) return confirm('Добавить смайл в любимые?'); else return confirm('Удалить смайл из любимых?');}
</script>
</head>
<body class="smile-body">
