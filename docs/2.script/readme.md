# 引入 js

引入使用 js 的方式有多种形式

- 行内引入，`<img on+事件类型="js 代码" />`
- 使用 script 标签，内联嵌入在当前的 `html` 文档内
- 使用 script 标签引入外部 js
- 也可以动态加载

重点内容便是掌握 **js 的加载时序与执行时序**

> `document.currentScript` 可以获得当前正在运行的脚本(Chrome 29+, FF4+)

**如果是内联嵌入**

则按文档流**顺序加载**，并**总是立即执行(依次)**，此时**会阻塞文档解析**，此时 `async` 属性无效。

详见示例[script-inline](./examples/script-inline.html)

**如果是加载外部 js，则分以下几种情况：**

1. 默认情况下，没有 `defer` 或 `async` 属性

    ```html
    <script src="script.js"></script>
    ```

     script  标签默认行为（不带defer或async属性）会阻止文档解析，相关脚本会**立即加载并执行**。脚本执行顺序和 script 标签出现的顺序一致。测试示例[script](./examples/script.html)

    “立即”指的是在渲染该  script  标签时，就立即加载并执行脚本，此时终端该标签之下的文档解析，直到脚本加载并执行完成，再继续后面的文档解析。

2. 带有 `async` 属性

    `async` 属性是html5新特性(IE10+)。

    ```html
    <script async src="script.js"></script>
    ```

    `async` 表示异步加载js(不阻塞文档解析)，并且异步执行。脚本执行顺序是**乱序**的。测试示例[script-async](./examples/script-async.html)

    加载和渲染后续文档元素的过程将和 `script.js` 的加载与执行并行进行（异步）。

    NOTE: 通过脚本异步插入的 script 标签达到的效果和带`async`属性的 script 标签是一样的

3. 带有 `defer` 属性

    ```html
    <script defer src="script.js"></script>
    ```

    `defer` 表示会推迟脚本的执行，并且不阻塞文档解析，其执行如同脚本放在 `</body>` 之前。如果脚本放在`<head>`中，会更早的下载，且不用担心被其他脚本推迟下载事件。

    加载解析后续文档元素的过程将和 `script.js` 的加载并行进行（异步），但是 `script.js` 的执行要在所有元素解析完成之后，并且在 `DOMContentLoaded` 事件触发之前完成（会延迟此事件的触发）。测试示例[script-defer](./examples/script-defer.html)

    同时，带有`defer`的脚本彼此之间，能保证其执行顺序。

    **注意：**`DOMContentLoaded` 事件必须等待其所属 script 之前的样式表加载解析完成才会触发。

    而 `window` 对象上的 `onload` 事件在所有文件包括样式表，图片等其他资源全部下载完毕后才触发。

4. 同时带有 `async`, `defer` 属性

    ```html
    <script async defer src="myscript.js"></script>
    ```

    效果同 `async`。测试示例[script-async-and-defer](./examples/script-async-and-defer.html)

概括来讲，就是这两个属性都会使 script 标签异步加载，然而执行的时机是不一样的。如下图

![script 加载执行时序](./img/script.jpg)

蓝色线代表网络读取，红色线代表执行时间，这俩都是针对脚本的；绿色线代表 HTML 解析。

此图告诉我们以下几个要点：

- `defer` 和 `async` 在网络读取（下载）这块儿是一样的，都是异步的（相较于 HTML 解析）
- 它俩的差别在于脚本下载完之后何时执行，显然 `defer` 是最接近我们对于应用脚本加载和执行的要求的
- 关于 `defer`，此图未尽之处在于它是按照加载顺序执行脚本的，这一点要善加利用
- `async` 则是一个乱序执行的主，反正对它来说脚本的加载和执行是紧紧挨着的，所以不管你声明的顺序如何，只要它加载完了就会立刻执行
- 仔细想想，`async` 对于应用脚本的用处不大，因为它完全不考虑依赖（哪怕是最低级的顺序执行），不过它对于那些可以不依赖任何脚本或不被任何脚本依赖的脚本来说却是非常合适的，最典型的例子：Google Analytics

理解了，就方便记忆、使用了。

## 性能分析

![script-async](./img/script-async.jpg)
![script-defer](./img/script-defer.jpg)

**小扩展**

尝试做性能分析：为什么一再强调将css放在头部，将js文件放在尾部？

假如我们将js放在header，js将阻塞解析dom，dom的内容会影响到First Paint，导致First Paint延后。所以说我们会将js放在后面，以减少First Paint的时间，但是不会减少DOMContentLoaded被触发的时间。

## 关于 `document.write`

将一个文本字符串写入一个由 `document.open()` 打开的文档流

因为 `document.write` 需要向文档流中写入内容，所以，若在一个已关闭（例如，已完成加载）的文档上调用 `document.write`，就会自动调用 `document.open`，**这将清空该文档的内容**。

```html
<script>
document.write(`<script src="js/f.js"><\/script>`);
</script>
```

详细过程：

[example](./examples/document-write.html)

- 如果页面在loading状态，则按照自上而下的顺序依次解析script，遇到write直接输出当前位置（如在head 内则输出到 body 顶部）。
- 如果在`DOMContentLoaded`或`load`事件的回调函数中，当文档加载完成，则会先清空文档（自动调用`document.open()`），再把参数写入`body`内容的开头。有的同学说将document.open=function(){}是不是可以避免，结论是No。
- 如果在异步引入的js中运行`document.write()`，运行完后，最好手动关闭文档写入（`document.close()`）。

> **注意：**在有`deferred` 或 `asynchronous` 属性的 script 中，`document.write` 会被忽略，控制台会显示 "A call to document.write() from an asynchronously-loaded external script was ignored" 的报错信息。
>
> **注意：**在 Edge 中，在 [`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) 内部调用 `document.write` 多于一次时会引发错误 SCRIPT70: Permission denied。
>
> **注意：**从 Chrome 55 开始，Chrome（可能）不会运行通过 `document.write()` 注入的`<script>`，以防止使用 2G 连接的用户找不到 HTTP 缓存。前往[此链接](https://developers.google.cn/web/updates/2016/08/removing-document-write)查看这种情况发生需要满足的条件。
>
> 如果js是异步引入的（加async或者动态加入的），里面的document.write因安全原因是无法工作的。"Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened."

执行顺序和普通的 script 标签没有区别。即使你插入的标签带有`async`或`defer`，其行为也是没有区别的。

其他

- 现代浏览器资源存在并行下载限(制通常为 6 个)，启用 http2 可以多路复用

## 实现动态加载 js

```js
// import {loadJs, loadCss} from '@deepjs/load';

let doc;
let domHead;

if (typeof document !== 'undefined') {
  doc = document;
  domHead = doc.querySelector('head') || doc.querySelector('body');
}

// const s = doc.getElementsByTagName('script')[0];

export function load({tag, getDomTag, ...attributes}) {
  return new Promise((resolve, reject) => {
    if (!doc)
      return reject(new Error(`load source fail: can not execute code from non browser environment`));
    if (!domHead)
      return reject(new Error(`load source fail: document not exist head && body tag`));

    const isExists = Boolean(doc.querySelector(getDomTag()));
    if (isExists) return resolve({code: 0, message: '资源已存在'});

    const source = doc.createElement(tag);
    Object.entries(attributes).forEach(([attribute, value]) => {
      source.setAttribute(attribute, value);
    });
    source.onload = () => {
      resolve({code: 1, message: '资源加载成功'});
    };
    source.onerror = (error) => {
      reject(error);
    };
    // s.parentNode.insertBefore(s1, s);

    domHead.appendChild(source);
  })
}

export function loadJs(sourceUrl, obj = {}) {
  // 默认是同步加载，同步模式又称阻塞模式
  // 同步加载流程是瀑布模型，异步加载流程是并发模型。
  const options = {
    src: sourceUrl,
    // async: false, // 异步加载
    // defer: false, // 延迟加载
    // crossOrigin: 'anonymous', // 默认不要开启，因为开启后，如果服务端不配合 CORS 设置，会导致无法正常加载（特别是第三方脚本）
    ...obj,
    tag: 'script',
    getDomTag() {
      return `script[src="${sourceUrl}"]`;
    },
  }
  return load(options);
}

export function loadCss(sourceUrl, obj = {}) {
  const options = {
    href: sourceUrl,
    ...obj,
    rel: 'stylesheet',
    tag: 'link',
    getDomTag() {
      return `link[href="${sourceUrl}"]`;
    },
  }
  return load(options);
}
```

## 经典问题

- css资源的加载，不会阻塞DOM树解析，但会阻塞渲染
- js资源的加载，会阻塞DOM树的构建和渲染，除非设置了 script 标签的异步属性
- 放在head中会在解析DOM树和渲染页面前就加载，并阻塞页面
- js正常情况下加载完就会立即执行，在js脚本中只能访问当前`<script>`以上的DOM，脚本执行结束后再继续解析DOM。
- js执行引擎和页面渲染是由不同的线程来执行，但这两者是互斥的，也就是说js执行过程是无法构建DOM和渲染页面的
- html 与 js 是否并行下载？
- 是js的下载阻塞了页面的渲染还是js的执行阻塞了页面的渲染，还是两者都会阻塞页面
- script标签放在head中与放在body中，是影响了js的下载开始时间还是执行开始时间
- css，图片以及一些其它的外部资源的下载是否与html，js的下载并行
- js，css 加载和执行过程是否会阻塞 html 解析、渲染？其他资源呢

资源（css,js,img等）的加载都是并行的，浏览器尝试将所有外部资源下载并行化，尽快的完成，但需要考虑并发的数量。

## 提示

深入理解 script 加载与执行机制，对性能提升，加载器实现非常重要

参考：

- 红皮书
- [是js的加载阻塞了页面的渲染还是js的执行阻塞了页面的渲染？](https://www.zhihu.com/question/61309490)
- [Script标签和脚本执行顺序](http://pij.robinqu.me/Browser_Scripting/Document_Loading/ScriptTag.html)
- https://segmentfault.com/a/1190000000515181
- https://segmentfault.com/q/1010000000640869
- [浅谈script标签的defer和async](https://juejin.im/entry/5a7ad55ef265da4e81238da9)
- [DOMContentLoaded与load的区别](https://www.cnblogs.com/caizhenbo/p/6679478.html)
- https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded
- [[译]页面生命周期：DOMContentLoaded, load, beforeunload, unload解析](https://github.com/fi3ework/blog/issues/3)
- [全面理解document.write()](https://segmentfault.com/a/1190000007958530)
- [MDN document.write](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/write)
- [document.write知多少](https://segmentfault.com/a/1190000006197157)

性能分析

使用 `<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>` 可优化资源加载 crossorigin属性必须，不然资源会加载两次

- https://web.dev/efficiently-load-third-party-javascript
- https://web.dev/use-lighthouse-for-performance-budgets/
- https://www.cdnplanet.com/blog/faster-google-webfonts-preconnect/
- https://web.dev/codelab-optimize-third-party-javascript/

https://github.com/marcelduran/webpagetest-api

sudo npm i -g webpagetest
webpagetest test https://m.mishifeng.com -k A.29c6fe1119c29af09a9171fdea280e1a

https://css-tricks.com/use-webpagetest-api/#single-point-of-failure

```js
var WebPageTest = require('WebPageTest')
var wpt = new WebPageTest('https://www.webpagetest.org/', 'your-api-key')
wpt.runTest('https://css-tricks.com', {
  connectivity: 'Cable',
  location: 'Dulles:Chrome',
  firstViewOnly: false,
  runs: 1,
  video: true
}, function processTestRequest(err, result) {
  console.log(err || result)
})


wpt.getTestStatus('160814_W7_960', function processTestStatus(err, result) {
  console.log(err || result)
})

wpt.runTest('https://css-tricks.com', {
  connectivity: 'Cable',
  location: 'Dulles:Chrome',
  firstViewOnly: false,
  runs: 1,
  pollResults: 5,
  video: true
}, function processTestResult(err, result) {
  // First view — use `repeatView` for repeat view
  console.log('Load time:', result.data.average.firstView.loadTime)
  console.log('First byte:', result.data.average.firstView.TTFB)
  console.log('Start render:', result.data.average.firstView.render)
  console.log('Speed Index:', result.data.average.firstView.SpeedIndex)
  console.log('DOM elements:', result.data.average.firstView.domElements)

  console.log('(Doc complete) Requests:', result.data.average.firstView.requestsDoc)
  console.log('(Doc complete) Bytes in:', result.data.average.firstView.bytesInDoc)

  console.log('(Fully loaded) Time:', result.data.average.firstView.fullyLoaded)
  console.log('(Fully loaded) Requests:', result.data.average.firstView.requestsFull)
  console.log('(Fully loaded) Bytes in:', result.data.average.firstView.bytesIn)

  console.log('Waterfall view:', result.data.runs[1].firstView.images.waterfall)
})
```
