// b.mjs
console.log('b is running');
import { a } from './a.mjs';
console.log('in b, a =');
console.log(a);
export let b = 'bar';
