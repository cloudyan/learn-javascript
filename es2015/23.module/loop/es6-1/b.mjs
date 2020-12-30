// b.mjs
console.log('b is running');
export let b = false;
setTimeout(() => b = true, 500);
console.log('b is finished');
