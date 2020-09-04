# ES2020

- 新的基本数据类型`BigInt`（大整数）
- 链判断运算符 （optional chaining operator）`?.`
  - 三种用法
  - 常见用法
  - 错误用法
- Null 判断运算符 `??`
  - 行为类似`||`，但是只有运算符左侧的值为`null`或`undefined`时，才会返回右侧的值
  - 运算优先级问题
- import() dynamic import
- Promise.allSettled
- 顶层对象 globalThis 对象
- 规范 `for-in` 枚举顺序
- import.meta

[ES2020](https://github.com/tc39/proposal-global) 在语言标准的层面，引入`globalThis`作为顶层对象。也就是说，任何环境下，`globalThis`都是存在的，都可以从它拿到顶层对象，指向全局环境下的`this`。

ES2020 引入了一种新的数据类型 BigInt（大整数），来解决这个问题，这是 ECMAScript 的第八种数据类型。

BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。

```js
// 错误的写法
const firstName = message.body.user.firstName;

// 正确的写法
const firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';

// 链判断运算符
// 直接在链式调用的时候判断，左侧的对象是否为null或undefined。
// 如果是的，就不再往下运算，而是返回undefined
const firstName = message?.body?.user?.firstName || 'default';

const fooValue = myForm.querySelector('input[name=foo]')?.value
iterator.return?.()

// 老式浏览器的表单可能没有checkValidity这个方法
if (myForm.checkValidity?.() === false) {
  // 表单校验失败
  return;
}

// 三种用法
obj?.prop // 对象属性
obj?.[expr] // 同上
func?.(...args) // 函数或对象方法的调用

let hex = "#C0FFEE".match(/#([A-Z]+)/i)?.[1];
```

常见用法

```js
a?.b
// 等同于
a == null ? undefined : a.b

a?.[x]
// 等同于
a == null ? undefined : a[x]

a?.b()
// 等同于
a == null ? undefined : a.b()

a?.()
// 等同于
a == null ? undefined : a()

a?.[++x]
// 等同于
a == null ? undefined : a[++x]

delete a?.b
// 等同于
a == null ? undefined : delete a.b

(a?.b).c
// 等价于
(a == null ? undefined : a.b).c
```

报错场合

```js
// 构造函数
new a?.()
new a?.b()

// 链判断运算符的右侧有模板字符串
a?.`{b}`
a?.b`{c}`

// 链判断运算符的左侧是 super
super?.()
super?.foo

// 链运算符用于赋值运算符左侧
a?.b = c
```

右侧不得为十进制数值

为了保证兼容以前的代码，允许`foo?.3:0`被解析成`foo ? .3 : 0`，因此规定如果`?.`后面紧跟一个十进制数字，那么`?.`不再被看成是一个完整的运算符，而会按照三元运算符进行处理，也就是说，那个小数点会归属于后面的十进制数字，形成一个小数。


??有一个运算优先级问题，它与&&和||的优先级孰高孰低。现在的规则是，如果多个逻辑运算符一起使用，必须用括号表明优先级，否则会报错。


参考：

- [BigInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
