# 공통UI
👉 https://heeso-ui.vercel.app/

## 스니펫 문서 (`snippets/ui-templates.md`)

모든 템플릿을 코드명(`popup-modal-01`, `table-basic-01` 등)으로 정리한 문서입니다. 사람이 직접 복사해 쓰거나, AI 도구가 참고해 코드를 넣을 수 있습니다.
스니펫은 단독으로 동작하며 jQuery나 별도 CSS가 필요 없습니다.

- 문서 보기: [snippets/ui-templates.md](snippets/ui-templates.md)
- 파일 받기: https://heeso-ui.vercel.app/snippets/ui-templates.md
- 사용 안내 (설치 명령·다운로드·전체 복사): https://heeso-ui.vercel.app/#guide
- AI 연동 테스트 시나리오 (동작 구조·테스트 체크리스트): https://heeso-ui.vercel.app/test.html
  - 테스트 결과는 `js/test.js` 맨 위 `SCENARIOS`의 `status`·`date`·`result`만 고치면 페이지에 반영됩니다.

### 도구별 사용 방법

| 도구 | 방법 |
|---|---|
| Claude Code | 사용 안내의 설치 명령으로 스킬을 설치한 뒤 코드명으로 요청 (스니펫 요청이 있을 때만 문서를 읽음) |
| Cursor | 파일을 프로젝트에 넣고 채팅에서 `@ui-templates.md`로 참조하거나, `.cursor/rules/`에 규칙 파일로 등록 |
| GitHub Copilot | 파일을 프로젝트에 넣고 채팅에서 `#file:ui-templates.md`로 참조 |
| 채팅 AI (ChatGPT, Claude, Gemini 등) | 사용 안내의 "문서 전체 복사"로 대화에 붙여 넣은 뒤 코드명으로 요청 |
| 직접 사용 | 문서에서 원하는 코드명의 코드 블록을 복사해 붙여 넣기 |

요청 예) `form-radio-01 추가해줘. 항목은 학생/교사/학부모`, `popup-modal-01 -esc -bg 넣어줘. 폭은 600px로`

### Claude Code 스킬 (`skill/SKILL.md`)

설치 명령은 `skill/SKILL.md`와 `snippets/ui-templates.md`를 `~/.claude/skills/heeso-ui/`에 내려받습니다. 스니펫이 바뀌면 같은 명령을 다시 실행해 업데이트합니다.

- macOS·Linux

  ```bash
  mkdir -p ~/.claude/skills/heeso-ui && \
    curl -fsSL https://heeso-ui.vercel.app/skill/SKILL.md \
    -o ~/.claude/skills/heeso-ui/SKILL.md && \
    curl -fsSL https://heeso-ui.vercel.app/snippets/ui-templates.md \
    -o ~/.claude/skills/heeso-ui/ui-templates.md
  ```

- Windows (PowerShell)

  ```powershell
  $d = "$HOME\.claude\skills\heeso-ui"; New-Item -ItemType Directory -Force $d | Out-Null
  Invoke-WebRequest -UseBasicParsing https://heeso-ui.vercel.app/skill/SKILL.md -OutFile "$d\SKILL.md"
  Invoke-WebRequest -UseBasicParsing https://heeso-ui.vercel.app/snippets/ui-templates.md -OutFile "$d\ui-templates.md"
  ```

설치 명령을 바꿀 때는 사이트 사용 안내(`index.html`의 `#guideModal`)와 이 README를 함께 고칩니다.

### 문서 갱신 (템플릿을 수정했을 때)

`snippets/ui-templates.md`는 템플릿에서 자동으로 만들어지는 파일이라 직접 고치지 않습니다.

```bash
node scripts/build-snippets.cjs          # 문서 다시 생성
node scripts/build-snippets.cjs --check  # 문서가 템플릿과 같은지, 카탈로그 코드명이 맞는지 확인 (다르면 실패)
```

- 스니펫 범위: 각 템플릿에서 "코드 보기"로 복사되는 영역(`.copy-wrap` 안쪽)
- 코드명·제목·안내 문구, 문서 머리말·맺음말: `scripts/snippets.config.json`
- 업데이트 날짜(머리말의 `업데이트:`)는 문서 내용이 바뀔 때만 자동으로 오늘 날짜가 됩니다.
- 미리보기 전용 코드(컬러 피커 연결 등)는 `@snippet-exclude-start` ~ `@snippet-exclude-end` 주석으로 감싸면 스니펫과 코드 보기에서 빠집니다.
- 스크립트가 내용을 채우는 영역(예: 시간표 `tbody`)에는 `data-snippet-empty` 속성을 달면, 코드 보기에서 비운 상태로 복사됩니다.

### 새 템플릿·스니펫 추가

1. 템플릿 HTML에 `<code class="code-name">코드명</code>` 뱃지와 `.copy-wrap`을 둡니다.
2. `scripts/snippets.config.json`에 코드명 항목을 추가합니다.
3. `js/templates.js`에 카탈로그 목록 항목을 추가하고, `codes`에 같은 코드명을 넣습니다. (코드명 검색용)
4. `node scripts/build-snippets.cjs`로 문서를 다시 만들고 `--check`로 확인합니다. 2번과 3번의 코드명이 다르면 `--check`가 어느 코드명이 빠졌는지 알려 줍니다.
