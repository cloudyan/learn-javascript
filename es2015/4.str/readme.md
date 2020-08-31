# 字符串

- String.fromCodePoint()
  - ES5 String.fromCharCode()不能识别大于0xFFFF的码点, 导致高位溢出
- String.row() 将变量进行替换, 斜杠进行转义的字符串
- 实例方法 str.codePointAt()
  - JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节。
  - 对于那些需要4个字节储存的字符（Unicode 码点大于`0xFFFF`的字符），JavaScript 会认为它们是两个字符。
  - codePointAt 方法会正确返回 32 位的 UTF-16 字符的码点
- String.fromCharCode()
- Unicode 正规化
  - `'\u01D1'.normalize() === '\u004F\u030C'.normalize()` // true
- includes(searchString, ?position)
- startsWith(searchString, ?position)   // 从 n 到结束
- endsWith(searchString, ?endPosition)  // 针对前 n 个字符
- repeat 将原字符串重复n次

String.row 的代码实现

```js
String.raw = function (strings, ...values) {
  let output = '';
  let index;
  for (index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index];
  }

  output += strings.raw[index]
  return output;
}
```

计算字符串长度（将汉字长度记为 2，英文字母及数字长度记为 1）

```js
let s = '𠮷a';

s.codePointAt(0).toString(16) // "20bb7"
s.codePointAt(2).toString(16) // "61"

for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}

arr.forEach(
  ch => console.log(ch.codePointAt(0).toString(16))
)
// 20bb7
// 61
```

```js
var s = '𠮷c小'
console.log(s.length)

// 会将汉字拆了，存在问题
console.log(s.split(''))

// 这个可以正确分割
console.log([...s])

const strLen(str) {
  return [...str].length;
}

function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}
```
