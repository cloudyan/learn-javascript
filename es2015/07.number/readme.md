# Number

- 二进制和八进制表示法
- Number.isFinite(), Number.isNaN()
- Number.parseInt(), Number.parseFloat()
- Number.isInteger()
- Number.EPSILON
  - 极小的常量。根据规格，它表示 1 与大于 1 的最小浮点数之间的差 Math.pow(2, -52)。
- 安全整数和 Number.isSafeInteger()
- Math 对象的扩展
- 指数运算符

注意，由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。

如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，Number.isInteger可能会误判。

```js
// 超出精度，误判
Number.isInteger(3.0000000000000002) // true
Number.isFinite(3.0000000000000002)
// 误差范围设为 2 的-50 次方（即Number.EPSILON * Math.pow(2, 2)）
Number.EPSILON === Math.pow(2, -52) // true

// 安全整数
// JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true

Number.isSafeInteger = function (n) {
  return (typeof n === 'number' &&
    Math.round(n) === n &&
    Number.MIN_SAFE_INTEGER <= n &&
    n <= Number.MAX_SAFE_INTEGER);
}

// 注意
9007199254740993-1 === 9007199254740992-1
// true

// 这是因为，这个数超出了精度范围，导致在计算机内部，以 9007199254740992 的形式储存。
9007199254740993 === 9007199254740992
// true
```
