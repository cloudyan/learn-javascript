# Beacon API

Beacon 接口满足了分析和诊断代码的需要，这些代码通常会尝试在卸载文档之前将数据发送到 web服务器。发送数据的任何过早时机都可能导致错失收集数据的机会。但是，确保在卸载文档期间发送数据是开发人员难以做到的。

Beacon API 的 Navigator.sendBeacon() 方法用于在全局浏览上下文中向服务器发送数据信标。

使用 sendBeacon() 方法会使用户代理在有机会时异步地向服务器发送数据，同时不会延迟页面的卸载或影响下一导航的载入性能。这就解决了提交分析数据时的所有的问题：数据可靠，传输异步并且不会影响下一页面的加载。此外，代码实际上还要比其他技术简单许多！

```js
window.addEventListener('unload', logData, false);

// function logData() {
//   var xhr = new XMLHttpRequest();
//   xhr.open("POST", "/log", false); // 第三个参数表明是同步的 xhr, 同步会导致页面卸载被延迟。
//   xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
//   xhr.send(analyticsData);
// }

// 使用 sendBeacon, 是异步的
function logData() {
  navigator.sendBeacon("/log", analyticsData);
}
```
