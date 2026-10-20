$(function () {

  var $searchInput    = $('#searchInput');
  var $searchClear    = $('#searchClear');
  var $tabs           = $('#categoryTabs');
  var $totalCount     = $('#totalCount');
  var $frame          = $('#previewFrame');
  var $empty          = $('#previewEmpty');
  var $title          = $('#previewTitle');
  var $desc           = $('#previewDesc');
  var $list           = $('#templateList');
  var $progress       = $('#previewProgress');
  var currentCategory = 'all';

  // ---- 카테고리 칩 렌더링 ----
  var badgeLabel = { form: '폼', table: '테이블', popup: '팝업' };
  var tabOrder   = ['all', 'form', 'table', 'popup'];

  tabOrder.forEach(function (key) {
    var count = key === 'all' ? TEMPLATES.length : TEMPLATES.filter(function (t) { return t.category === key; }).length;
    var $btn  = $('<button type="button" class="category-tab"></button>')
      .attr({ 'data-category': key, 'aria-pressed': String(key === currentCategory) })
      .append(document.createTextNode(key === 'all' ? '전체' : badgeLabel[key]))
      .append($('<span class="tab-count"></span>').text(count));
    $tabs.append($btn);
  });

  // ---- 목록 렌더링 ----
  TEMPLATES.forEach(function (tpl, idx) {
    var badge = '<span class="item-badge badge-' + tpl.category + '">' + badgeLabel[tpl.category] + '</span>';
    var info  = '<span class="item-info"><strong class="item-title">' + tpl.title + '</strong><span class="item-desc">' + tpl.desc + '</span><span class="item-codes"></span></span>';
    var $btn  = $('<button type="button" class="template-item" data-preview="' + tpl.preview + '">' + badge + info + '</button>');
    if (idx === 0) $btn.attr('aria-current', 'true');
    var $row  = $('<li data-category="' + tpl.category + '"></li>').append($btn);
    $row.data({ codes: tpl.codes || [], text: (tpl.title + ' ' + tpl.desc + ' ' + (tpl.codes || []).join(' ')).toLowerCase() });
    renderCodes($row, '');
    $list.append($row);
  });

  // ---- 코드명 줄 : 기본은 첫 코드명 + 외 N개, 검색 중이면 일치하는 코드명을 강조해서 표시 ----
  function renderCodes($row, keyword) {
    var codes   = $row.data('codes');
    var el      = $row.find('.item-codes')[0];
    var matched = keyword ? codes.filter(function (c) { return c.indexOf(keyword) !== -1; }) : [];
    var shown   = matched.length ? matched : codes.slice(0, 1);
    var rest    = codes.length - shown.length;

    el.textContent = '';
    if (!codes.length) return;
    shown.forEach(function (code, i) {
      if (i) el.appendChild(document.createTextNode(', '));
      var at = keyword ? code.indexOf(keyword) : -1;
      if (at < 0) { el.appendChild(document.createTextNode(code)); return; }
      var mark = document.createElement('mark');
      mark.textContent = code.substr(at, keyword.length);
      el.appendChild(document.createTextNode(code.slice(0, at)));
      el.appendChild(mark);
      el.appendChild(document.createTextNode(code.slice(at + keyword.length)));
    });
    if (rest > 0) {
      var more = document.createElement('span');
      more.className = 'more';
      more.textContent = ' 외 ' + rest + '개';
      el.appendChild(more);
    }
  }

  var $rows     = $list.children('li');
  var $items    = $list.find('.template-item');
  var $noResult = $('<li class="no-result hide" role="status"><span><strong>검색 결과가 없습니다</strong><br>다른 검색어나 카테고리를 선택해 보세요.</span><button type="button" class="no-result-reset">필터 초기화</button></li>');
  $list.append($noResult);

  var currentSrc = $items.filter('[aria-current="true"]').data('preview') || '';
  $totalCount.text(TEMPLATES.length);

  // 초기 상태 : 첫 번째 항목 미리보기 로드
  if (currentSrc) {
    var $active = $items.filter('[aria-current="true"]');
    loadPreview(currentSrc, $active.find('.item-title').text(), $active.find('.item-desc').text());
  }

  // ---- 목록 항목 클릭 → 미리보기 로드 ----
  $list.on('click', '.template-item', function () {
    var $this = $(this);
    if ($this.attr('aria-current') === 'true') return;

    $items.removeAttr('aria-current');
    $this.attr('aria-current', 'true');

    var src   = $this.data('preview');
    var title = $this.find('.item-title').text();
    var desc  = $this.find('.item-desc').text();
    loadPreview(src, title, desc);
  });

  // ---- 미리보기 로드 함수 ----
  function loadPreview(src, title, desc) {
    currentSrc = src;
    $title.text(title);
    $desc.text(desc || '');

    if (src) {
      startLoading();
      $frame.attr('src', src).show();
      $empty.addClass('hide');
      $frame.off('load.codebtn').on('load.codebtn', function () {
        endLoading();
        var hideMeta = this.contentDocument && this.contentDocument.querySelector('meta[name="tpl-hide-code-btn"]');
        $('#btnCode').toggle(!hideMeta);
      });
    } else {
      $frame.attr('src', '').hide();
      $empty.removeClass('hide');
      $('#btnCode').show();
    }
  }

  // ---- 템플릿 전환 : 진행 바 + 미리보기 페이드 ----
  function startLoading() {
    $frame.addClass('is-loading');
    $progress.removeClass('is-done is-loading');
    $progress[0].offsetWidth; // 진행 바를 처음 위치부터 다시 시작
    $progress.addClass('is-loading');
  }

  function endLoading() {
    $frame.removeClass('is-loading');
    $progress.removeClass('is-loading').addClass('is-done');
  }

  // ---- 카테고리 필터 ----
  $tabs.on('click', '.category-tab', function () {
    currentCategory = $(this).data('category');
    $tabs.find('.category-tab').attr('aria-pressed', 'false');
    $(this).attr('aria-pressed', 'true');
    filterItems();
  });

  // ---- 검색 (실시간) ----
  $searchInput.on('input', function () {
    $searchClear.prop('hidden', !this.value);
    filterItems();
  });

  $searchInput.on('keydown', function (e) {
    if (e.key === 'Escape' && this.value) {
      $searchInput.val('').trigger('input');
    }
  });

  $searchClear.on('click', function () {
    $searchInput.val('').trigger('input').trigger('focus');
  });

  // ---- 필터 초기화 (검색 결과 없음) ----
  $list.on('click', '.no-result-reset', function () {
    $searchInput.val('');
    $searchClear.prop('hidden', true);
    $tabs.find('.category-tab[data-category="all"]').trigger('click');
    $searchInput.trigger('focus');
  });

  // ---- 필터 로직 ----
  function filterItems() {
    var count   = 0;
    var keyword = $searchInput.val().trim().toLowerCase();

    $rows.each(function () {
      var $row     = $(this);
      var matchCat = (currentCategory === 'all') || ($row.data('category') === currentCategory);
      var matchKey = !keyword || $row.data('text').indexOf(keyword) !== -1;

      $row.toggleClass('hide', !(matchCat && matchKey));
      if (matchCat && matchKey) count++;
      renderCodes($row, keyword);
    });

    $noResult.toggleClass('hide', count > 0);
    $totalCount.text(count);
  }

  // ---- 코드 보기 버튼 ----
  $('#btnCode').on('click', function () {
    if (!currentSrc) return;
    // TODO: Django 이식 시 $.get(currentSrc) → fetch('/api/template/?path=' + currentSrc) 방식으로 교체
    $.get(currentSrc, function (html) {
      var staticDoc  = new DOMParser().parseFromString(html, 'text/html');
      var style      = staticDoc.querySelector('style');
      var iframeDoc  = $frame[0].contentDocument;
      var copyWrap   = iframeDoc ? iframeDoc.querySelector('.copy-wrap') : staticDoc.querySelector('.copy-wrap');
      // 스크립트가 채우는 영역(data-snippet-empty)은 비운 상태로 복사 (붙여 넣은 뒤 스크립트가 다시 채움)
      if (copyWrap) {
        copyWrap = copyWrap.cloneNode(true);
        copyWrap.querySelectorAll('[data-snippet-empty]').forEach(function (el) {
          el.innerHTML = '';
          el.removeAttribute('data-snippet-empty');
        });
      }
      var code = '';
      if (style) code += style.outerHTML + '\n\n';
      code += copyWrap ? copyWrap.innerHTML.trim() : html;
      // 미리보기 전용 코드(@snippet-exclude-start ~ end)는 복사 코드에서 제외
      code = code.replace(/^[^\n]*@snippet-exclude-start[\s\S]*?@snippet-exclude-end[^\n]*\n?/gm, '');
      $('#codeModalTitle').text(currentSrc);
      $('#codeModalContent').text(code);
      openCodeModal();
    });
  });

  // ---- 코드 복사 버튼 ----
  $('#btnCopy').on('click', function () {
    var code = $('#codeModalContent').text();
    navigator.clipboard.writeText(code).then(function () {
      $('#btnCopy').text('복사됨!').addClass('copied');
    }, function () {
      $('#btnCopy').text('복사 실패').addClass('copied');
    }).then(function () {
      setTimeout(function () {
        $('#btnCopy').text('코드 복사').removeClass('copied');
      }, 2000);
    });
  });

  // ---- 코드 모달 열기/닫기 ----
  var lastFocus = null;

  function openCodeModal() {
    lastFocus = document.activeElement;
    $('#codeModal').addClass('show');
    $('#btnCopy').trigger('focus');
  }

  function closeCodeModal() {
    $('#codeModal').removeClass('show');
    if (lastFocus) lastFocus.focus();
  }

  $('#codeModalClose').on('click', closeCodeModal);

  $('#codeModal').on('click', function (e) {
    if (e.target === this) closeCodeModal();
  });

  $(document).on('keydown', function (e) {
    if (!$('#codeModal').hasClass('show')) return;
    if (e.key === 'Escape') {
      closeCodeModal();
    } else if (e.key === 'Tab') {
      // 모달 안에서만 포커스 이동
      var $focusable = $('#codeModal').find('button, [tabindex="0"]');
      var first = $focusable[0];
      var last  = $focusable[$focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  });

  // ---- AI 사용 안내 모달 (#guide) ----
  var $guide        = $('#guideModal');
  var DOC_URL       = 'snippets/ui-templates.md';
  var docText       = null;   // 문서 전체 (전체 복사용, 처음 열 때 한 번 불러옴)
  var guideReturnTo = null;

  function loadDoc() {
    if (docText !== null) return;
    fetch(DOC_URL).then(function (res) {
      if (!res.ok) throw new Error(res.status);
      return res.text();
    }).then(function (text) {
      docText = text;
      // 문서 머리말의 "업데이트: YYYY-MM-DD · 스니펫 N개"를 그대로 표시
      var meta = text.match(/업데이트: (\d{4}-\d{2}-\d{2}) · 스니펫 (\d+)개/);
      var size = '약 ' + Math.round(text.length / 1000) / 10 + '만 자';
      $('#guideMeta').text(meta
        ? '문서 업데이트 ' + meta[1].replace(/-/g, '.') + ' · 스니펫 ' + meta[2] + '개 · ' + size
        : size);
    }).catch(function () {
      docText = null;
      $('#guideMeta').text('문서 정보를 불러오지 못했어요. 원문 보기에서 확인해 주세요.');
    });
  }

  function openGuide() {
    if ($guide.hasClass('show')) return;
    guideReturnTo = document.activeElement;
    $guide.addClass('show');
    loadDoc();
    $guide.find('.guide-tab[aria-selected="true"]').trigger('focus');
    if (location.hash !== '#guide') history.replaceState(null, '', '#guide');
  }

  function closeGuide() {
    if (!$guide.hasClass('show')) return;
    $guide.removeClass('show');
    if (location.hash === '#guide') history.replaceState(null, '', location.pathname + location.search);
    // 주소(#guide)로 바로 연 경우처럼 돌아갈 곳이 없으면 헤더의 안내 버튼으로
    var back = guideReturnTo && guideReturnTo !== document.body && document.body.contains(guideReturnTo);
    (back ? guideReturnTo : document.getElementById('btnGuide')).focus();
  }

  $('#btnGuide').on('click', openGuide);
  $('#guideClose').on('click', closeGuide);
  $guide.on('click', function (e) {
    if (e.target === this) closeGuide();
  });
  if (location.hash === '#guide') openGuide();
  $(window).on('hashchange', function () {
    if (location.hash === '#guide') openGuide();
  });

  // 탭 전환 (좌우 방향키로도 이동)
  var $guideTabs = $guide.find('.guide-tab');

  function selectGuideTab($tab) {
    $guideTabs.attr({ 'aria-selected': 'false', tabindex: '-1' });
    $tab.attr({ 'aria-selected': 'true', tabindex: '0' }).trigger('focus');
    $guide.find('.guide-panel').prop('hidden', true);
    $('#' + $tab.attr('aria-controls')).prop('hidden', false);
    $guide.find('.guide-body').scrollTop(0);
  }

  $guideTabs.on('click', function () { selectGuideTab($(this)); });
  $guideTabs.on('keydown', function (e) {
    var idx = $guideTabs.index(this);
    if (e.key === 'ArrowRight') selectGuideTab($guideTabs.eq((idx + 1) % $guideTabs.length));
    else if (e.key === 'ArrowLeft') selectGuideTab($guideTabs.eq((idx - 1 + $guideTabs.length) % $guideTabs.length));
    else return;
    e.preventDefault();
  });

  // 설치 명령 운영체제 선택 (Windows면 처음부터 PowerShell)
  function selectOs(os) {
    $guide.find('.guide-os-btn').each(function () {
      $(this).attr('aria-pressed', String($(this).data('os') === os));
    });
    $guide.find('.guide-cmd').each(function () {
      $(this).prop('hidden', $(this).data('os-cmd') !== os);
    });
  }

  $guide.find('.guide-os-btn').on('click', function () { selectOs($(this).data('os')); });
  if (/Win/i.test(navigator.userAgent)) selectOs('win');

  // 복사 버튼 : 설치 명령 / 문서 전체
  function flashCopied($btn, ok) {
    var $label = $btn.find('.guide-action-label');
    var $target = $label.length ? $label : $btn;
    var original = $btn.data('label') || $target.text();
    $btn.data('label', original);
    $target.text(ok ? '복사됨!' : '복사 실패');
    $btn.addClass('copied');
    clearTimeout($btn.data('timer'));
    $btn.data('timer', setTimeout(function () {
      $target.text(original);
      $btn.removeClass('copied');
    }, 2000));
  }

  $guide.on('click', '[data-copy]', function () {
    var $btn = $(this);
    var text = $btn.data('copy') === 'doc' ? docText : $btn.siblings('pre').text();
    if (!text) { flashCopied($btn, false); return; }
    navigator.clipboard.writeText(text).then(
      function () { flashCopied($btn, true); },
      function () { flashCopied($btn, false); }
    );
  });

  // ESC 닫기 + 모달 안에서만 Tab 이동
  $(document).on('keydown', function (e) {
    if (!$guide.hasClass('show')) return;
    if (e.key === 'Escape') {
      closeGuide();
    } else if (e.key === 'Tab') {
      var $focusable = $guide.find('button, a[href], [tabindex="0"]').filter(':visible').not('[tabindex="-1"]');
      var first = $focusable[0];
      var last  = $focusable[$focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  });

  // ---- 새 탭에서 열기 버튼 ----
  $('#btnOpen').on('click', function () {
    if (!currentSrc) return;
    window.open(currentSrc, '_blank');
  });

});
