import { formatAsyncError, noop } from '../utils/index.js';

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
