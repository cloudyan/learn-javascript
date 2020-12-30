
// test

// node --experimental-modules a.mjs
// nodejs@13.2.0 之前想要在node中使用ES modules，需要添加`--experimental-module`

// 这个示例 将 let 改为 var 后，node 中可以执行
// var 有变量提升
// 输出

/**

bar is running
foo = undefined
bar is finished

foo is running
bar = false
foo is finished
bar = true after 500 ms

*/

// a.js 和 b.js 形成了循环依赖，但是程序却没有因陷入循环调用报错而是执行正常，这是为什么呢？

// 还是因为 import 是在编译阶段执行的，这样就使得程序在编译时就能确定模块的依赖关系，一旦发现循环依赖，ES6 本身就不会再去执行依赖的那个模块了，所以程序可以正常结束。

// 这也说明了 ES6 本身就支持循环依赖，保证程序不会因为循环依赖陷入无限调用。
// 虽然如此，但是我们仍然要尽量避免程序中出现循环依赖，因为可能会发生一些让你迷惑的情况。
// 注意到上面的输出，在 b.js 中输出的 foo = undefined，如果没注意到循环依赖会让你觉得明明在 a.js 中 export foo = false，为什么在 b.js 中却是 undefined 呢，这就是循环依赖带来的困惑。

// 在一些复杂大型项目中，你是很难用肉眼发现循环依赖的，而这会给排查异常带来极大的困难。
// 对于使用 webpack 进行项目构建的项目，推荐使用 webpack 插件 circular-dependency-plugin 来帮助你检测项目中存在的所有循环依赖，尽早发现潜在的循环依赖可能会免去未来很大的麻烦。
