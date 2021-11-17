
// 4. 显示绑定


// 4.1：比较三种调用方式
function foo () {
  console.log(this.a)
}
var obj = { a: 1 }
var a = 2

foo()
foo.call(obj)
foo.apply(obj)
foo.bind(obj)

// foo(): 默认绑定。
// foo.call(obj): 显示绑定，foo的this指向obj
// foo.apply(obj): 显式绑定
// foo.bind(obj): 显式绑定，但不会立即执行函数，没有返回值


// 4.2：隐式绑定丢失
// 题目3.4发生隐式绑定的丢失，如下代码：我们可不可以通过显式绑定来修正这个问题。
function foo() {
  console.log(this.a)
}
function doFoo(fn) {
  console.log(this)
  fn()
}
var obj = { a: 1, foo }
var a = 2
doFoo(obj.foo)

// 首先先修正doFoo()函数的this指向。
doFoo.call(obj, obj.foo)

// 然后修正fn的this。
function foo() {
  console.log(this.a)
}
function doFoo(fn) {
  console.log(this)
  fn.call(this)
}
var obj = { a: 1, foo }
var a = 2
doFoo(obj.foo)


// 4.3：回调函数与call
// 接着上一个题目的风格，稍微变点花样：
var obj1 = {
  a: 1
}
var obj2 = {
  a: 2,
  bar: function () {
      console.log(this.a)
  },
  foo: function () {
    setTimeout(function () {
      console.log(this)
      console.log(this.a)
    }.call(obj1), 0)
  }
}
var a = 3
obj2.bar()
obj2.foo()
// 做题之前，先了解一下setTimeout的内部机制：(关于异步的执行顺序，可以参考JavaScript之EventLoop[6])

setTimeout(fn) {
  if (回调条件满足) {
    fn
  }
}
// 这样一看，本题就清楚多了，类似题目4.2，修正了回调函数内fn的this指向。


// 4.4：注意call位置
function foo () {
  console.log(this.a)
}
var obj = { a: 1 }
var a = 2

foo()
foo.call(obj)
foo().call(obj)
// foo(): 默认绑定
// foo.call(obj): 显式绑定
// foo().call(obj): 对foo()执行的返回值执行call，foo返回值为undefined，执行call()会报错


// 4.5：注意call位置(2)
// 上面由于foo没有返回函数，无法执行call函数报错，因此修改一下foo函数，让它返回一个函数。

function foo () {
  console.log(this.a)
  return function() {
    console.log(this.a)
  }
}
var obj = { a: 1 }
var a = 2

foo()
foo.call(obj)
foo().call(obj)
// foo(): 默认绑定
// foo.call(obj): 显式绑定
// foo().call(obj): foo()执行，打印2，返回匿名函数通过call将this指向obj，打印1。
// 这里千万注意：最后一个foo().call(obj)有两个函数执行，会打印2个值。


// 4.6：bind
// 将上面的call全部换做bind函数，又会怎样那？

// call是会立即执行函数，bind会返回一个新函数，但不会执行函数

function foo () {
  console.log(this.a)
  return function() {
    console.log(this.a)
  }
}
var obj = { a: 1 }
var a = 2

foo()
foo.bind(obj)
foo().bind(obj)


// 4.7：外层this与内层this
// 做到这里，不由产生了一些疑问：如果使用call、bind等修改了外层函数的this，那内层函数的this会受影响吗？(注意区别箭头函数)
function foo () {
  console.log(this.a)
  return function() {
    console.log(this.a)
  }
}
var obj = { a: 1 }
var a = 2
foo.call(obj)()


// 4.8：对象中的call
// 把上面的代码移植到对象中，看看会发生怎样的变化？

var obj = {
  a: 'obj',
  foo: function () {
    console.log('foo:', this.a)
    return function () {
      console.log('inner:', this.a)
    }
  }
}
var a = 'window'
var obj2 = { a: 'obj2' }

obj.foo()()
obj.foo.call(obj2)()
obj.foo().call(obj2)


// 4.9：带参数的call
// 显式绑定一开始讲的时候，就谈过call/apply存在传参差异，那咱们就来传一下参数，看看传完参数的this会是怎样的美妙。

var obj = {
  a: 1,
  foo: function (b) {
    b = b || this.a
    return function (c) {
      console.log(this.a + b + c)
    }
  }
}
var a = 2
var obj2 = { a: 3 }

obj.foo(a).call(obj2, 1)
obj.foo.call(obj2)(1)
