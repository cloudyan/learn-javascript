# babel-polyfill 和 babel-runtime 的区别

更多 babel相关，参考 [learn-babel](https://github.com/cloudyan/learn-babel)

- babel-polyfill 会做兼容运行环境中并没有实现的一些方法。
- babel-runtime 是将es6编译成es5去执行。使用es6的语法编写，最终会通过babel-runtime编译成es5。也就是说，不管浏览器是否支持ES6，只要是ES6的语法，它都会进行转码成ES5。所以就有很多冗余的代码。
- babel-polyfill 是通过向全局对象和内置对象的prototype上添加方法来实现的。比如运行环境中不支持`Array.prototype.find` 方法，引入polyfill, 我们就可以使用es6方法来编写了，但是缺点就是会造成全局空间污染。
- babel-runtime 不会污染全局对象和内置对象的原型，比如说我们需要Promise，我们只需要`import Promise from 'babel-runtime/core-js/promise'`即可，这样不仅避免污染全局对象，而且可以减少不必要的代码。

【综上】虽然 babel-runtime 可以解决 babel-polyfill中的避免污染全局对象，但是它自己也有缺点的，比如我现在有100个文件甚至更多的话，就需要一个个文件加import Promise from 'babel-runtime/core-js/promise',为解决这一问题，引入了babel-plugin-transform-runtime。避免手动引入多个文件的import，并且它还做了公用方法的抽离。比如说有100个模块都使用promise，但是promise的polyfill仅仅存在1份。 这就是babel-plugin-transform-runtime插件的作用。

## transform-runtime和babel-runtime的区别

babel-plugin-transform-runtime插件依赖babel-runtime，babel-runtime是真正提供runtime环境的包；

也就是说transform-runtime插件是把js代码中使用到的新原生对象和静态方法转换成对runtime实现包的引用，举个例子如下：

## transform-runtime插件的功能

把代码中的使用到的ES6引入的新原生对象和静态方法用babel-runtime/core-js导出的对象和方法替代

当使用generators或async函数时，用babel-runtime/regenerator导出的函数取代（类似polyfill分成regenerator和core-js两个部分）

把Babel生成的辅助函数改为用babel-runtime/helpers导出的函数来替代（babel默认会在每个文件顶部放置所需要的辅助函数，如果文件多的话，这些辅助函数就在每个文件中都重复了，通过引用babel-runtime/helpers就可以统一起来，减少代码体积）

babel-plugin-transform-runtime 的配置一些选项

babel-runtime 就是一个提供了regenerator、core-js和helpers的运行时库。transform-runtime在.babelrc里配置的时候，还可以设置helpers、polyfill、regenerator这三个开关，以自行决定runtime是否要引入对应的功能。

【注意1】：建议不要直接使用babel-runtime，因为transform-runtime依赖babel-runtime，大部分情况下都可以用transform-runtime达成目的。
【注意2】：由于runtime不会污染全局空间，所以实例方法是无法工作的（因为这必须在原型链上添加这个方法，这是和polyfill最大的不同） ，比如：


> https://github.com/umijs/father

#### target

配置是 node 库还是 browser 库，只作用于语法层。

* Type: `"node" | "browser"`
* Default: `"browser"`

如果为 `node`，兼容到 node@6；如果为 `browser`，兼容到 `['last 2 versions', 'IE 10']`，所以肯定会是 es5 的语法。

参考：

- https://juejin.cn/post/6844903735341088776
- [Polyfill 方案过去、现在和未来](https://github.com/sorrycc/blog/issues/80)
- [babel详解（五）-polyfill和runtime](https://blog.liuyunzhuge.com/2019/09/04/babel%E8%AF%A6%E8%A7%A3%EF%BC%88%E4%BA%94%EF%BC%89-polyfill%E5%92%8Cruntime/)
  - http://kangax.github.io/compat-table/es6/
- [babel详解（七）:配置文件](https://blog.liuyunzhuge.com/2019/09/09/babel%E8%AF%A6%E8%A7%A3%EF%BC%88%E4%B8%83%EF%BC%89-%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6/)
- polyfill.io
  - https://polyfill.alicdn.com/polyfill.min.js
  - http://polyfill.alicdn.com/modern/polyfill.min.js
