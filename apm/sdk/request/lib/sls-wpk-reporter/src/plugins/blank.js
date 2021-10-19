! function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.slsblankPlugin = t() : e.slsblankPlugin = t()
}(this, (function () {
  return function (e) {
    var t = {};

    function n(o) {
      if (t[o]) return t[o].exports;
      var r = t[o] = {
        i: o,
        l: !1,
        exports: {}
      };
      return e[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    return n.m = e, n.c = t, n.d = function (e, t, o) {
      n.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: o
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
      var o = Object.create(null);
      if (n.r(o), Object.defineProperty(o, "default", {
          enumerable: !0,
          value: e
        }), 2 & t && "string" != typeof e)
        for (var r in e) n.d(o, r, function (t) {
          return e[t]
        }.bind(null, r));
      return o
    }, n.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default
      } : function () {
        return e
      };
      return n.d(t, "a", t), t
    }, n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 1)
  }([function (e, t) {
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
  }, function (e, t, n) {
    var o = n(0),
      r = function (e, t) {
        if (e.env === o.env.BROWSER && "undefined" != typeof window) {
          var n = {
              enable: !0,
              sampleRate: t.sampleRate || 1,
              rootNode: t.rootNode,
              ignorePageUrls: t.ignorePageUrls || null,
              maxDepth: t.maxDepth || 8,
              minElements: t.minElements || 10,
              keyNoteText: t.keyNoteText || [],
              onloadDuration: t.onloadDuration || 8e3,
              wsDuration: t.wsDuration || 3e3,
              startCheckingTime: t.startCheckingTime || 5e3
            },
            r = e.toolKit.extend(n, t);
          if (r.enable) {
            e.logger.info("wpkblankPagePlugin已开启");
            try {
              if (e.toolKit.isFunction(r.ignorePageUrls) && r.ignorePageUrls(location)) return void e.logger.info("当前页面在白屏检测的白名单中")
            } catch (e) {}
            var i = !1;
            if (r.onloadDuration > 0) var a = setTimeout(() => {
              i = !0, e.reportBlankPage({
                w_fp: 100,
                w_wst: r.onloadDuration
              }), clearTimeout(a)
            }, r.onloadDuration);
            var l = function () {
              clearTimeout(a);
              try {
                !i && r.wsDuration > 0 && function (e, t) {
                  var n = performance.timing;
                  if ("function" == typeof window.PerformanceNavigationTiming) try {
                    var o = performance.getEntriesByType("navigation")[0];
                    o && (n = o)
                  } catch (e) {}
                  if (n) try {
                    n.responseEnd - n.fetchStart >= e && t()
                  } catch (e) {}
                }(r.wsDuration, (function () {
                  e.reportBlankPage({
                    w_fp: 104,
                    w_wst: r.wsDuration
                  })
                }));
                var t = setTimeout((function () {
                  ! function (e, t) {
                    var n, o, r, i, a = 0,
                      l = 0,
                      u = !1,
                      f = [],
                      s = function (e) {
                        return 0 === e.style.width || 0 === e.style.height || "none" === e.style.display || 0 === e.style.opacity || "hidden" === e.style.visibility || "collapse" === e.style.visibility || void 0 !== e.type && "hidden" === e.type
                      },
                      c = function (e) {
                        return e && -1 !== ["VIDEO", "IMG", "BUTTON", "TEXTAREA", "RADIO", "CHECKBOX", "SELECT", "IFRAME", "CANVAS", "SVG"].indexOf(e.nodeName)
                      },
                      p = function (n, o) {
                        for (var r = Array.prototype.slice.call(n); r.length;) {
                          var i = r.shift();
                          o > a && (a = o), f.push({
                            tag: i.tagName,
                            layer: o,
                            cls: i.className
                          });
                          var d = s(i);
                          if (e.logger.info("depth：" + o, i.nodeType, i.tagName, d), !d) {
                            if (l++, c(i)) {
                              u = !0, e.logger.info("有可见元素，非白屏");
                              break
                            }
                            o <= t.maxDepth && !s(i) && i.children.length && p(i.children, o + 1)
                          }
                        }
                      },
                      d = t.rootNode || document.body,
                      g = !1;
                    if (d)
                      if (o = d.innerText) r = t.keyNoteText, i = o, e.toolKit.some(r, (function (e) {
                        return e === i
                      })) ? (g = !0, n = 102, e.logger.warn("肯定白屏，命中关键字", o)) : (g = !1, u = !0);
                      else {
                        var y = Array.prototype.slice.call(d.children),
                          T = e.toolKit.filter(y, (function (e) {
                            return -1 === ["STYLE", "SCRIPT", "LINK"].indexOf(e.nodeName)
                          }));
                        p(T, 1)
                      }
                    else g = !0, n = 103, e.logger.warn("白屏，木有body标签或者指定的root节点为空");
                    e.logger.warn("元素数: ", l), e.logger.warn("遍历的最大层级: ", a), e.logger.warn("dsl", f), !g && !u && l < t.minElements && (g = !0, n = 101), g && (e.logger.warn("白屏了", n), e.reportBlankPage({
                      w_fp: n,
                      w_dsl: JSON.stringify(f),
                      w_depth: a,
                      w_domcnt: l
                    }))
                  }(e, r), clearTimeout(t)
                }), r.startCheckingTime)
              } catch (t) {
                e.logger.error("bkpg checking oops: ", t)
              }
            };
            e.toolKit.onListen(window, "load", l, !0), e.toolKit.onListen(window, "beforeunload", (function () {
              e.toolKit.offListen(window, "load"), l = null
            }))
          } else e.logger.info("wpkblankPagePlugin已关闭")
        }
      };
    r.prototype.pluginId = "bkpg", e.exports = r
  }])
}));
