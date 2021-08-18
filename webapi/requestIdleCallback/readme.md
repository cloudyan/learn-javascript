# requestIdleCallback

- [requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)

window.requestIdleCallback()方法将在浏览器的空闲时段内调用的函数排队。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱执行顺序。

你可以在空闲回调函数中调用requestIdleCallback()，以便在下一次通过事件循环之前调度另一个回调。

> 强烈建议使用timeout选项进行必要的工作，否则可能会在触发回调之前经过几秒钟。

```js
// 语法
var handle = window.requestIdleCallback(callback[, options])

// 示例
requestIdleCallback(myNonEssentialWork, { timeout: 2000 });
​
// 任务队列
const task = (t) => () => console.log(t);
const tasks = [
  task('第一个任务'),
  task('第二个任务'),
  task('第三个任务'),
];
​
function myNonEssentialWork (deadline) {
  // 如果帧内有富余的时间，或者超时
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && tasks.length > 0) {
    work();
  }
​
  if (tasks.length > 0)
    requestIdleCallback(myNonEssentialWork);
  }
​
function work () {
  tasks.shift()();
  console.log('执行任务');
}
// https://developer.mozilla.org/zh-CN/docs/Web/API/Background_Tasks_API#example
```

实现fiber

window.requestIdleCallback(callback,[,options])方法将在浏览器的空闲时段内调用的函数排队。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间 timeout ，则有可能为了在超时前执行函数而打乱执行顺序。你可以在空闲回调函数中调用 requestIdleCallback() ，以便在下一次通过事件循环之前调度另一个回调。

callback

一个在事件循环空闲时即将被调用的函数的引用。函数会接收到一个名为 IdleDeadline(https://developer.mozilla.org/zh-CN/docs/Web/API/IdleDeadline) 的参数，这 个参数可以获取当前空闲时间以及回调是否在超时时间前已经执行的状态。

options 可选 包括可选的配置参数。具有如下属性:

timeout :如果指定了timeout并具有一个正值，并且尚未通过超时毫秒数调用回调，那么回调会 在下一次空闲时期被强制执行，尽管这样很可能会对性能造成负面影响。

react中requestIdleCallback的hack在react/packages/scheduler/src/forks/SchedulerHostConfig.default.js。

