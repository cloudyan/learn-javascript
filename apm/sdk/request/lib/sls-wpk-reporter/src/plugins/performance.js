! function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.slsperformancePlugin = t() : e.slsperformancePlugin = t()
}(this, (function () {
  return function (e) {
    var t = {};

    function n(r) {
      if (t[r]) return t[r].exports;
      var o = t[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    return n.m = e, n.c = t, n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: r
      })
    }, n.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      })
    }, n.t = function (e, t) {
      if (1 & t && (e = n(e)), 8 & t) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (n.r(r), Object.defineProperty(r, "default", {
          enumerable: !0,
          value: e
        }), 2 & t && "string" != typeof e)
        for (var o in e) n.d(r, o, function (t) {
          return e[t]
        }.bind(null, o));
      return r
    }, n.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default
      } : function () {
        return e
      };
      return n.d(t, "a", t), t
    }, n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 9)
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
    9: function (e, t, n) {
      var r, o = n(0).env,
        i = n(0).category,
        a = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "secureConnectionStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd", "msFirstPaint"],
        d = ["navigate", "reload", "back_forward"],
        f = function (e) {
          var t, n, o = e[a[5]];
          if (1 === e._ver) {
            var i;
            if (window.chrome && window.chrome.loadTimes) i = 1e3 * window.chrome.loadTimes().firstPaintTime;
            else i = e.msFirstPaint ? e.msFirstPaint : e[a[13]];
            if (!i) return -1;
            t = i >= o ? parseFloat((i - o).toFixed(2)) : -1
          } else 2 === e._ver && (t = e[a[13]] - o, t = parseFloat(t.toFixed(2)));
          if (r && r.getEntriesByType) try {
            for (var d = r.getEntriesByType("paint"), f = 0; f < d.length; f++) {
              var c = d[f];
              "first-paint" === c.name ? t = c.startTime.toFixed(2) : "first-contentful-paint" === c.name && (n = c.startTime.toFixed(2))
            }
          } catch (e) {
            console.error(e)
          }
          return {
            fpt: t,
            fcp: n
          }
        },
        c = function (e, t) {
          var n, r, o, i = {};
          for (var d in t) o = 0, n = e[a[t[d][0]]], r = e[a[t[d][1]]], n > 0 && r > 0 && (o = parseFloat((r - n).toFixed(2))), i[d] = o;
          return i
        },
        s = function (e, t) {
          var n = window;
          if (r = n.performance || n.webkitPerformance || n.msPerformance || n.mozPerformance, e.env === o.BROWSER && r && r.timing) {
            t = t || {};
            var a = e.toolKit.extend({
              enable: !0,
              sampleRate: 1
            }, t);
            if (a.enable) {
              e.logger.info("wpkperformancePlugin已开启");
              var s, p, u, l, m = r.timing || {},
                v = 1;
              if ("function" == typeof n.PerformanceNavigationTiming) try {
                var E = r.getEntriesByType("navigation")[0];
                E && (m = E, v = 2)
              } catch (e) {}
              m._ver = v, s = window, p = "load", u = function () {
                /loaded|complete/.test(document.readyState) && setTimeout((function () {
                  var t = e.toolKit.extend(function (e) {
                    return c(e, {
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
                  }(m), function (e) {
                    var t = c(e, {
                        w_firstbyte: [5, 12],
                        w_tti: [5, 15],
                        w_domready: [5, 17],
                        w_load: [5, 19],
                        w_total: [5, 20]
                      }),
                      n = f(e);
                    return t.wl_fpt = n.fpt, t.wl_fcp = n.fcp, t
                  }(m));
                  for (var n in t)
                    if (t[n] < 0 || t[n] > 6e4) return void e.logger.warn("性能数据异常：", n, t[n]);
                  var o = e.toolKit.extend(t, function (e) {
                    var t, n = r.navigation || {},
                      o = -1,
                      i = -1,
                      a = -1;
                    return 1 === e._ver ? t = d[n.type] || "other" : 2 === e._ver && (o = e.encodedBodySize, i = e.decodedBodySize, a = e.transferSize, t = e.type), {
                      w_enbdsize: o,
                      w_debdsize: i,
                      w_transize: a,
                      w_navtype: t
                    }
                  }(m), a, {
                    category: i.JSFSPERF
                  });
                  e.report(o)
                }))
              }, s.addEventListener ? s.addEventListener(p, u, l || !1) : s.attachEvent("on" + p, u)
            } else e.logger.info("wpkperformancePlugin已关闭")
          } else e.logger.warn("基础性能插件仅支持浏览器环境")
        };
      s.prototype.pluginId = "perf", e.exports = s
    }
  })
}));
