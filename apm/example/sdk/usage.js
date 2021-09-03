import Client from './core/client.js';
import pluginOnError from './error/onerror.js';
import pluginUnhandledRejection from './error/unhandled-rejection.js';

// browser
const client = new Client({
  debug: true, // 可以直接使用 RunCode 测试，需要配置支持 import
  name: 'apm_browser',
  autoStart: true,
  js_error_report: true,
})
client.use(pluginOnError)
      .use(pluginUnhandledRejection)

client.start();
