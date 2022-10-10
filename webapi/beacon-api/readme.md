# Beacon API

- [W3c Navigator.sendBeacon()](https://www.w3.org/TR/beacon)
- [Beacon_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Beacon_API)
- polyfill - [navigator.sendbeacon](https://www.npmjs.com/package/navigator.sendbeacon)
- [visibilitychange_event](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/visibilitychange_event)

Beacon 接口满足了分析和诊断代码的需要，这些代码通常会尝试在卸载文档之前将数据发送到 web服务器。发送数据的任何过早时机都可能导致错失收集数据的机会。但是，确保在卸载文档期间发送数据是开发人员难以做到的。

过去，为了解决这个问题， 统计和诊断代码通常要在

- 发起一个同步 ​​XMLHttpRequest​​ 来发送数据。
- 创建一个​ `​<img>​​`​ 元素并设置​​src​​，大部分用户代理会延迟卸载（unload）文档以加载图像。
- 创建一个几秒的 no-op 循环。

上述的所有方法都会迫使用户代理延迟卸载文档，并使得下一个导航出现的更晚。下一个页面对于这种较差的载入表现无能为力。

这就是 ​​sendBeacon()​​​ 方法存在的意义。使用 ​​sendBeacon()​​ 方法会使用户代理在有机会时异步地向服务器发送数据，同时不会延迟页面的卸载或影响下一导航的载入性能，这意味着：

- 数据发送是可靠的。
- 数据异步传输。
- 不影响下一导航的载入。

此外，代码实际上还要比其他技术简单许多！

Beacon API 的 Navigator.sendBeacon() 方法用于在**全局浏览上下文**中向服务器发送数据信标。

> 思考: 在 APP 中H5 采用每个页面都新开 webview 打开，是否存在问题。

```js
// 语法
navigator.sendBeacon(url);
navigator.sendBeacon(url, data);
```

​​data​​​ 参数可选，是将要发送的 ​ `​ArrayBuffer`​​​、​ `​ArrayBufferView`​​​、​ `​Blob`​​​、​ `​DOMString`​​​、​ `​FormData`​​​ 或 ​`​URLSearchParams​`​ 类型的数据。

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


## 避免使用 unload 和 beforeunload​​

- https://blog.51cto.com/liuhao9999/5261189

过去，许多网站使用 ​​unload (en-US)​​​ 或 ​​beforeunload (en-US)​​​ 事件以在会话结束时发送统计数据。然而这是不可靠的，在许多情况下（尤其是移动设备）浏览器不会产生 ​​unload​​​、​​beforeunload​​​ 或 ​​pagehide​​ 事件。下面列出了一种不触发上述事件的情况：

1. 用户加载了网页并与其交互。
2. 完成浏览后，用户切换到了其它应用程序，而不是关闭选项卡。
3. 随后，用户通过手机的应用管理器关闭了浏览器应用。

此外，​​unload​​​ 事件与现代浏览器实现的往返缓存（​[​bfcache](https://web.dev/bfcache/)​​​）不兼容。在部分浏览器（如：Firefox）通过在 bfcache 中排除包含 ​​unload​​​ 事件处理器的页面来解决不兼容问题，但这存在性能损失。其它浏览器，例如 Safari 和 Android 上的 Chrome 浏览器则采取用户在同一标签页下导航至其它页面时不触发 ​​unload​​ 事件的方法来解决不兼容问题。

Firefox 也会在 bfcache 中排除包含 ​​beforeunload​​ 事件处理器的页面。

使用 pagehide 作为回退

可使用 ​​pagehide (en-US)​​​ 事件来代替部分浏览器未实现的 ​​visibilitychange​​​ 事件。和 ​​beforeunload​​​ 与 ​​unload​​ 事件类似，这一事件不会被可靠地触发（特别是在移动设备上），但它与 bfcache 兼容。

### 示例代码

当其选项卡的内容变得可见或被隐藏时，会在文档上触发 visibilitychange (能见度更改) 事件。

可使用 ​​visibilitychange (en-US)​​​ 事件来调用 ​​sendBeacon()​​ 以发送统计数据。

```js
document.addEventListener('visibilitychange', function logData() {
  if (document.visibilityState === 'hidden') {
    navigator.sendBeacon('/log', analyticsData);
  }
});
```

> 警告： 当 visibleStateState 属性的值转换为 hidden 时，Safari 不会按预期触发 visibilitychange；因此，在这种情况下，您还需要包含代码以侦听 [pagehide](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/pagehide_event) 事件。
>
> 警告： 出于兼容性原因，请确保使用 document.addEventListener 而不是 window.addEventListener 来注册回调。Safari <14.0 仅支持前者。

- [Window: 页面隐藏事件 (pagehide event)](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/pagehide_event)

当浏览器在显示与会话历史记录不同的页面的过程中隐藏当前页面时，pagehide(页面隐藏) 事件会被发送到一个Window 。例如，当用户单击浏览器的“后退”按钮时，当前页面在显示上一页之前会收到一个pagehide(页面隐藏) 事件。

```js
window.addEventListener("pagehide", event => {
  if (event.persisted) {
    /* the page isn't being discarded, so it can be reused later */
  }
}, false);
```
