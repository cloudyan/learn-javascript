# vs 深入对比

深入对比核心差异，不同的机制、原理或实现目标

- [x] [`for...in` vs `for...of`](https://github.com/cloudyan/learn-javascript/tree/master/es2015/17.for-of#forof-vs-forin)
- [x] setTimeout vs [requestAnimationFrame](https://github.com/cloudyan/learn-javascript/tree/master/window/01.requestAnimationFrame)
- [x] [deno vs nodejs](https://github.com/cloudyan/deno-vs-node)
- [x] [react vs vue](https://github.com/cloudyan/react-vs-vue)
  - todo
- [ ] npm vs yarn
- event loop
  - [x] [macrotask vs microtask](https://github.com/cloudyan/learn-javascript/tree/master/docs/event-loop)
- [x] [throttle vs debounce](./throttle-vs-debounce.md)
- [ ] 类实现 ES5 vs ES6
- DOM vs BOM
- [rebase vs merge](https://github.com/cloudyan/learn-git/blob/master/docs/rebase-vs-merge.md)
- uni-app mpvue taro rax
  - 编译时 vs 运行时
- [script] async vs defer
- CommonJS AMD ES6
- rollup vs webpack
- vue vs react
- babel-polyfill vs transform-runtime
- babel core-js/library vs core-js/modules
- prefetch vs preload dns-prefetch preconnect prerender
  - https://segmentfault.com/a/1190000011065339
- pwa vs pha
- native白屏 vs webview白屏
- http1.1 vs http2 http3
- https vs http
- 外部DSL vs 内部DSL
- DSL vs GPL
- [vue] dll vs externals
- [webpack] module chunk bundle
  - module：就是js的模块化webpack支持commonJS、ES6等模块化规范，简单来说就是你通过import语句引入的代码。
  - chunk: chunk是webpack根据功能拆分出来的，包含三种情况：
    1. 你的项目入口（entry）
    2. 通过import()动态引入的代码
    3. 通过splitChunks拆分出来的代码
    4. chunk包含着module，可能是一对多也可能是一对一。
  - bundle：bundle是webpack打包之后的各个文件，一般就是和chunk是一对一的关系，bundle就是对chunk进行编译压缩打包等处理之后的产出。
- CommonsChunkPlugin vs SplitChunksPlugin
  - https://www.cnblogs.com/zhanyishu/p/9349576.html
  - https://zhuanlan.zhihu.com/p/26131812
- xhr vs fetch
- Zepto vs jQuery 异同
- [jQuery] 过滤 vs 查找
- [jQuery/Zepto] attr vs prop
- dll vs externals
