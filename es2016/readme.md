# ES2016

- 引入数组 `includes()` 方法
- `a ** b` 指数运算符，它与 `Math.pow(a, b)` 相同。

`includes()`

用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回true，否则返回false。

没有该方法之前，我们通常使用数组的`indexOf`方法，检查是否包含某个值。`indexOf`方法有两个缺点:

- 一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于`-1`，表达起来不够直观。
- 二是，它内部使用严格相等运算符（`===`）进行判断，这会导致对`NaN`的误判。

```js
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true

if (arr.indexOf(el) !== -1) {
  // ...
}
[NaN].indexOf(NaN)
// -1

// 模拟 include 方法
const contains = (() =>
  Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(el => el === value)
)();
contains(['foo', 'bar'], 'baz'); // => false
```

TIPS: 另外，Map 和 Set 数据结构有一个`has`方法，需要注意与`includes`区分。

- Map 结构的`has`方法，是用来查找键名的，比如`Map.prototype.has(key)`、`WeakMap.prototype.has(key)`、`Reflect.has(target, propertyKey)`。
- Set 结构的`has`方法，是用来查找值的，比如`Set.prototype.has(value)`、`WeakSet.prototype.has(value)`。
