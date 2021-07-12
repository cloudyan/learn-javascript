# ES2021

参考 [ES2021](https://h3manth.com/ES2021) 获批

- String.prototype.replaceAll() 为了方便字符串的全局替换
- Promise.any() 可以理解为 Promise.all 的相反操作
- 逻辑赋值操作符, `a || (a = b)` 可以简写 `a ||= b`
  - `&&=`, `||=`, `??=`
- 数字分隔符
  - `1_23 === 123`
- WeakRefs
  - `WeakRef` 实例可以作为对象的弱引用

## replaceAll

```js
// String.prototype.replaceAll(searchValue, replaceValue)

'x'.replace('', '_');
// → '_x'

'xxx'.replace(/(?:)/g, '_');
// → '_x_x_x_'

'xxx'.replaceAll('', '_');
// → '_x_x_x_'
```

## Promise.any

```js
Promise.any([
  fetch('https://v8.dev/').then(() => 'home'),
  fetch('https://v8.dev/blog').then(() => 'blog'),
  fetch('https://v8.dev/docs').then(() => 'docs')
]).then((first) => {
  // Any of the promises was fulfilled.
  console.log(first);
  // → 'home'
}).catch((error) => {
  // All of the promises were rejected.
  console.log(error);
});
```

## 逻辑赋值操作符

```js
a ||= b;

// 与 a ||= b 等价
a || (a = b);
// 与 a ||= b 等价
if (!a) {
  a = b;
}



a ??= b;

// 与 a ??= b 等价
a ?? (a = b);

// 与 a ??= b 等价
if (a === null || a === undefined) {
  a = b;
}

// 注意
a = a || b; // 与 a ||= b 不等价
a = a && b; // 与 a &&= b 不等价
a = a ?? b; // 与 a ??= b 不等价
```

逻辑赋值运算符只会在条件成立的情况下进行赋值

## 数字分隔符

```js
1_000_000_000           // Ah, so a billion
101_475_938.38          // And this is hundreds of millions

let fee = 123_00;       // $123 (12300 cents, apparently)
let fee = 12_300;       // $12,300 (woah, that fee!)
let amount = 12345_00;  // 12,345 (1234500 cents, apparently)
let amount = 123_4500;  // 123.45 (4-fixed financial)
let amount = 1_234_500; // 1,234,500


0.000_001 // 1 millionth
1e10_000  // 10^10000 -- granted, far less useful / in-range...
0xA0_B0_C0;
```

## WeakRefs


```js
const ref = new WeakRef({ name: 'koofe' });
let obj = ref.deref();
if (obj) {
  console.log(obj.name); // koofe
}
```
