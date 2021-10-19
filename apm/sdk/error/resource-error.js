import { noop, readNodePath } from '../utils/index.js';

// 我们要明确下资源错误捕获的使用场景，更多的是感知 DNS 劫持 及 CDN 节点异常等
// 资源错误的使用场景更多依赖其他几个维度，如：地域、运营商等
export function resourceError(callback = noop) {
  window.addEventListener('error', (event) => {
    // 只处理资源类错误
    // TODO: css 背景图资源
    // TODO: iframe 资源加载
    // const { target } = event;
    const target = event.target || event.srcElement;
    if (target === window) return;
    console.log('resource error', event);

    // if (!(target instanceof HTMLScriptElement)) return;
    const filename = (target.src || target.href) ?? '';
    if (!filename) return;

    let tagName = target.tagName?.toLocaleLowerCase() ?? ''
    const path = [...event.path].slice(0, -2)
                                .reverse()
                                .map(readNodePath)
                                .join(' > ')

    const data = {
      type: 'resource_error', // errorType
      handled: false,
      sub_type: `${tagName}_error`, // link img script iframe
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
