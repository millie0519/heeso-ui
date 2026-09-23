# UI 템플릿 스니펫 (heeso-ui)

> 이 파일은 `node scripts/build-snippets.cjs`로 자동 생성됩니다. 직접 수정하지 말고 `templates/`와 `scripts/snippets.config.json`을 수정한 뒤 다시 생성하세요.
>
> 미리보기: https://millie0519.github.io/heeso-ui/

## 사용 방법

- **직접 사용**: 아래 코드명 섹션의 코드 블록을 복사해 붙여 넣습니다.
- **AI 도구(Claude Code, Cursor, Copilot 등)**: 이 파일을 프로젝트에 두거나 참조하게 한 뒤, 코드명으로 요청합니다.
  - 예) `popup-modal-01 -esc -bg 넣어줘. 폭은 600px로`
  - 예) `table-basic-01 스트라이프형으로, 컬럼은 번호/제목/작성일`

## AI 적용 규칙

코드명을 요청받으면 다음 규칙에 따라 해당 스니펫을 삽입한다.

1. 요청된 코드명의 코드 블록을 **그대로** 삽입한다. 스타일·클래스·구조는 임의로 바꾸지 않는다. 텍스트와 데이터(항목, 행, 날짜 등)는 요청에 맞게 바꿔도 된다.
2. `<style>` 블록과 HTML을 함께 넣는다. 같은 스니펫을 한 페이지에 여러 번 쓰면 `<style>`, 공통 `<script>` 함수, `@keyframes`는 한 번만 넣는다.
3. `id`(예: `modal-pop-wrap-01`, `fileInput`)는 페이지 안에서 겹치지 않게 바꾸고, 그 `id`를 참조하는 `onclick`·스크립트도 함께 바꾼다.
4. 옵션(`-esc`, `-bg`)과 변수(`--tpl-modal-w`, `--tpl-table-min`)는 각 섹션의 안내와 코드 안 주석을 따른다.
5. 코드 안의 `<!-- ... -->` 안내 주석은 그대로 둔다.

## 공통 사항

- 모든 스니펫은 단독으로 동작합니다. jQuery 등 외부 라이브러리나 별도 CSS 리셋이 필요 없습니다.
- 포인트 컬러는 CSS 변수 `--prime-color`(기본 `#007d4a`), `--prime-dark`(기본 `#006b3f`)를 사용합니다. 프로젝트에 이 변수가 있으면 그 색을 따르고, 없으면 기본색으로 표시됩니다.
  - 예) `:root { --prime-color: #2f6fed; --prime-dark: #1f56c4; }`
- 반응형은 스니펫이 놓인 영역 폭 기준(컨테이너 쿼리)으로 동작하는 템플릿이 있습니다. 각 섹션 안내를 참고하세요.

## 코드명 목록

### 폼 컴포넌트
- `form-txt-01` — 텍스트 입력
- `form-select-01` — 셀렉트 박스
- `form-area-01` — 텍스트에어리어
- `form-check-01` — 체크박스
- `form-check-02` — 체크박스 (배경 흰색 유지, 체크 시 테두리·체크 아이콘만 포인트컬러)
- `form-radio-01` — 라디오 버튼
- `form-btn-check-01` — 버튼형 체크박스
- `form-file-01` — 파일첨부

### 팝업
- `popup-confirm-01` — 확인/취소 모달 팝업 (폭 `--tpl-modal-w`, 기본 380px)
- `popup-modal-01` — 모달 팝업 기본형 (화면 중앙 고정, X 버튼 닫기, 폭 `--tpl-modal-w` 기본 450px)
- `popup-modal-02` — 모달 팝업 전체 스크롤형 (내용이 길면 배경 전체 스크롤)
  - 닫기 옵션: 코드명 뒤에 `-esc`(ESC 닫기), `-bg`(배경 클릭 닫기)를 붙여 요청 (예: `popup-modal-01 -esc -bg`). 아래 "popup-modal 닫기 옵션" 참고

### 테이블
- `table-basic-01` — 기본 목록 테이블 (기본/라인/스트라이프/소제목형, 좁으면 표 안 가로 스크롤)
- `table-basic-02` — 상세 정보 테이블 (th-td 2열, 화면에 맞춰 줄어듦)
- `table-curri-01` — 커리큘럼 표 (월-강의명-내용, 기본/라인형, 좁으면 표 안 가로 스크롤)
- `table-curri-02` — 커리큘럼 박스형 (단계별 컬러 박스, 영역 폭에 따라 박스 축소·타이틀 띠형 전환)
- `table-curri-03` — 커리큘럼 카드형 (월별 카드, 카드 수만큼 자동 칸 차지, 4칸/2칸/1칸 전환)
- `table-time-01` — 주간 시간표 (좁으면 표 안 가로 스크롤)

---

## form-txt-01 — 텍스트 입력

```html
<style>
  .form-label {display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 8px;}
  .tpl-form-txt {width: 100%; height: 44px; padding: 0 14px; border: 1px solid #dcdcdc; border-radius: 6px; font-size: 14px; font-family: inherit; color: #333; outline: none; box-sizing: border-box;}
  .tpl-form-txt:focus {border-color: #000;}
</style>
<div class="form-group">
  <label class="form-label">이름</label>
  <input type="text" class="tpl-form-txt" placeholder="이름을 입력하세요">
</div>
```

---

## form-select-01 — 셀렉트 박스

```html
<style>
  .form-label {display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 8px;}
  .tpl-form-select {width: 100%; height: 44px; padding: 0 14px; border: 1px solid #dcdcdc; border-radius: 6px; font-size: 14px; font-family: inherit; color: #333; outline: none; box-sizing: border-box; appearance: none; -webkit-appearance: none; background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right 14px center;}
  .tpl-form-select:focus {border-color: #000;}
</style>
<div class="form-group">
  <label class="form-label">과목</label>
  <select class="tpl-form-select">
    <option value="">선택하세요</option>
    <option>교육학</option>
    <option>유아</option>
    <option>중등</option>
  </select>
</div>
```

---

## form-area-01 — 텍스트에어리어

```html
<style>
  .form-label {display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 8px;}
  .tpl-form-area {width: 100%; height: 100px; padding: 12px 14px; border: 1px solid #dcdcdc; border-radius: 6px; font-size: 14px; font-family: inherit; color: #333; outline: none; box-sizing: border-box; resize: vertical;}
  .tpl-form-area:focus {border-color: #000;}
</style>
<div class="form-group">
  <label class="form-label">비고</label>
  <textarea class="tpl-form-area" placeholder="내용을 입력하세요"></textarea>
</div>
```

---

## form-check-01 — 체크박스

```html
<style>
  .form-label {display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 8px;}
  .tpl-form-check-group {display: flex; flex-wrap: wrap; gap: 12px 24px;}
  .tpl-form-check-group label {display: flex; align-items: center; gap: 8px; font-size: 14px; color: #333; cursor: pointer;}
  .tpl-form-check {appearance: none; -webkit-appearance: none; margin: 0; width: 18px; height: 18px; border: 1.5px solid #dcdcdc; border-radius: 4px; background: #fff; cursor: pointer; flex-shrink: 0;}
  .tpl-form-check:checked {border-color: var(--prime-color, #007d4a); background: var(--prime-color, #007d4a) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='9' viewBox='0 0 11 9'%3E%3Cpath d='M1 4l3 3.5L10 1' stroke='%23fff' stroke-width='1.8' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat center center;}
  .tpl-form-check:focus {outline: 1px solid #000; outline-offset: 1px;}
  .tpl-form-check:disabled {border-color: #e0e0e0; background-color: #f5f5f5; cursor: default;}
  .tpl-form-check:disabled:checked {border-color: #c0c0c0; background-color: #c0c0c0; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='9' viewBox='0 0 11 9'%3E%3Cpath d='M1 4l3 3.5L10 1' stroke='%23fff' stroke-width='1.8' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");}
  .tpl-form-check-group label:has(.tpl-form-check:disabled) {color: #bbb; cursor: default;}
</style>
<div class="form-group">
  <label class="form-label">관심 과목</label>
  <div class="tpl-form-check-group">
    <label><input type="checkbox" class="tpl-form-check"> 교육학</label>
    <label><input type="checkbox" class="tpl-form-check"> 유아</label>
    <label><input type="checkbox" class="tpl-form-check" checked> 중등</label>
    <label><input type="checkbox" class="tpl-form-check"> 특수</label>
    <label><input type="checkbox" class="tpl-form-check" disabled> 비활성</label>
    <label><input type="checkbox" class="tpl-form-check" disabled checked> 비활성(선택됨)</label>
  </div>
</div>
```

---

## form-check-02 — 체크박스 (배경 흰색 유지형)

```html
<style>
  .form-label {display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 8px;}
  .tpl-form-check-group {display: flex; flex-wrap: wrap; gap: 12px 24px;}
  .tpl-form-check-group label {display: flex; align-items: center; gap: 8px; font-size: 14px; color: #333; cursor: pointer;}
  .tpl-form-check2 {appearance: none; -webkit-appearance: none; position: relative; margin: 0; width: 18px; height: 18px; border: 1.5px solid #dcdcdc; border-radius: 4px; background: #fff; cursor: pointer; flex-shrink: 0;}
  .tpl-form-check2:checked {border-color: var(--prime-color, #007d4a); background: #fff;}
  .tpl-form-check2:checked::after {content: ''; position: absolute; top: 50%; left: 50%; width: 11px; height: 9px; transform: translate(-50%, -50%); background-color: var(--prime-color, #007d4a); -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='9' viewBox='0 0 11 9'%3E%3Cpath d='M1 4l3 3.5L10 1' stroke='%23000' stroke-width='1.8' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat center / contain; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='9' viewBox='0 0 11 9'%3E%3Cpath d='M1 4l3 3.5L10 1' stroke='%23000' stroke-width='1.8' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat center / contain;}
  .tpl-form-check2:focus {outline: 1px solid #000; outline-offset: 1px;}
  .tpl-form-check2:disabled {border-color: #e0e0e0; background-color: #f5f5f5; cursor: default;}
  .tpl-form-check2:disabled:checked {border-color: #c0c0c0; background-color: #f5f5f5;}
  .tpl-form-check2:disabled:checked::after {background-color: #c0c0c0;}
  .tpl-form-check-group label:has(.tpl-form-check2:disabled) {color: #bbb; cursor: default;}
</style>
<div class="form-group">
  <label class="form-label">관심 과목</label>
  <div class="tpl-form-check-group">
    <label><input type="checkbox" class="tpl-form-check2" checked> 교육학</label>
    <label><input type="checkbox" class="tpl-form-check2"> 유아</label>
    <label><input type="checkbox" class="tpl-form-check2"> 중등</label>
    <label><input type="checkbox" class="tpl-form-check2"> 특수</label>
    <label><input type="checkbox" class="tpl-form-check2" disabled> 비활성</label>
    <label><input type="checkbox" class="tpl-form-check2" disabled checked> 비활성(선택됨)</label>
  </div>
</div>
```

---

## form-radio-01 — 라디오 버튼

```html
<style>
  .form-label {display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 8px;}
  .tpl-form-radio-group {display: flex; flex-wrap: wrap; gap: 12px 24px;}
  .tpl-form-radio-group label {display: flex; align-items: center; gap: 8px; font-size: 14px; color: #333; cursor: pointer;}
  .tpl-form-radio {appearance: none; -webkit-appearance: none; margin: 0; width: 18px; height: 18px; border: 1.5px solid #dcdcdc; border-radius: 50%; background: #fff; cursor: pointer; flex-shrink: 0;}
  .tpl-form-radio:checked {border-color: var(--prime-color, #007d4a); background: radial-gradient(circle, var(--prime-color, #007d4a) 43%, #fff 47%);}
  .tpl-form-radio:focus {outline: 1px solid #000; outline-offset: 1px;}
  .tpl-form-radio:disabled {border-color: #e0e0e0; background-color: #f5f5f5; cursor: default;}
  .tpl-form-radio:disabled:checked {border-color: #c0c0c0; background: radial-gradient(circle, #c0c0c0 43%, #f5f5f5 47%);}
  .tpl-form-radio-group label:has(.tpl-form-radio:disabled) {color: #bbb; cursor: default;}
</style>
<div class="form-group">
  <label class="form-label">수강 유형</label>
  <div class="tpl-form-radio-group">
    <label><input type="radio" class="tpl-form-radio" name="courseType" checked> 온라인</label>
    <label><input type="radio" class="tpl-form-radio" name="courseType"> 오프라인</label>
    <label><input type="radio" class="tpl-form-radio" name="courseType"> 혼합형</label>
    <label><input type="radio" class="tpl-form-radio" name="courseType" disabled> 비활성</label>
    <label><input type="radio" class="tpl-form-radio" name="courseType2" disabled checked> 비활성(선택됨)</label>
  </div>
</div>
```

---

## form-btn-check-01 — 버튼형 체크박스

```html
<style>
  .form-label {display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 8px;}
  .tpl-form-btn-check-group {display: flex; flex-wrap: wrap; gap: 8px;}
  .tpl-form-btn-check {display: inline-flex; align-items: center; height: 36px; padding: 0 18px; border: 1.5px solid #dcdcdc; border-radius: 20px; font-size: 14px; font-family: inherit; color: #555; background: #fff; cursor: pointer; user-select: none;}
  .tpl-form-btn-check input[type="checkbox"] {display: none;}
  .tpl-form-btn-check:has(input:checked) {border-color: var(--prime-color, #007d4a); color: #fff; background: var(--prime-color, #007d4a); font-weight: 600;}
  .tpl-form-btn-check:has(input:disabled) {border-color: #e0e0e0; color: #bbb; background: #f5f5f5; cursor: default;}
  .tpl-form-btn-check:has(input:disabled:checked) {border-color: #c8c8c8; color: #fff; background: #c8c8c8;}
</style>
<div class="form-group">
  <label class="form-label">관심 과목</label>
  <div class="tpl-form-btn-check-group">
    <label class="tpl-form-btn-check"><input type="checkbox"> 교육학</label>
    <label class="tpl-form-btn-check"><input type="checkbox"> 유아</label>
    <label class="tpl-form-btn-check"><input type="checkbox" checked> 중등</label>
    <label class="tpl-form-btn-check"><input type="checkbox"> 특수</label>
    <label class="tpl-form-btn-check"><input type="checkbox" disabled> 비활성</label>
    <label class="tpl-form-btn-check"><input type="checkbox" disabled checked> 비활성(선택됨)</label>
  </div>
</div>
```

---

## form-file-01 — 파일첨부

```html
<style>
  .form-label {display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 8px;}
  .tpl-form-file-wrap {display: flex; align-items: center; border-radius: 6px;}
  .tpl-form-file-name {flex: 1; height: 44px; line-height: 42px; padding: 0 14px; border: 1px solid #dcdcdc; border-radius: 6px 0 0 6px; font-size: 14px; font-family: inherit; color: #999; background: #fff; box-sizing: border-box; pointer-events: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
  .tpl-form-file-name.has-file {color: #333;}
  .tpl-form-file-btn {flex-shrink: 0; width: 120px; height: 44px; padding: 0 18px; border: none; border-radius: 0 6px 6px 0; font-size: 14px; font-family: inherit; font-weight: 600; color: #fff; background: var(--prime-color, #007d4a); cursor: pointer; white-space: nowrap;}
  .tpl-form-file-btn:hover {background: var(--prime-dark, #006b3f);}
  .tpl-form-file-input {display: none;}
</style>
<div class="form-group">
  <label class="form-label">첨부파일</label>
  <div class="tpl-form-file-wrap">
    <span class="tpl-form-file-name" id="fileName">파일을 선택하세요</span>
    <button type="button" class="tpl-form-file-btn" onclick="document.getElementById('fileInput').click()">파일 선택</button>
    <input type="file" class="tpl-form-file-input" id="fileInput" onchange="var n=this.files[0]?this.files[0].name:'파일을 선택하세요';var el=document.getElementById('fileName');el.textContent=n;el.classList.toggle('has-file',!!this.files[0]);">
  </div>
</div>
```

---

## popup-confirm-01 — 확인/취소 모달 팝업

> `tpl-modal-confirm-bg`는 미리보기용 반투명 배경입니다. 실제 팝업 레이어가 따로 있으면 `tpl-modal-confirm`부터 사용합니다.
>
> 폭은 `tpl-modal-confirm` 태그에 `style="--tpl-modal-w: 420px"`처럼 지정합니다. (기본 380px)

```html
<style>
  .tpl-modal-confirm-bg {display: flex; align-items: center; justify-content: center; min-height: calc(100vh - 100px); padding: 0 16px; background: rgba(0,0,0,0.3); box-sizing: border-box;}
  .tpl-modal-confirm {background: #fff; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.15); width: 100%; max-width: var(--tpl-modal-w, 380px); overflow: hidden;}
  .tpl-modal-confirm-header {padding: 20px 24px 0; font-size: 16px; font-weight: 700;}
  .tpl-modal-confirm-body {padding: 16px 24px; font-size: 13px; color: #666; line-height: 1.6;}
  .tpl-modal-confirm-footer {padding: 16px 24px; display: flex; gap: 8px; justify-content: flex-end; border-top: 1px solid #f0f0f0;}
  .tpl-modal-confirm-btn {padding: 9px 20px; border: none; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit;}
  .tpl-modal-confirm-btn-primary {background: var(--prime-color, #007d4a); color: #fff;}
  .tpl-modal-confirm-btn-secondary {background: #e0e0e0; color: #555;}
</style>
<div class="tpl-modal-confirm-bg">
  <!-- 팝업 폭 변경: 아래 태그에 style="--tpl-modal-w: 420px" 추가 (기본 380px) -->
  <div class="tpl-modal-confirm">
    <div class="tpl-modal-confirm-header">삭제 확인</div>
    <div class="tpl-modal-confirm-body">선택한 항목을 삭제하시겠습니까?<br>삭제된 데이터는 복구할 수 없습니다.</div>
    <div class="tpl-modal-confirm-footer">
      <button class="tpl-modal-confirm-btn tpl-modal-confirm-btn-secondary">취소</button>
      <button class="tpl-modal-confirm-btn tpl-modal-confirm-btn-primary">확인</button>
    </div>
  </div>
</div>
```

---

## popup-modal-01 — 모달 팝업 (기본형)

> `modalShow(id)`로 열고 `modalHide(id)`로 닫습니다.
>
> 폭은 wrap 태그에 `style="--tpl-modal-w: 600px"`처럼 지정합니다. (기본 450px) ESC·배경 클릭 닫기는 아래 "popup-modal 닫기 옵션" 참고.

```html
<style>
  .tpl-modal-wrap{display: none; position: fixed; top: 0; left: 0; bottom: 0; right: 0; background-color: rgba(0,0,0,.7); z-index: 999;}
  .tpl-modal-wrap .tpl-modal-container{display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; padding: 0 16px; box-sizing: border-box;}
  .tpl-modal-wrap .tpl-modal-box{display: none; position: relative; width: 100%; max-width: var(--tpl-modal-w, 450px); padding: 52px 40px 40px; color: #000; background-color: #fff; border-radius: 20px; box-sizing: border-box;}
  .tpl-modal-wrap .tpl-modal-box.is-open{animation: tplModalSlideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;}
  @media (max-width: 480px){.tpl-modal-wrap .tpl-modal-box{padding: 52px 24px 28px;}}
  .tpl-modal-wrap .tpl-modal-box p{margin: 0;}
  .tpl-modal-wrap .tpl-modal-box .tpl-btn-x{display: block; text-decoration: none; position: absolute; top: 20px; right: 20px; width: 25px; height: 25px; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath d='M1 1l14 14M15 1L1 15' stroke='%23333' stroke-width='1.6' stroke-linecap='round'/%3E%3C/svg%3E") center no-repeat;}
  @keyframes tplModalSlideUp{from{opacity:0; transform:translateY(60px);}to{opacity:1; transform:translateY(0);}}
  .tpl-modal-open-btn{padding: 9px 20px; border: none; border-radius: 6px; font-size: 13px; font-weight: 600; font-family: inherit; color: #fff; background: var(--prime-color, #007d4a); cursor: pointer;}
  .tpl-modal-open-btn:hover{background: var(--prime-dark, #006b3f);}
</style>
<button type="button" onclick="modalShow('modal-pop-wrap-01')" class="tpl-modal-open-btn">모달 열기</button>

<!-- 팝업 폭 변경: 아래 태그에 style="--tpl-modal-w: 600px" 추가 (기본 450px) -->
<div class="tpl-modal-wrap" id="modal-pop-wrap-01">
  <div class="tpl-modal-container">
    <div class="tpl-modal-box">
      <a href="javascript:;" onclick="modalHide('modal-pop-wrap-01')" class="tpl-btn-x" aria-label="팝업 닫기"></a>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin turpis vitae condimentum molestie. Morbi imperdiet bibendum eros, ac consectetur elit elementum non. Phasellus dictum, arcu non pellentesque ultrices, neque lorem lacinia enim, at mattis enim sapien in dolor. Nullam efficitur pharetra vulputate. Curabitur rhoncus, orci vel lacinia malesuada, lorem leo gravida magna, vitae porttitor diam justo nec arcu. Nunc turpis purus, tempus sed tempor vel, sagittis quis ipsum. Duis nec urna augue.
      </p>
    </div>
  </div>
</div>

<script>
  function modalShow(wrapId){
    var wrap = document.getElementById(wrapId);
    var box  = wrap.querySelector('[class*="tpl-modal-box"]');
    wrap.style.display = 'block';
    box.style.display  = 'block';
    box.classList.add('is-open');
  }
  function modalHide(wrapId){
    var wrap = document.getElementById(wrapId);
    var box  = wrap.querySelector('[class*="tpl-modal-box"]');
    wrap.style.display = 'none';
    box.style.display  = 'none';
    box.classList.remove('is-open');
  }
</script>
```

---

## popup-modal-02 — 모달 팝업 (전체 스크롤형)

> 내용이 화면보다 길면 배경 전체가 스크롤됩니다. `popup-modal-01`과 같은 페이지에 넣을 때는 `<script>`와 `@keyframes`를 한 번만 넣습니다.

```html
<style>
  .tpl-modal-wrap-02{display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,.7); z-index: 999; overflow-y: auto;}
  .tpl-modal-wrap-02 .tpl-modal-container-02{display: flex; justify-content: center; min-height: 100%; padding: 60px 16px; box-sizing: border-box;}
  .tpl-modal-wrap-02 .tpl-modal-box-02{display: none; position: relative; width: 100%; max-width: var(--tpl-modal-w, 450px); height: fit-content; padding: 52px 40px 40px; color: #000; background-color: #fff; border-radius: 20px; box-sizing: border-box;}
  .tpl-modal-wrap-02 .tpl-modal-box-02.is-open{animation: tplModalSlideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;}
  @media (max-width: 480px){.tpl-modal-wrap-02 .tpl-modal-box-02{padding: 52px 24px 28px;}}
  .tpl-modal-wrap-02 .tpl-modal-box-02 p{margin: 0;}
  .tpl-modal-wrap-02 .tpl-modal-box-02 .tpl-btn-x{display: block; text-decoration: none; position: absolute; top: 20px; right: 20px; width: 25px; height: 25px; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath d='M1 1l14 14M15 1L1 15' stroke='%23333' stroke-width='1.6' stroke-linecap='round'/%3E%3C/svg%3E") center no-repeat;}
  @keyframes tplModalSlideUp{from{opacity:0; transform:translateY(60px);}to{opacity:1; transform:translateY(0);}}
  .tpl-modal-open-btn{padding: 9px 20px; border: none; border-radius: 6px; font-size: 13px; font-weight: 600; font-family: inherit; color: #fff; background: var(--prime-color, #007d4a); cursor: pointer;}
  .tpl-modal-open-btn:hover{background: var(--prime-dark, #006b3f);}
</style>
<button type="button" onclick="modalShow('modal-pop-wrap-02')" class="tpl-modal-open-btn">모달 열기</button>

<!-- 팝업 폭 변경: 아래 태그에 style="--tpl-modal-w: 600px" 추가 (기본 450px) -->
<div class="tpl-modal-wrap-02" id="modal-pop-wrap-02">
  <div class="tpl-modal-container-02">
    <div class="tpl-modal-box-02">
      <a href="javascript:;" onclick="modalHide('modal-pop-wrap-02')" class="tpl-btn-x" aria-label="팝업 닫기"></a>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin turpis vitae condimentum molestie. Morbi imperdiet bibendum eros, ac consectetur elit elementum non. Phasellus dictum, arcu non pellentesque ultrices, neque lorem lacinia enim, at mattis enim sapien in dolor. Nullam efficitur pharetra vulputate. Curabitur rhoncus, orci vel lacinia malesuada, lorem leo gravida magna, vitae porttitor diam justo nec arcu. Nunc turpis purus, tempus sed tempor vel, sagittis quis ipsum. Duis nec urna augue.
      </p>
      <br>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
      </p>
      <br>
      <p>
        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.
      </p>
      <br>
      <p>
        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.
      </p>
    </div>
  </div>
</div>

<script>
  function modalShow(wrapId){
    var wrap = document.getElementById(wrapId);
    var box  = wrap.querySelector('[class*="tpl-modal-box"]');
    wrap.style.display = 'block';
    box.style.display  = 'block';
    box.classList.add('is-open');
  }
  function modalHide(wrapId){
    var wrap = document.getElementById(wrapId);
    var box  = wrap.querySelector('[class*="tpl-modal-box"]');
    wrap.style.display = 'none';
    box.style.display  = 'none';
    box.classList.remove('is-open');
  }
</script>
```

---

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

---

## table-basic-01 — 기본 목록 테이블

> 스타일 변형: `<table>`에 `is-line`(라인형), `is-stripe`(스트라이프형), `is-subhead`(소제목형) 클래스를 추가합니다.
>
> 최소 폭은 `--tpl-table-min`(기본 640px)이며, 화면이 더 좁으면 표 영역 안에서 가로 스크롤됩니다.

```html
<style>
  .tpl-table-scroll {overflow-x: auto;}
  .tpl-basictable-01 {width: 100%; min-width: var(--tpl-table-min, 640px); border-collapse: collapse; border-spacing: 0;}
  .tpl-basictable-01 thead th {background-color: #FAFAFA; color: #333; font-size: 16px; font-weight: 600; text-align: center; padding: 14px 20px; border-top: 2px solid #333; border-bottom: 1px solid #ddd;}
  .tpl-basictable-01 tbody td,
  .tpl-basictable-01 tbody th {font-size: 15px; color: #333; text-align: center; font-weight: normal; padding: 14px 20px; border-bottom: 1px solid #ddd;}
  .tpl-basictable-01 tbody td.txt {text-align: left;}
  /* 라인형 */
  .tpl-basictable-01.is-line thead th {border-left: 1px solid #ddd;}
  .tpl-basictable-01.is-line thead th:first-child {border-left: none;}
  .tpl-basictable-01.is-line tbody th,
  .tpl-basictable-01.is-line tbody td {border-top: 1px solid #ddd; border-left: 1px solid #ddd;}
  .tpl-basictable-01.is-line tbody th:first-child,
  .tpl-basictable-01.is-line tbody td:first-child {border-left: none;}
  /* 스트라이프형 */
  .tpl-basictable-01.is-stripe thead th {background-color: #222; color: #fff; border-bottom: 1px solid #222;}
  .tpl-basictable-01.is-stripe tbody tr:nth-child(even) td,
  .tpl-basictable-01.is-stripe tbody tr:nth-child(even) th {background-color: #f7f7f7;}
  /* 소제목형 */
  .tpl-basictable-01.is-subhead thead th {background-color: #222; color: #fff; border-bottom: 1px solid #222;}
  .tpl-basictable-01.is-subhead tbody th {background-color: #EFEFEF; font-weight: 700;}
  .tpl-basictable-01.is-subhead tbody td {border-left: 1px solid #ddd;}
</style>
<!-- 표 최소 폭 변경: 아래 태그에 style="--tpl-table-min: 800px" 추가 (기본 640px). 화면이 이보다 좁으면 가로 스크롤 -->
<div class="tpl-table-scroll">
  <table class="tpl-basictable-01">
    <colgroup>
      <col width="15%" />
      <col width="*" />
      <col width="20%" />
      <col width="20%" />
    </colgroup>
    <thead>
      <tr>
        <th>No.</th>
        <th>강좌명</th>
        <th>수강 기간</th>
        <th>수강 상태</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>1</th>
        <td class="txt">유아교육개론 기본이론반</td>
        <td>2025.01.01 ~ 2025.02.28</td>
        <td>수강중</td>
      </tr>
      <tr>
        <th>2</th>
        <td class="txt">유아교육각론 심화이론반</td>
        <td>2025.03.01 ~ 2025.04.30</td>
        <td>수강중</td>
      </tr>
      <tr>
        <th>3</th>
        <td class="txt">기출문제 분석반 (1997~2026)</td>
        <td>2025.05.01 ~ 2025.06.30</td>
        <td>수강예정</td>
      </tr>
      <tr>
        <th>4</th>
        <td class="txt">문제풀이반</td>
        <td>2025.07.01 ~ 2025.08.31</td>
        <td>수강예정</td>
      </tr>
      <tr>
        <th>5</th>
        <td class="txt">실전 모의고사반</td>
        <td>2025.09.01 ~ 2025.11.30</td>
        <td>수강예정</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## table-basic-02 — 상세 정보 테이블

> 최소 폭 기본값이 없어 화면에 맞춰 줄어듭니다. 필요하면 `--tpl-table-min`을 지정합니다.

```html
<style>
  .tpl-table-scroll {overflow-x: auto;}
  .tpl-basictable-02 {width: 100%; min-width: var(--tpl-table-min, 0); border-collapse: collapse; border-spacing: 0;}
  .tpl-basictable-02 tbody th {background-color: #f5f5f5; font-size: 15px; font-weight: 500; text-align: center; padding: 14px 20px; border-bottom: 1px solid #dcdcdc;}
  .tpl-basictable-02 tbody td {font-size: 15px; color: #333; text-align: left; padding: 14px 20px; border-bottom: 1px solid #dcdcdc;}
  .tpl-basictable-02 tbody tr:first-child th,
  .tpl-basictable-02 tbody tr:first-child td {border-top: 1px solid #333;}
</style>
<!-- 표 최소 폭 변경: 아래 태그에 style="--tpl-table-min: 800px" 추가 (기본은 최소 폭 없이 화면에 맞춰 줄어듦). 지정하면 화면이 이보다 좁을 때 가로 스크롤 -->
<div class="tpl-table-scroll">
  <table class="tpl-basictable-02">
    <colgroup>
      <col width="20%" />
      <col width="*" />
    </colgroup>
    <tbody>
      <tr>
        <th>이름</th>
        <td>홍길동</td>
      </tr>
      <tr>
        <th>수강 과목</th>
        <td>유아교육개론 기본이론반</td>
      </tr>
      <tr>
        <th>수강 기간</th>
        <td>2025.01.01 ~ 2025.02.28</td>
      </tr>
      <tr>
        <th>수강 상태</th>
        <td>수강중</td>
      </tr>
      <tr>
        <th>비고</th>
        <td>-</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## table-curri-01 — 커리큘럼 표

> 라인형: `.curri-table`에 `line` 클래스를 추가합니다.
>
> 최소 폭은 `--tpl-table-min`(기본 640px)이며, 화면이 더 좁으면 표 영역 안에서 가로 스크롤됩니다.

```html
<style>
  .curri-table {overflow-x: auto;}
  .curri-table table {width:100%; min-width: var(--tpl-table-min, 640px); background-color:#fff; border-collapse: collapse; border-spacing:0;}
  .curri-table table thead th {background-color:#222; color:#fff; text-align:center; font-size:18px; font-weight:500; padding:24px 0;}
  .curri-table table tbody th {background-color: #fff; font-size: 16px; font-weight: 500; line-height: 1.4em; padding: 15px 20px; border-bottom:1px solid #dcdcdc;}
  .curri-table table tbody td {font-size:16px; color:#333; text-align:center; padding: 15px 20px; line-height: 1.4em; border-bottom:1px solid #dcdcdc;}
  .curri-table table tbody td.txt {text-align:left; padding: 24px; line-height:1.5em;}
  .curri-table table tbody td.txt strong{font-weight: 700;}
  .curri-table table tbody ul{margin: 0; padding: 0; list-style: none;}
  .curri-table table tbody ul li{margin: 5px 0; word-break: keep-all;}
  .curri-table table tbody .list-bull li{position: relative; padding-left: 12px;}
  .curri-table table tbody .list-bull li::before{position: absolute; top: 12px; left: 0; width: 5px; height: 1px; background-color: #333; content: '';}
  .curri-table.line table thead th{border: 1px solid #222;}
  .curri-table.line table tbody th{border: 1px solid #dcdcdc;}
  .curri-table.line table tbody td{border: 1px solid #dcdcdc;}
</style>
<!-- 표 최소 폭 변경: 아래 태그에 style="--tpl-table-min: 800px" 추가 (기본 640px). 화면이 이보다 좁으면 가로 스크롤 -->
<div class="curri-table">
  <table>
    <colgroup>
      <col width="15%" />
      <col width="25%" />
      <col width="*" />
    </colgroup>
    <thead>
      <tr>
        <th>월</th>
        <th>강의명</th>
        <th>내용</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td rowspan="2">1~2월</td>
        <td><strong>유아교육개론</strong></td>
        <td class="txt">
          <ul class="list-bull">
            <li>맥락 구조화 자료 2종</li>
            <li>확인 학습 문제, 개론 종강 모의고사</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td><strong>유아교육 개론 기출 분석</strong></td>
        <td class="txt">
          <ul class="list-bull">
            <li>1997~2026 기출문제 분석(공통유아+특수유아)</li>
            <li>기출의 구조화</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td rowspan="3">3~6월</td>
        <td><strong>유아교육각론</strong></td>
        <td class="txt">
          <ul class="list-bull">
            <li>맥락 구조화 자료 2종</li>
            <li>확인 학습 문제, 각론Ⅰ 종강 모의고사</li>
            <li>법령 특강 및 자료 포함, 해실이 특강 포함</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td><strong>유아교육 각론 기출 분석</strong></td>
        <td class="txt">
          <ul class="list-bull">
            <li>1997~2026 기출문제 분석(공통유아+특수유아)</li>
            <li>기출의 구조화</li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## table-curri-02 — 커리큘럼 박스형

> 타이틀 박스 색상은 `applyColor('#HEX')`로 단계별 5색(`--c1`~`--c4`, `--prime`)이 자동 생성됩니다. 6번째 그룹부터는 `--prime` 색으로 표시됩니다.
>
> 컨테이너 쿼리로 영역 폭 800px 이하에서 박스 축소, 560px 이하에서 타이틀 띠형 배치로 바뀝니다.

```html
<style>
  .curri-wrap, .curri-wrap *{box-sizing: border-box;}
  .curri-wrap h4{margin: 0;}
  .curri-wrap ul{margin: 0; padding: 0; list-style: none;}
  .curri-wrap .group{display: flex; gap: 8px; margin-top: 16px;}
  .curri-wrap .group .rgt{flex-grow: 1; display: flex; flex-direction: column; gap: 8px;}
  .curri-wrap .group .rgt > li{display: flex; gap: 8px; flex-grow: 1;}
  .curri-wrap .group .box{display: flex; align-items: center; justify-content: center; min-height: 76px; padding: 14px; text-align: center; line-height: 1.5em; border: 1px solid #ddd; border-radius: 5px;}
  .curri-wrap .group .box.tit-box{width: 200px; min-height: 160px; color: #fff; background-color: var(--prime, #4551d1); border:none; flex-shrink: 0;}
  .curri-wrap .group:nth-child(1) .tit-box{background-color: var(--c1, #b5b9ed);}
  .curri-wrap .group:nth-child(2) .tit-box{background-color: var(--c2, #999fe6);}
  .curri-wrap .group:nth-child(3) .tit-box{background-color: var(--c3, #7d85df);}
  .curri-wrap .group:nth-child(4) .tit-box{background-color: var(--c4, #616bd8);}
  .curri-wrap .group:nth-child(5) .tit-box{background-color: var(--prime, #4551d1);}
  .curri-wrap .group .box.tit-box h4{font-size: 24px; font-weight: 700; line-height: 1.3em;}
  .curri-wrap .group .box.tit-box .month{display: inline-block; min-width: 68px; margin-top: 12px; padding: 0 10px; color: #fff; font-size: 16px; line-height: 27px; text-align: center; border: 1px solid #fff; border-radius: 16px;}
  .curri-wrap .group .box.lecture{width: 200px; color: #000; font-size: 16px; font-weight: 700; background-color: #F6F6F6; flex-shrink: 0;}
  .curri-wrap .group .box.txt{justify-content: unset; padding-left: 40px; padding-right: 40px; font-size: 14px; text-align: left; flex-grow: 1; word-break: keep-all;}
  /* 반응형: 화면이 아니라 .curri-wrap이 놓인 영역의 폭 기준 */
  .curri-wrap{container-type: inline-size;}
  /* 좁은 영역: 타이틀·강좌명 박스 폭 축소 */
  @container (max-width: 800px){
    .curri-wrap .group .box.tit-box{width: 140px;}
    .curri-wrap .group .box.tit-box h4{font-size: 20px;}
    .curri-wrap .group .box.lecture{width: 150px; font-size: 15px;}
    .curri-wrap .group .box.txt{padding-left: 20px; padding-right: 20px;}
  }
  /* 모바일 영역: 타이틀은 위쪽 띠, 강좌명·내용은 가로 유지 */
  @container (max-width: 560px){
    .curri-wrap .group{flex-direction: column;}
    .curri-wrap .group .box.tit-box{width: auto; min-height: 0; padding: 14px 16px;}
    .curri-wrap .group .box.tit-box > div{display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 6px 12px;}
    .curri-wrap .group .box.tit-box h4 br{display: none;}
    .curri-wrap .group .box.tit-box .month{margin-top: 0;}
    .curri-wrap .group .box.lecture{width: 100px; min-height: 0; padding: 12px 8px; font-size: 14px;}
    .curri-wrap .group .box.txt{min-height: 0; padding: 12px 14px; font-size: 13px;}
  }
</style>
<div class="curri-wrap">
  <div class="group">
    <div class="box tit-box">
      <div>
        <h4>기본<br>이론반</h4>
        <span class="month">1~2월</span>
      </div>
    </div>
    <ul class="rgt">
      <li>
        <div class="box lecture">국어교육론<br>기본 이론반</div>
        <div class="box txt">화법, 작문, 독서 이론 구조화 / 독해 방법 안내 및 제시문 분석 연습 / 화법, 작문, 독서 기출 문항 분석</div>
      </li>
      <li>
        <div class="box lecture">문법<br>기본 이론반</div>
        <div class="box txt">현대국어문법 이론 정리(음운론, 형태론, 통사론, 의미론, 담화론) / 중세국어 자료 강독(특강) / 현대국어 문법 기출 분석</div>
      </li>
    </ul>
  </div>

  <div class="group">
    <div class="box tit-box">
      <div>
        <h4>심화<br>이론반1</h4>
        <span class="month">3~4월</span>
      </div>
    </div>
    <ul class="rgt">
      <li>
        <div class="box lecture">국어교육론<br>심화 이론반1</div>
        <div class="box txt">교육과정 &amp; 교과서1(화법, 작문) / 독해 방법 안내 및 제시문 분석 연습 / 화법, 작문 기출 문항 분석</div>
      </li>
      <li>
        <div class="box lecture">문법<br>심화 이론반1</div>
        <div class="box txt">중세국어문법 이론정리(음운론/문자와 표기법, 형태론, 통사론/의미론) / 중세국어문법 기본·심화 이론 이해</div>
      </li>
      <li>
        <div class="box lecture">국어교육론<br>심화 이론반2</div>
        <div class="box txt">교육과정 &amp; 교과서2(독서, 문학) / 독해 방법 안내 및 제시문 분석 연습 / 독서 기출 문항 분석</div>
      </li>
    </ul>
  </div>

  <div class="group">
    <div class="box tit-box">
      <div>
        <h4>심화<br>이론반2</h4>
        <span class="month">5~6월</span>
      </div>
    </div>
    <ul class="rgt">
      <li>
        <div class="box lecture">국어교육론<br>심화 이론반2</div>
        <div class="box txt">교육과정 &amp; 교과서2(독서, 문학) / 독해 방법 안내 및 제시문 분석 연습 / 독서 기출 문항 분석</div>
      </li>
    </ul>
  </div>

  <div class="group">
    <div class="box tit-box">
      <div>
        <h4>문제<br>풀이반</h4>
        <span class="month">7~8월</span>
      </div>
    </div>
    <ul class="rgt">
      <li>
        <div class="box lecture">국어교육론<br>문제풀이</div>
        <div class="box txt">화법, 작문, 독서, 고전소설 영역별 기출문제 및 변형 문제풀이 / 각 영역별 이론 총정리</div>
      </li>
    </ul>
  </div>

  <div class="group">
    <div class="box tit-box">
      <div>
        <h4>모의<br>고사반</h4>
        <span class="month">9~11월</span>
      </div>
    </div>
    <ul class="rgt">
      <li>
        <div class="box lecture">모의고사<br>(연금술)</div>
        <div class="box txt">전공A/B 대비 실전 문제 풀이 / 출제자의 눈을 바탕으로 문항 출제 / 문학, 문법, 국어교육론 이론 최종 정리</div>
      </li>
    </ul>
  </div>

</div>
<script>
  // 타이틀 박스 색상: applyColor('#HEX')로 단계별 5색 생성
  function hexToRgb(hex) {
    var r = parseInt(hex.slice(1,3),16);
    var g = parseInt(hex.slice(3,5),16);
    var b = parseInt(hex.slice(5,7),16);
    return [r, g, b];
  }

  function mix(rgb, t) {
    var r = Math.round(255 + (rgb[0] - 255) * t);
    var g = Math.round(255 + (rgb[1] - 255) * t);
    var b = Math.round(255 + (rgb[2] - 255) * t);
    return '#' + [r,g,b].map(function(v){ return v.toString(16).padStart(2,'0'); }).join('');
  }

  function applyColor(hex) {
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return;
    var rgb = hexToRgb(hex);
    var wrap = document.querySelector('.curri-wrap');
    wrap.style.setProperty('--prime', hex);
    wrap.style.setProperty('--c1', mix(rgb, 0.40));
    wrap.style.setProperty('--c2', mix(rgb, 0.55));
    wrap.style.setProperty('--c3', mix(rgb, 0.70));
    wrap.style.setProperty('--c4', mix(rgb, 0.85));
  }

  applyColor('#4551D1');

</script>
```

---

## table-curri-03 — 커리큘럼 카드형

> 월 박스(`m-col`) 하나에 월 제목(`month`)과 그 월의 카드(`txt`)들을 넣습니다. 카드 수만큼 자동으로 칸을 차지합니다. (한 줄 최대 4칸)
>
> 페이지 배경색 `#ebd8c1`(베이지) 기준 디자인입니다.
>
> 컨테이너 쿼리로 영역 폭 900px 이하에서 2칸, 560px 이하에서 1칸으로 바뀝니다.

```html
<style>
  /* 넓은 영역: 4칸 격자. 월 묶음(m-col)은 안에 든 카드 수만큼 칸을 차지하고, 월·카드 높이는 줄마다 맞춰진다 */
  .curri-wrap-03{container-type: inline-size;}
  .curri-wrap-03, .curri-wrap-03 *{box-sizing: border-box;}
  .curri-wrap-03 p{margin: 0;}
  .curri-wrap-03 ul{margin: 0; padding: 0; list-style: none;}
  .curri-wrap-03 .group{display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px 16px;}
  .curri-wrap-03 .group .m-col{display: grid; grid-row: span 2; grid-template-columns: subgrid; grid-template-rows: subgrid; gap: 10px 16px;}
  .curri-wrap-03 .group .m-col:has(> :nth-child(3)){grid-column: span 2;}
  .curri-wrap-03 .group .m-col:has(> :nth-child(4)){grid-column: span 3;}
  .curri-wrap-03 .group .m-col:has(> :nth-child(5)){grid-column: span 4;}
  .curri-wrap-03 .group .month{
    grid-column: 1 / -1; display: flex; align-items: center; justify-content: center; height: 70px;
    color: #6f593e; font-size: 22px; font-weight: 700; background-color: #fff5e9; border: 1px solid #d8c6b1; border-radius: 16px; box-sizing: border-box;
  }
  .curri-wrap-03 .group .txt{height: 100%; padding: 30px 25px; background-color: #fff; border: 1px solid #ccbaa5; border-radius: 16px; box-sizing: border-box;}
  .curri-wrap-03 .group .txt .sub-tit{color: #333; font-size: 18px; font-weight: 700; margin-bottom: 20px !important; word-break: keep-all;}
  .curri-wrap-03 .group .txt ul li{position: relative; padding-left: 10px; color: #3e3e3e; font-size: 18px; line-height: 1.3em; margin: 5px 0; word-break: keep-all;}
  .curri-wrap-03 .group .txt .note{margin-top: 10px; font-size: 12px;}
  .curri-wrap-03 .group .txt ul li::before{display: block; position: absolute; top: 11px; left: 0; width: 2px; height: 2px; border-radius: 50%; background-color: #3e3e3e; content: '';}
  /* 중간 영역: 2칸 격자. 카드 1장인 월은 1칸, 2장 이상인 월은 한 줄 전체 */
  @container (max-width: 900px){
    .curri-wrap-03 .group{grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 16px;}
    .curri-wrap-03 .group .m-col{grid-column: span 1; grid-row: auto; grid-template-columns: minmax(0, 1fr); grid-template-rows: auto; grid-auto-rows: 1fr;}
    .curri-wrap-03 .group .m-col:has(> :nth-child(3)),
    .curri-wrap-03 .group .m-col:has(> :nth-child(4)),
    .curri-wrap-03 .group .m-col:has(> :nth-child(5)){grid-column: 1 / -1; grid-template-columns: repeat(2, minmax(0, 1fr));}
    .curri-wrap-03 .group .month{height: 56px; font-size: 20px;}
    .curri-wrap-03 .group .txt{padding: 24px 20px;}
    .curri-wrap-03 .group .txt .sub-tit{font-size: 17px; margin-bottom: 14px !important;}
    .curri-wrap-03 .group .txt ul li{font-size: 16px;}
  }
  /* 좁은 영역: 1칸. 월 아래로 카드를 세로로 쌓기 */
  @container (max-width: 560px){
    .curri-wrap-03 .group{grid-template-columns: minmax(0, 1fr);}
    .curri-wrap-03 .group .m-col,
    .curri-wrap-03 .group .m-col:has(> :nth-child(3)),
    .curri-wrap-03 .group .m-col:has(> :nth-child(4)),
    .curri-wrap-03 .group .m-col:has(> :nth-child(5)){grid-column: auto; grid-template-columns: minmax(0, 1fr); grid-auto-rows: auto;}
    .curri-wrap-03 .group .month{height: 48px; font-size: 18px; border-radius: 12px;}
    .curri-wrap-03 .group .txt{padding: 20px 18px; border-radius: 12px;}
    .curri-wrap-03 .group .txt .sub-tit{font-size: 16px; margin-bottom: 10px !important;}
    .curri-wrap-03 .group .txt ul li{font-size: 15px;}
    .curri-wrap-03 .group .txt ul li::before{top: 9px;}
  }
</style>
<div class="curri-wrap-03">
  <!-- 월 박스(m-col) 안의 카드(txt) 수만큼 자동으로 칸을 차지합니다. 한 줄 4칸을 넘으면 다음 줄로 넘어갑니다. -->
  <div class="group">
    <div class="m-col">
      <div class="month">1~2월</div>
      <div class="txt">
        <p class="sub-tit">일반이론</p>
        <ul>
          <li>풍부한 설명으로 철저한 이해식 이론공부</li>
          <li>무한 질의 응답과 그룹 스터디 지원</li>
          <li>풀 컬러 교재 + 특수 자료 제공</li>
        </ul>
      </div>
    </div>
    <div class="m-col">
      <div class="month">3~4월</div>
      <div class="txt">
        <p class="sub-tit">심화이론</p>
        <ul>
          <li>영역별 전문화를 실현하여 영역별로 책임지는 강좌</li>
          <li>서브노트가 필요 없는 올 컬러 심화교재 사용</li>
        </ul>
      </div>
    </div>
    <div class="m-col">
      <div class="month">5~6월</div>
      <div class="txt">
        <p class="sub-tit">필독서 완벽 정리 올인원반</p>
        <ul>
          <li>출제 경향에 맞는 필독서와 용어를 모두 분석</li>
          <li>필독서와 용어사전을 별도 구매할 필요 없이 정리된 컬러자료로 제공</li>
        </ul>
      </div>
      <div class="txt">
        <p class="sub-tit">서술형 첨삭+기출 분석반</p>
        <ul>
          <li>합격의 열쇠인 서술문항을 정복하는 강좌</li>
          <li>문제를 풀어내는 능력을 길러주는 강의</li>
        </ul>
      </div>
    </div>
    <div class="m-col">
      <div class="month">7~8월</div>
      <div class="txt">
        <p class="sub-tit">최근 18년간 영역별 기출문제 분석반</p>
        <ul>
          <li>최근 18년간 영역별로 출제 예상되는 문항을 풀고 기출문제를 심층 분석, 출제의도를 들여다보는 과정</li>
        </ul>
      </div>
      <div class="txt">
        <p class="sub-tit">영역별 예상문제 첨삭 문제풀이반</p>
        <ul>
          <li>
            1차 대비 문제풀이반은 영역별+광영역 문제로 진행되면서 구조화하는 강의
            <p class="note">** 직인강 첨삭 지도</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="m-col">
      <div class="month">9~10월</div>
      <div class="txt">
        <p class="sub-tit">실전형 첨삭 모의평가반</p>
        <ul>
          <li>가장 많은 적중률과 유사 적중을 이뤄낸 실전형 강좌</li>
          <li>어떠한 문제도 접근이 가능하도록 철저한 대비를 하는 강좌</li>
        </ul>
      </div>
    </div>
    <div class="m-col">
      <div class="month">11월</div>
      <div class="txt">
        <p class="sub-tit">최종 파이널 특강</p>
        <ul>
          <li>문제풀이 위주로만 진행되었던 공부를 넘어 이론 5대 영역 최종정리를 통한 합격 다지기</li>
        </ul>
      </div>
    </div>
  </div>
</div>
```

---

## table-time-01 — 주간 시간표

> 날짜 범위와 `schedule` 데이터를 수정해 사용합니다. 색상은 `applyColor('#HEX')`로 지정합니다.
>
> 최소 폭은 `--tpl-table-min`(기본 560px)이며, 칸 폭이 140px 미만이면 시간 목록이 1열로 바뀝니다.

```html
<style>
  .tpl-table-scroll {overflow-x: auto;}
  .tpl-timetable-01 {width: 100%; min-width: var(--tpl-table-min, 560px); border-collapse: collapse; table-layout: fixed; border-bottom: 1px solid rgba(0,0,0,.2);}
  .tpl-timetable-01 thead th {background: var(--prime, #25c373); color: #fff; font-weight: 500; font-size: 18px; text-align: center; padding: 10px 4px; border-left: 1px solid rgba(0,0,0,.2);}
  .tpl-timetable-01 thead th:first-child {border-left: none;}
  .tpl-timetable-01 .day-sat {color: #3862ff !important;}
  .tpl-timetable-01 .day-sun {color: #ff3838 !important;}
  .tpl-timetable-01 td {vertical-align: top; border-left: 1px solid rgba(0,0,0,.2); padding: 0; height: 90px;}
  .tpl-timetable-01 td:first-child {border-left: none;}
  .tpl-timetable-01 .date-label {display: block; font-size: 15px; height: 22px; line-height: 22px; font-weight: 500; color: #333; background: var(--sub, #beedd5); text-align: center;}
  /* 시간 목록: 칸 폭 기준. 넓은 칸은 5줄 채우고 다음 열, 140px 미만 칸은 1열 */
  .tpl-timetable-01 .cell-inner {container-type: inline-size;}
  .tpl-timetable-01 .slots {display: grid; grid-template-columns: minmax(0, 1fr); gap: 1px 0; padding: 10px 5px 15px;}
  @container (min-width: 140px) {
    .tpl-timetable-01 .slots {grid-template-columns: none; grid-template-rows: repeat(5, auto); grid-auto-flow: column;}
  }
  .tpl-timetable-01 .slot {display: block; font-size: 13px; font-weight: 500; letter-spacing: -0.07em; color: #444; line-height: 1.7; white-space: nowrap;}
  .tpl-timetable-01 .slot::before {content: '·'; margin-right: 2px;}
  .tpl-timetable-01 .empty-cell {min-height: 90px;}
</style>
<!-- 표 최소 폭 변경: 아래 태그에 style="--tpl-table-min: 800px" 추가 (기본 560px). 화면이 이보다 좁으면 가로 스크롤 -->
<div class="tpl-table-scroll">
  <table class="tpl-timetable-01">
    <thead>
      <tr>
        <th>월요일</th>
        <th>화요일</th>
        <th>수요일</th>
        <th>목요일</th>
        <th>금요일</th>
        <th class="day-sat">토요일</th>
        <th class="day-sun">일요일</th>
      </tr>
    </thead>
    <tbody id="tpl-timetable-01-body"></tbody>
  </table>
</div>
<script>
  // -------------------------------------------------------
  // 1) 데이터 정의
  // -------------------------------------------------------
  const FULL_SLOTS   = ["10:00-10:40","11:00-11:40","12:00-12:40","14:00-14:40","15:00-15:40","17:00-17:40","18:00-18:40","19:00-19:40"];
  const MORN_SLOTS   = ["10:00-10:40","11:00-11:40","14:00-14:40","15:00-15:40","17:00-17:40"];
  const MORN_SLOTS2  = ["10:00-10:40","11:00-11:40","12:00-12:40","14:00-14:40","15:00-15:40"];

  // 표시할 날짜 범위
  const START_DATE    = new Date("2024-12-23"); // 첫 주 월요일 (테이블 시작)
  const END_DATE      = new Date("2025-01-20"); // 마지막 날짜
  const CONTENT_START = new Date("2024-12-27"); // 날짜 표시 시작일

  const schedule = {
    "2024-12-27": FULL_SLOTS,
    "2024-12-28": MORN_SLOTS,
    "2024-12-29": FULL_SLOTS,
    "2024-12-30": FULL_SLOTS,
    "2024-12-31": FULL_SLOTS,
    "2025-01-04": MORN_SLOTS,
    "2025-01-05": FULL_SLOTS,
    "2025-01-06": FULL_SLOTS,
    "2025-01-07": FULL_SLOTS,
    "2025-01-08": FULL_SLOTS,
    "2025-01-11": MORN_SLOTS2,
    "2025-01-12": FULL_SLOTS,
    "2025-01-13": FULL_SLOTS,
    "2025-01-14": FULL_SLOTS,
    "2025-01-19": FULL_SLOTS,
    "2025-01-20": FULL_SLOTS,
  };

  // -------------------------------------------------------
  // 2) 헬퍼 함수
  // -------------------------------------------------------
  function toKey(d) {
    return d.toISOString().slice(0, 10); // "YYYY-MM-DD"
  }

  function toLabel(d) {
    return `${d.getMonth() + 1}/${d.getDate()}`; // "12/27"
  }

  function getDayClass(d) {
    const day = d.getDay();
    if (day === 6) return "day-sat";
    if (day === 0) return "day-sun";
    return "";
  }

  // 월요일부터 시작하는 주 배열 생성
  function buildWeeks(start, end) {
    const weeks = [];
    let cur = new Date(start);

    // start가 월요일이 아니면 해당 주 월요일로 맞춤
    const dow = cur.getDay();
    const diff = (dow === 0) ? -6 : 1 - dow;
    cur.setDate(cur.getDate() + diff);

    while (cur <= end) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(cur));
        cur.setDate(cur.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  }

  // -------------------------------------------------------
  // 3) 렌더링
  // -------------------------------------------------------
  // 태그 만들기 도우미: el('span', 'slot', '10:00-10:40')
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function renderCell(date) {
    const key   = toKey(date);
    const label = toLabel(date);
    const cls   = getDayClass(date);
    const slots = schedule[key];

    const isInRange = !(date < CONTENT_START || date > END_DATE);

    const td        = el('td');
    const inner     = el('div', 'cell-inner');
    const dateLabel = el('span', 'date-label', isInRange ? label : '');
    if (cls) dateLabel.classList.add(cls);
    inner.append(dateLabel);
    td.append(inner);

    if (!isInRange) return td;

    if (slots && slots.length) {
      const slotBox = el('div', 'slots');
      slots.forEach(s => slotBox.append(el('span', 'slot', s)));
      inner.append(slotBox);
    }

    return td;
  }

  function render() {
    const tbody = document.getElementById('tpl-timetable-01-body');
    const weeks = buildWeeks(START_DATE, END_DATE);

    weeks.forEach(week => {
      const tr = el('tr');
      week.forEach(date => tr.append(renderCell(date)));
      tbody.append(tr);
    });
  }

  render();

  // -------------------------------------------------------
  // 4) 색상 (applyColor로 헤더·날짜 색 지정)
  // -------------------------------------------------------
  function hexToRgb(hex) {
    return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
  }

  function mix(rgb, t) {
    return '#' + rgb.map(function(v) {
      return Math.round(255 + (v - 255) * t).toString(16).padStart(2,'0');
    }).join('');
  }

  function applyColor(hex) {
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return;
    var rgb = hexToRgb(hex);
    var table = document.querySelector('.tpl-timetable-01');
    table.style.setProperty('--prime', hex);
    table.style.setProperty('--sub', mix(rgb, 0.30));
  }

  applyColor('#25c373');

</script>
```
