import { getStackMessage, noop } from '../utils/index.js';

const regCrosError = /Script error\.?/;
export function uncaughtError(callback = noop) {
  // 错误监听
  window.addEventListener('error', (event) => {
    // 只处理 window 事件（区别于资源类错误）
    if (event.target !== window) return

    // ErrorEvent 类型的event包含有关事件和错误的所有信息。
    // 也可以捕获到错误，但这个拿到的 JS 报错堆栈往往是不完整的(待验证)
    console.log('error:err', event);
    // console.warn('error:message', message);
    // console.warn('error:filename', filename);
    // console.warn('error:lineno', lineno);
    // console.warn('error:colno', colno);
    // console.warn('error:error', error);
    // console.warn('error:error.stack', stack);

    let bool;
    if (typeof callback === 'function') {
      const data = formatError(event, 'error');
      bool = callback(data)
    }

    // 禁止默认错误提示
    if (bool) {
      event.preventDefault();
    }
  }, true);
}

// 推荐使用 onerror
export function uncaughtOnError(callback = noop) {
  const oldOnError = window.onerror

  // 如果写在 html body 标签上(`<body onerror="xxx"></body>`)，
  // HTML 规范要求 onerror 的参数必须命名为 event, source lineno, colno, error
  window.onerror = function(event, source, lineno, colno, error) {
    console.log('onerror', arguments);
    let bool
    if (lineno === 0 && regCrosError.test(event)) {
      // 此错误也需要上报，我需要知道那个链接的资源出了这个问题，同一个资源只需控制上报一次即可
      console.warn('Ignoring cross-domain or eval script error. See https://tinyurl.com/yztq2q5o');
      // https://segmentfault.com/a/1190000020756584
    } else {
      // console.warn('onerror:err', arguments);
      // console.warn('onerror:message', event);
      // console.warn('onerror:source', source);
      // console.warn('onerror:lineno', lineno);
      // console.warn('onerror:colno', colno);
      // console.warn('onerror:error', error);
      // console.warn('onerror:error.stack', error.stack);
      if (typeof callback === 'function') {
        const data = formatError({
          message: event,
          filename: source,
          lineno,
          colno,
          error,
        }, 'onerror');
        bool = callback(data)
      }
    }

    if (oldOnError) oldOnError.apply(this, arguments)

    // 若该函数返回 true，则阻止执行默认事件处理函数（输出错误信息到 console）
    // 注: 红皮书上此处 说返回 false，是错误的描述，直接可验证得到结论(相比较 MDN 站点更准确)
    return bool;
  }

  // 跨域的JS资源，window.onerror拿不到详细的信息，需要往资源的请求添加额外的头部。
  // 静态资源请求需要加多一个Access-Control-Allow-Origin头部，同时script引入外链的标签需要加多一个crossorigin的属性。
}

// 错误格式
function formatError(event = {}, uncaughtType) {
  const {
    message = 'unknown',
    filename = '',
    lineno = 0,
    colno = 0,
    error,
  } = event;
  const stack = getStackMessage(error?.stack);

  // 错误类型 SyntaxError
  const data = {
    type: 'js_error', // errorType
    handled: false,
    sub_type: uncaughtType,
    filename,
    message,
    stack,
    position: `${lineno}:${colno}`,
    selector: '',
  };
  return data;
}

export default {
  name: 'js_error_onerror',
  install(ctx, options) {
    const config = ctx._config;
    uncaughtOnError(data => {
      if (config.js_error_report) {
        ctx.report(data);
      }
    });
  }
}
