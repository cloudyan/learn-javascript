# ES2019

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
- Legacy RegExp
- 私有的实例方法和访问器
- Array.prototype.sort() 的排序稳定性
  - 早先的 ECMAScript 没有规定，Array.prototype.sort()的默认排序算法是否稳定，留给浏览器自己决定，这导致某些实现是不稳定的。
  - ES2019 明确规定，Array.prototype.sort()的默认排序算法必须稳定。

常见的排序算法之中，插入排序、合并排序、冒泡排序等都是稳定的，堆排序、快速排序等是不稳定的。

不稳定排序的主要缺点是，多重排序时可能会产生问题。

> 假设有一个姓和名的列表，要求按照“姓氏为主要关键字，名字为次要关键字”进行排序。
> 开发者可能会先按名字排序，再按姓氏进行排序。如果排序算法是稳定的，这样就可以达到“先姓氏，后名字”的排序效果。
> 如果是不稳定的，就不行。


Symbol.prototype.description

```js
const sym = Symbol('foo');

String(sym) // "Symbol(foo)"
sym.toString() // "Symbol(foo)"

// Symbol.prototype.description
const sym = Symbol('foo');

sym.description // "foo"
```

```js
function /* foo comment */ foo () {}

console.log(foo.toString())
// "function /* foo comment */ foo () {}"
```

catch

```js
// 允许catch语句省略参数
try {
  // ...
} catch {
  // ...
}
```

Symbol.prototype.description

```js
const sym = Symbol('foo');

String(sym) // "Symbol(foo)"
sym.toString() // "Symbol(foo)"

// 上面的用法不是很方便。
// ES2019 提供了一个实例属性description，直接返回 Symbol 的描述。
sym.description // "foo"
```
