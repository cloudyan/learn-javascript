# RegExp

- RegExp 构造函数
- 字符串的正则方法
- u 修饰符
- RegExp.prototype.unicode 属性
- y 修饰符
- RegExp.prototype.sticky 属性
- RegExp.prototype.flags 属性
- s 修饰符：dotAll 模式
- 后行断言
- Unicode 属性类
- 具名组匹配
- 正则匹配索引
- [ES2020] String.prototype.matchAll()

## 常用的正则

### JS多行注释以及单行注释

```js
// 多行注释
(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/)

// 单行注释
//
// 测试 data.replace(/^(https?:)?\/\//, "").replace(/\?.*$/, "")
```