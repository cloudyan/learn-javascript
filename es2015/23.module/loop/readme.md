# 循环引用

CommonJS 输入的是被输出值的拷贝，不是引用。

由于 CommonJS 模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。
所以，输入变量的时候，必须非常小心。

```js
var a = require('a'); // 安全的写法
var foo = require('a').foo; // 危险的写法

exports.good = function (arg) {
  return a.foo('good', arg); // 使用的是 a.foo 的最新值
};

exports.bad = function (arg) {
  return foo('bad', arg); // 使用的是一个部分加载时的值
};
```

上面代码中，如果发生循环加载，`require('a').foo`的值很可能后面会被改写，改用`require('a')`会更保险一点。

ES modules

nodejs@13.2.0 之前想要在node中使用ES modules，需要添加`--experimental-modules`

```bash
# < nodejs@13.2.0
node --experimental-modules ./complex/index.js

# >= nodejs@13.2.0
node ./complex/index.js
```
