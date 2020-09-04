# ES2017

- async/await (Generator 函数的语法糖)
  - 引入异步迭代器（asynchronous iterators）
  - `await`可以和`for...of`循环一起使用，以串行的方式运行异步操作
- Object.values()
- Object.entries() 只输出属性名非 Symbol 值的属性
  - 遍历对象的属性
  - 将对象转为真正的Map结构
  - Object.create方法的第二个参数添加的对象属性（属性p），如果不显式声明，默认是不可遍历的
- Object.fromEntries() 是 Object.entries()的逆操作
  - 该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象。
  - 配合URLSearchParams对象，将查询字符串转为对象
- String padding: 字符串补全长度的功能
  - padStart()
  - padEnd()
- 函数参数列表结尾允许逗号
- Object.getOwnPropertyDescriptors() 返回指定对象所有自身属性（非继承属性）的描述对象。
  - 主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。
- ShareArrayBuffer和Atomics对象，用于从共享内存位置读取和写入


```js
async function process(array) {
  for await (let i of array) {
    doSomething(i);
  }
}
```

```js
const obj = Object.create({}, {p: {value: 42}});
Object.values(obj) // []

const obj = Object.create({}, {p:
  {
    value: 42,
    enumerable: true
  }
});
Object.values(obj) // [42]

Object.values('foo')
// ['f', 'o', 'o']
```

```js
let obj = { one: 1, two: 2 };
for (let [k, v] of Object.entries(obj)) {
  console.log(
    `${JSON.stringify(k)}: ${JSON.stringify(v)}`
  );
}
// "one": 1
// "two": 2

const obj = { foo: 'bar', baz: 42 };
const map = new Map(Object.entries(obj));
map // Map { foo: "bar", baz: 42 }
```

自己实现Object.entries方法，非常简单。

```js
// Generator函数的版本
function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

// 非Generator函数的版本
function entries(obj) {
  let arr = [];
  for (let key of Object.keys(obj)) {
    arr.push([key, obj[key]]);
  }
  return arr;
}
```


```js
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }

// 例一
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);

Object.fromEntries(entries)
// { foo: "bar", baz: 42 }

// 例二
const map = new Map().set('foo', true).set('bar', false);
Object.fromEntries(map)
// { foo: true, bar: false }



Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
// { foo: "bar", baz: "qux" }
```
