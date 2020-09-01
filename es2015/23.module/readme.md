# 模块

- 模块加载及引用
  - cjs -> esm
  - package.json
    - 指定type字段为module，该目录里面的 JS 脚本，就被解释用 ES6 模块。
    - 如果没有type字段，或者type字段为commonjs，则.js脚本会被解释成 CommonJS 模块。
    - .mjs文件总是以 ES6 模块加载，.cjs文件总是以 CommonJS 模块加载，.js文件的加载取决于package.json里面type字段的设置。
    - ES6 模块与 CommonJS 模块尽量不要混用
- Nodejs 如何处理 ES6 模块

## CommonJs 模块加载 ES6 模块

CommonJS 的`require()`命令不能加载 ES6 模块，会报错，只能使用`import()`这个方法加载。

```js
// 此代码可以在 CommonJS 模块中运行。
(async () => {
  await import('./my-app.mjs');
})();
```

`require()`不支持 ES6 模块的一个原因是，它是同步加载，而 ES6 模块内部可以使用顶层`await`命令，导致无法被`require()`同步加载。

## ES6 模块加载 CommonJS 模块

ES6 模块的`import`命令可以加载 CommonJS 模块，但是只能整体加载，不能只加载单一的输出项。

```js
// 正确
import packageMain from 'commonjs-package';

// 报错
import { method } from 'commonjs-package';
```

这是因为 ES6 模块需要支持静态代码分析，而 CommonJS 模块的输出接口是module.exports，是一个对象，无法被静态分析，所以只能整体加载。

加载单一的输出项，可以写成下面这样。

```js
import packageMain from 'commonjs-package';
const { method } = packageMain;
```

## 同时支持两种格式的模块

```json
// package.json
"exports"：{
  "require": "./index.js",
  "import": "./esm/wrapper.js"
}
```

参考：


- [Node.js 如何处理 ES6 模块](http://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html)
