// a.mjs
console.log('\na starting')
import { b } from './b.mjs';
const obj = {};
obj.done = false;
export default obj
console.log('in a, b =');
console.log(b);
export let a = 'a';
setTimeout(() => console.log('b = %j after 500 ms', b), 500);
console.log('a is finished');
