# 变量

- `undefined` vs `null`
  - 值类型的“虚无”，用 `undefined`。引用类型的“虚无”，用 `null`.
  - `undefined in window` undefined 是全局对象（window）的属性，频繁使用存在性能问题

参考：

- https://www.cnblogs.com/sunshq/p/3808571.html
- https://mp.weixin.qq.com/s/j9NsNKGtKhE0MgDLr81KcQ
  - 第一章 「重学 JavaScript」变量和类型
  - 第二章 「重学 JavaScript」原型和原型链
  - 第三章 「重学 JavaScript」作用域和闭包

## 理解变量提升

```js
function Foo() {
  getName = function() { console.log(1) };
  return this;
}

Foo.getName = function() { console.log(2) };
Foo.prototype.getName = function() { console.log(3) };
var getName = function() { console.log(4) };
function getName() { console.log(5) }

// 请输出下列的输出结果
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```

解析：https://b23.tv/zzNYY1

1. 变量与函数冲突，优先保留函数
2. `new Foo.getName();` => `new (Foo.getName)()`
3. `new new Foo().getName();` => `new ((new Foo()).getName)()`
