# RegExp

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions

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

- 空行 `^\s*(?=\r?$)\n`

### JS多行注释以及单行注释

```js
// 多行注释
(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/)

// 单行注释
//
// 测试 data.replace(/^(https?:)?\/\//, "").replace(/\?.*$/, "")
```

参考：

- [JS正则表达式完整教程（略长）](https://juejin.cn/post/6844903487155732494)
