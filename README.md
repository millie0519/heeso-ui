# 공통UI
👉 https://millie0519.github.io/heeso-ui/

## 스니펫 문서 (`snippets/ui-templates.md`)

모든 템플릿을 코드명(`popup-modal-01`, `table-basic-01` 등)으로 정리한 문서입니다. 사람이 직접 복사해 쓰거나, AI 도구가 참고해 코드를 넣을 수 있습니다.
스니펫은 단독으로 동작하며 jQuery나 별도 CSS가 필요 없습니다.

- 문서 보기: [snippets/ui-templates.md](snippets/ui-templates.md)
- 파일 받기: https://raw.githubusercontent.com/millie0519/heeso-ui/main/snippets/ui-templates.md

### 도구별 사용 방법

| 도구 | 방법 |
|---|---|
| 직접 사용 | 문서에서 원하는 코드명의 코드 블록을 복사해 붙여 넣기 |
| Claude Code | 프로젝트의 `CLAUDE.md`(또는 `~/.claude/CLAUDE.md`)에 `@경로/ui-templates.md` 한 줄 추가 후 코드명으로 요청 |
| Cursor | 파일을 프로젝트에 넣고 채팅에서 `@ui-templates.md`로 참조하거나, `.cursor/rules/`에 규칙 파일로 등록 |
| 그 외 AI 도구 | 파일을 프로젝트에 넣고 대화에서 참조하도록 지정 |

요청 예) `popup-modal-01 -esc -bg 넣어줘. 폭은 600px로`

### 문서 갱신 (템플릿을 수정했을 때)

`snippets/ui-templates.md`는 템플릿에서 자동으로 만들어지는 파일이라 직접 고치지 않습니다.

```bash
node scripts/build-snippets.cjs          # 문서 다시 생성
node scripts/build-snippets.cjs --check  # 문서가 템플릿과 같은지 확인 (다르면 실패)
```

- 스니펫 범위: 각 템플릿에서 "코드 보기"로 복사되는 영역(`.copy-wrap` 안쪽)
- 코드명·제목·안내 문구: `scripts/snippets.config.json`
- 새 템플릿 추가: 템플릿에 `<code class="code-name">코드명</code>` 뱃지와 `.copy-wrap`을 두고, 설정 파일에 항목 추가
- 미리보기 전용 코드(컬러 피커 연결 등)는 `@snippet-exclude-start` ~ `@snippet-exclude-end` 주석으로 감싸면 스니펫과 코드 보기에서 빠집니다.
