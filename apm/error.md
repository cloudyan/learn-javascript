# 错误异常捕获

## 未捕获的错误

未捕获的错误不仅是显示在命令行里的警告信息，本质上说明了代码在某些场景的没考虑到和不可靠

- 关于错误提示
  - 非 Promise（同步）错误未捕获
    - `Uncaught Error: <msg>`
  - Promise 错误（异步）未捕获
    - `Uncaught (in promise) Error: <msg>` (browser)
    - `UnhandledPromiseRejectionWarning: Error: <msg>` (node:29493)
- 任何没有被 tryCatch 语句处理的错误都会在 window 对象上触发 error 事件。
  - Promise 例外，详见 `unhandledrejection`
- 当 JavaScript 运行时错误（包括语法错误）发生时，window 会触发一个 ErrorEvent 接口的 error 事件，并执行 window.onerror()。
- 当一项资源（如`<img>`或`<script>`）加载失败，加载资源的元素会触发一个 Event 接口的 error 事件，并执行该元素上的 onerror()处理函数。这些 error 事件不会向上冒泡到 window，不过（至少在 Firefox 中）能被单一的 window.addEventListener (en-US)捕获。
- 当 Promise 被 reject 且没有 reject 处理器的时候，会触发 `unhandledrejection` 事件；
  - 这可能发生在 window 下，但也可能发生在 Worker 中。 这对于调试回退错误处理非常有用。
- 当加载自不同域的脚本中发生语法错误时，为避免信息泄露（参见[bug 363897](https://bugzilla.mozilla.org/show_bug.cgi?id=363897)），语法错误的细节将不会报告，而代之简单的 "Script error.", 参见 https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#notes。
  - 在某些浏览器中，通过在`<script>`使用`crossorigin`属性并要求服务器发送适当的 CORS HTTP 响应头，该行为可被覆盖。

加载一个全局的 error 事件处理函数可用于自动收集错误报告。

### 错误监控维度

- 常规错误捕获 `onerror` 捕获同步错误，可收集报错堆栈
  - 任何没有被 try/catch 语句处理的错误都会在 window 对象上触发 error 事件
  - 包含 setTimeout 等内部的错误
  - 错误发生，会导致代码执行中止（后续代码不再执行），任意此类错误都要重视
  - 若该函数返回 true，则阻止执行默认事件处理函数。
- Promise 错误捕获 `unhandledrejection`
  - 包括 `Promise`
- 资源加载错误捕获 使用 `addEventListener` error，兼容性参见 https://www.quirksmode.org/dom/events/error.html
  - image source
  - css source
  - script source
  - css source
  - iframe source
- 数据请求错误捕获
  - ajax 请求
  - fetch 请求
- iframe 错误捕获
- 语法错误是无法被捕获的，throw 后可以捕获，但会终止代码执行
- [跨域错误 `Script error.` 处理](https://www.alibabacloud.com/help/zh/doc-detail/88579.htm)
  - server: `Access-Control-Allow-Origin: *`
  - client: `crossorigin="anonymous"`
- tryCatch 只能捕获同步错误
  - 有语法错误，JS 解释器停止执行当前代码块，也就没办法被 catch 住，一般语法错误在开发阶段/或者用工具检测来处理

sentry 通过 tryCatch 的方式 wrap 了一些关键函数，使得这些函数里的报错能够捕获，具体参见 \_instrumentTryCatch

## 错误类型

- js_error JS 错误
  - onerror 语法错误
  - unhandledrejection 未使用 catch 处理的 Promise 错误
  - 如果不需要监控某类错误的话，可以通过配置 filters 来实现
    - `filters: [{type: /^unhandledrejection$/}]`
- resource_error 资源加载错误
  - link_error
  - img_error
  - script_error
  - iframe_error 暂不支持
    - 注: 404 是一个 HTTP 状态码，它只包含在服务器发送给浏览器的响应中，而不包含在 javascript 可访问的 DOM 中（window 或 document 对象）。
    - 这意味着虽然可以收集状态代码并采取适当的行动，但只能在您的 javascript 收到响应时这样做，使用 ajax 来检测
- api_error HTTP 请求错误
  - xhr
  - fetch
- websocket_error

手动调用上报

- notify 测试
- notifyError 手动上报错误

错误捕获标识

- `handled: false` 未捕获的错误, 手动捕获设为 true

## 错误公参

错误相关的辅助信息需要采集哪些

## SDK

- device
- error
- event
- http
- performance
- request
- utils

## 关于 try...catch

ECMA-262 第 3 版引入了 try...catch 语句

- catch 块会接收到一个包含错误信息的对象。
  - 即使在 catch 块中不使用错误对象，也必须为它定义名称。
  - 错误对象中暴露的实际信息因浏览器而异，但至少包含保存错误消息的 message 属性。（唯一通用？name 呢）
    - message: 错误信息的文本描述
  - ECMA-262 也指定了定义错误类型的 name 属性，目前所有浏览器中都有这个属性。
    - 错误名称，一个未定义变量是 `ReferenceError`。
  - 在大多数环境中有其他非标准属性，被广泛使用和支持的一个是: stack
    - stack: 当前调用栈, 关于导致错误的嵌套调用序列，用于调试目的。
- 只要代码中包含了 finally 子句，无论 try 或 catch 语句块中包含什么样的代码——甚至 return 语句（return 会被忽略），finally 一定会执行。
- try...catch 的使用，永远应该放在你的控制范围之内，而不应该防范未知的错误
  - 比如 `json.a.b.c === 2` 在 try 中就可以直接写，重点在于左边是否等于 2，而非左边是否有值

ECMA-262 定义了下列 8 种错误类型：

- Error
- InternalError
- EvalError
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError

## 异常处理和错误处理是两个不同的概念

异常是不可避免的，例如数据库挂了，网络错误，你虽然知道有可能，但是不知道何时发生，这些异常你需要捕捉或者传给上层。

而错误处理，则是一些基本的判定，可以从代码级别避免其发生，可预知可推测，如果发生了，不是系统问题，而是你的程序有 bug 了。

## 监控指标

- 实时大盘
- JS 异常
- API 请求
- 页面性能
- 资源异常
- 页面访问
- 自定义查询

### 数据指标维度

- 错误监控 error
  1. JS 错误
     1. JavaScript 语法错误
     2. Promise 错误
  2. 资源加载错误（js,css,image,iframe）
  3. 接口请求错误
- 性能监控 performance
  - 参考 sentry 指标 (Event ID && Event Duration)
    - browser - cache
    - browser - connect
    - browser - DNS
    - browser - request
    - browser - response
    - browser - unloadEvent
    - resource.script - /xxx/xx.js
    - resource.link - /xxx/xx.css
    - mark - tracing-init
    - browser - domContentLoadedEvent
    - paint - first-paint
    - paint - first-contentful-paint
    - browser - loadEvent
  - Web Vitals(全部指标)
  - 基础性能指标 base
    1. 上次页面卸载耗时
    2. 连接耗时
    3. 重定向耗时
    4. 请求耗时
    5. 获取首字节耗时 (TTFB)
    6. 响应读取耗时
    7. Dom 解析耗时
    8. 脚本执行耗时
    9. Dom 渲染耗时
    10. 首次可交互时间
    11. 页面完整加载时间
    12. 白屏时间
  - 资源加载 resource 13. 资源加载耗时(script, css, image) `window.performance.getEntriesByType('resource')`
  - 渲染指标 paint, 参看下文渲染指标文档
    - TTFB(Time To First Byte) : 首字节时间 (web-vitals)
    - FP (First Paint) : 首次绘制 (w3c...)
    - FID (First Input Delay) : 首次输入/交互延迟 (web-vitals)
    - FCP (First Contentful Paint) : 首次内容绘制 (lighthouse/web-vitals/w3c...)
    - TTI (Time to Interactive) : 交互时间 (lighthouse)
    - SI (Speed Index) : 速度指数 (lighthouse)
    - TBT (Total Blocking Time) : 总阻塞时间 (lighthouse)
    - LCP (Large Contentful Paint) : 最大内容绘制 (lighthouse/web-vitals)
    - CLS (Cumulative Layout Shift) : 累积布局偏移 (lighthouse/web-vitals)
    - ~~FMP (First Meaningful Paint): 首次有意义的绘制~~ (lighthouse 已弃, => LCP)
    - ~~FCI (First CPU Idle) : 首次 CPU 空闲~~ (lighthouse 已弃, => TBT+TTI)

参考

- [GlobalEventHandlers.onerror](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onerror)
- [unhandledrejection](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/unhandledrejection_event)
- [try...catch](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch)
- [QuirksMode 列出的各浏览器对 onError 的支持情况](https://www.quirksmode.org/dom/events/error.html)
- [Worker.onerror](https://developer.mozilla.org/en-US/docs/Web/API/Worker/onerror)
- http://rapheal.sinaapp.com/2014/11/06/javascript-error-monitor/
- https://dashenquan.yuque.com/docs/share/6417d568-e053-4b1c-a8c5-daec1523ed80?# 《错误监控》
- [移动运维监控](https://sls.console.aliyun.com/lognext/app/mobilAPM), SLS、UC 岳鹰联合出品移动应用线上监控平台
  - [阿里云日志服务-前端监控](https://help.aliyun.com/document_detail/300011.html)
  - [接入前端监控数据](https://help.aliyun.com/document_detail/300009.htm)
  - [日志服务学习路径](https://help.aliyun.com/learn/learningpath/log.html)
- [lighthouse-performance](https://web.dev/lighthouse-performance/)
- [让前端监控数据采集更高效](https://juejin.cn/post/6844903826256822279)
- [【编译篇】AST 实现函数错误的自动上报](https://juejin.cn/post/6888470833237327879)
- [JavaScript 启动性能瓶颈分析与解决方案](https://zhuanlan.zhihu.com/p/25221314)
- [聊聊白屏度量，阿里是怎么监控前端白屏的？](https://mp.weixin.qq.com/s/q1oXKJCAW7NQjaF0MP3vuA)
- [7 天打造前端性能监控系统](https://fex.baidu.com/blog/2014/05/build-performance-monitor-in-7-days/)

其他文档参考

- 渲染指标文档
  - TODO: [Fast load times](https://web.dev/fast/)
  - TODO: [Web Vitals](https://web.dev/learn-web-vitals/)
  - [w3c paint-timing](https://github.com/w3c/paint-timing)
  - [web-vitals](https://web.dev/vitals/)
  - [lighthouse-performance](https://web.dev/lighthouse-performance/)
- [User Timing API](https://w3c.github.io/user-timing/)
- [Long Tasks API](https://w3c.github.io/longtasks/)
- [Element Timing API](https://wicg.github.io/element-timing/)
- [Navigation Timing API](https://w3c.github.io/navigation-timing/)
- [Resource Timing API](https://w3c.github.io/resource-timing/)
- [Server timing](https://w3c.github.io/server-timing/)
- [使用性能 API 快速分析 web 前端性能](https://segmentfault.com/a/1190000004010453)
- [让前端监控数据采集更高效](https://juejin.cn/post/6844903826256822279)
- https://github.com/fingerprintjs/fingerprintjs
- https://advancedweb.hu/how-to-avoid-uncaught-promise-errors-in-javascript/
- [Chrome 新的默认 Referrer-Policy : strict-origin-when-cross-origin](https://cloud.tencent.com/developer/article/1748911)
  - `>=` chrome@85 默认策略 `Referrer-Policy: strict-origin-when-cross-origin`
- [同站 和 同源 你理解清楚了么？](https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247490440&idx=1&sn=c28829962c39293fe7e51fd11fa85e73&source=41#wechat_redirect)
  - 同站 same-site
  - 同源 same-origin (Origin 是协议,主机名和端口的组合)
    - 跨域 cross-origin

## 报警邮件 or 钉钉

可以设置错误匹配规则，超过阈值，通过邮件或钉钉通知相关开发者。
