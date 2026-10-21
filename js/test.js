/**
 * AI 연동 테스트 시나리오 (test.html)
 *
 * 테스트 결과가 나오면 아래 SCENARIOS에서 해당 항목의
 *   status : 'pass'(성공) | 'todo'(예정) | 'hold'(보류) | 'wait'(선행·결정 필요) | 'issue'(알려진 문제 확인)
 *   date   : 'YYYY-MM-DD' (결과를 확인한 날)
 *   result : 결과 한 줄
 * 만 고친다. 글 안의 `코드`는 코드 모양으로 표시된다.
 */
var GROUPS = [
  { key: 'claude',   title: 'Claude Code 스킬',       how: '사이트 AI 사용 안내(`#guide`) → "Claude Code" 탭의 설치 명령을 한 번 실행' },
  { key: 'chat',     title: '채팅 AI',                how: 'AI 사용 안내 → "채팅 AI" 탭의 "문서 전체 복사" → ChatGPT·Claude·Gemini 등 새 대화에 붙여넣기' },
  { key: 'tools',    title: 'Cursor · Copilot',       how: 'AI 사용 안내 → "Cursor·기타 도구" 탭에서 `ui-templates.md`를 내려받아 프로젝트 폴더에 넣기' },
  { key: 'editor',   title: '공지사항 에디터 (Jodit)', how: '관리자 화면의 공지사항 글쓰기 에디터에 템플릿 HTML을 붙여 넣기' },
  { key: 'newcomer', title: '처음 받는 사람',          how: '설치되지 않은 PC나 팀원에게 `#guide` 링크만 전달' }
];

var SCENARIOS = [
  {
    id: 'S1', group: 'claude', title: '스킬 이름으로 직접 호출',
    status: 'pass', date: '2026-10-20', result: '다른 프로젝트에서 `/heeso-ui`로 `table-time-01`을 넣어 성공',
    goal: '설치한 스킬을 이름으로 불렀을 때 템플릿이 그대로 들어가는지',
    prompt: '/heeso-ui table-time-01 추가해줘',
    checks: [
      '대화에 `Skill heeso-ui` 줄이 보임',
      '`ui-templates.md`에서 `table-time-01` 부분만 읽음 (문서 전체를 읽지 않음)',
      '브라우저에서 바로 동작 (jQuery나 CSS 파일을 따로 넣지 않음)',
      '주 단위 행이 한 번만 생김',
      '375px 폭에서 표 안에서만 가로 스크롤됨',
      '스타일·클래스는 그대로, 날짜·시간 데이터만 바뀜'
    ]
  },
  {
    id: 'S2', group: 'claude', title: '코드명만 말해도 자동으로 켜지는지',
    status: 'pass', date: '2026-10-21', result: '`/` 없이 코드명만으로 스킬이 켜져 적용됨',
    goal: '`/heeso-ui` 없이 코드명만 말해도 스킬이 스스로 켜지는지 (가장 중요)',
    prep: ['새 Claude Code 세션을 엽니다.'],
    prompt: 'form-radio-01 추가해줘. 항목은 학생/교사/학부모',
    checks: [
      '`/` 없이도 `Skill heeso-ui` 줄이 자동으로 보임',
      '항목 3개가 들어가고 라디오 모양·색은 그대로',
      '선택하면 포인트 컬러(초록)로 표시됨'
    ],
    tip: '켜지지 않으면 입력한 문장을 그대로 기록해 주세요. 스킬 설명에 단서를 더 넣습니다.'
  },
  {
    id: 'S3', group: 'claude', title: '옵션·변수 적용',
    status: 'pass', date: '2026-10-21', result: '닫기 옵션·폭 변수 적용 확인. 뒤 페이지 스크롤 잠금은 테스트 후 추가하고 자동 테스트로 확인',
    goal: '닫기 옵션(`-esc`, `-bg`)과 폭 변수가 안내대로 들어가는지',
    prompt: 'popup-modal-01 -esc -bg 넣어줘. 폭은 600px로',
    checks: [
      '모달 wrap 태그에 `tpl-close-esc tpl-close-bg` 클래스가 붙음',
      '같은 태그에 `style="--tpl-modal-w: 600px"`가 붙음',
      '열기, X 닫기, ESC 닫기, 배경 클릭 닫기가 모두 동작',
      '모달 박스 안쪽을 클릭하면 닫히지 않음',
      '모달이 열려 있는 동안 뒤 페이지가 스크롤되지 않고, 닫으면 다시 스크롤됨'
    ]
  },
  {
    id: 'S4', group: 'claude', title: '같은 템플릿 두 번 넣기',
    status: 'pass', date: '2026-10-21', result: 'id 변경, 공통 코드 중복 없이 두 모달 각각 동작',
    goal: '같은 템플릿을 또 넣을 때 id와 공통 코드가 겹치지 않는지',
    prep: ['S3를 마친 같은 파일에서 이어서 요청합니다.'],
    prompt: 'popup-modal-01 하나 더 추가해줘',
    checks: [
      '새 모달의 `id`가 바뀌고, 그 `id`를 부르는 `onclick`도 함께 바뀜',
      '`<style>`, `<script>`, `@keyframes`가 두 번 들어가지 않음',
      '두 모달이 각각 열리고 닫힘'
    ]
  },
  {
    id: 'S5', group: 'claude', title: '스타일 변형·데이터 바꾸기',
    status: 'pass', date: '2026-10-21', result: '`is-stripe`와 열 구성만 바뀌고 스타일 유지',
    goal: '변형 클래스와 데이터 변경 요청을 규칙대로 처리하는지',
    prompt: 'table-basic-01 스트라이프형으로, 컬럼은 번호/제목/작성일',
    checks: [
      '`<table>`에 `is-stripe` 클래스가 붙음',
      '열 구성만 바뀌고 표 스타일은 그대로',
      '좁은 화면에서 표 안에서만 가로 스크롤됨'
    ]
  },
  {
    id: 'S6', group: 'claude', title: '없는 코드명 요청',
    status: 'pass', date: '2026-10-21', result: '코드를 지어내지 않음',
    goal: '문서에 없는 코드명이면 코드를 지어내지 않는지',
    prompt: 'form-xxx-01 추가해줘',
    checks: [
      '코드를 지어내서 넣지 않음',
      '코드명 목록에서 비슷한 코드명을 안내하거나 되물음'
    ]
  },
  {
    id: 'S7', group: 'claude', title: '여러 템플릿을 한 페이지에',
    status: 'pass', date: '2026-10-21', result: '처음 색은 정상이지만 `applyColor`가 나중 템플릿 것으로 덮어써짐을 확인 → 스크립트를 각자 범위로 분리하고 `curri02ApplyColor`·`time01ApplyColor`로 구분해 수정 (자동 테스트로 각자 색 변경, 시간표 두 번 넣기 확인)',
    goal: '서로 다른 템플릿을 한 페이지에 넣었을 때 충돌이 없는지',
    prompt: 'table-curri-02랑 table-time-01 같은 페이지에 넣어줘',
    checks: [
      '두 표의 색이 각각 정상으로 보임',
      '브라우저 콘솔에 오류가 없음',
      '`curri02ApplyColor(\'#ff6600\')`는 커리큘럼만, `time01ApplyColor(\'#0055ff\')`는 시간표만 바꿈'
    ],
    tip: '수정 전 문서로 이미 넣은 페이지는 `applyColor`가 하나만 남아 있으니, 색을 바꿀 때는 각 스크립트 안의 값을 고치세요.'
  },
  {
    id: 'S8', group: 'claude', title: 'React 프로젝트에 넣기',
    status: 'hold',
    goal: 'React(JSX) 환경에서 클래스·값은 그대로 두고 문법만 바꾸는지',
    prep: ['React 프로젝트에서 진행합니다.'],
    prompt: 'popup-modal-01 넣어줘',
    checks: [
      '`class`가 `className`으로 바뀌고 클래스명·스타일 값은 그대로',
      '열고 닫기가 상태(`useState`)와 이벤트로 바뀜',
      '스타일이 별도 CSS 파일로 분리됨'
    ]
  },
  {
    id: 'C1', group: 'chat', title: '문서 붙여 넣었을 때의 첫 답',
    status: 'pass', date: '2026-10-21', result: '요약 없이 확인 답변 후 요청 대기',
    goal: '긴 문서를 붙여 넣어도 요약하지 않고 요청을 기다리는지',
    checks: [
      '요약 없이 "heeso-ui 템플릿 문서를 확인했습니다…"라고만 답함',
      '"너무 길다"는 오류가 나지 않음 (나면 쓴 AI와 요금제를 기록)'
    ]
  },
  {
    id: 'C2', group: 'chat', title: '코드명으로 코드 받기',
    status: 'pass', date: '2026-10-21', result: '요청한 코드만 출력, 그대로 동작',
    goal: '채팅에서는 요청한 코드만 출력하는지',
    prep: ['C1을 마친 같은 대화에서 이어서 요청합니다.'],
    prompt: 'table-basic-01 스트라이프형으로, 컬럼은 번호/제목/작성일',
    checks: [
      '요청한 템플릿 코드만 출력 (문서 내용이나 다른 템플릿을 다시 출력하지 않음)',
      '출력된 코드를 HTML 파일에 붙이면 그대로 동작'
    ]
  },
  {
    id: 'D1', group: 'tools', title: '내려받은 문서로 요청',
    status: 'pass', date: '2026-10-21', result: '두 템플릿 모두 동작',
    goal: '내려받은 문서를 참조해 템플릿 두 개를 함께 넣는지',
    prep: ['Cursor는 채팅에서 `@ui-templates.md`, Copilot은 `#file:ui-templates.md`로 참조합니다.'],
    prompt: 'form-check-01이랑 form-file-01 넣어줘',
    checks: [
      '두 템플릿이 모두 동작 (체크 시 초록, 파일 선택 시 파일명 표시)',
      '스타일·클래스는 그대로'
    ]
  },
  {
    id: 'J1', group: 'editor', title: 'Jodit 기본 설정 검증',
    status: 'pass', date: '2026-10-16', result: 'Jodit 4.18.2 기본 설정: 소스 모드와 "원본 유지" 붙여넣기 모두 `<style>`·`class` 유지, `<script>`·`onclick`만 삭제',
    goal: '에디터가 템플릿의 스타일과 클래스를 남기는지 (기본 설정 기준)',
    checks: [
      '소스 모드(`<>`)로 넣어도 `<style>`과 `class`가 남음',
      'Ctrl+V 후 "원본 유지"를 골라도 남음',
      '스크립트가 필요한 시간표·커리큘럼 박스형은 정적 버전이 따로 필요함을 확인'
    ]
  },
  {
    id: 'J2', group: 'editor', title: '실제 관리자 화면에서 저장·노출',
    status: 'hold',
    goal: '실제 사이트 설정과 저장 과정을 거쳐도 디자인이 유지되는지',
    prep: [
      '테스트용 공지사항 글쓰기에서 소스 모드(`<>`)를 엽니다.',
      '`table-basic-01` 코드를 붙여 넣고 저장합니다.'
    ],
    checks: [
      '실제 공지 페이지에서 원래 디자인으로 보임 (위쪽 굵은 선, 회색 헤더)',
      '수정 화면을 다시 열었을 때 `<style>`과 `class="tpl-basictable-01"`이 남아 있음'
    ],
    tip: '이 결과로 공지사항용 "에디터용 복사" 방식을 정합니다. 관리자 화면 접근이 필요합니다.'
  },
  {
    id: 'N1', group: 'newcomer', title: '안내 링크만으로 혼자 사용',
    status: 'hold',
    goal: '설명 없이 `#guide` 링크만 받아도 설치부터 요청까지 할 수 있는지',
    checks: [
      '안내만 보고 설치 또는 연결을 끝냄',
      '코드명 요청으로 템플릿을 넣는 데 성공',
      '막힌 지점이 있으면 그 단계와 이유를 기록'
    ]
  }
];

var STATUS = {
  pass:  { label: '성공',          cls: 'is-pass' },
  todo:  { label: '예정',          cls: 'is-todo' },
  hold:  { label: '보류',          cls: 'is-hold' },
  wait:  { label: '선행 필요',      cls: 'is-wait' },
  issue: { label: '알려진 문제 확인', cls: 'is-issue' }
};

(function () {

  // ---- 작은 도우미 ----
  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  // `코드` 표기를 <code>로 바꿔 붙임 (나머지는 그냥 글자)
  function rich(node, text) {
    text.split('`').forEach(function (part, i) {
      if (!part) return;
      node.appendChild(i % 2 ? el('code', null, part) : document.createTextNode(part));
    });
    return node;
  }

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { v ? localStorage.setItem(k, '1') : localStorage.removeItem(k); } catch (e) {} }
  };

  // ---- 현황 요약 ----
  function count(status) {
    return SCENARIOS.filter(function (s) { return !status || s.status === status; }).length;
  }

  var summary = document.getElementById('summary');
  [['시나리오', count()], ['성공', count('pass')], ['보류', count('hold')], ['예정', count('todo')], ['확인 필요', count('wait') + count('issue')]]
    .forEach(function (item) {
      var box = el('div', 'summary-item');
      box.appendChild(el('dt', null, item[0]));
      box.appendChild(el('dd', null, item[1]));
      summary.appendChild(box);
    });

  // ---- 시나리오 카드 ----
  var groupsWrap = document.getElementById('scenarioGroups');

  GROUPS.forEach(function (group) {
    var items = SCENARIOS.filter(function (s) { return s.group === group.key; });
    if (!items.length) return;

    var section = el('section', 'group');
    section.setAttribute('aria-labelledby', 'group-' + group.key);
    var head = el('div', 'group-head');
    var title = el('h3', 'group-title', group.title);
    title.id = 'group-' + group.key;
    head.appendChild(title);
    head.appendChild(rich(el('p', 'group-how'), group.how));
    section.appendChild(head);

    var list = el('div', 'cards');
    items.forEach(function (s) { list.appendChild(renderCard(s)); });
    section.appendChild(list);
    groupsWrap.appendChild(section);
  });

  function renderCard(s) {
    var st = STATUS[s.status];
    var card = el('article', 'card ' + st.cls);
    card.dataset.status = s.status;
    card.id = s.id;

    var top = el('div', 'card-top');
    top.appendChild(el('span', 'card-id', s.id));
    top.appendChild(el('h4', 'card-title', s.title));
    var badge = el('span', 'status ' + st.cls, st.label);
    top.appendChild(badge);
    card.appendChild(top);

    card.appendChild(rich(el('p', 'card-goal'), s.goal));

    if (s.result) {
      var res = el('p', 'card-result');
      res.appendChild(el('b', null, (s.date ? s.date.replace(/-/g, '.') + ' ' : '') + '결과 · '));
      rich(res, s.result);
      card.appendChild(res);
    }

    if (s.prep) {
      var prep = el('ol', 'card-prep');
      s.prep.forEach(function (p) { prep.appendChild(rich(el('li'), p)); });
      card.appendChild(prep);
    }

    if (s.prompt) {
      var box = el('div', 'prompt');
      box.appendChild(el('span', 'prompt-label', '요청'));
      box.appendChild(el('code', 'prompt-text', s.prompt));
      var copy = el('button', 'prompt-copy', '복사');
      copy.type = 'button';
      copy.setAttribute('aria-label', s.id + ' 요청 문장 복사');
      copy.addEventListener('click', function () {
        navigator.clipboard.writeText(s.prompt).then(function () { flash(copy, '복사됨'); }, function () { flash(copy, '실패'); });
      });
      box.appendChild(copy);
      card.appendChild(box);
    }

    var checks = el('ul', 'checks');
    checks.setAttribute('aria-label', s.id + ' 확인할 것');
    s.checks.forEach(function (text, i) {
      var key = 'heeso-test:' + s.id + ':' + i;
      var li = el('li');
      var label = el('label');
      var input = el('input');
      input.type = 'checkbox';
      input.checked = !!store.get(key);
      input.addEventListener('change', function () { store.set(key, input.checked); });
      label.appendChild(input);
      label.appendChild(rich(el('span'), text));
      li.appendChild(label);
      checks.appendChild(li);
    });
    card.appendChild(checks);

    if (s.tip) card.appendChild(rich(el('p', 'card-tip'), s.tip));
    return card;
  }

  function flash(btn, text) {
    var original = '복사';
    btn.textContent = text;
    btn.classList.add('done');
    clearTimeout(btn._t);
    btn._t = setTimeout(function () { btn.textContent = original; btn.classList.remove('done'); }, 1600);
  }

  // ---- 상태별 보기 ----
  var filters = document.getElementById('filters');
  var FILTERS = [['all', '전체', count()], ['pass', '성공', count('pass')], ['hold', '보류', count('hold')], ['todo', '예정', count('todo')], ['check', '확인 필요', count('wait') + count('issue')]]
    .filter(function (f) { return f[0] === 'all' || f[2] > 0; });

  FILTERS.forEach(function (f, i) {
    var btn = el('button', 'filter');
    btn.type = 'button';
    btn.setAttribute('aria-pressed', String(i === 0));
    btn.appendChild(document.createTextNode(f[1] + ' '));
    btn.appendChild(el('span', 'filter-count', f[2]));
    btn.addEventListener('click', function () {
      filters.querySelectorAll('.filter').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
      applyFilter(f[0]);
    });
    filters.appendChild(btn);
  });

  function applyFilter(key) {
    groupsWrap.querySelectorAll('.card').forEach(function (card) {
      var st = card.dataset.status;
      var show = key === 'all' || st === key || (key === 'check' && (st === 'wait' || st === 'issue'));
      card.hidden = !show;
    });
    groupsWrap.querySelectorAll('.group').forEach(function (g) {
      g.hidden = !g.querySelector('.card:not([hidden])');
    });
  }

  // ---- 체크 초기화 ----
  document.getElementById('resetChecks').addEventListener('click', function () {
    groupsWrap.querySelectorAll('.checks input').forEach(function (input) {
      if (input.checked) { input.checked = false; input.dispatchEvent(new Event('change')); }
    });
  });

  // ---- 템플릿 문서 정보 (머리말의 업데이트 날짜·템플릿 수, 예전 문서의 "스니펫 N개"도 읽음) ----
  fetch('snippets/ui-templates.md').then(function (res) {
    if (!res.ok) throw new Error(res.status);
    return res.text();
  }).then(function (text) {
    var m = text.match(/업데이트: (\d{4}-\d{2}-\d{2}) · (?:템플릿|스니펫) (\d+)개/);
    document.getElementById('docMeta').textContent = m
      ? '템플릿 문서 ' + m[1].replace(/-/g, '.') + ' 업데이트 · 코드명 ' + m[2] + '개'
      : '';
  }).catch(function () {
    document.getElementById('docMeta').textContent = '';
  });

})();
