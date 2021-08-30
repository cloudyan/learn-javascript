# matchMedia

让网页适应系统主题及夜间模式。

- [Window.matchMedia()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia)


```js
// 判断是否支持主题色

if (window.matchMedia('(prefers-color-scheme)').media === 'not all') {
  console.log('Browser doesn\'t support dark mode');
}

// 判断是否处于深色模式
if(window.matchMedia('(prefers-color-scheme: dark)').matches){
  //Do something
}

// 判断是否处于浅色模式
if(window.matchMedia('(prefers-color-scheme: light)').matches){
    //Do something
}

// 模式切换听器
var themeListeners={
  dark: function(mediaQueryList ){
    if(mediaQueryList.matches){
      console.log('您切换到深色模式了！')
    }
  },
  light: function(mediaQueryList){
    if(mediaQueryList.matches){
      console.log('您切换到浅色模式了！')
    }
  }
}

window.matchMedia('(prefers-color-scheme: dark)').addListener(themeListeners.dark)
window.matchMedia('(prefers-color-scheme: light)').addListener(themeListeners.light)
```

参考：

- https://www.cnblogs.com/ysxq/p/12979525.html
