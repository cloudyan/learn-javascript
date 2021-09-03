import Client from './core/client.js';
import pluginOnError from './error/onerror.js';
import pluginUnhandledRejection from './error/unhandled-rejection.js';

// browser
const client = new Client({
  debug: true, // 涉及到浏览器错误，直接本地预览测试
  name: 'apm_browser',
  autoStart: true,
  js_error_report: true,
})
client.use(pluginOnError)
      .use(pluginUnhandledRejection)

client.start();
