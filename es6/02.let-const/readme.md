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
  - var function
  - let const import class
- 顶层对象 globalThis 对象
  - 参见 [ES2020](../../es2020/readme.md)
- var,let,const 的异同

类别 | var | let | const
--- | --- | --- | ---
变量提升 | √ | x | x
块级作用域 | x | √ | √
同一作用域不允许重复声明 | x | √ | √
TDZ 暂时性死区（声明之前不能使用） | x | √ | √
声明时必须初始化赋值 | x | x | √
不允许重复赋值（只读变量） | x | x | √

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
// 犀牛书 p187

// 返回一个函数组成的数组，他们的返回值是 0-9
function constfuncs() {
  var funcs = []
  for (var i = 0; i < 10; i++) {
    funcs[i] = function() {
      return i
    }
  }
  return funcs
}

var funcs = constfuncs(5)
funcs[5]() // 返回值是什么

// 经典 2 （p185）
function counter() {
  var n = 0;
  return {
    count: function() { return n++ },
    reset: function() { n = 0 }
  }
}

var c = counter()
var d = counter()

// 输出什么
c.count()
d.count()
c.reset()
c.count()
d.count()

// 问题 3
for (var i = 0; i < 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i*1000)
}
// 输出五个 5
// 原因是：延迟函数的回调在循环结束时才执行

for (var i = 0; i < 5; i++) {
  (function(){
    var j = i
    setTimeout(function timer() {
      console.log(j)
    }, i*1000)
  })()
}

for (var i = 0; i < 5; i++) {
  (function(j){
    setTimeout(function timer() {
      console.log(j)
    }, i*1000)
  })(i)
}
// 严格来说，闭包需要满足三个条件：【1】访问所在作用域；【2】函数嵌套；【3】在所在作用域外被调用
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

