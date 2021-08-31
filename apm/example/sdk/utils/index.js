
export const noop = () => {}

// 获取堆栈信息
export function getStackMessage(stack) {
  if (!stack) return '';
  return stack
    .split('\n')
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ''))
    .join('^');
}

// 错误格式
export function formatError(event = {}, uncaughtType) {
  const {
    message = '',
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

export function formatAsyncError(error) {
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
    message = reason.message || reason.name || '';
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

export function readNodePath(el) {
  let selector = el.nodeName.toLowerCase();
  if (el.id) {
    selector += '#' + el.id;
  } else if (el.classList.length) {
    selector += '.' + [...el.classList].join('.');
  } else {
    let sib = el, nth = 1;
    while (sib = sib.previousElementSibling) {
      if (sib.nodeName.toLowerCase() == selector) nth++;
    }
    if (nth != 1) selector += ":nth-of-type("+nth+")";
  }
  return selector;
}
// 标准CSS路径
export function readXPath(el) {
  if (!(el instanceof Element)) return;

  let path = [];
  while (el.nodeType === Node.ELEMENT_NODE) {
    const selector = readNodePath(el)
    path.unshift(selector);
    el = el.parentNode;
  }
  return path.join(' > ');
}
