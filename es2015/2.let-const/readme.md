# 变量

- 不存在变量提升
- 暂时性死区
- 不允许重复声明
- 块级作用域 {}
  - 匿名 IIFE 写法（匿名立即执行函数表达式）(function() {}());
  - 函数表达式优先函数声明语句
- Object.freeze({})
  - 只将对象本身冻结
  - 如果将对象的属性也冻结（这样才彻底冻结）
- 声明变量的六种方法
- 顶层对象 globalThis 对象

为什么需要块级作用域？

```js
// 问题 1. 内层变量可能会覆盖外层变量
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}

f(); // undefined

// 问题 2：用来计数的循环变量泄露为全局变量
var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5

// 经典面试题: for 循环取 i（闭包解决）
// https://segmentfault.com/a/1190000003818163

```

冻结对象

```js
var constantize = obj => {
  Object.freeze(obj)
  Object.keys(obj).forEach((key, i) => {
    if (typeof obj[key] === 'object') {
      constantize(obj[key]);
    }
  })
}
```

顶层对象[globalThis 对象](https://es6.ruanyifeng.com/#docs/let#globalThis-%E5%AF%B9%E8%B1%A1)

ES2020 在语言标准的层面，引入globalThis作为顶层对象。也就是说，任何环境下，globalThis都是存在的，都可以从它拿到顶层对象，指向全局环境下的this。

垫片库[global-this](https://github.com/ungap/global-this)模拟了这个提案，可以在所有环境拿到globalThis。

```js
// 解析: https://mathiasbynens.be/notes/globalthis
(function() {
  if (typeof globalThis === 'object') return;
  Object.defineProperty(Object.prototype, '__magic__', {
    get: function() {
      return this;
    },
    configurable: true // This makes it possible to `delete` the getter later.
  });
  __magic__.globalThis = __magic__; // lolwat
  delete Object.prototype.__magic__;
}());

// Your code can use `globalThis` now.
console.log(globalThis);
```

最终版

```js
(function (Object) {
  typeof globalThis !== 'object' && (
    this ?
      get() :
      (Object.defineProperty(Object.prototype, '_T_', {
        configurable: true,
        get: get
      }), _T_)
  );
  function get() {
    this.globalThis = this;
    delete Object.prototype._T_;
  }
}(Object));
```
