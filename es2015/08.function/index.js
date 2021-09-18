
var name = 'shuhe';
var obj = {
  name: 'keji',
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

var foo = obj.foo.bind({name: 'latte'});
foo();
