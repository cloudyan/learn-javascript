// b.mjs
console.log('\nbar is running');
import {foo} from './a.mjs';
console.log('foo = %j', foo);
export var bar = false;
setTimeout(() => bar = true, 500);
console.log('bar is finished');
