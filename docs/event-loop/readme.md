# Event loop

关于 **Event loop 的时序**，我认为仔细阅读 Jake Archibald 介绍 task 和 microtask 的这一篇文章就足够了[Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

- https://github.com/sisterAn/blog/issues/21
- [要就来45道Promise面试题一次爽到底](https://juejin.cn/post/6844904077537574919)
- https://juejin.cn/post/6945319439772434469

这里涉及的相关概念：

- 宏任务 Tasks
- 微任务 microTask
- 执行栈
- 任务队列
- Event Loop

> ES6 规范中，microtask 称为 `jobs`，macrotask 称为 `task`。
>
> 宏任务是由宿主发起的，而微任务由JavaScript自身发起。

```js
console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);

Promise.resolve()
  .then(function () {
    console.log('promise1');
  })
  .then(function () {
    console.log('promise2');
  });

console.log('script end');
```

- **macrotasks**: `setTimeout`, `setInterval`, `setImmediate`, `requestAnimationFrame`, `I/O`, `UI渲染`
- **microtasks**: `Promise`, `process.nextTick`, `Object.observe`, `MutationObserver`

当一个程序有: setTimeout, setInterval, setImmediate, I/O, UI渲染, Promise, process.nextTick, Object.observe, MutationObserver 的时候：

1. 先执行 macrotasks：I/O -》 UI渲染-》requestAnimationFrame
2. 再执行 microtasks ：process.nextTick -》 Promise -》MutationObserver ->Object.observe
3. 再把setTimeout setInterval setImmediate【三个货不讨喜】 塞入一个新的macrotasks, 依次：setTimeout, setInterval --》setImmediate

 -  | 宏任务(macrotask)                       | 微任务(microtask)
--- | ------------------------               | ----
 谁发起 |  宿主(Node, 浏览器)   | JS 引擎
 具体事件 |  1.script (可以理解为外层同步代码)2. setTimeout/setInterval3. UI rendering/UI事件4. postMessage，MessageChannel5. setImmediate，I/O（Node.js）              | 1. Promise2. MutaionObserver3. Object.observe（已废弃；Proxy 对象替代）4. process.nextTick（Node.js）
 谁先执行 |  后执行              | 先执行
 触发新一轮 tick |  会              | 不会

但根据 @尤雨溪 的说法, window.postMessage() 在 macrotask queue 里, 比 MutationObserver 的 microtask queue 晚. [setTimeout with a shorter delayNew timerFunc in rc7 is laggy · Issue #3771 · vuejs/vue](https://github.com/vuejs/vue/issues/3771#issuecomment-249692588)

```js
setImmediate(function(){
  console.log(1);
},0);
setTimeout(function(){
  console.log(2);
},0);
new Promise(function(resolve){
  console.log(3);
  resolve();
  console.log(4);
}).then(function(){
  console.log(5);
});
console.log(6);
process.nextTick(function(){
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
- [你所不知道的setTimeout](https://www.w3cplus.com/blog/2103.html)
- [你所不知道的setInterval](https://www.w3cplus.com/javascript/javaScript-setInterval.html)
- 为什么需要 [microtask](https://html.spec.whatwg.org/multipage/webappapis.html#perform-a-microtask-checkpoint)
- https://262.ecma-international.org/6.0/#sec-jobs-and-job-queues
- https://www.jsv9000.app/
