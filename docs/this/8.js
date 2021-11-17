
// 8.箭头函数扩展

// 总结

// - 箭头函数没有this，它的this是通过作用域链查到外层作用域的this，且指向函数定义时的this而非执行时。
// - 不可以用作构造函数，不能使用new命令，否则会报错
// - 箭头函数没有arguments对象，如果要用，使用rest参数代替
// - 不可以使用yield命令，因此箭头函数不能用作Generator函数。
// - 不能用call/apply/bind修改this指向，但可以通过修改外层作用域的this来间接修改。
// - 箭头函数没有prototype属性。


// 避免使用场景

// 箭头函数定义对象方法
const zc = {
  name: 'zc',
  intro: () => {
    // this -> window
    console.log(this.name)
  }
}
zc.intro() // undefined

// 箭头函数不能作为构造函数
const User = (name, age) => {
  this.name = name;
  this.age = age;
}
// Uncaught TypeError: User is not a constructor
zc = new User('zc', 24);

// 事件的回调函数
// DOM中事件的回调函数中this已经封装指向了调用元素，如果使用构造函数，其this会指向window对象

document.getElementById('btn')
  .addEventListener('click', ()=> {
    console.log(this === window); // true
  })
