# Array

- 扩展运算符 spread（好比 rest 参数的逆运算）
  - 将一个数组转为用逗号分隔的参数序列，主要用于函数调用
  - 支持后面放置表达式
  - 注意，只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错
- Array.from()
- Array.of()
- 数组实例的 copyWithin()
- 数组实例的 find() 和 findIndex()
- 数组实例的 fill()
- 数组实例的 entries()，keys() 和 values()
- 数组实例的 includes()
- 数组实例的 flat()，flatMap()
- 数组的空位
- Array.prototype.sort() 的排序稳定性

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
```
