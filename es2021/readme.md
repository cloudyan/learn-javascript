# ES2021

- 2021-06-22 正式通过 ES2021

参考 [ES2021](https://h3manth.com/ES2021) 获批

- String.prototype.replaceAll() 为了方便字符串的全局替换
- Promise.any and AggregateError
  - 可以理解为 Promise.all 的相反操作
- 逻辑赋值操作符, `a || (a = b)` 可以简写 `a ||= b`, 类比于 `+=`
  - `&&=`, `||=`, `??=`
- 数字分隔符
  - `1_23 === 123`
- WeakRefs and FinalizationRegistry 对象
  - `WeakRef` 实例可以作为对象的弱引用


类似的 API

API | 描述 | 时间
=== | ==== | ===
Promise.all  | 当有一个rejected就短路   | ES2015
Promise.race | 当有一个rejected或fulfilled就短路 | es2015
Promise.allSettled | 不会短路          | ES2020
Promise.any  | 当有一个fulfilled就短路  | ES2021

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

## Promise.any && AggregateError

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

允许数值字面量中间包含不连续_ ，以提高可读性。

> 注意: 分隔符不能在尾部和头部，只能在数字之间，只允许一个下划线作为数字分隔符，不可连续。
> 分隔符不影响数值的类型转换值，也无法在字符串转数值时被识别。

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

## WeakRefs && FinalizationRegistry 对象

- TC39-[weakrefs](https://github.com/tc39/proposal-weakrefs)
- MDN-[WeakRef](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakRef#Avoid_where_possible)

```js
const target = { name: 'koofe' }
const ref = new WeakRef(target);
// ref and target aren't the same

// deref 返回当前实例的WeakRef对象所绑定的target对象，如果该target对象已被GC回收则返回undefined
let obj = ref.deref();
if (obj) {
  console.log(obj.name); // koofe
}
// ref and target is same ===
console.log(target === obj) // true

// Creating a new registry
const registry = new FinalizationRegistry(heldValue => {
  // ....
});

registry.register(myObject, "some value", myObject);
// ...some time later, if you don't care about `myObject` anymore...
registry.unregister(myObject);
```
