import { formatError, noop } from '../utils/index.js';

export function uncaughtError(callback = noop) {
  // 错误监听
  window.addEventListener('error', (event) => {
    // 只处理 window 事件
    // if (event.target !== window) return

    // ErrorEvent 类型的event包含有关事件和错误的所有信息。
    // 也可以捕获到错误，但这个拿到的 JS 报错堆栈往往是不完整的(待验证)
    console.warn('addEventListener');
    console.warn('error:err', event);
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


export function uncaughtOnError(callback = noop) {
  const handleError = window.onerror
  window.onerror = function(message, filename, lineno, colno, error) {
    var msg = message.toLowerCase();
    var subMsg = "script error";
    let bool = false
    if (msg.indexOf(subMsg) > -1) {
      console.warn('Script Error: See Browser Console for Detail');
    } else {
      // console.warn('onerror:err', arguments);
      // console.warn('onerror:source', filename);
      // console.warn('onerror:source', source);
      // console.warn('onerror:lineno', lineno);
      // console.warn('onerror:colno', colno);
      // console.warn('onerror:error', error);
      // console.warn('onerror:error.stack', error.stack);
      if (typeof callback === 'function') {
        const data = formatError({
          message,
          filename,
          lineno,
          colno,
          error,
        }, 'onerror');
        bool = callback(data)
      }
    }

    handleError && handleError(arguments)

    // 若该函数返回 true，则阻止执行默认事件处理函数（输出错误信息到 console）
    // 注: 红皮书上此处 说返回 false，是错误的描述，直接可验证得到结论(相比较 MDN 站点更准确)
    return bool;
  }

  // 跨域的JS资源，window.onerror拿不到详细的信息，需要往资源的请求添加额外的头部。
  // 静态资源请求需要加多一个Access-Control-Allow-Origin头部，同时script引入外链的标签需要加多一个crossorigin的属性。
}
