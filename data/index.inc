<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="чат С нами - современный чат для общения, развлечения и знакомств" />
  <meta name="keywords" content="чат, общение, радио, развлечения, знакомства" />
  <title>Чат "С нами" — Общение без границ</title>

  <link rel="icon" href="/assets/img/favicon.ico" type="image/x-icon" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v6.7.2/css/pro.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@600;700;800;900&display=swap" rel="stylesheet" />

  <script>
    if (location.protocol !== 'https:') {
      location.href = location.href.replace("http://", "https://");
    }
  </script>

  <style>
    :root {
      --bg: #070b18;
      --bg2: #0d1226;
      --panel: rgba(15, 20, 39, 0.72);
      --panel-strong: rgba(17, 24, 44, 0.92);
      --border: rgba(255,255,255,0.08);

      --text: #eef2ff;
      --muted: #aab3d4;
      --muted-2: #8189ad;

      --primary: #7c8cff;
      --primary-2: #9a5cff;
      --accent: #ff5ca8;
      --accent-2: #33d6c8;
      --success: #2be39f;
      --warning: #ffcb66;
      --danger: #ff6b7a;

      --shadow: 0 18px 45px rgba(0,0,0,.28);
      --shadow-hover: 0 22px 60px rgba(0,0,0,.36);

      --radius-xl: 28px;
      --radius-lg: 22px;
      --radius-md: 18px;

      --grad-main: linear-gradient(135deg, #7c8cff 0%, #ff5ca8 55%, #33d6c8 100%);
      --grad-blue: linear-gradient(135deg, #7c8cff 0%, #4cc9f0 100%);
      --grad-pink: linear-gradient(135deg, #ff5ca8 0%, #9a5cff 100%);
      --grad-green: linear-gradient(135deg, #2be39f 0%, #33d6c8 100%);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      color: var(--text);
      background:
        radial-gradient(circle at top left, rgba(124,140,255,.15), transparent 28%),
        radial-gradient(circle at top right, rgba(255,92,168,.14), transparent 24%),
        radial-gradient(circle at bottom left, rgba(51,214,200,.10), transparent 28%),
        linear-gradient(180deg, #090d1b 0%, #0b1020 45%, #070b18 100%);
      overflow-x: hidden;
    }

    body::before {
      content: "";
      position: fixed;
      inset: 0;
      background:
        linear-gradient(120deg, rgba(255,255,255,.03) 0%, transparent 40%),
        radial-gradient(circle at 50% 0%, rgba(124,140,255,.10), transparent 35%);
      pointer-events: none;
      z-index: 0;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    a:hover {
      color: inherit;
    }

    .page-shell {
      position: relative;
      z-index: 1;
    }

    /* NAV */
    .navbar {
      background: rgba(8, 12, 24, 0.72);
      backdrop-filter: blur(18px);
      border-bottom: 1px solid rgba(255,255,255,.08);
      padding: 0.85rem 0;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1000;
      box-shadow: 0 10px 30px rgba(0,0,0,.15);
    }

    .navbar-brand {
      font-family: 'Outfit', sans-serif;
      font-weight: 900;
      letter-spacing: .5px;
      color: white !important;
    }

    .navbar-toggler {
      border: 1px solid rgba(255,255,255,.14);
      box-shadow: none !important;
    }

    .nav-link {
      color: var(--muted) !important;
      font-weight: 700;
      font-size: 0.95rem;
      padding: 0.55rem 1rem !important;
      margin: 0 0.2rem;
      border-radius: 14px;
      transition: all .25s ease;
    }

    .nav-link:hover,
    .nav-link.active {
      color: #fff !important;
      background: rgba(124, 140, 255, 0.14);
      box-shadow: inset 0 0 0 1px rgba(124, 140, 255, 0.10);
    }

    /* HERO */
    .hero {
      padding: 110px 16px 24px;
    }

    .hero-inner {
      max-width: 1400px;
      margin: 0 auto;
      background: linear-gradient(135deg, rgba(15,20,39,.82), rgba(14,18,32,.72));
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 34px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(18px);
      padding: 34px 24px;
      position: relative;
      overflow: hidden;
    }

    .hero-inner::before {
      content: "";
      position: absolute;
      inset: -2px;
      background: linear-gradient(135deg, rgba(124,140,255,.18), rgba(255,92,168,.12), rgba(51,214,200,.10));
      pointer-events: none;
      mask: linear-gradient(#000, transparent 80%);
      opacity: .55;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      text-align: center;
    }

    .hero-badges {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 18px;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,.05);
      border: 1px solid rgba(255,255,255,.08);
      color: var(--text);
      padding: 8px 14px;
      border-radius: 999px;
      font-weight: 700;
      font-size: 0.85rem;
      backdrop-filter: blur(10px);
    }

    .hero-title {
      font-family: 'Outfit', sans-serif;
      font-size: clamp(2.1rem, 6vw, 5rem);
      font-weight: 900;
      line-height: 1.02;
      margin-bottom: 14px;
      background: var(--grad-main);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-subtitle {
      max-width: 760px;
      margin: 0 auto 22px;
      color: var(--muted);
      font-size: 1.05rem;
      line-height: 1.7;
    }

    .hero-cta {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    .btn-main,
    .btn-soft {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border-radius: 16px;
      font-weight: 800;
      padding: 12px 24px;
      transition: all .25s ease;
      border: none;
      text-decoration: none;
    }

    .btn-main {
      color: white;
      background: var(--grad-main);
      box-shadow: 0 12px 30px rgba(124,140,255,.20);
    }

    .btn-main:hover {
      transform: translateY(-2px);
      color: white;
      box-shadow: 0 16px 34px rgba(124,140,255,.28);
    }

    .btn-soft {
      background: rgba(255,255,255,.05);
      color: var(--text);
      border: 1px solid rgba(255,255,255,.08);
    }

    .btn-soft:hover {
      background: rgba(255,255,255,.08);
      color: white;
      transform: translateY(-2px);
    }

    /* LAYOUT */
    .main-layout,
    .stats-section,
    .spotlight-section,
    .content-wrapper {
      position: relative;
      z-index: 1;
      padding-left: 16px;
      padding-right: 16px;
    }

    .main-layout {
      padding-top: 6px;
      padding-bottom: 14px;
    }

    .layout-container {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: minmax(0, 1.4fr) 360px;
      gap: 18px;
      align-items: start;
    }

    .glass-card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow);
      backdrop-filter: blur(18px);
      overflow: hidden;
      transition: all .3s ease;
    }

    .glass-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-hover);
    }

    .card-pad {
      padding: 22px;
    }

    .section-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 16px;
      flex-wrap: wrap;
      max-width: 1400px;
      margin: 0 auto 14px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(255,255,255,.08);
    }

    .section-title {
      font-family: 'Outfit', sans-serif;
      font-size: clamp(1.5rem, 3vw, 2.1rem);
      font-weight: 900;
      margin: 0;
      background: var(--grad-main);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .section-subtitle {
      color: var(--muted);
      font-size: 0.95rem;
      margin: 0;
    }

    /* CAROUSEL */
    .carousel-head,
    .panel-head,
    .stat-head,
    .spotlight-head {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(255,255,255,.08);
    }

    .icon-badge {
      width: 50px;
      height: 50px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      background: var(--grad-main);
      box-shadow: 0 12px 26px rgba(124,140,255,.18);
      flex: 0 0 auto;
      font-size: 1.4rem;
    }

    .card-title,
    .panel-title,
    .login-title,
    .radio-title,
    .spotlight-title {
      font-family: 'Outfit', sans-serif;
      font-weight: 900;
      margin: 0;
      color: var(--text);
    }

    .card-title { font-size: 1.4rem; }
    .panel-title { font-size: 1.1rem; }
    .login-title { font-size: 1.2rem; }
    .radio-title { font-size: 1rem; }
    .spotlight-title { font-size: 1.05rem; }

    .carousel-wrapper {
      border-radius: 22px;
      overflow: hidden;
      background: rgba(255,255,255,.03);
      border: 1px solid rgba(255,255,255,.08);
      min-height: 520px;
    }

    .carousel-item img {
      width: 100%;
      height: 100%;
      max-height: 580px;
      object-fit: contain;
      object-position: center;
    }

    .carousel-control-prev,
    .carousel-control-next {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      top: 50%;
      transform: translateY(-50%);
      margin: 0 12px;
      background: rgba(255,255,255,.10);
      opacity: .9;
    }

    .carousel-control-prev:hover,
    .carousel-control-next:hover {
      background: rgba(255,255,255,.18);
      opacity: 1;
    }

    /* SIDEBAR */
    .radio-sidebar {
      display: flex;
      flex-direction: column;
      gap: 16px;
      position: sticky;
      top: 86px;
    }

    .radio-card,
    .login-card {
      padding: 20px;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow);
      backdrop-filter: blur(18px);
      transition: all .3s ease;
    }

    .radio-card:hover,
    .login-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-hover);
    }

    .radio-header,
    .login-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-bottom: 16px;
    }

    .radio-icon,
    .login-icon,
    .mini-icon {
      width: 48px;
      height: 48px;
      border-radius: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: white;
      background: var(--grad-main);
      box-shadow: 0 10px 24px rgba(124,140,255,.20);
      font-size: 1.35rem;
    }

    .live-badge {
      margin-top: 10px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 11px;
      border-radius: 999px;
      background: linear-gradient(135deg, #ff6b6b, #ff3d8d);
      color: #fff;
      font-size: 0.68rem;
      font-weight: 900;
      letter-spacing: .8px;
      animation: pulse 2s infinite;
    }

    .live-badge::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #fff;
    }

    @keyframes pulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(255,61,141,.50); }
      50% { box-shadow: 0 0 0 10px rgba(255,61,141,0); }
    }

    .buttons-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 12px;
      margin-bottom: 12px;
    }

    .btn-chat-style {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 12px 18px;
      border-radius: 16px;
      color: white;
      border: none;
      font-weight: 800;
      font-size: 0.92rem;
      text-decoration: none;
      background: var(--grad-main);
      box-shadow: 0 12px 30px rgba(124,140,255,.20);
      transition: all .25s ease;
    }

    .btn-chat-style:hover {
      transform: translateY(-2px);
      color: white;
      box-shadow: 0 16px 34px rgba(124,140,255,.28);
    }

    .btn-chat-order {
      background: var(--grad-main);
    }

    .btn-chat-dj {
      background: linear-gradient(135deg, #2be39f 0%, #33d6c8 100%);
    }

    .btn-action {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 10px 12px;
      border-radius: 14px;
      color: white;
      font-size: 0.8rem;
      font-weight: 800;
      border: none;
      transition: all .25s ease;
      text-decoration: none;
    }

    .btn-action:hover {
      transform: translateY(-2px);
      color: white;
    }

    .btn-action-primary {
      background: var(--grad-blue);
    }

    .btn-action-success {
      background: var(--grad-green);
    }

    .player-wrapper {
      border-radius: 18px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,.08);
      background: rgba(255,255,255,.03);
      padding: 10px;
    }

    .player-wrapper .my_player {
      width: 100% !important;
      max-width: 100%;
    }

    /* FORMS */
    .form-group {
      margin-bottom: 12px;
    }

    .form-control {
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.10);
      color: var(--text);
      padding: 12px 14px;
      border-radius: 14px;
      font-size: 0.95rem;
      transition: all .25s ease;
    }

    .form-control:focus {
      background: rgba(255,255,255,.09);
      border-color: rgba(124,140,255,.40);
      box-shadow: 0 0 0 4px rgba(124,140,255,.12);
      color: #fff;
    }

    .form-control::placeholder {
      color: rgba(170,179,212,.65);
    }

    .checkbox-custom {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      color: var(--muted);
      font-size: 0.86rem;
    }

    .checkbox-custom input {
      accent-color: var(--primary);
    }

    .btn-login {
      width: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 18px;
      border-radius: 14px;
      color: white;
      background: var(--grad-main);
      border: none;
      font-weight: 800;
      box-shadow: 0 12px 28px rgba(124,140,255,.18);
      transition: all .25s ease;
    }

    .btn-login:hover {
      transform: translateY(-2px);
      color: white;
      box-shadow: 0 16px 30px rgba(124,140,255,.25);
    }

    .form-help,
    .form-footer {
      margin-top: 14px;
      text-align: center;
      font-size: 0.84rem;
      color: var(--muted);
    }

    .form-help a,
    .form-footer a {
      color: var(--accent);
      font-weight: 800;
    }

    .form-help a:hover,
    .form-footer a:hover {
      text-decoration: underline;
    }

    .auth-empty-state {
      text-align: center;
    }

    .auth-empty-name {
      font-weight: 900;
      color: white;
      font-size: 1.05rem;
      margin-bottom: 6px;
    }

    .auth-empty-note {
      color: var(--muted);
      font-size: 0.86rem;
      margin-bottom: 14px;
    }

    /* STATS */
    .stats-section {
      padding-top: 12px;
      padding-bottom: 10px;
    }

    .stats-grid {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
    }

    .stat-card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: 18px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(18px);
      transition: all .3s ease;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-hover);
    }

    .stat-head {
      margin-bottom: 14px;
    }

    .card-subtitle {
      color: var(--muted);
      font-size: 0.8rem;
      margin-top: 4px;
    }

    .online-card-body {
      display: flex;
      align-items: center;
      gap: 18px;
      justify-content: space-between;
    }

    .online-illustration {
      width: 120px;
      height: 120px;
      border-radius: 28px;
      background: linear-gradient(135deg, rgba(124,140,255,.16), rgba(255,92,168,.12), rgba(51,214,200,.12));
      border: 1px solid rgba(255,255,255,.08);
      box-shadow: 0 12px 30px rgba(0,0,0,.18);
      overflow: hidden;
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .online-illustration svg {
      width: 100%;
      height: 100%;
    }

    .online-number-block {
      flex: 1;
      min-width: 0;
    }

    .online-number-label {
      color: var(--muted);
      font-size: 0.9rem;
      margin-bottom: 8px;
    }

    .online-big-number {
      font-family: 'Outfit', sans-serif;
      font-size: clamp(2.6rem, 6vw, 4.6rem);
      font-weight: 900;
      line-height: 1;
      background: var(--grad-main);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .online-number-note {
      margin-top: 8px;
      color: var(--muted-2);
      font-size: 0.85rem;
    }

    .data-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-height: 280px;
      overflow: auto;
      padding-right: 4px;
    }

    .data-list::-webkit-scrollbar,
    .forum-list::-webkit-scrollbar,
    .content-list::-webkit-scrollbar {
      width: 6px;
    }

    .data-list::-webkit-scrollbar-thumb,
    .forum-list::-webkit-scrollbar-thumb,
    .content-list::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, var(--primary), var(--accent));
      border-radius: 20px;
    }

    .data-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      background: rgba(255,255,255,.05);
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 16px;
      padding: 10px 12px;
      transition: all .22s ease;
    }

    .data-item:hover {
      transform: translateX(4px);
      background: rgba(255,255,255,.08);
      border-color: rgba(124,140,255,.22);
    }

    .data-item-left {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }

    .data-item-right {
      white-space: nowrap;
      font-size: 0.74rem;
      color: var(--muted-2);
    }

    .data-item a {
      font-weight: 700;
      text-decoration: none;
    }

    .empty-state {
      color: var(--muted);
      text-align: center;
      padding: 16px 8px;
    }

    .empty-state i {
      display: block;
      font-size: 1.7rem;
      margin-bottom: 8px;
      opacity: .55;
    }

    /* SPOTLIGHT */
    .spotlight-section {
      padding-top: 12px;
      padding-bottom: 26px;
    }

    .spotlight-grid {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
      align-items: stretch;
    }

    /* ОБЩИЕ СТИЛИ ДЛЯ ДВУХ ОДИНАКОВЫХ КАРТОЧЕК */
    .spotlight-card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: 18px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(18px);
      transition: all .3s ease;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      min-height: 520px;
      height: 100%;
    }

    .spotlight-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-hover);
    }

    .spotlight-head {
      margin-bottom: 14px;
      flex: 0 0 auto;
    }

    .spotlight-card-subtitle {
      color: var(--muted);
      font-size: 0.8rem;
      margin-top: 4px;
    }

    /* ОДИНАКОВЫЙ СКРОЛЛ И РАЗМЕР ДЛЯ ФОРУМА И ПЕСЕН */
    .forum-list,
    .content-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      padding-right: 4px;
    }

    /* ОБЩИЕ СТИЛИ ЭЛЕМЕНТОВ СПИСКА */
    .forum-item,
    .content-item {
      background: rgba(255,255,255,.05);
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 16px;
      padding: 14px;
      margin-bottom: 0;
      transition: all .22s ease;
      min-height: 84px;
    }

    .forum-item:hover,
    .content-item:hover {
      transform: translateX(4px);
      background: rgba(255,255,255,.08);
      border-color: rgba(124,140,255,.22);
    }

    .forum-item-title,
    .content-item-title {
      font-weight: 900;
      font-size: 1rem;
      color: white;
      margin-bottom: 8px;
      line-height: 1.25;
    }

    .forum-item-title a,
    .content-item-title a {
      color: var(--primary);
    }

    .forum-item-title a:hover,
    .content-item-title a:hover {
      color: var(--accent);
    }

    .forum-item-meta,
    .content-item-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      font-size: 0.8rem;
      color: var(--muted);
      line-height: 1.4;
    }

    .forum-item-meta i,
    .content-item-meta i {
      color: var(--primary);
    }

    .forum-item-description {
      color: var(--muted);
      font-size: 0.82rem;
      margin-bottom: 8px;
      line-height: 1.45;
    }

    .song-img {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      object-fit: cover;
      margin-right: 10px;
      box-shadow: 0 6px 16px rgba(0,0,0,.22);
      flex: 0 0 auto;
    }

    .content-list .my_lastsongs {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
      min-height: 0;
    }

    .content-list .my_lastsonghtml {
      display: none;
    }

    /* FOOTER */
    footer {
      border-top: 1px solid rgba(255,255,255,.08);
      background: rgba(8, 12, 24, 0.8);
      backdrop-filter: blur(18px);
      padding: 30px 16px;
      margin-top: 18px;
      position: relative;
      z-index: 1;
    }

    .footer-content {
      max-width: 1400px;
      margin: 0 auto;
      text-align: center;
    }

    .footer-text {
      color: var(--muted);
      font-size: 0.95rem;
      margin-bottom: 14px;
    }

    .footer-divider {
      height: 1px;
      background: rgba(255,255,255,.08);
      margin: 16px 0;
    }

    .footer-bottom {
      color: var(--muted-2);
      font-size: 0.85rem;
    }

    .footer-bottom strong {
      color: #fff;
    }

    /* RESPONSIVE */
    @media (max-width: 1200px) {
      .layout-container {
        grid-template-columns: 1fr;
      }

      .radio-sidebar {
        position: static;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .spotlight-grid,
      .two-column-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .hero {
        padding: 98px 12px 20px;
      }

      .hero-inner {
        padding: 24px 16px;
        border-radius: 24px;
      }

      .hero-title {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 0.95rem;
      }

      .main-layout,
      .stats-section,
      .spotlight-section,
      .content-wrapper {
        padding-left: 12px;
        padding-right: 12px;
      }

      .card-pad {
        padding: 16px;
      }

      .carousel-wrapper {
        min-height: 320px;
      }

      .buttons-group {
        grid-template-columns: 1fr;
      }

      .online-card-body {
        flex-direction: column;
        text-align: center;
      }

      .online-illustration {
        width: 96px;
        height: 96px;
      }

      .glass-card,
      .radio-card,
      .login-card,
      .stat-card,
      .spotlight-card,
      .content-panel {
        border-radius: 20px;
      }

      .carousel-head .card-title,
      .panel-title,
      .login-title {
        font-size: 1.05rem;
      }

      .spotlight-card {
        min-height: auto;
      }
    }

    @media (max-width: 480px) {
      .navbar {
        padding: 0.7rem 0;
      }

      .nav-link {
        font-size: 0.86rem;
        padding: 0.42rem 0.7rem !important;
      }

      .hero {
        padding: 88px 10px 18px;
      }

      .hero-inner {
        padding: 18px 12px;
        border-radius: 20px;
      }

      .hero-title {
        font-size: 1.6rem;
      }

      .hero-subtitle {
        font-size: 0.9rem;
      }

      .hero-cta {
        flex-direction: column;
      }

      .btn-main,
      .btn-soft {
        width: 100%;
      }

      .carousel-wrapper {
        min-height: 240px;
      }

      .data-list,
      .forum-list,
      .content-list {
        max-height: none;
      }

      .section-title {
        font-size: 1.4rem;
      }

      .section-subtitle {
        font-size: 0.86rem;
      }

      footer {
        padding: 24px 10px;
      }

      .spotlight-card {
        min-height: auto;
      }
    }
  </style>
</head>
<body>

<div class="page-shell">

  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand ms-2" href="index.html">
        <i class="fas fa-heart"></i> С Нами
      </a>

      <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Переключить меню">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link active" href="index.html"><i class="fas fa-home"></i> Главная</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/?inc=forum"><i class="fas fa-comments"></i> Форум</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/?inc=top100"><i class="fas fa-crown"></i> Топ</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <section class="hero">
    <div class="hero-inner">
      <div class="hero-content">
        <div class="hero-badges">
          <span class="hero-badge"><i class="fas fa-comments"></i> Живое общение</span>
          <span class="hero-badge"><i class="fas fa-headphones"></i> Радио онлайн</span>
        </div>

        <h1 class="hero-title">Чат С Нами</h1>
        <p class="hero-subtitle">
          Пространство для общения, знакомств и отдыха — современный дизайн, удобный интерфейс и всё самое важное под рукой.
        </p>

        <div class="hero-cta">
          <a href="/?inc=chat" class="btn-main"><i class="fas fa-right-to-bracket"></i> Войти в чат</a>
          <a href="/?inc=reg" class="btn-soft"><i class="fas fa-user-plus"></i> Регистрация</a>
        </div>
      </div>
    </div>
  </section>

  <main>
    <section class="main-layout">
      <div class="layout-container">

        <div class="carousel-section">
          <div class="glass-card card-pad">
            <div class="carousel-head">
              <div class="icon-badge"><i class="fas fa-panorama"></i></div>
              <div>
                <h2 class="card-title">Афиша событий</h2>
                <div class="card-subtitle">Новости, баннеры и анонсы</div>
              </div>
            </div>

            <div class="carousel-wrapper">
              <div id="myCarousel" class="carousel slide w-100" data-bs-ride="carousel">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Слайд 1"></button>
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Слайд 2"></button>
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Слайд 3"></button>
                  <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="3" aria-label="Слайд 4"></button>
                </div>

                <div class="carousel-inner w-100">
                  <div class="carousel-item active" data-bs-interval="6000">
                    <img src="https://vmfile.com/upload/858/1771412392.jpg" class="d-block w-100" alt="Слайд 1" />
                  </div>
                  <div class="carousel-item" data-bs-interval="6000">
                    <img src="https://vmfile.com/upload/847/103122207.gif" class="d-block w-100" alt="Слайд 2" />
                  </div>
                  <div class="carousel-item" data-bs-interval="6000">
                    <img src="https://vmfile.com/upload/846/2886163459.gif" class="d-block w-100" alt="Слайд 3" />
                  </div>
                  <div class="carousel-item" data-bs-interval="6000">
                    <img src="https://vmfile.com/upload/858/651431279.jpg" class="d-block w-100" alt="Слайд 4" />
                  </div>
                </div>

                <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev" aria-label="Предыдущий слайд">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next" aria-label="Следующий слайд">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside class="radio-sidebar">
          <div class="radio-card">
            <div class="radio-header">
              <div class="radio-icon"><i class="fas fa-radio"></i></div>
              <h3 class="radio-title mt-2">Радио Ленин FM</h3>
            </div>

            <div class="buttons-group">
              <a href="https://snami.mpchat.com/index.php?inc=2" target="_blank" rel="noopener noreferrer" class="btn-chat-style btn-chat-order">
                <i class="fas fa-music"></i> Заказ
              </a>
              <a href="https://myradio24.com/ru/table/lenin" target="_blank" rel="noopener noreferrer" class="btn-chat-style btn-chat-dj">
                <i class="fas fa-list"></i> DJ
              </a>
            </div>

            <div class="player-wrapper">
              <div id="my_player" class="my_player"
                   data-player="energy"
                   data-skin="blue"
                   data-width="100%"
                   data-autoplay="1"
                   data-volume="70"
                   data-streamurl="https://myradio24.org/lenin"></div>
            </div>
          </div>

          <div class="login-card">
            <div class="login-header">
              <div class="login-icon"><i class="fas fa-lock"></i></div>
              <h3 class="login-title">Личный кабинет</h3>
            </div>

            <div id="auth-block"></div>

            <div class="form-footer">
              Нет аккаунта? <a href="index.php?inc=reg">Создать</a>
            </div>
          </div>
        </aside>

      </div>
    </section>

    <section class="stats-section">
      <div class="section-head">
        <div>
          <h2 class="section-title">Сейчас в чате</h2>
          <p class="section-subtitle">Данные обновляются автоматически</p>
        </div>
      </div>

      <div class="stats-grid">
        <article class="stat-card online-card">
          <div class="stat-head">
            <div class="icon-badge"><i class="fas fa-users"></i></div>
            <div>
              <h3 class="panel-title">Кто в чате</h3>
              <div class="card-subtitle">Сейчас онлайн</div>
            </div>
          </div>

          <div class="online-card-body">
            <div class="online-illustration" aria-hidden="true">
              <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Онлайн пользователи">
                <defs>
                  <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#7c8cff"/>
                    <stop offset="55%" stop-color="#ff5ca8"/>
                    <stop offset="100%" stop-color="#33d6c8"/>
                  </linearGradient>
                  <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="rgba(255,255,255,0.95)"/>
                    <stop offset="100%" stop-color="rgba(255,255,255,0.65)"/>
                  </linearGradient>
                </defs>

                <rect x="0" y="0" width="120" height="120" rx="28" fill="url(#g1)" opacity="0.22"/>
                <circle cx="39" cy="47" r="12" fill="url(#g2)"/>
                <circle cx="80" cy="42" r="10" fill="url(#g2)" opacity="0.9"/>
                <circle cx="60" cy="63" r="14" fill="url(#g2)"/>

                <path d="M22 96c2-14 14-24 28-24h20c14 0 26 10 28 24" fill="none" stroke="url(#g2)" stroke-width="8" stroke-linecap="round"/>
                <path d="M67 96c1-9 9-16 19-16h9c10 0 18 7 19 16" fill="none" stroke="url(#g2)" stroke-width="6" stroke-linecap="round" opacity="0.8"/>

                <circle cx="97" cy="24" r="6" fill="#2be39f">
                  <animate attributeName="opacity" values="1;0.35;1" dur="1.6s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>

            <div class="online-number-block">
              <div class="online-number-label">Сейчас в чате</div>
              <div id="in-chat" class="online-big-number">0</div>
              <div class="online-number-note">онлайн прямо сейчас</div>
            </div>
          </div>
        </article>

        <article class="stat-card">
          <div class="stat-head">
            <div class="icon-badge"><i class="fas fa-cake-candles"></i></div>
            <div>
              <h3 class="panel-title">Именинники</h3>
              <div class="card-subtitle">Сегодня празднуют</div>
            </div>
          </div>
          <div class="data-list" id="birthday-users">
            <div class="empty-state">Загрузка...</div>
          </div>
        </article>

        <article class="stat-card">
          <div class="stat-head">
            <div class="icon-badge"><i class="fas fa-seedling"></i></div>
            <div>
              <h3 class="panel-title">Новички</h3>
              <div class="card-subtitle">Последние зарегистрированные</div>
            </div>
          </div>
          <div class="data-list" id="new-users">
            <div class="empty-state">Загрузка...</div>
          </div>
        </article>
      </div>
    </section>

    <section class="spotlight-section">
      <div class="section-head">
        <div>
          <h2 class="section-title">Главное на главной</h2>
          <p class="section-subtitle">Форум и радио в удобном виде</p>
        </div>
      </div>

      <div class="spotlight-grid">
        <article class="spotlight-card">
          <div class="spotlight-head">
            <div class="icon-badge"><i class="fas fa-comments"></i></div>
            <div>
              <h3 class="spotlight-title">Последние темы форума</h3>
              <div class="spotlight-card-subtitle">Активные обсуждения</div>
            </div>
          </div>

          <div class="forum-list" id="forum-topics-list">
            <div class="empty-state">Загрузка...</div>
          </div>
        </article>

        <article class="spotlight-card">
          <div class="spotlight-head">
            <div class="icon-badge"><i class="fas fa-music"></i></div>
            <div>
              <h3 class="spotlight-title">В эфире</h3>
              <div class="spotlight-card-subtitle">Последние треки радио</div>
            </div>
          </div>

          <div class="content-list">
            <div class="my_lastsongs" data-revert="1">
              <div class="my_lastsonghtml" style="display:none;">
                <div class="content-item">
                  <div style="display:flex; align-items:center; width:100%;">
                    <img class="my_lastsong_cover song-img" alt="cover" />
                    <div style="flex:1; min-width:0;">
                      <div class="content-item-title">
                        <a href="https://www.youtube.com/results?search_query=%songencode%" target="_blank" rel="noopener noreferrer">%song%</a>
                      </div>
                      <div class="content-item-meta">
                        <span><i class="fas fa-clock"></i> %songtime%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  </main>

  <footer>
    <div class="footer-content">
      <p class="footer-text">Самый веселый и дружелюбный чат в интернете!</p>
      <div class="footer-divider"></div>
      <div class="footer-bottom">
        <strong>© 2025 Чат "С Нами"</strong> | Все права защищены |
        <a href="#" style="color: var(--primary); text-decoration: none;">Политика конфиденциальности</a>
      </div>
    </div>
  </footer>

</div>

<script src="https://code.jquery.com/jquery-3.1.0.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<script src="/?inc=informer&getmsg=1&inchat=1&birthday=1&lastreg=3&counter=1&lasttopics=10"></script>

<script>
  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function decodeHtmlEntities(str) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str ?? '';
    return textarea.value;
  }

  function waitFor(conditionFn, callback, attempts = 35, delay = 180) {
    let count = 0;
    const timer = setInterval(() => {
      try {
        if (conditionFn()) {
          clearInterval(timer);
          callback();
          return;
        }
      } catch (e) {}

      count++;
      if (count >= attempts) {
        clearInterval(timer);
        callback();
      }
    }, delay);
  }

  function safeArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function renderAuthBlock() {
    const authBlock = document.getElementById('auth-block');
    if (!authBlock) return;

    const isAuthorized =
      typeof mynick !== "undefined" &&
      mynick &&
      typeof myid !== "undefined" &&
      myid;

    if (isAuthorized) {
      authBlock.innerHTML = `
        <div class="auth-empty-state">
          <div class="auth-empty-name">${escapeHtml(mynick)}</div>
          <p class="auth-empty-note">Вы авторизованы</p>
          <a href="?cookie_off=1" class="btn-login">
            <i class="fas fa-sign-out-alt"></i> Выход
          </a>
        </div>
      `;
    } else {
      const hiddenAidn = (typeof i_aidn !== "undefined" && i_aidn)
        ? `<input type="hidden" name="i_aidn" value="${escapeHtml(i_aidn)}">`
        : '';

      authBlock.innerHTML = `
        <form method="post" action="index.php">
          ${hiddenAidn}
          <div class="form-group">
            <input class="form-control" name="nick" type="text" placeholder="Логин" required>
          </div>
          <div class="form-group">
            <input class="form-control" name="pass" type="password" placeholder="Пароль" required>
          </div>
          <div class="checkbox-custom">
            <input type="checkbox" name="cookie_on" id="remember">
            <label for="remember">Запомнить меня</label>
          </div>
          <button type="submit" class="btn-login"><i class="fas fa-check"></i> Вход</button>
          <div class="form-help"><a href="index.php?inc=mail">Забыли пароль?</a></div>
        </form>
      `;
    }
  }

  function renderOnlineUsers() {
    const inChatEl = document.getElementById('in-chat');
    if (!inChatEl) return;

    if (typeof i_inchat !== 'undefined') {
      inChatEl.textContent = i_inchat;
    } else {
      inChatEl.textContent = '0';
    }
  }

  function renderBirthdays() {
    const el = document.getElementById('birthday-users');
    if (!el) return;

    const items = safeArray(typeof i_birthday !== 'undefined' ? i_birthday : []);
    if (!items.length) {
      el.innerHTML = `<div class="empty-state">сегодня нет</div>`;
      return;
    }

    let html = '';
    for (let i = 0; i < items.length; i++) {
      const item = items[i] || [];
      const nick = item[0] || '?';
      const color = item[1] || '#7c8cff';
      const userId = item[4] || 0;

      html += `
        <div class="data-item">
          <div class="data-item-left">
            <i class="fas fa-gift" style="color:var(--warning);"></i>
            <a href="?inc=info&userid=${encodeURIComponent(userId)}" target="_blank" rel="noopener noreferrer" style="color:${escapeHtml(color)};">
              ${escapeHtml(nick)}
            </a>
          </div>
          <div class="data-item-right">birthday</div>
        </div>
      `;
    }

    el.innerHTML = html;
  }

  function renderNewUsers() {
    const el = document.getElementById('new-users');
    if (!el) return;

    const items = safeArray(typeof i_lastreg !== 'undefined' ? i_lastreg : []);
    if (!items.length) {
      el.innerHTML = `<div class="empty-state">нет данных</div>`;
      return;
    }

    let html = '';
    const limited = items.slice(0, 3);

    for (let i = 0; i < limited.length; i++) {
      const item = limited[i] || [];
      const nick = item[0] || '?';
      const color = item[1] || '#7c8cff';
      const userId = item[4] || 0;

      html += `
        <div class="data-item">
          <div class="data-item-left">
            <i class="fas fa-user-plus" style="color:var(--success);"></i>
            <a href="?inc=info&userid=${encodeURIComponent(userId)}" target="_blank" rel="noopener noreferrer" style="color:${escapeHtml(color)};">
              ${escapeHtml(nick)}
            </a>
          </div>
          <div class="data-item-right">new</div>
        </div>
      `;
    }

    el.innerHTML = html;
  }

  function renderForumTopics() {
    const container = document.getElementById('forum-topics-list');
    if (!container) return;

    const items = safeArray(typeof i_lasttopic !== 'undefined' ? i_lasttopic : []);
    if (!items.length) {
      container.innerHTML = `<div class="empty-state">Нет сообщений на форуме.</div>`;
      return;
    }

    let html = '';
    const limited = items.slice(0, 8);

    for (let i = 0; i < limited.length; i++) {
      const topic = limited[i] || [];
      const topicId = topic[0] || 0;
      const topicName = decodeHtmlEntities(topic[1] || 'Без названия');
      const author = topic[2] || '?';
      const description = decodeHtmlEntities(topic[3] || '');
      const lastPoster = topic[4] || '?';
      const lastPostDate = topic[5] || '';
      const replies = topic[6] || 0;
      const authorId = topic[12] || 0;
      const lastPosterId = topic[10] || 0;
      const forumId = topic[11] || 0;
      const topicLink = `?inc=forum&forum=${encodeURIComponent(forumId)}&topic=${encodeURIComponent(topicId)}`;

      html += `
        <div class="forum-item">
          <div class="forum-item-title">
            <a href="${topicLink}" target="_blank" rel="noopener noreferrer">${escapeHtml(topicName)}</a>
          </div>
          ${description ? `<div class="forum-item-description">${escapeHtml(description)}</div>` : ''}
          <div class="forum-item-meta">
            <span><i class="fas fa-user"></i> <a href="?inc=info&userid=${encodeURIComponent(authorId)}" target="_blank" rel="noopener noreferrer">${escapeHtml(author)}</a></span>
            <span><i class="fas fa-comments"></i> ${escapeHtml(replies)}</span>
            <span><i class="fas fa-clock"></i> <a href="?inc=info&userid=${encodeURIComponent(lastPosterId)}" target="_blank" rel="noopener noreferrer">${escapeHtml(lastPoster)}</a> ${escapeHtml(lastPostDate)}</span>
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderAuthBlock();

    waitFor(
      () => typeof i_inchat !== 'undefined',
      renderOnlineUsers
    );

    waitFor(
      () => typeof i_birthday !== 'undefined',
      renderBirthdays
    );

    waitFor(
      () => typeof i_lastreg !== 'undefined',
      renderNewUsers
    );

    waitFor(
      () => typeof i_lasttopic !== 'undefined',
      renderForumTopics
    );
  });
</script>

<script src="https://myradio24.org/player.js"></script>
<script src="https://myradio24.com/player/player.js?v3.31" data-radio="lenin" data-interval="15" data-vmid="0" data-lang="ru"></script>

</body>
</html>
