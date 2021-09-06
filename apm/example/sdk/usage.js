import Client from './core/client.js';
import pluginOnError from './error/onerror.js';
import pluginUnhandledRejection from './error/unhandled-rejection.js';

// browser
const client = new Client({
  debug: true, // 涉及到浏览器错误，直接本地预览测试
  name: 'apm_browser',
  js_error_report: true,
  autoReport: false, // 自动调用上报 或 手动调用上报
  immediate: true,  // 是否立即上报

  // TODO：测试时，safari 有js缓存，改了配置不立即生效
  // Log数据格式化
  // formatLog: false, // 是否数据扁平化，也可以自定义实现函数
  // formatLog: log => {
  //   // 格式化 log
  //   return log;
  // }
})
// client.use(pluginOnError)
//       .use(pluginUnhandledRejection)

client.addPlugin([
  [pluginOnError, {js_error_report: true}],
  pluginUnhandledRejection,
])

setTimeout(() => {
  // 模拟延迟上报，等待下发配置
  console.log('获取到下发配置')
  client.startReport();
  client.setConfig({
    autoReport: true,
  })
}, 5000)
