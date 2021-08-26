# SLS WebTracking JavaScript Logging SDK

## 背景信息

Web Tracking 可以采集各种浏览器、iOS APP 或 Android APP 的用户信息，例如：

- 用户使用的浏览器、操作系统、分辨率等信息。
- 用户浏览行为记录（例如：用户在网站上的单击行为、购买行为等）。
- 用户在 APP 中的停留时间、是否活跃等。

## 注意事项

- 使用 Web Tracking 则表示该 Logstore 打开互联网匿名写入权限，没有经过有效鉴权，可能产生脏数据。
- POST 请求每次写入的日志数量上限为 3MB 或者 4096 条，详情请参见[PutLogs](https://help.aliyun.com/document_detail/29026.html#reference-a5t-kxr-zdb)。

## 数据采集

控制台方式

1. 登录[日志服务控制台](https://sls.console.aliyun.com/)。
2. 单击目标 Project。
3. 找到目标 Logstore，单击![pic](https://static-aliyun-doc.oss-cn-hangzhou.aliyuncs.com/assets/img/zh-CN/5642298851/p65765.png)下的**修改**。
4. 在**Logstore 属性**页面，单击右上方的**修改**。
5. 打开**WebTracking**开关，并单击**保存**。

通过 JavaScript SDK 方式进行数据的采集

**1.安装依赖包**

```javascript
npm install --save js-sls-logger
```

**2.`import`在您的应用程序模块。**

```javascript
import SlsWebLogger from "js-sls-logger";
```

**3.配置参数 opts。**

|   **参数**   |                                                              **说明**                                                               |        **是否填写**        |
| :----------: | :---------------------------------------------------------------------------------------------------------------------------------: | :------------------------: |
|   **host**   | **日志服务所在地域的 Endpoint，详情请参见**[**服务入口**](https://help.aliyun.com/document_detail/29008.html#reference-wgx-pwq-zdb) |          **必填**          |
| **project**  |                                                   **控制台创建的 project 名称。**                                                   |          **必填**          |
| **logstore** |                                                  **控制台创建的 logstore 名称。**                                                   |          **必填**          |
|   **time**   |                                 **发送消息的时间间隔,数据格式为 Number 的方式,time\*1000(毫秒)。**                                  |   **选填(默认是 10 秒)**   |
|  **count**   |                                          **发送消息的数量大小,数据格式为 Number 的方式。**                                          | **选填(默认是 10 条数据)** |
| **compress** |                                                         **是否启用压缩。**                                                          |  **选填（默认为 true）**   |

```javascript
const opts = {
  host: "${host}", // 所在区域的host
  project: "${project}", // project名称
  logstore: "${logstore}", // logstore名称
  time: 10, // 定义时间，默认是10秒，number类型，选填
  count: 10, // 定义数据条数，默认是10条，number类型，选填
  compress: true, // 是否启用压缩，默认为true
};
```

**4.创建 SlsWebLogger 对象。**

```javascript
const logger = new SlsWebLogger(opts);
```

**5.上传日志。**

```javascript
logger.send({
  customer: "zhangsan",
  product: "iphone 12",
  price: 7998,
});
```

## 核心功能

**send()**

说明:  实现数据批量处理并执行数据上传。

参数：Object 类型

示例：

```javascript
logger.send({
  customer: "zhangsan",
  product: "iphone 12",
  price: 7998,
});
```
