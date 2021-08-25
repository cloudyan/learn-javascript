// 异步错误

// promise 错误
new Promise((resolve, reject)=>{
  throw new Error('Promise');
})

// 自定义的错误 reject 如何不让外部捕获
new Promise((resolve, reject)=>{
  throw new Error('Promise');
})
