# learn-javascript

[docs](./docs)

解决疑问，原理分析，常见用法，替代方案，常见坑等等

ES全称ECMAScript，ECMAScript是ECMA制定的标准化脚本语言。目前JavaScript使用的ECMAScript版本为[ECMA-417](https://ecma-international.org/publications/standards/Ecma-417.htm)。关于ECMA的最新资讯可以浏览 [ECMA news](https://www.ecma-international.org/news/index.html)查看。

ECMA规范最终由[TC39](https://github.com/tc39)敲定。TC39由包括浏览器厂商在内的各方组成，他们开会推动JavaScript提案沿着一条严格的发展道路前进。
从提案到入选ECMA规范主要有以下几个阶段：

- Stage 0: strawman——最初想法的提交。
- Stage 1: proposal（提案）——由TC39至少一名成员倡导的正式提案文件，该文件包括API事例。
- Stage 2: draft（草案）——功能规范的初始版本，该版本包含功能规范的两个实验实现。
- Stage 3: candidate（候选）——提案规范通过审查并从厂商那里收集反馈
- Stage 4: finished（完成）——提案准备加入ECMAScript，但是到浏览器或者Nodejs中可能需要更长的时间。

## ES2015 (ES6)

- let && const
- 解构赋值
- 扩展运算符
- 对象属性简写
- 箭头函数
- 函数参数默认值
- 模板字符串
- Set && Map
- Symbol
- Promise
- Proxy
- 类 Class
- 模块化

## ES2016

- 引入数组includes()方法
- a ** b指数运算符，它与 Math.pow(a, b)相同。

## ES2017

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

## ES2018

- 异步迭代
- Promise.finally()
- Rest/Spread 属性
  - ES2018 扩展运算符增加了对对象的支持
- 正则表达式命名捕获组（Regular Expression Named Capture Groups）
- 正则表达式反向断言（lookbehind）
- 正则表达式dotAll模式
- 正则表达式 Unicode 转义
- 非转义序列的模板字符串
- 放松了对标签模板里面的字符串转义的限制
  - 注意：这种对字符串转义的放松，只在标签模板解析字符串时生效，不是标签模板的场合，依然会报错。

## ES2019

- 行分隔符（U+2028）和段分隔符（U+2029）符号现在允许在字符串文字中，与JSON匹配
  - `const PS = eval("'\u2029'");` // 这样这个就不会报错
- 更加友好的 JSON.stringify
  - 为了确保返回的是合法的 UTF-8 字符，如果遇到0xD800到0xDFFF之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理
- 新增了Array的flat()方法和flatMap()方法
- String trim 方法：返回新字符串
  - trimStart()
  - trimEnd()
  - 除了空格键，这两个方法对字符串头部（或尾部）的 tab 键、换行符等不可见的空白符号也有效。
  - 浏览器还部署了额外的两个方法，trimLeft()是trimStart()的别名，trimRight()是trimEnd()的别名。
- ES2019 对函数实例的toString()方法做出了修改
  - 以前会省略注释和空格，修改后的toString()方法，明确要求返回一模一样的原始代码。
- Object.fromEntries()
- Symbol.prototype.description
- String.prototype.matchAll
- Function.prototype.toString()现在返回精确字符，包括空格和注释
- 简化try {} catch {}, 修改 catch 绑定
  - ES2019 做出了改变，允许catch语句省略参数
- import()
- Legacy RegEx
- 私有的实例方法和访问器
- Array.prototype.sort() 的排序稳定性
  - 早先的 ECMAScript 没有规定，Array.prototype.sort()的默认排序算法是否稳定，留给浏览器自己决定，这导致某些实现是不稳定的。
  - ES2019 明确规定，Array.prototype.sort()的默认排序算法必须稳定。

## ES2020

- 新的基本数据类型`BigInt`（大整数）
- 链判断运算符 （optional chaining operator）`?.`
  - 三种用法
  - 常见用法
  - 错误用法
- Null 判断运算符 `??`
  - 行为类似`||`，但是只有运算符左侧的值为`null`或`undefined`时，才会返回右侧的值
  - 运算优先级问题
- 顶层对象 globalThis 对象

参考：

- https://es6.ruanyifeng.com/
- https://juejin.im/post/6844903811622912014
- https://github.com/ruanyf/es6tutorial/blob/7b8c0632f62f3da9310f6fe13e8d6c96c72111e5/docs/reference.md
