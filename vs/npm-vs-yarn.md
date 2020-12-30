# npm vs yarn

npm vs yarn, 还有 cnpm pnpm

- 依赖管理（确定性是指在给定的 package.json 和 lock 文件下始终能得到一致的 node_modules 目录结构）
  - npm
    - npm@1.x 嵌套模式 存在嵌套过深+相同依赖多份问题
    - npm@3.x 扁平模式 存在不确定性
    - npm@5.x 扁平模式+lock package-lock.json 确保确定性
  - yarn 加lock yarn.lock
  - pnpm 使用硬链接 提速并节省空间
  - cnpm 国内源库
- 循环依赖

参考：

- https://zhuanlan.zhihu.com/p/33049803
