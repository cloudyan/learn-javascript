# IntersectionObserver API

交叉观察者 API

`IntersectionObserver` 与 `MutationObserver` 不同

- `IntersectionObserver` 提供了一种异步观察目标元素与祖先元素或顶级文档视口的交集变化的方法
- `MutationObserver` 提供了监视对DOM树所做更改的能力


根据[HTTPArchive](https://httparchive.org/reports/page-weight)，图像是大多数网站请求最多的资产类型，通常比任何其他资源占用更多的带宽。

目前，有两种方法可以延迟加载离屏图像：

- 使用[Intersection Observer API](https://developers.google.com/web/updates/2016/04/intersectionobserver)
  - https://w3c.github.io/IntersectionObserver/
- 使用`scroll`，`resize` 或 `orientationchange` 事件处理程序
- 还有目前新增的原生支持方案，浏览器级别的延迟加载, 通过标签的[`loading="lazy"`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-loading)属性实现懒加载

参见 diy-x [lazyload]()

参考：

- [IntersectionObserver API 使用教程](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)
- MDN [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
