import { noop, readNodePath } from '../utils/index.js';

export function resourceError(callback = noop) {
  window.addEventListener('error', (event) => {
    // 只处理资源类错误
    const { target } = event;
    if (target === window) return;
    console.log('resource error', event);
    const filename = (target.src || target.href) ?? '';
    if (!filename) return;

    let tagName = target.tagName?.toLocaleLowerCase() ?? ''
    const path = [...event.path].slice(0, -2)
                                .reverse()
                                .map(readNodePath)
                                .join(' > ')

    const data = {
      uncaught_type: 'resource_error',
      type: 'resourceError',
      sub_type: tagName, // link image script
      filename,
      tag_name: tagName,
      tag_path: path, //  html > body > div#root > div.test-box > img 节点所在位置
      selector: '',
    }

    let bool;
    if (typeof callback === 'function') {
      bool = callback(data)
    }

    // 防止默认处理（例如将错误输出到控制台）
    if (bool) {
      event.preventDefault();
    }
  }, true)
}
