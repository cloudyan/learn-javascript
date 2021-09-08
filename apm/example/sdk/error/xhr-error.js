var xhr = window.XMLHttpRequest;
var _open = xhr.prototype.open;
var _send = xhr.prototype.send;
var attr = {};
var openReplacement = function (method, url) {
  // 可以存储method、url、时间打点等信息
  attr.duration = new Date().getTime();
  _open.apply(this, arguments);
}
var sendReplacement = function () {
  methods.addEvent(this, 'readystatechange', function (attr) {
    // 可以存储response的status、计算客户端实际响应时间
    attr.status = this.status;
    attr.duration = new Date().getTime() - attr.duration;
    // 上报【API】事件
  }.bind(this, , JSON.parse(JSON.stringify(attr))));
  _send.apply(this, arguments);
}
xmlhttp.prototype.open = openReplacement;
xmlhttp.prototype.send = sendReplacement;

function rewriteXHR(ctx, options) {
  const xhrProto = window.XMLHttpRequest.prototype;
  const {
    open: oldOpen,
    setRequestHeader: oldSetRequestHeader,
    send: oldSend,
  } = xhrProto;

  xhrProto.open = function (method, url = '') {
    this.reqCtx = {
      method,
      url,
      start: Date.now(),
    }
    oldOpen.apply(this, [...arguments]);
  }

  xhrProto.setRequestHeader = function(key, value) {
    oldSetRequestHeader.apply(this, [...arguments]);
    if (this.reqCtx) {
      if (!this.reqCtx.headers) {
        this.reqCtx.headers = {}
      }
      this.reqCtx.headers[key] = value;
    }
  }

  xhrProto.send = function(reqData) {
    const args = [...arguments];
    const self = this;
    function callback() {
      if (this.reqCtx && self.readyState === 4) {
        try {
          const endTimes = Date.now();
          const urlArr = (self.responseURL || self.reqCtx.url).split('?')
          const pathUrl = urlArr[0]
          const queryString = urlArr[1] || ''

          var reqBody = '';
          var reqHeaders = self.reqCtx.headers || {};
          const method = self.reqCtx.method.toLowerCase()
          if (method !== methods.GET && reqData) {
            reqBody = JSON.stringify(reqData);
          }
          const resHeaders = formatHeaders(ctx, self.getAllResponseHeaders());
          const response = String(self.response)

          let filename = true;
          let filterRes = {}
          if (typeof options.errorFilter === 'function') {
            filterRes = options.errorFilter.call(this, {
              url: pathUrl,
              status: res.status,
              response: response,
              body: reqBody,
              queryString: queryString,
              reqHeaders : reqHeaders,
              resHeaders: resHeaders,
            })
            filename = !!filterRes;
            ctx.logger.warn('api errorFilter执行结果：', filterRes);
          }
          if (response.length > 2048) {
            response = '[response content too large]'
          }
          const times = endTimes - self.reqCtx.start;
          if (filename && times < 121e3) {
            const result = blankList(pathUrl)
            if (result) {
              const status = filterRes.bizCode || self.status
              const data = {
                category: options.API,
                simpleRate: options.simpleRate,
                w_res: pathUrl,
                w_param: queryString,
                w_body: statusSuccess(status) || !options.withBody ? reqBody : '',
                w_rc: status,
                w_rt: times,
                w_resp: statusSuccess(status) || options.withResp ? filterRes.resp || response : '',
                msg: filterRes.msg || '',
                w_type: 16,
              }
              report(ctx, data, filterRes);
            }
          }
        } catch(err) {
          ctx.reportError(err, {
            bid: args.BID,
            cid: args.CID,
            category: options.JSERR,
            sampleRate : 1
          })
        }

      }
    }
    if ('onreadystatechange' in self && typeof self.onreadystatechange) {
      const oldHandler = self.onreadystatechange;
      self.onreadystatechange = function() {
        const rest = [...arguments];
        callback.apply(this, rest);
        oldHandler.apply(this, rest);
      }
    } else {
      self.onreadystatechange = callback;
    }
    return oldSend.apply(this, args)
  }
}


