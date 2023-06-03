# Event loop

关于 **Event loop 的时序**，我认为仔细阅读 Jake Archibald 介绍 task 和 microtask 的这一篇文章就足够了[Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

- https://github.com/sisterAn/blog/issues/21
- [要就来 45 道 Promise 面试题一次爽到底](https://juejin.cn/post/6844904077537574919)
- https://juejin.cn/post/6945319439772434469

这里涉及的相关概念：

- 宏任务 Tasks
- 微任务 microTask
- 执行栈
- 任务队列
- Event Loop

> ES6 规范中，microtask 称为 `jobs`，macrotask 称为 `task`。
>
> 宏任务是由宿主发起的，而微任务由 JavaScript 自身发起。

## 关于 macrotask 和 microtask 两个概念

- 宏任务 macro-task:
  - script（整体代码块）
  - setTimeout
  - setInterval
  - setImmediate（node 环境）
  - I/O
  - UI rendering
  - 事件队列（事件触发回调是同步的）
- 微任务 micro-task:
  - process.nextTick（node 环境）
  - Promises（这里指浏览器实现的原生 Promise）
  - Object.observe
  - MutationObserver（只针对浏览器和 Node.js）
  - queueMicrotask Chrome 官方 API，可节省实例化 Promise 的开销（微任务队列）
- 其他
  - requestAnimationFrame 有争议
  - requestIdleCallback 是在浏览器渲染前，在微任务执行后执行
    - 是在浏览器渲染后有空闲时间时执行，如果 requestIdleCallback 设置了第二个参数 timeout，则会在超时后的下一帧强制执行
  - MessageChannel 是一个异步操作的 API

在浏览器的 Event Loop 中是有多个任务队列的，每个任务队列的执行时机是不一样的，下面直接上干货，说说浏览器执行任务的顺序

1. 从 task 任务队列中取第一个 task（比如 `setTimeout`、`setIntervel` 的回调，也可以将同一轮循环中的所有同步代码看作是一个宏任务），执行它。
2. 执行微任务队列里的所有微任务。
3. 浏览器判断是否更新渲染屏幕，如果需要重新绘制，则执行步骤 4-13，如果不需要重新绘制，则流程回到步骤 1，这样不断循环。
4. 触发 `resize`、`scroll` 事件，建立媒体查询（执行一个任务中如果生成了微任务，则执行完任务该后就会执行所有的微任务，然后再执行下一个任务）。
5. 建立 css 动画（执行一个任务中如果生成了微任务，则执行完该任务后就会执行所有的微任务，然后再执行下一个任务）。
6. 执行 `requestAnimationFrame` 回调（执行一个任务中如果生成了微任务，则执行完该任务后就会执行所有的微任务，然后再执行下一个任务）。
7. 执行 `IntersectionObserver` 回调（执行一个任务中如果生成了微任务，则执行完该任务后就会执行所有的微任务，然后再执行下一个任务）。
8. 更新渲染屏幕。
9. 浏览器判断当前帧是否还有空闲时间，如果有空闲时间，则执行步骤 10-12。
10. 从 `requestIdleCallback` 回调函数队列中取第一个，执行它。
11. 执行微任务队列里的所有微任务。
12. 流程回到步骤 9，直到 `requestIdleCallback` 回调函数队列清空或当前帧没有空闲时间。
13. 流程回到步骤 1，这样不断循环。

详见

- [stackoverflow](https://stackoverflow.com/questions/25915634/difference-between-microtask-and-macrotask-within-an-event-loop-context) 解答
- [requestAnimationFrame 和 requestIdleCallback 是宏任务还是微任务](https://juejin.cn/post/7134972903816167455)

### requestAnimationFrame 和 requestIdleCallback 是宏任务还是微任务?

结论

1. `requestAnimationFrame` 和 `requestIdleCallback` 是和宏任务性质一样的任务，只是他们的执行时机不同而已。也有人说它们既不是宏任务也不是微任务，其实我们不必纠结这个，我们所要做的就是知道他们的执行时机就好。
2. 浏览器在每一轮 Event Loop 事件循环中不一定会去重新渲染屏幕，会根据浏览器刷新率以及页面性能或是否后台运行等因素判断的，浏览器的每一帧是比较固定的，会尽量保持 60Hz 的刷新率运行，每一帧中间可能会进行多轮事件循环。
3. `requestAnimationFrame` 回调的执行与 `task` 和 `microtask` 无关，而是与浏览器是否渲染相关联的。它是在浏览器渲染前，在微任务执行后执行。
4. `requestIdleCallback` 是在浏览器渲染后有空闲时间时执行，如果 `requestIdleCallback` 设置了第二个参数 timeout，则会在超时后的下一帧强制执行。

```js
console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

Promise.resolve()
  .then(function () {
    console.log("promise1");
  })
  .then(function () {
    console.log("promise2");
  });

console.log("script end");
```

- **macrotasks**: `setTimeout`, `setInterval`, `setImmediate`, `requestAnimationFrame`, `I/O`, `UI渲染`
- **microtasks**: `Promise`, `process.nextTick`, `Object.observe`, `MutationObserver`

当一个程序有: setTimeout, setInterval, setImmediate, I/O, UI 渲染, Promise, process.nextTick, Object.observe, MutationObserver 的时候：

1. 先执行 macrotasks：I/O -》 UI 渲染-》requestAnimationFrame
2. 再执行 microtasks ：process.nextTick -》 Promise -》MutationObserver ->Object.observe
3. 再把 setTimeout setInterval setImmediate【三个货不讨喜】 塞入一个新的 macrotasks, 依次：setTimeout, setInterval --》setImmediate

- | 宏任务(macrotask) | 微任务(microtask)                                                                                                                               |
  | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
  | 谁发起            | 宿主(Node, 浏览器)                                                                                                                              | JS 引擎                                                                                               |
  | 具体事件          | 1.script (可以理解为外层同步代码)2. setTimeout/setInterval3. UI rendering/UI 事件 4. postMessage，MessageChannel5. setImmediate，I/O（Node.js） | 1. Promise2. MutaionObserver3. Object.observe（已废弃；Proxy 对象替代）4. process.nextTick（Node.js） |
  | 谁先执行          | 后执行                                                                                                                                          | 先执行                                                                                                |
  | 触发新一轮 tick   | 会                                                                                                                                              | 不会                                                                                                  |

但根据 @尤雨溪 的说法, window.postMessage() 在 macrotask queue 里, 比 MutationObserver 的 microtask queue 晚. [setTimeout with a shorter delayNew timerFunc in rc7 is laggy · Issue #3771 · vuejs/vue](https://github.com/vuejs/vue/issues/3771#issuecomment-249692588)

```js
setImmediate(function () {
  console.log(1);
}, 0);
setTimeout(function () {
  console.log(2);
}, 0);
new Promise(function (resolve) {
  console.log(3);
  resolve();
  console.log(4);
}).then(function () {
  console.log(5);
});
console.log(6);
process.nextTick(function () {
  console.log(7);
});
console.log(8);
// nodejs 结果是：3 4 6 8 7 5 2 1
```

参考：

- https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
- [翻译版本](https://www.jianshu.com/p/699714f653b2)

扩展知识：

- [宏任务和微任务到底是什么？](https://cloud.tencent.com/developer/article/1701427)
- 【必读】知乎-[Vue 中如何使用 MutationObserver 做批量处理？](https://www.zhihu.com/question/55364497/answer/254054336)
  - 【必读】https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
- https://zhuanlan.zhihu.com/p/367235134
  - [Event loop 和 JS 引擎、渲染引擎的关系(精致版)](https://zhuanlan.zhihu.com/p/371786505)
- [深入解析你不知道的 EventLoop 和浏览器渲染、帧动画、空闲回调（动图演示）](https://juejin.cn/post/6844904165462769678#heading-6)
- [你所不知道的 setTimeout](https://www.w3cplus.com/blog/2103.html)
- [你所不知道的 setInterval](https://www.w3cplus.com/javascript/javaScript-setInterval.html)
- 为什么需要 [microtask](https://html.spec.whatwg.org/multipage/webappapis.html#perform-a-microtask-checkpoint)
- https://262.ecma-international.org/6.0/#sec-jobs-and-job-queues
- https://www.jsv9000.app/
