(function(
  function log(msg) {
    var currentScript = document.currentScript;
    console.warn('script: ', currentScript);
    currentScript = (currentScript && currentScript.src || 'inline script').replace(location.origin, '');
    console.warn('script: ', currentScript);
    console.warn('log: ', msg);
    return currentScript;
  }
  console.log = log;
))();
