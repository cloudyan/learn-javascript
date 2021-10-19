const lz4init = require("./lz4");
const lz4 = lz4init("lz4");
const Buffer = lz4init("buffer").Buffer;

class SlsWebLogger {
  constructor(opt) {
    let { host, project, logstore, time, count, compress = false } = opt;
    this.timer = null;
    this.contents_ = new Array();
    this.host = host; //所在区域的host
    this.project = project; //project名称
    this.logstore = logstore; //logstore名称
    this.time = time || 10; //定义时间，number类型
    this.count = count || 10; //定义数据条数，number类型
    this.arr = [];
    this.initSendLocalChunk();
    this.monitorPageClose();
    this.compress = compress;
    this.timeGap = null
  }
  monitorPageClose() {
    window.onunload = () => {
      if (this.arr.length > 0) {
        const arrStore = JSON.stringify(this.arr);
        window.localStorage.setItem("@sls-logger-chunk", arrStore);
      }
    };
  }
  initSendLocalChunk() {
    const beforeLoggerChunk = window.localStorage.getItem("@sls-logger-chunk");
    if (beforeLoggerChunk !== null && typeof beforeLoggerChunk === "string") {
      try {
        const arrStore = JSON.parse(beforeLoggerChunk);
        this.logger(arrStore);
        window.localStorage.removeItem("@sls-logger-chunk");
      } catch (e) {}
    }
  }
  createHttpRequest() {
    if (window.ActiveXObject) {
      return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    }
  }
  logger(arr = this.arr) {
    let url =
      "http://" +
      this.project +
      "." +
      this.host +
      "/logstores/" +
      this.logstore +
      "/track";

    try {
      const httpRequest_ = this.createHttpRequest();
      // 计算本地时间和服务器返回x-log-time的时间差
      httpRequest_.onreadystatechange = () => {
        if (httpRequest_.readyState == 4 && httpRequest_.status == 200 && !this.timeGap) {
          const local_timestamp = (new Date()).getTime();
          let timeGap = 0
          if (httpRequest_.getResponseHeader('x-log-time')) {
            timeGap = httpRequest_.getResponseHeader('x-log-time') * 1000 - local_timestamp;
            this.timeGap = timeGap
          }
          window.localStorage.setItem('ali-sls@wpk-reporter-time-gap', timeGap)
        }
      }
      httpRequest_.open("POST", url, true);
      httpRequest_.setRequestHeader("x-log-apiversion", "0.6.0");
      const reqPayload = JSON.stringify({
        __logs__: arr,
      });
      httpRequest_.setRequestHeader("x-log-bodyrawsize", reqPayload.length);
      if (!this.compress) {
        const blob = new Blob([reqPayload], {
          type: "application/x-protobuf",
        });
        httpRequest_.send(blob);
      } else {
        httpRequest_.setRequestHeader("x-log-compresstype", "lz4");
        const input = Buffer.from(reqPayload);
        const maxOutputSize = lz4.encodeBound(reqPayload.length);
        let output = Buffer.alloc(maxOutputSize);
        const compressedSize = lz4.encodeBlock(input, output);
        output = output.slice(0, compressedSize);
        httpRequest_.send(output);
      }
    } catch (ex) {
      if (
        window &&
        window.console &&
        typeof window.console.log === "function"
      ) {
        console.log(
          "Failed to log to ali log service because of this exception:\n" + ex
        );
        console.log("Failed log data:", url);
      }
    }
  }

  transString(obj) {
    let newObj = {};
    for (let i in obj) {
      if (typeof obj[i] == "object") {
        newObj[i] = JSON.stringify(obj[i]);
      } else {
        newObj[i] = String(obj[i]);
      }
    }
    return newObj;
  }

  send(originObj) {
    const obj = this.transString(originObj);
    if (this.timer) {
      this.arr.push(obj);
      if (this.arr.length === this.count) {
        clearTimeout(this.timer);
        this.timer = null;
        this.logSending(this.arr);
      }
    } else {
      const that = this;
      this.arr.push(obj);
      this.timer = setTimeout(function () {
        that.logSending(that.arr);
      }, this.time * 1000);
    }
  }

  logSending(content) {
    if (content && content.length > 0) {
      this.logger();
      clearTimeout(this.timer);
      this.timer = null;
      this.arr = [];
    }
  }
}

module.exports = SlsWebLogger;