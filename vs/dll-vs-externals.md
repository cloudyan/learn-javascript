# webpack dll vs external

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

参考：

- https://www.kancloud.cn/oldtimeofme/recording/1237182
