# clipboard api

## document.execCommand()

参见 [../document-exec-command-api]

## 异步 Clipboard API

Clipboard API 是下一代的剪贴板操作方法，比传统的document.execCommand()方法更强大、更合理。可以将任意内容（比如图片）放入剪贴板。

1. Chrome 浏览器规定，只有 HTTPS 协议的页面才能使用这个 API。不过，开发环境（localhost）允许使用非加密协议。
2. 调用时需要明确获得用户的许可。权限的具体实现使用了 [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API)，跟剪贴板相关的有两个权限：clipboard-write（写权限）和clipboard-read（读权限）。"写权限"自动授予脚本，而"读权限"必须用户明确同意给予。也就是说，写入剪贴板，脚本可以自动完成，但是读取剪贴板时，浏览器会弹出一个对话框，询问用户是否同意读取。
3. 脚本读取的总是当前页面的剪贴板

- `clipboard.readText()` 方法用于复制剪贴板里面的文本数据。
- `clipboard.read()` 方法用于复制剪贴板里面的数据，可以是文本数据，也可以是二进制数据（比如图片）。
- `clipboard.writeText()` 方法用于将文本内容写入剪贴板。
- `clipboard.write()` 方法用于将任意数据写入剪贴板，可以是文本数据，也可以是二进制数据。

```js
// 异步方法 navigator.clipboard
document.body.addEventListener(
  'click',
  async (e) => {
    const text = await navigator.clipboard.readText();
    console.log(text);
  }
)

// 如果用户不同意，脚本就会报错。这时，可以使用try...catch结构，处理报错。
async function getClipboardContents() {
  try {
    const text = await navigator.clipboard.readText();
    console.log('Pasted content: ', text);
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
  }
}

```

参考：

- [剪贴板操作 Clipboard API 教程](https://www.ruanyifeng.com/blog/2021/01/clipboard-api.html)
