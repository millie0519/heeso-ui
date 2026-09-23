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

  var script = document.createElement('script');
  script.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
  script.onload = function () {
    document.dispatchEvent(new Event('jquery:ready'));
  };
  document.head.appendChild(script);
})();

// jQuery 로드 완료 후(또는 이미 로드된 경우) fn을 실행한다.
// 템플릿 인라인 스크립트에서 $(...)를 바로 쓰는 대신 이 함수로 감싸서
// jQuery 로딩 완료 시점과의 레이스 컨디션을 피한다.
function onJQueryReady(fn) {
  if (window.jQuery) {
    fn();
  } else {
    document.addEventListener('jquery:ready', fn, { once: true });
  }
}
