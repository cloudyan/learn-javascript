# 从输入 URL 地址到看到页面，中间都经历了啥

- URL 解析，域名解析。涉及到 DNS 寻址的过程，获取对应的服务器 IP 地址
- 缓存检查。首先检查强缓存，其次是协商缓存。
  - 如果强缓存生效，则直接从浏览器缓存获取资源
  - 如果强缓存失效，则浏览器向服务器发起一个 http 请求，当然这中间还有一个 tcp 三次握手的一个过程。建立连接后，服务器检查资源是否更改，如果没有更改，则返回 304 告诉
    浏览器读取缓存，否则响应 200 并发送资源文件给浏览器
- 拿到资源文件后，浏览器开始解析并构建 dom 树和 cssom 树。这中间又涉及两种过程。 + 如果有 js 脚本，那么 cssom 树的构建会阻塞 js 的执行，js 的执行会阻塞 dom 树的构建 + 如果没有 js 脚本，那么 cssom 树的构建和 dom 树的构建是并行的，当然大部分网页都会包含 js 脚本。
  \_ 有了 cssom 树和 dom 树后，就开始构建 render tree。render tree 并不是和 dom 树--对应的，render tree 并不包含 display:none 等元素，以及 style，link，head 这些标签。
- 构建完 render tree，布局（Layout，也叫重排）阶段会为每个节点计算精确的位置和大小信息。
- 布局阶段完成后，就是绘制阶段（paint），将各个节点绘制到屏幕上，页面就呈现出来了。

### 关于 URL 解析

URL 解析涉及到一个 URL 编码的问题，假设有这么一个 url：`http://www.baidu.com/api/?name=测试&from=http://www.google.com/`。这个 URL 在解析的时候会出现问题。因此需要对 URL 进行编码

- encodeURI / decodeURI。对整个 URL 的编码，处理空格/中文。encodeURI(url)
- encodeURIComponent / decodeURIComponent。主要对传递的参数信息编码。
  `http://www.baidu.com/api/?name=${encodeURIComponent('测试')}&from=${encodeURIComponent('http://www.google.com/')}`

====== 以下内容抄自谷歌开发者文档，了解即可，最好熟悉 ======

### 构建对象模型

这个过程包括文档对象模型(DOM)以及 CSS 对象模型(CSSOM)。

html 文档和 css 都需要经过：字节 -> 字符 -> 令牌 -> 节点 -> 对象模型(即 DOM 或者 CSSOM)，这一系列过程。

浏览器每次处理 HTML 标记时，都会完成以上所有步骤，然后构建 DOM 树。这个过程就是 `Parse HTML`。可以在浏览器开发者工具中 `Performance` 看到这个过程的时间开销

CSS 的处理也是需要经过上述一系列流程，然后构建 CSSOM 树。这个过程就是 `Recalculate Style`。可以在 `Performance` 中看到该过程开销。

CSSOM 为何具有树结构？

> 为页面上的任何对象计算最后一组样式时，浏览器都会先从适用于该节点的最通用规则开始（例如，如果该节点是 body 元素的子项，则应用所有 body 样式），然后通过应用更具体的规则（即规则“向下级联”）以递归方式优化计算的样式。

TIPS：由于浏览器是递归的构建 DOM 树和 CSSOM 树的，这个递归的过程也是很耗时的，因此在写 html 和 css 时，尽量不要嵌套太深的层级

### 渲染树构建、布局及绘制

- DOM 树和 CSSOM 树合并后形成渲染树(render tree)。
- 渲染树只包含渲染网页所需的节点，最终输出的是所有可见的内容。比如不包含 display:none 的元素，以及 script，meta，link 标记等。注意 visibility: hidden 还是会出现在渲染树中的，因为元素还是会占位置
- 布局(Layout)阶段计算每个对象的精确位置和大小，这一阶段也称为“自动重排”
- 最后一步是绘制(Paint)阶段，使用最终渲染树将像素渲染到屏幕上，这一阶段也称为“栅格化”

注意，浏览器开发者工具中，`Performance` 中的 `Layout` 事件时间线包含了渲染树构建以及位置和尺寸计算的时间

### CRP 关键渲染路径步骤总结

- 1.处理 HTML 标记并构建 DOM 树。
- 2.处理 CSS 标记并构建 CSSOM 树。
- 3.将 DOM 与 CSSOM 合并成一个渲染树。
- 4.根据渲染树来布局，以计算每个节点的几何信息。
- 5.将各个节点绘制到屏幕上

TIPS：如果 DOM 或 CSSOM 被修改，只能再执行一遍以上所有步骤(摘抄自谷歌开发者文档)。

我的疑问：如果只是修改 dom 的字体颜色，应该只会触发 paint 阶段，不会触发 layout 吧。

### 阻塞渲染的 CSS

注意是阻塞渲染，阻塞渲染树的构建，不是阻塞 DOM 树构建。

- 默认情况下，CSS 被视为阻塞渲染的资源。浏览器将不会渲染任何已处理的内容，直至 CSSOM 构建完毕
- 可以通过媒体查询将一些 CSS 资源标记为不阻塞渲染。
- 浏览器会下载所有 CSS 资源，无论阻塞还是不阻塞
- CSS 是阻塞渲染的资源，需要将它尽早、尽快地下载到客户端，以便缩短首次渲染的时间。

看以下几个例子：

```html
<link href="style.css" rel="stylesheet" />
<link href="style.css" rel="stylesheet" media="all" />
<link href="portrait.css" rel="stylesheet" media="orientation:portrait" />
<link href="print.css" rel="stylesheet" media="print" />
```

- 1. 第一个声明阻塞渲染，适用于所有情况
- 2. 第二个声明和第一个声明效果等价
- 3. 第三个声明具有动态媒体查询，将在网页加载时计算。根据网页加载时设备的方向，portrait.css 可能阻塞渲染，也可能不阻塞渲染
- 4. 最后一个声明只在打印网页时应用，因此网页首次在浏览器中加载时，它不会阻塞渲染。

可以检查浏览器开发者工具，Network 中查看各个资源的优先级，阻塞渲染的 CSS 资源优先级最高，不阻塞渲染的 CSS 资源优先级最低。

**_ “阻塞渲染”仅是指浏览器是否需要暂停网页的首次渲染，直至该资源准备就绪。无论哪一种情况，浏览器仍会下载 CSS 资产，只不过不阻塞渲染的资源优先级较低罢了 _**

### JavaScript

默认情况下，JavaScript 也会阻止 DOM 构建和延缓网页渲染

当 HTML 解析器遇到一个 script 标记时，它会暂停构建 DOM，将控制权移交给 JavaScript 引擎；等 JavaScript 引擎运行完毕，
浏览器会从中断的地方恢复 DOM 构建。

**_如果是外部 JavaScript 文件，浏览器必须停下来，等待从磁盘、缓存或远程服务器获取脚本，这就可能给关键渲染路径增加数十至数千毫秒的延迟_**

JavaScript 在 DOM、CSSOM 和 JavaScript 执行之间引入了大量新的依赖关系，从而导致首次渲染延迟：

- 脚本在文档中的位置很重要。
- 当浏览器遇到一个 script 标记时，DOM 构建将暂停，直至脚本完成执行。
- JavaScript 可以查询和修改 DOM 与 CSSOM。
- JavaScript 执行将暂停，直至 CSSOM 就绪。因此 CSS 是会阻塞 js 的执行的，而 js 执行又会阻塞 dom 的构建。

**_“优化关键渲染路径”在很大程度上是指了解和优化 HTML、CSS 和 JavaScript 之间的依赖关系谱。_**

### script 标签的 async，defer 属性

默认情况下，所有 JavaScript 都会阻止解析器，但可以通过给外部 js 文件添加 async 或者 defer 异步关键字指示浏览器在等待脚本可用期间不阻止 DOM 构建，这样可以显著提升性能。

async 和 defer 的区别：

- defer。不阻塞 dom 构建，等到 DOM 解析完成，在 DOMContentLoaded 事件之前执行。

```html
<script defer src="https://xx/long.js"></script>
<script defer src="https://xx/small.js"></script>
```

long.js 和 small.js 并行下载，small.js 可能会先下载完成。但是 defer 特性，确保了脚本执行的相对顺序。small.js 必须等到 long.js 执行
结束才会被执行。

- asyn。不阻塞 dom 构建，async 脚本就是一个会在加载完成时立即执行的完全独立的脚本。DOMContentLoaded 事件可能会在 async 脚本前执行，也可能在其后执行。
