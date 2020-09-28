# Array

- 扩展运算符 spread（好比 rest 参数的逆运算）
  - 将一个数组转为用逗号分隔的参数序列，主要用于函数调用
  - 支持后面放置表达式
  - 注意，只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错
  - 可以将字符串转为真正的数组，能够正确识别四个字节的 Unicode 字符（split('') 不行）
- Array.from() 用于将两类对象转为真正的数组
  - 类似数组的对象（array-like object, 如 arrayLike, arguments对象, NodeList对象）
  - 可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）
- Array.of() 用于将一组值，转换为数组
  - 主要目的是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
- 数组实例的 copyWithin()
  - Array.prototype.copyWithin(target, start = 0, end = this.length)
- 数组实例的 find() 和 findIndex()
- 数组实例的 fill()
- 数组实例的 entries()，keys() 和 values()
- 数组实例的 flat()，flatMap() 将嵌套的数组“拉平”
- 数组的空位
  - 空位 vs `undefined`
    - 空位不是`undefined`，一个位置的值等于`undefined`，依然是有值的。
    - 空位是没有任何值，`in`运算符可以说明这一点。
  - ES5 对空位的处理，很不一致
    - `forEach()`, `filter()`, `reduce()`, `every()` 和`some()`都会跳过空位
    - `map()`会跳过空位，但会保留这个值
    - `join()`和`toString()`会将空位视为`undefined`，而`undefined`和`null`会被处理成空字符串。
  - ES6 则是明确将空位转为 `undefined`
    - `Array.from()`, 扩展运算符 其他会将空位处理成 `undefined`
    - `copyWithin()` 会连空位一起拷贝
    - `fill()` 会将空位视为正常的数组位置
    - `for...of`循环也会遍历空位
    - `entries()`、`keys()`、`values()`、`find()`和`findIndex()`会将空位处理成`undefined`。
  - 由于空位的处理规则非常不统一，所以建议避免出现空位。

扩展运算符

```js
// 复制数组
const a1 = [1, 2];
const a2 = a1.concat();
a1.concat(a2, a2)

// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;

console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

function push(array, ...items) {
  array.push(...items);
}

function add(x, y) {
  return x + y;
}

const numbers = [4, 38];
add(...numbers) // 42

console.log((...[1, 2]))
// Uncaught SyntaxError: Unexpected number

console.log(...[1, 2])
// 1 2
```

替代函数的 apply 方法

```js
function f(...rest) {
  console.log(rest)
}
var args = [0, 1, 2];

// 不使用延展操作符
f.apply(null, args);

// 使用延展操作符
f(...args);


// ES5 的写法
Math.max.apply(null, args)

// ES6 的写法
Math.max(...args)

const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

const go1 = go()
console.log([...go1])   // [1, 2, 3] 同 for...of 生成器不应该重用
console.log([...go1])   // []

console.log([...go()])  // 不能重用
console.log([...go()])
```

Array.from()

```js
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

// console.log(...arrayLike) // 扩展运算符不能处理这个，Array.from 可以

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
console.log(arr1)

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
console.log(arr2)

// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p => {
  return p.textContent.length > 100;
});

// arguments对象
function foo() {
  var args = Array.from(arguments);

  // [...arguments]
  // ...
}

Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

// 将数组中布尔值为false的成员转为0。
Array.from([1, , 2, , 3], (n) => n || 0)
// [1, 0, 2, 0, 3]

// 返回各种数据的类型
function typesOf () {
  return Array.from(arguments, value => typeof value)
}
typesOf(null, [], NaN)
// ['object', 'object', 'number']

Array.from({ length: 2 }, () => 'jack')
// ['jack', 'jack']

function countSymbols(string) {
  return Array.from(string).length;
}
```

Array.of()

```js
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1

Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]

// 模拟实现
function ArrayOf(){
  return [].slice.call(arguments);
}
```

find && findIndex

这两个方法都可以发现`NaN`，弥补了数组的`indexOf`方法的不足

第二个参数，可以绑定回调函数中的 `this` 对象

```js
[NaN].indexOf(NaN)
// -1

[NaN].findIndex(y => Object.is(NaN, y))
// 0

function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
```

fill(target, startIndex, endIndex)

```js
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]

['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```

flat() && flatMap() 将数组拉平

```js
[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]

[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]

[1, 2, , 4, 5].flat()
// [1, 2, 4, 5]

// flat 转对象

```

数组的空位

```js
Array(3) // [, , ,]

0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false

let arr = [, ,];
for (let i in arr) {
  console.log(i);
}
for (let i of arr) {
  console.log(i);
}

console.log([,'a','b',,].copyWithin(2,0))
console.log([, ,])
console.log([, 1,])
console.log([, 1,].length === [1,1].length) // true
```

pk: in/includes/indexOf

```js
// in操作符针对的是key，而非value。
let arr = ['a','b','c'];
let arr2 = {a:'aaa', b:'bbb', c:'ccc'};

console.log('1：', 'a' in arr);
console.log('2：', 'aa' in arr);
console.log('3：', 2 in arr);
console.log('4：', 5 in arr);

console.log('5：', 'a' in arr2);
console.log('6：', 'aa' in arr2);

// indexOf includes 可用于字符串和数组

function inArray(v, arr){
  for (let i in arr) {
    if(arr[i] === v) return true;
  }
  return false;
}
```
