# CommonJS 、 AMD 和 ES6

目前，通行的 JavaScript 规范可以分为三种，

- [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1)
- [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)
- [ES6](http://www.ecma-international.org/ecma-262/6.0/)

## 模块规范

CommonJS
从2009年 node.js 出现以来，CommonJS 模块系统逐渐深入人心。CommonJS 的一个模块就是一个脚本文件，通过 require 命令来加载这个模块，并使用模块暴漏出的接口。加载时执行是 CommonJS 模块的重要特性，即脚本代码在 require 的时候就会执行模块中的代码。这个特性在服务端是没问题的，但如果引入一个模块就要等待它执行完才能执行后面的代码，这在浏览器端就会有很大的问题了。因此出现了 AMD 规范，以支持浏览器环境。

AMD
AMD 是 “Asynchronous Module Definition” 的缩写，意思就是“异步模块定义”。它采用异步加载方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。最有代表性的实现则是 [requirejs](https://requirejs.org/)。

ES6
不同于 CommonJS 和 AMD 的模块加载方案，ES6 在 JavaScript 语言层面上实现了模块功能。它的设计思想是，尽量的静态化，使得编译时就能确定模块的依赖关系。在遇到模块加载命令 import 时，不会去执行模块，而是只生成一个引用。等到真的需要用到时，再到模块里面去取值。这是和 CommonJS 模块规范的最大不同。

## 循环依赖解法

- 对于使用 webpack 进行项目构建的项目，发现推荐使用 webpack 插件 [circular-dependency-plugin](https://github.com/aackerman/circular-dependency-plugin) 来帮助你检测项目中存在的所有循环依赖，尽早发现潜在的循环依赖可能会免去未来很大的麻烦。
