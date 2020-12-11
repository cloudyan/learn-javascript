# 数据类型和数据结构

## 问题

- js 有几种基本数据类型？什么是原始值？
- 如何检查变量的数据类型？ 参看 `@jskit/is`
- `+0 === -0`?
- javascript 的数据类型转换?
  - 显式转换
  - 隐式转换
- `NaN` 属于什么数据类型？
- 使用 `==` 符号，有哪些值会和 `null` `false` `0` 相等
- 使用 `Array.prototype.includes()` 方法，是基于什么标准判断的？其他也包含判断的操作有哪些？
- javascript 中数字表示的范围？
- 怎么是安全的计算？
- 什么情况下选择使用位运算？
- null 和 undefined 的区别？
  - undefined：
    - 变量被声明了，但没有赋值时，就等于undefined。
    - 调用函数时，应该提供的参数没有提供，该参数等于undefined。
    - 对象没有赋值的属性，该属性的值为undefined。
    - 函数没有返回值时，默认返回undefined。
  - null：
    - 作为函数的参数，表示该函数的参数不是对象。
    - 作为对象原型链的终点。
- parseInt 深度学习
  - https://www.cnblogs.com/jf-67/p/6481538.html

- 什么是数据结构？
- 数据结构有哪些种？

## 知识点

新的 ECMAScript 标准定义了 7 种数据类型:

- 6 种原始类型:
  - Boolean
  - Null
  - Undefined
  - Number
  - String
  - Symbol (ECMAScript 6 新定义)
- Object

除 Object 以外的所有类型都是不可变的（值本身无法被改变）。我们称这些类型的值为“原始值”。

**重要提示** 请熟读 MDN 参考文档[JavaScript 数据类型和数据结构
](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)

扩展阅读：

- JavaScript 有一个[内置对象的标准库](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)。你可以查看参考来了解更多对象。

全局的对象（ global objects ）或称标准内置对象，不要和 "全局对象（global object）" 混淆。这里说的全局的对象是说在全局作用域里的对象。

"全局对象 （global object）” 是一个Global类的对象。可以在全局作用域里，用this访问（但只有在非严格模式下才可以，在严格模式下得到的是 undefined）。实际上，全局作用域包含了全局对象的属性，还有它可能继承来的属性。

- [JavaScript 中数字的底层表示](https://harttle.land/2018/06/29/javascript-numbers.html)
- [如何检查 JavaScript 变量类型？](https://harttle.land/2015/09/18/js-type-checking.html)
- [JavaScript显式类型转换与隐式类型转换](https://harttle.land/2015/08/21/js-type-conv.html)

## 测试练习

参见代码

参考：

- [JavaScript 数据类型和数据结构
](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)
