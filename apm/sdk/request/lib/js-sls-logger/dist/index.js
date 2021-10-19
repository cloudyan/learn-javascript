"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var lz4init = require("./lz4");

var lz4 = lz4init("lz4");
var Buffer = lz4init("buffer").Buffer;

var SlsWebLogger = /*#__PURE__*/function () {
  function SlsWebLogger(opt) {
    _classCallCheck(this, SlsWebLogger);

    var host = opt.host,
        project = opt.project,
        logstore = opt.logstore,
        time = opt.time,
        count = opt.count,
        _opt$compress = opt.compress,
        compress = _opt$compress === void 0 ? false : _opt$compress;
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
  }

  _createClass(SlsWebLogger, [{
    key: "monitorPageClose",
    value: function monitorPageClose() {
      var _this = this;

      window.onunload = function () {
        if (_this.arr.length > 0) {
          var arrStore = JSON.stringify(_this.arr);
          window.localStorage.setItem("@sls-logger-chunk", arrStore);
        }
      };
    }
  }, {
    key: "initSendLocalChunk",
    value: function initSendLocalChunk() {
      var beforeLoggerChunk = window.localStorage.getItem("@sls-logger-chunk");

      if (beforeLoggerChunk !== null && typeof beforeLoggerChunk === "string") {
        try {
          var arrStore = JSON.parse(beforeLoggerChunk);
          this.logger(arrStore);
          window.localStorage.removeItem("@sls-logger-chunk");
        } catch (e) {}
      }
    }
  }, {
    key: "createHttpRequest",
    value: function createHttpRequest() {
      if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
      } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
      }
    }
  }, {
    key: "logger",
    value: function logger() {
      var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.arr;
      var url = "https://" + this.project + "." + this.host + "/logstores/" + this.logstore + "/track";

      try {
        var httpRequest_ = this.createHttpRequest();
        httpRequest_.open("POST", url, true);
        httpRequest_.setRequestHeader("x-log-apiversion", "0.6.0");
        var reqPayload = JSON.stringify({
          __logs__: arr
        });
        httpRequest_.setRequestHeader("x-log-bodyrawsize", reqPayload.length);

        if (!this.compress) {
          var blob = new Blob([reqPayload], {
            type: "application/x-protobuf"
          });
          httpRequest_.send(blob);
        } else {
          httpRequest_.setRequestHeader("x-log-compresstype", "lz4");
          var input = Buffer.from(reqPayload);
          var maxOutputSize = lz4.encodeBound(reqPayload.length);
          var output = Buffer.alloc(maxOutputSize);
          console.log(output);
          var compressedSize = lz4.encodeBlock(input, output);
          output = output.slice(0, compressedSize); // const blob = new Blob([output], {
          //   type: "application/x-protobuf",
          // });

          httpRequest_.send(output);
        }
      } catch (ex) {
        if (window && window.console && typeof window.console.log === "function") {
          console.log("Failed to log to ali log service because of this exception:\n" + ex);
          console.log("Failed log data:", url);
        }
      }
    }
  }, {
    key: "transString",
    value: function transString(obj) {
      var newObj = {};

      for (var i in obj) {
        if (_typeof(obj[i]) == "object") {
          newObj[i] = JSON.stringify(obj[i]);
        } else {
          newObj[i] = String(obj[i]);
        }
      }

      return newObj;
    }
  }, {
    key: "send",
    value: function send(originObj) {
      var obj = this.transString(originObj);

      if (this.timer) {
        this.arr.push(obj);

        if (this.arr.length === this.count) {
          clearTimeout(this.timer);
          this.timer = null;
          this.logSending(this.arr);
        }
      } else {
        var that = this;
        this.arr.push(obj);
        this.timer = setTimeout(function () {
          that.logSending(that.arr);
        }, this.time * 1000);
      }
    }
  }, {
    key: "logSending",
    value: function logSending(content) {
      if (content && content.length > 0) {
        this.logger();
        clearTimeout(this.timer);
        this.timer = null;
        this.arr = [];
      }
    }
  }]);

  return SlsWebLogger;
}();

module.exports = SlsWebLogger;
