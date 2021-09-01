// 异步错误

// promise 错误
// Promise constructor
new Promise((resolve, reject)=>{
  throw new Error('Promise'); // uncaught
})

new Promise((resolve, reject)=>{
  throw new Error('Promise');
}).catch(err => {
  console.log(err); // caught
});

// 自定义的错误 reject 如何不让外部捕获
// 如 load.js


// Promise chaining
Promise.resolve().then(
  res => {
    // 这里的错误，err里无法捕获，改为 catch
    throw new Error('code 1'); // uncaught
  },
  err => {
    console.warn(err);
  }
)

// 改进方案
Promise.resolve().then(res => {
  // 这里的错误，err里无法捕获，改为 catch
  throw new Error('code 1');
}).catch(err => {
  console.warn(err); // caught
})


// new Promise() 构造器里如果在 setTimeout 回调里报错也不会被捕获
new Promise(() => {
  setTimeout(() => {
    throw new Error('Promise setTimeout 1'); // uncaught
  }, 1000)
}).catch(err => {
  console.warn(err);
})

// 改进方案
// 在 Promise 构造函数中做一件事, 其他事用 .then 拆到不同的阶段里
new Promise((resolve) => setTimeout(resolve, 1000))
  .then(() => {
    throw new Error('Promise setTimeout 2');
  })
  .catch(err => {
    console.warn(err);
  })

// 另一示例
const query = function(text, callback) {
  callback(text, {})
}
const transformResult = (res) => { return res }
new Promise((res, rej) => {
  setTimeout(() => { // 1
    query('SELECT ...', (err, results) => { // 2
      if (err) {
        rej(err);
      } else {
        const r = transformResult(results); // 3
        res(r);
      }
    });
  }, 1000);
}).catch(err => {
  console.warn(err);
});

// 拆分(res和 rej 无法 then里使用)
new Promise((res, rej) => {
  setTimeout(res, 1000); // 1
}).then(() => {
  query('拆分 SELECT ...', (err, results) => { // 2
    if (err) {
      throw new Error(err);
    } else {
      console.log(results);
    }
  });
}).then((results) => transformResult(results)) // 3
.catch(err => {
  console.warn(err);
});
