# MutationObserver

- https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver

MutationObserver 接口提供了监视对DOM树所做更改的能力。它被设计为旧的Mutation Events功能的替代品，该功能是DOM3 Events规范的一部分。

```js
// 选择需要观察变动的节点
const targetNode = document.getElementById('some-id');

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const callback = function(mutationsList, observer) {
  console.log(mutationsList)
  // Use traditional 'for loops' for IE 11
  for(let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.');
    }
    else if (mutation.type === 'attributes') {
      console.log('The ' + mutation.attributeName + ' attribute was modified.');
    }
  }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察
observer.disconnect();
```


## MutationObserver 如何模拟 nextTick

参考：https://www.zhihu.com/question/55364497/answer/144215284

MutationObserver 如何模拟 nextTick 这点，直接看[源码](https://github.com/vuejs/vue/blob/9cfd63a7d08c1eba029c8bd7463b3047c3347826/src/core/util/env.js#L86-L95)，其实就是创建一个 TextNode 并监听内容变化，然后要 nextTick 的时候去改一下这个节点的文本内容：

```js
var counter = 1
var observer = new MutationObserver(nextTickHandler)
var textNode = document.createTextNode(String(counter))
observer.observe(textNode, {
  characterData: true
})
timerFunc = () => {
  counter = (counter + 1) % 2
  textNode.data = String(counter)
}
```
