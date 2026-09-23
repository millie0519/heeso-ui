## popup-modal 닫기 옵션 (`-esc`, `-bg`)

X 버튼 닫기는 기본입니다. `popup-modal-01`·`02`를 `-esc`, `-bg` 옵션과 함께 요청하면 아래처럼 넣습니다.

1. 모달 wrap(`tpl-modal-wrap` 또는 `tpl-modal-wrap-02`)에 옵션 클래스를 추가합니다.
   - `-esc` → `tpl-close-esc` (ESC 키로 닫기)
   - `-bg` → `tpl-close-bg` (배경 클릭으로 닫기, 모달 박스 안쪽 클릭은 무시)
2. 모달 스크립트 아래에 옵션 스크립트를 **페이지당 한 번만** 추가합니다. 요청한 옵션 부분만 넣어도 됩니다.

```html
<div class="tpl-modal-wrap tpl-close-esc tpl-close-bg" id="modal-pop-wrap-01">
  ...
</div>

<script>
  // 배경 클릭 닫기 (.tpl-close-bg) — 모달 박스 안쪽 클릭은 무시
  document.addEventListener('click', function(e){
    var wrap = e.target.closest('.tpl-close-bg');
    if (wrap && !e.target.closest('[class*="tpl-modal-box"]')) modalHide(wrap.id);
  });
  // ESC 닫기 (.tpl-close-esc) — 열려 있는 모달만 닫기
  document.addEventListener('keydown', function(e){
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.tpl-close-esc').forEach(function(wrap){
      if (getComputedStyle(wrap).display !== 'none') modalHide(wrap.id);
    });
  });
</script>
```
