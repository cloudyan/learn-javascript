
// 计算加载时间
export function getResourceTiming() {
  // 什么时机会获取此数据呢？unload 时？onload 时？
  const entries = window.performance.getEntriesByType('resource');

  // 资源类型
  // const resourceTypes = {
  //   css: [],    // 通过css加载的资源，如字体或背景图等
  //   img: [],    // 图片
  //   link: [],   // 样式
  //   other: [],  // 如 favicon.ico
  //   script: [], // 脚本
  //   iframe: [], // iframe
  //   fetch: [],  // 接口请求
  //   xmlhttprequest: [], // 接口请求
  // };

  const resource = entries.map((item) => {
    // let arr = resource[item.initiatorType];
    // if (!arr) {
    //   resource[item.initiatorType] = arr = [];
    // }
    return {
      type: 'performance',
      sub_type: 'performance_resource',

      name: item.name,
      entryType: item.entryType || '',
      initiatorType: item.initiatorType || '',
      duration: item?.duration ?? '',
      size: item.transferSize || '',        // 注意兼容性 https://caniuse.com/?search=transferSize
      protocol: item.nextHopProtocol || '', // 兼容性

      // 重定向的时间
      redirect: item.redirectEnd - item.redirectStart,
      // DNS 查询时间
      lookupDomain: item.domainLookupEnd - item.domainLookupStart,
      // 内容加载完成的时间
      request: item.responseEnd - item.requestStart,
      // TCP 建立连接完成握手的时间
      connect: item.connectEnd - item.connectStart,
    };
  })

  // 如何以图的形式展示数据呢，以及对比两次数据的差异点
  // let total = resource.reduce((t, item) => {
  //   return t += (item.duration || 0);
  // }, 0)
  // console.log('total', total);
  return resource;
}
