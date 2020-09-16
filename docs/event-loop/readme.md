# Event loop

关于 Event loop 时序，我认为这一篇文章就足够了[Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

相关概念

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

参考：

- https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
- [翻译版本](https://www.jianshu.com/p/699714f653b2)

扩展知识：

- [你所不知道的setTimeout](https://www.w3cplus.com/blog/2103.html)
- [你所不知道的setInterval](https://www.w3cplus.com/javascript/javaScript-setInterval.html)
