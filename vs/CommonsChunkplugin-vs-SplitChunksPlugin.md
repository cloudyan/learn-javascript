# CommonsChunkPlugin vs SplitChunksPlugin

```js
webpackConfig.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({
    async: true,
    name: ['common'], // 对应于上面的entry的key
    filename: 'vendor.js',
    children: true,
    // 引入node_modules的依赖全抽出来
    minChunks: (module, count) => {
      if (module.resource) {
        if (/\.js/.test(module.resource)) {
          // console.log(count, ' ==== ', module.resource, '/n')
          return module.resource.indexOf(path.join(__dirname, './node_modules')) > -1 || module.resource.indexOf(path.join(__dirname, './mock')) > -1
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    // 重复模块大于2的全部抽出来
    // minChunks: 2,
  }),
)
```

参考：

- https://www.cnblogs.com/zhanyishu/p/9349576.html
- https://zhuanlan.zhihu.com/p/26131812
