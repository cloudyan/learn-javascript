# x vs in react

react 中的异同点

## useState 与 this.setState

- 相同点：都是异步的，例如在 onClick 事件中，调用两次 setState，数据只改变一次。
- 不同点：类中的 setState 是合并，而useState中的 setState 是替换。

## useState 与 useReducer

- 相同点：都是操作state
- 不同点：使用 useState 获取的 setState 方法更新数据时是异步的；而使用 useReducer 获取的 dispatch 方法更新数据是同步的。

推荐：当 state 状态值结构比较复杂时，使用useReducer

## useLayoutEffect 与 useEffect

- 相同点：都是在浏览器完成布局与绘制之后执行副作用操作
- 不同点：useEffect 会延迟调用，useLayoutEffect 会同步调用阻塞视觉更新，可以使用它来读取 DOM 布局并同步触发重渲染

推荐：一开始先用 useEffect，只有当它出问题的时候再尝试使用 useLayoutEffect

## useCallback 与 useMemo

- 相同点：都是返回memoized，useCallback( fn, deps) 相当于 useMemo( ( ) => fn, deps)
- 不同点：useMemo返回缓存的变量，useCallback返回缓存的函数

推荐：不要过早的性能优化，搭配食用口味更佳（详见下文性能优化）

参考：

- https://segmentfault.com/a/1190000020948922?utm_source=sf-related
- [最新React的useEffect与useLayoutEffect执行机制剖析](https://www.cnblogs.com/fulu/p/13470126.html)
- https://segmentfault.com/a/1190000023396433?utm_source=tag-newest
