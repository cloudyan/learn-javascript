# 浏览器的五种 Observer

- https://mp.weixin.qq.com/s/-fLZe164aWAaPJ55iZ_m2w

API

- MutationObserver
- IntersectionObserver
- PerformanceObserver
- ResizeObserver
- ReportingObserver

## IntersectionObserver

监听元素可见性: 一个元素从不可见到可见，从可见到不可见

IntersectionObserver 可以监听一个元素和可视区域相交部分的比例，然后在可视比例达到某个阈值的时候触发回调。

```js
const intersectionObserver = new IntersectionObserver(
  function (entries) {
    console.log('info:');
    entries.forEach(item => {
      console.log(item.target, item.intersectionRatio)
    })
  }, {
  threshold: [0.5, 1],
});

intersectionObserver.observe(document.querySelector('#box1'));
intersectionObserver.observe(document.querySelector('#box2'));

// 创建一个 IntersectionObserver 对象，监听 box1 和 box2 两个元素，当可见比例达到 0.5 和 1 的时候触发回调。
```

使用场景

- 做一些数据采集的时候，希望知道某个元素是否是可见的，什么时候可见的，就可以用这个 api 来监听
- 做图片的懒加载的时候，可以当可视比例达到某个比例再触发加载。

## MutationObserver

MutationObserver 可以监听对元素的属性的修改、对它的子节点的增删改。

```js

```

使用场景

文章水印被人通过 devtools 去掉了，那么就可以通过 MutationObserver 监听这个变化，然后重新加上，让水印去不掉。

## ResizeObserver

元素可以用 ResizeObserver 监听大小的改变，当 width、height 被修改时会触发回调。

```js
const box = document.querySelector('#box');

setTimeout(() => {
  box.style.width = '200px';
}, 3000);

const resizeObserver = new ResizeObserver(entries => {
  console.log('当前大小', entries)
});
resizeObserver.observe(box);
```

可以拿到元素和它的位置、尺寸。

## PerformanceObserver

浏览器提供了 performance 的 api 用于记录一些时间点、某个时间段、资源加载的耗时等。

我们希望记录了 performance 那就马上上报，可是怎么知道啥时候会记录 performance 数据呢？

用 PeformanceObserver。

PerformanceObserver 用于监听记录 performance 数据的行为，一旦记录了就会触发回调，这样我们就可以在回调里把这些数据上报。

```js
performance.mark('registered-observer');

performance.measure('button clicked', 'from', 'to');
```

```html
<html>
<body>
  <button onclick="measureClick()">Measure</button>

  <img src="https://p9-passport.byteacctimg.com/img/user-avatar/4e9e751e2b32fb8afbbf559a296ccbf2~300x300.image" />

  <script>
    const performanceObserver = new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        console.log(entry);// 上报
      })
    });
    performanceObserver.observe({entryTypes: ['resource', 'mark', 'measure']});

    performance.mark('registered-observer');

    function measureClick() {
      performance.measure('button clicked');
    }
  </script>
</body>
</html>
```

创建 PerformanceObserver 对象，监听 mark（时间点）、measure（时间段）、resource（资源加载耗时） 这三种记录时间的行为。

然后我们用 mark 记录了某个时间点，点击 button 的时候用 measure 记录了某个时间段的数据，还加载了一个图片。

当这些记录行为发生的时候，希望能触发回调，在里面可以上报。

可以看到 mark 的时间点记录、资源加载的耗时、点击按钮的 measure 时间段记录都监听到了。

这些数据，可以用来做性能分析

## ReportingObserver

当浏览器运行到过时（deprecation）的 api 的时候，会在控制台打印一个过时的报告:

浏览器还会在一些情况下对网页行为做一些干预（intervention），比如会把占用 cpu 太多的广告的 iframe 删掉：

会在网络比较慢的时候把图片替换为占位图片，点击才会加载：

```log
[Intervention] Blocked call to navigator.vibrate because
```

这些干预或者过时的 api 并不是报错，所以不能用错误监听的方式来拿到，但这些情况对网页 app 来说可能也是很重要的：

比如我这个网页就是为了展示广告的，但浏览器一干预给我把广告删掉了，我却不知道。如果我知道的话或许可以优化下 iframe。

比如我这个网页的图片很重要，结果浏览器一干预给我换成占位图了，我却不知道。如果我知道的话可能会优化下图片大小。

所以自然也要监听，所以浏览器提供了 ReportingObserver 的 api 用来监听这些报告的打印，我们可以拿到这些报告然后上传。

```js
const reportingObserver = new ReportingObserver((reports, observer) => {
  for (const report of reports) {
    console.log(report.body);//上报
  }
}, {types: ['intervention', 'deprecation']});

reportingObserver.observe();
```

ReportingObserver 可以监听过时的 api、浏览器干预等报告等的打印，在回调里上报，这些是错误监听无法监听到但对了解网页运行情况很有用的数据。

- https://github.com/QuarkGluonPlasma/browser-api-exercize

总结

浏览器提供了这 5 种 Observer：

- IntersectionObserver：监听元素可见性变化，常用来做元素显示的数据采集、图片的懒加载
- MutationObserver：监听元素属性和子节点变化，比如可以用来做去不掉的水印
- ResizeObserver：监听元素大小变化

还有两个与元素无关的：

- PerformanceObserver：监听 performance 记录的行为，来上报数据
- ReportingObserver：监听过时的 api、浏览器的一些干预行为的报告，可以让我们更全面的了解网页 app 的运行情况
