# 错误异常捕获

- 当JavaScript运行时错误（包括语法错误）发生时，window会触发一个ErrorEvent接口的error事件，并执行window.onerror()。
- 当一项资源（如`<img>`或`<script>`）加载失败，加载资源的元素会触发一个Event接口的error事件，并执行该元素上的onerror()处理函数。这些error事件不会向上冒泡到window，不过（至少在Firefox中）能被单一的window.addEventListener (en-US)捕获。
- 当Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件；这可能发生在 window 下，但也可能发生在 Worker 中。 这对于调试回退错误处理非常有用。
- 当加载自不同域的脚本中发生语法错误时，为避免信息泄露（参见[bug 363897](https://bugzilla.mozilla.org/show_bug.cgi?id=363897)），语法错误的细节将不会报告，而代之简单的"Script error."。
  - 在某些浏览器中，通过在`<script>`使用crossorigin属性并要求服务器发送适当的 CORS HTTP 响应头，该行为可被覆盖。

加载一个全局的error事件处理函数可用于自动收集错误报告。

- 常规错误捕获 `onerror` 捕获同步错误，可收集报错堆栈
  - 任何没有被 try/catch 语句处理的错误都会在 window 对象上触发 error 事件
  - 若该函数返回true，则阻止执行默认事件处理函数。
- 异步错误捕获 `unhandledrejection`
  - 包括 `Promise` `setTimeout`
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
- 语法错误是无法被捕获的，throw 后可以捕获
- 跨域错误 `Script error.` 处理
  - server: `Access-Control-Allow-Origin: *`
  - client: `crossorigin="anonymous"`
- tryCatch 只能捕获同步错误
  - 有语法错误，JS解释器停止执行当前代码块，也就没办法被catch住，一般语法错误在开发阶段/或者用工具检测来处理

sentry 通过 tryCatch 的方式 wrap 了一些关键函数，使得这些函数里的报错能够捕获，具体参见 _instrumentTryCatch

## 错误类型

- JavaScript执行错误
  - SyntaxError
  - ReferenceError
    - caught    手动捕获
    - uncaught  自动捕获
  - notify 测试
  - notifyError 手动上报错误
- resourceError 资源加载错误
  - silentResource 可关闭监控资源加载错误
- httpError HTTP 请求错误
  - silentHttp
- unhandledrejection 未使用 catch 处理的 Promise 错误
  - silentPromise
  - 如果不需要监控 unhandledrejection 的话，可以通过配置filters来实现
    - `filters: [{type: /^unhandledrejection$/}]`
- websocketError

## 错误公参

错误相关的辅助信息需要采集哪些



## 报警邮件 or 钉钉


参考

- [GlobalEventHandlers.onerror](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onerror)
- [unhandledrejection](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/unhandledrejection_event)
- [try...catch](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch)
- [QuirksMode列出的各浏览器对onError的支持情况](https://www.quirksmode.org/dom/events/error.html)
- [Worker.onerror](https://developer.mozilla.org/en-US/docs/Web/API/Worker/onerror)
- http://rapheal.sinaapp.com/2014/11/06/javascript-error-monitor/
- https://dashenquan.yuque.com/docs/share/6417d568-e053-4b1c-a8c5-daec1523ed80?# 《错误监控》
