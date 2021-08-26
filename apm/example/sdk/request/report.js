
// SLS web数据采集上报SDK
// https://help.aliyun.com/document_detail/300009.htm
import SlsReporter from 'sls-wpk-reporter'
import wpkglobalerrorPlugin from 'sls-wpk-reporter/src/plugins/globalerror';   //用于监控JS异常。
import wpkperformancePlugin from 'sls-wpk-reporter/src/plugins/performance';   //用于监控页面性能。
import wpkinterfacePlugin from 'sls-wpk-reporter/src/plugins/interface';

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
    // [wpkinterfacePlugin, { sampleRate: 0.5 }], // 构造方法传参
    // 基础性能数据自动上报
    [
      wpkperformancePlugin,
      {
        enable: true, // 默认为 true，可设为false关闭上报
        sampleRate: 1 // 采样率，默认 100%
      }
    ],
    // 全局错误监控
    [
      wpkglobalerrorPlugin,
      {
        // 默认只会捕获 js error(包括unhandledrejection)，需要监控资源加载异常可以设置 resErr: true
        jsErr: true, // 是否开启js error监控
        jsErrSampleRate: 1, // js error采样率，默认为 1
        jsErrFilter: function(params) {}, // js error过滤回调函数，参数为 error对象，返回 false则不上报
        resErr: false, // 是否开启资源加载异常监控
        resErrSampleRate: 1, // 资源异常监控采样率，默认为 1
        resErrFilter: function(params) {}, // 资源加载异常过滤的回调函数，参数为 error对象，返回 false则不上报
      },
    ],
    // 接口异常监控
    [wpkinterfacePlugin, {
      enable: true, // 默认为 true，可设为false关闭插件功能
      sampleRate: 1,  // 采样率，默认为 1
      withBody: false, // 是否上报请求的body参数，默认 false
      errorFilter: function(params) {
        // 异常过滤回调函数，参数包含 请求地址、响应码及响应内容，返回 false则不上报
        // params格式为 {url: '', status: '', response: '', body: '', reqHeaders: {}, resHeaders:{},queryString: ''}
        // 业务可返回 {bizCode: '', msg: '', traceId: ''}，sdk会将他们一并上报
      }
    }],

    // wpkflowPlugin
    [
      wpkflowPlugin,
      {
        enable: true, // 默认开启，默认在 onload时会自动上报
        // spa: false,
      }
    },
  ],
});
wpk.install(); // 初始化！一定记得调用

// 接口方式传参
wpk.addPlugin(interfacePlugin, { sampleRate: 0.5 })

// 5 个 API
wpk.logReport(logData) // 主动上报一条日志
wpk.setConfig(logData) // 更新sdk实例配置
wpk.diagnose(logData) // 诊断函数，方便调试
// 调用后会在浏览器控制台输出诊断信息，并重定向到一个新页面，显示上报结果

// 现在，试一下主动上报一条日志
wpk.logReport({
  key1: '1',
  key2: '2'
})
