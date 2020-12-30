
// test

// node --experimental-modules a.mjs
// nodejs@13.2.0 之前想要在node中使用ES modules，需要添加`--experimental-module`

/**

ES6 循环加载是怎么处理的。

首先，执行a.mjs以后，引擎发现它加载了b.mjs，因此会优先执行b.mjs，然后再执行a.mjs。

接着，执行b.mjs的时候，已知它从a.mjs引用了a接口，这时不会去执行a.mjs，而是认为这个接口已经存在了，继续往下执行。

执行到第十行a.done的时候，才发现这个接口根本没定义 a，因此报错。

*/

// 解决这个问题的方法，就是让b.mjs运行的时候，a已经有定义了。
// 这可以通过将a写成函数来解决。
// 或改为 var 定义，就回变量提升，即先定义，后使用，就不会报错了

/**

// 改为函数

// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar());
function foo() { return 'foo' }
export {foo};

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo());
function bar() { return 'bar' }
export {bar};

*/
