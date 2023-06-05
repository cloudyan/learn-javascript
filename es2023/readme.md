# ES2023

## 数组被修改时，返回副本

对 Array, TypedArray, 新方法不修改原数组

```js
T.prototype.toReversed() -> T
T.prototype.toSorted(compareFn) -> t
T.prototype.toSpliced(start, deleteCount, ...items) -> T
T.prototype.with(index, value) -> T


// with 示例
const array = [1, 2, 3];
const newArray = array.with(1, false);

// [1, false, 3]
console.log(newArray);
// 原数组不变 [1, 2, 3]
console.log(array);
```

## WeakMap 支持 Symbol 作为 key

WeakMap 原本只支持 object 类型的 key，现在支持了 Symbol 类型作为 key。

```js
const weak = new WeakMap();
weak.set(Symbol("symbol1"), {});
```

## Hashbang 语法

Hashbang 也叫 Shebang，是一个由井号和叹号构成的字符序列 `#!`，用来指定使用哪种解释器执行此文件：

在终端执行，没有 Hashbang 时，需要使用 node 指令才能执行：

```js
#!/usr/bin/env node
// hashbang.js
console.log("hashbang");

// nohashbang.js
console.log("no hashbang");
```

## 从尾部查找

涉及到两个函数 findLast / findLastIndex

```js
const array = [1, 2, 3];
array.findLast((n) => n.value % 2 === 1);
array.findLastIndex((n) => n.value % 2 === 1);
```
