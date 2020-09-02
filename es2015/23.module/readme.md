# 模块

- 模块加载及引用
  - CommonJS AMD ES6
  - cjs -> esm
  - package.json
    - 指定type字段为module，该目录里面的 JS 脚本，就被解释用 ES6 模块。
    - 如果没有type字段，或者type字段为commonjs，则.js脚本会被解释成 CommonJS 模块。
    - .mjs文件总是以 ES6 模块加载，.cjs文件总是以 CommonJS 模块加载，.js文件的加载取决于package.json里面type字段的设置。
    - ES6 模块与 CommonJS 模块尽量不要混用
- Nodejs 如何处理 ES6 模块
- ES6 模块加载器[SystemJS](https://github.com/ModuleLoader/es-module-loader)

## 语法

import

```js
import defaultExport from "module-name";
import * as myModule from "module-name";
import { export1 } from "module-name";
import { export1 as alias1 } from "module-name";
import { export1 , export2 } from "module-name";
import { foo , bar } from "module-name/path/to/specific/un-exported/file";
import { export1 , export2 as alias2 , [...] } from "module-name";
import defaultExport, { export1 [ , [...] ] } from "module-name";
import defaultExport, * as myModule from "module-name";
import "module-name";
var promise = import("module-name"); // 这是一个处于第三阶段的提案。

// dynamic imports
import('/modules/my-module.js')
  .then((module) => {
    // Do something with the module.
  });

// 也支持 await 关键字
(async () => {
  if (somethingIsTrue) {
    // import module for side effects
    await import('/modules/my-module.js');
  }
})();

// 动态导入 default 时，方式有所不同，需要重命名 default
(async () => {
  if (somethingIsTrue) {
    const { default: myDefault, foo, bar } = await import('/modules/my-module.js');
  }
})();
```

export

存在两种 exports 导出方式：

- 命名导出（每个模块包含任意数量）
- 默认导出（每个模块包含一个）

```js
// 导出单个特性
export let name1, name2, …, nameN; // also var, const
export let name1 = …, name2 = …, …, nameN; // also var, const
export function FunctionName(){...}
export class ClassName {...}
let name3 = 2
export name3 as name4

// 导出列表
export { name1, name2, …, nameN };

// 重命名导出
export { variable1 as name1, variable2 as name2, …, nameN };
export { myNumbers, myLogger as Logger, Alligator }

// 解构导出并重命名
export const { name1, name2: bar } = o;

// 默认导出
export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };

// Aggregating modules
export * from "module-name"; // does not set the default export
export * as name1 from "module-name";
export { name1, name2, …, nameN } from "module-name";
export { import1 as name1, import2 as name2, …, nameN } from "module-name";
export { default } from "module-name";
```

具体语法分析

from [tc39](https://github.com/tc39)

- https://github.com/tc39/proposal-export-default-from
- https://github.com/tc39/proposal-export-ns-from

Statement Form                          | [[ModuleRequest]] | [[ImportName]] | [[LocalName]]  | [[ExportName]]
--------------                          | ----------------- | -------------- | -------------- | --------------
`import "mod";`                         |                   |                |                |
`import v from "mod";`                  | `"mod"`           | `"default"`    | `"v"`          |
`import {x} from "mod";`                | `"mod"`           | `"x"`          | `"x"`          |
`export {x} from "mod";`                | `"mod"`           | `"x"`          | **null**       | `"x"`
`import {x as v} from "mod";`           | `"mod"`           | `"x"`          | `"v"`          |
`export {x as v} from "mod";`           | `"mod"`           | `"x"`          | **null**       | `"v"`
`import * as ns from "mod";`            | `"mod"`           | `"*"`          | `"ns"`         |
<ins>`export * as ns from "mod";`</ins> | `"mod"`           | `"*"`          | **null**       | `"ns"`
`export * from "mod";`                  | `"mod"`           | `"*"`          | **null**       | **null** (many)

## CommonJs 模块加载 ES6 模块

CommonJS 的`require()`命令不能加载 ES6 模块，会报错，只能使用`import()`这个方法加载。

```js
// 此代码可以在 CommonJS 模块中运行。
(async () => {
  await import('./my-app.mjs');
})();
```

`require()`不支持 ES6 模块的一个原因是，它是同步加载，而 ES6 模块内部可以使用顶层`await`命令，导致无法被`require()`同步加载。

## ES6 模块加载 CommonJS 模块

ES6 模块的`import`命令可以加载 CommonJS 模块，但是只能整体加载，不能只加载单一的输出项。

```js
// 正确
import packageMain from 'commonjs-package';

// 报错
import { method } from 'commonjs-package';
```

这是因为 ES6 模块需要支持静态代码分析，而 CommonJS 模块的输出接口是module.exports，是一个对象，无法被静态分析，所以只能整体加载。

加载单一的输出项，可以写成下面这样。

```js
import packageMain from 'commonjs-package';
const { method } = packageMain;
```

## 同时支持两种格式的模块

```json
// package.json
"exports"：{
  "require": "./index.js",
  "import": "./esm/wrapper.js"
}
```

参考：


- [Node.js 如何处理 ES6 模块](http://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
