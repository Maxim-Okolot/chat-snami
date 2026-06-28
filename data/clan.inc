<!DOCTYPE html>
<html lang="ru">
<head>
  <script src="/assets/js/site-theme-boot.js"></script>
  <meta charset="utf-8">
  <title>%title%</title>
  <meta name="description" content="%description%">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#4a90e2">
  <meta name="color-scheme" content="light dark">
  <link rel="icon" href="/assets/img/favicon.ico" type="image/x-icon">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/clan.css">
  <link rel="stylesheet" href="/assets/css/site-theme.css">
</head>
<body class="clan-body">
  <div class="clan-brand">
    <a href="index.php">Чат «С нами»</a>
  </div>
  <div class="clan-shell">
    <h1 class="clan-title">Сообщества участников</h1>
  </div>
  <script>
  (function () {
    function stripQuotes(text) {
      return String(text || '').replace(/^["«]|["»]$/g, '').trim();
    }

    function isListTable(table) {
      return !!table.querySelector('a[href*="sort="]');
    }

    function markNavLinks(shell) {
      shell.querySelectorAll('a[href*="inc=clan"]').forEach(function (link) {
        var href = link.getAttribute('href') || '';
        if (/inc=clan(?:&|$)/.test(href) && !/[?&]clan=/.test(href)) {
          link.classList.add('clan-nav-link');
        }
      });
    }

    function wrapSummary(shell) {
      var listTable = shell.querySelector('.clan-list-table');
      if (!listTable) return;

      var wrap = document.createElement('p');
      wrap.className = 'clan-summary';
      var node = listTable.nextSibling;
      var moved = false;

      while (node) {
        var next = node.nextSibling;
        if (node.nodeType === 1 && node.tagName === 'TABLE') break;
        if (node.nodeType === 3 && !node.textContent.trim()) {
          node.remove();
          node = next;
          continue;
        }
        if (node.nodeType === 1 && node.tagName === 'BR' && !moved) {
          node.remove();
          node = next;
          continue;
        }
        wrap.appendChild(node);
        moved = true;
        node = next;
      }

      if (moved && /Всего найдено:/i.test(wrap.textContent)) {
        shell.appendChild(wrap);
      } else if (wrap.parentNode) {
        wrap.remove();
      }
    }

    function buildHero(shell, detailTable) {
      var icon = null;
      var titleEl = null;
      var banner = null;
      var before = [];

      Array.from(shell.children).forEach(function (node) {
        if (node === detailTable) return;
        if (node.classList && (
          node.classList.contains('clan-title') ||
          node.classList.contains('clan-status') ||
          node.classList.contains('clan-nav-link') ||
          node.classList.contains('clan-hero') ||
          node.classList.contains('clan-summary')
        )) return;

        if (node.tagName === 'IMG') {
          if (/\.gif(\?|$)/i.test(node.src)) icon = node;
          else if (/\.jpe?g(\?|$)/i.test(node.src)) banner = node;
          else before.push(node);
        } else if (node.tagName === 'B') {
          titleEl = node;
        } else if (node.tagName === 'BR') {
          node.remove();
        } else if (node.tagName === 'A' && node.classList.contains('clan-nav-link')) {
          return;
        } else if (node.tagName !== 'TABLE') {
          before.push(node);
        }
      });

      if (!icon && !titleEl && !banner) return;

      var hero = document.createElement('div');
      hero.className = 'clan-hero';

      var head = document.createElement('div');
      head.className = 'clan-hero__head';
      if (icon) {
        icon.classList.add('clan-hero__icon');
        head.appendChild(icon);
      }
      if (titleEl) {
        var heading = document.createElement('h2');
        heading.className = 'clan-hero__title';
        heading.textContent = stripQuotes(titleEl.textContent);
        head.appendChild(heading);
        titleEl.remove();
      }
      if (head.childNodes.length) hero.appendChild(head);

      if (banner) {
        banner.classList.add('clan-hero__banner');
        hero.appendChild(banner);
      }

      before.forEach(function (node) {
        if (node.parentNode) node.remove();
      });

      shell.insertBefore(hero, detailTable);

      var pageTitle = shell.querySelector('.clan-title');
      if (pageTitle) pageTitle.classList.add('clan-title--hidden');
    }

    function enhanceDetailTable(table) {
      table.classList.add('clan-detail-table');
      table.querySelectorAll('tr').forEach(function (row) {
        var first = row.cells && row.cells[0];
        if (!first) return;
        var label = first.textContent.trim();
        if (/^Люди/i.test(label)) {
          row.classList.add('clan-detail-row--members');
          if (row.cells[1]) row.cells[1].classList.add('clan-members');
        }
        if (row.querySelector('td[colspan]')) {
          row.classList.add('clan-detail-row--about');
        }
      });
    }

    function initClanPage() {
      var shells = document.querySelectorAll('.clan-shell');
      var shell = shells.length ? shells[shells.length - 1] : document.querySelector('.clan-shell');
      if (!shell) return;

      document.querySelectorAll('body.clan-body').forEach(function (body) {
        if (body.contains(shell)) return;
        var center = body.querySelector('center');
        if (center) {
          while (center.firstChild) shell.appendChild(center.firstChild);
          center.remove();
        } else {
          Array.from(body.childNodes).forEach(function (node) {
            if (node.nodeType === 1 && node.tagName !== 'SCRIPT') {
              shell.appendChild(node);
            }
          });
        }
        body.hidden = true;
      });

      document.querySelectorAll('center').forEach(function (center) {
        if (shell.contains(center)) return;
        while (center.firstChild) shell.appendChild(center.firstChild);
        center.remove();
      });

      var status = shell.querySelector('.clan-status');
      if (status && status.textContent.trim() === '%error%') {
        status.textContent = '';
      }

      shell.querySelectorAll('table').forEach(function (table) {
        if (isListTable(table)) table.classList.add('clan-list-table');
      });

      var detailTable = Array.from(shell.querySelectorAll('table')).find(function (table) {
        return !table.classList.contains('clan-list-table');
      });

      if (detailTable) {
        shell.classList.add('clan-shell--detail');
        buildHero(shell, detailTable);
        enhanceDetailTable(detailTable);
      }

      markNavLinks(shell);
      wrapSummary(shell);

      Array.from(shell.querySelectorAll('br + br')).forEach(function (br) {
        br.remove();
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initClanPage);
    } else {
      initClanPage();
    }
  })();
  </script>
</body>
</html>
