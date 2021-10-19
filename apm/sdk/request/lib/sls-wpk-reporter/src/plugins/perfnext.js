! function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.slsperfnextPlugin = t() : e.slsperfnextPlugin = t()
}(this, (function () {
  return function (e) {
    var t = {};

    function n(i) {
      if (t[i]) return t[i].exports;
      var o = t[i] = {
        i: i,
        l: !1,
        exports: {}
      };
      return e[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    return n.m = e, n.c = t, n.d = function (e, t, i) {
      n.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: i
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
      var i = Object.create(null);
      if (n.r(i), Object.defineProperty(i, "default", {
          enumerable: !0,
          value: e
        }), 2 & t && "string" != typeof e)
        for (var o in e) n.d(i, o, function (t) {
          return e[t]
        }.bind(null, o));
      return i
    }, n.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default
      } : function () {
        return e
      };
      return n.d(t, "a", t), t
    }, n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 6)
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
  }, , , , , , function (e, t, n) {
    var i = n(0).env,
      o = n(0).category,
      r = function (e, t) {
        if (t = t || {}, -1 !== [i.BROWSER].indexOf(e.env)) {
          var r = e.toolKit.extend({
            enableLCP: !1,
            enableFSP: !1,
            sampleRate: 1
          }, t);
          if (r.enableLCP || r.enableFSP) {
            if (e.logger.info("wpkperfnextPlugin已开启"), r.enableLCP) {
              var a = n(7);
              u = window, c = "DOMContentLoaded", f = function () {
                a.getLCP((function (t) {
                  var n = e.toolKit.extend(r, {
                    category: o.PERFNEXT,
                    wl_avgv2: t.value
                  });
                  e.report(n), e.logger.warn("lcp: ", t)
                }))
              }, u.addEventListener ? u.addEventListener(c, f, l || !1) : u.attachEvent("on" + c, f)
            }
            var u, c, f, l;
            if (r.enableFSP) {
              n(8).on(t => {
                var n = e.toolKit.extend(r, {
                  category: o.PERFNEXT,
                  wl_avgv1: t
                });
                e.report(n), e.logger.info("wpk-tbfsp:", t)
              })
            }
          } else e.logger.info("wpkperfnextPlugin已关闭")
        } else e.logger.warn("性能增强插件仅支持浏览器环境")
      };
    r.prototype.pluginId = "tbfsp", e.exports = r
  }, function (e, t, n) {
    ! function (e) {
      "use strict";
      var t, n, i, o, r = function (e, t) {
          return {
            name: e,
            value: void 0 === t ? -1 : 0,
            delta: 0,
            entries: [],
            id: "v1-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12)
          }
        },
        a = function (e, t) {
          try {
            if (PerformanceObserver.supportedEntryTypes.includes(e)) {
              var n = new PerformanceObserver((function (e) {
                return e.getEntries().map(t)
              }));
              return n.observe({
                type: e,
                buffered: !0
              }), n
            }
          } catch (e) {}
        },
        u = !1,
        c = function (e, t) {
          u || "undefined" != typeof InstallTrigger || (addEventListener("beforeunload", (function () {})), u = !0), addEventListener("visibilitychange", (function n(i) {
            "hidden" === document.visibilityState && (e(i), t && removeEventListener("visibilitychange", n, !0))
          }), !0)
        },
        f = function (e) {
          addEventListener("pageshow", (function (t) {
            t.persisted && e(t)
          }), !0)
        },
        l = new WeakSet,
        s = function (e, t, n) {
          var i;
          return function () {
            t.value >= 0 && (n || l.has(t) || "hidden" === document.visibilityState) && (t.delta = t.value - (i || 0), (t.delta || void 0 === i) && (i = t.value, e(t)))
          }
        },
        d = -1,
        p = function () {
          return "hidden" === document.visibilityState ? 0 : 1 / 0
        },
        m = function () {
          c((function (e) {
            var t = e.timeStamp;
            d = t
          }), !0)
        },
        v = function () {
          return d < 0 && (d = p(), m(), f((function () {
            setTimeout((function () {
              d = p(), m()
            }), 0)
          }))), {
            get timeStamp() {
              return d
            }
          }
        },
        h = {
          passive: !0,
          capture: !0
        },
        g = new Date,
        w = function (e, o) {
          t || (t = o, n = e, i = new Date, E(removeEventListener), T())
        },
        T = function () {
          if (n >= 0 && n < i - g) {
            var e = {
              entryType: "first-input",
              name: t.type,
              target: t.target,
              cancelable: t.cancelable,
              startTime: t.timeStamp,
              processingStart: t.timeStamp + n
            };
            o.map((function (t) {
              t(e)
            })), o = []
          }
        },
        y = function (e) {
          if (e.cancelable) {
            var t = (e.timeStamp > 1e12 ? new Date : performance.now()) - e.timeStamp;
            "pointerdown" == e.type ? function (e, t) {
              var n = function () {
                  w(e, t), o()
                },
                i = function () {
                  o()
                },
                o = function () {
                  removeEventListener("pointerup", n, h), removeEventListener("pointercancel", i, h)
                };
              addEventListener("pointerup", n, h), addEventListener("pointercancel", i, h)
            }(t, e) : w(t, e)
          }
        },
        E = function (e) {
          ["mousedown", "keydown", "touchstart", "pointerdown"].map((function (t) {
            return e(t, y, h)
          }))
        };
      e.getCLS = function (e, t) {
        var n, i = r("CLS", 0),
          o = function (e) {
            e.hadRecentInput || (i.value += e.value, i.entries.push(e), n())
          },
          u = a("layout-shift", o);
        u && (n = s(e, i, t), c((function () {
          u.takeRecords().map(o), n()
        })), f((function () {
          i = r("CLS", 0), n = s(e, i, t)
        })))
      }, e.getFCP = function (e, t) {
        var n, i = v(),
          o = r("FCP"),
          u = a("paint", (function (e) {
            "first-contentful-paint" === e.name && (u && u.disconnect(), e.startTime < i.timeStamp && (o.value = e.startTime, o.entries.push(e), l.add(o), n()))
          }));
        u && (n = s(e, o, t), f((function (i) {
          o = r("FCP"), n = s(e, o, t), requestAnimationFrame((function () {
            requestAnimationFrame((function () {
              o.value = performance.now() - i.timeStamp, l.add(o), n()
            }))
          }))
        })))
      }, e.getFID = function (e, i) {
        var u, d = v(),
          p = r("FID"),
          m = function (e) {
            e.startTime < d.timeStamp && (p.value = e.processingStart - e.startTime, p.entries.push(e), l.add(p), u())
          },
          h = a("first-input", m);
        u = s(e, p, i), h && c((function () {
          h.takeRecords().map(m), h.disconnect()
        }), !0), h && f((function () {
          var a;
          p = r("FID"), u = s(e, p, i), o = [], n = -1, t = null, E(addEventListener), a = m, o.push(a), T()
        }))
      }, e.getLCP = function (e, t) {
        var n, i = v(),
          o = r("LCP"),
          u = function (e) {
            var t = e.startTime;
            t < i.timeStamp && (o.value = t, o.entries.push(e)), n()
          },
          d = a("largest-contentful-paint", u);
        if (d) {
          n = s(e, o, t);
          var p = function () {
            l.has(o) || (d.takeRecords().map(u), d.disconnect(), l.add(o), n())
          };
          ["keydown", "click"].map((function (e) {
            addEventListener(e, p, {
              once: !0,
              capture: !0
            })
          })), c(p, !0), f((function (i) {
            o = r("LCP"), n = s(e, o, t), requestAnimationFrame((function () {
              requestAnimationFrame((function () {
                o.value = performance.now() - i.timeStamp, l.add(o), n()
              }))
            }))
          }))
        }
      }, e.getTTFB = function (e) {
        var t, n = r("TTFB");
        t = function () {
          try {
            var t = performance.getEntriesByType("navigation")[0] || function () {
              var e = performance.timing,
                t = {
                  entryType: "navigation",
                  startTime: 0
                };
              for (var n in e) "navigationStart" !== n && "toJSON" !== n && (t[n] = Math.max(e[n] - e.navigationStart, 0));
              return t
            }();
            n.value = n.delta = t.responseStart, n.entries = [t], e(n)
          } catch (e) {}
        }, "complete" === document.readyState ? setTimeout(t, 0) : addEventListener("pageshow", t)
      }, Object.defineProperty(e, "__esModule", {
        value: !0
      })
    }(t)
  }, function (e, t, n) {
    var i = {};
    if ("undefined" == typeof window || "undefined" == typeof performance || "undefined" == typeof MutationObserver) e.exports = {
      on: function () {},
      un: function () {}
    };
    else {
      var o = window._t2Frames = [],
        r = screen.width * screen.height,
        a = null,
        u = !1,
        c = !1,
        f = ["SCRIPT", "LINK", "SVG", "IMG", "VIDEO"],
        l = [];
      var s = new MutationObserver((function (e) {
          var t = [],
            n = [];
          S(e, (function (e) {
            S(e.addedNodes, (function (e) {
              1 !== e.nodeType && 9 !== e.nodeType || t.push(e)
            }))
          })), t.length + n.length > 0 && w(t.concat(n))
        })),
        d = {
          childList: !0,
          subtree: !0
        };

      function p() {
        s.observe(document.body, d), l = [], S(document.querySelectorAll("[ignoreFspCollection]"), (function (e) {
          l.push(e)
        })), w(document.querySelectorAll("BODY > *")), setTimeout((function () {
          m(!0)
        }), 3e4)
      }

      function m(e) {
        u || (c = !0, a && clearTimeout(a), s.disconnect(), s.takeRecords(), l = [], setTimeout((function () {
          u = !0,
            function () {
              var e = o.length;
              if (0 === e) return;
              var t = [],
                n = [],
                r = [],
                a = -1,
                u = 0,
                c = 0,
                f = null,
                l = null,
                s = 0,
                d = 0;
              for (e = o.length - 1; e > 1; e--)
                if (f = o[e], l = o[e - 1], s = Math.floor(100 * f.v) / 100, d = Math.floor(100 * l.v) / 100, (u = d ? Math.abs(s - d) / d : 0) > .1) {
                  if (++c > 2) break
                } else c = 0;
              n = c > 2 ? o.slice(0, e + 2) : o;
              for (; n.length > 0;)
                if (a = n[0].lastTime, r = [], u = 0, c = 0, S(n, (function (e) {
                    u += e.v, c++, e.createTime <= a + 200 && (a = Math.max(a, e.lastTime)), e.lastTime > a && r.push(e)
                  })), n = r, u < .02 || u / c < .01 ? E++ : E = 0, t.push(a), E >= 3) {
                  t.splice(t.length - 3), m();
                  break
                } var p = t.length - 1;
              0 !== E && (p = Math.max(p - E, 0));
              var v = p === t.length ? -3 : p - 1;
              v <= 0 && (v = 0);
              i._fn(t[p], t.slice(v, v + 3))
            }()
        }), 1e3))
      }

      function v(e) {
        return e.width && e.height && e.top < screen.height && e.left < screen.width && e.top + e.height > 0 && e.left + e.width > 0
      }

      function h(e, t, n) {
        var i = n || 0;
        return S(e, (function (e) {
          i = t(e, i)
        })), i
      }

      function g(e) {
        var t = function () {
          e.lastTime = Math.max(b(), e.lastTime), y()
        };
        window.requestAnimationFrame ? requestAnimationFrame(t) : setTimeout(t, 0)
      }

      function w(e) {
        var t = b(),
          n = {
            createTime: t,
            lastTime: t,
            wait: 0,
            piece: [],
            v: 0,
            c: document.getElementsByTagName("*").length
          };
        S(e, (function (e) {
          (function (e) {
            for (var t = l.length, n = null, i = 0; i < t; i++)
              if ((n = l[i]) && n.contains && n.contains(e)) return !0;
            return !!e.hasAttribute("ignoreFspCollection") && (l.push(e), !0)
          })(e) || function e(t, n, i) {
            var o = t.piece,
              a = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0,
              c = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft || 0,
              l = i ? null : n.getBoundingClientRect(),
              s = i || {
                type: 0,
                className: T(),
                top: l.top + a,
                left: l.left + c,
                width: l.width,
                height: l.height
              },
              d = n.offsetParent;
            d && d.offsetWidth < d.scrollWidth && (s.width = Math.min(d.offsetWidth, s.width)), d && d.offsetHeight < d.scrollHeight && (s.height = Math.min(d.offsetHeight, s.height));
            var p = !0,
              m = n.tagName;
            if (-1 !== f.indexOf(m.toUpperCase()) && (p = !1, "IMG" === m)) {
              var w = 0;
              if (s.width = Math.max(s.width, 1), s.height = Math.max(s.height, 1), s.type = 1, v(s)) {
                t.wait += 1, n.addEventListener("load", (function e() {
                  if (u) n.removeEventListener("load", e, !0);
                  else {
                    w++, t.wait -= 1;
                    var i = n.getBoundingClientRect(),
                      o = b();
                    v(s) && (w <= 1 || o <= 1e3) ? (s.width = i.width, s.height = i.height, t.lastTime = Math.max(o, t.lastTime), s.size = i.width * i.height, s.v = s.size / r, t.v = h(t.piece, (function (e, t) {
                      return e.v + t
                    }), 0), g(t)) : y()
                  }
                }), !0), n.addEventListener("error", (function e() {
                  u ? n.removeEventListener("error", e, !0) : (t.wait -= 1, v(s) ? (t.lastTime = Math.max(b(), t.lastTime), 0 === t.wait && (t.v = h(t.piece, (function (e, t) {
                    return e.v + t
                  }), 0), g(t))) : y())
                }), !0)
              }
            }
            var E = {};
            if (window.getComputedStyle && ("none" === (E = window.getComputedStyle(n, null)).display || "fixed" === E.position)) return p = !1, o;
            if (v(s)) {
              var L = E.backgroundImage || "",
                O = /url\(['"]?(.*?)['"]?\)/i;
              if (O.test(L) && (L = L.replace(O, "$1"), !/^data:/i.test(L))) {
                t.wait += 1;
                var P = document.createElement("img");
                P.onload = function () {
                  t.wait -= 1, t.lastTime = Math.max(b(), t.lastTime), 0 === t.wait && g(t)
                }, P.src = L
              }
              if (function (e, t) {
                  var n = null;
                  for (var i in e)
                    if (n = e[i], t.top >= n.top && t.left >= n.left && t.top + t.height <= n.top + n.height && t.left + t.width <= n.left + n.width) return !0;
                  return !1
                }(o, s) || (s.size = s.width * s.height, s.v = s.size / r, t.v += s.v, s.size ? o.push(s) : p = !1), p) S(n.children, (function (n) {
                e(t, n)
              }))
            }
            return o
          }(n, e)
        })), n.piece.length > 0 && (o.push(n), g(n))
      }

      function T() {
        return ""
      }

      function y() {
        if (!c && !u) {
          a && clearTimeout(a), a = setTimeout((function () {
            m()
          }), 3e3);
          for (var e = null, t = null, n = 0, i = 0, r = 0, f = 0, l = 0, s = o.length - 1; s > 1; s--) {
            if (e = o[s], t = o[s - 1], f = Math.floor(100 * e.v) / 100, i = (l = Math.floor(100 * t.v) / 100) ? Math.abs(f - l) / l : 0, (r += e.v) > 2) {
              m();
              break
            }
            if (i < .5) {
              if (++n > 6) {
                m();
                break
              }
            } else n > 0 && (n = 0)
          }
        }
      }
      document.body ? p() : document.addEventListener && document.addEventListener("DOMContentLoaded", p);
      var E = 0;

      function b() {
        return performance.now()
      }

      function S(e, t) {
        if (Array.prototype.forEach) Array.prototype.forEach.call(e, t);
        else
          for (var n = e.length, i = 0; i < n; i++) t(e[i], i)
      }
      i.on = function (e) {
        i._fn = e
      }, i.un = function () {
        i._fn = function () {}
      }, i.un(), e.exports = i
    }
  }])
}));
