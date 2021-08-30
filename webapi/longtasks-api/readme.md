# Long Tasks API

目前还是草案

- [Long Tasks API](https://developer.mozilla.org/en-US/docs/Web/API/Long_Tasks_API)
- [longtasks-api](https://w3c.github.io/longtasks/)

```js
var observer = new PerformanceObserver(function(list) {
  var perfEntries = list.getEntries();
  for (var i = 0; i < perfEntries.length; i++) {
    // Process long task notifications:
    // report back for analytics and monitoring
    // ...
  }
});
// register observer for long task notifications
observer.observe({entryTypes: ['longtask']});
// Long script execution after this will result in queueing
// and receiving 'longtask' entries in the observer.
```
