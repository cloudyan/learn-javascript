# ssr vs csr

CSR 一般由静态资源服务器（CDN）等直接返回HTML资源，之后浏览器解析HTML加载CSS、JS资源（CSS加载结束后页面会尽快进行首屏渲染FP），JS依赖加载结束后，Vue实例初始化，拉取页面数据，页面渲染（FMP）。

SSR 由nodejs服务器来直出页面，请求到达后端后，后端拉取cgi接口数据，根据直出bundle生成render对象，render对象将执行客户端代码构建VDOM，生成HTML string，填充进模板HTML，返回HTML资源，浏览器解析后加载CSS、JS资源，（在CSS加载结束后触发FP和FMP），Vue实例初始化，接管后端直出的HTML，页面可响应。

SSR存在的缺陷：

1、对服务器提出更高的要求，生成虚拟DOM如果相对较长的运行和计算耗时；
2、由于cgi拉取和vdom直出后才吐出HTML页面，FMP虽然提前了，但是FP相对延迟了；
3、相比CSR，SSR渲染后，由于仍然需要进行依赖、vue初始化，页面可交互时间并没有较大改善。

常见优化方法虽然SSR仍有许多不足之处，但是也不是没有改善的空间。

一、缓存优化

1、页面级别缓存：vuessr官网给我们提供了一种方法，如果页面并非千人千面，总是为所有用户渲染相同的内容，我们可以利用名为 micro-caching 的缓存策略，来大幅度提高应用程序处理高流量的能力。这通常在 Nginx 层完成，也可以在 Node.js 中实现。
2、组件级别缓存：通过对组件设置serverCacheKey的方式，如果组件serverCacheKey相同，将复用之前渲染的组件产物，不需要重新渲染。

```js
export default {
  name: 'myComponent', // 必填选项
  props: ['item'],
  serverCacheKey: props => props.item.id,
}
```

二、代码实现优化

1、减少组件嵌套层次，优化HTML结构：由于组件最初需要在node后端进行VDOM计算和渲染，优化组件层次结构，减少过深曾经的DOM嵌套，可以减少VDOM计算耗时。
2、减少首页渲染数据量：根据业务调整用户首屏可见的所需渲染的数据，其他数据懒加载或异步加载。

三、资源加载

![资源加载时序图](./img/ssr-vs-csr-shixutu.jpg)

1、流式传输：render对象会暴露renderToStream方法，把原有的直出结果以流的形式输出
2、分块传输：lucien大佬在tweb大会上给我们带来了新的思路，由模板的语法树， 分析代码的上下文，分析数据和模板间的依赖，用异步数据分割模板，分块逐步输出。
（相比流式传输，前置位的cgi数据一旦ready，就会渲染输出，而不需要等待所有的gi拉取到后才开始渲染输出，但是该方案改造成本较大）

![资源加载分块传输](./img/ssr-vs-csr-fenkuai.jpg)

受流式传输和分块传输的启发，我们能不能在这上面下功夫？在请求到来时，先返回一份完整的HTML空页面，让客户端更快的FP，其次，后端拉取cgi和渲染VDOM 与 前端拉取CSS、JS资源 两者同步进行，之后再吐出直出的HTML string 与 页面store，再次渲染页面，这样的话FP提前了，和CSR的FP时间一毛一样，其次，FMP相比CSR大大提高，更重要的是，由于JS资源的加载让Vue初始化触发的更早，意味着页面可响应时间也会提高。

![最终优化方案](./img/ssr-vs-csr-youhua.jpg)

参考：

- [Vue-SSR 优化方案详细总结](https://zhuanlan.zhihu.com/p/93199714)
