
// 记录基础性能指标

// 关于 window.performance.timing 参见 [performance-api](https://github.com/cloudyan/learn-javascript/tree/master/webapi/performance-api)
export function recordBase() {
  const {
    // 耗时节点及指标计算

    // Resource Timing
    navigationStart,
    // Redirect
    redirectStart,
      // Prompt for unload
      unloadEventStart,
      unloadEventEnd, // -unloadEventStart=页面卸载耗时
    redirectEnd,      // -redirectStart=重定向耗时
    // AppCache
    fetchStart,
    // DNS
    domainLookupStart,
    domainLookupEnd,  // -domainLookupStart=DNS解析耗时
    // TCP
    connectStart,
      // HTTPS
      secureCon,
    connectEnd,       // -connectStart=连接耗时
    // Request
    requestStart,
    // Response
    responseStart,    // -requestStart=首字节耗时
    responseEnd,      // -responseStart=响应读取耗时  -requestStart=请求耗时

    // Processing
    domLoading,
    domInteractive,   // -fetchStart=首次可交互耗时
    domContentLoadedEventStart, // -domLoading=dom解析耗时
    domContentLoadedEventEnd,   // -domContentLoadedEventStart=脚本执行耗时
    domComplete,      // -domLoading=DOM渲染耗时

    // Load
    loadEventStart,   // -fetchStart=完整加载耗时
    loadEventEnd,
  } = window.performance.timing;

  return {
    connect: connectEnd - connectStart,     // 连接耗时
    redirect: redirectEnd - redirectStart,  // 重定向耗时
    ttfb: responseStart - requestStart,     // 首字节耗时
    request: responseEnd - requestStart,    // 请求耗时
    response: responseEnd - responseStart,  // 响应读取耗时
    parseDOM: loadEventStart - domLoading,  // dom解析耗时
    domContentLoaded: domContentLoadedEventEnd - domContentLoadedEventStart, // 脚本执行耗时
    domRender: domComplete - domLoading,        // DOM 渲染耗时
    unload: unloadEventEnd - unloadEventStart,  // 页面卸载耗时
    interactive: domInteractive - fetchStart,   // 首次可交互时间
    load: loadEventStart - fetchStart,          // 页面完整加载时间
    // whiteScreen:  // 白屏时间要考虑接口
  };
}
