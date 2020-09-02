import * as m from './even.js';

m.even(10); // true
m.counter;  // 6
m.even(20); // true
m.counter;  // 17

// 这个例子要是改写成 CommonJS，就根本无法执行，会报错。
