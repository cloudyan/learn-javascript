// b.mjs
console.log('\nb is running');
export let b = false;
setTimeout(() => b = true, 500);
console.log('b is finished');
