# ES2022

- https://github.com/tc39/proposals/blob/master/finished-proposals.md

- Class Fields
  - Private Fields, Methods 使用#前缀定义类的私有方法和字段
  - Public Static Class Fields 静态公共字段
  - Private Fields In Operator 检测私有字段是否存在。
  - Class Static Initialization Blocks 类静态初始化块
- Relative indexing .at() method
  - 在所有内置的可索引数据上新增 .at() 方法。
- Object.hasOwn
  - 使用Object.hasOwn替代Object.prototype.hasOwnProperty.call
- Error Cause
  - 为 JavaScript 中的 Error 构造函数新增了一个属性 cause, 为抛出的错误附加错误原因
- RegExp Match Indices ('d' Flag)
  - 向 RegExp.prototype.exec 返回的数组对象上，新增 indices 属性用来描述这些位置信息
- Top-Level Await
  - 允许在 Async functions 之外使用await

提案为 ECMAScript Class 新增了下表中所描述的特性（绿色为现有特性）

![class-fields](./img/class-fields.webp)
