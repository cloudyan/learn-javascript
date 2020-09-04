# Symbol

- 引入`Symbol`的原因
- `Symbol.prototype.description`
- 作为属性名的 `Symbol`
- 实例：消除魔术字符串
- 属性名的遍历
- `Symbol.for()`, `Symbol.keyFor()`
- 实例：模块的 Singleton 模式
- 内置的 `Symbol` 值

Symbol 作为属性名，遍历对象的时候，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。

但是，它也不是私有属性，有一个`Object.getOwnPropertySymbols()`方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

另一个新的 API，`Reflect.ownKeys()`方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
