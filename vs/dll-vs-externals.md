# webpack dll vs external

~~dll 在 webpack@5 已废弃~~

**extenals的使用方式:**

extenals(外部扩展)：能够使用cdn引入的都是用cdn引入，在这里配置，已入库暴露的在全局的方法，并自定义一个名称，在项目中使用时，使用这个名字就可以因入库。

**dllplugin：**

dllplugin新建一个配置文件先打包部分变动较少的第三方库，然后在base配置里面使用DllReferencePlugin引用，webpack会根据manifast.json来排除json里面设置的库

问题：当使用dllplugin打包vue，vue-router以及其他插件时，会导致打包出的vendor包太大，只能分多个dll打包，这样会造成配置文件过于复杂

总结：优先使用cdn的方式移入第三方库，使用外部扩展配置名称之后，也可使用amd，cmd，common.js等规范正常引入配置过的库

webpack在打包后，生成的文件主要分为三种类型：

- 业务代码
- 外部依赖库
- webpack runtime

webpack中的 dll 和 external 在**本质上其实是解决的同一个问题**：**避免将某些外部依赖库打包进我们的业务代码，而是在运行时提供这些依赖。**

一方面实现了代码拆分，以及依赖的复用，

另一方面提升构建速度.

这两种方案应该是各有各的优劣，分别适用于不同的环境。

## dll

- 符合前端模块化的要求
- webpack配置上稍微复杂一些，需要预打包所需的dll资源，并在构建时配置相应的plugin，
- 使用dll的前提，这些外部依赖一般不需要发送变更，如果发生了变更，需要将项目重新构建

## external

- 不太符合前端的模块化思想，所需要的外部库需要在浏览器全局环境下可访问
- 外部库升级的话，如果兼容之前的API，不需要项目重新构建
- webpack配置上稍微简单些，但是同样需要将所需的外部库打包为所需要的格式，并在运行态下引用

相比较而言的话，dll比external应该更加智能一些，主要体现在模块的引用和打包上。比如说如下方式去引用了react中的一个方法：

```js
import AA from 'react/lib/createClass'
```

如果采用dll的方式，是不会造成重复打包的，他会将引用直接指向dll。但是如果使用external的话，则会react中的部分代码打包进来。

externals 支持以下模块上下文(module context)

- **global** - 外部 library 能够作为全局变量使用。用户可以通过在 script 标签中引入来实现。这是 externals 的默认设置。
- **commonjs** - 用户(consumer)应用程序可能使用 CommonJS 模块系统，因此外部 library 应该使用 CommonJS 模块系统，并且应该是一个 CommonJS 模块。
- **commonjs2** - 类似上面几行，但导出的是 module.exports.default。
- **amd** - 类似上面几行，但使用 AMD 模块系统。

不同环境设置externals方式

- 比如 node 环境，使用 commonjs 或 commonjs2
- 需要 requirejs等符合 AMD 规范的环境中，则使用 amd
- 浏览器环境，可以什么都不加，默认设置就是 global

`externals` 和 `libraryTarget` 的关系

- libraryTarget配置如何暴露 library。如果不设置library,那这个library就不暴露。就相当于一个自执行函数
- externals是决定的是以哪种模式去加载所引入的额外的包
- libraryTarget决定了你的library运行在哪个环境，哪个环境也就决定了你哪种模式去加载所引入的额外的包。也就是说，externals应该和libraryTarget保持一致。library运行在浏览器中的，你设置externals的模式为commonjs，那代码肯定就运行不了了。
- 如果是应用程序开发，一般是运行在浏览器环境libraryTarget可以不设置，externals默认的模式是global，也就是以全局变量的模式加载所引入外部的库。

参考：

- https://www.kancloud.cn/oldtimeofme/recording/1237182
- https://www.css88.com/doc/webpack2/guides/author-libraries/
- https://www.css88.com/doc/webpack2/configuration/externals/
- [webpack externals详解](https://www.tangshuang.net/3343.html)
- https://www.zihanzy.com/articles/206
- https://webpack.js.org/configuration/externals/#root
- https://webpack.js.org/plugins/dll-plugin/#root
- https://array-huang.gitbooks.io/multipage-webapp-architecture-with-webpack/content/chapter4/webpack-dll.html
