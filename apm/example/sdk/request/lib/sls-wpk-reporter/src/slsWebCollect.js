! function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.slsReporter = t() : e.slsReporter = t()
}(this, (function () {
  return function (e) {
    var t = {};

    function r(n) {
      if (t[n]) return t[n].exports;
      var o = t[n] = {
        i: n,
        l: !1,
        exports: {}
      };
      return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports
    }
    return r.m = e, r.c = t, r.d = function (e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: n
      })
    }, r.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      })
    }, r.t = function (e, t) {
      if (1 & t && (e = r(e)), 8 & t) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (r.r(n), Object.defineProperty(n, "default", {
          enumerable: !0,
          value: e
        }), 2 & t && "string" != typeof e)
        for (var o in e) r.d(n, o, function (t) {
          return e[t]
        }.bind(null, o));
      return n
    }, r.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default
      } : function () {
        return e
      };
      return r.d(t, "a", t), t
    }, r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 2)
  }([
  function (e, t) {
    // import config from './config';
    e.exports = config;
  },
  function (e, t, r) {
    var n = r(0).env,
      o = function (e) {
        var t;
        return (e ? (t = e.replace(/^#\/?/, "")) && "string" == typeof t ? t.replace(/^(https?:)?\/\//, "").replace(/\?.*$/, "") : "" : "") || "[index]"
      },
      i = function (e, t) {
        if (t = t || {}, e.env === n.BROWSER && window)
          if (e.toolKit.extend({
              enable: !0
            }, t).enable) {
            e.logger.info("wpkflowPlugin已开启");
            var i, a, s = function () {
              e.reportFlow()
            };
            e.toolKit.onListen(window, "load", s, !0), e.spa && (r(6)(), i = function (t) {
              o(location.hash) && (e._begin = Date.now(), e._sid = e.toolKit.uuid(), e.reportFlow())
            }, a = function (t) {
              o(t.detail) && (e._begin = Date.now(), e._sid = e.toolKit.uuid(), e.reportFlow())
            }, e.toolKit.onListen(window, "hashchange", i), e.toolKit.onListen(window, "historystatechange", a)), e.toolKit.onListen(window, "beforeunload", (function () {
              e.toolKit.offListen(window, "load"), e.toolKit.offListen(window, "hashchange"), e.toolKit.offListen(window, "historystatechange"), s = i = a = null
            }))
          } else e.logger.info("wpkflowPlugin已关闭")
      };
    i.prototype.pluginId = "flow", e.exports = i
  },
  function (e, t, r) {
    e.exports = r(3)
  },
  function (e, t, r) {
    var n = r(4),
      o = r(10);
    e.exports = function (e) {
      var t = new n(e);
      return "function" == typeof this.upload && (t.upload = this.upload), t.initialize(o), t
    }
  },
  function (e, t, r) {
    var n = r(5),
      o = r(0),
      i = (o.px, o.category);

    function a(e) {
      if (!(this instanceof a)) return new a(e);
      e = e || {}, this._init = !1, this.toolKit = n(e), this.logger = this.toolKit.logger, this.debug = e.debug || !1, !0 === e.debug && this.logger.warn("[wpk] now in debug mode, you can see log details"), this._plugins = e.plugins || [], this.bid = e.bid, this.cid = e.cid, this.uid = e.uid, this.rel = e.rel, this.spa = e.spa || !1, this.delay = !1 !== e.delay, this.cluster = e.cluster || "cn", this.sampleRate = e.sampleRate, this.ignoreScriptError = !1 !== e.ignoreScriptError, this.onlyCustom = e.onlyCustomInUCCore || e.onlyCustom || !1, this.ignoreU4HA = !0 === e.ignoreU4HA, this.beforeSend = e.beforeSend || null, this.checkHidden = !1 !== e.checkHidden, this.supportBeaconBody = !1 !== e.supportBeaconBody, this.blockAlipayMiniAppWebview = e.blockAlipayMiniAppWebview || !1, this.maxSessDuration = e.maxSessDuration || 288e5, this._waitingQueue = []
    }
    a.prototype = {
      VERSION: "1.0.6",
      initialize: function (e) {
        this.env = e.env, e.root.location && -1 !== e.root.location.search.indexOf("wpkReporterDebug=true") && (this.debug = !0), this.send = e.send, this.getWid = e.getWid, this.isHttps = e.isHttps, e.bindUnloadEvent(this)
      },
      ready: function () {
        return this._init
      },
      setConfig: function (e) {
        return this.toolKit.isObject(e) && this.toolKit.extend(this, e), this
      },
      report: function (e) {
        "string" == typeof e && (e = {
          category: i.JSERR,
          msg: e
        });
        var t = e.sampleRate || this.sampleRate;
        if (t || 0 === t || (t = 1), this.toolKit.canReport(t)) {
          if (this._cleanData(e), this.ready()) {
            var r;
            if ("function" == typeof this.beforeSend) {
              try {
                r = this.beforeSend(e)
              } catch (e) {
                this.logger.error("exec beforeSend failed for:", e)
              }
              if (!1 === r) return void this.logger.warn("beforeSend func return false");
              "object" == typeof r && (e = r)
            }
            var n = this.toolKit.getMetas(),
              o = e.bid || this.bid || n.wpkBid,
              a = e.cid || this.cid || n.wpkCid,
              s = e.rel || this.rel || n.wpkRel;
            this.toolKit.isFunction(s) && (s = s());
            var c = e.uid || this.uid;
            this.toolKit.isFunction(c) && (c = c()), c || (c = this.getWid()), Date.now() - this._begin >= this.maxSessDuration && (this._begin = Date.now(), this._sid = this.toolKit.uuid()), this.toolKit.extend(e, {
              w_bid: o,
              w_cid: a,
              w_rel: s,
              w_spa: this.spa,
              w_tm: this.toolKit.timestamp(),
              w_cnt: 1,
              uid: c,
              type: this.toolKit.categoryToType(e.category),
              sdk_ver: this.VERSION,
              log_src: "jssdk",
              uc_param: this.uc_param || "",
              wid: this.wid
            });
            var l = {
                app: o,
                cp: "none",
                de: 4,
                seq: this.toolKit.generateSeq(),
                tm: this.toolKit.timestamp(!0),
                ud: encodeURIComponent(e.uid),
                ver: e.w_rel,
                type: e.type,
                sver: e.sdk_ver,
                sign: "9bf8a190ef82c5049df7b199c599c45b"
              },
              u = this.toolKit.objToQueryString(l);
            this.toolKit.cutStr(e, ["c1", "c2", "c3", "c4", "c5"], 128), this.send("", u, e)
          } else this._waitingQueue.push(e), this.logger.warn("sdk未完成初始化，数据已缓存");
          return this
        }
        this.logger.warn("由于采样率控制，本条日志最终未上报，采样率: ", t)
      },
      _cleanData: function (e) {
        for (var t, r = 1; r <= 10; r++) t = "bl" + r, e.hasOwnProperty(t) && (e["w_" + t] = e[t], e[t] = void 0);
        t = null
      },
      reportFlow: function (e) {
        return e = e || {}, this.report(this.toolKit.extend(e || {}, {
          category: i.FLOW,
          sampleRate: 1
        })), this
      },
      reportError: function (e, t) {
        return this.toolKit.isError(e) ? ((t = t || {}).category = i.JSERR, t.w_msg = e.toString(), t.stack = this.toolKit.parseErrorStack(e), t.w_file = e.filename || "", t.w_line = e.lineno || "", t.w_col = e.colno || "", this.report(t), this) : this.report(e, t)
      },
      reportApi: function (e, t) {
        this.reportApiError(e, t)
      },
      reportApiError: function (e, t) {
        return e && (this.toolKit.isObject(e.queryString) && (e.queryString = this.toolKit.objToQueryString(e.queryString)), this.report(this.toolKit.extend(t || {}, {
          msg: e.msg || "",
          w_res: e.url,
          w_method: e.method,
          w_param: e.queryString,
          w_body: JSON.stringify(e.body),
          w_resp: e.response,
          w_rc: e.status,
          w_rt: e.spent || 0,
          c1: e.c1,
          c2: e.c2,
          c3: e.c3,
          c4: e.c4,
          c5: e.c5
        }, {
          category: i.API,
          w_type: 16
        }))), this
      },
      reportBlankPage: function (e) {
        return (e = e || {}).hasOwnProperty("w_fp") || this.toolKit.extend(e, {
          w_fp: 999
        }), this.report(this.toolKit.extend(e || {}, {
          category: i.BKPG
        })), this
      },
      diagnose: function () {
        this.ready() ? this.bid ? (this.sampleRate || this.logger.warn("没有设置采样率参数sampleRate，将使用默认采样率"), this.report({
          _diagnose: !0
        })) : this.logger.warn("缺少bid参数,请确认是否已正确设置") : this.logger.warn("wpkReporter尚未初始化，请确保已调用 install 方法")
      },
      addPlugin: function (e, t) {
        return this._plugins.push([e, t]), "function" == typeof e && this._init && e.apply(this, [this, t]), this
      },
      install: function () {
        for (var e = r(1), t = this._plugins.length, n = !1, o = 0; o < t; o++) {
          var i = this._plugins[o],
            a = i[0],
            s = i[1];
          a.prototype.pluginId === e.prototype.pluginId && (n = !0), a.apply(this, [this, s])
        }
        return this.wid = this.getWid(), this._begin = Date.now(), this._sid = this.toolKit.uuid(), this._init = !0, 0 !== t && n || (this.toolKit.logger.info("没有设置Flow，内置开启"), this.addPlugin(e)), this
      },
      installAll: function () {
        var e = [
            [r(7), {
              resErr: !0
            }],
            [r(8)],
            [r(9)],
            [r(1)]
          ],
          t = this._plugins.length;
        if (0 === t) this._plugins = e;
        else {
          for (var n = [], o = e.length, i = 0; i < o; i++) {
            for (var a = e[i], s = 0; s < t; s++)
              if (a[0].prototype.pluginId === this._plugins[s][0].prototype.pluginId) {
                a = this._plugins[s];
                break
              } n.push(a)
          }
          this._plugins = n
        }
        return this.install()
      },
      uninstall: function () {
        return this._plugins = [], this._init = !1, this
      }
    }, e.exports = a
  },
  function (e, t) {
    var r = function (e) {
        return e || ""
      },
      n = function () {
        var e = Date.now();
        return "undefined" != typeof window && window.performance && "function" == typeof window.performance.now && (e += performance.now()), "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function (t) {
          var r = (e + 16 * Math.random()) % 16 | 0;
          return e = Math.floor(e / 16), ("x" === t ? r : 11 & r).toString(16)
        }))
      },
      o = function (e) {
        return "object" == typeof e
      },
      i = function (e) {
        var t = {}.toString.call(e);
        return o(e) && ("[object Error]" === t || "[object Exception]" === t || t instanceof Error)
      },
      a = function (e) {
        return "[object Array]" === {}.toString.call(e)
      },
      s = function (e) {
        return "function" == typeof e
      },
      c = function (e) {
        return "string" == typeof e
      },
      l = function (e) {
        var t = +new Date;
        return !0 === e && (t = Math.floor(t / 1e3)), t
      },
      u = function (e) {
        if (e.stack) {
          var t = e.stack.split("\n");
          return t.shift(), t.join("\n")
        }
        return ""
      },
      f = function (e) {
        var t;
        switch (e) {
          case 1:
            t = "jserr";
            break;
          case 2:
            t = "api";
            break;
          case 3:
            t = "jsfsperf";
            break;
          case 4:
            t = "resloadfail";
            break;
          case 5:
            t = "flow";
            break;
          case 6:
            t = "bkpg";
            break;
          case 7:
            t = "harlog";
            break;
          default:
            t = "jssdkidx"
        }
        return t
      },
      p = function () {
        return l() + Math.floor(10 * Math.random())
      },
      d = function (e) {
        var t = [];
        for (var r in e) t.push(r + "=" + e[r]);
        return t.join("&")
      },
      h = function (e) {
        return JSON ? JSON.stringify(e) : e.toString()
      },
      g = function () {
        if ("undefined" != typeof document && document.getElementsByTagName)
          for (var e, t, r, n, o = document.getElementsByTagName("meta"), i = o.length, a = 0; a < i; a++) "wpk-bid" === (n = o[a]).name ? e = n.content : "wpk-cid" === n.name ? t = n.content : "wpk-rel" === n.name && (r = n.content);
        return {
          wpkBid: e || null,
          wpkCid: t || null,
          wpkRel: r || null
        }
      },
      w = function (e, t, r, n) {
        return e.addEventListener ? e.addEventListener(t, (function o(i) {
          n && e.removeEventListener(t, o, !1), r.call(this, i)
        }), !1) : e.attachEvent && e.attachEvent("on" + t, (function o(i) {
          n && e.detachEvent("on" + t, o), r.call(this, i)
        })), this
      },
      v = function (e, t, r) {
        return r ? (e.removeEventListener ? e.removeEventListener(t, r) : e.detachEvent && e.detachEvent(t, r), this) : this
      },
      y = function (e) {
        return !!e && (0 !== e && (e >= 1 || "100%" === e || (/^\d+(\.\d+)?%$/.test(e) ? Math.random() < parseFloat(e) / 100 : e > 0 && e < 1 && Math.random() < e)))
      },
      _ = "wpk-reporter",
      m = function (e, t) {
        var r = [].slice.call(t);
        e.apply(this, [_].concat(r))
      },
      b = function (e) {
        var t = "";
        switch (e.category) {
          case 1:
            t = [e.category, e.uid, e.w_url, e.w_ref, e.w_msg || "", e.w_line || "", e.w_col || ""].join("");
            break;
          case 2:
            t = [e.category, e.uid, e.w_res, e.w_method, e.w_rc].join("");
            break;
          case 4:
            t = [e.category, e.uid, e.w_url, e.w_ref, e.w_res, e.w_type].join("")
        }
        return t
      },
      E = function (e, t) {
        e = e || !1;
        try {
          if ("undefined" != typeof window && window.ucweb && window.ucweb.window || t) {
            for (var r = (t || navigator.userAgent).split(" "), n = r.length, o = !1, i = !1, a = 0; a < n; a++)
              if (-1 !== r[a].indexOf("UWS/")) {
                var s = r[a].split("/");
                i = x(s[1], "2.13.2.37")
              } else -1 !== r[a].indexOf("AliApp(DingTalk/") && (o = !0);
            return o ? i : e
          }
        } catch (e) {}
        return !1
      },
      x = function (e, t) {
        try {
          for (var r, n, o = e.split("."), i = t.split("."), a = o.length, s = 0; s < a; s++)
            if ((r = parseInt(o[s])) !== (n = parseInt(i[s]))) return r > n;
          return !0
        } catch (e) {}
        return !1
      },
      S = {
        get: function (e) {
          if ("undefined" != typeof localStorage) {
            var t = localStorage.getItem(e);
            if (t) {
              if (t = JSON.parse(t), Date.now() < t.expireAt) return t;
              this.rm(e)
            }
          }
          return null
        },
        set: function (e, t) {
          "undefined" != typeof localStorage && e && t && (t.expireAt = Date.now() + 18e5, localStorage.setItem(e, JSON.stringify(t)))
        },
        rm: function (e) {
          "undefined" != typeof localStorage && localStorage.removeItem(e)
        }
      },
      R = function (e, t) {
        if (t) {
          if (1 === t.length) return e === t[0];
          if (2 === t.length) {
            var r = t[0],
              n = t[1];
            return r && !n ? o(e, r) : r && n ? o(e, r) && o(n, e) : o(n, e)
          }
          return !1
        }
        return !0;

        function o(e, t) {
          var r = e.split("."),
            n = t.split(".");
          return !(parseInt(r[0]) < parseInt(n[0])) && (parseInt(r[0]) > parseInt(n[0]) || !(parseInt(r[1]) < parseInt(n[1])) && (parseInt(r[1]) > parseInt(n[1]) || parseInt(r[2]) >= parseInt(n[2])))
        }
      },
      k = function (e, t, r, o, i) {
        var a = "wpkreporter:dynamicConf:" + e,
          c = S.get(a);
        if (c) s(i) && i(c);
        else {
          var u = {
              app: e,
              tm: l(!0),
              ud: n(),
              sver: t,
              sign: "c41e43c828c16c16a6eb1c9c1e68e8ce"
            },
            f = d(u);
          ! function (e, t) {
            if ("undefined" == typeof XMLHttpRequest) t();
            else {
              var r = new XMLHttpRequest;
              r.onreadystatechange = function () {
                if (4 === r.readyState) {
                  var e;
                  if (200 === r.status && r.response) try {
                    var n = JSON.parse(r.response);
                    0 === n.code && (e = n.config || [])
                  } catch (e) {}
                  t(e)
                }
              };
              try {
                r.open("GET", e, !0), r.timeout = 3e3, r.send()
              } catch (e) {}
            }
          }(r + "?wpk-header=" + encodeURIComponent(f), (function (e) {
            if (c = {}, void 0 !== e) {
              for (var r = e.length, n = 0; n < r; n++) {
                var o = e[n],
                  l = o.sdkver;
                if (R(t, l)) {
                  if (o.common && void 0 !== o.common.sampleRate && (c.all = o.common.sampleRate), o.config)
                    for (var u, f = o.config.length, p = 0; p < f; p++)
                      if ((u = o.config[p]).type) {
                        if (u.category_rate)
                          for (var d in u.category_rate) c[u.type + "@" + d] = u.category_rate[d];
                        u.sampleRate && (c[u.type] = u.sampleRate)
                      } break
                }
              }
              S.set(a, c)
            }
            s(i) && i(c)
          }))
        }
      },
      O = function (e, t, r) {
        for (var n, o = t.length, i = 0; i < o; i++) "string" == typeof (n = e[t[i]]) ? e[t[i]] = n.substring(0, r) : "object" == typeof n && (e[t[i]] = String(n))
      },
      T = function () {
        var e = !1;
        try {
          if ("undefined" != typeof navigator) {
            var t = -1 !== navigator.userAgent.indexOf("Alipay"),
              r = -1 !== navigator.userAgent.indexOf("MiniProgram"),
              n = -1 !== navigator.userAgent.indexOf("APXWebView");
            e = t && (r || n)
          }
        } catch (e) {}
        return e
      };
    e.exports = function (e) {
      return {
        noop: r,
        uuid: n,
        isError: i,
        isArray: a,
        isObject: o,
        isFunction: s,
        isString: c,
        logger: "undefined" != typeof console && o(console) && e.debug ? {
          trace: function () {
            m(console.trace, arguments)
          },
          debug: function () {
            m(console.debug, arguments)
          },
          log: function () {
            m(console.log, arguments)
          },
          info: function () {
            m(console.info, arguments)
          },
          warn: function () {
            m(console.warn, arguments)
          },
          error: function () {
            m(console.error, arguments)
          }
        } : {
          trace: r,
          debug: r,
          log: r,
          info: r,
          warn: r,
          error: r
        },
        extend: function (e) {
          for (var t = 1, r = arguments.length; t < r; t++) {
            var n = arguments[t];
            for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
          }
          return e
        },
        some: function (e, t) {
          if (!this.isArray(e) || !this.isFunction(t)) return !1;
          for (var r, n = e.length, o = 0; o < n; o++)
            if (r = e[o], t.call(this, r)) return !0;
          return !1
        },
        filter: function (e, t) {
          var r = [];
          try {
            for (var n = 0, o = e.length; n < o; n++) t.call(this, e[n], n, e) && r.push(e[n]);
            return r
          } catch (e) {}
          return e
        },
        forEach: function (e, t) {
          if (this.isArray(e) && this.isFunction(t))
            for (var r, n = e.length, o = 0; o < n; o++) r = e[o], t.call(this, r, o, e)
        },
        trim: function (e) {
          if (this.isString(e)) return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
        },
        canReport: y,
        onListen: w,
        offListen: v,
        getMetas: g,
        timestamp: l,
        generateSeq: p,
        categoryToType: f,
        parseErrorStack: u,
        objToJsonString: h,
        objToQueryString: d,
        genContentHash: b,
        isU4HA: E,
        cutStr: O,
        dynamicConf: k,
        inAlipayMiniAppWebview: T
      }
    }
  },
  function (e, t) {
    var r = window.history || {},
      n = window.document,
      o = function (e, t) {
        var r;
        window.CustomEvent ? r = new CustomEvent(e, {
          detail: t
        }) : ((r = n.createEvent("HTMLEvents")).initEvent(e, !1, !0), r.detail = t), window.dispatchEvent(r)
      },
      i = function (e) {
        return e && "string" == typeof e ? e.replace(/^(https?:)?\/\//, "").replace(/\?.*$/, "") : ""
      },
      a = function (e) {
        var t = r[e];
        "function" == typeof t && (r[e] = function (e, n, a) {
          var s = location.href,
            c = t.call(r, e, n, a);
          if (!a || "string" != typeof a) return c;
          if (a === s) return c;
          try {
            var l = s.split("#"),
              u = a.split("#"),
              f = i(l[0]),
              p = i(u[0]),
              d = l[1] && l[1].replace(/^\/?(.*)/, "$1"),
              h = u[1] && u[1].replace(/^\/?(.*)/, "$1");
            f !== p ? o("historystatechange", p) : d !== h && o("historystatechange", h)
          } catch (e) {}
          return c
        }, r[e].toString = e + "() { [native code] }")
      };
    e.exports = function () {
      a("pushState"), a("replateState")
    }
  },
  function (e, t, r) {
    var n, o, i = r(0),
      a = i.env,
      s = i.category,
      c = function (e) {
        return "function" == typeof e
      },
      l = function (e) {
        var t = -1;
        switch (e.tagName.toLowerCase()) {
          case "img":
            t = 1;
            break;
          case "link":
            e.rel && "stylesheet" === e.rel.toLowerCase() && (t = 2);
            break;
          case "script":
            t = 3;
            break;
          case "video":
            t = 11
        }
        return t
      },
      u = {},
      f = function (e, t, r, n) {
        e.addEventListener ? e.addEventListener(t, r, n || !1) : (u["on" + t] = function () {
          return r.call(e, window.event)
        }, e.attachEvent("on" + t, u["on" + t]))
      },
      p = function (e, t) {
        var r = e.id ? "#" + e.id : "",
          n = "";
        e.className && "string" == typeof e.className && (n = "." + e.className.split(" ").join("."));
        var o = e.tagName.toLowerCase();
        return e.parentNode && e.parentNode.tagName && t - 1 != 0 ? p(e.parentNode, t - 1) + " > " + o.toLowerCase() + r + n : o + r + n
      },
      d = function (e, t, r, i, a, l) {
        if (n) try {
          n.call(this, t, r, i, a, l)
        } catch (l) {}
        if ("script error" === (t || "").toLowerCase() && (t = "Script error"), o.ignoreScriptError && "Script error" === t) e.logger.warn("配置了ignoreScriptError，本次异常将不上报");
        else if (!c(o.jsErrFilter) || o.jsErrFilter.call(this, event)) {
          if (null != l) {
            var u = (l.stack || "").split("\n");
            u.shift();
            var f = {
              w_msg: t,
              w_file: r || "",
              w_line: i || "",
              w_col: a || "",
              stack: u.join("\n"),
              category: s.JSERR,
              sampleRate: o.jsErrSampleRate
            };
            e.report(f)
          }
        } else e.logger.warn("jserrFilter 返回false，本次日志将不上报, event: ", event)
      },
      h = function (e, t) {
        var r = window;
        r && e.env === a.BROWSER ? (e.logger.info("wpkglobalerrorPlugin已开启"), !1 !== (o = e.toolKit.extend({
          jsErrSampleRate: 1,
          resErrSampleRate: 1
        }, t)).jsErr ? (n = r.onerror, r.onerror = function (t, r, n, o, i) {
          d(e, t, r, n, o, i)
        }, f(r, "unhandledrejection", (function (t) {
          var r = t.type;
          "string" == typeof t.reason ? r = t.reason : t.reason && "object" == typeof t.reason && t.reason.message && (r = t.reason.message), d(e, r, null, null, null, t.reason || t.type)
        }))) : e.logger.warn("js异常监控已关闭"), o.resErr ? f(r, "error", (function (t) {
          ! function (e, t) {
            if (!t.target.tagName || t.message || t.filename || t.lineno || t.colno) e.logger.warn("非资源获取问题，跳出处理, event: ", t);
            else if (!c(o.resErrFilter) || o.resErrFilter.call(this, t)) {
              var r = t.target.src || t.target.href;
              e.report({
                category: s.RESLOADFAIL,
                sampleRate: o.resErrSampleRate,
                msg: r + " 加载失败",
                w_res: r,
                w_type: l(t.target),
                w_xpath: p(t.target, 5)
              })
            } else e.logger.warn("reserrFilter 返回false，本次日志将不上报, event: ", t)
          }(e, t)
        }), !0) : e.logger.warn("资源加载异常监控已关闭")) : e.logger.warn("全局错误监控插件不支持非浏览器环境")
      };
    h.prototype.pluginId = "gerror", e.exports = h
  },
  function (e, t, r) {
    var n = r(0),
      o = n.sdk,
      i = n.http.methods,
      a = n.category,
      s = function (e) {
        return e >= 200 && e <= 299
      },
      c = function (e) {
        return -1 === e.indexOf("//arms-retcode") && -1 === e.indexOf("//retcode.taobao.com") && -1 === e.indexOf("//retcode-sg-lazada.arms.aliyuncs.com") && -1 === e.indexOf("//mdap.alipay.com/loggw") && -1 === e.indexOf("//wpk-gateway") && -1 === e.indexOf("//px.ucweb.com") && -1 === e.indexOf("//px.effirst.com") && -1 === e.indexOf("//px-intl.ucweb.com")
      },
      l = function (e, t) {
        if (e.hasOwnProperty(t)) return e[t]
      },
      u = function (e, t, r) {
        e.toolKit.isObject(r) && e.toolKit.extend(t, {
          c1: l(r, "c1"),
          c2: l(r, "c2"),
          c3: l(r, "c3"),
          c4: l(r, "c4"),
          c5: l(r, "c5"),
          bl1: l(r, "bl1"),
          bl2: l(r, "bl2"),
          bl3: l(r, "bl3"),
          bl4: l(r, "bl4"),
          bl5: l(r, "bl5")
        }), e.report(t)
      };

    function f(e, t) {
      var r = null;
      try {
        var n, o, i, a = e.toolKit.trim(t || "").split(/[\r\n]+/);
        if (a.length > 0) r = {}, e.toolKit.forEach(a, (function (e) {
          n = e.split(": "), o = n.shift(), i = n.join(": "), r[o] = i
        }))
      } catch (e) {}
      return r
    }

    function p(e) {
      try {
        if (!e) return {};
        var t = {};
        for (var r of e) t[r[0]] = r[1];
        return t
      } catch (e) {
        return {}
      }
    }
    var d = function (e, t) {
      if (e.env === n.env.BROWSER && window) {
        var r = e.toolKit.extend({
          enable: !0,
          sampleRate: 1
        }, t);
        r.enable ? (e.logger.info("wpkinterfacePlugin已开启"), "XMLHttpRequest" in window && function (e, t) {
          var r = window.XMLHttpRequest.prototype,
            n = r.open;
          r.open = function (e, t) {
            this.__reqCtx__ = {
              method: e,
              url: t || "",
              start: Date.now()
            };
            var r = [].slice.call(arguments);
            n.apply(this, r)
          };
          var l = r.setRequestHeader;
          r.setRequestHeader = function (e, t) {
            var r = [].slice.call(arguments);
            l.apply(this, r), this.__reqCtx__ && (this.__reqCtx__.headers || (this.__reqCtx__.headers = {}), this.__reqCtx__.headers[e] = t)
          };
          var p = r.send;
          r.send = function (r) {
            var n = this;

            function l() {
              if (n.__reqCtx__ && 4 === n.readyState) try {
                var l = Date.now(),
                  p = (n.responseURL || n.__reqCtx__.url).split("?"),
                  d = p[0],
                  h = p[1] || "",
                  g = "",
                  w = n.__reqCtx__.headers || {};
                n.__reqCtx__.method.toUpperCase() !== i.GET && r && (g = JSON.stringify(r));
                var v = f(e, n.getAllResponseHeaders()),
                  y = String(n.response),
                  _ = !0,
                  m = {};
                "function" == typeof t.errorFilter && (_ = !!(m = t.errorFilter.call(this, {
                  url: d,
                  status: n.status,
                  response: y,
                  body: g,
                  queryString: h,
                  reqHeaders: w,
                  resHeaders: v
                })), e.logger.warn("api errorFilter执行结果：", m)), y.length > 2048 && (y = "[response content too large]");
                var b = l - n.__reqCtx__.start;
                if (_ && b < 121e3 && c(d)) {
                  var E = m.bizCode || n.status,
                    x = {
                      category: a.API,
                      sampleRate: t.sampleRate,
                      w_res: d,
                      w_param: h,
                      w_body: s(E) || !t.withBody ? "" : g,
                      w_method: n.__reqCtx__.method,
                      w_rc: E,
                      w_rt: b,
                      w_resp: s(E) || !t.withResp ? "" : m.resp || y,
                      msg: m.msg || "",
                      w_type: 16
                    };
                  u(e, x, m)
                }
              } catch (t) {
                e.reportError(t, {
                  bid: o.BID,
                  cid: o.CID,
                  category: a.JSERR,
                  sampleRate: 1
                })
              }
            }
            if ("onreadystatechange" in n && "function" == typeof n.onreadystatechange) {
              var d = n.onreadystatechange;
              n.onreadystatechange = function () {
                var e = [].slice.call(arguments);
                l.apply(this, e), d.apply(this, e)
              }
            } else n.onreadystatechange = l;
            var h = [].slice.call(arguments);
            return p.apply(this, h)
          }
        }(e, r), "fetch" in window && function (e, t) {
          var r = window.fetch;
          window.fetch = function () {
            var n = [].slice.call(arguments),
              l = i.GET;
            n[1] && n[1].method && (l = n[1].method.toUpperCase());
            var f = Date.now();
            return r.apply(this, n).then((function (r) {
              try {
                var d = Date.now(),
                  h = (r.url || n[0]).split("?"),
                  g = h[0],
                  w = h[1] || "",
                  v = "",
                  y = null;
                n[1] && (y = n[1].headers), l !== i.GET && n[1] && n[1].body && (v = JSON.stringify(n[1].body));
                var _ = r.clone(),
                  m = p(_.headers);
                _.text().then((function (n) {
                  n = n || "";
                  var o = !0,
                    i = {};
                  if ("function" == typeof t.errorFilter && (o = !!(i = t.errorFilter.call(this, {
                      url: g,
                      status: r.status,
                      response: n,
                      body: v,
                      queryString: w,
                      reqHeaders: y,
                      resHeaders: m
                    })), e.logger.warn("api errorFilter执行结果：", i)), n = n.length > 2048 ? "[response content too large]" : n, o && d - f < 121e3 && c(g)) {
                    var p = i.bizCode || r.status,
                      h = {
                        category: a.API,
                        sampleRate: t.sampleRate,
                        w_res: g,
                        w_param: w,
                        w_body: s(p) || !t.withBody ? "" : v,
                        w_method: l,
                        w_rc: p,
                        w_rt: d - f,
                        w_resp: s(p) || !t.withResp ? "" : i.resp || n,
                        msg: i.msg || "",
                        w_type: 16
                      };
                    u(e, h, i)
                  }
                }))
              } catch (t) {
                e.reportError(t, {
                  bid: o.BID,
                  cid: o.CID,
                  category: a.JSERR,
                  sampleRate: 1
                })
              }
              return r
            })).catch((function (e) {
              throw e
            }))
          }
        }(e, r)) : e.logger.info("wpkinterfacePlugin已关闭")
      }
    };
    d.prototype.pluginId = "api", e.exports = d
  },
  function (e, t, r) {
    var n, o = r(0).env,
      i = r(0).category,
      a = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "secureConnectionStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd", "msFirstPaint"],
      s = ["navigate", "reload", "back_forward"],
      c = function (e) {
        var t, r, o = e[a[5]];
        if (1 === e._ver) {
          var i;
          if (window.chrome && window.chrome.loadTimes) i = 1e3 * window.chrome.loadTimes().firstPaintTime;
          else i = e.msFirstPaint ? e.msFirstPaint : e[a[13]];
          if (!i) return -1;
          t = i >= o ? parseFloat((i - o).toFixed(2)) : -1
        } else 2 === e._ver && (t = e[a[13]] - o, t = parseFloat(t.toFixed(2)));
        if (n && n.getEntriesByType) try {
          for (var s = n.getEntriesByType("paint"), c = 0; c < s.length; c++) {
            var l = s[c];
            "first-paint" === l.name ? t = l.startTime.toFixed(2) : "first-contentful-paint" === l.name && (r = l.startTime.toFixed(2))
          }
        } catch (e) {
          console.error(e)
        }
        return {
          fpt: t,
          fcp: r
        }
      },
      l = function (e, t) {
        var r, n, o, i = {};
        for (var s in t) o = 0, r = e[a[t[s][0]]], n = e[a[t[s][1]]], r > 0 && n > 0 && (o = parseFloat((n - r).toFixed(2))), i[s] = o;
        return i
      },
      u = function (e, t) {
        var r = window;
        if (n = r.performance || r.webkitPerformance || r.msPerformance || r.mozPerformance, e.env === o.BROWSER && n && n.timing) {
          t = t || {};
          var a = e.toolKit.extend({
            enable: !0,
            sampleRate: 1
          }, t);
          if (a.enable) {
            e.logger.info("wpkperformancePlugin已开启");
            var u = n.timing || {},
              f = 1;
            if ("function" == typeof r.PerformanceNavigationTiming) try {
              var p = n.getEntriesByType("navigation")[0];
              p && (u = p, f = 2)
            } catch (e) {}
            u._ver = f,
              function (e, t, r, n) {
                e.addEventListener ? e.addEventListener(t, r, n || !1) : e.attachEvent("on" + t, r)
              }(window, "load", (function () {
                /loaded|complete/.test(document.readyState) && setTimeout((function () {
                  var t = e.toolKit.extend(function (e) {
                    return l(e, {
                      w_unload: [1, 2],
                      w_redirect: [3, 4],
                      w_appcache: [5, 6],
                      w_dns: [6, 7],
                      w_tcp: [8, 10],
                      w_ssl: [9, 10],
                      w_ttfb: [11, 12],
                      w_contentdownload: [12, 13],
                      w_domparsing: [13, 15],
                      w_res: [17, 19]
                    })
                  }(u), function (e) {
                    var t = l(e, {
                        w_firstbyte: [5, 12],
                        w_tti: [5, 15],
                        w_domready: [5, 17],
                        w_load: [5, 19],
                        w_total: [5, 20]
                      }),
                      r = c(e);
                    return t.wl_fpt = r.fpt, t.wl_fcp = r.fcp, t
                  }(u));
                  for (var r in t)
                    if (t[r] < 0 || t[r] > 6e4) return void e.logger.warn("性能数据异常：", r, t[r]);
                  var o = e.toolKit.extend(t, function (e) {
                    var t, r = n.navigation || {},
                      o = -1,
                      i = -1,
                      a = -1;
                    return 1 === e._ver ? t = s[r.type] || "other" : 2 === e._ver && (o = e.encodedBodySize, i = e.decodedBodySize, a = e.transferSize, t = e.type), {
                      w_enbdsize: o,
                      w_debdsize: i,
                      w_transize: a,
                      w_navtype: t
                    }
                  }(u), a, {
                    category: i.JSFSPERF
                  });
                  e.report(o)
                }))
              }))
          } else e.logger.info("wpkperformancePlugin已关闭")
        } else e.logger.warn("基础性能插件仅支持浏览器环境")
      };
    u.prototype.pluginId = "perf", e.exports = u
  },
  function (e, t, r) {
    var n = r(0),
      o = "undefined" != typeof window ? window : "undefined" != typeof self ? self : {},
      i = o.document,
      a = o.navigator,
      s = o.location,
      c = void 0 !== o.devicePixelRatio ? o.devicePixelRatio : 1,
      l = {},
      u = function (e, t, r, n, o) {
        if (void 0 === t) {
          var a, s;
          if (!l[e]) {
            a = new RegExp(e + "=([^;]+)");
            try {
              s = a.exec(i.cookie)
            } catch (e) {
              return null
            }
            s && (l[e] = s[1])
          }
          return l[e]
        }
        var c = e + "=" + t;
        n && (c += "; domain=" + n), o && (c += "; path=" + o), r && (c += "; max-age=" + r);
        try {
          return i.cookie = c, !!i.cookie
        } catch (e) {
          return !1
        }
      },
      f = null,
      p = function (e) {
        clearTimeout(f), f = null,
          function (e) {
            var t = e._waitingQueue;
            if (e.checkHidden && i && i.hidden) return e.logger.warn("当前页面不可见，日志数据将丢弃: ", t), void(e._waitingQueue = []);
            "function" != typeof e.upload && e.logger.warn("未设置uploader，日志数据将丢弃: ", t);
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              try {
                var o = n._header;
                n._header = void 0, e.upload.call(e, o, n)
              } catch (e) {}
            }
          }(e)
      },
      d = function (e) {
        p(e)
      };
    e.exports = {
      env: n.env.BROWSER,
      root: o,
      isHttps: s.protocol === n.http.protocols.HTTPS,
      send: function (e, t, r) {
        var l = this,
          u = l.toolKit.extend(function (e) {
            if (!i) return {};
            var t, r = i.referrer;
            return r && -1 !== r.indexOf('"') && (r = encodeURIComponent(i.referrer)), {
              w_url: s.origin + s.pathname,
              w_query: s.search,
              w_ref: s.hash.substring(1),
              w_title: i.title,
              ua: a.userAgent,
              referrer: r,
              dsp_dpi: c || 1,
              dsp_w: o.screen.width,
              dsp_h: o.screen.height,
              net: (t = a.connection, t && t.effectiveType ? t.effectiveType === n.navConn.effectiveTypes.SLOW2G ? "2g" : t.effectiveType : "")
            }
          }(l.spa), r, {
            w_frmid: l._sid
          });
        u._header = encodeURIComponent(t), u._hash = l.toolKit.genContentHash(u);
        var d, h, g = l.delay && -1 !== [1, 2, 4].indexOf(u.category);
        (function (e, t) {
          var r = e._waitingQueue,
            n = r.length,
            o = t.reduplication || e.reduplication || !0,
            i = !0;
          if (1 === t.category && o && 0 !== n) {
            for (var a, s = 0; s < n; s++)
              if ((a = r[s])._hash === t._hash) {
                a.w_cnt++, i = !1;
                break
              } i && r.push(t)
          } else r.push(t);
          return i
        })(l, u) || !g ? (d = function () {
          p(l)
        }, f = -1 === (h = g ? 3e3 : -1) ? (d(), null) : setTimeout(d, h || 0)) : l.logger.warn("logData被合并: ", u)
      },
      getWid: function () {
        var e = u(n.sdk.WID_KEY);
        return e || (e = this.toolKit.uuid(), u(n.sdk.WID_KEY, e, 15552e3)), e
      },
      bindUnloadEvent: function (e) {
        window && (window.addEventListener ? window.addEventListener("beforeunload", (function (t) {
          d(e)
        }), !1) : window.attachEvent && window.attachEvent("onbeforeunload", (function (t) {
          d(e)
        })))
      }
    }
  }
  ])
}));
