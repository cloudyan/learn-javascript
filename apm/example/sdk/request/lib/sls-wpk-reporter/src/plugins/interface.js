! function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.slsinterfacePlugin = t() : e.slsinterfacePlugin = t()
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
    }, r.p = "", r(r.s = 5)
  }({
    0: function (e, t) {
      e.exports = {
        sdk: {
          BID: "wpkreporter",
          CID: "jssdk",
          WID_KEY: "__wpkreporterwid_"
        },
        env: {
          BROWSER: "browser",
          NODEJS: "nodejs",
          WEEX: "weex"
        },
        px: {
          signKey: "Uvn#08uefVdwe&c4"
        },
        http: {
          methods: {
            GET: "GET",
            PUT: "PUT",
            POST: "POST",
            HEAD: "HEAD",
            DELETE: "DELETE",
            OPTIONS: "OPTIONS",
            CONNECT: "OPTIONS",
            TRACE: "OPTIONS",
            PATCH: "OPTIONS"
          },
          protocols: {
            HTTP: "http:",
            HTTPS: "https:"
          }
        },
        category: {
          JSERR: 1,
          API: 2,
          JSFSPERF: 3,
          RESLOADFAIL: 4,
          FLOW: 5,
          BKPG: 6,
          HARLOG: 7,
          PERFNEXT: 1e3
        },
        navConn: {
          types: {
            BLUETOOTH: "bluetooth",
            CELLULAR: "cellular",
            ETHERNET: "ethernet",
            MIXED: "mixed",
            NONE: "none",
            OTHER: "other",
            UNKNOWN: "unknown",
            WIFI: "wifi",
            WIMAX: "wimax"
          },
          effectiveTypes: {
            "2G": "2g",
            "3G": "3g",
            "4G": "4g",
            SLOW2G: "slow-2g"
          }
        }
      }
    },
    5: function (e, t, r) {
      var n = r(0),
        o = n.sdk,
        a = n.http.methods,
        i = n.category,
        s = function (e) {
          return e >= 200 && e <= 299
        },
        c = function (e) {
          return -1 === e.indexOf("//arms-retcode") && -1 === e.indexOf("//retcode.taobao.com") && -1 === e.indexOf("//retcode-sg-lazada.arms.aliyuncs.com") && -1 === e.indexOf("//mdap.alipay.com/loggw") && -1 === e.indexOf("//wpk-gateway") && -1 === e.indexOf("//px.ucweb.com") && -1 === e.indexOf("//px.effirst.com") && -1 === e.indexOf("//px-intl.ucweb.com")
        },
        l = function (e, t) {
          if (e.hasOwnProperty(t)) return e[t]
        },
        p = function (e, t, r) {
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

      function u(e, t) {
        var r = null;
        try {
          var n, o, a, i = e.toolKit.trim(t || "").split(/[\r\n]+/);
          if (i.length > 0) r = {}, e.toolKit.forEach(i, (function (e) {
            n = e.split(": "), o = n.shift(), a = n.join(": "), r[o] = a
          }))
        } catch (e) {}
        return r
      }

      function f(e) {
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
            var f = r.send;
            r.send = function (r) {
              var n = this;

              function l() {
                if (n.__reqCtx__ && 4 === n.readyState) try {
                  var l = Date.now(),
                    f = (n.responseURL || n.__reqCtx__.url).split("?"),
                    d = f[0],
                    _ = f[1] || "",
                    h = "",
                    y = n.__reqCtx__.headers || {};
                  n.__reqCtx__.method.toUpperCase() !== a.GET && r && (h = JSON.stringify(r));
                  var w = u(e, n.getAllResponseHeaders()),
                    g = String(n.response),
                    b = !0,
                    O = {};
                  "function" == typeof t.errorFilter && (b = !!(O = t.errorFilter.call(this, {
                    url: d,
                    status: n.status,
                    response: g,
                    body: h,
                    queryString: _,
                    reqHeaders: y,
                    resHeaders: w
                  })), e.logger.warn("api errorFilter执行结果：", O)), g.length > 2048 && (g = "[response content too large]");
                  var m = l - n.__reqCtx__.start;
                  if (b && m < 121e3 && c(d)) {
                    var v = O.bizCode || n.status,
                      x = {
                        category: i.API,
                        sampleRate: t.sampleRate,
                        w_res: d,
                        w_param: _,
                        w_body: s(v) || !t.withBody ? "" : h,
                        w_method: n.__reqCtx__.method,
                        w_rc: v,
                        w_rt: m,
                        w_resp: s(v) || !t.withResp ? "" : O.resp || g,
                        msg: O.msg || "",
                        w_type: 16
                      };
                    p(e, x, O)
                  }
                } catch (t) {
                  e.reportError(t, {
                    bid: o.BID,
                    cid: o.CID,
                    category: i.JSERR,
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
              var _ = [].slice.call(arguments);
              return f.apply(this, _)
            }
          }(e, r), "fetch" in window && function (e, t) {
            var r = window.fetch;
            window.fetch = function () {
              var n = [].slice.call(arguments),
                l = a.GET;
              n[1] && n[1].method && (l = n[1].method.toUpperCase());
              var u = Date.now();
              return r.apply(this, n).then((function (r) {
                try {
                  var d = Date.now(),
                    _ = (r.url || n[0]).split("?"),
                    h = _[0],
                    y = _[1] || "",
                    w = "",
                    g = null;
                  n[1] && (g = n[1].headers), l !== a.GET && n[1] && n[1].body && (w = JSON.stringify(n[1].body));
                  var b = r.clone(),
                    O = f(b.headers);
                  b.text().then((function (n) {
                    n = n || "";
                    var o = !0,
                      a = {};
                    if ("function" == typeof t.errorFilter && (o = !!(a = t.errorFilter.call(this, {
                        url: h,
                        status: r.status,
                        response: n,
                        body: w,
                        queryString: y,
                        reqHeaders: g,
                        resHeaders: O
                      })), e.logger.warn("api errorFilter执行结果：", a)), n = n.length > 2048 ? "[response content too large]" : n, o && d - u < 121e3 && c(h)) {
                      var f = a.bizCode || r.status,
                        _ = {
                          category: i.API,
                          sampleRate: t.sampleRate,
                          w_res: h,
                          w_param: y,
                          w_body: s(f) || !t.withBody ? "" : w,
                          w_method: l,
                          w_rc: f,
                          w_rt: d - u,
                          w_resp: s(f) || !t.withResp ? "" : a.resp || n,
                          msg: a.msg || "",
                          w_type: 16
                        };
                      p(e, _, a)
                    }
                  }))
                } catch (t) {
                  e.reportError(t, {
                    bid: o.BID,
                    cid: o.CID,
                    category: i.JSERR,
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
    }
  })
}));
