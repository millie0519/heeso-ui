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
  document.head.appendChild(script);
})();
