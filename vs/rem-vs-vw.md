# rem vs vw


当作大家对vw和rem之类的单位原理有了一定的了解。所以就回到题主的提问中来！

手淘的flexible.js这个库承载了一定历史时期适配史命，这里所说的适配是指移动端。Flexible.js很强大，解决了移动端多端的适配问题，但也造成了一个误解。

> 很多同学以为rem就可以完成移动端的适配

这里要再次声明一下，有这种理解的同学是错误的。Flexible.js虽然在整个方案中采用了rem做为单位，但他的核心是通过JS对移动设备做了一些判断，特别是dpr方面的判断，然后再给html根元素赋值一个font-size。 达到动态生成font-size的值，从而完成rem 的布局效果。

那么为什么会这么做，或者这么做的原因是什么？简单点来说有以下几点：

- 就当初的时间阶段，rem是较为成熟和稳定的一种单位，可以相对于html的font-size来计算
- 最初的初发点为了解决1px的细节问题；所以对dpr做了一定的判断，对viewport的值做了缩放处理，从而解决了一些细节上的问题，也达到了一种较好的适配
- Flexible的设计其实就为后面转换vw单位做了伏笔，这是设计者（ @winter ）强大之处，当初设计的时候就有vw的影子存在
- 抛开flexible，也有团队通过媒体查询来改为html的font-size达到类似的效果

这是使用rem来适配的一个历史过程，就当时而言，浏览器对rem的支持度相对于vw而言较为全面。这也是为什么很多团队或个人不采用viewport单位的主要原因之一。随着时间向前的推移以及前端技术的革新，最主要是各大浏览器厂商的给力，viewport单位在这两年再次进入到公众的视野，开始有人或者有团队在探讨论在实际项目中的使用。

就vw在实际项目中的运用以及落地，我自己在团队差不多花了将近一年的时间在做相关的事情。首先写测试Demo，在手淘这样的环境下跑通测试，另外由于业务的需要，我们还不能放弃一些低端设备的用户，所以还需要考虑一些降级的适配方案。当然除了这些之外，还需要考虑开发者，怎么才能让开发者不增加任何的成本，就可以在项目中使用vw来做开发。这些满足之后还是不够，就我们团队，或者类似的团队，还需要考虑怎么能快速的从以前flexible.js开发的项目过渡或者切换到vw布局中来，而且这样的一个过程是无缝的一个过程。

上面说了一下rem和 vw在移动端开发的一个前世与今生。但就开发体验来说，我觉得没有差异性，不管是使用rem还是vw来做开发，前端开发者都不会人肉的去计算。大家都会借助工具，比如说PostCSS工具(px2rem，px2vw之类的)，在编译的过程将px转换为rem或者vw。就这一点而言，他们的开发体验都是一样的。不同的是，rem和vw配置的开发工具不同，开发的脚手架略有不同而言。至于原理，前面已经阐述到了，而且开发的过程不需要去太多关注其原理，而要关注的是细节上的差异化。就目前为止，不管是使用rem还是vw，还是有一些细节要处理的。针对细节而言，不管使用什么样的方式，都避免不了。因为没有哪一种方案可以达到百分百的完美。

有关于rem和vw相关的技术沉淀过程，可以阅读下文：

- https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html


参考：

- https://www.zhihu.com/question/37179916