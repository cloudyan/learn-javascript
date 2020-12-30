// a.mjs
console.log('a is running');
import { b } from './b'
console.log('b = %j', b);
setTimeout(() => console.log('b = %j after 500 ms', b), 500);
console.log('a is finished');
