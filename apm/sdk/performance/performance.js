
// 记录基础性能指标

// 关于 window.performance.timing 参见 [performance-api](https://github.com/cloudyan/learn-javascript/tree/master/webapi/performance-api)

// google Web-Vitals 指标: https://web.dev/metrics/
// 衡量阈值: 取第 75 个百分位
// Time to First Byte 第一字节时间 (TTFB) [0.8, 1.8]
// First Contentful Paint 首次内容绘制 (FCP)  [1.8s, 3.0s]
// Largest Contentful Paint 最大内容绘制 (LCP) [2.5s, 4.0s]
//    良好的 LCP 分数: 网站应该努力将最大内容绘制控制在2.5 秒或以内。为了确保您能够在大部分用户的访问期间达成建议目标值，一个良好的测量阈值为页面加载的第 75 个百分位数，且该阈值同时适用于移动和桌面设备。
// First Input Delay 首次输入延迟 (FID) [100ms, 300ms]
// Time to Interactive 可交互时间 (TTI) [3.8s, 7.3s]
// Total Blocking Time 总阻塞时间 (TBT) [200ms, 600ms]
// Cumulative Layout Shift 累积布局偏移 (CLS) [0.1, 0.25]
// Interaction to Next Paint (INP) [200ms,500ms]
// INP 的指标值是取使用者与网页进行所有互动(背景呼叫网站主机再回应)的最慢的一次回应时间，并定义小於 200ms 为良好的回应能力。
// 现有的 FID 只能测量与网页第一次互动的回应速度，但 INP 的目的则是要测量网页每一次与网站主机互动的整体回应速度

export function getPerformanceTiming() {
  const { performance } = window;
  if (!performance) {
    // 当前浏览器不支持
    console.log('你的浏览器不支持 performance 接口');
    return;
  }

  const {
    // 单位均为毫秒
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
      secureConnectionStart,
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
    type: 'performance',
    sub_type: 'performance_timing',

    // arms 的 web 端关键性能指标定义
    // https://help.aliyun.com/document_detail/60288.html

    // FMP（First Meaningful Paint）首屏时间/主要内容可见时间
    // 参见[FMP技术实现方案](https://zhuanlan.zhihu.com/p/44933789)
    // fmp: fmpTime - fmpStart,

    // 历史, 随着 SPA 盛行，以下计算公式失效了。
    // renderTime: domComplete - domLoading,

    // FPT（First Paint Time）首次渲染时间（白屏时间）
    // 从请求开始到浏览器开始解析第一批HTML文档字节的时间差。
    fpt: responseEnd - fetchStart,

    // TTI（Time to Interact） 首次可交互时间
    // 浏览器完成所有HTML解析并且完成DOM构建，此时浏览器开始加载资源。
    tti: domInteractive - fetchStart,

    // HTML加载完成时间，即DOM Ready时间。
    // 如果页面有同步执行的JS，则同步JS执行时间=Ready-TTI。
    // ready: domContentLoadEventEnd - fetchStart,

    // 页面完全加载时间
    // Load=首次渲染时间+DOM解析耗时+同步JS执行+资源加载耗时
    load: loadEventStart - fetchStart,

    // 首包时间
    firstbyte: responseStart - domainLookupStart,

    // 区间段耗时字段含义
    // // DNS查询耗时
    // dns: domainLookupEnd - domainLookupStart,
    // // TCP连接耗时
    // tcp: connectEnd - connectStart,
    // // 首包时间: 请求响应耗时, TTFB有多种计算方式，ARMS采用的标准，请参见[Google Development定义](https://developer.chrome.com/docs/lighthouse/performance/time-to-first-byte/)。
    // // 减少服务响应时间 审计源码: https://github.com/GoogleChrome/lighthouse/blob/main/core/audits/server-response-time.js
    // ttfb: responseStart - requestStart,
    // // 内容传输耗时
    // trans: responseEnd - responseStart,
    // // DOM解析耗时
    // dom: domInteractive - responseEnd,
    // // 资源加载耗时, 表示页面中的同步加载资源。
    // res: loadEventStart - domContentLoadedEventEnd,
    // // SSL安全连接耗时, 只在HTTPS下有效。
    // ssl: connectEnd - secureConnectionStart,

    // 以上是 arms 相关指标定义



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

    // 小程序关键性能指标
    // FPT（First Paint Time） 首次渲染时间
    // 小程序从onLaunch到第一个页面onShow之间的时间。
    // fpt: onShow (first page) - onLaunch (app),
    // launch: '',
  };
}
