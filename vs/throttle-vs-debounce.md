# throttle vs debounce

节流和防抖的区别

都是N 秒内多次执行稀释成一次，节流 throttle 保留第一次，防抖 debounce 保留最后一次。

- 节流(throttle)：保留第一次。高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率
- 防抖(debounce)：保留最后一次。触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间

区别：

- debounce 防抖动是将多次执行变为最后一次执行。最适合控制事件，例如键入或单击按钮
- throttle 节流是将多次执行变成每隔一段时间执行。最适合连续的用户事件，如调整大小和滚动。
  - shouldWait 标识为 false，则立即调用回调函数

处理如：

- window 的 resize、scroll
- mousedown、mousemove
- keyup、keydown

## 防抖 debounce

> 防抖(debounce)：触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间

举例：就好像在百度搜索时，每次输入之后都有联想词弹出，这个控制联想词的方法就不可能是输入框内容一改变就触发的，他一定是当你结束输入一段时间之后才会触发。

- 实现方式：每次触发事件时设置一个延迟调用方法，并且取消之前的延时调用方法
- 缺点：如果事件在规定的时间间隔内被不断的触发，则调用方法会被不断的延迟

**防抖重在清零 clearTimeout(timer)** 防止抖动，单位时间内事件触发会被重置，避免事件被误伤触发多次。

应用场景：

- 登录、发短信等按钮避免用户点击太快，以致于发送了多次请求，需要防抖
- 调整浏览器窗口大小时，resize 次数过于频繁，造成计算过多，此时需要一次到位，就用到了防抖
- 文本编辑器实时保存，当无任何更改操作一秒后进行保存

```js
// 防抖debounce代码：
function debounce(fn) {
  let timeout = null; // 创建一个标记用来存放定时器的返回值
  return function () {
    // 每当用户输入的时候把前一个 setTimeout clear 掉
    clearTimeout(timeout); // 清除之前的，保留最后一次
    // 然后又创建一个新的 setTimeout, 这样就能保证interval 间隔内如果时间持续触发，就不会执行 fn 函数
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, 500);
  };
}
// 处理函数
function handle() {
  console.log(Math.random());
}
// 滚动事件
window.addEventListener('scroll', debounce(handle));
```

## 节流 throttle

> 节流(throttle)：高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率

举例：预定一个函数只有在大于等于执行周期时才执行，周期内调用不执行。就好像你在淘宝抢购某一件限量热卖商品时，你不断点刷新点购买，可是总有一段时间你点上是没有效果，这里就用到了节流，就是怕点的太快导致系统出现bug。

- 实现方式：每次触发事件时，如果当前有等待执行的延时函数，则直接return

**节流重在加锁 timer=timeout** 控制流量，单位时间内事件只能触发一次，与服务器端的限流 (Rate Limit) 类似。

应用场景：

- scroll 事件，每隔一秒计算一次位置信息等
- 浏览器播放事件，每个一秒计算一次进度信息等
- input 框实时搜索并发送请求展示下拉列表，每隔一秒发送一次请求 (也可做防抖)

```js
// 节流throttle代码：
function throttle(fn) {
  let canRun = true; // 通过闭包保存一个标记
  return function () {
    // 在函数开头判断标记是否为true，不为true则return
    if (!canRun) return; // 保留第一次 其他的都return
    // 立即设置为false
    canRun = false;
    // 将外部传入的函数的执行放在setTimeout中
    setTimeout(() => {
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
      // 当定时器没有执行的时候标记永远是false，在开头被return掉
      fn.apply(this, arguments);
      canRun = true;
    }, 500);
  };
}

function sayHi(e) {
  console.log(e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener('resize', throttle(sayHi));
```

总结：

- 函数防抖：将多次操作合并为一次操作进行。原理是维护一个计时器，规定在delay时间后触发函数，但是在delay时间内再次触发的话，就会取消之前的计时器而重新设置。这样一来，只有最后一次操作能被触发。
- 函数节流：使得一定时间内只触发一次函数。原理是通过判断是否有延迟调用函数未执行。

区别：函数节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，而函数防抖只是在最后一次事件后才触发一次函数。 比如在页面的无限加载场景下，我们需要用户在滚动页面时，每隔一段时间发一次 Ajax 请求，而不是在用户停下滚动页面操作时才去请求数据。这样的场景，就适合用节流技术来实现。

参考：

- https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/5
- https://github.com/mqyqingfeng/Blog/issues/22
- https://github.com/mqyqingfeng/Blog/issues/26
