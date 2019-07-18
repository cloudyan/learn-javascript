# 引入 js

引入 JavaScript，可以使用 `script` 标签

这里需要注意以下几个知识点：

- `<script src="script.js"></script>`
  - 没有 `defer` 或 `async`，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。
- `<script async src="script.js"></script>`
  - 有 `async`，加载和渲染后续文档元素的过程将和 `script.js` 的加载与执行并行进行（异步）。
- `<script defer src="myscript.js"></script>`
  - 有 `defer`，加载后续文档元素的过程将和 `script.js` 的加载并行进行（异步），但是 `script.js` 的执行要在所有元素解析完成之后，`DOMContentLoaded` 事件触发之前完成。

概括来讲，就是这两个属性都会使script标签异步加载，然而执行的时机是不一样的。如下图

![script 加载执行时序](./img/script.jpg)

蓝色线代表网络读取，红色线代表执行时间，这俩都是针对脚本的；绿色线代表 HTML 解析。

此图告诉我们以下几个要点：

- `defer` 和 `async` 在网络读取（下载）这块儿是一样的，都是异步的（相较于 HTML 解析）
- 它俩的差别在于脚本下载完之后何时执行，显然 `defer` 是最接近我们对于应用脚本加载和执行的要求的
- 关于 `defer`，此图未尽之处在于它是按照加载顺序执行脚本的，这一点要善加利用
- `async` 则是一个乱序执行的主，反正对它来说脚本的加载和执行是紧紧挨着的，所以不管你声明的顺序如何，只要它加载完了就会立刻执行
- 仔细想想，`async` 对于应用脚本的用处不大，因为它完全不考虑依赖（哪怕是最低级的顺序执行），不过它对于那些可以不依赖任何脚本或不被任何脚本依赖的脚本来说却是非常合适的，最典型的例子：Google Analytics

理解了，就方便记忆、使用了。

## 实现动态加载 js

```js
// @dwdjs/utils
const noop = () => {};
const error = url => {
  console.log(`load script error ${url}`);
};
const doc = document;
const domHead = doc.querySelector('head');
const domBody = doc.querySelector('body') || domHead;
// const s = doc.getElementsByTagName('script')[0];

export function loadJs(scriptUrl, obj = {}) {
  const script = document.createElement('script');
  if (typeof obj === 'boolean') {
    // 默认是同步加载，同步模式又称阻塞模式
    // 同步加载流程是瀑布模型，异步加载流程是并发模型。
    obj = {
      async: true, // 异步加载
      defer: true, // 延迟加载
    };
  }
  script.async = obj.async;
  script.defer = obj.defer;
  script.src = scriptUrl;

  script.onload = () => {
    (obj.onload || noop)();
  };
  script.onerror = () => {
    (obj.onerror || error)(scriptUrl);
  };
  // script.crossOrigin = 'anonymous';
  // s.parentNode.insertBefore(s1, s);
  if (obj.first) {
    domHead.appendChild(script);
  } else {
    domBody.appendChild(script);
  }
}

export function loadCss(cssUrl) {
  const style = document.createElement('style');
  style.rel = 'stylesheet';
  style.src = cssUrl;
  domHead.appendChild(style);
}
```

参考：

- https://segmentfault.com/q/1010000000640869
- https://juejin.im/entry/5a7ad55ef265da4e81238da9
