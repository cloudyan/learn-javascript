/**
 * 数字对象 属性及方法
 *
 * @参考资料
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt
 * http://www.w3school.com.cn/jsref/jsref_obj_number.asp
 */

/*

属性
  Number.EPSILON: number 表示 1 与Number可表示的大于 1 的最小的浮点数之间的差值
  Number.MAX_SAFE_INTEGER: number 最大的安全整数 2^53 - 1 = 9007199254740991 = Math.pow(2, 53) - 1
  Number.MIN_SAFE_INTEGER: number -(2^53 - 1) = -9007199254740991 = -(Math.pow(2, 53) - 1)
  Number.MAX_VALUE js所能表示的最大数值 1.7976931348623157e+308
  Number.MIN_VALUE: number js所能表示的最小数值 5e-324(>0)
  Number.NEGATIVE_INFINITY: number 负无穷大
  Number.NaN: number
  Number.POSITIVE_INFINITY: number 正无穷大
  Number.prototype: Number

静态方法
  Number.isFinite(number: number): boolean 是否是一个有穷数
* Number.isInteger(number: number): boolean
* Number.isNaN(number: number): boolean
  Number.isSafeInteger(number: number): boolean
  Number.parseFloat(string: string): number
* Number.parseInt(string: string, radix?: number): number

方法
  Number.prototype.toExponential(fractionDigits?: number): string // 以指数表示法返回该数值字符串表示形式
* Number.prototype.toFixed(fractionDigits?: number): string
  Number.prototype.toPrecision(precision?: number): string // 以指定的精度返回该数值对象的字符串表示
  Number.prototype.toString(radix?: number): string
  Number.prototype.valueOf(): number

  */

// isInteger
Number.isInteger(0);         // true
Number.isInteger(1);         // true
Number.isInteger(-100000);   // true

Number.isInteger(0.1);       // false
Number.isInteger(Math.PI);   // false

Number.isInteger(Infinity);  // false
Number.isInteger(-Infinity); // false
Number.isInteger("10");      // false
Number.isInteger(true);      // false
Number.isInteger(false);     // false
Number.isInteger([1]);       // false


// isNaN
Number.isNaN(NaN);        // true
Number.isNaN(Number.NaN); // true
Number.isNaN(0 / 0)       // true

// 下面这几个如果使用全局的 isNaN() 时，会返回 true。
Number.isNaN("NaN");      // false，字符串 "NaN" 不会被隐式转换成数字 NaN。
Number.isNaN(undefined);  // false
Number.isNaN({});         // false
Number.isNaN("blabla");   // false

// 下面的都返回 false
Number.isNaN(true);
Number.isNaN(null);
Number.isNaN(37);
Number.isNaN("37");
Number.isNaN("37.37");
Number.isNaN("");
Number.isNaN(" ");


// parseInt(string[, radix])
// radix为指定基数，即字符串以多少进制的数字表示
let strObj = '0110';

console.log(Number.parseInt(strObj, 2)); // 6
console.log(Number.parseInt(strObj, 10)); // 110
​

// toFixed
var numObj = 12345.6789;

numObj.toFixed();         // 返回 "12346"：进行四舍五入，不包括小数部分
numObj.toFixed(1);        // 返回 "12345.7"：进行四舍五入
numObj.toFixed(6);        // 返回 "12345.678900"：用0填充

(1.23e+20).toFixed(2);    // 返回 "123000000000000000000.00"
(1.23e-10).toFixed(2);    // 返回 "0.00"

2.34.toFixed(1);          // 返回 "2.3"
-2.34.toFixed(1);         // 返回 -2.3 （由于操作符优先级，负数不会返回字符串）
(-2.34).toFixed(1);       // 返回 "-2.3" （若用括号提高优先级，则返回字符串）

