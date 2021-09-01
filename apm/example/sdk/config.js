
// 通过服务器下发配置 apiConfig
const apiConfig = {
  dsn: '',
  enabled: true,
  enableReport: true,
  reportJsErr: true,
  reportResErr: true,
  reportApiErr: true,
}

const projectName = 'demo';
// APM SDK 相关配置
const sdkConfig = {
  // debug: true,
  // enabled: true,
  dsn: 'http://xxxx@xxx.com/3',
  release: version,
  environment: UI_RUNTIME_ENV, // 环境变量 dev/sit/prod 等
  enableReport: true,
  spa: false,
  projectName,
}

// sourceMap 相关配置
const sourceMapConfig = {
  apiKey: 'xxx',
  baseUrl: 'xxx', //
  projectName,
  deleteAfterCompile: true,
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
}
