# request

基本上所有的 API 请求都是基于xmlHttpRequest 或者 fetch，所以捕获全局接口错误的方式就是封装 xmlHttpRequest 或者 fetch。这里，我们的 SDK 使用 AOP 思想，对 API 进行拦截。

> 需要注意的是，API 拦截一定要对 SDK 自己上报的 API 设置好忽略，否则将会导致循环上报问题

分类

- http_error
  - timeout
  - network
  - 业务失败
