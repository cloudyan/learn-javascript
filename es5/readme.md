# es5

深入了解 js 特性

- ES5 引入严格模式 `'use strict';`, 主要有以下限制:
  - 变量必须声明后再使用
  - 函数的参数不能有同名属性，否则报错
  - 不能使用`with`语句
  - 不能对只读属性赋值，否则报错
  - 不能使用前缀 0 表示八进制数，否则报错
  - 不能删除不可删除的属性，否则报错
  - 不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]`
  - eval不会在它的外层作用域引入变量
  - eval和arguments不能被重新赋值
  - arguments不会自动反映函数参数的变化
  - 不能使用`arguments.callee`
  - 不能使用`arguments.caller`
  - 禁止`this`指向全局对象
  - 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
  - 增加了保留字（比如`protected`、`static`和`interface`）

常见问题

执行上下文(execute context) EC
  理解：代码执行的环境
  时机：代码正式执行之前会进入到执行环境
  工作：

  1. 创建变量对象
     1. 变量
     2. 函数及函数的参数
     3. 全局：window
     4. 局部：抽象的但是确实存在
  2. 确认 this 的指向
     1. 全局：this --> window
     2. 局部：this --> 调用其的对象
  3. 创建作用域链
     1. 父级作用域链 + 当前的变量对象


