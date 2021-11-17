
// 9.综合题


// 9.1: 对象综合体
var name = 'window'
var user1 = {
  name: 'user1',
  foo1: function () {
    console.log(this.name)
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name)
    }
  },
  foo4: function () {
    return () => {
      console.log(this.name)
    }
  }
}
var user2 = { name: 'user2' }

user1.foo1()
user1.foo1.call(user2)

user1.foo2()
user1.foo2.call(user2)

user1.foo3()()
user1.foo3.call(user2)()
user1.foo3().call(user2)

user1.foo4()()
user1.foo4.call(user2)()
user1.foo4().call(user2)


// 9.2：隐式绑定丢失
var x = 10;
var foo = {
  x : 20,
  bar : function(){
    var x = 30;
    console.log(this.x)

  }
};
foo.bar();
(foo.bar)();
(foo.bar = foo.bar)();
(foo.bar, foo.bar)();


// 9.3：arguments(推荐看)
var length = 10;
function fn() {
  console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};

obj.method(fn, 1);


// 9.4：压轴题(推荐看)
var number = 5;
var obj = {
  number: 3,
  fn: (function () {
    var number;
    this.number *= 2;
    number = number * 2;
    number = 3;
    return function () {
      var num = this.number;
      this.number *= 2;
      console.log(num);
      number *= 3;
      console.log(number);
    }
  })()
}
var myFun = obj.fn;
myFun.call(null);
obj.fn();
console.log(window.number);


// 附赠

var num = 10
var obj = {num: 20}
obj.fn = (function (num) {
  this.num = num * 3
  num++
  return function (n) {
    this.num += n
    num++
    console.log(num)
  }
})(obj.num)
var fn = obj.fn
fn(5)
obj.fn(10)
console.log(num, obj.num)
