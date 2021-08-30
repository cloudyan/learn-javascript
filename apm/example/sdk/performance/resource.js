
//
export function recordResource() {
  // 什么时机会获取此数据呢？unload 时？
  const resourceData = window.performance.getEntriesByType('resource');

  const resource = {
    css: [],    // css 字体或图标
    img: [],    // 图片资源
    link: [],   // css资源
    other: [],  // 如 favicon.ico
    script: [], // 脚本资源
    xmlhttprequest: [], // 接口请求
  };

  resourceData.forEach((item) => {
    console.log(item.initiatorType);
    const arr = resource[item.initiatorType]
    if (!arr) return
    const info = {
      name: item.name,
      duration: item?.duration ?? '',
      size: item.transferSize,        // 注意兼容性 https://caniuse.com/?search=transferSize
      protocol: item.nextHopProtocol, // 兼容性
    }
    // if (item.initiatorType === 'link' && item.name.includes('.css')) {
    //   resource['css'].push(info)
    // } else {
    // }
    arr.push(info)
  })

  return resource
}
