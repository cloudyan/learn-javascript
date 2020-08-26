# 解构赋值

- `模式匹配`
  - 解构失败，变量的值等于 `undefined`
  - 只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值
- 默认值
  - ES6 内部使用严格相等运算符（===）
  - 默认值为表达式，则惰性求值
- 对象的解构赋值可以取到继承的属性
- 可以对数组进行对象属性的解构
- `for of` vs `for in`

常见使用

```js
// 对象的解构赋值可以取到继承的属性
const obj1 = {};
const obj2 = { foo: 'bar' };
Object.setPrototypeOf(obj1, obj2);

const { foo } = obj1;
foo // "bar"

// 注意点
let obj = {a: 1, b: 2}
let a = 3

{a} = obj // error
({a} = obj);  // right
// JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。
// 只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。


// 圆括号
let {x: (c)} = {};  // 错误
[(b)] = [3];        // 正确
({ p: (d) } = {});  // 正确
```

Iterator 接口

```js
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
```

上面 fibs是一个 Generator 函数, 原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。
