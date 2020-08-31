# ES2018

- 异步迭代
- Promise.finally()
- Rest/Spread 属性
- 正则表达式命名捕获组（Regular Expression Named Capture Groups）
- 正则表达式反向断言（lookbehind）
- 正则表达式dotAll模式
- 正则表达式 Unicode 转义
- 非转义序列的模板字符串
- 放松了对标签模板里面的字符串转义的限制
  - 注意：这种对字符串转义的放松，只在标签模板解析字符串时生效，不是标签模板的场合，依然会报错。


```js
// 如果遇到不合法的字符串转义，就返回undefined，而不是报错，并且从raw属性上面可以得到原始字符串。
function tag(strs) {
  strs[0] === undefined
  strs.raw[0] === "\\unicode and \\u{55}";
}
tag`\unicode and \u{55}` // 不报错

let bad = `bad escape sequence: \unicode`; // 报错
```
