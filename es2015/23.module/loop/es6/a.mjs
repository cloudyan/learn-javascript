// a.mjs
console.log('a is running')
import { b } from './b.mjs';
console.log('in a, b =');
console.log(b);
export let a = 'a';
setTimeout(() => console.log('bar = %j after 500 ms', b), 500);
console.log('a is finished');
