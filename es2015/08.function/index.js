
// 请写出以下这段代码打印内容，并简述原因

var name = 'dabao';
var obj = {
  name: 'erbao',
  foo: function() {
    console.log(this.name);
    (function() {
      console.log(this.name);
    })();
    (() => {
      console.log(this.name);
    })();
  },
};

var foo = obj.foo.bind({name: 'sanbao'});
foo();
