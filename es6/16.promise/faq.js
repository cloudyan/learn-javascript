// - [V8 Promise源码全面解读，其实你对Promise一无所知](https://mp.weixin.qq.com/s/pdzvF6aWp-tenqhXmQ8Wcg)

// Promise 的几个高难度题目

// 题目 1
Promise.resolve().then(() => {
  console.log(0);
  return Promise.resolve(4);
}).then((res) => {
  console.log(res)
})

Promise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() => {
  console.log(6);
})
// 0 1 2 3 4 5 6


// 题目 2
Promise.resolve().then(() => {
  console.log(0);
  return {then(resolve){resolve(4)}};
}).then((res) => {
  console.log(res)
})

Promise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() => {
  console.log(6);
})
// 0 1 2 4 3 5 6


// 题目 3
const p1 = new Promise((resolve, reject) => {
  reject(0)
})
console.log(1);
setTimeout(() => {
  p1.then(undefined, console.log)
}, 0)
console.log(2);
// 1
// 2
// 输出报错 UnhandledPromiseRejection: This error originated either

const p1 = new Promise((resolve, reject) => {
  reject(0)
})
console.log(1);
p1.then(undefined, console.log)
console.log(2);
// 1
// 2
// 0


// 题目 4
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
  return Promise.resolve().then(() => {
      console.log("async2-inner");
  });
}

console.log("script start");
setTimeout(function () {
  console.log("settimeout");
});

async1();
new Promise(function (resolve) {
  console.log("promise1");
  resolve();
})
.then(function () {
  console.log("promise2");
})
.then(function () {
  console.log("promise3");
})
.then(function () {
  console.log("promise4");
});
console.log("script end");


// 面试题 2
new Promise((resolve, reject) => {
  Promise.resolve().then(() => {
    resolve({
        then: (resolve, reject) => resolve(1)
    });
    Promise.resolve().then(() => console.log(2));
  });
}).then(v => console.log(v));
// 2 1

// ========== 题目 1 解析
let p1 = Promise.resolve()
// 1. p1 的状态为 fulfilled

let p2 = p1.then(() => {
  console.log(0);
  let p3 = Promise.resolve(4)
  return p3;
})
// 2. 因为 p1 的状态已经是 fulfilled，所以调用 then 后立即将 onFulfilled 放入 microtask 队列
// 此时 microtask 只有p1的 onFulfilled： [p1.onFulfilled]

let p4 = p2.then((res) => {
  console.log(res)
})
// 3. p2的状态还是 pending，所以调用 then 后是为 p2 收集依赖，此时 p2 的 reactions 如下
/*{
  onFulfilled: (res) => {console.log(res)},
  onRejected: undefined
}*/


let p5 = Promise.resolve()
// 4. p5 的状态为 fulfilled

let p6 = p5.then(() => {
  console.log(1);
})
// 5. 同第2步，将 onFulfilled 加入 microtask 队列
// 此时 microtask 是： [p1.onFulfilled, p5.onFulfilled]

let p7 = p6.then(() => {
  console.log(2);
})
// 6. 同第3步，是给 p6 添加 reactions

let p8 = p7.then(() => {
  console.log(3);
})
// 7. 同上，是给 p7 添加 reactions

let p9 = p8.then(() => {
  console.log(5);
})
// 8. 同上，是给 p8 添加 reactions

let p10 = p9.then(() => {
  console.log(6);
})
// 9. 同上，是给 p9 添加 reactions

// ========== 题目 1 解析
