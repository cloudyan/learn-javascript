# 有趣的代码

banana

```js
// banana

('b'+'a'+ +'a'+'a').toLocaleLowerCase()
// banana
```

闭包

```js
(i =>
  ((f => {
      f(f, i)
  })((f, i) => {
      console.log("i:", i)
      if (i < 10) {
          f(f, i + 1)
      }
  })))(1)
```
