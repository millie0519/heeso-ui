(function () {
  var base = document.currentScript.src.split('/templates/')[0];
  var cssList = [
    base + '/css/reset.css',
    base + '/css/styleguide.css',
    base + '/css/common.css'
  ];
  cssList.forEach(function (href) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  });

  // ---- 미리보기 페이지 공통 동작 (스니펫 코드에는 포함되지 않음) ----
  document.addEventListener('DOMContentLoaded', function () {

    // 코드명 뱃지 클릭 → 코드명 복사
    document.querySelectorAll('.code-name').forEach(function (badge) {
      var name = badge.textContent.trim();
      badge.setAttribute('role', 'button');
      badge.setAttribute('tabindex', '0');
      badge.setAttribute('title', '클릭해서 코드명 복사');
      badge.setAttribute('aria-label', '코드명 ' + name + ' 복사');

      function copy() {
        navigator.clipboard.writeText(name).then(function () {
          badge.classList.add('is-copied');
          clearTimeout(badge._timer);
          badge._timer = setTimeout(function () { badge.classList.remove('is-copied'); }, 1500);
        });
      }
      badge.addEventListener('click', copy);
      badge.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); copy(); }
      });
    });

    // 색상 지정 : HEX 입력 검증 + Enter로 적용
    var hexInput = document.getElementById('colorHex');
    var btnApply = document.getElementById('btnApply');
    var hint     = document.querySelector('.tpl-color-hint');
    if (hexInput && btnApply) {
      var hintText = hint ? hint.textContent : '';
      function setInvalid(on) {
        hexInput.classList.toggle('is-invalid', on);
        hexInput.setAttribute('aria-invalid', on);
        if (hint) {
          hint.classList.toggle('is-invalid', on);
          hint.textContent = on ? '#과 6자리 HEX 코드로 입력하세요 (예: #4551D1)' : hintText;
        }
      }
      btnApply.addEventListener('click', function () {
        setInvalid(!/^#[0-9a-fA-F]{6}$/.test(hexInput.value));
      });
      hexInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') btnApply.click();
      });
      hexInput.addEventListener('input', function () {
        if (hexInput.classList.contains('is-invalid')) setInvalid(false);
      });
      var picker = document.getElementById('colorPicker');
      if (picker) picker.addEventListener('input', function () { setInvalid(false); });
    }
  });
})();
