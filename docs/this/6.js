
// 6.new绑定


// 6.1：new绑定
function User(name, age) {
  this.name = name;
  this.age = age;
}
var name = 'Tom';
var age = 18;

var zc = new User('zc', 24);
console.log(zc.name)


// 6.2：属性加方法
function User (name, age) {
  this.name = name;
  this.age = age;
  this.introduce = function () {
    console.log(this.name)
  }
  this.howOld = function () {
    return function () {
      console.log(this.age)
    }
  }
}
var name = 'Tom';
var age = 18;
var zc = new User('zc', 24)
zc.introduce()
zc.howOld()()


const User = {
  name: 'zc';
  age: 18;
  introduce = function () {
    console.log(this.name)
  }
  howOld = function () {
    return function () {
      console.log(this.age)
    }
  }
}
var name = 'Tom';
var age = 18;
User.introduce()
User.howOld()()


// 6.3：new界的天王山
function Foo(){
  getName = function(){ console.log(1); };
  return this;
}
Foo.getName = function(){ console.log(2); };
Foo.prototype.getName = function(){ console.log(3); };
var getName = function(){ console.log(4); };
function getName(){ console.log(5) };

Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();

// 1. 预编译
// GO = {
//   Foo: fn(Foo),
//   getName: function getName(){ console.log(5) };
// }
// 2. 分析后续执行
// Foo.getName(): 执行Foo上的getName方法，打印2
// getName(): 执行GO中的getName方法，打印4
// Foo().getName()

// 修改全局GO的getName为function(){ console.log(1); }
getName = function(){ console.log(1) }
// Foo为默认绑定，this -> window
// return window
return this
