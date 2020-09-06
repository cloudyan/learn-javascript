# Event loop

Tasks, microtasks, queues and schedules

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
