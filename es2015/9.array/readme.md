# Array

- 扩展运算符 spread（好比 rest 参数的逆运算）
  - 将一个数组转为用逗号分隔的参数序列，主要用于函数调用
  - 支持后面放置表达式
  - 注意，只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错
  - 可以将字符串转为真正的数组，能够正确识别四个字节的 Unicode 字符（split('') 不行）
- Array.from()
- Array.of()
- 数组实例的 copyWithin()
- 数组实例的 find() 和 findIndex()
- 数组实例的 fill()
- 数组实例的 entries()，keys() 和 values()
- 数组实例的 includes()
- 数组实例的 flat()，flatMap()
- 数组的空位
  - 空位 vs `undefined`
    - 空位不是`undefined`，一个位置的值等于`undefined`，依然是有值的。
    - 空位是没有任何值，`in`运算符可以说明这一点。
  - ES5 对空位的处理，很不一致
  - ES6 则是明确将空位转为 `undefined`，
    - 但 `copyWithin`, `for...of` 会处理空位
    - 其他会将空位处理成 `undefined`
- Array.prototype.sort() 的排序稳定性
  - ES2019 明确规定，Array.prototype.sort()的默认排序算法必须稳定。

```js
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
