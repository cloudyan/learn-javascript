// a.mjs
console.log('\na starting')
var obj = {
  done: false,
  set(v) {
    this.done = v
  },
};
import b from './b.mjs';
console.log('in a, b.done =', b.done);
obj.set(true)
export default obj;
console.log('a done\n');
