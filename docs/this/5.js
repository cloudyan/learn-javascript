
// 5.显式绑定扩展

// 5.1：apply求数组最值
// JavaScript中没有给数组提供类似max和min函数，只提供了Math.max/min，用于求多个数的最值，所以可以借助apply方法，直接传递数组给Math.max/min

const arr = [1,10,11,33,4,52,17]
Math.max.apply(Math, arr)
Math.min.apply(Math, arr)


// 5.2：类数组转为数组
// ES6未发布之前，没有Array.from方法可以将类数组转为数组，采用Array.prototype.slice.call(arguments)或[].slice.call(arguments)将类数组转化为数组。


// 5.3：数组高阶函数
// 日常编码中，我们会经常用到forEach、map等，但这些数组高阶方法，它们还有第二个参数thisArg，每一个回调函数都是显式绑定在thisArg上的。

// 例如下面这个例子

const obj = {a: 10}
const arr = [1, 2, 3, 4]
arr.forEach(function (val, key){
  console.log(`${key}: ${val} --- ${this.a}`)
}, obj)
