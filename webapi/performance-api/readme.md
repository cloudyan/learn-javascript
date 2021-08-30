# Performance API

Performance API 定义了 DOMHighResTimeStamp 类型，而不是使用 Date.now()接口。

- [Performance API](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance_API)
- [网页性能管理详解](http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html)
- [Performance Timeline](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance_Timeline)
- https://www.jianshu.com/p/3259ed7f68e2
- w3c navigation-timing
  - https://w3c.github.io/navigation-timing 👍
  - https://www.w3.org/TR/navigation-timing

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
    // 时间节点及指标计算

    // Resource Timing
    navigationStart: 1629105163391,
    // Redirect
    redirectStart: 0,
      // Prompt for unload
      unloadEventStart: 0,
      unloadEventEnd: 0,            // -unloadEventStart=页面卸载耗时
    redirectEnd: 0,                 // -redirectStart=重定向耗时
    // AppCache
    fetchStart: 1629105163394,
    // DNS
    domainLookupStart: 1629105163394,
    domainLookupEnd: 1629105163394, // -domainLookupStart=DNS解析时间
    // TCP
    connectStart: 1629105163394,
      // HTTPS
      secureConnectionStart: 0,
    connectEnd: 1629105163394,      // -connectStart=连接时间
    // Request
    requestStart: 1629105163452,
    // Response
    responseStart: 1629105163453,   // -requestStart=首字节时间
    responseEnd: 1629105163455,     // -responseStart=响应读取时间  -requestStart=请求耗时

    // Processing
    domLoading: 1629105163505,
    domInteractive: 1629105163595,  // -fetchStart=首次可交互时间
    domContentLoadedEventStart: 1629105163852, // -domLoading=dom解析时间
    domContentLoadedEventEnd: 1629105163852,   // -domContentLoadedEventStart=脚本执行时间
    domComplete: 1629105163897,     // -domLoading=DOM渲染耗时

    // Load
    loadEventStart: 1629105163897,  // -fetchStart=完整加载时间
    loadEventEnd: 1629105163897,
  },
}
```

## 关于 timing

时序图

![navigation-timing](./../img/timestamp-diagram.svg)

1. navigationStart
    - 同一个浏览器上一个页面卸载(unload)结束时的时间戳。如果没有上一个页面，这个值会和fetchStart相同。
2. unloadEventStart
    - 上一个页面unload事件抛出时的时间戳。如果没有上一个页面，这个值会返回0。
3. unloadEventEnd
    - 和 unloadEventStart 相对应，unload事件处理完成时的时间戳。如果没有上一个页面,这个值会返回0。
4. redirectStart
    - 第一个HTTP重定向开始时的时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回0。
5. redirectEnd
    - 最后一个HTTP重定向完成时（也就是说是HTTP响应的最后一个比特直接被收到的时间）的时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回0.
6. fetchStart
    - 浏览器准备好使用HTTP请求来获取(fetch)文档的时间戳。这个时间点会在检查任何应用缓存之前。
7. domainLookupStart
    - DNS 域名查询开始的UNIX时间戳。如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和fetchStart一致。
8. domainLookupEnd
    - DNS 域名查询完成的时间。 如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
9. connectStart
    - HTTP（TCP） 域名查询结束的时间戳。如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和 fetchStart一致。
10. (secureConnectionStart)
    - HTTPS 返回浏览器与服务器开始安全链接的握手时的时间戳。如果当前网页不要求安全连接，则返回0。
11. connectEnd
    - HTTP（TCP） 返回浏览器与服务器之间的连接建立时的时间戳。如果建立的是持久连接，则返回值等同于fetchStart属性的值。连接建立指的是所有握手和认证过程全部结束。
12. requestStart
    - 返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的时间戳。
13. responseStart
    - 返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的时间戳。如果传输层在开始请求之后失败并且连接被重开，该属性将会被数制成新的请求的相对应的发起时间。
14. responseEnd
    - 返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时（如果在此之前HTTP连接已经关闭，则返回关闭时）的时间戳。
15. domLoading
    - 当前网页DOM结构开始解析时（即Document.readyState属性变为“loading”、相应的 readystatechange事件触发时）的时间戳。
16. domInteractive
    - 当前网页DOM结构结束解析、开始加载内嵌资源时（即Document.readyState属性变为“interactive”、相应的readystatechange事件触发时）的时间戳。
17. domContentLoadedEventStart
    - 当解析器发送DOMContentLoaded 事件，即所有需要被执行的脚本已经被解析时的时间戳。
18. domContentLoadedEventEnd
    - 当所有需要立即执行的脚本已经被执行（不论执行顺序）时的时间戳。
19. domComplete
    - 当前文档解析完成，即Document.readyState 变为 'complete'且相对应的readystatechange 被触发时的时间戳
20. loadEventStart
    - load事件被发送时的时间戳。如果这个事件还未被发送，它的值将会是0。
21. loadEventEnd
    - 当load事件结束，即加载事件完成时的时间戳。如果这个事件还未被发送，或者尚未完成，它的值将会是0.


## 关于 PerformanceResourceTiming

参见 [PerformanceResourceTiming](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceResourceTiming)

```js
{
  connectEnd: 320.1000000014901,
  connectStart: 187.39999999850988,
  decodedBodySize: 145205,
  domainLookupEnd: 182,
  domainLookupStart: 182,
  duration: 196.5,
  encodedBodySize: 36059,
  entryType: "resource",
  fetchStart: 182,
  initiatorType: "link",
  name: "https://xxx.com/1.0.0/static/css/first-screen.chunk.css",
  nextHopProtocol: "h2",
  redirectEnd: 0,
  redirectStart: 0,
  requestStart: 321,
  responseEnd: 378.5,
  responseStart: 354.19999999925494,
  secureConnectionStart: 187.89999999850988,
  serverTiming: [],
  startTime: 182,
  transferSize: 36359,
  workerStart: 0,
}
```
