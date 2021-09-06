import Client from './core/client.js';
import pluginOnError from './error/onerror.js';
import pluginUnhandledRejection from './error/unhandled-rejection.js';

// browser
const client = new Client({
  debug: true, // 涉及到浏览器错误，直接本地预览测试
  name: 'apm_browser',
  js_error_report: true,
  autoStart: true, //
  immediate: true, // 是否立即上报

  // TODO：测试时，safari 有js缓存，改了配置不立即生效
})
// client.use(pluginOnError)
//       .use(pluginUnhandledRejection)

client.addPlugin([
  [pluginOnError, {js_error_report: false}],
  pluginUnhandledRejection,
])

setTimeout(() => {
  // 模拟延迟上报，等待下发配置
  console.log('获取到下发配置')
  client.start();
}, 10000)
