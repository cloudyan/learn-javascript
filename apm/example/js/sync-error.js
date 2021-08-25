// 同步错误


// throw new Error('custom'); // addEventListener
// console.log(`after throw new Error('custom')`);
// 此错误导致后续代码无法执行，「执行中断」

try {
  const num = 1;
  num = 2;
} catch(err) {
  console.log('tryCatch');
  // TypeError
  // throw err; // 此处 throw 仍然导致后续代码执行中止
}
console.log('after: tryCatch throw')

// setTimeout 内错误，可以通过 onerror 捕获
// unhandledrejection 不会捕获此错误
setTimeout(()=>{
  throw new Error('setTimeout');  // addEventListener
  // 此处因为执行先推入宏队列，所以后续的 `obj.a.b` 发生错误（常规为执行中止），但没影响此处代码的执行
}, 10)

const obj = {};
console.log(obj.a.b); // 发生错误就会导致后续代码执行中止
console.log('after: obj.a.b');
