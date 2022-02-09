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





// https://github.com/sisterAn/blog/issues/21
// 今日头条面试题
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(function () {
  console.log('settimeout')
})
async1()
new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
console.log('script end')


// https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/7
// 变式 1
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  // async2做出如下更改：
  new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
  });
}
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0)
async1();

new Promise(function(resolve) {
  console.log('promise3');
  resolve();
}).then(function() {
  console.log('promise4');
});

console.log('script end');


// 变式 2
async function async1() {
  console.log('async1 start');
  await async2();
  // 更改如下：
  setTimeout(function() {
      console.log('setTimeout1')
  },0)
}
async function async2() {
  // 更改如下：
  setTimeout(function() {
    console.log('setTimeout2')
  },0)
}
console.log('script start');

setTimeout(function() {
  console.log('setTimeout3');
}, 0)
async1();

new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
});
console.log('script end');


// 变式 3
async function a1 () {
  console.log('a1 start')
  await a2()
  console.log('a1 end')
}
async function a2 () {
  console.log('a2')
}

console.log('script start')

setTimeout(() => {
  console.log('setTimeout')
}, 0)

Promise.resolve().then(() => {
  console.log('promise1')
})

a1()

let promise2 = new Promise((resolve) => {
  resolve('promise2.then')
  console.log('promise2')
})

promise2.then((res) => {
  console.log(res)
  Promise.resolve().then(() => {
      console.log('promise3')
  })
})
console.log('script end')




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



// 解析
// Promise构造函数的参数是一个执行器，是同步的；
// 构造完立即注册then函数，等同步代码执行完毕后，执行then函数。
new Promise((resolve, reject) => {
  console.log("1"); // 1. Promise构造函数接受的参数是一个需要立即执行的函数, 是一个同步任务
  resolve();
})
.then(() => { // 2. 注册then方法，把它加到微任务队列
  // 3. 没有同步代码，开始执行该微任务
  console.log("2");
  new Promise((resolve, reject) => { // 4. 继续执行Promise构造函数
    console.log("3");
    resolve();
  })
  .then(() => { // 5. 注册其then方法，将其加到微任务队列
      console.log("4"); // 7. 执行
  })
  .then(() => { // 8. 注册
    console.log("5"); // 10. 执行
  });
})
.then(() => { // 6. 没有同步代码，第一个then执行完毕，继续注册外层 Promise 的第二个 then
  console.log("6"); // 9. 执行
});
// 输出： 1 2 3 4 6 5



// 解析
new Promise((resolve, reject) => {
  console.log("1"); // 1. 构造函数的参数，先执行
  resolve();
})
.then(() => { // 2. 注册第一个then
  console.log("2"); // 3. 执行第一个 then
  // 看到return ，需要将表达式执行完毕，才能执行外层第二个then
  return new Promise((resolve, reject) => {
    console.log("3"); // 4. 构造函数执行
    resolve();
  })
  .then(() => { // 5. 注册
    console.log("4"); // 6. 执行
  })
  .then(() => { // 7. 注册
    console.log("5"); // 8. 执行
  });
})
.then(() => { // 9. 注册
  console.log("6"); // 10. 执行
});
// 输出： 1 2 3 4 6 5
