# requestAnimationFrame

流畅动画，不支持时降级为 setTimeout

## 相关概念

- `window.requestAnimationFrame(callback)`
- `performance.now()` vs `Date.now()`
  - [DOMHighResTimeStamp](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMHighResTimeStamp)
  - 官方的W3C规范: [高分辨率时间API](https://www.w3.org/TR/hr-time/)
  - 定时器循环（timer loop）
- draf (double requestAnimationFrame)
- chrome-Timeline
- 帧率分布：setInterval VS requestAnimationFrame
- Tween.js
- [raf-stream](https://github.com/CMTegner/raf-stream)
- [window.requestIdleCallback()](https://w3c.github.io/requestidlecallback/)
- [HTML 5标准](https://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#timers)规定
  - `setTimeout()`的最短时间间隔是4毫秒
  - `setInterval()`的最短间隔时间是10毫秒
- `setTimeout()`中回调函数中的`this`
- 关于 `setTimeout(fn, 0)`
  - 作用是什么
    - 调整事件的发生顺序
    - 分割耗时任务（分片）
  - 真的是 0 么，需要注意什么
  - 延迟时间最大能设置多少
- debounce（防抖动）

现实中，最好不要设置太多个setTimeout()和setInterval()，它们耗费CPU。比较理想的做法是，将要推迟执行的代码都放在一个函数里，然后只对这个函数使用setTimeout()或setInterval()。

## `window.requestAnimationFrame(callback)`

`requestAnimationFrame` 是单回调，调用一次就只执行一次，实现动画，就需要循环调用 `requestAnimationFrame`

```js
function moveTo(dom, to) {
  dom.scrollLeft += 1;
  if (dom.scrollLeft <= to) {
    window.requestAnimationFrame(() => {
      moveTo(element, to)
    })
  }
}
```

## double requestAnimationFrame

https://github.com/zheeeng/draf

Double RAF is useful for ensuring that animations start before expensive rendering is done. It helps provide smoother user experience by making animations feel reactive. Normal rendering would block the animation from starting. With double RAF as shown here the rendering function safely runs in the main thread after the animation has already started.

```js
const draf = require('draf')
const startAnimating = element => element.classList.add('animating')
const renderNextView = function() {/* ... */}
let button = document.createElement('button')

button.addEventListener('click', function() {
  startAnimating(this)
  draf(renderNextView)
})
```

## `performance.now()` vs `Date.now()`

- `performance.now()` 是相对于页面加载和数量级更精确。用例包括基准测试和其他需要高分辨率时间的情况，例如媒体（游戏，音频，视频等）
- `Date.now()` 相对于Unix时代（1970-01-01T00：00：00Z）并且依赖于系统时钟

```js
// performance.now()
function doSomething() {
  for (let i = 0; i < 100000; i++) {
    const arr = []
    arr.length = 1000
    arr.fill(1)
  }
}
let t0 = window.performance.now();
doSomething();
let t1 = window.performance.now();
console.log("doSomething函数执行了" + (t1 - t0) + "毫秒.")
```

和JavaScript中其他可用的时间类函数（比如`Date.now`）不同的是，`window.performance.now()`返回的时间戳没有被限制在一毫秒的精确度内，而它使用了一个浮点数来达到微秒级别的精确度。

另外一个不同点是，`window.performance.now()`是以一个恒定的速率慢慢增加的，它不会受到系统时间的影响（可能被其他软件调整）。另外，`performance.timing.navigationStart + performance.now()` 约等于 `Date.now()`。

requestAnimationFrame还有以下两个优势

> **CPU节能**：使用`setTimeout`实现的动画，当页面被隐藏（隐藏的<iframe>）或最小化（后台标签页）时，`setTimeout`仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，而且还浪费 CPU 资源和电池寿命。而`requestAnimationFrame`则完全不同，当页面处于未激活的状态下，该页面的屏幕绘制任务也会被浏览器暂停，因此跟着浏览器步伐走的`requestAnimationFrame`也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了 CPU 开销，提升性能和电池寿命。

> **函数节流**：在高频率事件(`resize`,`scroll` 等)中，为了防止在一个刷新间隔内发生多次函数执行，使用`requestAnimationFrame`可保证每个绘制间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。一个绘制间隔内函数执行多次时无意义，因为显示器（60Hz）每16.7ms 绘制一次，多次执行并不会在屏幕上体现出来。

## 缓动(Tween)知识

- Linear：无缓动效果
- Quadratic：二次方的缓动（t^2）
- Cubic：三次方的缓动（t^3）
- Quartic：四次方的缓动（t^4）
- Quintic：五次方的缓动（t^5）
- Sinusoidal：正弦曲线的缓动（sin(t)）
- Exponential：指数曲线的缓动（2^t）
- Circular：圆形曲线的缓动（sqrt(1-t^2)）
- Elastic：指数衰减的正弦曲线缓动
- 超过范围的三次方缓动（(s+1)*t^3 – s*t^2）
- 指数衰减的反弹缓动

每个效果都分三个缓动方式，分别是（可采用后面的邪恶记忆法帮助记忆）：

- easeIn：从0开始加速的缓动
- easeOut：减速到0的缓动
- easeInOut：前半段从0开始加速，后半段减速到0的缓动

## setTimeout()中回调函数中的this

```js
// 示例 1
var x = 1;
var o = {
  x: 2,
  y: function() {
    console.log(this.x);
  }
};
setTimeout(o.y,1000);

// 示例 2
function User(login) {
  this.login = login;
  this.sayHi = function() {
    console.log(this.login);
  }
}
var user = new User('John');
setTimeout(user.sayHi, 1000);

// 解决办法
setTimeout(function() {
  user.sayHi();
}, 1000);
setTimeout(user.sayHi.bind(user), 1000);
```

参考：

- https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
- https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/now
- https://www.w3.org/TR/animation-timing/#requestAnimationFrame
- https://www.npmjs.com/package/raf
- https://www.npmjs.com/package/@essentials/raf
- https://github.com/zheeeng/draf

扩展阅读：

- [深入理解requestAnimationFrame并实现相册组件中的切换动画](https://www.cnblogs.com/dreamsqin/p/12529885.html)
- [翻译：setInterval与requestAnimationFrame的时间间隔测试](https://segmentfault.com/a/1190000000386368)
- [CSS3动画那么强，requestAnimationFrame还有毛线用？](https://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%e5%8a%a8%e7%94%bb%e7%ae%97%e6%b3%95/)
- [理解WebKit和Chromium: 渲染主循环（main loop)和requestAnimationFrame](https://blog.csdn.net/milado_nju/article/details/8101188)
- [你所不知道的setTimeout](https://www.w3cplus.com/blog/2103.html)
- [你所不知道的setInterval](https://www.w3cplus.com/javascript/javaScript-setInterval.html)
