# Page Visibility API

### 临界值

这个 API 主要在`document`对象上，新增了一个`document.visibilityState`属性。该属性返回一个字符串，表示页面当前的可见性状态，共有三个可能的值。

- hidden：页面彻底不可见。
- visible：页面至少一部分可见。
- prerender：页面即将或正在渲染，处于不可见状态。

其中，`hidden`状态和`visible`状态是所有浏览器都必须支持的。`prerender`状态只在支持"预渲染"的浏览器上才会出现，比如 Chrome 浏览器就有预渲染功能，可以在用户不可见的状态下，预先把页面渲染出来，等到用户要浏览的时候，直接展示渲染好的网页。

只要页面可见，哪怕只露出一个角，`document.visibilityState` 属性就返回`visible`。只有以下四种情况，才会返回`hidden`。

- 浏览器最小化。
- 浏览器没有最小化，但是当前页面切换成了背景页。
- 浏览器将要卸载（`unload`）页面。
- 操作系统触发锁屏屏幕。

```js
document.addEventListener('visibilitychange', function () {
  // 用户离开了当前页面
  if (document.visibilityState === 'hidden') {
    document.title = '页面不可见';
    console.log(document.title);
  }

  // 用户打开或回到页面
  if (document.visibilityState === 'visible') {
    document.title = '页面可见';
    console.log(document.title);
  }
});
```

> 注意，`document.visibilityState`属性只针对顶层窗口，内嵌的`<iframe>`页面的`document.visibilityState`属性由顶层窗口决定。使用 CSS 属性隐藏`<iframe>`页面（比如`display: none;`），并不会影响内嵌页面的可见性。

参考：

- http://www.ruanyifeng.com/blog/2018/10/page_visibility_api.html
