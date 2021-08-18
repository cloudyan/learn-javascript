# Performance API

Performance API 定义了 DOMHighResTimeStamp 类型，而不是使用 Date.now()接口。

- https://developer.mozilla.org/zh-CN/docs/Web/API/Performance_API
- https://www.jianshu.com/p/3259ed7f68e2
- [网页性能管理详解](http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html)

```js
{
  eventCounts: {size: 36},
  memory: {
    jsHeapSizeLimit: 4294705152,
    totalJSHeapSize: 8757487,
    usedJSHeapSize: 7985291
  },
  navigation: {
    type: 0,
    redirectCount: 0
  },
  timeOrigin: 1629105163391.1,
  timing: {
    connectStart: 1629105163394,
    navigationStart: 1629105163391,
    loadEventEnd: 1629105163897,
    domLoading: 1629105163505,
    secureConnectionStart: 0,
    fetchStart: 1629105163394,
    domContentLoadedEventStart: 1629105163852,
    responseStart: 1629105163453,
    responseEnd: 1629105163455,
    domInteractive: 1629105163595,
    domainLookupEnd: 1629105163394,
    redirectStart: 0,
    requestStart: 1629105163452,
    unloadEventEnd: 0,
    unloadEventStart: 0,
    domComplete: 1629105163897,
    domainLookupStart: 1629105163394,
    loadEventStart: 1629105163897,
    domContentLoadedEventEnd: 1629105163852,
    redirectEnd: 0,
    connectEnd: 1629105163394
  },
}
```
