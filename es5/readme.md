# es5

深入了解 js 特性

2009 年发布的改进版本 ES5，引入了

- Object.create()
- Object.defineProperty()
- getters
- setters
- 严格模式 `'use strict';`
- JSON 对象
- 新的数组方法, `.map()`, `.filter()` 等

- ES5 引入严格模式 `'use strict';`, 主要有以下限制:
  - 变量必须声明后再使用
  - 函数的参数不能有同名属性，否则报错
  - 不能使用`with`语句
  - 不能对只读属性赋值，否则报错
  - 不能使用前缀 0 表示八进制数，否则报错
  - 不能删除不可删除的属性，否则报错
  - 不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]`
  - eval不会在它的外层作用域引入变量
  - eval和arguments不能被重新赋值
  - arguments不会自动反映函数参数的变化
  - 不能使用`arguments.callee`
  - 不能使用`arguments.caller`
  - 禁止`this`指向全局对象
  - 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
  - 增加了保留字（比如`protected`、`static`和`interface`）

常见问题

执行上下文(execute context) EC
  理解：代码执行的环境
  时机：代码正式执行之前会进入到执行环境
  工作：

  1. 创建变量对象
     1. 变量
     2. 函数及函数的参数
     3. 全局：window
     4. 局部：抽象的但是确实存在
  2. 确认 this 的指向
     1. 全局：this --> window
     2. 局部：this --> 调用其的对象
  3. 创建作用域链
     1. 父级作用域链 + 当前的变量对象


## `Object.defineProperty()`

参考

- 若川 https://juejin.cn/post/6994976281053888519
- MDN https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

还有一个定义多个属性的API：Object.defineProperties(obj, props) (ES5)

`Object.defineProperty` 涉及到比较重要的知识点。

在ES3中，除了一些内置属性（如：`Math.PI`），对象的所有的属性在任何时候都可以被修改、插入、删除。

在`ES5`中，我们可以设置属性是否可以被改变或是被删除——在这之前，它是**内置属性的特权**。

`ES5`中引入了**属性描述符**的概念，我们可以通过它对所定义的属性有更大的控制权。这些**属性描述符**（特性）包括：

> value——当试图获取属性时所返回的值。
> writable——该属性是否可写。
> enumerable——该属性在for in循环中是否会被枚举。
> configurable——该属性是否可被删除。
> set()——该属性的更新操作所调用的函数。
> get()——获取属性值时所调用的函数。

另外，数据描述符（其中属性为：`enumerable`，`configurable`，`value`，`writable`）与存取描述符（其中属性为`enumerable`，`configurable`，`set()`，`get()`）之间是有互斥关系的。在定义了`set()`和`get()`之后，描述符会认为存取操作已被定义了，其中再定义`value`和`writable`会引起错误。

以下是`ES3`风格的属性定义方式：

```js
var person = {};
person.legs = 2;
```

以下是等价的ES5通过数据描述符定义属性的方式：

```js
var person = {};
Object.defineProperty(person, 'legs', {
  value: 2,
  writable: true,
  configurable: true,
  enumerable: true
});
```

其中， 除了value的默认值为undefined以外，其他的默认值都为false。这就意味着，如果想要通过这一方式定义一个可写的属性，必须显示将它们设为true。

或者，我们也可以通过ES5的存储描述符来定义：

```js
var person = {};
Object.defineProperty(person, 'legs', {
  set:function(v) {
    return this.value = v;
  },
  get: function(v) {
    return this.value;
  },
  configurable: true,
  enumerable: true
});
person.legs = 2;
```

这样一来，多了许多可以用来描述属性的代码，如果想要防止别人篡改我们的属性，就必须要用到它们。此外，也不要忘了浏览器向后兼容`ES3`方面所做的考虑。例如，跟添加`Array.prototype`属性不一样，我们不能再旧版的浏览器中使用`shim`这一特性。

另外，我们还可以（通过定义`nonmalleable`属性），在具体行为中运用这些描述符：

```js
var person = {};
Object.defineProperty(person, 'heads', {value: 1});
person.heads = 0; // 0
person.heads; // 1  (改不了)
delete person.heads; // false
person.heads // 1 (删不掉)
```
