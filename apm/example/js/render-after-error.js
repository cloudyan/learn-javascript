// 这个最后执行
// JS 执行是否被中断，受什么机制影响
setTimeout(() => {
  console.log('%cJS 执行未被中断, 页面渲染成功', 'background: green;color:#fff;')
  document.querySelector('h1').innerHTML = '页面渲染成功';
}, 3000);
