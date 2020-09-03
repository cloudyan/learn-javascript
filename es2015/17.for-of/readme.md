# for ... of

## 遍历器（Iterator）

遍历器是一种接口，为各种不同的数据结构提供统一的访问机制

任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）

- Iterator 的作用有三个：
  - 一是为各种数据结构，提供一个统一的、简便的访问接口；
  - 二是使得数据结构的成员能够按某种次序排列；
  - 三是 ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供`for...of`消费

ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性

原生具备 Iterator 接口的数据结构如下：

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

模拟 next 方法

```js
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
```

类部署 Iterator 接口的写法

```js
class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator]() { return this; }

  next() {
    var value = this.value;
    if (value < this.stop) {
      this.value++;
      return {done: false, value: value};
    }
    return {done: true, value: undefined};
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
  console.log(value); // 0, 1, 2
}
```

```js
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
// 或者
NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];

[...document.querySelectorAll('div')] // 可以执行了
```

也可以使用 while 循环

```js
var $iterator = ITERABLE[Symbol.iterator]();
var $result = $iterator.next();
while (!$result.done) {
  var x = $result.value;
  // ...
  $result = $iterator.next();
}
```

## `for...of` vs `for...in`

- `for...in`
  - `for...in`循环主要是为遍历对象而设计的，不适用于遍历数组
  - 场景
    - 枚举对象（需要 hasOwnProperty(key) 过滤原型对象）
    - 枚举数组（但无法过滤 数组本身的属性，可以使用 forEach 替代（但无法中途 break or return））
    - IE9+ 也支持字符串遍历
- `for...of`
  - 场景
    - 遍历数组
    - 迭代字符串
    - 可以遍历[类]数组（只要部署了遍历器接口就 OK），普通对象不能直接使用，会报错
      - 迭代`arguments`类数组对象（）
      - 迭代`NodeList`这类DOM集合
      - 迭代类型数组 `new Uint8Array([0x00, 0xff])`
      - 迭代Map Set Generators

```js
Object.prototype.objCustom = function() {};
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';

for (let i in iterable) {
  console.log(i); // 0, 1, 2, "foo", "arrCustom", "objCustom"
}

for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); // 0, 1, 2, "foo"
  }
}

for (let i of iterable) {
  console.log(i); // 3, 5, 7
}
```

遍历字符串

```js
let s = '𠮷a';
s.codePointAt(0).toString(16) // "20bb7"
s.codePointAt(2).toString(16) // "61"

// 会将汉字拆了
for (let ch in s) {
  console.log(s[ch].codePointAt(0).toString(16));
}

// 可以正确分割
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}
```

Do not reuse generators
不要重用生成器

Generators should not be re-used, even if the `for...of` loop is terminated early, for example via the `break` keyword. Upon exiting a loop, the generator is closed and trying to iterate over it again does not yield any further results.

生成器不应该重用，即使`for...of`循环的提前终止，例如通过`break`关键字。在退出循环后，生成器关闭，并尝试再次迭代，不会产生任何进一步的结果。

```js
const gen = (function *(){
  yield 1;
  yield 2;
  yield 3;
})();
for (const o of gen) {
  console.log(o);
  break;  // Closes iterator
}

// The generator should not be re-used, the following does not make sense!
for (const o of gen) {
  console.log(o); // Never called.
}
```

参考：

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
