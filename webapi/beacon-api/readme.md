# Beacon API

- [W3c Navigator.sendBeacon()](https://www.w3.org/TR/beacon)
- [Beacon_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Beacon_API)
- polyfill - [navigator.sendbeacon](https://www.npmjs.com/package/navigator.sendbeacon)

Beacon 接口满足了分析和诊断代码的需要，这些代码通常会尝试在卸载文档之前将数据发送到 web服务器。发送数据的任何过早时机都可能导致错失收集数据的机会。但是，确保在卸载文档期间发送数据是开发人员难以做到的。

Beacon API 的 Navigator.sendBeacon() 方法用于在全局浏览上下文中向服务器发送数据信标。

使用 sendBeacon() 方法会使用户代理在有机会时异步地向服务器发送数据，同时不会延迟页面的卸载或影响下一导航的载入性能。这就解决了提交分析数据时的所有的问题：数据可靠，传输异步并且不会影响下一页面的加载。此外，代码实际上还要比其他技术简单许多！

**由 sendBeacon 发起的请求受以下属性的约束：**

如果有效载荷是一个`application/x-www-form-urlencoded`，`multipart/form-data`或者`text/plain`，那么请求是不需要额外CORS-预检一个简单的请求; 与脚本化表单发布或 XHR/fetch 相同。
否则，如果有效负载是 aBlob并且结果`Content-Type`不是简单的 header，则进行 CORS 预检，服务器需要首先通过返回适当的 CORS 标头集 ( `Access-Control-Allow-Credentials`, `Access-Control-Allow-Origin`, `Access-Control-Allow-Headers`)来允许此类请求；与 XHR/fetch 相同。

```js
window.addEventListener('unload', logData, false);

// function logData() {
//   var xhr = new XMLHttpRequest();
//   xhr.open("POST", "/log", false); // 第三个参数 false 表明是同步的 xhr, 同步会导致页面卸载被延迟。
//   xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
//   xhr.send(analyticsData);
// }

// 使用 sendBeacon, 是异步的
function logData() {
  navigator.sendBeacon('/log', ''); // 是个 post 请求
}
```

polyfill

```js
navigator.sendBeacon || function () {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", arguments[0], true);
  r.send(arguments[1]);
}
```
