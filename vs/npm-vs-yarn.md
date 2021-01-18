# npm vs yarn

`npm` vs `yarn`, 还有 `cnpm` `pnpm`

- 依赖管理（确定性是指在给定的 package.json 和 lock 文件下始终能得到一致的 node_modules 目录结构）
  - npm
    - npm@1.x 嵌套模式 存在嵌套过深+相同依赖多份问题
    - npm@3.x 扁平模式 存在不确定性
    - npm@5.x 扁平模式+lock package-lock.json 确保确定性
  - yarn 加lock yarn.lock
  - pnpm 运行起来非常的快。
    - 使用硬链接 提速并节省空间
    - 继承了yarn的所有优点，包括离线模式和确定性安装
    - pnpm是一些测试用例的更好的选择
    - `npm install -g pnpm` 使用时，只需要把npm替换为pnpm即可
  - cnpm 国内源库
- 循环依赖及解法 [参看](../es2015/23.module/loop/readme.md)
  - 三大模块规范
  - 解法

## 关于 npm cnpm && package-lock.json

npm vs cnpm

package.json && package-lock.json

- package.json文件只能锁定大版本，也就是版本号的第一位，并不能锁定后面的小版本，在npm 5时添加package-lock.json。
- npm i会根据package-lock.json里的内容来处理和安装依赖而不是package.json。
- npm i 会生成package-lock.json，如果删除了，再重新npm i会生成package-lock.json。
- npm i xxx@xxx 会更新到package-lock.json中去。
- npm 配置文件 ~/.npmrc， 可以由nrm 管理

- cnpm i 不受package-lock.json影响，只会根据package.json进行下载。
- cnpm i 是不会生成package-lock.json的。
- cnpm i xxx@xxx 不会更新到package-lock.json中去。
- cnpm 配置文件 ~/.cnpmrc

### 曲折的package-lock.json

查阅[资料](https://github.com/npm/npm/issues/17979)得知，自npm 5.0版本发布以来，package-lock.json的规则发生了三次变化。

1. npm 5.0.x版本，不管package.json怎么变，npm install都会根据lock文件下载。npm/npm#16866控诉了这个问题，我明明手动改了package.json，为啥不给我升包！然后就导致5.1.0的问题(是个bug)
2. npm 5.1.0 - 5.4.1版本，npm insall会无视lock文件，去下载**semver兼容的最新的包**。导致lock文件并不能完全锁住依赖树。详情见npm/npm#17979
3. npm 5.4.2版本之后，如果手动改了package.json，且package.json和lock文件不同，那么执行npm install时npm会根据package中的版本号和语义含义去下载最新的包，并更新至lock。

如果两者是同一状态，那么执行npm install都会根据lock下载，不会理会package实际包的版本是否更新。

TIP: **建议将 `package-lock.json` 添加到版本控制中去**。

其他

NPM 强制该 package-lock.json 不会被发布。 即使你将其显式添加到软件包的 files 属性中，它也不会是已发布软件包的一部分。

package-lock.json vs npm-shrinkwrap.json

- NPM 会在安装包时自动创建 package-lock.json，除非已经有 npm-shrinkwrap.json，并在必要时更新它。
- 新的 package-lock.json 永远不会被发布，而且应该将其添加到你的版本控制系统中去。
- 运行已经带有 package-lock.json 文件的 npm shrinkwrap 命令将只会对其重命名为 npm-shrinkwrap.json。
- 当两个文件处于某些原因同时存在时，package-lock.json 将被忽略。

## 库的版本号详解(^ vs ~ 区别)

- 波浪符号（~）：他会更新到当前minor version（也就是中间的那位数字）中最新的版本。匹配3.1.x中最新的版本
- 插入符号（^）：这个符号就显得非常的灵活了，他将会把当前库的版本更新到当前major version（也就是第一位数字）中最新的版本。匹配3.x.x中最新的版本

## 关于安装本地的依赖

- git sources: This is a git specifier with resolved committish. (eg, git+https://example.com/foo/bar#115311855adb0789a0466714ed48a1499ffea97e)
- http tarball sources: This is the URL of the tarball. (eg, https://example.com/example-1.3.0.tgz)
- local tarball sources: This is the file URL of the tarball. (eg file:///opt/storage/example-1.3.0.tgz)
- local link sources: This is the file URL of the link. (eg file:libs/our-module)

- http://caibaojian.com/npm/all.html#version-1

## pnpm原理

1. 同 yarn 和 npm 一样，pnpm 仍然使用缓存来保存已经安装过的包，以及使用 pnpm-lock.yaml 来记录详细的依赖版本。
2. 不同于 yarn 和 npm， pnpm 使用**符号链接和硬链接**（可将它们想象成快捷方式）的做法来放置依赖，从而规避了从缓存中拷贝文件的时间，使得安装和卸载的速度更快。
3. 由于使用了**符号链接和硬链接**，pnpm可以规避windows操作系统路径过长的问题，因此，它选择使用树形的依赖结果，有着几乎完美的依赖管理。也因为如此，**项目中只能使用直接依赖，而不能使用间接依赖**。

### 注意事项

由于 pnpm 会改动 node_modules 目录结构，使得**每个包只能使用直接依赖，而不能使用间接依赖**，因此，如果使用 pnpm 安装的包中包含间接依赖，则会出现问题(**现在不会了，除非使用了绝对路径**)。

由于 pnpm 超高的安装卸载效率，越来越多的包开始修正之前的间接依赖代码。

## 问题

当团队中有成员提交了package.json, package-lock.json 更新后，其他成员需要执行npm install来保证本地依赖的及时性，那么这个手动的环节是否能自动化呢？

答案是可以的，我们只需要在git post-merge钩子中检查git diff files是否包含了package.json文件，如果包含了该文件，则执行npm install命令。

参考：

- https://zhuanlan.zhihu.com/p/33049803
- http://caibaojian.com/npm/all.html
- http://caibaojian.com/npm/all.html#version-1
- https://blog.csdn.net/weixin_33724570/article/details/93742194
- [npm依赖管理那些事](https://zhuanlan.zhihu.com/p/163152849)
- [[译] 理解 NPM 5 中的 lock 文件](https://juejin.cn/post/6844903481589891080)
