
// 记录基础性能指标

// 关于 window.performance.timing 参见 [performance-api](https://github.com/cloudyan/learn-javascript/tree/master/webapi/performance-api)
export function getPerformanceTiming() {
  const { performance } = window;
  if (!performance) {
    // 当前浏览器不支持
    console.log('你的浏览器不支持 performance 接口');
    return;
  }

  const {
    // 耗时节点及指标计算
    // Resource Timing
    navigationStart,
    // Prompt for unload
    unloadEventStart,
    unloadEventEnd,
    // Redirect
    redirectStart,
    redirectEnd,
    // AppCache
    fetchStart,
    // DNS
    domainLookupStart,
    domainLookupEnd,
    // TCP
    connectStart,
      // HTTPS
      secureCon,
    connectEnd,
    // Request
    requestStart,
    // Response
    responseStart,
    responseEnd,

    // Processing
    domLoading,
    domInteractive,
    domContentLoadedEventStart,
    domContentLoadedEventEnd,
    domComplete,

    // Load
    loadEventStart,
    loadEventEnd,
  } = performance.timing;

  return {
    //【重要】页面加载完成的时间
    //【原因】这几乎代表了用户等待页面可用的时间
    loadPage: loadEventEnd - navigationStart, // 页面完整加载时间

    //【重要】执行 onload 回调函数的时间
    //【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
    loadEvent: loadEventEnd - loadEventStart,

    //【重要】解析 DOM 树结构的时间
    //【原因】反省下你的 DOM 树嵌套是不是太多了！
    domReady: domComplete - responseEnd,

    //【重要】重定向的时间
    //【原因】拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
    redirect: redirectEnd - redirectStart,  // 重定向耗时

    //【重要】DNS 查询时间
    //【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
    // 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)
    dns: domainLookupEnd - domainLookupStart, // lookupDomain

    //【重要】读取页面第一个字节的时间
    //【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
    // TTFB 即 Time To First Byte 的意思
    // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byt
    ttfb: responseStart - navigationStart,     // 首字节耗时

    //【重要】请求耗时,内容加载完成的时间
    //【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
    request: responseEnd - requestStart, // 请求资源耗时
    // response: responseEnd - responseStart, // 响应读取时间

    // 拉取缓存耗时
    // 必须注意，如果有缓存，fetchStart 到 requestStart 之内的所有步骤都不会执行。具体说明看 [W3C 标准文档](https://www.w3.org/TR/navigation-timing-2/#processing-model)。
    appcache: requestStart - fetchStart,
    // appcache: domainLookupStart - fetchStart,

    // 页面卸载耗时
    unloadEvent: unloadEventEnd - unloadEventStart,
    // TCP连接耗时，建立连接完成握手的时间
    tcp: connectEnd - connectStart,     // connect 连接耗时

    // parseDOM: domInteractive - domLoading,  // 解析dom树耗时
    // -domContentLoadedEventStart=脚本执行时间 -navigationStart=domready时间(用户可操作时间节点)
    // domContentLoaded: domContentLoadedEventEnd - domContentLoadedEventStart,
    // domRender: domComplete - domLoading,        // DOM渲染耗时
    // interactive: domInteractive - fetchStart,   // 首次可交互时间

    whiteScreen: domContentLoadedEventStart - navigationStart,
    // whiteScreen: domInteractive - navigationStart,
    // 这个白屏时间想要精确，必须要把 [DOMContentLoaded](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/DOMContentLoaded_event) 事件 所属的 script 标签放在 link 标签之后。
    // 因为，这个事件会在 HTML 解析完成后立即触发；但是，HTML 解析完毕并不意味着文档就会在页面上显示，还必须要等待 CSS 解析完成之后才行。
    // 因此，事件放在 link 标签之后，如果 CSS 都还没有解析完毕，就会阻塞 script 标签，等到解析完毕，才会执行事件。
    // 具体解释看 [网页渲染性能优化 —— 渲染原理](https://zhuanlan.zhihu.com/p/39879808)。
  };
}
