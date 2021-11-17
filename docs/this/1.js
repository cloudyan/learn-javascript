
// 1. 默认绑定


// 1.1：非严格模式
var foo = 123;
function print(){
  this.foo = 234;
  console.log(this); // window
  console.log(foo);  // 234
}
print();

// 等同
window.foo = 123
function print() {
  this.foo = 234;
  console.log(this);
  console.log(window.foo);
}
window.print()


// 1.2：严格模式
'use strict';
var foo = 123;
function print(){
  console.log('print this is ', this);
  console.log(window.foo)
  console.log(this.foo);
}
console.log('global this is ', this);
print();


// 1.3：let/const
let a = 1;
const b = 2;
var c = 3;
function print() {
  console.log(this.a);
  console.log(this.b);
  console.log(this.c);
}
print();
console.log(this.a);


// 1.4：对象内执行
a = 1;
function foo() {
  console.log(this.a);
}
const obj = {
  a: 10,
  bar() {
    foo(); // 1
  }
}
obj.bar();


// 1.5：函数内执行
var a = 1
function outer () {
  var a = 2
  function inner () {
    console.log(this.a) // 1
  }
  inner()
}
outer()


// 1.6：自执行函数
a = 1;
(function(){
  console.log(this);
  console.log(this.a)
}())
function bar() {
  b = 2;
  (function(){
    console.log(this);
    console.log(this.b)
  }())
}
bar();
