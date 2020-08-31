# ES2019

- 行分隔符（U + 2028）和段分隔符（U + 2029）符号现在允许在字符串文字中，与JSON匹配
- 更加友好的 JSON.stringify
- 新增了Array的flat()方法和flatMap()方法
- String trim 方法：返回新字符串
  - trimStart()
  - trimEnd()
  - 除了空格键，这两个方法对字符串头部（或尾部）的 tab 键、换行符等不可见的空白符号也有效。
  - 浏览器还部署了额外的两个方法，trimLeft()是trimStart()的别名，trimRight()是trimEnd()的别名。
- Object.fromEntries()
- Symbol.prototype.description
- String.prototype.matchAll
- Function.prototype.toString()现在返回精确字符，包括空格和注释
- 简化try {} catch {},修改 catch 绑定
- 新的基本数据类型BigInt
- globalThis
- import()
- Legacy RegEx
- 私有的实例方法和访问器

Symbol.prototype.description

```js
const sym = Symbol('foo');

String(sym) // "Symbol(foo)"
sym.toString() // "Symbol(foo)"

// Symbol.prototype.description
const sym = Symbol('foo');

sym.description // "foo"
```
