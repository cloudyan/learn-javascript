# vs 深入对比

深入对比核心差异，不同的机制、原理或实现目标

- [x] [`for...in` vs `for...of`](../es6/17.for-of#forof-vs-forin)
- [x] setTimeout vs [requestAnimationFrame](../webapi/request-animation-frame)
- [x] [deno vs nodejs](https://github.com/cloudyan/deno-vs-node)
- [x] [react vs vue](https://github.com/cloudyan/react-vs-vue)
  - todo
- [x] [npm vs yarn](./npm-vs-yarn.md)
- event loop
  - [x] [macrotask vs microtask](../docs/event-loop)
- [x] [throttle vs debounce](./throttle-vs-debounce.md)
- [ ] 类实现 ES5 vs ES6
- [ ] LCP vs FMP
- [ ] IOC vs AOP
- [ ] CommonJS vs AMD
- [x] DOM vs BOM
- [x] [rebase vs merge](https://github.com/cloudyan/learn-git/blob/master/docs/rebase-vs-merge.md)
- [ ] uni-app mpvue taro rax
  - 编译时 vs 运行时
- [script] [async vs defer](../docs/2.script/readme.md)
- [ ] CommonJS AMD ES6
- [ ] [rollup vs webpack](./rollup-vs-webpack.md)
- [ ] babel-polyfill vs transform-runtime
- [ ] babel core-js/library vs core-js/modules
- [ ] prefetch vs preload
  - Preload 当前页面关键资源
  - Prefetch 可视化区域的`<link>`标签
  - dns-prefetch preconnect prerender
  - https://segmentfault.com/a/1190000011065339
- [ ] pwa vs pha
- [ ] native白屏 vs webview白屏
- http https http/1.0 http/1.1 http/2 http/3
  - [ ] [http vs https](./http-vs-https.md)
  - [ ] http1.1 vs http2 http3
- [ ] 外部DSL vs 内部DSL
- [ ] DSL vs GPL
- [webpack]
  - CommonsChunkPlugin vs SplitChunksPlugin
  - filename vs chunkFilename
  - hash chunkhash contenthash
    - https://cloud.tencent.com/developer/article/1435638
  - module chunk bundle
    - https://www.cnblogs.com/kwzm/p/10314438.html
    - module：就是js的模块化webpack支持commonJS、ES6等模块化规范，简单来说就是你通过import语句引入的代码。
    - chunk: chunk是webpack根据功能拆分出来的，包含三种情况：
      1. 你的项目入口（entry）
      2. 通过import()动态引入的代码
      3. 通过splitChunks拆分出来的代码
      chunk包含着module，可能是一对多也可能是一对一。
    - bundle：bundle是webpack打包之后的各个文件，一般就是和chunk是一对一的关系，bundle就是对chunk进行编译压缩打包等处理之后的产出。
- [ ] xhr vs fetch
- [ ] Zepto vs jQuery 异同
- [ ] [jQuery] 过滤 vs 查找
- [ ] [jQuery/Zepto] attr vs prop
- [x] dll vs externals
- [ ] [css] 100% vs 100vh
- [ ] [useLayoutEffect vs useEffect
  - 最新React的useEffect与useLayoutEffect执行机制剖析
  - https://segmentfault.com/a/1190000023396433?utm_source=tag-newest
- [ ] rem vs vw
- [ ] CSR vs SSR
- [event-loop] browser vs nodejs
  - https://blog.csdn.net/qq_39989929/article/details/89109937
  - https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
- [ ] [Object.create(null) vs {}
  - 空对象 `{}` 不够空，相当于 Object.create(Object.prototype)
  - https://juejin.cn/post/6844903733432680456
- [ ] encodeURIComponent vs encodeURI vs escape
