import config from '../core/config.js';
import { getStackMessage, noop } from '../utils/index.js';

export function unhandledRejection(callback = noop) {
  window.addEventListener("unhandledrejection", (event) => {
    console.log('unhandledrejection:err', event);
    // console.log('unhandledrejection:reason', event.reason);

    let bool;
    if (typeof callback === 'function') {
      const data = formatAsyncError(event);
      bool = callback(data)
    }

    // 防止默认处理（例如将错误输出到控制台）
    if (bool) {
      event.preventDefault();
    }
  }, true);
}

function formatAsyncError(error) {
  let lineno = 0;
  let colno = 0;
  let message = '';
  let filename = '';
  let stack = '';
  const { reason } = error;

  if (typeof reason === 'string') {
    message = reason;
  } if (typeof reason === 'number') {
    message = reason.toString();
  } if (typeof reason === 'object') {
    message = reason.message || reason.name || 'unknown';
    if (reason.stack) {
      let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
      let temp;
      [temp, filename, lineno, colno] = matchResult;

      stack = getStackMessage(reason.stack)
    }
  }

  const data = {
    type: 'js_error', // errorType
    handled: false,
    sub_type: 'unhandledrejection',
    filename,
    message,
    stack,
    position: `${lineno}:${colno}`,
    selector: '',
  };
  return data;
}


export default {
  name: 'js_error_unhandledrejection',
  install(ctx, options) {
    const config = ctx._config;
    unhandledRejection(data => {
      if (config.js_error_report) {
        ctx.report(data);
      }
    });
    console.log(this.name);
  }
}
