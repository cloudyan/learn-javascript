
// 7.箭头函数


// 7.1：对象方法使用箭头函数
name = 'tom'
const obj = {
  name: 'zc',
  intro: () => {
    console.log('My name is ' + this.name)
  }
}
obj.intro()


// 7.2：箭头函数与普通函数比较
name = 'tom'
const obj = {
  name: 'zc',
  intro:function ()  {
    return () => {
      console.log('My name is ' + this.name)
    }
  },
  intro2:function ()  {
    return function() {
      console.log('My name is ' + this.name)
    }
  }
}
obj.intro2()()
obj.intro()()


// 7.3：箭头函数与普通函数的嵌套
name = 'window'
const obj1 = {
  name: 'obj1',
  intro:function ()  {
    console.log(this.name)
    return () => {
      console.log(this.name)
    }
  }
}
const obj2 = {
  name: 'obj2',
  intro: ()=>  {
    console.log(this.name)
    return function() {
      console.log(this.name)
    }
  }
}
const obj3 = {
  name: 'obj3',
  intro: ()=> {
    console.log(this.name)
    return () => {
      console.log(this.name)
    }
  }
}

obj1.intro()()
obj2.intro()()
obj3.intro()()


// 7.4：new碰上箭头函数
function User(name, age) {
  this.name = name;
  this.age = age;
  this.intro = function(){
    console.log('My name is ' + this.name)
  },
  this.howOld = () => {
    console.log('My age is ' + this.age)
  }
}

var name = 'Tom', age = 18;
var zc = new User('zc', 24);
zc.intro();
zc.howOld();


// 7.5：call碰上箭头函数
// 箭头函数由于没有this，不能通过call\apply\bind来修改this指向，但可以通过修改外层作用域的this来达成间接修改

var name = 'window'
var obj1 = {
  name: 'obj1',
  intro: function () {
    console.log(this.name)
    return () => {
      console.log(this.name)
    }
  },
  intro2: () => {
    console.log(this.name)
    return function () {
      console.log(this.name)
    }
  }
}
var obj2 = {
  name: 'obj2'
}
obj1.intro.call(obj2)()
obj1.intro().call(obj2)
obj1.intro2.call(obj2)()
obj1.intro2().call(obj2)
