# 字符串

- 字符的 Unicode 表示法
  - 允许采用`\uxxxx`形式表示一个字符，其中`xxxx`表示字符的 Unicode 码点。
  - 但是，这种表示法只限于码点在`\u0000`~`\uFFFF`之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。
- ES6 为字符串添加了遍历器接口, 支持 for...of
  - 可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。
- 模板字符串
  - 是增强版的字符串，用反引号（`）标识
  - 支持模板嵌套
- 实现模板编译
- 标签模板
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

字符的 Unicode 表示法

```js
'\uD842\uDFB7'
// '𠮷'

'\u20BB7'
// ' 7'
// 超过0xFFFF的数值, JavaScript 会理解成\u20BB+7。
// 由于\u20BB是一个不可打印字符，所以只会显示一个空格，后面跟着一个7

"\u{20BB7}"
// "𠮷"
// ES6 增强后将码点放入大括号就可以正确解读

"\u{41}\u{42}\u{43}"
// "ABC"

let hello = 123;
hell\u{6F} // 123

'\u{1F680}' === '\uD83D\uDE80'
// true
```

大括号表示法与四字节的 UTF-16 编码是等价的

```js
// JavaScript 共有 6 种方法可以表示一个字符。
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
```

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

// 会将汉字拆了
for (let ch in s) {
  console.log(s[ch].codePointAt(0).toString(16));
}

// 可以正确分割
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}

// 会将汉字拆了，存在问题
console.log(s.split(''))

// 可以正确识别

// 这个可以正确分割
console.log([...s])

console.log(s.indexOf('𠮷') > -1) // true
console.log(s.startsWith('𠮷'))  // true
console.log(s.includes('𠮷'))    // true

[...s].forEach(
  ch => console.log(ch.codePointAt(0).toString(16))
)
// 20bb7
// 61

const strLen(str) {
  return [...str].length;
}

function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}
```
