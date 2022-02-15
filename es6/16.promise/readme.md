# Promise

实现 `Promise` 需要完全读懂 Promise A+ 规范，不过从总体的实现上看，有如下几个点需要考虑到：

- `Promise` 本质是一个状态机，且状态只能为以下三种：Pending（等待态）、Fulfilled（执行态）、Rejected（拒绝态），状态的变更是单向的，只能从Pending -> Fulfilled 或 Pending -> Rejected，状态变更不可逆
- then 需要支持链式调用

## 几个问题

- finally 后面还可以写 then 调用吗
- then catch finally 中回调函数的参数都从哪里来
- 执行时序什么样，如果中途出错呢
- 什么情况是 `Promise 会吃掉错误`
- 什么情况下应该使用微任务, 参见 queueMicrotask
- [cancel Promise](https://stackoverflow.com/questions/30233302/promise-is-it-possible-to-force-cancel-a-promise)
- [回调地狱](http://callbackhell.com/)
- [[译] 如何取消你的 Promise？](https://juejin.cn/post/6844903533393772557)

**Promise A+ 规范**

- Promise A+ 规范, 官方英文地址：https://promisesaplus.com/
- 中文翻译可参考 http://malcolmyu.github.io/malnote/2015/06/12/Promises-A-Plus/
- 参考好文
  1. [Promise 入门](https://es6.ruanyifeng.com/#docs/promise)
  2. [深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469)
  3. [Promise V8 源码分析(一)](https://zhuanlan.zhihu.com/p/264944183)
  4. [Promise V8 源码分析(二)](https://zhuanlan.zhihu.com/p/329201628)
  5. [Promise V8 源码补充篇](https://juejin.cn/post/6953452438300917790)
- MDN [在 JavaScript 中通过 queueMicrotask() 使用微任务](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide)
  - 理解下何时使用微任务

> 注意: Promise 是基于 [EcmaScript 规范](https://262.ecma-international.org/#sec-promise-objects) 而不是 Promise A+ 规范来实现的

方法

- Promise 的含义
- Promise.prototype.then()  ES2015
- Promise.prototype.catch() ES2015
- Promise.prototype.finally()   ES2018
- Promise.resolve()         ES2015
- Promise.reject()          ES2015
- Promise.all()             ES2015
- Promise.race()            ES2015
- Promise.allSettled()          ES2020
- Promise.any()                 ES2021
- Promise.try()                 ESnext
- await.ops                     ESnext

ES6 之前常见的Promise 库: Bluebird、Q 和 when

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。

- 对象的状态不受外界影响
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果

## 模拟实现

具体参看

- [my-promise](https://github.com/cloudyan/diy-x/tree/dev/my-promise)
- https://github.com/addyosmani/es6-tools#polyfills

```js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor() {

  }

  status = PENDING
  value = null
  reason = null
  onFulfilledCallbacks = []
  onRejectedCallbacks = []

  then() {}
  catch() {}
  finally() {}

  static all() {}
  static race() {}
  static resolve() {}
  static reject() {}
  static allSettled() {}
  static any() {}
  static try() {}
}
```

关于 macrotask 和 microtask 两个概念

- 宏任务 macro-task: script（整体代码块）, setTimeout, setInterval, setImmediate（node环境）, I/O, 事件队列, UI rendering
- 微任务 micro-task: process.nextTick（node环境）, Promises（这里指浏览器实现的原生 Promise）, Object.observe, MutationObserver, queueMicrotask
- requestAnimationFrame 有争议

详见 [stackoverflow](https://stackoverflow.com/questions/25915634/difference-between-microtask-and-macrotask-within-an-event-loop-context) 解答

```js
const promise = new Promise((resolve, reject) => {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

sleep(1000).then(res => {
  console.log(res, 'hello')
})
```

Promise 新建后就会立即执行

```js
let promise = new Promise((resolve, reject) => {
  let i = 1;
  resolve(i); // 调用.then()中的方法
  i++;
  reject(i);  // 调用.catch()中的方法，不能与.then()一起执行
})

promise
  .then(num => {
    console.log('then1:', num)
    return 'r1'
  })
  .then(num => {
    console.log('then2:', num)
    return 'r2'
  })
  .catch(num => {
    console.log('catch:', num)
  })
  .finally(res => {  // 不论执行.then还是.catch，finally都会执行
    console.log('finally', res)
  })
  // .then(res => {
  //   console.log(111)
  //   return 222
  // })
```

关于执行顺序

```js
console.log(1);

setTimeout(() => {
  console.log(2);
}, 0);

new Promise((resolve) => {
  console.log(3);
  resolve(Date.now());
}).then(() => {
  console.log(4);
});

console.log(5);

setTimeout(() => {
  new Promise((resolve) => {
    console.log(6);
    resolve(Date.now());
  }).then(() => {
    console.log(7);
  });
}, 0);
```

不是微任务会在宏任务之前进行，而是每次执行完一个宏任务后，js进程都会检查微任务队列中是否存在微任务，若存在微任务则将所有的微任务都执行完毕后，才开始下一个的宏任务。

每个单独的事件循环机制是这样：

[宏任务->微任务->requestAnimation->UI操作]

这一套循环执行完毕后，再去获取下一个宏任务，再按照上面的顺序执行。关于js的事件循环机制，你可以看下这篇文章： [前端中的事件循环eventloop机制](https://www.xiabingbao.com/post/javascript/js-eventloop.html)


```js
// https://stackoverflow.com/questions/36870467/what-is-the-order-of-execution-in-javascript-promises

Promise.resolve('A')
  .then(function(a){
    console.log(2, a);
    return 'B';
  })
  .then(function(a){
     Promise.resolve('C')
       .then(function(a){
         console.log(7, a);
        })
       .then(function(a){
         console.log(8, a);
        });
     console.log(3, a);
     return a;
  })
  .then(function(a){
     Promise.resolve('D')
       .then(function(a){
         console.log(9, a);
        })
       .then(function(a){
         console.log(10, a);
        });
     console.log(4, a);
  })
  .then(function(a){
     console.log(5, a);
  });

console.log(1);

setTimeout(function(){console.log(6)},0);
```

参考：

- [关于 Promise 执行顺序的一个问题？](https://www.zhihu.com/question/36273908?sort=created)
- [V8 Promise源码全面解读，其实你对Promise一无所知](https://mp.weixin.qq.com/s/pdzvF6aWp-tenqhXmQ8Wcg)
