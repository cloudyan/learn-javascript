# Performance.memory

## 常见问题

- 内存模型
- 内存的生命周期
- 内存回收
- 内存泄漏的识别方法

- [Performance.memory](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/memory)

## 内存模型

JS内存空间分为栈(stack)、堆(heap)、池(一般也会归类为栈中)。

其中栈存放变量，堆存放复杂对象，池存放常量。

```js
// memory = performance.memory
{
  jsHeapSizeLimit: 4294705152,  // 上下文内可用堆的最大体积，以字节计算。
  totalJSHeapSize: 8757487,     // 已分配的堆体积，以字节计算。
  usedJSHeapSize: 7985291,      // 当前 JS 堆活跃段（segment）的体积，以字节计算。
}
```

使用示例，内存警告

```js
(function() {
  // Tune these for your application.
  var MAX_MEMORY_LIMIT = 20 * 1048576; // 20MB
  var MAX_PERCENT_THRESHOLD = 90;

  if (!window.performance || !window.performance.memory || !window.requestAnimationFrame || !window.trackJs) return;
  var hasAlarmed = false;

  requestAnimationFrame(function onFrame(){
    // Check if we've exceeded absolute memory limit
    const { memory } = performance
    if (memory.usedJSHeapSize > MAX_MEMORY_LIMIT) {
      hasAlarmed = true;
      var overage = memory.usedJSHeapSize - MAX_MEMORY_LIMIT;
      trackJs.track(new Error('Exceeded memory maximum limit by ' + overage + ' bytes'))
    }

    // Check if we've exceeded relative memory limit for client
    if (memory.usedJSHeapSize > (MAX_PERCENT_THRESHOLD/100) * memory.jsHeapSizeLimit) {
      hasAlarmed = true;
      trackJs.track(new Error('Memory usage exceeded ' + MAX_PERCENT_THRESHOLD + '% of maximum: ' + memory.jsHeapSizeLimit))
    }

    // Only alert once
    if (!hasAlarmed) {
      requestAnimationFrame(onFrame);
    }
  });
})();
```

参考

- [JavaScript 内存机制](https://www.cnblogs.com/liangyin/p/7764232.html)
- [我不知道的JS之JavaScript内存模型](https://zhuanlan.zhihu.com/p/150906619)
- [Javascript中堆栈到底是怎样划分的？](https://www.zhihu.com/question/42231657/answer/102552732)
