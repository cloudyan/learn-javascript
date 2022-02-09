# Event loop

关于 **Event loop 的时序**，我认为这一篇文章就足够了[Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

- https://github.com/sisterAn/blog/issues/21

这里涉及的相关概念：

- 宏任务 Tasks
- 微任务 microTask
- 执行栈
- 任务队列
- Event Loop

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

- macrotasks: setTimeout ，setInterval， setImmediate，requestAnimationFrame,I/O ，UI渲染
- microtasks: Promise， process.nextTick， Object.observe， MutationObserver

当一个程序有：setTimeout， setInterval ，setImmediate， I/O， UI渲染，Promise ，process.nextTick， Object.observe， MutationObserver的时候：

1. 先执行 macrotasks：I/O -》 UI渲染-》requestAnimationFrame
2. 再执行 microtasks ：process.nextTick -》 Promise -》MutationObserver ->Object.observe
3. 再把setTimeout setInterval setImmediate【三个货不讨喜】 塞入一个新的macrotasks，依次：setTimeout ，setInterval --》setImmediate

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

- https://www.zhihu.com/question/55364497/answer/254054336
- [你所不知道的setTimeout](https://www.w3cplus.com/blog/2103.html)
- [你所不知道的setInterval](https://www.w3cplus.com/javascript/javaScript-setInterval.html)
