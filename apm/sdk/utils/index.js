
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

export function trimTiming(time = 0) {
  return Math.round(time ? time : 0)
}
