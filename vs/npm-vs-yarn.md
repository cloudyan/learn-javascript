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
- 循环依赖及解法
  - 三大模块规范
  - 解法

## 关于 npm cnpm && package.json

npm vs cnpm
package.json vs package-lock.json

- package.json文件只能锁定大版本，也就是版本号的第一位，并不能锁定后面的小版本，在npm 5时添加package-lock.json。
- npm i会根据package-lock.json里的内容来处理和安装依赖而不是package.json。
- cnpm i不受package-lock.json影响，只会根据package.json进行下载。
- npm i 会生成package-lock.json，如果删除了，再重新npm i会生成package-lock.json。
- cnpm i是不会生成package-lock.json的。
- cnpm i xxx@xxx不会跟新到package-lock.json中去。
- npm i xxx@xxx会跟新到package-lock.json中去。
- npm 配置文件 ~/.npmrc， 可以由nrm 管理
- cnpm 配置文件 ~/.cnpmrc

## 库的版本号详解(^ vs ~ 区别)

- 波浪符号（~）：他会更新到当前minor version（也就是中间的那位数字）中最新的版本。匹配3.1.x中最新的版本
- 插入符号（^）：这个符号就显得非常的灵活了，他将会把当前库的版本更新到当前major version（也就是第一位数字）中最新的版本。匹配3.x.x中最新的版本

## 关于安装本地的依赖

- git sources: This is a git specifier with resolved committish. (eg, git+https://example.com/foo/bar#115311855adb0789a0466714ed48a1499ffea97e)
- http tarball sources: This is the URL of the tarball. (eg, https://example.com/example-1.3.0.tgz)
- local tarball sources: This is the file URL of the tarball. (eg file:///opt/storage/example-1.3.0.tgz)
- local link sources: This is the file URL of the link. (eg file:libs/our-module)

- http://caibaojian.com/npm/all.html#version-1

参考：

- https://zhuanlan.zhihu.com/p/33049803
- http://caibaojian.com/npm/all.html
- http://caibaojian.com/npm/all.html#version-1
