(function() {
  var meta = document.createElement('meta');
  meta.setAttribute('http-equiv', 'Content-Security-Policy');
  meta.setAttribute('content', "default-src * 'self' 'unsafe-inline' 'unsafe-eval' data: blob:;");
  document.head.appendChild(meta);
})();