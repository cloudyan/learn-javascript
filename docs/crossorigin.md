# 关于 crossorigin

crossorigin or crossOrigin

使用步骤：

1. 在html标签中加了 `crossorigin="anonymous"` 属性
2. html标签中的src属性的资源服务器也需要开启cors验证，并允许引用页面的域名访问，否则页面无法加载这个JS
    - `Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Range`
    - `Access-Control-Allow-Origin: *`

测试结果：

 -  | 加crossorigin属性                       | 不加crossorigin属性
--- | ------------------------               | ----
资源服务器开启cors  |  可以正常加载，准确捕获错误   | 可以正常加载，无法准确捕获错误(只能捕获到:Script error.)
资源服务器不开启cors |  无法正常加载              | 可以正常加载，无法准确捕获错误(只能捕获到:Script error.)
