
// 3. 隐式绑定的丢失

// 隐式绑定可是个调皮的东西，一不小心它就会发生绑定的丢失。一般会有两种常见的丢失：

// - 使用另一个变量作为函数别名，之后使用别名执行函数
// - 将函数作为参数传递时会被隐式赋值

// 隐式绑定丢失之后，this的指向会启用默认绑定。


// 3.1：取函数别名
a = 1
var obj = {
    a: 2,
    foo() {
        console.log(this.a)
    }
}
var foo = obj.foo;
obj.foo();
foo();


// 3.2：取函数别名
// 如果取函数别名没有发生在全局，而是发生在对象之中，又会是怎样的结果呢？
var obj = {
  a: 1,
  foo() {
    console.log(this.a)
  }
};
var a = 2;
var foo = obj.foo;
var obj2 = { a: 3, foo: obj.foo }

obj.foo();
foo();
obj2.foo();


// 3.3：函数作为参数传递
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


// 3.4：函数作为参数传递
// 将上面的题略作修改，doFoo不在window上执行，改为在obj2中执行
function foo() {
  console.log(this.a)
}
function doFoo(fn) {
  console.log(this)
  fn()
}
var obj = { a: 1, foo }
var a = 2
var obj2 = { a: 3, doFoo }
obj2.doFoo(obj.foo)


// 3.5：回调函数
// 下面这个题目我们写代码时会经常遇到：
var name='zcxiaobao';
function introduce(){
  console.log('Hello,My name is ', this.name);
}
const Tom = {
  name: 'TOM',
  introduce: function(){
    setTimeout(function(){
      console.log(this)
      console.log('Hello, My name is ',this.name);
    })
  }
}
const Mary = {
  name: 'Mary',
  introduce
}
const Lisa = {
  name: 'Lisa',
  introduce
}

// 提前存储
Tom.introduce();
setTimeout(Mary.introduce, 100);
setTimeout(function(){
  Lisa.introduce();
},200);

const Tom = {
  name: 'TOM',
  introduce: function(){
    _self = this
    setTimeout(function(){
      console.log('Hello, My name is ',_self.name);
    })
  }
}
Tom.introduce()


// 3.6：隐式绑定丢失综合题
name = 'javascript' ;
let obj = {
  name: 'obj',
  A (){
    this.name += 'this';
    console.log(this.name)
  },
  B(f){
    this.name += 'this';
    f();
  },
  C(){
    setTimeout(function(){
      console.log(this.name);
    },1000);
  }
}
let a = obj.A;
a();
obj.B(function(){
    console.log(this.name);
});
obj.C();
console.log(name);
