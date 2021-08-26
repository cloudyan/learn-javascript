

xxx.init({
  // debug: true,
  // enabled: true,
  dsn: 'http://xxxx@xxx.com/3',
  // release: version,
  environment: UI_RUNTIME_ENV, // 环境变量 dev/sit/prod 等
  // tracesSampleRate: 1.0,
  // commit: false, // 是否获取当前 git commit hash

  // sourceMap 相关配置
  apiKey: 'xxx',
  organization: 'xxx', //
  // baseSentryURL: '', // 可以从 dsn 提取
  // project: projectName,
  // include: /\.(js|js\.map)$/,
  // exclude: /\.(html|css|css\.map)$/,
  // suppressConflictError: true,
  // filenameTransform: function (filename) {
  //   // 此处应结合使用 publicPath 来处理，配置正确 sourceMap 才会生效（~代表域名）
  //   if (project) {
  //     return `~/${project}/` + filename;
  //   }
  //   return `~/` + filename;
  // },
})
