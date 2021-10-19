# SLS web数据采集上报SDK

# 1 开通Web Tracking
-   控制台方式
  1.  登录[日志服务控制台](https://sls.console.aliyun.com)。
  2.  在Project列表区域，单击目标Project。
  3.  在**日志存储** \> **日志库**页签中，选择目标Logstore右侧的**![图标](https://static-aliyun-doc.oss-accelerate.aliyuncs.com/assets/img/zh-CN/1140559951/p65765.png)** \> **修改**。
  4.  在Logstore属性页面，单击右上方的**修改**。
  5.  打开**WebTracking**开关，并单击**保存**。

# 2 SDK引入
```javascript
1. 安装依赖
npm i sls-wpk-reporter --save
 
2. 引入核心
import SlsReporter from 'sls-wpk-reporter'
 
3. 引入插件
import wpkglobalerrorPlugin from 'sls-wpk-reporter/src/plugins/globalerror'; // js错误监控
import wpkperformancePlugin from 'sls-wpk-reporter/src/plugins/performance'; // 性能监控
```

# 3 上报

## 3.1 demo预览
```javascript
const wpk = new SlsReporter({
  bid: 'sls-f51778cfbdfbfa4573', // 应用标识（非移动运维监控接入不需要填写）
  project: '', // 项目project（必填）
  endpoint: '', // project对应的endpoint（必填）
  logstore: '', // logstore（移动运维监控接入可不填，默认会上传到sls-alysls-track-base）
  slsParams: { // 扩展字段，会同采集的日志一并写入（非必填）
    app_name: '', // app中文名称
    user_nick: '', // 登录nick
    logon_type: '', // 登录类型
  },
  rel: '', // 前端资源版本号，推荐设置（非必填）
  uid: '', // 用户唯一ID，推荐设置（非必填）
  plugins: [ // 采集插件
    [wpkperformancePlugin],
    [
      wpkglobalerrorPlugin,
      {
        jsErr: true, // 是否开启js error监控
        resErr: true, // 是否开启资源加载异常监控
      },
    ],
  ],
});
wpk.install(); // 初始化！一定记得调用
// 现在，试一下主动上报一条日志
wpk.logReport({
  key1: '1',
  key2: '2'
})
```

## 3.2 配置参数
- **bid 必填**<br />

移动运维监控应用标识，新建后分配

- **project 必填**<br />

采集上报的project

- **endpoint 必填**<br />

project对应的endpoint

- **logstore 必填**<br />

采集上报的logstore，移动运维监控应用可不填

- **slsParams 选填**<br />

日志上报扩展字段，类型为object

- **rel  可选，推荐设置**<br />

前端资源版本号，强烈推荐设置<br />支持字符串以及函数两种方式设置，函数最终需要返回一个字符串

- **uid 可选，推荐设置**<br />

浏览当前页面的用户唯一标识，强烈推荐设置，默认为 uuid<br />支持字符串以及函数两种方式设置，函数最终需要返回一个字符串

- **plugins 可选**<br />

需要开启的插件<br />没有设置任何插件时，默认加载 wpkflowPlugin 用于上报站点流量数据

- **sampleRate 可选**<br />

采样率，大业务（日志量大于 xxx / 天）推荐设置<br />默认规则，除了 性能数据的采样率为 10%，其余类型的日志均为 100%

- **beforeSend 可选**

参数为完整的 logData对象<br />日志上报的前置处理，返回 false可阻止日志上报，否则返回true（记得一定要返回）

- **spa 可选**<br />

是否spa应用，默认 false<br />设为 true后，可配合 wpkflowPlugin更好的打点（自动监听hashchange）

- **debug 可选**<br />

开启debug模式，默认 false<br />开启后，将会有更详细的打点过程日志输出，一般用于接入时联调分析，生产环境不建议打开

# 4 插件
sdk核心默认只包含自定义打点，业务可按需添加插件，扩展sdk的打点能力。
# 4.1 使用方式 
### 4.1.1 构造方法传参
```javascript
import wpkinterfacePlugin from 'sls-wpk-reporter/src/plugins/interface'
const wpk = new SlsReporter({
  // ...
  plugins: [[
    wpkinterfacePlugin, { sampleRate: 0.5 }
  ]],
  // ...
})
```

### 4.1.2 接口方式
```javascript
// 确保已经引入
import wpkinterfacePlugin from 'sls-wpk-reporter/src/plugins/interface'
// ... ...
wpk.addPlugin(interfacePlugin, { sampleRate: 0.5 })
```

## 4.2 插件列表

- 4.2.1 **wpkglobalerrorPlugin (含 jserror resourceError) - 全局错误监控**<br />

_参数：opts_
```js
{
  jsErr: true, // 是否开启js error监控
  jsErrSampleRate: 1, // js error采样率，默认为 1
  jsErrFilter: fn, // js error过滤回调函数，参数为 error对象，返回 false则不上报
  resErr: false, // 是否开启资源加载异常监控
  resErrSampleRate: 1 // 资源异常监控采样率，默认为 1
  resErrFilter: fn // 资源加载异常过滤的回调函数，参数为 error对象，返回 false则不上报
}
```
默认只会捕获 js error(包括unhandledrejection)，需要监控资源加载异常可以设置 resErr: true

- 4.2.2 **wpkinterfacePlugin - 接口异常监控**<br />

_参数： opts_
```js
{
  enable: true, // 默认为 true，可设为false关闭插件功能
  sampleRate: 1,  // 采样率，默认为 1
  withBody: false, // 是否上报请求的body参数，默认 false
  errorFilter: function(params) {
    // 异常过滤回调函数，参数包含 请求地址、响应码及响应内容，返回 false则不上报
    // params格式为 {url: '', status: '', response: '', body: '', reqHeaders: {}, resHeaders:{},queryString: ''}
    // 业务可返回 {bizCode: '', msg: '', traceId: ''}，sdk会将他们一并上报
 }
}
```

默认自动上报所有基于 xhr或 fetch的异步请求，有特殊情况的可通过 errorFilter自定义<br />
> Set `Access-Control-Allow-Headers` when allowing headers to be passed from the client to the server (e.g. If-Match).
> Set `Access-Control-Expose-Headers` when allowing headers to be passed back from the server to the client (e.g. ETag)
<br />

### 4.2.3 **wpkperformancePlugin - 基础性能数据自动上报**


_参数: opts_

```js
{
  enable: true, // 默认为 true，可设为false关闭上报
  sampleRate: 0.1 // 采样率，默认 100%
}
```
### 4.2.4 **wpkflowPlugin - 站点流量监控**<br />_参数：opts，{ spa: false  }_
_参数：opts，{ enable: true // 默认开启 }_
默认在 onload时会自动上报<br />在sdk构造参数中设置 spa: true，则在hashchange的时候也会自动上报

# 5 API
## 说明

- 每条上报的数据 logData，我们称之为一条日志数据，类型为 Object<br />
- logData的属性包含SDK所有构造参数，除此之外，还可以包含以下属性：<br />
_构造参数为全局，logData参数则为单次有效，即只影响单次的上报_

- 所有api均返回当前sdk实例，因此你可以方便的进行链式调用<br />

## .logReport(logData)
主动上报一条日志，日志内容为 logData

## .setConfig(opts)
更新sdk实例配置

## .install()
sdk安装，即初始化所有的设置，包含各个插件的初始化(在plugins参数中指定)等<br />调用此方法后，sdk的初始化工作才算完成，下面才能成功调用其他API

## .installAll()
sdk安装，初始化所有的设置，包含内置的所有插件，及安装全家桶，适合不接内核的场景

## .diagnose()
诊断函数，方便调试<br />调用后会在浏览器控制台输出诊断信息，并重定向到一个新页面，显示上报结果
