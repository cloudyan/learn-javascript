/*!
 * @Author: cloudyan <cloudcode@qq.com>
 * @Date: 2020-08-14 18:29:27
 * 功能说明: 动态加载 js or css，support promise
 */

let doc;
let domAppend;

if (typeof document !== 'undefined') {
  doc = document;
  domAppend = doc.querySelector('body') || doc.querySelector('head');
}

// const s = doc.getElementsByTagName('script')[0];

export function load({root, tag, getDomTag, ...attributes}) {
  return new Promise((resolve, reject) => {
    if (!doc) {
      return reject(new Error(`load source fail: can not execute code from non browser environment`));
    }
    let domRoot;
    if (root) {
      domRoot = document.querySelector(root);
      if (!domRoot) {
        return reject(new Error(`load source fail: document not exist '${root}' tag`));
      }
    } else {
      domRoot = domAppend
      if (!domRoot) {
        return reject(new Error(`load source fail: document not exist 'head' || 'body' tag`));
      }
    }

    const domTag = getDomTag();
    const isExists = Boolean(doc.querySelector(domTag));
    if (isExists) {
      const resource = source.src || source.href || '';
      return resolve({code: 1, message: '资源已存在', resource});
    }

    const source = doc.createElement(tag);
    Object.entries(attributes).forEach(([attribute, value]) => {
      source.setAttribute(attribute, value);
    });
    const resource = source.src || source.href || ''
    source.onload = () => {
      resolve({code: 0, message: '资源加载成功', resource});
    };
    source.onerror = (error) => {
      reject(error);
    };
    // s.parentNode.insertBefore(s1, s);

    domRoot.appendChild(source);

  })
  // 要么这里调用 catch，要么外部必须调用下 catch
  // .catch(err => {
  //   // 此处 catch 是为了避免因包裹 promise 的 reject 操作，造成多余的 unhandledrejection 错误捕获事件
  //   // 此处理之后，外层还能否拿到 reject 的错误呢，此处使用 catch，外部继续使用 catch 无法获取到此错误
  //   console.log('%c[inner] load catch log', 'color:#fff;background:green;', err);
  //   // throw err // 需要 throw 外界才能接受到，不然收不到
  // })
}

export function loadJs(sourceUrl, obj = {}) {
  // 默认是同步加载，同步模式又称阻塞模式
  // 同步加载流程是瀑布模型，异步加载流程是并发模型。
  const options = {
    src: sourceUrl,
    // async: false, // 异步加载
    // defer: false, // 延迟加载
    // crossOrigin: 'anonymous', // 默认不要开启，因为开启后，如果服务端不配合 CORS 设置，会导致无法正常加载（特别是第三方脚本）
    ...obj,
    tag: 'script',
    getDomTag() {
      return `script[src="${sourceUrl}"]`;
    },
  }
  return load(options);
}

export function loadCss(sourceUrl, obj = {}) {
  const options = {
    href: sourceUrl,
    ...obj,
    rel: 'stylesheet',
    tag: 'link',
    getDomTag() {
      return `link[href="${sourceUrl}"]`;
    },
  }
  return load(options);
}

export function loadImage(sourceUrl, obj = {}) {
  const options = {
    src: sourceUrl,
    ...obj,
    tag: 'img',
    getDomTag() {
      return `img[src="${sourceUrl}"]`;
    },
  }
  return load(options);
}
