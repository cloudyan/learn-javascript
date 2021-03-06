# deepjs

深度学习js，对各种底层算法、功能等一一进行实现

**提示** 需要全局安装 `@babel/cli`

## 目录

- 数据结构
  - 原始数据类型
- 函数
- 算法
- scope 作用域
- class 类
- oop 面向对象
- 函数式编程
- sort 排序

### 哪些常见操作会造成内存泄漏？

内存泄漏指任何对象在您不再拥有或需要它之后仍然存在。

垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收。

setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏。

闭包、控制台日志、循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）。

### 线程与进程的区别?

一个程序至少有一个进程,一个进程至少有一个线程。

线程的划分尺度小于进程，使得多线程程序的并发性高。

另外，进程在执行过程中拥有独立的内存单元，而多个线程共享内存，从而极大地提高了程序的运行效率。

线程在执行过程中与进程还是有区别的。每个独立的线程有一个程序运行的入口、顺序执行序列和程序的出口。但是线程不能够独立执行，必须依存在应用程序中，由应用程序提供多个线程执行控制。

从逻辑角度来看，多线程的意义在于一个应用程序中，有多个执行部分可以同时执行。但操作系统并没有将多个线程看做多个独立的应用，来实现进程的调度和管理以及资源分配。这就是进程和线程的重要区别。

其他

- [useGit 入门教程](https://github.com/webcoding/useGit)
- [bable-7 and jest](https://github.com/cloudyan/babel-7)
- [研究学习反爬虫、防注入广告等](https://github.com/webcoding/js_block)
- [JS 代码片段](https://github.com/webcoding/js-bits)
- [测试 lerna的使用](https://github.com/cloudyan/lerna-test)

算法

- https://github.com/pomegranitedesign/100-javascript-algorithms-challenge

参考：

- https://github.com/ecmadao/js-bits-cn
- https://github.com/webcoding/js-bits
