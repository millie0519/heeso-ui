#!/usr/bin/env node
/**
 * 미리보기 페이지(templates/*.html)에서 템플릿 문서(.md)를 생성한다.
 *
 *   node scripts/build-snippets.cjs           # 템플릿 문서 생성
 *   node scripts/build-snippets.cjs --check   # 문서가 최신인지 확인만 (다르면 exit 1)
 *
 * - 코드명·제목·안내 문구는 scripts/snippets.config.json에서 관리한다.
 * - 템플릿 코드 범위는 각 미리보기 페이지의 "코드 보기"와 같다: 코드명 뱃지 다음에 오는 .copy-wrap 안쪽.
 * - .copy-wrap 안에 <style class="tpl-style">이 없으면 <head>의 첫 번째 <style>을 함께 넣는다.
 * - @snippet-exclude-start ~ @snippet-exclude-end 사이 줄은 미리보기 전용으로 보고 제외한다.
 * - 머리말의 {{updated}}는 내용이 바뀔 때만 오늘 날짜로 갱신하고, --check는 날짜 줄을 빼고 비교한다.
 * - 카탈로그 목록(js/templates.js)의 codes가 설정 파일과 다르면 알린다. (--check는 실패)
 */
'use strict';

var fs   = require('fs');
var path = require('path');

var ROOT   = path.resolve(__dirname, '..');
var config = JSON.parse(fs.readFileSync(path.join(__dirname, 'snippets.config.json'), 'utf8'));

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8').replace(/\r\n/g, '\n');
}

// 공통 들여쓰기 제거 (앞뒤 빈 줄도 제거)
function dedent(text) {
  var lines  = text.replace(/^\n+|\s+$/g, '').split('\n');
  var indent = Math.min.apply(null, lines.filter(function (l) { return l.trim(); })
    .map(function (l) { return l.match(/^ */)[0].length; }));
  return lines.map(function (l) { return l.slice(indent); }).join('\n');
}

function indent(text, pad) {
  return text.split('\n').map(function (l) { return l ? pad + l : l; }).join('\n');
}

// from 위치 이후 첫 .copy-wrap의 안쪽 HTML (script 안의 '<div' 문자열은 세지 않음)
function copyWrapInner(html, from) {
  var at = html.indexOf('class="copy-wrap', from);
  if (at < 0) throw new Error('.copy-wrap을 찾을 수 없음');
  var start = html.lastIndexOf('<div', at);
  var open  = html.indexOf('>', start) + 1;
  var re    = /<script[\s\S]*?<\/script>|<div\b|<\/div>/g;
  var depth = 1, m;
  re.lastIndex = open;
  while ((m = re.exec(html))) {
    if (m[0] === '<div') depth++;
    else if (m[0] === '</div>' && --depth === 0) return html.slice(open, m.index);
  }
  throw new Error('.copy-wrap이 닫히지 않음');
}

function styleBlock(css) {
  return '<style>\n' + indent(dedent(css), '  ') + '\n</style>';
}

// 미리보기 전용 구간 제거 + data-snippet-empty 표시 제거 (원본 템플릿의 해당 영역은 이미 비어 있음)
function stripExcluded(text) {
  return text
    .replace(/^[^\n]*@snippet-exclude-start[\s\S]*?@snippet-exclude-end[^\n]*\n?/gm, '')
    .replace(/ data-snippet-empty(="")?/g, '');
}

function buildSnippet(item) {
  var html = read(path.join(config.templatesDir, item.file));
  var at   = html.indexOf('code-name">' + item.code + '<');
  if (at < 0) throw new Error(item.file + '에서 코드명 ' + item.code + '을 찾을 수 없음');

  var inner = stripExcluded(dedent(copyWrapInner(html, at)));
  var tplStyle = /<style class="tpl-style">\n([\s\S]*?)\n\s*<\/style>/g;

  if (tplStyle.test(inner)) {
    return inner.replace(tplStyle, function (_, css) { return styleBlock(css); });
  }
  var head = html.match(/<head>[\s\S]*?<style>([\s\S]*?)<\/style>/);
  return (head ? styleBlock(head[1]) + '\n' : '') + inner;
}

// 업데이트 날짜 자리 : 비교할 때는 이 표시로 바꿔서 날짜 차이를 무시한다
var DATE_MARK = '{{updated}}';
var DATE_RE   = /업데이트: (\d{4}-\d{2}-\d{2}|\{\{updated\}\})/;

function build() {
  var count = config.groups.reduce(function (n, g) { return n + g.items.length; }, 0);
  var out = config.header.join('\n').replace('{{count}}', count) + '\n\n## 코드명 목록\n';

  config.groups.forEach(function (group) {
    out += '\n### ' + group.title + '\n';
    group.items.forEach(function (item) {
      out += '- `' + item.code + '` — ' + item.desc + '\n';
      (item.listExtra || []).forEach(function (line) { out += '  - ' + line + '\n'; });
    });
  });

  config.groups.forEach(function (group) {
    group.items.forEach(function (item) {
      out += '\n---\n\n## ' + item.code + ' — ' + item.title + '\n\n';
      if (item.note) out += item.note.map(function (l) { return '> ' + l; }).join('\n>\n') + '\n\n';
      out += '```html\n' + buildSnippet(item) + '\n```\n';
      if (item.appendDoc) out += '\n---\n\n' + read(item.appendDoc).trim() + '\n';
    });
  });

  if (config.footer) out += '\n---\n\n' + config.footer.join('\n') + '\n';

  return out.replace(/[ \t]+$/gm, '');
}

// 카탈로그 목록(js/templates.js)의 codes가 설정 파일과 같은지 비교 (코드명 검색에서 빠지는 것 방지)
function checkCatalogCodes() {
  var sandbox = {};
  require('vm').runInNewContext(read('js/templates.js') + '\nthis.TEMPLATES = TEMPLATES;', sandbox);

  var expected = {};   // 미리보기 경로 → 설정 파일의 코드명
  config.groups.forEach(function (g) {
    g.items.forEach(function (item) {
      var key = config.templatesDir + '/' + item.file;
      (expected[key] = expected[key] || []).push(item.code);
    });
  });

  var problems = [];
  sandbox.TEMPLATES.forEach(function (tpl) {
    var want = expected[tpl.preview] || [];
    var have = tpl.codes || [];
    want.filter(function (c) { return have.indexOf(c) < 0; }).forEach(function (c) {
      problems.push(tpl.preview + ': js/templates.js codes에 ' + c + ' 없음');
    });
    have.filter(function (c) { return want.indexOf(c) < 0; }).forEach(function (c) {
      problems.push(tpl.preview + ': ' + c + '는 설정 파일에 없는 코드명');
    });
    delete expected[tpl.preview];
  });
  Object.keys(expected).forEach(function (file) {
    problems.push(file + ': js/templates.js 목록에 템플릿이 없음 (' + expected[file].join(', ') + ')');
  });
  return problems;
}

// 오늘 날짜 (YYYY-MM-DD, 로컬 시간)
function today() {
  var d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

var result  = build();
var outFile = path.join(ROOT, config.output);
var current = fs.existsSync(outFile) ? fs.readFileSync(outFile, 'utf8').replace(/\r\n/g, '\n') : '';
var unchanged = current.replace(DATE_RE, '업데이트: ' + DATE_MARK) === result;
var codeProblems = checkCatalogCodes();

if (codeProblems.length) {
  console.error('✗ 카탈로그 목록(js/templates.js)과 설정 파일의 코드명이 다릅니다.');
  codeProblems.forEach(function (p) { console.error('  - ' + p); });
}

if (process.argv.includes('--check')) {
  if (!unchanged) {
    console.error('✗ ' + config.output + '가 템플릿과 다릅니다. node scripts/build-snippets.cjs 로 다시 생성하세요.');
  }
  if (!unchanged || codeProblems.length) process.exit(1);
  console.log('✓ ' + config.output + ' 최신 상태, 카탈로그 코드명 일치');
} else {
  // 내용이 그대로면 기존 날짜 유지, 바뀌었으면 오늘 날짜
  var prev = current.match(DATE_RE);
  var date = unchanged && prev && prev[1] !== DATE_MARK ? prev[1] : today();
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, result.replace(DATE_MARK, date));
  var count = config.groups.reduce(function (n, g) { return n + g.items.length; }, 0);
  console.log('✓ ' + config.output + (unchanged ? ' 변경 없음' : ' 생성') + ' (템플릿 ' + count + '개, 업데이트 ' + date + ')');
}
