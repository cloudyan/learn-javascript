import * as m from './even.js';

console.log(m.even(10)); // true
console.log(m.counter);  // 6
console.log(m.even(20)); // true
console.log(m.counter);  // 17

// ES6 模块加载器[SystemJS](https://github.com/ModuleLoader/es6-module-loader/blob/master/docs/circular-references-bindings.md) 给出的一个例子。
// 上述文档已删

// Dynamic Module Reform (REJECTED)
// https://github.com/tc39/proposal-dynamic-modules


// 命令行运行（引入文件不能省略后缀）
// node --experimental-modules index.js

// 这个例子要是改写成 CommonJS，就根本无法执行，会报错。
