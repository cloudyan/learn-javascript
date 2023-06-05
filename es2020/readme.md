# ES2020

- `BigInt`（大整数）第八种原始数据类型
- 链判断运算符 （optional chaining operator）`?.`
  - 三种用法
  - 常见用法
  - 错误用法
- Null 判断运算符 `??` (空值)
  - 行为类似 `||`，但是只有运算符左侧的值为`null`或`undefined`时，才会返回右侧的值
  - 这个运算符的一个目的，就是跟链判断运算符`?.`配合使用，为`null`或`undefined`的值设置默认值。
  - 运算优先级问题，与 `&&` `||`一起使用，必须用括号表明优先级，否则会报错
- import() dynamic import 运行时动态加载模块
- import.meta 提供了与宿主相关的模块元信息
- export 加强
- Promise.allSettled()
- 顶层对象 `globalThis` 对象
- 明确规范 `for-in` 的枚举顺序
  - 之前没规范定义顺序，尽管浏览器实现了一致的顺序，现在纳入 ES2020 的官方规范
- 导出模块的命名空间
- 新增 `String.prototype.matchAll()` 可以一次性取出所有匹配，返回的是一个遍历器

顶层对象[globalThis 对象](https://es6.ruanyifeng.com/#docs/let#globalThis-%E5%AF%B9%E8%B1%A1)

[ES2020](https://github.com/tc39/proposal-global) 在语言标准的层面，引入`globalThis`作为顶层对象。也就是说，任何环境下，`globalThis`都是存在的，都可以从它拿到顶层对象，指向全局环境下的`this`。

- 浏览器中是 `window`
- Node 中是 `global`
- web workers 中是 `self`

polyfill 垫片库[global-this](https://github.com/ungap/global-this)模拟了这个提案，可以在所有环境拿到 globalThis。

- https://github.com/es-shims/globalThis

```js
// 不支持小程序, 小程序内为 global
// 解析: https://mathiasbynens.be/notes/globalthis
(function () {
  if (typeof globalThis === "object") return;
  Object.defineProperty(Object.prototype, "__magic__", {
    get: function () {
      return this;
    },
    configurable: true, // This makes it possible to `delete` the getter later.
  });
  __magic__.globalThis = __magic__; // lolwat
  delete Object.prototype.__magic__;
})();

// Your code can use `globalThis` now.
console.log(globalThis);
```

最终版

```js
(function (Object) {
  typeof globalThis !== "object" &&
    (this
      ? get()
      : (Object.defineProperty(Object.prototype, "_T_", {
          configurable: true,
          get: get,
        }),
        _T_));
  function get() {
    this.globalThis = this;
    delete Object.prototype._T_;
  }
})(Object);
```

扩展

```js
(0, eval)("this");

// vs
eval("this");
```

Isn’t this equivalent to just `eval('this')`? Why the comma operator? 🤔

`eval(code)` is a “direct eval” and executes code in the current scope. `(0, eval)(code)` is an [indirect eval](https://2ality.com/2014/01/eval.html) and executes code in the global scope.

ES2020 引入了一种新的数据类型 BigInt（大整数），来解决这个问题，这是 ECMAScript 的第八种数据类型。

BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。

- 不支持小数，会报错
- 不能与普通数值进行混合运算
- 一元的求正运算符`+`, 报错，为了不破坏 asm.js
- 不带符号的右移位运算符`>>>` (BigInt 总是带有符号的)

```js
// BigInt 实战应用参看js版本[雪花算法](https://github.com/cloudyan/snowflake)

BigInt.parseInt("9007199254740993", 10);
// 9007199254740993n
```

链判断运算符

```js
// 错误的写法
const firstName = message.body.user.firstName;

// 正确的写法
const firstName =
  (message &&
    message.body &&
    message.body.user &&
    message.body.user.firstName) ||
  "default";

// 链判断运算符
// 直接在链式调用的时候判断，左侧的对象是否为null或undefined。
// 如果是的，就不再往下运算，而是返回undefined
const firstName = message?.body?.user?.firstName || "default";

const fooValue = myForm.querySelector("input[name=foo]")?.value;
iterator.return?.();

// 老式浏览器的表单可能没有checkValidity这个方法
if (myForm.checkValidity?.() === false) {
  // 表单校验失败
  return;
}

// 三种用法
obj?.prop; // 对象属性
obj?.[expr]; // 同上
func?.(...args); // 函数或对象方法的调用

let hex = "#C0FFEE".match(/#([A-Z]+)/i)?.[1];
```

常见用法

```js
a?.b;
// 等同于
a == null ? undefined : a.b;

a?.[x];
// 等同于
a == null ? undefined : a[x];

a?.b();
// 等同于
a == null ? undefined : a.b();

a?.();
// 等同于
a == null ? undefined : a();

a?.[++x];
// 等同于
a == null ? undefined : a[++x];

delete a?.b;
// 等同于
a == null
  ? undefined
  : delete a.b(a?.b).c(
      // 等价于
      a == null ? undefined : a.b
    ).c;
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

关于 `??`

- nullish: 一个变量是否为空。仅标识是否是 undefined, null
- falsely: JavaScript 中很多值都是 falsely。如 空字符串, 数字 0, undefined, null, false, NaN

`??`有一个运算优先级问题，它与`&&`和`||`的优先级孰高孰低。现在的规则是，如果多个逻辑运算符一起使用，必须用括号表明优先级，否则会报错。

动态 imports

```js
const baseModulePath = "./baseModules";
const btnImportModule = document.getElementById("btnImportModule");
let userList = [];

btnImportModule.addEventListener("click", async (e) => {
  const userModule = await import(`${baseModulePath}/users.js`);

  userList = userModule.getUsers();
});
```

## export 加强

导出模块的命名空间 https://github.com/tc39/proposal-export-ns-from

```js
// 之前支持这个
import * as utils from "./utils";

// 但(之前)不支持这个(现在支持了，通过 babel 可以更早的使用到最新的支持)
export * as utils from "./utils";

// 等同以下效果
import * as utils from "./utils";

export { utils };
```

String.prototype.matchAll()

```js
const string = "test1test2test3";
const regex = /t(e)(st(\d?))/g;

for (const match of string.matchAll(regex)) {
  console.log(match);
}
```

参考：

- [BigInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
