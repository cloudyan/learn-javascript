// 异步错误

// 异步错误
setTimeout(()=>{
  throw new Error();  // addEventListener
}, 10)

// promise错误
new Promise((resolve, reject)=>{
  throw new Error();
})
