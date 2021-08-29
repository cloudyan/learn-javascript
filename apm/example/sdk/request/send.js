import SlsWebLogger from 'js-sls-logger';

/**
 * SLS WebTracking JavaScript Logging SDK
 *    [使用Web Tracking采集日志](https://help.aliyun.com/document_detail/31752.htm)
 *    [PutWebtracking](https://help.aliyun.com/document_detail/120218.htm)
 *    https://www.npmjs.com/package/js-sls-logger
 *
 * Web Tracking 可以采集各种浏览器、iOS APP 或 Android APP 的用户信息，例如：
 *    - 用户使用的浏览器、操作系统、分辨率等信息。
 *    - 用户浏览行为记录（例如：用户在网站上的单击行为、购买行为等）。
 *    - 用户在 APP 中的停留时间、是否活跃等。
 *
 * 注意事项
 *    - 使用 Web Tracking 则表示该 Logstore 打开互联网匿名写入权限，没有经过有效鉴权，可能产生脏数据。
 *    - POST 请求每次写入的日志数量上限为 3MB 或者 4096 条，详情请参见[PutLogs](https://help.aliyun.com/document_detail/29026.html#reference-a5t-kxr-zdb)。
 */
const opts = {
  host: `${host}`, // 所在区域的host
  project: `${project}`, // project名称
  logstore: `${logstore}`, // logstore名称
  time: 10, // 定义时间，默认是10秒，number类型，选填
  count: 10, // 定义数据条数，默认是10条，number类型，选填
  compress: true, // 是否启用压缩，默认为true
};

const logger = new SlsWebLogger(opts);

// 上传日志, 自定义数据
logger.send({
  customer: "zhangsan",
  product: "iphone 12",
  price: 7998,
});
