$(function () {

  var $searchInput    = $('#searchInput');
  var $categorySelect = $('#categorySelect');
  var $totalCount     = $('#totalCount');
  var $frame          = $('#previewFrame');
  var $empty          = $('#previewEmpty');
  var $title          = $('#previewTitle');
  var $desc           = $('#previewDesc');
  var $list           = $('#templateList');

  // ---- 목록 렌더링 ----
  var badgeLabel = { form: '폼', table: '테이블', popup: '팝업' };

  TEMPLATES.forEach(function (tpl, idx) {
    var badge = '<span class="item-badge badge-' + tpl.category + '">' + badgeLabel[tpl.category] + '</span>';
    var info  = '<div class="item-info"><strong class="item-title">' + tpl.title + '</strong><p class="item-desc">' + tpl.desc + '</p></div>';
    var $li   = $('<li class="template-item" data-category="' + tpl.category + '" data-preview="' + tpl.preview + '">' + badge + info + '</li>');
    if (idx === 0) $li.addClass('active');
    $list.append($li);
  });

  var $items     = $list.find('.template-item');
  var currentSrc = $items.filter('.active').data('preview') || '';
  $totalCount.text(TEMPLATES.length);

  // 초기 상태 : 첫 번째 항목 미리보기 로드
  if (currentSrc) {
    var $active = $items.filter('.active');
    loadPreview(currentSrc, $active.find('.item-title').text(), $active.find('.item-desc').text());
  }

  // ---- 목록 항목 클릭 → 미리보기 로드 ----
  $('#templateList').on('click', '.template-item', function () {
    var $this = $(this);
    if ($this.hasClass('active')) return;

    $items.removeClass('active');
    $this.addClass('active');

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
      $frame.attr('src', src).show();
      $empty.addClass('hide');
      $frame.off('load.codebtn').on('load.codebtn', function () {
        var hideMeta = this.contentDocument && this.contentDocument.querySelector('meta[name="tpl-hide-code-btn"]');
        $('#btnCode').toggle(!hideMeta);
      });
    } else {
      $frame.attr('src', '').hide();
      $empty.removeClass('hide');
      $('#btnCode').show();
    }
  }

  // ---- 카테고리 필터 ----
  $categorySelect.on('change', function () {
    filterItems($(this).val(), $searchInput.val().trim());
  });

  // ---- 검색 (실시간) ----
  $searchInput.on('input', function () {
    filterItems($categorySelect.val(), $(this).val().trim());
  });

  // ---- 필터 로직 ----
  function filterItems(category, keyword) {
    var count = 0;
    keyword = keyword.toLowerCase();

    $items.each(function () {
      var $item = $(this);
      var itemCategory = $item.data('category');
      var itemText     = $item.text().toLowerCase();

      var matchCat = (category === 'all') || (itemCategory === category);
      var matchKey = !keyword || itemText.indexOf(keyword) !== -1;

      if (matchCat && matchKey) {
        $item.removeClass('hide');
        count++;
      } else {
        $item.addClass('hide');
      }
    });

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
      var code = '';
      if (style) code += style.outerHTML + '\n\n';
      code += copyWrap ? copyWrap.innerHTML.trim() : html;
      $('#codeModalTitle').text(currentSrc);
      $('#codeModalContent').text(code);
      $('#codeModal').addClass('show');
    });
  });

  // ---- 코드 복사 버튼 ----
  $('#btnCopy').on('click', function () {
    var code = $('#codeModalContent').text();
    navigator.clipboard.writeText(code).then(function () {
      $('#btnCopy').text('복사됨!').addClass('copied');
      setTimeout(function () {
        $('#btnCopy').text('코드 복사').removeClass('copied');
      }, 2000);
    });
  });

  // ---- 코드 모달 닫기 ----
  $('#codeModalClose').on('click', function () {
    $('#codeModal').removeClass('show');
  });

  $('#codeModal').on('click', function (e) {
    if (e.target === this) $(this).removeClass('show');
  });

  // ---- 새 탭에서 열기 버튼 ----
  $('#btnOpen').on('click', function () {
    if (!currentSrc) return;
    window.open(currentSrc, '_blank');
  });

});
