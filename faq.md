# faq

遇到的一些问题

更多参见 [各种问题异常处理](https://www.yuque.com/cloudyan/faq)

## mac 下 npm 安装某些包，如 bcrypto，报以下错误

```bash
> node-gyp rebuild

No receipt for 'com.apple.pkg.CLTools_Executables' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLILeo' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLI' found at '/'.

gyp: No Xcode or CLT version detected!
```

解决办法：

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

## 编译执行问题

使用命令行编译执行，报 `command "uni-build" does not exist.`

参考 https://ask.dcloud.net.cn/question/76865

```json
{
  "scripts": {
    "h5": "cd /Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/ && cross-env UNI_INPUT_DIR=$INIT_CWD/ UNI_OUTPUT_DIR=$INIT_CWD/unpackage/dist/dev/h5 UNI_PLATFORM=h5 NODE_ENV=development node bin/uniapp-cli.js",
    "app": "cd /Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/ && cross-env UNI_INPUT_DIR=$INIT_CWD/ UNI_OUTPUT_DIR=$INIT_CWD/unpackage/dist/dev/app-plus UNI_PLATFORM=app-plus NODE_ENV=development node bin/uniapp-cli.js",
  }
}
```

也可能遇到如下错误

```bash
--> LibSass 的二进制文件(/Applications/HBuilderX.app/Contents/HBuilderX/plugins/compile-node-sass/node_modules/node-sass-china/vendor/darwin-x64-72/binding.node)缺失，请执行下面3条命令下载对应版本的二进制文件：（有可能引发此错误的原因是 Node 版本变更）
  mkdir -p /Applications/HBuilderX.app/Contents/HBuilderX/plugins/compile-node-sass/node_modules/node-sass-china/vendor/darwin-x64-72
  cd /Applications/HBuilderX.app/Contents/HBuilderX/plugins/compile-node-sass/node_modules/node-sass-china/vendor/darwin-x64-72
  curl -o binding.node http://cdn.npm.taobao.org/dist/node-sass/v4.7.2/darwin-x64-72_binding.node
--> MacOS 、Unix/Linux 请根据权限使用 sudo
```

解决办法，参考官网通过 vue-cli 新建项目

- https://uniapp.dcloud.io/quickstart?id=_2-%e9%80%9a%e8%bf%87vue-cli%e5%91%bd%e4%bb%a4%e8%a1%8c

对比此项目中的 package.json 配置，

此方式有时碰到项目报错问题，可能和输入路径相关，待解决中，经过几次依赖升级，目前没问题了

暂时还没有直接打开对应的编译器

```js
scripts: {
  "dev": "cross-env NODE_ENV=development UNI_INPUT_DIR=$INIT_CWD/src UNI_OUTPUT_DIR=$INIT_CWD/src/unpackage/dist/dev/mp-weixin UNI_PLATFORM=mp-weixin vue-cli-service uni-build --watch"
}
```

脚本设置变量，set NODE_ENV=production 或 cross-env NODE_ENV=production

```bash
# gh-pages 发布要增加参数

{
  tag: '3.5.3',  // 版本号
  message: 'Auto-generated commit', // 当前开发分支的commit号
}
```

- Charles debugging proxy not connecting to localhost

https://blog.csdn.net/salmonellavaccine/article/details/75332654
解决方案
官方提供了两个解决方案：
- 执行 webpack-dev-server 命令时手动添加 --public 选项，取值为授权的 host，这是官方建议的做法，目的是为了安全。
- 设置 webpack-dev-server 的配置项 disableHostCheck 为 true 以禁用这一检测，如果开发者使用了代理，或在开发环境中不 care 这些安全问题，该设置可以直接斩草除根。


Uncaught (in promise) TypeError: Failed to execute 'fetch' on 'ServiceWorkerGlobalScope': 'only-if-cached' can be set only with 'same-origin' mode

Uncaught (in promise) TypeError: Failed to execute 'fetch' on 'ServiceWorkerGlobalScope': 'only-if-cached' can be set only with 'same-origin' mode
    at Object.fetchAndCache (sw.js:1)
    at sw.js:1

- 如何解决类似 curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused 的问题 #10

解决方案： https://github.com/hawtim/blog/issues/10

- CocoaPods安装方法

参考： https://www.jianshu.com/p/f43b5964f582
