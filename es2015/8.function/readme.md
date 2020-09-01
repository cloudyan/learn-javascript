# Function

- 函数参数
  - 默认值
    - 参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。
    - 与解构赋值结合使用
  - 函数的 length 属性
    - 指定了默认值后，length属性将失真(返回没有指定默认值的参数个数)
    - length属性的含义是，该函数预期传入的参数个数
    - 设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了
    - 不包括 rest 参数
  - 作用域 context
    - 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。
    - 等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。
  - 利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误
- rest 参数
- 严格模式
  - ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。
- name 属性 返回该函数的函数名
  - 如果将一个匿名函数赋值给一个变量，ES5 的`name`属性，会返回空字符串，而 ES6 的`name`属性会返回实际的函数名。
  - `Function`构造函数返回的函数实例，`name`属性的值为`anonymous`
  - `bind`返回的函数，`name`属性值会加上`bound`前缀
- 箭头函数
  - 注意点
    - 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。
    - 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。
    - 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替。
    - 不可以使用`yield`命令，因此箭头函数不能用作 `Generator` 函数。
  - 不适用场合
    - 定义对象的方法，且该方法内部包括this
    - 需要动态this的时候，也不应使用箭头函数
  - 嵌套
- 尾调用优化（指某个函数的最后一步是调用另一个函数）
  - 尾调用（Tail Call）是函数式编程的一个重要概念
  - 尾调用不一定出现在函数尾部，只要是最后一步操作即可。
- 尾递归

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

指定某参数不得省略

```js
function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

foo()
// Error: Missing parameter

// （注意函数名throwIfMissing之后有一对圆括号），这表明参数的默认值不是在定义时执行，而是在运行时执行。
// 如果参数已经赋值，默认值中的函数就不会运行。
```

rest 参数

arguments对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用Array.prototype.slice.call先将其转为数组

```js
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
```

箭头函数

```js
let foo = () => ({}) // 返回对象要包裹括号，否则返回 undefined 而非对象
console.log(foo())

let bar = () => []
console.log(bar())
```

箭头函数不适用场合

```js
const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  }
}

var button = document.getElementById('press');
button.addEventListener('click', () => {
  this.classList.toggle('on');
});
```

尾调用优化

```js
// 情况一
function f(x){
  let y = g(x);
  return y;
}

// 情况二
function f(x){
  return g(x) + 1;
}

// 情况三
function f(x){
  g(x);
}

// 属于
function f(x) {
  if (x > 0) {
    return m(x)
  }
  return n(x);
}
```
