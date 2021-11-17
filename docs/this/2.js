
// 2. 隐式绑定


// 2.1：隐式绑定
var a = 1;
function foo() {
  console.log(this.a);
}
// 对象简写，等同于 {a:2, foo: foo}
var obj = {a: 2, foo}
foo();
obj.foo();



// 2.2：对象链式调用
// 感觉上面总是空谈链式调用的情况，下面直接来看一个例题：
var obj1 = {
  a: 1,
  obj2: {
    a: 2,
    foo(){
      console.log(this.a)
    }
  }
}
obj1.obj2.foo() // 2
