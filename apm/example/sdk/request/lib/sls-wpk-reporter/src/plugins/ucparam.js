! function (e, r) {
  "object" == typeof exports && "object" == typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define([], r) : "object" == typeof exports ? exports.slsucparamPlugin = r() : e.slsucparamPlugin = r()
}(this, (function () {
  return function (e) {
    var r = {};

    function t(n) {
      if (r[n]) return r[n].exports;
      var o = r[n] = {
        i: n,
        l: !1,
        exports: {}
      };
      return e[n].call(o.exports, o, o.exports, t), o.l = !0, o.exports
    }
    return t.m = e, t.c = r, t.d = function (e, r, n) {
      t.o(e, r) || Object.defineProperty(e, r, {
        enumerable: !0,
        get: n
      })
    }, t.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      })
    }, t.t = function (e, r) {
      if (1 & r && (e = t(e)), 8 & r) return e;
      if (4 & r && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (t.r(n), Object.defineProperty(n, "default", {
          enumerable: !0,
          value: e
        }), 2 & r && "string" != typeof e)
        for (var o in e) t.d(n, o, function (r) {
          return e[r]
        }.bind(null, o));
      return n
    }, t.n = function (e) {
      var r = e && e.__esModule ? function () {
        return e.default
      } : function () {
        return e
      };
      return t.d(r, "a", r), r
    }, t.o = function (e, r) {
      return Object.prototype.hasOwnProperty.call(e, r)
    }, t.p = "", t(t.s = 10)
  }({
    0: function (e, r) {
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
    10: function (e, r, t) {
      var n = t(0).env,
        o = function (e, r) {
          if (r = r || {}, -1 !== [n.BROWSER, n.WEEX].indexOf(e.env) && r.params && "string" == typeof r.params) {
            e.logger.info("wpkucparamPlugin已开启");
            for (var t = r.params, o = ["pr", "ve", "os", "fr", "nw", "ut"], u = 0; u < 5; u++) {
              var p = o[u]; - 1 === t.indexOf(p) && (t += p)
            }
            try {
              "undefined" != typeof ucapi && "function" == typeof ucapi.invoke && (e.uc_param_str = t, ucapi.invoke("biz.ucparams", {
                params: t,
                success: function (r) {
                  e.uc_param = r || "", e.uc_param_str = ""
                },
                fail: function (r) {
                  e.logger.error("get uc_param_str error: ", r)
                }
              }))
            } catch (r) {
              e.logger.error("get uc_param_str error: ", r), e.uc_param_str = t
            }
          }
        };
      o.prototype.pluginId = "ucparam", e.exports = o
    }
  })
}));
