# CommonsChunkPlugin vs SplitChunksPlugin

## SplitChunksPlugin

webpack有一个默认配置，如下

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```

参看更多 splitChunks 相关信息

## 关于 CommonsChunkPlugin

```js
webpackConfig.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({
    async: true,
    name: ['common'], // 对应于上面的entry的key
    filename: 'js/common.[chunkhash:7].js',
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
- 推荐 [理解webpack4.splitChunks](https://www.cnblogs.com/kwzm/p/10314438.html)
- https://stackoverflow.com/questions/42523436/what-are-module-chunk-and-bundle-in-webpack
