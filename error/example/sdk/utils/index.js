
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
  const data = {
    uncaught_type: uncaughtType,
    type: 'SyntaxError', // errorType
    sub_type: 'uncaught',
    filename,
    message,
    stack,
    position: `${lineno}:${colno}`,
    selector: '',
  };
  return data;
}

export function formatAsyncError(error, uncaughtType) {
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
    uncaught_type: uncaughtType,
    type: 'AsyncType', // errorType
    sub_type: 'uncaught',
    filename,
    message,
    stack,
    position: `${lineno}:${colno}`,
    selector: '',
  };
  return data;
}
