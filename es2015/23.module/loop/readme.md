# 循环引用

CommonJS 输入的是被输出值的拷贝，不是引用。

由于 CommonJS 模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。
所以，输入变量的时候，必须非常小心。

```js
var a = require('a'); // 安全的写法
var foo = require('a').foo; // 危险的写法

exports.good = function (arg) {
  return a.foo('good', arg); // 使用的是 a.foo 的最新值
};

exports.bad = function (arg) {
  return foo('bad', arg); // 使用的是一个部分加载时的值
};
```

上面代码中，如果发生循环加载，`require('a').foo`的值很可能后面会被改写，改用`require('a')`会更保险一点。

ES modules

nodejs@13.2.0 之前想要在node中使用ES modules，需要添加`--experimental-modules`

```bash
# < nodejs@13.2.0
node --experimental-modules ./complex/index.js

# >= nodejs@13.2.0
node ./complex/index.js
```

## 循环引用解法

### CommonJS 中循环依赖的解法

[示例](./commonjs/index.js)

在这个例子中，a 模块调用 b 模块，b 模块又需要调用 a 模块，这就使得 a 和 b 之间形成了循环依赖，但是当我们执行 node main.js 时代码却没有陷入无限循环调用当中，而是输出了如下内容：

```js
$ node index.js

main starting

a starting

b starting
in b, a.done = false
b done

in a, b.done = true
a done

in main, a.done=true, b.done=true
```

为什么程序没有报错，而是输出如上的内容呢？这是因为 CommonJs 模块的两个特性。**第一，加载时执行；第二，已加载的模块会进行缓存，不会重复加载。**

下面让我们分析下程序的执行过程：

- main.js 执行，输出 main starting
- main.js 加载 a.js，执行 a.js 并输出 a starting，导出 done = false
- a.js 加载 b.js，执行 b.js 并输出 b starting，导出 done = false
- b.js 加载 a.js，由于之前 a.js 已加载过一次因此不会重复加载，缓存中 a.js 导出的 done = false，因此，b.js 输出 in b, a.done = false
- b.js 导出 done = true，并输出 b done
- b.js 执行完毕，执行权交回给 a.js，执行 a.js，并输出 in a, b.done = true
- a.js 导出 done = true，并输出 a done
- a.js 执行完毕，执行权交回给 main.js，main.js 加载 b.js，由于之前 b.js 已加载过一次，不会重复执行
- main.js 输出 in main, a.done=true, b.done=true

从上面的执行过程中，我们可以看到，在 CommonJS 规范中，当遇到 `require()` 语句时，会执行 require 模块中的代码，并缓存执行的结果，当下次再次加载时不会重复执行，而是直接取缓存的结果。正因为此，出现循环依赖时才不会出现无限循环调用的情况。虽然这种模块加载机制可以避免出现循环依赖时报错的情况，但稍不注意就很可能使得代码并不是像我们想象的那样去执行。因此在写代码时还是需要仔细的规划，以保证循环模块的依赖能正确工作（官方原文：Careful planning is required to allow cyclic module dependencies to work correctly within an application）。

除了仔细的规划还有什么办法可以避免出现循环依赖吗？一个不太优雅的方法是在循环依赖的每个模块中先写 exports 语句，再写 require 语句，利用 CommonJS 的缓存机制，在 `require()` 其他模块之前先把自身要导出的内容导出，这样就能保证其他模块在使用时可以取到正确的值。比如：

```js
// A.js
exports.done = true;

let B = require('./B');
console.log(B.done)
```

```js
// B.js
exports.done = true;

let A = require('./A');
console.log(A.done)
```

这种写法简单明了，缺点是要改变每个模块的写法，而且大部分同学都习惯了在文件开头先写 require 语句。

个人经验来看，在写代码中只要我们注意一下循环依赖的问题就可以了，大部分同学在写 node.js 中应该很少碰到需要手动去处理循环依赖的问题，更甚的是很可能大部分同学都没想过这个问题。

### ES6 中循环依赖的解法

要想知道 ES6 中循环依赖的解法就必须先了解 ES6 的模块加载机制。我们都知道 ES6 使用 export命令来规定模块的对外接口，使用 import 命令来加载模块。那么在遇到 import 和 export 时发生了什么呢？ES6 的模块加载机制可以概括为四个字一静一动。

- 一静：import 静态执行
- 一动：export 动态绑定

import 静态执行是指，import 命令会被 JavaScript 引擎静态分析，优先于模块内的其他内容执行。

export 动态绑定是指，export 命令输出的接口，与其对应的值是动态绑定关系，通过该接口可以实时取到模块内部的值。



```js
node
```

参考：

- https://zhuanlan.zhihu.com/p/33049803
