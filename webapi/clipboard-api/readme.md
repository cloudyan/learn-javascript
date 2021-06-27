# clipboard api

```js
document.body.addEventListener(
  'click',
  async (e) => {
    const text = await navigator.clipboard.readText();
    console.log(text);
  }
)

// 如果用户不同意，脚本就会报错。这时，可以使用try...catch结构，处理报错。

document.execCommand('copy')  // 复制
document.execCommand('cut')   // 剪切
document.execCommand('paste') // 粘贴
```

参考：

- [剪贴板操作 Clipboard API 教程](https://www.ruanyifeng.com/blog/2021/01/clipboard-api.html)
