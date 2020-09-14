# Object

- 属性的简洁表示法，方法也可以
  - 属性的赋值器（setter）和取值器（getter），事实上也是采用这种写法
- 定义对象属性的两种方法
  1. 直接用标识符作为属性名
  2. 用表达式作为属性名（将表达式放在方括号之内）
- 属性名表达式
  - 使用字面量方式定义对象（使用大括号），ES5 中只能使用方法一（标识符）定义属性
  - 表达式还可以用于定义方法名。
  - 属性名表达式与简洁表示法，不能同时使用，会报错。
  - 属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串`[object Object]`
- 方法的 name 属性(返回函数名)
- 属性的可枚举性
- 属性遍历的 5 种方法
  - for ... in
  - Object.keys(obj)
  - Object.getOwnPropertyNames(obj)
  - Object.getOwnPropertySymbols(obj)
  - Reflect.ownKeys(obj)
- 以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。
  - 首先遍历所有数值键，按照数值升序排列。
  - 其次遍历所有字符串键，按照加入时间升序排列。
  - 最后遍历所有 Symbol 键，按照加入时间升序排列。
- super 关键字
  - 指向当前对象的原型对象
  - this 关键字总是指向函数所在的当前对象
- 对象的扩展运算符（ES2018 新增）
  - 解构赋值
  - 扩展运算符 等同于使用`Object.assign()`方法
  - 扩展运算符后面可以跟表达式
- Object.is() “Same-value equality”（同值相等）算法
  - 与 `===` 不同之处只有两个：一是`+0`不等于`-0`，二是`NaN`等于自身。
- Object.assign() 只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）
  - 会拷贝属性名为 `Symbol` 值的属性
  - 浅拷贝 vs 深拷贝
  - 可以处理数组

```js
// 方法一: 标识符
obj.foo = true;

// 方法二: 表达式
obj['a' + 'bc'] = 123;
```

name 属性

```js
const obj = {
  bar() {},
  get foo() {},
  set foo(x) {}
};
console.log(obj.bar.name)

obj.foo.name
// TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');
descriptor.get.name // "get foo"
descriptor.set.name // "set foo"

(new Function()).name // "anonymous"
var doSomething = function() {
  // ...
};
doSomething.bind().name // "bound doSomething"

const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
  [key1]() {},
  [key2]() {},
};
obj[key1].name // "[description]"
obj[key2].name // ""
```

```js
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj, proto);
obj.find() // "hello"

// 报错
const obj = {
  foo: super.foo
}

// 报错
const obj = {
  foo: () => super.foo
}

// 报错
const obj = {
  foo: function () {
    return super.foo
  }
}
// 目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法
// JavaScript 引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）

const proto = {
  x: 'hello',
  foo() {
    console.log(this.x);
  },
};

const obj = {
  x: 'world',
  foo() {
    super.foo();
  }
}

Object.setPrototypeOf(obj, proto);

obj.foo() // "world"
```

克隆一个对象

```js
typeof Object.assign(2) // "object"
Object.assign(undefined) // 报错
Object.assign(null) // 报错
let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true

const v1 = 'abc';
const v2 = true;
const v3 = 10;

const obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }

const v1 = 'abc';
const v2 = true;
const v3 = 10;

const obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
// 原因
Object(true) // {[[PrimitiveValue]]: true} 内部属性
Object(10)  //  {[[PrimitiveValue]]: 10}
Object('abc') // {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}

let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);

// 上面只是拷贝了对象实例的属性
// 如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的写法。
// 写法一
const clone1 = {
  __proto__: Object.getPrototypeOf(obj),
  ...obj
};

// 写法二
const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
);

// 写法三
const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)
// 写法一的__proto__属性在非浏览器的环境不一定部署，因此推荐使用写法二和写法三。
```

Object.is()

```js
// ES5 部署
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});
```
