# stroke-dasharray & stroke-dashoffset

## stroke-dasharray

设置实线和虚线的宽度，`stroke-dasharray: 10 100;` 省略第二个值则相当于设置为第一个值，负值无效。

## stroke-dashoffset

相对于绘制的起点偏移的量，正值(向右或者顺时针偏移)，负值(向左或者逆时针)

- 推移后，dasharray还是会保持循环。
- dashoffset的值不会大于dasharray。
- 如果dashoffset 等于dasharray，线段起始点会是空白。


## 用百分比设置 `stroke-dasharray`

以前也没想到过使用百分比设置 `stroke-dasharray`，这次由于是比例关系，用百分比设置看起来会方便很多，比如 `stroke-dasharray`="25% 75%"，是不是就可以省去周长的计算呢？答案是不行。经过一些测试，发现百分比的参照物并不是圆形自身，而是 svg 元素。百分比的取值也比较奇特，100% 表示的是参照物高宽的平均值，即 (width + height) / 2。

参考：

- https://blog.csdn.net/u014291497/article/details/78409350
- https://juejin.cn/post/6844903798444392455
- https://github.com/YIXUNFE/blog/issues/60
- https://wcc723.github.io/svg/2014/06/15/svg-css-stroke-animation/
- https://www.zhangxinxu.com/wordpress/2014/04/
- animateion-line-drawing-svg-path-%E5%8A%A8%E7%94%BB-%E8%B7%AF%E5%BE%84/
