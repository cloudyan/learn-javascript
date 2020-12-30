// a.mjs 经测试这个示例也是报错
console.log('\nfoo is running');
import {bar} from './b.mjs';
console.log('bar = %j', bar);
setTimeout(() => console.log('bar = %j after 500 ms', bar), 500);
export var foo = false;
console.log('foo is finished');
