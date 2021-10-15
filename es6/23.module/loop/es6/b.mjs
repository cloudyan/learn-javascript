// b.mjs
console.log('\nb is starting');
var obj = {
  done: false,
  set(v) {
    this.done = v
  },
};
import a from './a.mjs';
console.log('in b, a.done =', a.done);
obj.set(true)
export default obj;
console.log('b done\n');

