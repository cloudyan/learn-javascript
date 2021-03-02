---
nav:
  title: 使用 dva
  order: 5
---

## dva 是什么

[dva](https://dvajs.com/guide/) 是体验技术部开发的 React 应用框架，将上面三个 React 工具库包装在一起，简化了 API，让开发 React 应用更加方便和快捷。

dva = React-Router + Redux + Redux-saga

### 5个API

```js
import dav from 'dva-core'

// 1.创建dva实例
const app=dva();

// 2.装载插件（可选）
app.use(require('dva-loading')());

// 3.注册model
app.model(require('./models/count'));

// 4.配置路由
app.router(require('./router'));

// 5.启动应用
app.start('#root');
```

### 8个概念

[dva 概念](https://dvajs.com/guide/concepts.html)

- `State`[1]:  一个对象，保存整个应用状态
- `Action`[2]: 一个对象，描述事件 格式：`{ type: String, payload: data }`
- `dispatch`[3]: 一个函数，用于触发 action 函数
- Model: 用于把数据相关的逻辑聚合到一起
  - state: model的状态
  - namespace: 命名空间，只能用字符串
  - `Reducer`[4]: [Action 处理器] 用于处理同步操作，唯一可以修改 state 的地方。由 action 触发，**必须是纯函数**
  - `Effect`[5]:  [Action 处理器] 用于处理异步动作，不直接修改 state。基于 Redux-saga 实现
    - effect 函数内部处理函数:
      - `put`: 用于触发 action，类似于 dispatch
      - `call`: 用于调用异步逻辑，支持 Promise
      - `select`: 用于从 state 里获取数据
  - `Subscriptions`[6]: 一种从源获取数据的方法，用于订阅一个数据源，然后根据需要 dispatch 相应的 action，它来自于 elm
- `Router`[7]: dva 实例提供了 router 方法来控制路由，使用的是react-router。
- `RouteComponent`[8]: 对应为Container Components。
  - dva 中，通常需要 connect Model的组件都是 Route Components，组织在/routes/目录下，而/components/目录下则是纯组件（Presentational Components）
  - `connect`: 一个函数，绑定 State 到 View

## 示例

展示一个操作交互示例
