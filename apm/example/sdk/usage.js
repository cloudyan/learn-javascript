import Client from './core/client.js';
import pluginOnError from './error/onerror.js';
import pluginUnhandledRejection from './error/unhandled-rejection.js';

// browser
const client = new Client({
  debug: true, // 涉及到浏览器错误，直接本地预览测试
  name: 'apm_browser',
  autoStart: false,
  js_error_report: true,
})
client.use(pluginOnError)
      .use(pluginUnhandledRejection)

setTimeout(() => {
  // 模拟延迟上报，等待下发配置
  console.log('获取到下发配置')
  client.start();
}, 5000)
