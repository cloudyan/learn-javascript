# 引入 js

引入使用 js 的方式有多种形式

- 行内引入，`<img on+事件类型="js 代码" />`
- 使用 `script` 标签，内联嵌入在当前的 `html` 文档内
- 使用 `script` 标签引入外部 js
- 也可以动态加载

重点内容便是掌握 **js 的加载时序与执行时序**

如果是内联嵌入，则按文档流**顺序加载**，并**总是立即执行(依次)**，此时**会阻塞文档解析**，此时 `async` 属性无效。

如果是加载外部 js，则分以下几种情况：

- `<script src="script.js"></script>` [默认]，没有 `defer` 或 `async` 属性
  - 浏览器会阻塞文档解析，立即加载并依次执行指定的脚本。
  - “立即”指的是在渲染该 `script` 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。
- `<script async src="script.js"></script>` 带有 `async` 属性(html5新特性)
  - 表示异步加载，并异步执行，不阻塞文档解析，也不同步执行。
  - 加载和渲染后续文档元素的过程将和 `script.js` 的加载与执行并行进行（异步）。
  - 通过脚本异步插入的script标签达到的效果和带async属性的script标签是一样的
- `<script defer src="myscript.js"></script>` 带有 `defer`属性
  - 会推迟脚本的执行，并且不阻塞文档解析，如同脚本放在 `</body>` 之前
  - 加载后续文档元素的过程将和 `script.js` 的加载并行进行（异步），但是 `script.js` 的执行要在所有元素解析完成之后，`DOMContentLoaded` 事件触发之前完成。
- `<script async defer src="myscript.js"></script>`
  - 效果同 async

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

- 现代浏览器资源存在并行下载限(制通常为 6 个)，启用 http2 可以多路复用

script 标签的默认行为，有以下几个特性

- script标签（不带defer或async属性）的会阻止文档解析。相关脚本会立即下载并执行。
- document.currentScript可以获得当前正在运行的脚本(Chrome 29+, FF4+)
- 脚本顺序再默认情况下和script标签出现的顺序一致

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

其他知识点：

- css资源的加载，不会阻塞DOM树解析，但会阻塞渲染
- js资源的加载，会阻塞DOM树的构建和渲染，除非设置了script标签的异步属性
- 放在head中会在解析DOM树和渲染页面前就加载，并阻塞页面
- js正常情况下加载完就会立即执行，在js脚本中只能访问当前`<script>`以上的DOM，脚本执行结束后再继续解析DOM。
- js执行引擎和页面渲染是由不同的线程来执行，但这两者是互斥的，也就是说js执行过程是无法构建DOM和渲染页面的

## 经典问题

- html 与 js 是否并行下载？
- 是js的下载阻塞了页面的渲染还是js的执行阻塞了页面的渲染，还是两者都会阻塞页面
- script标签放在head中与放在body中，是影响了js的下载开始时间还是执行开始时间
- css，图片以及一些其它的外部资源的下载是否与html，js的下载并行

参考：

- 红皮书
- https://www.zhihu.com/question/61309490
- http://pij.robinqu.me/Browser_Scripting/Document_Loading/ScriptTag.html
- https://segmentfault.com/a/1190000000515181
- https://segmentfault.com/q/1010000000640869
- https://juejin.im/entry/5a7ad55ef265da4e81238da9
