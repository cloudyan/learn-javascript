# PerformanceObserver API

- https://web.dev/custom-metrics/
- https://web.dev/metrics/

有了PerformanceObserver你可以被动地订阅性能相关的事件，这意味着这些API一般不会与页面的性能干扰，因为它们的回调过程中通常发射空闲周期。

您可以PerformanceObserver通过向它传递一个回调来创建一个，以便在调度新的性能条目时运行。然后你告诉观察者通过observe()方法监听什么类型的条目：

```js
// Catch errors since some browsers throw when using the new `type` option.
// https://bugs.webkit.org/show_bug.cgi?id=209216
try {
  const po = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // Log the entry and all associated details.
      console.log(entry.toJSON());
    }
  });

  po.observe({type: 'some-entry-type'});
} catch (e) {
  // Do nothing if the browser doesn't support this API.
}
```
