/**
 * 字符串对象 属性及方法
 *
 * @参考资料:
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String
 * http://www.w3school.com.cn/jsref/jsref_obj_string.asp
 * http://www.w3schools.com/js/js_string_methods.asp
 * http://techiejs.com/Blog/Post/Essential-JavaScript-String-Functions
 * https://rapd.wordpress.com/2007/07/12/javascript-substr-vs-substring/
 * http://www.bennadel.com/blog/2159-using-slice-substring-and-substr-in-javascript.htm
 *
 */

/*

属性
  String.length: number
  String.prototype: String

静态方法
  String.fromCharCode(num: UTF-16)
  String.fromCodePoint(num: unicode)
  String.raw(callSite, ...substitutions)

方法
  String.prototype.charAt(index: number): string
  String.prototype.charCodeAt(index: number): number
  String.prototype.codePointAt(pos: number): string
* String.prototype.concat(...strings: string[]): string
  String.prototype.endsWith(searchString: string, endPosition?: number)
* String.prototype.indexOf(searchString: string, fromIndex?: number): number
* String.prototype.includes(searchString: string, fromIndex?: number): boolean 区分大小写
  String.prototype.lastIndexOf(searchString: string, position?: number): number
  String.prototype.match(regexp: string | RegExp): RegExpMatchArray (+1 overload)
  String.prototype.matchAll()
  String.prototype.normalize(form?: any)
  String.prototype.padEnd(targetLength: number, padString?: string)
  String.prototype.padStart(targetLength: number, padString?: string)
  String.prototype.repeat(count: number)
  String.prototype.replace(searchValue: string | RegExp, replaceValue: string): string (+3 overloads)
  String.prototype.search(regexp: string | RegExp): number (+1 overload)
* String.prototype.slice(start?: number, end?: number): string
* String.prototype.split(separator: string | RegExp, limit?: number): string[] (+1 overload)
  String.prototype.startsWith(searchString: string, position?: number)
⤵️String.prototype.substr(from: number, length?: number): string 尽管没有严格被废弃，尽量使用 substring 替代
* String.prototype.substring(start: number, end?: number): string
  String.prototype.toLowerCase(): string
  String.prototype.toUpperCase(): string
  String.prototype.toString(): string
* String.prototype.trim()
  String.prototype.trimStart()
  String.prototype.trimEnd()
  String.prototype.valueOf(): string

  */

// concat
// 强烈建议使用 赋值操作符（+, +=）代替 concat 方法。
var hello = 'Hello, ';
console.log(hello.concat('Kevin', ' have a nice day.')); /* Hello, Kevin have a nice day. */

// indexOf(searchValue[, fromIndex])
// 表示调用该方法的字符串中开始查找的位置。可以是任意整数。默认值为 0。
// 如果 fromIndex < 0 则查找整个字符串（如同传进了 0）。
// 如果 fromIndex >= str.length，则该方法返回 -1。
// 当被查找的字符串是一个空字符串，fromIndex <= 0时返回0，0 < fromIndex <= str.length时返回fromIndex，fromIndex > str.length时返回str.length。
// lastIndexOf
'Blue Whale'.indexOf('Blue');     // returns  0
'Blue Whale'.indexOf('Blute');    // returns -1
'Blue Whale'.indexOf('Whale', 0); // returns  5
'Blue Whale'.indexOf('Whale', 5); // returns  5
'Blue Whale'.indexOf('', 9);      // returns  9
'Blue Whale'.indexOf('', 10);     // returns 10
'Blue Whale'.indexOf('', 11);     // returns 10
'Blue Whale'.indexOf('blue') // returns -1
'Blue Whale'.indexOf('blue') // returns -1
'Blue Whale'.indexOf('Blue') !== -1; // true
'Blue Whale'.indexOf('Bloe') !== -1; // false

'canal'.lastIndexOf('a')    // returns 3
'canal'.lastIndexOf('a', 2) // returns 1
'canal'.lastIndexOf('a', 0) // returns -1
'canal'.lastIndexOf('x')    // returns -1


// includes
'Blue Whale'.includes('blue'); // returns false


// slice 创建一个新的字符串
// 和 substring 类似，但不同之处在于 slice 可以接收负的 index，即从数组末尾开始操作
var str = 'To be, or not to be, that is the question.';

console.log(str.includes('To be'));       // true
console.log(str.includes('question'));    // true
console.log(str.includes('nonexistent')); // false
console.log(str.includes('To be', 1));    // false
console.log(str.includes('TO BE'));       // false


// split
function splitString(stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator);

  console.log('The original string is: '' + stringToSplit + ''');
  console.log('The separator is: '' + separator + ''');
  console.log('The array has ' + arrayOfStrings.length + ' elements: ');

  for (var i=0; i < arrayOfStrings.length; i++)
    console.log(arrayOfStrings[i] + ' / ');
}

var tempestString = 'Oh brave new world that has such people in it.';
var monthString = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec';

var space = ' ';
var comma = ',';

splitString(tempestString, space);
splitString(tempestString);
splitString(monthString, comma);


// substr(from, ?length)
const str = 'abcdefghij';

console.log('(1,2): '    + str.substr(1,2));   // (1,2): bc
console.log('(-3,2): '   + str.substr(-3,2));  // (-3,2): hi
console.log('(-3): '     + str.substr(-3));    // (-3): hij
console.log('(1): '      + str.substr(1));     // (1): bcdefghij
console.log('(-20, 2): ' + str.substr(-20,2)); // (-20, 2): ab
console.log('(20, 2): '  + str.substr(20,2));  // (20, 2):


// substring(start, ?end)
// 如果 indexStart 等于 indexEnd，substring 返回一个空字符串。
// 如果省略 indexEnd，substring 提取字符一直到字符串末尾。
// 如果任一参数小于 0 或为 NaN，则被当作 0。
// 如果任一参数大于 stringName.length，则被当作 stringName.length。
// 如果 indexStart 大于 indexEnd，则 substring 的执行效果就像两个参数调换了一样。见下面的例子。
var anyString = 'Mozilla';

// 输出 'Moz'
console.log(anyString.substring(0,3));
console.log(anyString.substring(3,0));
console.log(anyString.substring(3,-3));
console.log(anyString.substring(3,NaN));
console.log(anyString.substring(-2,3));
console.log(anyString.substring(NaN,3));

// 输出 'lla'
console.log(anyString.substring(4,7));
console.log(anyString.substring(7,4));

// 输出 ''
console.log(anyString.substring(4,4));

// 输出 'Mozill'
console.log(anyString.substring(0,6));

// 输出 'Mozilla'
console.log(anyString.substring(0,7));
console.log(anyString.substring(0,10));

// 获取指定字符串的倒数元素
anyString.substring(anyString.length - 4); // 'illa'
anyString.substring(anyString.length - 5); // 'zilla'


// trim
var orig = '   foo  ';
console.log(orig.trim()); // 'foo'


// repeat
'abc'.repeat(-1)     // RangeError: repeat count must be positive and less than inifinity
'abc'.repeat(0)      // ''
'abc'.repeat(1)      // 'abc'
'abc'.repeat(2)      // 'abcabc'
'abc'.repeat(3.5)    // 'abcabcabc' 参数count将会被自动转换成整数.
'abc'.repeat(1/0)    // RangeError: repeat count must be positive and less than inifinity

({toString : () => 'abc', repeat : String.prototype.repeat}).repeat(2)
//'abcabc',repeat是一个通用方法,也就是它的调用者可以不是一个字符串对象.


// padStart
// padEnd
'abc'.padStart(10);         // '       abc'
'abc'.padStart(10, 'foo');  // 'foofoofabc'
'abc'.padStart(6,'123465'); // '123abc'
'abc'.padStart(8, '0');     // '00000abc'
'abc'.padStart(1);          // 'abc'

'abc'.padEnd(10);          // 'abc       '
'abc'.padEnd(10, 'foo');   // 'abcfoofoof'
'abc'.padEnd(6, '123456'); // 'abc123'
'abc'.padEnd(1);           // 'abc'


// replace
// match
// matchAll
// search


// String.prototype.substring()
// 注:
// substring 方法的第二个参数代表截取停止位置的 index（不包含最后这个值）
// 而 substr 的第二份参数则代表截取长度
// 语法: string.substr(start, length);
// 语法: string.substring(start, stop);
//
// 除此以外，slice() 和 substring() 类似，但不同之处在于 slice 可以接收负的 index，即从数组末尾开始操作

