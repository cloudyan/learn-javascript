! function (t, e) {
  "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.slsflowPlugin = e() : t.slsflowPlugin = e()
}(this, (function () {
  return function (t) {
    var e = {};

    function n(o) {
      if (e[o]) return e[o].exports;
      var r = e[o] = {
        i: o,
        l: !1,
        exports: {}
      };
      return t[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    return n.m = t, n.c = e, n.d = function (t, e, o) {
      n.o(t, e) || Object.defineProperty(t, e, {
        enumerable: !0,
        get: o
      })
    }, n.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      })
    }, n.t = function (t, e) {
      if (1 & e && (t = n(t)), 8 & e) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var o = Object.create(null);
      if (n.r(o), Object.defineProperty(o, "default", {
          enumerable: !0,
          value: t
        }), 2 & e && "string" != typeof t)
        for (var r in t) n.d(o, r, function (e) {
          return t[e]
        }.bind(null, r));
      return o
    }, n.n = function (t) {
      var e = t && t.__esModule ? function () {
        return t.default
      } : function () {
        return t
      };
      return n.d(e, "a", e), e
    }, n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 2)
  }([function (t, e) {
    t.exports = {
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
  }, , function (t, e, n) {
    var o = n(0).env,
      r = function (t) {
        var e;
        return (t ? (e = t.replace(/^#\/?/, "")) && "string" == typeof e ? e.replace(/^(https?:)?\/\//, "").replace(/\?.*$/, "") : "" : "") || "[index]"
      },
      i = function (t, e) {
        if (e = e || {}, t.env === o.BROWSER && window)
          if (t.toolKit.extend({
              enable: !0
            }, e).enable) {
            t.logger.info("wpkflowPlugin已开启");
            var i, l, u = function () {
              t.reportFlow()
            };
            t.toolKit.onListen(window, "load", u, !0), t.spa && (n(3)(), i = function (e) {
              r(location.hash) && (t._begin = Date.now(), t._sid = t.toolKit.uuid(), t.reportFlow())
            }, l = function (e) {
              r(e.detail) && (t._begin = Date.now(), t._sid = t.toolKit.uuid(), t.reportFlow())
            }, t.toolKit.onListen(window, "hashchange", i), t.toolKit.onListen(window, "historystatechange", l)), t.toolKit.onListen(window, "beforeunload", (function () {
              t.toolKit.offListen(window, "load"), t.toolKit.offListen(window, "hashchange"), t.toolKit.offListen(window, "historystatechange"), u = i = l = null
            }))
          } else t.logger.info("wpkflowPlugin已关闭")
      };
    i.prototype.pluginId = "flow", t.exports = i
  }, function (t, e) {
    var n = window.history || {},
      o = window.document,
      r = function (t, e) {
        var n;
        window.CustomEvent ? n = new CustomEvent(t, {
          detail: e
        }) : ((n = o.createEvent("HTMLEvents")).initEvent(t, !1, !0), n.detail = e), window.dispatchEvent(n)
      },
      i = function (t) {
        return t && "string" == typeof t ? t.replace(/^(https?:)?\/\//, "").replace(/\?.*$/, "") : ""
      },
      l = function (t) {
        var e = n[t];
        "function" == typeof e && (n[t] = function (t, o, l) {
          var u = location.href,
            f = e.call(n, t, o, l);
          if (!l || "string" != typeof l) return f;
          if (l === u) return f;
          try {
            var a = u.split("#"),
              s = l.split("#"),
              c = i(a[0]),
              p = i(s[0]),
              d = a[1] && a[1].replace(/^\/?(.*)/, "$1"),
              w = s[1] && s[1].replace(/^\/?(.*)/, "$1");
            c !== p ? r("historystatechange", p) : d !== w && r("historystatechange", w)
          } catch (t) {}
          return f
        }, n[t].toString = t + "() { [native code] }")
      };
    t.exports = function () {
      l("pushState"), l("replateState")
    }
  }])
}));
