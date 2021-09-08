# document.execCommand

- `document.execCommand`
- `document.queryCommandSupported`

`document.execCommand()` 是操作剪贴板的传统方法，各种浏览器都支持。

```js
// 同步方法
document.execCommand('copy')  // 复制
document.execCommand('cut')   // 剪切
document.execCommand('paste') // 粘贴
```

缺点：

- 只能将选中的内容复制到剪贴板，无法向剪贴板任意写入内容。
- 是同步操作，如果复制/粘贴大量数据，页面会出现卡顿
- 有些浏览器还会跳出提示框，要求用户许可，这时在用户做出选择前，页面会失去响应。

## 复制内容到剪贴板

```js
// 复制内容到剪贴板
export function copyToBoard(value) {
  const element = document.createElement('textarea')
  document.body.appendChild(element)
  element.value = value
  element.select() // 此方法不兼容 ios? 经测试未发现问题
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    document.body.removeChild(element)
    return true
  }
  document.body.removeChild(element)
  return false
}

// 如果复制成功返回true
// copyToBoard('lalallala')

```

原理：

- 创建一个 `textarea` 元素并调用 `select()` 方法选中
- `document.execCommand('copy')` 方法，拷贝当前选中内容到剪贴板。

参看：

- MDN-[execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)
- 示例 https://codepen.io/chrisdavidmills/full/gzYjag/
- [选择文本 select_event](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/select_event)
