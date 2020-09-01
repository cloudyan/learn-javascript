# Function

- 函数参数的默认值
  - 参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。
  - 与解构赋值结合使用
- 函数的 length 属性
  - 指定了默认值后，length属性将失真(返回没有指定默认值的参数个数)
  - length属性的含义是，该函数预期传入的参数个数
  - 设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了
- 作用域 context
  - 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。
  - 等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。

```js
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // 100

x = 100;
foo() // 101
```

下面两种写法有什么差别？

```js
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
```

函数的 length

```js
(function (a, b, c = 5) {}).length // 2

(function(...args) {}).length // 0

(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
```

作用域

```js
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2) // 2

// vs
let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // 1

// error
function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // ReferenceError: x is not defined
```

复杂的例子

```js
var x = 1;
function foo(x = 4, y = function() { console.log(x); x = 2; console.log(x); }) {
  var x = 3; // 不能使用 let
  y();
  console.log(x);
}

foo() // 3
console.log(x) // 1

// vs

var x = 1;
function foo(x = 4, y = function() { console.log(x); x = 2; console.log(x); }) {
  x = 3;
  y();
  console.log(x);
}

foo() // 3
console.log(x) // 1
```
