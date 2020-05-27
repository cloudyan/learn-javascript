
console.log('bb 这个文件很大的');
setTimeout(function () {
  console.log('bb setTimeout 1000')
}, 1000);

var requirejs, require, define;
!function(global) {
  function isFunction(t) {
    return "[object Function]" === ostring.call(t)
  }
  function isArray(t) {
    return "[object Array]" === ostring.call(t)
  }
  function each(t, e) {
    if (t) {
      var n;
      for (n = 0; n < t.length && (!t[n] || !e(t[n], n, t)); n += 1)
        ;
    }
  }
  function eachReverse(t, e) {
    if (t) {
      var n;
      for (n = t.length - 1; n > -1 && (!t[n] || !e(t[n], n, t)); n -= 1)
        ;
    }
  }
  function hasProp(t, e) {
    return hasOwn.call(t, e)
  }
  function getOwn(t, e) {
    return hasProp(t, e) && t[e]
  }
  function eachProp(t, e) {
    var n;
    for (n in t)
      if (hasProp(t, n) && e(t[n], n))
        break
  }
  function mixin(t, e, n, r) {
    return e && eachProp(e, function(e, i) {
      !n && hasProp(t, i) || (r && "string" != typeof e ? (t[i] || (t[i] = {}),
      mixin(t[i], e, n, r)) : t[i] = e)
    }),
    t
  }
  function bind(t, e) {
    return function() {
      return e.apply(t, arguments)
    }
  }
  function scripts() {
    return document.getElementsByTagName("script")
  }
  function defaultOnError(t) {
    throw t
  }
  function getGlobal(t) {
    if (!t)
      return t;
    var e = global;
    return each(t.split("."), function(t) {
      e = e[t]
    }),
    e
  }
  function makeError(t, e, n, r) {
    var i = new Error(e + "\nhttp://requirejs.org/docs/errors.html#" + t);
    return i.requireType = t,
    i.requireModules = r,
    n && (i.originalError = n),
    i
  }
  function newContext(t) {
    function e(t) {
      var e, n;
      for (e = 0; t[e]; e += 1)
        if (n = t[e],
        "." === n)
          t.splice(e, 1),
          e -= 1;
        else if (".." === n) {
          if (1 === e && (".." === t[2] || ".." === t[0]))
            break;
          e > 0 && (t.splice(e - 1, 2),
          e -= 2)
        }
    }
    function n(t, n, r) {
      var i, o, a, s, u, c, l, f, h, p, d, m = n && n.split("/"), v = m, g = E.map, y = g && g["*"];
      if (t && "." === t.charAt(0) && (n ? (v = getOwn(E.pkgs, n) ? m = [n] : m.slice(0, m.length - 1),
      t = v.concat(t.split("/")),
      e(t),
      o = getOwn(E.pkgs, i = t[0]),
      t = t.join("/"),
      o && t === i + "/" + o.main && (t = i)) : 0 === t.indexOf("./") && (t = t.substring(2))),
      r && g && (m || y)) {
        for (s = t.split("/"),
        u = s.length; u > 0; u -= 1) {
          if (l = s.slice(0, u).join("/"),
          m)
            for (c = m.length; c > 0; c -= 1)
              if (a = getOwn(g, m.slice(0, c).join("/")),
              a && (a = getOwn(a, l))) {
                f = a,
                h = u;
                break
              }
          if (f)
            break;
          !p && y && getOwn(y, l) && (p = getOwn(y, l),
          d = u)
        }
        !f && p && (f = p,
        h = d),
        f && (s.splice(0, h, f),
        t = s.join("/"))
      }
      return t
    }
    function r(t) {
      isBrowser && each(scripts(), function(e) {
        if (e.getAttribute("data-requiremodule") === t && e.getAttribute("data-requirecontext") === w.contextName)
          return e.parentNode.removeChild(e),
          !0
      })
    }
    function i(t) {
      var e = getOwn(E.paths, t);
      if (e && isArray(e) && e.length > 1)
        return e.shift(),
        w.require.undef(t),
        w.require([t]),
        !0
    }
    function o(t) {
      var e, n = t ? t.indexOf("!") : -1;
      return n > -1 && (e = t.substring(0, n),
      t = t.substring(n + 1, t.length)),
      [e, t]
    }
    function a(t, e, r, i) {
      var a, s, u, c, l = null, f = e ? e.name : null, h = t, p = !0, d = "";
      return t || (p = !1,
      t = "_@r" + (M += 1)),
      c = o(t),
      l = c[0],
      t = c[1],
      l && (l = n(l, f, i),
      s = getOwn(O, l)),
      t && (l ? d = s && s.normalize ? s.normalize(t, function(t) {
        return n(t, f, i)
      }) : n(t, f, i) : (d = n(t, f, i),
      c = o(d),
      l = c[0],
      d = c[1],
      r = !0,
      a = w.nameToUrl(d))),
      u = !l || s || r ? "" : "_unnormalized" + (C += 1),
      {
        prefix: l,
        name: d,
        parentMap: e,
        unnormalized: !!u,
        url: a,
        originalName: h,
        isDefine: p,
        id: (l ? l + "!" + d : d) + u
      }
    }
    function s(t) {
      var e = t.id
        , n = getOwn(S, e);
      return n || (n = S[e] = new w.Module(t)),
      n
    }
    function u(t, e, n) {
      var r = t.id
        , i = getOwn(S, r);
      !hasProp(O, r) || i && !i.defineEmitComplete ? (i = s(t),
      i.error && "error" === e ? n(i.error) : i.on(e, n)) : "defined" === e && n(O[r])
    }
    function c(t, e) {
      var n = t.requireModules
        , r = !1;
      e ? e(t) : (each(n, function(e) {
        var n = getOwn(S, e);
        n && (n.error = t,
        n.events.error && (r = !0,
        n.emit("error", t)))
      }),
      r || req.onError(t))
    }
    function l() {
      globalDefQueue.length && (apsp.apply(T, [T.length - 1, 0].concat(globalDefQueue)),
      globalDefQueue = [])
    }
    function f(t) {
      delete S[t],
      delete k[t]
    }
    function h(t, e, n) {
      var r = t.map.id;
      t.error ? t.emit("error", t.error) : (e[r] = !0,
      each(t.depMaps, function(r, i) {
        var o = r.id
          , a = getOwn(S, o);
        !a || t.depMatched[i] || n[o] || (getOwn(e, o) ? (t.defineDep(i, O[o]),
        t.check()) : h(a, e, n))
      }),
      n[r] = !0)
    }
    function p() {
      var t, e, n, o, a = 1e3 * E.waitSeconds, s = a && w.startTime + a < (new Date).getTime(), u = [], l = [], f = !1, d = !0;
      if (!y) {
        if (y = !0,
        eachProp(k, function(n) {
          if (t = n.map,
          e = t.id,
          n.enabled && (t.isDefine || l.push(n),
          !n.error))
            if (!n.inited && s)
              i(e) ? (o = !0,
              f = !0) : (u.push(e),
              r(e));
            else if (!n.inited && n.fetched && t.isDefine && (f = !0,
            !t.prefix))
              return d = !1
        }),
        s && u.length)
          return n = makeError("timeout", "Load timeout for modules: " + u, null, u),
          n.contextName = w.contextName,
          c(n);
        d && each(l, function(t) {
          h(t, {}, {})
        }),
        s && !o || !f || !isBrowser && !isWebWorker || _ || (_ = setTimeout(function() {
          _ = 0,
          p()
        }, 50)),
        y = !1
      }
    }
    function d(t) {
      hasProp(O, t[0]) || s(a(t[0], null, !0)).init(t[1], t[2])
    }
    function m(t, e, n, r) {
      t.detachEvent && !isOpera ? r && t.detachEvent(r, e) : t.removeEventListener(n, e, !1)
    }
    function v(t) {
      var e = t.currentTarget || t.srcElement;
      return m(e, w.onScriptLoad, "load", "onreadystatechange"),
      m(e, w.onScriptError, "error"),
      {
        node: e,
        id: e && e.getAttribute("data-requiremodule")
      }
    }
    function g() {
      var t;
      for (l(); T.length; ) {
        if (t = T.shift(),
        null === t[0])
          return c(makeError("mismatch", "Mismatched anonymous define() module: " + t[t.length - 1]));
        d(t)
      }
    }
    var y, b, w, x, _, E = {
      waitSeconds: 7,
      baseUrl: "./",
      paths: {},
      pkgs: {},
      shim: {},
      config: {}
    }, S = {}, k = {}, j = {}, T = [], O = {}, A = {}, M = 1, C = 1;
    return x = {
      require: function(t) {
        return t.require ? t.require : t.require = w.makeRequire(t.map)
      },
      exports: function(t) {
        if (t.usingExports = !0,
        t.map.isDefine)
          return t.exports ? t.exports : t.exports = O[t.map.id] = {}
      },
      module: function(t) {
        return t.module ? t.module : t.module = {
          id: t.map.id,
          uri: t.map.url,
          config: function() {
            var e, n = getOwn(E.pkgs, t.map.id);
            return e = n ? getOwn(E.config, t.map.id + "/" + n.main) : getOwn(E.config, t.map.id),
            e || {}
          },
          exports: O[t.map.id]
        }
      }
    },
    b = function(t) {
      this.events = getOwn(j, t.id) || {},
      this.map = t,
      this.shim = getOwn(E.shim, t.id),
      this.depExports = [],
      this.depMaps = [],
      this.depMatched = [],
      this.pluginMaps = {},
      this.depCount = 0
    }
    ,
    b.prototype = {
      init: function(t, e, n, r) {
        r = r || {},
        this.inited || (this.factory = e,
        n ? this.on("error", n) : this.events.error && (n = bind(this, function(t) {
          this.emit("error", t)
        })),
        this.depMaps = t && t.slice(0),
        this.errback = n,
        this.inited = !0,
        this.ignore = r.ignore,
        r.enabled || this.enabled ? this.enable() : this.check())
      },
      defineDep: function(t, e) {
        this.depMatched[t] || (this.depMatched[t] = !0,
        this.depCount -= 1,
        this.depExports[t] = e)
      },
      fetch: function() {
        if (!this.fetched) {
          this.fetched = !0,
          w.startTime = (new Date).getTime();
          var t = this.map;
          return this.shim ? void w.makeRequire(this.map, {
            enableBuildCallback: !0
          })(this.shim.deps || [], bind(this, function() {
            return t.prefix ? this.callPlugin() : this.load()
          })) : t.prefix ? this.callPlugin() : this.load()
        }
      },
      load: function() {
        var t = this.map.url;
        A[t] || (A[t] = !0,
        w.load(this.map.id, t))
      },
      check: function() {
        if (this.enabled && !this.enabling) {
          var t, e, n = this.map.id, r = this.depExports, i = this.exports, o = this.factory;
          if (this.inited) {
            if (this.error)
              this.emit("error", this.error);
            else if (!this.defining) {
              if (this.defining = !0,
              this.depCount < 1 && !this.defined) {
                if (isFunction(o)) {
                  if (this.events.error && this.map.isDefine || req.onError !== defaultOnError)
                    try {
                      i = w.execCb(n, o, r, i)
                    } catch (e) {
                      t = e
                    }
                  else
                    i = w.execCb(n, o, r, i);
                  if (this.map.isDefine && (e = this.module,
                  e && void 0 !== e.exports && e.exports !== this.exports ? i = e.exports : void 0 === i && this.usingExports && (i = this.exports)),
                  t)
                    return t.requireMap = this.map,
                    t.requireModules = this.map.isDefine ? [this.map.id] : null,
                    t.requireType = this.map.isDefine ? "define" : "require",
                    c(this.error = t)
                } else
                  i = o;
                this.exports = i,
                this.map.isDefine && !this.ignore && (O[n] = i,
                req.onResourceLoad && req.onResourceLoad(w, this.map, this.depMaps)),
                f(n),
                this.defined = !0
              }
              this.defining = !1,
              this.defined && !this.defineEmitted && (this.defineEmitted = !0,
              this.emit("defined", this.exports),
              this.defineEmitComplete = !0)
            }
          } else
            this.fetch()
        }
      },
      callPlugin: function() {
        var t = this.map
          , e = t.id
          , r = a(t.prefix);
        this.depMaps.push(r),
        u(r, "defined", bind(this, function(r) {
          var i, o, l, h = this.map.name, p = this.map.parentMap ? this.map.parentMap.name : null, d = w.makeRequire(t.parentMap, {
            enableBuildCallback: !0
          });
          return this.map.unnormalized ? (r.normalize && (h = r.normalize(h, function(t) {
            return n(t, p, !0)
          }) || ""),
          o = a(t.prefix + "!" + h, this.map.parentMap),
          u(o, "defined", bind(this, function(t) {
            this.init([], function() {
              return t
            }, null, {
              enabled: !0,
              ignore: !0
            })
          })),
          l = getOwn(S, o.id),
          void (l && (this.depMaps.push(o),
          this.events.error && l.on("error", bind(this, function(t) {
            this.emit("error", t)
          })),
          l.enable()))) : (i = bind(this, function(t) {
            this.init([], function() {
              return t
            }, null, {
              enabled: !0
            })
          }),
          i.error = bind(this, function(t) {
            this.inited = !0,
            this.error = t,
            t.requireModules = [e],
            eachProp(S, function(t) {
              0 === t.map.id.indexOf(e + "_unnormalized") && f(t.map.id)
            }),
            c(t)
          }),
          i.fromText = bind(this, function(n, r) {
            var o = t.name
              , u = a(o)
              , l = useInteractive;
            r && (n = r),
            l && (useInteractive = !1),
            s(u),
            hasProp(E.config, e) && (E.config[o] = E.config[e]);
            try {
              req.exec(n)
            } catch (t) {
              return c(makeError("fromtexteval", "fromText eval for " + e + " failed: " + t, t, [e]))
            }
            l && (useInteractive = !0),
            this.depMaps.push(u),
            w.completeLoad(o),
            d([o], i)
          }),
          void r.load(t.name, d, i, E))
        })),
        w.enable(r, this),
        this.pluginMaps[r.id] = r
      },
      enable: function() {
        k[this.map.id] = this,
        this.enabled = !0,
        this.enabling = !0,
        each(this.depMaps, bind(this, function(t, e) {
          var n, r, i;
          if ("string" == typeof t) {
            if (t = a(t, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap),
            this.depMaps[e] = t,
            i = getOwn(x, t.id))
              return void (this.depExports[e] = i(this));
            this.depCount += 1,
            u(t, "defined", bind(this, function(t) {
              this.defineDep(e, t),
              this.check()
            })),
            this.errback && u(t, "error", bind(this, this.errback))
          }
          n = t.id,
          r = S[n],
          hasProp(x, n) || !r || r.enabled || w.enable(t, this)
        })),
        eachProp(this.pluginMaps, bind(this, function(t) {
          var e = getOwn(S, t.id);
          e && !e.enabled && w.enable(t, this)
        })),
        this.enabling = !1,
        this.check()
      },
      on: function(t, e) {
        var n = this.events[t];
        n || (n = this.events[t] = []),
        n.push(e)
      },
      emit: function(t, e) {
        each(this.events[t], function(t) {
          t(e)
        }),
        "error" === t && delete this.events[t]
      }
    },
    w = {
      config: E,
      contextName: t,
      registry: S,
      defined: O,
      urlFetched: A,
      defQueue: T,
      Module: b,
      makeModuleMap: a,
      nextTick: req.nextTick,
      onError: c,
      configure: function(t) {
        t.baseUrl && "/" !== t.baseUrl.charAt(t.baseUrl.length - 1) && (t.baseUrl += "/");
        var e = E.pkgs
          , n = E.shim
          , r = {
          paths: !0,
          config: !0,
          map: !0
        };
        eachProp(t, function(t, e) {
          r[e] ? "map" === e ? (E.map || (E.map = {}),
          mixin(E[e], t, !0, !0)) : mixin(E[e], t, !0) : E[e] = t
        }),
        t.shim && (eachProp(t.shim, function(t, e) {
          isArray(t) && (t = {
            deps: t
          }),
          !t.exports && !t.init || t.exportsFn || (t.exportsFn = w.makeShimExports(t)),
          n[e] = t
        }),
        E.shim = n),
        t.packages && (each(t.packages, function(t) {
          var n;
          t = "string" == typeof t ? {
            name: t
          } : t,
          n = t.location,
          e[t.name] = {
            name: t.name,
            location: n || t.name,
            main: (t.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
          }
        }),
        E.pkgs = e),
        eachProp(S, function(t, e) {
          t.inited || t.map.unnormalized || (t.map = a(e))
        }),
        (t.deps || t.callback) && w.require(t.deps || [], t.callback)
      },
      makeShimExports: function(t) {
        function e() {
          var e;
          return t.init && (e = t.init.apply(global, arguments)),
          e || t.exports && getGlobal(t.exports)
        }
        return e
      },
      makeRequire: function(e, i) {
        function o(n, r, u) {
          var l, f, h;
          return i.enableBuildCallback && r && isFunction(r) && (r.__requireJsBuild = !0),
          "string" == typeof n ? isFunction(r) ? c(makeError("requireargs", "Invalid require call"), u) : e && hasProp(x, n) ? x[n](S[e.id]) : req.get ? req.get(w, n, e, o) : (f = a(n, e, !1, !0),
          l = f.id,
          hasProp(O, l) ? O[l] : c(makeError("notloaded", 'Module name "' + l + '" has not been loaded yet for context: ' + t + (e ? "" : ". Use require([])")))) : (g(),
          w.nextTick(function() {
            g(),
            h = s(a(null, e)),
            h.skipMap = i.skipMap,
            h.init(n, r, u, {
              enabled: !0
            }),
            p()
          }),
          o)
        }
        return i = i || {},
        mixin(o, {
          isBrowser: isBrowser,
          toUrl: function(t) {
            var r, i = t.lastIndexOf("."), o = t.split("/")[0], a = "." === o || ".." === o;
            return i !== -1 && (!a || i > 1) && (r = t.substring(i, t.length),
            t = t.substring(0, i)),
            w.nameToUrl(n(t, e && e.id, !0), r, !0)
          },
          defined: function(t) {
            return hasProp(O, a(t, e, !1, !0).id)
          },
          specified: function(t) {
            return t = a(t, e, !1, !0).id,
            hasProp(O, t) || hasProp(S, t)
          }
        }),
        e || (o.undef = function(t) {
          l();
          var n = a(t, e, !0)
            , i = getOwn(S, t);
          r(t),
          delete O[t],
          delete A[n.url],
          delete j[t],
          i && (i.events.defined && (j[t] = i.events),
          f(t))
        }
        ),
        o
      },
      enable: function(t) {
        var e = getOwn(S, t.id);
        e && s(t).enable()
      },
      completeLoad: function(t) {
        var e, n, r, o = getOwn(E.shim, t) || {}, a = o.exports;
        for (l(); T.length; ) {
          if (n = T.shift(),
          null === n[0]) {
            if (n[0] = t,
            e)
              break;
            e = !0
          } else
            n[0] === t && (e = !0);
          d(n)
        }
        if (r = getOwn(S, t),
        !e && !hasProp(O, t) && r && !r.inited) {
          if (!(!E.enforceDefine || a && getGlobal(a)))
            return i(t) ? void 0 : c(makeError("nodefine", "No define call for " + t, null, [t]));
          d([t, o.deps || [], o.exportsFn])
        }
        p()
      },
      nameToUrl: function(t, e, n) {
        var r, i, o, a, s, u, c, l, f;
        if (req.jsExtRegExp.test(t))
          l = t + (e || "");
        else {
          for (r = E.paths,
          i = E.pkgs,
          s = t.split("/"),
          u = s.length; u > 0; u -= 1) {
            if (c = s.slice(0, u).join("/"),
            o = getOwn(i, c),
            f = getOwn(r, c)) {
              isArray(f) && (f = f[0]),
              s.splice(0, u, f);
              break
            }
            if (o) {
              a = t === o.name ? o.location + "/" + o.main : o.location,
              s.splice(0, u, a);
              break
            }
          }
          l = s.join("/"),
          l += e || (/^data\:|\?/.test(l) || n ? "" : ".js"),
          l = ("/" === l.charAt(0) || l.match(/^[\w\+\.\-]+:/) ? "" : E.baseUrl) + l
        }
        return E.urlArgs ? l + ((l.indexOf("?") === -1 ? "?" : "&") + E.urlArgs) : l
      },
      load: function(t, e) {
        req.load(w, t, e)
      },
      execCb: function(t, e, n, r) {
        return e.apply(r, n)
      },
      onScriptLoad: function(t) {
        if ("load" === t.type || readyRegExp.test((t.currentTarget || t.srcElement).readyState)) {
          interactiveScript = null;
          var e = v(t);
          w.completeLoad(e.id)
        }
      },
      onScriptError: function(t) {
        var e = v(t);
        if (!i(e.id))
          return c(makeError("scripterror", "Script error for: " + e.id, t, [e.id]))
      }
    },
    w.require = w.makeRequire(),
    w
  }
  function getInteractiveScript() {
    return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function(t) {
      if ("interactive" === t.readyState)
        return interactiveScript = t
    }),
    interactiveScript)
  }
  var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.9", commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/, currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty, ap = Array.prototype, apsp = ap.splice, isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document), isWebWorker = !isBrowser && "undefined" != typeof importScripts, readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/, defContextName = "_", isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(), contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = !1;
  if ("undefined" == typeof define) {
    if ("undefined" != typeof requirejs) {
      if (isFunction(requirejs))
        return;
      cfg = requirejs,
      requirejs = void 0
    }
    "undefined" == typeof require || isFunction(require) || (cfg = require,
    require = void 0),
    req = requirejs = function(t, e, n, r) {
      var i, o, a = defContextName;
      return isArray(t) || "string" == typeof t || (o = t,
      isArray(e) ? (t = e,
      e = n,
      n = r) : t = []),
      o && o.context && (a = o.context),
      i = getOwn(contexts, a),
      i || (i = contexts[a] = req.s.newContext(a)),
      o && i.configure(o),
      i.require(t, e, n)
    }
    ,
    req.config = function(t) {
      return req(t)
    }
    ,
    req.nextTick = "undefined" != typeof setTimeout ? function(t) {
      setTimeout(t, 4)
    }
    : function(t) {
      t()
    }
    ,
    require || (require = req),
    req.version = version,
    req.jsExtRegExp = /^\/|:|\?|\.js$/,
    req.isBrowser = isBrowser,
    s = req.s = {
      contexts: contexts,
      newContext: newContext
    },
    req({}),
    each(["toUrl", "undef", "defined", "specified"], function(t) {
      req[t] = function() {
        var e = contexts[defContextName];
        return e.require[t].apply(e, arguments)
      }
    }),
    isBrowser && (head = s.head = document.getElementsByTagName("head")[0],
    baseElement = document.getElementsByTagName("base")[0],
    baseElement && (head = s.head = baseElement.parentNode)),
    req.onError = defaultOnError,
    req.createNode = function(t, e, n) {
      var r = t.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
      return r.type = t.scriptType || "text/javascript",
      r.charset = "utf-8",
      r.async = !0,
      r
    }
    ,
    req.load = function(t, e, n) {
      var r, i = t && t.config || {};
      if (isBrowser)
        return r = req.createNode(i, e, n),
        r.setAttribute("data-requirecontext", t.contextName),
        r.setAttribute("data-requiremodule", e),
        !r.attachEvent || r.attachEvent.toString && r.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (r.addEventListener("load", t.onScriptLoad, !1),
        r.addEventListener("error", t.onScriptError, !1)) : (useInteractive = !0,
        r.attachEvent("onreadystatechange", t.onScriptLoad)),
        r.src = n,
        currentlyAddingScript = r,
        baseElement ? head.insertBefore(r, baseElement) : head.appendChild(r),
        currentlyAddingScript = null,
        r;
      if (isWebWorker)
        try {
          importScripts(n),
          t.completeLoad(e)
        } catch (r) {
          t.onError(makeError("importscripts", "importScripts failed for " + e + " at " + n, r, [e]))
        }
    }
    ,
    isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function(t) {
      if (head || (head = t.parentNode),
      dataMain = t.getAttribute("data-main"))
        return mainScript = dataMain,
        cfg.baseUrl || (src = mainScript.split("/"),
        mainScript = src.pop(),
        subPath = src.length ? src.join("/") + "/" : "./",
        cfg.baseUrl = subPath),
        mainScript = mainScript.replace(jsSuffixRegExp, ""),
        req.jsExtRegExp.test(mainScript) && (mainScript = dataMain),
        cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript],
        !0
    }),
    define = function(t, e, n) {
      var r, i;
      "string" != typeof t && (n = e,
      e = t,
      t = null),
      isArray(e) || (n = e,
      e = null),
      !e && isFunction(n) && (e = [],
      n.length && (n.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(t, n) {
        e.push(n)
      }),
      e = (1 === n.length ? ["require"] : ["require", "exports", "module"]).concat(e))),
      useInteractive && (r = currentlyAddingScript || getInteractiveScript(),
      r && (t || (t = r.getAttribute("data-requiremodule")),
      i = contexts[r.getAttribute("data-requirecontext")])),
      (i ? i.defQueue : globalDefQueue).push([t, e, n])
    }
    ,
    define.amd = {
      jQuery: !0
    },
    req.exec = function(text) {
      return eval(text)
    }
    ,
    req(cfg),
    window.cfg = cfg,
    window.contexts = contexts
  }
}(this);
var Zepto = function() {
  function t(t) {
    return null == t ? String(t) : J[W.call(t)] || "object"
  }
  function e(e) {
    return "function" == t(e)
  }
  function n(t) {
    return null != t && t == t.window
  }
  function r(t) {
    return null != t && t.nodeType == t.DOCUMENT_NODE
  }
  function i(e) {
    return "object" == t(e)
  }
  function o(t) {
    return i(t) && !n(t) && t.__proto__ == Object.prototype
  }
  function a(t) {
    return t instanceof Array
  }
  function s(t) {
    return "number" == typeof t.length
  }
  function u(t) {
    return M.call(t, function(t) {
      return null != t
    })
  }
  function c(t) {
    return t.length > 0 ? S.fn.concat.apply([], t) : t
  }
  function l(t) {
    return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
  }
  function f(t) {
    return t in N ? N[t] : N[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
  }
  function h(t, e) {
    return "number" != typeof e || I[l(t)] ? e : e + "px"
  }
  function p(t) {
    var e, n;
    return q[t] || (e = C.createElement(t),
    C.body.appendChild(e),
    n = P(e, "").getPropertyValue("display"),
    e.parentNode.removeChild(e),
    "none" == n && (n = "block"),
    q[t] = n),
    q[t]
  }
  function d(t) {
    return "children"in t ? A.call(t.children) : S.map(t.childNodes, function(t) {
      if (1 == t.nodeType)
        return t
    })
  }
  function m(t, e, n) {
    for (E in e)
      n && (o(e[E]) || a(e[E])) ? (o(e[E]) && !o(t[E]) && (t[E] = {}),
      a(e[E]) && !a(t[E]) && (t[E] = []),
      m(t[E], e[E], n)) : e[E] !== _ && (t[E] = e[E])
  }
  function v(t, e) {
    return e === _ ? S(t) : S(t).filter(e)
  }
  function g(t, n, r, i) {
    return e(n) ? n.call(t, r, i) : n
  }
  function y(t, e, n) {
    null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
  }
  function b(t, e) {
    var n = t.className
      , r = n && n.baseVal !== _;
    return e === _ ? r ? n.baseVal : n : void (r ? n.baseVal = e : t.className = e)
  }
  function w(t) {
    var e;
    try {
      return t ? "true" == t || "false" != t && ("null" == t ? null : isNaN(e = Number(t)) ? /^[\[\{]/.test(t) ? S.parseJSON(t) : t : e) : t
    } catch (e) {
      return t
    }
  }
  function x(t, e) {
    e(t);
    for (var n in t.childNodes)
      x(t.childNodes[n], e)
  }
  var _, E, S, k, j, T, O = [], A = O.slice, M = O.filter, C = window.document, q = {}, N = {}, P = C.defaultView.getComputedStyle, I = {
    "column-count": 1,
    columns: 1,
    "font-weight": 1,
    "line-height": 1,
    opacity: 1,
    "z-index": 1,
    zoom: 1
  }, D = /^\s*<(\w+|!)[^>]*>/, F = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, R = /^(?:body|html)$/i, U = ["val", "css", "html", "text", "data", "width", "height", "offset"], L = ["after", "prepend", "before", "append"], $ = C.createElement("table"), B = C.createElement("tr"), z = {
    tr: C.createElement("tbody"),
    tbody: $,
    thead: $,
    tfoot: $,
    td: B,
    th: B,
    "*": C.createElement("div")
  }, H = /complete|loaded|interactive/, Z = /^\.([\w-]+)$/, V = /^#([\w-]*)$/, Y = /^[\w-]+$/, J = {}, W = J.toString, K = {}, X = C.createElement("div");
  return K.matches = function(t, e) {
    if (!t || 1 !== t.nodeType)
      return !1;
    var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
    if (n)
      return n.call(t, e);
    var r, i = t.parentNode, o = !i;
    return o && (i = X).appendChild(t),
    r = ~K.qsa(i, e).indexOf(t),
    o && X.removeChild(t),
    r
  }
  ,
  j = function(t) {
    return t.replace(/-+(.)?/g, function(t, e) {
      return e ? e.toUpperCase() : ""
    })
  }
  ,
  T = function(t) {
    return M.call(t, function(e, n) {
      return t.indexOf(e) == n
    })
  }
  ,
  K.fragment = function(t, e, n) {
    t.replace && (t = t.replace(F, "<$1></$2>")),
    e === _ && (e = D.test(t) && RegExp.$1),
    e in z || (e = "*");
    var r, i, a = z[e];
    return a.innerHTML = "" + t,
    i = S.each(A.call(a.childNodes), function() {
      a.removeChild(this)
    }),
    o(n) && (r = S(i),
    S.each(n, function(t, e) {
      U.indexOf(t) > -1 ? r[t](e) : r.attr(t, e)
    })),
    i
  }
  ,
  K.Z = function(t, e) {
    return t = t || [],
    t.__proto__ = S.fn,
    t.selector = e || "",
    t
  }
  ,
  K.isZ = function(t) {
    return t instanceof K.Z
  }
  ,
  K.init = function(t, n) {
    if (t) {
      if (e(t))
        return S(C).ready(t);
      if (K.isZ(t))
        return t;
      var r;
      if (a(t))
        r = u(t);
      else if (i(t))
        r = [o(t) ? S.extend({}, t) : t],
        t = null;
      else if (D.test(t))
        r = K.fragment(t.trim(), RegExp.$1, n),
        t = null;
      else {
        if (n !== _)
          return S(n).find(t);
        r = K.qsa(C, t)
      }
      return K.Z(r, t)
    }
    return K.Z()
  }
  ,
  S = function(t, e) {
    return K.init(t, e)
  }
  ,
  S.extend = function(t) {
    var e, n = A.call(arguments, 1);
    return "boolean" == typeof t && (e = t,
    t = n.shift()),
    n.forEach(function(n) {
      m(t, n, e)
    }),
    t
  }
  ,
  K.qsa = function(t, e) {
    var n;
    return r(t) && V.test(e) ? (n = t.getElementById(RegExp.$1)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : A.call(Z.test(e) ? t.getElementsByClassName(RegExp.$1) : Y.test(e) ? t.getElementsByTagName(e) : t.querySelectorAll(e))
  }
  ,
  S.contains = function(t, e) {
    return t !== e && t.contains(e)
  }
  ,
  S.type = t,
  S.isFunction = e,
  S.isWindow = n,
  S.isArray = a,
  S.isPlainObject = o,
  S.isEmptyObject = function(t) {
    var e;
    for (e in t)
      return !1;
    return !0
  }
  ,
  S.inArray = function(t, e, n) {
    return O.indexOf.call(e, t, n)
  }
  ,
  S.camelCase = j,
  S.trim = function(t) {
    return t.trim()
  }
  ,
  S.uuid = 0,
  S.support = {},
  S.expr = {},
  S.map = function(t, e) {
    var n, r, i, o = [];
    if (s(t))
      for (r = 0; r < t.length; r++)
        n = e(t[r], r),
        null != n && o.push(n);
    else
      for (i in t)
        n = e(t[i], i),
        null != n && o.push(n);
    return c(o)
  }
  ,
  S.each = function(t, e) {
    var n, r;
    if (s(t)) {
      for (n = 0; n < t.length; n++)
        if (e.call(t[n], n, t[n]) === !1)
          return t
    } else
      for (r in t)
        if (e.call(t[r], r, t[r]) === !1)
          return t;
    return t
  }
  ,
  S.grep = function(t, e) {
    return M.call(t, e)
  }
  ,
  window.JSON && (S.parseJSON = JSON.parse),
  S.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
    J["[object " + e + "]"] = e.toLowerCase()
  }),
  S.fn = {
    forEach: O.forEach,
    reduce: O.reduce,
    push: O.push,
    sort: O.sort,
    indexOf: O.indexOf,
    concat: O.concat,
    map: function(t) {
      return S(S.map(this, function(e, n) {
        return t.call(e, n, e)
      }))
    },
    slice: function() {
      return S(A.apply(this, arguments))
    },
    ready: function(t) {
      return H.test(C.readyState) ? t(S) : C.addEventListener("DOMContentLoaded", function() {
        t(S)
      }, !1),
      this
    },
    get: function(t) {
      return t === _ ? A.call(this) : this[t >= 0 ? t : t + this.length]
    },
    toArray: function() {
      return this.get()
    },
    size: function() {
      return this.length
    },
    remove: function() {
      return this.each(function() {
        null != this.parentNode && this.parentNode.removeChild(this)
      })
    },
    each: function(t) {
      return O.every.call(this, function(e, n) {
        return t.call(e, n, e) !== !1
      }),
      this
    },
    filter: function(t) {
      return e(t) ? this.not(this.not(t)) : S(M.call(this, function(e) {
        return K.matches(e, t)
      }))
    },
    add: function(t, e) {
      return S(T(this.concat(S(t, e))))
    },
    is: function(t) {
      return this.length > 0 && K.matches(this[0], t)
    },
    not: function(t) {
      var n = [];
      if (e(t) && t.call !== _)
        this.each(function(e) {
          t.call(this, e) || n.push(this)
        });
      else {
        var r = "string" == typeof t ? this.filter(t) : s(t) && e(t.item) ? A.call(t) : S(t);
        this.forEach(function(t) {
          r.indexOf(t) < 0 && n.push(t)
        })
      }
      return S(n)
    },
    has: function(t) {
      return this.filter(function() {
        return i(t) ? S.contains(this, t) : S(this).find(t).size()
      })
    },
    eq: function(t) {
      return t === -1 ? this.slice(t) : this.slice(t, +t + 1)
    },
    first: function() {
      var t = this[0];
      return t && !i(t) ? t : S(t)
    },
    last: function() {
      var t = this[this.length - 1];
      return t && !i(t) ? t : S(t)
    },
    find: function(t) {
      var e, n = this;
      return e = "object" == typeof t ? S(t).filter(function() {
        var t = this;
        return O.some.call(n, function(e) {
          return S.contains(e, t)
        })
      }) : 1 == this.length ? S(K.qsa(this[0], t)) : this.map(function() {
        return K.qsa(this, t)
      })
    },
    closest: function(t, e) {
      var n = this[0]
        , i = !1;
      for ("object" == typeof t && (i = S(t)); n && !(i ? i.indexOf(n) >= 0 : K.matches(n, t)); )
        n = n !== e && !r(n) && n.parentNode;
      return S(n)
    },
    parents: function(t) {
      for (var e = [], n = this; n.length > 0; )
        n = S.map(n, function(t) {
          if ((t = t.parentNode) && !r(t) && e.indexOf(t) < 0)
            return e.push(t),
            t
        });
      return v(e, t)
    },
    parent: function(t) {
      return v(T(this.pluck("parentNode")), t)
    },
    children: function(t) {
      return v(this.map(function() {
        return d(this)
      }), t)
    },
    contents: function() {
      return this.map(function() {
        return A.call(this.childNodes)
      })
    },
    siblings: function(t) {
      return v(this.map(function(t, e) {
        return M.call(d(e.parentNode), function(t) {
          return t !== e
        })
      }), t)
    },
    empty: function() {
      return this.each(function() {
        this.innerHTML = ""
      })
    },
    pluck: function(t) {
      return S.map(this, function(e) {
        return e[t]
      })
    },
    show: function() {
      return this.each(function() {
        "none" == this.style.display && (this.style.display = null),
        "none" == P(this, "").getPropertyValue("display") && (this.style.display = p(this.nodeName))
      })
    },
    replaceWith: function(t) {
      return this.before(t).remove()
    },
    wrap: function(t) {
      var n = e(t);
      if (this[0] && !n)
        var r = S(t).get(0)
          , i = r.parentNode || this.length > 1;
      return this.each(function(e) {
        S(this).wrapAll(n ? t.call(this, e) : i ? r.cloneNode(!0) : r)
      })
    },
    wrapAll: function(t) {
      if (this[0]) {
        S(this[0]).before(t = S(t));
        for (var e; (e = t.children()).length; )
          t = e.first();
        S(t).append(this)
      }
      return this
    },
    wrapInner: function(t) {
      var n = e(t);
      return this.each(function(e) {
        var r = S(this)
          , i = r.contents()
          , o = n ? t.call(this, e) : t;
        i.length ? i.wrapAll(o) : r.append(o)
      })
    },
    unwrap: function() {
      return this.parent().each(function() {
        S(this).replaceWith(S(this).children())
      }),
      this
    },
    clone: function() {
      return this.map(function() {
        return this.cloneNode(!0)
      })
    },
    hide: function() {
      return this.css("display", "none")
    },
    toggle: function(t) {
      return this.each(function() {
        var e = S(this);
        (t === _ ? "none" == e.css("display") : t) ? e.show() : e.hide()
      })
    },
    prev: function(t) {
      return S(this.pluck("previousElementSibling")).filter(t || "*")
    },
    next: function(t) {
      return S(this.pluck("nextElementSibling")).filter(t || "*")
    },
    html: function(t) {
      return t === _ ? this.length > 0 ? this[0].innerHTML : null : this.each(function(e) {
        var n = this.innerHTML;
        S(this).empty().append(g(this, t, e, n))
      })
    },
    text: function(t) {
      return t === _ ? this.length > 0 ? this[0].textContent : null : this.each(function() {
        this.textContent = t
      })
    },
    attr: function(t, e) {
      var n;
      return "string" == typeof t && e === _ ? 0 == this.length || 1 !== this[0].nodeType ? _ : "value" == t && "INPUT" == this[0].nodeName ? this.val() : !(n = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : n : this.each(function(n) {
        if (1 === this.nodeType)
          if (i(t))
            for (E in t)
              y(this, E, t[E]);
          else
            y(this, t, g(this, e, n, this.getAttribute(t)))
      })
    },
    removeAttr: function(t) {
      return this.each(function() {
        1 === this.nodeType && y(this, t)
      })
    },
    prop: function(t, e) {
      return e === _ ? this[0] && this[0][t] : this.each(function(n) {
        this[t] = g(this, e, n, this[t])
      })
    },
    data: function(t, e) {
      var n = this.attr("data-" + l(t), e);
      return null !== n ? w(n) : _
    },
    val: function(t) {
      return t === _ ? this[0] && (this[0].multiple ? S(this[0]).find("option").filter(function(t) {
        return this.selected
      }).pluck("value") : this[0].value) : this.each(function(e) {
        this.value = g(this, t, e, this.value)
      })
    },
    offset: function(t) {
      if (t)
        return this.each(function(e) {
          var n = S(this)
            , r = g(this, t, e, n.offset())
            , i = n.offsetParent().offset()
            , o = {
            top: r.top - i.top,
            left: r.left - i.left
          };
          "static" == n.css("position") && (o.position = "relative"),
          n.css(o)
        });
      if (0 == this.length)
        return null;
      var e = this[0].getBoundingClientRect();
      return {
        left: e.left + window.pageXOffset,
        top: e.top + window.pageYOffset,
        width: Math.round(e.width),
        height: Math.round(e.height)
      }
    },
    css: function(e, n) {
      if (arguments.length < 2 && "string" == typeof e)
        return this[0] && (this[0].style[j(e)] || P(this[0], "").getPropertyValue(e));
      var r = "";
      if ("string" == t(e))
        n || 0 === n ? r = l(e) + ":" + h(e, n) : this.each(function() {
          this.style.removeProperty(l(e))
        });
      else
        for (E in e)
          e[E] || 0 === e[E] ? r += l(E) + ":" + h(E, e[E]) + ";" : this.each(function() {
            this.style.removeProperty(l(E))
          });
      return this.each(function() {
        this.style.cssText += ";" + r
      })
    },
    index: function(t) {
      return t ? this.indexOf(S(t)[0]) : this.parent().children().indexOf(this[0])
    },
    hasClass: function(t) {
      return O.some.call(this, function(t) {
        return this.test(b(t))
      }, f(t))
    },
    addClass: function(t) {
      return this.each(function(e) {
        k = [];
        var n = b(this)
          , r = g(this, t, e, n);
        r.split(/\s+/g).forEach(function(t) {
          S(this).hasClass(t) || k.push(t)
        }, this),
        k.length && b(this, n + (n ? " " : "") + k.join(" "))
      })
    },
    removeClass: function(t) {
      return this.each(function(e) {
        return t === _ ? b(this, "") : (k = b(this),
        g(this, t, e, k).split(/\s+/g).forEach(function(t) {
          k = k.replace(f(t), " ")
        }),
        void b(this, k.trim()))
      })
    },
    toggleClass: function(t, e) {
      return this.each(function(n) {
        var r = S(this)
          , i = g(this, t, n, b(this));
        i.split(/\s+/g).forEach(function(t) {
          (e === _ ? !r.hasClass(t) : e) ? r.addClass(t) : r.removeClass(t)
        })
      })
    },
    scrollTop: function() {
      if (this.length)
        return "scrollTop"in this[0] ? this[0].scrollTop : this[0].scrollY
    },
    position: function() {
      if (this.length) {
        var t = this[0]
          , e = this.offsetParent()
          , n = this.offset()
          , r = R.test(e[0].nodeName) ? {
          top: 0,
          left: 0
        } : e.offset();
        return n.top -= parseFloat(S(t).css("margin-top")) || 0,
        n.left -= parseFloat(S(t).css("margin-left")) || 0,
        r.top += parseFloat(S(e[0]).css("border-top-width")) || 0,
        r.left += parseFloat(S(e[0]).css("border-left-width")) || 0,
        {
          top: n.top - r.top,
          left: n.left - r.left
        }
      }
    },
    offsetParent: function() {
      return this.map(function() {
        for (var t = this.offsetParent || C.body; t && !R.test(t.nodeName) && "static" == S(t).css("position"); )
          t = t.offsetParent;
        return t
      })
    }
  },
  S.fn.detach = S.fn.remove,
  ["width", "height"].forEach(function(t) {
    S.fn[t] = function(e) {
      var i, o = this[0], a = t.replace(/./, function(t) {
        return t[0].toUpperCase()
      });
      return e === _ ? n(o) ? o["inner" + a] : r(o) ? o.documentElement["offset" + a] : (i = this.offset()) && i[t] : this.each(function(n) {
        o = S(this),
        o.css(t, g(this, e, n, o[t]()))
      })
    }
  }),
  L.forEach(function(e, n) {
    var r = n % 2;
    S.fn[e] = function() {
      var e, i, o = S.map(arguments, function(n) {
        return e = t(n),
        "object" == e || "array" == e || null == n ? n : K.fragment(n)
      }), a = this.length > 1;
      return o.length < 1 ? this : this.each(function(t, e) {
        i = r ? e : e.parentNode,
        e = 0 == n ? e.nextSibling : 1 == n ? e.firstChild : 2 == n ? e : null,
        o.forEach(function(t) {
          if (a)
            t = t.cloneNode(!0);
          else if (!i)
            return S(t).remove();
          x(i.insertBefore(t, e), function(t) {
            null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
          })
        })
      })
    }
    ,
    S.fn[r ? e + "To" : "insert" + (n ? "Before" : "After")] = function(t) {
      return S(t)[e](this),
      this
    }
  }),
  K.Z.prototype = S.fn,
  K.uniq = T,
  K.deserializeValue = w,
  S.zepto = K,
  S
}();
window.Zepto = Zepto,
void 0 === window.$ && (window.$ = Zepto),
function(t) {
  function e(t) {
    var e = this.os = {}
      , n = this.browser = {}
      , r = t.match(/Web[kK]it[\/]{0,1}([\d.]+)/)
      , i = t.match(/(Android);?[\s\/]+([\d.]+)?/)
      , o = t.match(/(iPad).*OS\s([\d_]+)/)
      , a = t.match(/(iPod)(.*OS\s([\d_]+))?/)
      , s = !o && t.match(/(iPhone\sOS)\s([\d_]+)/)
      , u = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/)
      , c = u && t.match(/TouchPad/)
      , l = t.match(/Kindle\/([\d.]+)/)
      , f = t.match(/Silk\/([\d._]+)/)
      , h = t.match(/(BlackBerry).*Version\/([\d.]+)/)
      , p = t.match(/(BB10).*Version\/([\d.]+)/)
      , d = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/)
      , m = t.match(/PlayBook/)
      , v = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/)
      , g = t.match(/Firefox\/([\d.]+)/)
      , y = t.match(/MSIE\s([\d.]+)/)
      , b = r && t.match(/Mobile\//) && !v
      , w = t.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !v;
    (n.webkit = !!r) && (n.version = r[1]),
    i && (e.android = !0,
    e.version = i[2]),
    s && !a && (e.ios = e.iphone = !0,
    e.version = s[2].replace(/_/g, ".")),
    o && (e.ios = e.ipad = !0,
    e.version = o[2].replace(/_/g, ".")),
    a && (e.ios = e.ipod = !0,
    e.version = a[3] ? a[3].replace(/_/g, ".") : null),
    u && (e.webos = !0,
    e.version = u[2]),
    c && (e.touchpad = !0),
    h && (e.blackberry = !0,
    e.version = h[2]),
    p && (e.bb10 = !0,
    e.version = p[2]),
    d && (e.rimtabletos = !0,
    e.version = d[2]),
    m && (n.playbook = !0),
    l && (e.kindle = !0,
    e.version = l[1]),
    f && (n.silk = !0,
    n.version = f[1]),
    !f && e.android && t.match(/Kindle Fire/) && (n.silk = !0),
    v && (n.chrome = !0,
    n.version = v[1]),
    g && (n.firefox = !0,
    n.version = g[1]),
    y && (n.ie = !0,
    n.version = y[1]),
    b && (t.match(/Safari/) || e.ios) && (n.safari = !0),
    w && (n.webview = !0),
    e.tablet = !!(o || m || i && !t.match(/Mobile/) || g && t.match(/Tablet/) || y && !t.match(/Phone/) && t.match(/Touch/)),
    e.phone = !(e.tablet || e.ipod || !(i || s || u || h || p || v && t.match(/Android/) || v && t.match(/CriOS\/([\d.]+)/) || g && t.match(/Mobile/) || y && t.match(/Touch/)))
  }
  e.call(t, navigator.userAgent),
  t.__detect = e
}(Zepto),
function(t) {
  function e(t) {
    return t._zid || (t._zid = h++)
  }
  function n(t, n, o, a) {
    if (n = r(n),
    n.ns)
      var s = i(n.ns);
    return (v[e(t)] || []).filter(function(t) {
      return t && (!n.e || t.e == n.e) && (!n.ns || s.test(t.ns)) && (!o || e(t.fn) === e(o)) && (!a || t.sel == a)
    })
  }
  function r(t) {
    var e = ("" + t).split(".");
    return {
      e: e[0],
      ns: e.slice(1).sort().join(" ")
    }
  }
  function i(t) {
    return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
  }
  function o(t, e) {
    return t.del && !y && t.e in b || !!e
  }
  function a(t) {
    return w[t] || y && b[t] || t
  }
  function s(n, i, s, u, l, h, p) {
    var d = e(n)
      , m = v[d] || (v[d] = []);
    i.split(/\s/).forEach(function(e) {
      if ("ready" == e)
        return t(document).ready(s);
      var i = r(e);
      i.fn = s,
      i.sel = l,
      i.e in w && (s = function(e) {
        var n = e.relatedTarget;
        if (!n || n !== this && !t.contains(this, n))
          return i.fn.apply(this, arguments)
      }
      ),
      i.del = h;
      var d = h || s;
      i.proxy = function(t) {
        if (t = c(t),
        !t.isImmediatePropagationStopped()) {
          t.data = u;
          var e = d.apply(n, t._args == f ? [t] : [t].concat(t._args));
          return e === !1 && (t.preventDefault(),
          t.stopPropagation()),
          e
        }
      }
      ,
      i.i = m.length,
      m.push(i),
      "addEventListener"in n && n.addEventListener(a(i.e), i.proxy, o(i, p))
    })
  }
  function u(t, r, i, s, u) {
    var c = e(t);
    (r || "").split(/\s/).forEach(function(e) {
      n(t, e, i, s).forEach(function(e) {
        delete v[c][e.i],
        "removeEventListener"in t && t.removeEventListener(a(e.e), e.proxy, o(e, u))
      })
    })
  }
  function c(e, n) {
    return !n && e.isDefaultPrevented || (n || (n = e),
    t.each(S, function(t, r) {
      var i = n[t];
      e[t] = function() {
        return this[r] = x,
        i && i.apply(n, arguments)
      }
      ,
      e[r] = _
    }),
    (n.defaultPrevented !== f ? n.defaultPrevented : "returnValue"in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (e.isDefaultPrevented = x)),
    e
  }
  function l(t) {
    var e, n = {
      originalEvent: t
    };
    for (e in t)
      E.test(e) || t[e] === f || (n[e] = t[e]);
    return c(n, t)
  }
  var f, h = 1, p = Array.prototype.slice, d = t.isFunction, m = function(t) {
    return "string" == typeof t
  }, v = {}, g = {}, y = "onfocusin"in window, b = {
    focus: "focusin",
    blur: "focusout"
  }, w = {
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  };
  g.click = g.mousedown = g.mouseup = g.mousemove = "MouseEvents",
  t.event = {
    add: s,
    remove: u
  },
  t.proxy = function(n, r) {
    if (d(n)) {
      var i = function() {
        return n.apply(r, arguments)
      };
      return i._zid = e(n),
      i
    }
    if (m(r))
      return t.proxy(n[r], n);
    throw new TypeError("expected function")
  }
  ,
  t.fn.bind = function(t, e, n) {
    return this.on(t, e, n)
  }
  ,
  t.fn.unbind = function(t, e) {
    return this.off(t, e)
  }
  ,
  t.fn.one = function(t, e, n, r) {
    return this.on(t, e, n, r, 1)
  }
  ;
  var x = function() {
    return !0
  }
    , _ = function() {
    return !1
  }
    , E = /^([A-Z]|returnValue$|layer[XY]$)/
    , S = {
    preventDefault: "isDefaultPrevented",
    stopImmediatePropagation: "isImmediatePropagationStopped",
    stopPropagation: "isPropagationStopped"
  };
  t.fn.delegate = function(t, e, n) {
    return this.on(e, t, n)
  }
  ,
  t.fn.undelegate = function(t, e, n) {
    return this.off(e, t, n)
  }
  ,
  t.fn.live = function(e, n) {
    return t(document.body).delegate(this.selector, e, n),
    this
  }
  ,
  t.fn.die = function(e, n) {
    return t(document.body).undelegate(this.selector, e, n),
    this
  }
  ,
  t.fn.on = function(e, n, r, i, o) {
    var a, c, h = this;
    return e && !m(e) ? (t.each(e, function(t, e) {
      h.on(t, n, r, e, o)
    }),
    h) : (m(n) || d(i) || i === !1 || (i = r,
    r = n,
    n = f),
    (d(r) || r === !1) && (i = r,
    r = f),
    i === !1 && (i = _),
    h.each(function(f, h) {
      o && (a = function(t) {
        return u(h, t.type, i),
        i.apply(this, arguments)
      }
      ),
      n && (c = function(e) {
        var r, o = t(e.target).closest(n, h).get(0);
        if (o && o !== h)
          return r = t.extend(l(e), {
            currentTarget: o,
            liveFired: h
          }),
          (a || i).apply(o, [r].concat(p.call(arguments, 1)))
      }
      ),
      s(h, e, i, r, n, c || a)
    }))
  }
  ,
  t.fn.off = function(e, n, r) {
    var i = this;
    return e && !m(e) ? (t.each(e, function(t, e) {
      i.off(t, n, e)
    }),
    i) : (m(n) || d(r) || r === !1 || (r = n,
    n = f),
    r === !1 && (r = _),
    i.each(function() {
      u(this, e, r, n)
    }))
  }
  ,
  t.fn.trigger = function(e, n) {
    return e = m(e) || t.isPlainObject(e) ? t.Event(e) : c(e),
    e._args = n,
    this.each(function() {
      "dispatchEvent"in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n)
    })
  }
  ,
  t.fn.triggerHandler = function(e, r) {
    var i, o;
    return this.each(function(a, s) {
      i = l(m(e) ? t.Event(e) : e),
      i._args = r,
      i.target = s,
      t.each(n(s, e.type || e), function(t, e) {
        if (o = e.proxy(i),
        i.isImmediatePropagationStopped())
          return !1
      })
    }),
    o
  }
  ,
  "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e) {
    t.fn[e] = function(t) {
      return t ? this.bind(e, t) : this.trigger(e)
    }
  }),
  ["focus", "blur"].forEach(function(e) {
    t.fn[e] = function(t) {
      return t ? this.bind(e, t) : this.each(function() {
        try {
          this[e]()
        } catch (t) {}
      }),
      this
    }
  }),
  t.Event = function(t, e) {
    m(t) || (e = t,
    t = e.type);
    var n = document.createEvent(g[t] || "Events")
      , r = !0;
    if (e)
      for (var i in e)
        "bubbles" == i ? r = !!e[i] : n[i] = e[i];
    return n.initEvent(t, r, !0),
    c(n)
  }
}(Zepto),
function(t) {
  function e(e, n, r) {
    var i = t.Event(n);
    return t(e).trigger(i, r),
    !i.isDefaultPrevented()
  }
  function n(t, n, r, i) {
    if (t.global)
      return e(n || y, r, i)
  }
  function r(e) {
    e.global && 0 === t.active++ && n(e, null, "ajaxStart")
  }
  function i(e) {
    e.global && !--t.active && n(e, null, "ajaxStop")
  }
  function o(t, e) {
    var r = e.context;
    return e.beforeSend.call(r, t, e) !== !1 && n(e, r, "ajaxBeforeSend", [t, e]) !== !1 && void n(e, r, "ajaxSend", [t, e])
  }
  function a(t, e, r, i) {
    var o = r.context
      , a = "success";
    r.success.call(o, t, a, e),
    i && i.resolveWith(o, [t, a, e]),
    n(r, o, "ajaxSuccess", [e, r, t]),
    u(a, e, r)
  }
  function s(t, e, r, i, o) {
    var a = i.context;
    i.error.call(a, r, e, t),
    o && o.rejectWith(a, [r, e, t]),
    n(i, a, "ajaxError", [r, i, t || e]),
    u(e, r, i)
  }
  function u(t, e, r) {
    var o = r.context;
    r.complete.call(o, e, t),
    n(r, o, "ajaxComplete", [e, r]),
    i(r)
  }
  function c() {}
  function l(t) {
    return t && (t = t.split(";", 2)[0]),
    t && (t == E ? "html" : t == _ ? "json" : w.test(t) ? "script" : x.test(t) && "xml") || "text"
  }
  function f(t, e) {
    return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
  }
  function h(e) {
    e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)),
    !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = f(e.url, e.data),
    e.data = void 0)
  }
  function p(e, n, r, i) {
    return t.isFunction(n) && (i = r,
    r = n,
    n = void 0),
    t.isFunction(r) || (i = r,
    r = void 0),
    {
      url: e,
      data: n,
      success: r,
      dataType: i
    }
  }
  function d(e, n, r, i) {
    var o, a = t.isArray(n), s = t.isPlainObject(n);
    t.each(n, function(n, u) {
      o = t.type(u),
      i && (n = r ? i : i + "[" + (s || "object" == o || "array" == o ? n : "") + "]"),
      !i && a ? e.add(u.name, u.value) : "array" == o || !r && "object" == o ? d(e, u, r, n) : e.add(n, u)
    })
  }
  var m, v, g = 0, y = window.document, b = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, w = /^(?:text|application)\/javascript/i, x = /^(?:text|application)\/xml/i, _ = "application/json", E = "text/html", S = /^\s*$/;
  t.active = 0,
  t.ajaxJSONP = function(e, n) {
    if (!("type"in e))
      return t.ajax(e);
    var r, i, u = e.jsonpCallback, c = (t.isFunction(u) ? u() : u) || "jsonp" + ++g, l = y.createElement("script"), f = window[c], h = function(e) {
      t(l).triggerHandler("error", e || "abort")
    }, p = {
      abort: h
    };
    return n && n.promise(p),
    t(l).on("load error", function(o, u) {
      clearTimeout(i),
      t(l).off().remove(),
      "error" != o.type && r ? a(r[0], p, e, n) : s(null, u || "error", p, e, n),
      window[c] = f,
      r && t.isFunction(f) && f(r[0]),
      f = r = void 0
    }),
    o(p, e) === !1 ? (h("abort"),
    p) : (window[c] = function() {
      r = arguments
    }
    ,
    l.src = e.url.replace(/\?(.+)=\?/, "?$1=" + c),
    y.head.appendChild(l),
    e.timeout > 0 && (i = setTimeout(function() {
      h("timeout")
    }, e.timeout)),
    p)
  }
  ,
  t.ajaxSettings = {
    type: "GET",
    beforeSend: c,
    success: c,
    error: c,
    complete: c,
    context: null,
    global: !0,
    xhr: function() {
      return new window.XMLHttpRequest
    },
    accepts: {
      script: "text/javascript, application/javascript, application/x-javascript",
      json: _,
      xml: "application/xml, text/xml",
      html: E,
      text: "text/plain"
    },
    crossDomain: !1,
    timeout: 0,
    processData: !0,
    cache: !0
  },
  t.ajax = function(e) {
    var n = t.extend({}, e || {})
      , i = t.Deferred && t.Deferred();
    for (m in t.ajaxSettings)
      void 0 === n[m] && (n[m] = t.ajaxSettings[m]);
    r(n),
    n.crossDomain || (n.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(n.url) && RegExp.$2 != window.location.host),
    n.url || (n.url = window.location.toString()),
    h(n),
    n.cache === !1 && (n.url = f(n.url, "_=" + Date.now()));
    var u = n.dataType
      , p = /\?.+=\?/.test(n.url);
    if ("jsonp" == u || p)
      return p || (n.url = f(n.url, n.jsonp ? n.jsonp + "=?" : n.jsonp === !1 ? "" : "callback=?")),
      t.ajaxJSONP(n, i);
    var d, g = n.accepts[u], y = {}, b = function(t, e) {
      y[t.toLowerCase()] = [t, e]
    }, w = /^([\w-]+:)\/\//.test(n.url) ? RegExp.$1 : window.location.protocol, x = n.xhr(), _ = x.setRequestHeader;
    if (i && i.promise(x),
    n.crossDomain || b("X-Requested-With", "XMLHttpRequest"),
    b("Accept", g || "*/*"),
    (g = n.mimeType || g) && (g.indexOf(",") > -1 && (g = g.split(",", 2)[0]),
    x.overrideMimeType && x.overrideMimeType(g)),
    (n.contentType || n.contentType !== !1 && n.data && "GET" != n.type.toUpperCase()) && b("Content-Type", n.contentType || "application/x-www-form-urlencoded"),
    n.headers)
      for (v in n.headers)
        b(v, n.headers[v]);
    if (x.setRequestHeader = b,
    x.onreadystatechange = function() {
      if (4 == x.readyState) {
        x.onreadystatechange = c,
        clearTimeout(d);
        var e, r = !1;
        if (x.status >= 200 && x.status < 300 || 304 == x.status || 0 == x.status && "file:" == w) {
          u = u || l(n.mimeType || x.getResponseHeader("content-type")),
          e = x.responseText;
          try {
            "script" == u ? (0,
            eval)(e) : "xml" == u ? e = x.responseXML : "json" == u && (e = S.test(e) ? null : t.parseJSON(e))
          } catch (t) {
            r = t
          }
          r ? s(r, "parsererror", x, n, i) : a(e, x, n, i)
        } else
          s(x.statusText || null, x.status ? "error" : "abort", x, n, i)
      }
    }
    ,
    o(x, n) === !1)
      return x.abort(),
      s(null, "abort", x, n, i),
      x;
    if (n.xhrFields)
      for (v in n.xhrFields)
        x[v] = n.xhrFields[v];
    var E = !("async"in n) || n.async;
    x.open(n.type, n.url, E, n.username, n.password);
    for (v in y)
      _.apply(x, y[v]);
    return n.timeout > 0 && (d = setTimeout(function() {
      x.onreadystatechange = c,
      x.abort(),
      s(null, "timeout", x, n, i)
    }, n.timeout)),
    x.send(n.data ? n.data : null),
    x
  }
  ,
  t.get = function() {
    return t.ajax(p.apply(null, arguments))
  }
  ,
  t.post = function() {
    var e = p.apply(null, arguments);
    return e.type = "POST",
    t.ajax(e)
  }
  ,
  t.getJSON = function() {
    var e = p.apply(null, arguments);
    return e.dataType = "json",
    t.ajax(e)
  }
  ,
  t.fn.load = function(e, n, r) {
    if (!this.length)
      return this;
    var i, o = this, a = e.split(/\s/), s = p(e, n, r), u = s.success;
    return a.length > 1 && (s.url = a[0],
    i = a[1]),
    s.success = function(e) {
      o.html(i ? t("<div>").html(e.replace(b, "")).find(i) : e),
      u && u.apply(o, arguments)
    }
    ,
    t.ajax(s),
    this
  }
  ;
  var k = encodeURIComponent;
  t.param = function(t, e) {
    var n = [];
    return n.add = function(t, e) {
      this.push(k(t) + "=" + k(e))
    }
    ,
    d(n, t, e),
    n.join("&").replace(/%20/g, "+")
  }
}(Zepto),
function(t) {
  t.fn.serializeArray = function() {
    var e, n = [];
    return t([].slice.call(this.get(0).elements)).each(function() {
      e = t(this);
      var r = e.attr("type");
      "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != r && "reset" != r && "button" != r && ("radio" != r && "checkbox" != r || this.checked) && n.push({
        name: e.attr("name"),
        value: e.val()
      })
    }),
    n
  }
  ,
  t.fn.serialize = function() {
    var t = [];
    return this.serializeArray().forEach(function(e) {
      t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
    }),
    t.join("&")
  }
  ,
  t.fn.submit = function(e) {
    if (e)
      this.bind("submit", e);
    else if (this.length) {
      var n = t.Event("submit");
      this.eq(0).trigger(n),
      n.isDefaultPrevented() || this.get(0).submit()
    }
    return this
  }
}(Zepto),
function(t, e) {
  function n(t) {
    return t.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
  }
  function r(t) {
    return i ? i + t : t.toLowerCase()
  }
  var i, o, a, s, u, c, l, f, h, p, d = "", m = {
    Webkit: "webkit",
    Moz: "",
    O: "o"
  }, v = window.document, g = v.createElement("div"), y = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, b = {};
  t.each(m, function(t, n) {
    if (g.style[t + "TransitionProperty"] !== e)
      return d = "-" + t.toLowerCase() + "-",
      i = n,
      !1
  }),
  o = d + "transform",
  b[a = d + "transition-property"] = b[s = d + "transition-duration"] = b[c = d + "transition-delay"] = b[u = d + "transition-timing-function"] = b[l = d + "animation-name"] = b[f = d + "animation-duration"] = b[p = d + "animation-delay"] = b[h = d + "animation-timing-function"] = "",
  t.fx = {
    off: i === e && g.style.transitionProperty === e,
    speeds: {
      _default: 400,
      fast: 200,
      slow: 600
    },
    cssPrefix: d,
    transitionEnd: r("TransitionEnd"),
    animationEnd: r("AnimationEnd")
  },
  t.fn.animate = function(n, r, i, o, a) {
    return t.isFunction(r) && (o = r,
    i = e,
    r = e),
    t.isFunction(i) && (o = i,
    i = e),
    t.isPlainObject(r) && (i = r.easing,
    o = r.complete,
    a = r.delay,
    r = r.duration),
    r && (r = ("number" == typeof r ? r : t.fx.speeds[r] || t.fx.speeds._default) / 1e3),
    a && (a = parseFloat(a) / 1e3),
    this.anim(n, r, i, o, a)
  }
  ,
  t.fn.anim = function(r, i, d, m, v) {
    var g, w, x, _ = {}, E = "", S = this, k = t.fx.transitionEnd, j = !1;
    if (i === e && (i = t.fx.speeds._default / 1e3),
    v === e && (v = 0),
    t.fx.off && (i = 0),
    "string" == typeof r)
      _[l] = r,
      _[f] = i + "s",
      _[p] = v + "s",
      _[h] = d || "linear",
      k = t.fx.animationEnd;
    else {
      w = [];
      for (g in r)
        y.test(g) ? E += g + "(" + r[g] + ") " : (_[g] = r[g],
        w.push(n(g)));
      E && (_[o] = E,
      w.push(o)),
      i > 0 && "object" == typeof r && (_[a] = w.join(", "),
      _[s] = i + "s",
      _[c] = v + "s",
      _[u] = d || "linear")
    }
    return x = function(e) {
      if ("undefined" != typeof e) {
        if (e.target !== e.currentTarget)
          return;
        t(e.target).unbind(k, x)
      } else
        t(this).unbind(k, x);
      j = !0,
      t(this).css(b),
      m && m.call(this)
    }
    ,
    i > 0 && (this.bind(k, x),
    setTimeout(function() {
      j || x.call(S)
    }, 1e3 * i + 25)),
    this.size() && this.get(0).clientLeft,
    this.css(_),
    i <= 0 && setTimeout(function() {
      S.each(function() {
        x.call(this)
      })
    }, 0),
    this
  }
  ,
  g = null
}(Zepto),
function() {
  function t(t) {
    function e(e, n, r, i, o, a) {
      for (; o >= 0 && o < a; o += t) {
        var s = i ? i[o] : o;
        r = n(r, e[s], s, e)
      }
      return r
    }
    return function(n, r, i, o) {
      r = b(r, o, 4);
      var a = !j(n) && y.keys(n)
        , s = (a || n).length
        , u = t > 0 ? 0 : s - 1;
      return arguments.length < 3 && (i = n[a ? a[u] : u],
      u += t),
      e(n, r, i, a, u, s)
    }
  }
  function e(t) {
    return function(e, n, r) {
      n = w(n, r);
      for (var i = k(e), o = t > 0 ? 0 : i - 1; o >= 0 && o < i; o += t)
        if (n(e[o], o, e))
          return o;
      return -1
    }
  }
  function n(t, e, n) {
    return function(r, i, o) {
      var a = 0
        , s = k(r);
      if ("number" == typeof o)
        t > 0 ? a = o >= 0 ? o : Math.max(o + s, a) : s = o >= 0 ? Math.min(o + 1, s) : o + s + 1;
      else if (n && o && s)
        return o = n(r, i),
        r[o] === i ? o : -1;
      if (i !== i)
        return o = e(l.call(r, a, s), y.isNaN),
        o >= 0 ? o + a : -1;
      for (o = t > 0 ? a : s - 1; o >= 0 && o < s; o += t)
        if (r[o] === i)
          return o;
      return -1
    }
  }
  function r(t, e) {
    var n = C.length
      , r = t.constructor
      , i = y.isFunction(r) && r.prototype || s
      , o = "constructor";
    for (y.has(t, o) && !y.contains(e, o) && e.push(o); n--; )
      o = C[n],
      o in t && t[o] !== i[o] && !y.contains(e, o) && e.push(o)
  }
  var i = this
    , o = i._
    , a = Array.prototype
    , s = Object.prototype
    , u = Function.prototype
    , c = a.push
    , l = a.slice
    , f = s.toString
    , h = s.hasOwnProperty
    , p = Array.isArray
    , d = Object.keys
    , m = u.bind
    , v = Object.create
    , g = function() {}
    , y = function(t) {
    return t instanceof y ? t : this instanceof y ? void (this._wrapped = t) : new y(t)
  };
  "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = y),
  exports._ = y) : i._ = y,
  y.VERSION = "1.8.3";
  var b = function(t, e, n) {
    if (void 0 === e)
      return t;
    switch (null == n ? 3 : n) {
    case 1:
      return function(n) {
        return t.call(e, n)
      }
      ;
    case 2:
      return function(n, r) {
        return t.call(e, n, r)
      }
      ;
    case 3:
      return function(n, r, i) {
        return t.call(e, n, r, i)
      }
      ;
    case 4:
      return function(n, r, i, o) {
        return t.call(e, n, r, i, o)
      }
    }
    return function() {
      return t.apply(e, arguments)
    }
  }
    , w = function(t, e, n) {
    return null == t ? y.identity : y.isFunction(t) ? b(t, e, n) : y.isObject(t) ? y.matcher(t) : y.property(t)
  };
  y.iteratee = function(t, e) {
    return w(t, e, 1 / 0)
  }
  ;
  var x = function(t, e) {
    return function(n) {
      var r = arguments.length;
      if (r < 2 || null == n)
        return n;
      for (var i = 1; i < r; i++)
        for (var o = arguments[i], a = t(o), s = a.length, u = 0; u < s; u++) {
          var c = a[u];
          e && void 0 !== n[c] || (n[c] = o[c])
        }
      return n
    }
  }
    , _ = function(t) {
    if (!y.isObject(t))
      return {};
    if (v)
      return v(t);
    g.prototype = t;
    var e = new g;
    return g.prototype = null,
    e
  }
    , E = function(t) {
    return function(e) {
      return null == e ? void 0 : e[t]
    }
  }
    , S = Math.pow(2, 53) - 1
    , k = E("length")
    , j = function(t) {
    var e = k(t);
    return "number" == typeof e && e >= 0 && e <= S
  };
  y.each = y.forEach = function(t, e, n) {
    e = b(e, n);
    var r, i;
    if (j(t))
      for (r = 0,
      i = t.length; r < i; r++)
        e(t[r], r, t);
    else {
      var o = y.keys(t);
      for (r = 0,
      i = o.length; r < i; r++)
        e(t[o[r]], o[r], t)
    }
    return t
  }
  ,
  y.map = y.collect = function(t, e, n) {
    e = w(e, n);
    for (var r = !j(t) && y.keys(t), i = (r || t).length, o = Array(i), a = 0; a < i; a++) {
      var s = r ? r[a] : a;
      o[a] = e(t[s], s, t)
    }
    return o
  }
  ,
  y.reduce = y.foldl = y.inject = t(1),
  y.reduceRight = y.foldr = t(-1),
  y.find = y.detect = function(t, e, n) {
    var r;
    if (r = j(t) ? y.findIndex(t, e, n) : y.findKey(t, e, n),
    void 0 !== r && r !== -1)
      return t[r]
  }
  ,
  y.filter = y.select = function(t, e, n) {
    var r = [];
    return e = w(e, n),
    y.each(t, function(t, n, i) {
      e(t, n, i) && r.push(t)
    }),
    r
  }
  ,
  y.reject = function(t, e, n) {
    return y.filter(t, y.negate(w(e)), n)
  }
  ,
  y.every = y.all = function(t, e, n) {
    e = w(e, n);
    for (var r = !j(t) && y.keys(t), i = (r || t).length, o = 0; o < i; o++) {
      var a = r ? r[o] : o;
      if (!e(t[a], a, t))
        return !1
    }
    return !0
  }
  ,
  y.some = y.any = function(t, e, n) {
    e = w(e, n);
    for (var r = !j(t) && y.keys(t), i = (r || t).length, o = 0; o < i; o++) {
      var a = r ? r[o] : o;
      if (e(t[a], a, t))
        return !0
    }
    return !1
  }
  ,
  y.contains = y.includes = y.include = function(t, e, n, r) {
    return j(t) || (t = y.values(t)),
    ("number" != typeof n || r) && (n = 0),
    y.indexOf(t, e, n) >= 0
  }
  ,
  y.invoke = function(t, e) {
    var n = l.call(arguments, 2)
      , r = y.isFunction(e);
    return y.map(t, function(t) {
      var i = r ? e : t[e];
      return null == i ? i : i.apply(t, n)
    })
  }
  ,
  y.pluck = function(t, e) {
    return y.map(t, y.property(e))
  }
  ,
  y.where = function(t, e) {
    return y.filter(t, y.matcher(e))
  }
  ,
  y.findWhere = function(t, e) {
    return y.find(t, y.matcher(e))
  }
  ,
  y.max = function(t, e, n) {
    var r, i, o = -(1 / 0), a = -(1 / 0);
    if (null == e && null != t) {
      t = j(t) ? t : y.values(t);
      for (var s = 0, u = t.length; s < u; s++)
        r = t[s],
        r > o && (o = r)
    } else
      e = w(e, n),
      y.each(t, function(t, n, r) {
        i = e(t, n, r),
        (i > a || i === -(1 / 0) && o === -(1 / 0)) && (o = t,
        a = i)
      });
    return o
  }
  ,
  y.min = function(t, e, n) {
    var r, i, o = 1 / 0, a = 1 / 0;
    if (null == e && null != t) {
      t = j(t) ? t : y.values(t);
      for (var s = 0, u = t.length; s < u; s++)
        r = t[s],
        r < o && (o = r)
    } else
      e = w(e, n),
      y.each(t, function(t, n, r) {
        i = e(t, n, r),
        (i < a || i === 1 / 0 && o === 1 / 0) && (o = t,
        a = i)
      });
    return o
  }
  ,
  y.shuffle = function(t) {
    for (var e, n = j(t) ? t : y.values(t), r = n.length, i = Array(r), o = 0; o < r; o++)
      e = y.random(0, o),
      e !== o && (i[o] = i[e]),
      i[e] = n[o];
    return i
  }
  ,
  y.sample = function(t, e, n) {
    return null == e || n ? (j(t) || (t = y.values(t)),
    t[y.random(t.length - 1)]) : y.shuffle(t).slice(0, Math.max(0, e))
  }
  ,
  y.sortBy = function(t, e, n) {
    return e = w(e, n),
    y.pluck(y.map(t, function(t, n, r) {
      return {
        value: t,
        index: n,
        criteria: e(t, n, r)
      }
    }).sort(function(t, e) {
      var n = t.criteria
        , r = e.criteria;
      if (n !== r) {
        if (n > r || void 0 === n)
          return 1;
        if (n < r || void 0 === r)
          return -1
      }
      return t.index - e.index
    }), "value")
  }
  ;
  var T = function(t) {
    return function(e, n, r) {
      var i = {};
      return n = w(n, r),
      y.each(e, function(r, o) {
        var a = n(r, o, e);
        t(i, r, a)
      }),
      i
    }
  };
  y.groupBy = T(function(t, e, n) {
    y.has(t, n) ? t[n].push(e) : t[n] = [e]
  }),
  y.indexBy = T(function(t, e, n) {
    t[n] = e
  }),
  y.countBy = T(function(t, e, n) {
    y.has(t, n) ? t[n]++ : t[n] = 1
  }),
  y.toArray = function(t) {
    return t ? y.isArray(t) ? l.call(t) : j(t) ? y.map(t, y.identity) : y.values(t) : []
  }
  ,
  y.size = function(t) {
    return null == t ? 0 : j(t) ? t.length : y.keys(t).length
  }
  ,
  y.partition = function(t, e, n) {
    e = w(e, n);
    var r = []
      , i = [];
    return y.each(t, function(t, n, o) {
      (e(t, n, o) ? r : i).push(t)
    }),
    [r, i]
  }
  ,
  y.first = y.head = y.take = function(t, e, n) {
    if (null != t)
      return null == e || n ? t[0] : y.initial(t, t.length - e)
  }
  ,
  y.initial = function(t, e, n) {
    return l.call(t, 0, Math.max(0, t.length - (null == e || n ? 1 : e)))
  }
  ,
  y.last = function(t, e, n) {
    if (null != t)
      return null == e || n ? t[t.length - 1] : y.rest(t, Math.max(0, t.length - e))
  }
  ,
  y.rest = y.tail = y.drop = function(t, e, n) {
    return l.call(t, null == e || n ? 1 : e)
  }
  ,
  y.compact = function(t) {
    return y.filter(t, y.identity)
  }
  ;
  var O = function(t, e, n, r) {
    for (var i = [], o = 0, a = r || 0, s = k(t); a < s; a++) {
      var u = t[a];
      if (j(u) && (y.isArray(u) || y.isArguments(u))) {
        e || (u = O(u, e, n));
        var c = 0
          , l = u.length;
        for (i.length += l; c < l; )
          i[o++] = u[c++]
      } else
        n || (i[o++] = u)
    }
    return i
  };
  y.flatten = function(t, e) {
    return O(t, e, !1)
  }
  ,
  y.without = function(t) {
    return y.difference(t, l.call(arguments, 1))
  }
  ,
  y.uniq = y.unique = function(t, e, n, r) {
    y.isBoolean(e) || (r = n,
    n = e,
    e = !1),
    null != n && (n = w(n, r));
    for (var i = [], o = [], a = 0, s = k(t); a < s; a++) {
      var u = t[a]
        , c = n ? n(u, a, t) : u;
      e ? (a && o === c || i.push(u),
      o = c) : n ? y.contains(o, c) || (o.push(c),
      i.push(u)) : y.contains(i, u) || i.push(u)
    }
    return i
  }
  ,
  y.union = function() {
    return y.uniq(O(arguments, !0, !0))
  }
  ,
  y.intersection = function(t) {
    for (var e = [], n = arguments.length, r = 0, i = k(t); r < i; r++) {
      var o = t[r];
      if (!y.contains(e, o)) {
        for (var a = 1; a < n && y.contains(arguments[a], o); a++)
          ;
        a === n && e.push(o)
      }
    }
    return e
  }
  ,
  y.difference = function(t) {
    var e = O(arguments, !0, !0, 1);
    return y.filter(t, function(t) {
      return !y.contains(e, t)
    })
  }
  ,
  y.zip = function() {
    return y.unzip(arguments)
  }
  ,
  y.unzip = function(t) {
    for (var e = t && y.max(t, k).length || 0, n = Array(e), r = 0; r < e; r++)
      n[r] = y.pluck(t, r);
    return n
  }
  ,
  y.object = function(t, e) {
    for (var n = {}, r = 0, i = k(t); r < i; r++)
      e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];
    return n
  }
  ,
  y.findIndex = e(1),
  y.findLastIndex = e(-1),
  y.sortedIndex = function(t, e, n, r) {
    n = w(n, r, 1);
    for (var i = n(e), o = 0, a = k(t); o < a; ) {
      var s = Math.floor((o + a) / 2);
      n(t[s]) < i ? o = s + 1 : a = s
    }
    return o
  }
  ,
  y.indexOf = n(1, y.findIndex, y.sortedIndex),
  y.lastIndexOf = n(-1, y.findLastIndex),
  y.range = function(t, e, n) {
    null == e && (e = t || 0,
    t = 0),
    n = n || 1;
    for (var r = Math.max(Math.ceil((e - t) / n), 0), i = Array(r), o = 0; o < r; o++,
    t += n)
      i[o] = t;
    return i
  }
  ;
  var A = function(t, e, n, r, i) {
    if (!(r instanceof e))
      return t.apply(n, i);
    var o = _(t.prototype)
      , a = t.apply(o, i);
    return y.isObject(a) ? a : o
  };
  y.bind = function(t, e) {
    if (m && t.bind === m)
      return m.apply(t, l.call(arguments, 1));
    if (!y.isFunction(t))
      throw new TypeError("Bind must be called on a function");
    var n = l.call(arguments, 2)
      , r = function() {
      return A(t, r, e, this, n.concat(l.call(arguments)))
    };
    return r
  }
  ,
  y.partial = function(t) {
    var e = l.call(arguments, 1)
      , n = function() {
      for (var r = 0, i = e.length, o = Array(i), a = 0; a < i; a++)
        o[a] = e[a] === y ? arguments[r++] : e[a];
      for (; r < arguments.length; )
        o.push(arguments[r++]);
      return A(t, n, this, this, o)
    };
    return n
  }
  ,
  y.bindAll = function(t) {
    var e, n, r = arguments.length;
    if (r <= 1)
      throw new Error("bindAll must be passed function names");
    for (e = 1; e < r; e++)
      n = arguments[e],
      t[n] = y.bind(t[n], t);
    return t
  }
  ,
  y.memoize = function(t, e) {
    var n = function(r) {
      var i = n.cache
        , o = "" + (e ? e.apply(this, arguments) : r);
      return y.has(i, o) || (i[o] = t.apply(this, arguments)),
      i[o]
    };
    return n.cache = {},
    n
  }
  ,
  y.delay = function(t, e) {
    var n = l.call(arguments, 2);
    return setTimeout(function() {
      return t.apply(null, n)
    }, e)
  }
  ,
  y.defer = y.partial(y.delay, y, 1),
  y.throttle = function(t, e, n) {
    var r, i, o, a = null, s = 0;
    n || (n = {});
    var u = function() {
      s = n.leading === !1 ? 0 : y.now(),
      a = null,
      o = t.apply(r, i),
      a || (r = i = null)
    };
    return function() {
      var c = y.now();
      s || n.leading !== !1 || (s = c);
      var l = e - (c - s);
      return r = this,
      i = arguments,
      l <= 0 || l > e ? (a && (clearTimeout(a),
      a = null),
      s = c,
      o = t.apply(r, i),
      a || (r = i = null)) : a || n.trailing === !1 || (a = setTimeout(u, l)),
      o
    }
  }
  ,
  y.debounce = function(t, e, n) {
    var r, i, o, a, s, u = function() {
      var c = y.now() - a;
      c < e && c >= 0 ? r = setTimeout(u, e - c) : (r = null,
      n || (s = t.apply(o, i),
      r || (o = i = null)))
    };
    return function() {
      o = this,
      i = arguments,
      a = y.now();
      var c = n && !r;
      return r || (r = setTimeout(u, e)),
      c && (s = t.apply(o, i),
      o = i = null),
      s
    }
  }
  ,
  y.wrap = function(t, e) {
    return y.partial(e, t)
  }
  ,
  y.negate = function(t) {
    return function() {
      return !t.apply(this, arguments)
    }
  }
  ,
  y.compose = function() {
    var t = arguments
      , e = t.length - 1;
    return function() {
      for (var n = e, r = t[e].apply(this, arguments); n--; )
        r = t[n].call(this, r);
      return r
    }
  }
  ,
  y.after = function(t, e) {
    return function() {
      if (--t < 1)
        return e.apply(this, arguments)
    }
  }
  ,
  y.before = function(t, e) {
    var n;
    return function() {
      return --t > 0 && (n = e.apply(this, arguments)),
      t <= 1 && (e = null),
      n
    }
  }
  ,
  y.once = y.partial(y.before, 2);
  var M = !{
    toString: null
  }.propertyIsEnumerable("toString")
    , C = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
  y.keys = function(t) {
    if (!y.isObject(t))
      return [];
    if (d)
      return d(t);
    var e = [];
    for (var n in t)
      y.has(t, n) && e.push(n);
    return M && r(t, e),
    e
  }
  ,
  y.allKeys = function(t) {
    if (!y.isObject(t))
      return [];
    var e = [];
    for (var n in t)
      e.push(n);
    return M && r(t, e),
    e
  }
  ,
  y.values = function(t) {
    for (var e = y.keys(t), n = e.length, r = Array(n), i = 0; i < n; i++)
      r[i] = t[e[i]];
    return r
  }
  ,
  y.mapObject = function(t, e, n) {
    e = w(e, n);
    for (var r, i = y.keys(t), o = i.length, a = {}, s = 0; s < o; s++)
      r = i[s],
      a[r] = e(t[r], r, t);
    return a
  }
  ,
  y.pairs = function(t) {
    for (var e = y.keys(t), n = e.length, r = Array(n), i = 0; i < n; i++)
      r[i] = [e[i], t[e[i]]];
    return r
  }
  ,
  y.invert = function(t) {
    for (var e = {}, n = y.keys(t), r = 0, i = n.length; r < i; r++)
      e[t[n[r]]] = n[r];
    return e
  }
  ,
  y.functions = y.methods = function(t) {
    var e = [];
    for (var n in t)
      y.isFunction(t[n]) && e.push(n);
    return e.sort()
  }
  ,
  y.extend = x(y.allKeys),
  y.extendOwn = y.assign = x(y.keys),
  y.findKey = function(t, e, n) {
    e = w(e, n);
    for (var r, i = y.keys(t), o = 0, a = i.length; o < a; o++)
      if (r = i[o],
      e(t[r], r, t))
        return r
  }
  ,
  y.pick = function(t, e, n) {
    var r, i, o = {}, a = t;
    if (null == a)
      return o;
    y.isFunction(e) ? (i = y.allKeys(a),
    r = b(e, n)) : (i = O(arguments, !1, !1, 1),
    r = function(t, e, n) {
      return e in n
    }
    ,
    a = Object(a));
    for (var s = 0, u = i.length; s < u; s++) {
      var c = i[s]
        , l = a[c];
      r(l, c, a) && (o[c] = l)
    }
    return o
  }
  ,
  y.omit = function(t, e, n) {
    if (y.isFunction(e))
      e = y.negate(e);
    else {
      var r = y.map(O(arguments, !1, !1, 1), String);
      e = function(t, e) {
        return !y.contains(r, e)
      }
    }
    return y.pick(t, e, n)
  }
  ,
  y.defaults = x(y.allKeys, !0),
  y.create = function(t, e) {
    var n = _(t);
    return e && y.extendOwn(n, e),
    n
  }
  ,
  y.clone = function(t) {
    return y.isObject(t) ? y.isArray(t) ? t.slice() : y.extend({}, t) : t
  }
  ,
  y.tap = function(t, e) {
    return e(t),
    t
  }
  ,
  y.isMatch = function(t, e) {
    var n = y.keys(e)
      , r = n.length;
    if (null == t)
      return !r;
    for (var i = Object(t), o = 0; o < r; o++) {
      var a = n[o];
      if (e[a] !== i[a] || !(a in i))
        return !1
    }
    return !0
  }
  ;
  var q = function(t, e, n, r) {
    if (t === e)
      return 0 !== t || 1 / t === 1 / e;
    if (null == t || null == e)
      return t === e;
    t instanceof y && (t = t._wrapped),
    e instanceof y && (e = e._wrapped);
    var i = f.call(t);
    if (i !== f.call(e))
      return !1;
    switch (i) {
    case "[object RegExp]":
    case "[object String]":
      return "" + t == "" + e;
    case "[object Number]":
      return +t !== +t ? +e !== +e : 0 === +t ? 1 / +t === 1 / e : +t === +e;
    case "[object Date]":
    case "[object Boolean]":
      return +t === +e
    }
    var o = "[object Array]" === i;
    if (!o) {
      if ("object" != typeof t || "object" != typeof e)
        return !1;
      var a = t.constructor
        , s = e.constructor;
      if (a !== s && !(y.isFunction(a) && a instanceof a && y.isFunction(s) && s instanceof s) && "constructor"in t && "constructor"in e)
        return !1
    }
    n = n || [],
    r = r || [];
    for (var u = n.length; u--; )
      if (n[u] === t)
        return r[u] === e;
    if (n.push(t),
    r.push(e),
    o) {
      if (u = t.length,
      u !== e.length)
        return !1;
      for (; u--; )
        if (!q(t[u], e[u], n, r))
          return !1
    } else {
      var c, l = y.keys(t);
      if (u = l.length,
      y.keys(e).length !== u)
        return !1;
      for (; u--; )
        if (c = l[u],
        !y.has(e, c) || !q(t[c], e[c], n, r))
          return !1
    }
    return n.pop(),
    r.pop(),
    !0
  };
  y.isEqual = function(t, e) {
    return q(t, e)
  }
  ,
  y.isEmpty = function(t) {
    return null == t || (j(t) && (y.isArray(t) || y.isString(t) || y.isArguments(t)) ? 0 === t.length : 0 === y.keys(t).length)
  }
  ,
  y.isElement = function(t) {
    return !(!t || 1 !== t.nodeType)
  }
  ,
  y.isArray = p || function(t) {
    return "[object Array]" === f.call(t)
  }
  ,
  y.isObject = function(t) {
    var e = typeof t;
    return "function" === e || "object" === e && !!t
  }
  ,
  y.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(t) {
    y["is" + t] = function(e) {
      return f.call(e) === "[object " + t + "]"
    }
  }),
  y.isArguments(arguments) || (y.isArguments = function(t) {
    return y.has(t, "callee")
  }
  ),
  "function" != typeof /./ && "object" != typeof Int8Array && (y.isFunction = function(t) {
    return "function" == typeof t || !1
  }
  ),
  y.isFinite = function(t) {
    return isFinite(t) && !isNaN(parseFloat(t))
  }
  ,
  y.isNaN = function(t) {
    return y.isNumber(t) && t !== +t
  }
  ,
  y.isBoolean = function(t) {
    return t === !0 || t === !1 || "[object Boolean]" === f.call(t)
  }
  ,
  y.isNull = function(t) {
    return null === t
  }
  ,
  y.isUndefined = function(t) {
    return void 0 === t
  }
  ,
  y.has = function(t, e) {
    return null != t && h.call(t, e)
  }
  ,
  y.noConflict = function() {
    return i._ = o,
    this
  }
  ,
  y.identity = function(t) {
    return t
  }
  ,
  y.constant = function(t) {
    return function() {
      return t
    }
  }
  ,
  y.noop = function() {}
  ,
  y.property = E,
  y.propertyOf = function(t) {
    return null == t ? function() {}
    : function(e) {
      return t[e]
    }
  }
  ,
  y.matcher = y.matches = function(t) {
    return t = y.extendOwn({}, t),
    function(e) {
      return y.isMatch(e, t)
    }
  }
  ,
  y.times = function(t, e, n) {
    var r = Array(Math.max(0, t));
    e = b(e, n, 1);
    for (var i = 0; i < t; i++)
      r[i] = e(i);
    return r
  }
  ,
  y.random = function(t, e) {
    return null == e && (e = t,
    t = 0),
    t + Math.floor(Math.random() * (e - t + 1))
  }
  ,
  y.now = Date.now || function() {
    return (new Date).getTime()
  }
  ;
  var N = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  }
    , P = y.invert(N)
    , I = function(t) {
    var e = function(e) {
      return t[e]
    }
      , n = "(?:" + y.keys(t).join("|") + ")"
      , r = RegExp(n)
      , i = RegExp(n, "g");
    return function(t) {
      return t = null == t ? "" : "" + t,
      r.test(t) ? t.replace(i, e) : t
    }
  };
  y.escape = I(N),
  y.unescape = I(P),
  y.result = function(t, e, n) {
    var r = null == t ? void 0 : t[e];
    return void 0 === r && (r = n),
    y.isFunction(r) ? r.call(t) : r
  }
  ;
  var D = 0;
  y.uniqueId = function(t) {
    var e = ++D + "";
    return t ? t + e : e
  }
  ,
  y.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };
  var F = /(.)^/
    , R = {
    "'": "'",
    "\\": "\\",
    "\r": "r",
    "\n": "n",
    "\u2028": "u2028",
    "\u2029": "u2029"
  }
    , U = /\\|'|\r|\n|\u2028|\u2029/g
    , L = function(t) {
    return "\\" + R[t]
  };
  y.template = function(t, e, n) {
    !e && n && (e = n),
    e = y.defaults({}, e, y.templateSettings);
    var r = RegExp([(e.escape || F).source, (e.interpolate || F).source, (e.evaluate || F).source].join("|") + "|$", "g")
      , i = 0
      , o = "__p+='";
    t.replace(r, function(e, n, r, a, s) {
      return o += t.slice(i, s).replace(U, L),
      i = s + e.length,
      n ? o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? o += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : a && (o += "';\n" + a + "\n__p+='"),
      e
    }),
    o += "';\n",
    e.variable || (o = "with(obj||{}){\n" + o + "}\n"),
    o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
    try {
      var a = new Function(e.variable || "obj","_",o)
    } catch (t) {
      throw t.source = o,
      t
    }
    var s = function(t) {
      return a.call(this, t, y)
    }
      , u = e.variable || "obj";
    return s.source = "function(" + u + "){\n" + o + "}",
    s
  }
  ,
  y.chain = function(t) {
    var e = y(t);
    return e._chain = !0,
    e
  }
  ;
  var $ = function(t, e) {
    return t._chain ? y(e).chain() : e
  };
  y.mixin = function(t) {
    y.each(y.functions(t), function(e) {
      var n = y[e] = t[e];
      y.prototype[e] = function() {
        var t = [this._wrapped];
        return c.apply(t, arguments),
        $(this, n.apply(y, t))
      }
    })
  }
  ,
  y.mixin(y),
  y.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
    var e = a[t];
    y.prototype[t] = function() {
      var n = this._wrapped;
      return e.apply(n, arguments),
      "shift" !== t && "splice" !== t || 0 !== n.length || delete n[0],
      $(this, n)
    }
  }),
  y.each(["concat", "join", "slice"], function(t) {
    var e = a[t];
    y.prototype[t] = function() {
      return $(this, e.apply(this._wrapped, arguments))
    }
  }),
  y.prototype.value = function() {
    return this._wrapped
  }
  ,
  y.prototype.valueOf = y.prototype.toJSON = y.prototype.value,
  y.prototype.toString = function() {
    return "" + this._wrapped
  }
  ,
  "function" == typeof define && define.amd && define("underscore", [], function() {
    return y
  })
}
.call(this),
function() {
  var t = []
    , e = t.slice;
  _.inherit = function(t, n) {
    function r() {
      this.__propertys__(),
      _.isFunction(this.initialize) && this.initialize.apply(this, arguments)
    }
    if (0 === arguments.length || arguments.length > 2)
      throw "参数错误";
    var i = null
      , o = e.call(arguments);
    "function" == typeof o[0] && (i = o.shift()),
    o = o[0],
    r.superclass = i,
    r.subclasses = [];
    var a = function() {}
      , s = o.__propertys__ || function() {}
    ;
    if (i) {
      i.prototype.__propertys__ && (a = i.prototype.__propertys__);
      var u = function() {};
      u.prototype = i.prototype,
      r.prototype = new u,
      i.subclasses.push(r)
    }
    var c = r.superclass && r.superclass.prototype;
    for (var l in o) {
      var f = o[l];
      if (c && "function" == typeof f) {
        var h = /^\s*function\s*\(([^\(\)]*?)\)\s*?\{/i.exec(f.toString())[1].replace(/\s/g, "").split(",");
        "$super" === h[0] && c[l] && (f = function(t, n) {
          return function() {
            var r = this
              , i = [function() {
              return c[t].apply(r, arguments)
            }
            ];
            return n.apply(this, i.concat(e.call(arguments)))
          }
        }(l, f))
      }
      if (_.isObject(r.prototype[l]) && _.isObject(f) && "function" != typeof r.prototype[l] && "fuction" != typeof f) {
        var p = {};
        _.extend(p, r.prototype[l]),
        _.extend(p, f),
        r.prototype[l] = p
      } else
        r.prototype[l] = f
    }
    r.prototype.initialize || (r.prototype.initialize = function() {}
    ),
    r.prototype.__propertys__ = function() {
      a.call(this),
      s.call(this)
    }
    ;
    for (key in i)
      i.hasOwnProperty(key) && "prototype" !== key && "superclass" !== key && (r[key] = i[key]);
    return r.prototype.constructor = r,
    r
  }
}(),
function() {
  _.getUrlParam = function(t, e) {
    t || (t = window.location.href);
    var n, r, i, o, a = /([^&=?]+)=([^&|#]+)/g, s = /\/+.*\?/, u = /(.+)\[\]$/, c = {};
    for (t = t.replace(/\?/g, "&").replace("&", "?"); n = a.exec(t); ) {
      if (r = n[1],
      i = n[2],
      o = r.match(u),
      s.test(i)) {
        c[r] = t.substr(t.indexOf(i));
        break
      }
      o ? (r = o[1],
      c[r] = c[r] || [],
      c[r].push(i)) : c[r] = i
    }
    return e ? c[e] : c
  }
  ,
  _.removeAllSpace = function(t) {
    return t.replace(/\s+/g, "")
  }
  ,
  _._compact = function(t) {
    for (var e in t)
      t[e] || delete t[e];
    return t
  }
  ,
  _.formatPrice = function(t, e, n) {
    var r = .01 * parseFloat(t);
    if (isNaN(r))
      return t;
    var i = r < 1 && r >= 0;
    i && (r += 1),
    e = e || 2,
    n = n || 0;
    var o = o || "round"
      , a = Math[o](r * Math.pow(10, e)).toString()
      , s = a.length - e;
    e < n && (n = e);
    var u = e - n
      , c = a.substr(0, s);
    i && (c = parseInt(c) - 1);
    var l = n ? "<i>" + a.substr(s + u) + "</i>" : "";
    return c + "." + a.substr(s, u) + l
  }
}(),
function() {
  function t(t, e, n, r, i) {
    var o = Math.abs(t - e)
      , a = Math.abs(n - r)
      , s = o >= a ? t - e > 0 ? "left" : "right" : n - r > 0 ? "up" : "down";
    return i && ("left" == s || "right" == s ? a / o > i && (s = "") : "up" != s && "down" != s || o / a > i && (s = "")),
    s
  }
  function e(e, n, u, c, l, f) {
    if (e && e[0]) {
      var h = ""
        , p = f || r;
      if (e[0].__flipEventObj)
        return void (e[0].__flipEventObj["__flip_" + n] = u);
      e[0].__flipEventObj = {},
      e[0].__flipEventObj["__flip_" + n] = u,
      e.on(o, function(t) {
        var e = t.touches && t.touches[0] || t;
        i.x1 = e.pageX,
        i.y1 = e.pageY
      }).on(a, function(e) {
        var n = e.touches && e.touches[0] || e;
        i.x2 = n.pageX,
        i.y2 = n.pageY,
        (i.x2 && Math.abs(i.x1 - i.x2) > p || i.y2 && Math.abs(i.y1 - i.y2) > p) && (h = t(i.x1, i.x2, i.y1, i.y2, l));
        var r = "function" == typeof c ? c(h) : c;
        r || e.preventDefault()
      }).on(s, function(n) {
        var r = n.changedTouches && n.changedTouches[0] || n;
        if (i.x2 = r.pageX,
        i.y2 = r.pageY,
        i.x2 && Math.abs(i.x1 - i.x2) > p || i.y2 && Math.abs(i.y1 - i.y2) > p) {
          var o = t(i.x1, i.x2, i.y1, i.y2, l);
          _.isFunction(e[0].__flipEventObj["__flip_" + o]) && e[0].__flipEventObj["__flip_" + o]()
        } else
          _.isFunction(e[0].__flipEventObj.__flip_tap) && e[0].__flipEventObj.__flip_tap();
        i = {}
      })
    }
  }
  function n(t) {
    t && t[0] && (t.off(o).off(a).off(s),
    t[0].__flipEventObj && delete t[0].__flipEventObj)
  }
  var r = 20
    , i = {}
    , o = "touchstart"
    , a = "touchmove"
    , s = "touchend";
  "ontouchstart"in window || (o = "mousedown",
  a = "mousemove",
  s = "mouseup"),
  _.flip = e,
  _.flipDestroy = n
}(),
function() {
  _.dateUtil = {
    formatNum: function(t) {
      return t < 10 ? "0" + t : t
    },
    parse: function(t, e) {
      if ("undefined" == typeof t)
        return null;
      if ("string" == typeof e) {
        var n = (new Date(e),
        e.replace(/[^ymd]/g, "").split(""));
        if (!n && 3 != n.length)
          return null;
        for (var e = e.replace(/y|m|d/g, function(t) {
          switch (t) {
          case "y":
            return "(\\d{4})";
          case "m":
          case "d":
            return "(\\d{1,2})"
          }
        }), r = new RegExp(e,"g"), i = r.exec(t), o = {}, a = 0, s = n.length; a < s; a++)
          o[n[a]] = i[a + 1];
        return new Date(o.y,o.m - 1,o.d)
      }
      return null
    },
    format: function(t, e) {
      e = e || {
        type: "date",
        format: "Y年M月D日"
      },
      "countdown" !== e.type || e.format || (e.format = "H时F分S秒");
      var n = e.format || "Y年M月D日";
      if ("countdown" === e.type) {
        var r = parseInt(.001 * t)
          , i = r % 60;
        r = parseInt(r / 60);
        var o = r % 60;
        r = parseInt(r / 60);
        var a = parseInt(r % 24)
          , s = parseInt(r / 24);
        return n.replace(/Y|y|M|m|D|d|H|h|F|f|S|s/g, function(t) {
          switch (t) {
          case "d":
            return s;
          case "D":
            return _.dateUtil.formatNum(s);
          case "h":
            return a;
          case "H":
            return _.dateUtil.formatNum(a);
          case "f":
            return o;
          case "F":
            return _.dateUtil.formatNum(o);
          case "s":
            return i;
          case "S":
            return _.dateUtil.formatNum(i)
          }
        })
      }
      return "number" == typeof t && (t = new Date(t)),
      n.replace(/Y|y|M|m|D|d|H|h|F|f|S|s/g, function(e) {
        switch (e) {
        case "y":
          return (t.getFullYear() + "").slice(2);
        case "Y":
          return t.getFullYear();
        case "m":
          return t.getMonth() + 1;
        case "M":
          return _.dateUtil.formatNum(t.getMonth() + 1);
        case "d":
          return t.getDate();
        case "D":
          return _.dateUtil.formatNum(t.getDate());
        case "h":
          return t.getHours();
        case "H":
          return _.dateUtil.formatNum(t.getHours());
        case "f":
          return t.getMinutes();
        case "F":
          return _.dateUtil.formatNum(t.getMinutes());
        case "s":
          return t.getSeconds();
        case "S":
          return _.dateUtil.formatNum(t.getSeconds())
        }
      })
    },
    isDate: function(t) {
      return "object" == typeof t && t instanceof Date
    },
    isLeapYear: function(t) {
      return _.dateUtil.isDate(t) && (t = t.getFullYear()),
      t % 4 == 0 && t % 100 != 0 || t % 400 == 0
    },
    getDaysOfMonth: function(t, e) {
      return e--,
      _.dateUtil.isDate(t) && (e = t.getMonth(),
      t = t.getFullYear()),
      [31, _.dateUtil.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
    },
    getBeginDayOfMouth: function(t, e) {
      e--,
      "object" == typeof t && t instanceof Date && (e = t.getMonth(),
      t = t.getFullYear());
      var n = new Date(t,e,1);
      return n.getDay()
    }
  }
}(),
function() {
  var t = {};
  _.setInterval = function(e, n, r) {
    r || (r = "g"),
    t[r] || (t[r] = []),
    t[r].push(setInterval(e, n))
  }
  ,
  _.clearInterval = function(e, n) {
    var r, i, o, a, s, u, c;
    if ("number" == typeof e)
      for (r in t)
        for (i = t[r],
        a = 0,
        s = i.length; a < s; a++)
          if (e == i[a])
            return i.splice(a, 1),
            void clearInterval(e);
    if ("string" == typeof e)
      for (n = e,
      u = t[n],
      c = u.length; 0 != c; )
        _.clearInterval(u[u.length - 1]);
    if (0 == arguments.length)
      for (o in t)
        _.clearInterval(o)
  }
}(),
function(t) {
  "use strict";
  ["width", "height"].forEach(function(e) {
    var n = e.replace(/./, function(t) {
      return t[0].toUpperCase()
    });
    t.fn["outer" + n] = function(t) {
      var n = this;
      if (n) {
        var r = n[e]()
          , i = {
          width: ["left", "right"],
          height: ["top", "bottom"]
        };
        return i[e].forEach(function(e) {
          t && (r += parseInt(n.css("margin-" + e), 10))
        }),
        r
      }
      return null
    }
  }),
  t.support = function() {
    var t = {
      touch: !!("ontouchstart"in window || window.DocumentTouch && document instanceof window.DocumentTouch)
    };
    return t
  }(),
  t.touchEvents = {
    start: t.support.touch ? "touchstart" : "mousedown",
    move: t.support.touch ? "touchmove" : "mousemove",
    end: t.support.touch ? "touchend" : "mouseup"
  },
  t.getTranslate = function(t, e) {
    var n, r, i, o;
    return "undefined" == typeof e && (e = "x"),
    i = window.getComputedStyle(t, null),
    window.WebKitCSSMatrix ? o = new WebKitCSSMatrix("none" === i.webkitTransform ? "" : i.webkitTransform) : (o = i.MozTransform || i.OTransform || i.MsTransform || i.msTransform || i.transform || i.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"),
    n = o.toString().split(",")),
    "x" === e && (r = window.WebKitCSSMatrix ? o.m41 : 16 === n.length ? parseFloat(n[12]) : parseFloat(n[4])),
    "y" === e && (r = window.WebKitCSSMatrix ? o.m42 : 16 === n.length ? parseFloat(n[13]) : parseFloat(n[5])),
    r || 0
  }
  ,
  t.requestAnimationFrame = function(t) {
    return window.requestAnimationFrame ? window.requestAnimationFrame(t) : window.webkitRequestAnimationFrame ? window.webkitRequestAnimationFrame(t) : window.mozRequestAnimationFrame ? window.mozRequestAnimationFrame(t) : window.setTimeout(t, 1e3 / 60)
  }
  ,
  t.cancelAnimationFrame = function(t) {
    return window.cancelAnimationFrame ? window.cancelAnimationFrame(t) : window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(t) : window.mozCancelAnimationFrame ? window.mozCancelAnimationFrame(t) : window.clearTimeout(t)
  }
  ,
  t.fn.transitionEnd = function(t) {
    function e(o) {
      if (o.target === this)
        for (t.call(this, o),
        n = 0; n < r.length; n++)
          i.off(r[n], e)
    }
    var n, r = ["webkitTransitionEnd", "transitionend"], i = this;
    if (t)
      for (n = 0; n < r.length; n++)
        i.on(r[n], e);
    return this
  }
  ,
  t.fn.dataset = function() {
    var e = this[0];
    if (e) {
      var n = {};
      if (e.dataset)
        for (var r in e.dataset)
          n[r] = e.dataset[r];
      else
        for (var i = 0; i < e.attributes.length; i++) {
          var o = e.attributes[i];
          /^data-/.test(o.name) && (n[t.toCamelCase(o.name.split("data-")[1])] = o.value)
        }
      for (var a in n)
        "false" === n[a] ? n[a] = !1 : "true" === n[a] ? n[a] = !0 : parseFloat(n[a]) === 1 * n[a] && (n[a] = 1 * n[a]);
      return n
    }
  }
  ,
  t.fn.data = function(e, n) {
    if ("undefined" == typeof e)
      return t(this).dataset();
    {
      if ("undefined" != typeof n) {
        for (var r = 0; r < this.length; r++) {
          var i = this[r];
          i.smElementDataStorage || (i.smElementDataStorage = {}),
          i.smElementDataStorage[e] = n
        }
        return this
      }
      if (this[0] && this[0].getAttribute) {
        var o = this[0].getAttribute("data-" + e);
        return o ? o : this[0].smElementDataStorage && e in this[0].smElementDataStorage ? this[0].smElementDataStorage[e] : void 0
      }
    }
  }
  ,
  t.fn.animationEnd = function(t) {
    function e(o) {
      for (t(o),
      n = 0; n < r.length; n++)
        i.off(r[n], e)
    }
    var n, r = ["webkitAnimationEnd", "animationend"], i = this;
    if (t)
      for (n = 0; n < r.length; n++)
        i.on(r[n], e);
    return this
  }
  ,
  t.fn.transition = function(t) {
    "string" != typeof t && (t += "ms");
    for (var e = 0; e < this.length; e++) {
      var n = this[e].style;
      n.webkitTransitionDuration = n.MsTransitionDuration = n.msTransitionDuration = n.MozTransitionDuration = n.OTransitionDuration = n.transitionDuration = t
    }
    return this
  }
  ,
  t.fn.transform = function(t) {
    for (var e = 0; e < this.length; e++) {
      var n = this[e].style;
      n.webkitTransform = n.MsTransform = n.msTransform = n.MozTransform = n.OTransform = n.transform = t
    }
    return this
  }
  ,
  t.fn.prevAll = function(e) {
    var n = []
      , r = this[0];
    if (!r)
      return t([]);
    for (; r.previousElementSibling; ) {
      var i = r.previousElementSibling;
      e ? t(i).is(e) && n.push(i) : n.push(i),
      r = i
    }
    return t(n)
  }
  ,
  t.fn.nextAll = function(e) {
    var n = []
      , r = this[0];
    if (!r)
      return t([]);
    for (; r.nextElementSibling; ) {
      var i = r.nextElementSibling;
      e ? t(i).is(e) && n.push(i) : n.push(i),
      r = i
    }
    return t(n)
  }
  ,
  t.fn.show = function() {
    function t(t) {
      var n, r;
      return e[t] || (n = document.createElement(t),
      document.body.appendChild(n),
      r = getComputedStyle(n, "").getPropertyValue("display"),
      n.parentNode.removeChild(n),
      "none" === r && (r = "block"),
      e[t] = r),
      e[t]
    }
    var e = {};
    return this.each(function() {
      "none" === this.style.display && (this.style.display = ""),
      "none" === getComputedStyle(this, "").getPropertyValue("display"),
      this.style.display = t(this.nodeName)
    })
  }
}(Zepto),
function(t) {
  t.fn.end = function() {
    return this.prevObject || t()
  }
  ,
  t.fn.andSelf = function() {
    return this.add(this.prevObject || t())
  }
  ,
  "filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings".split(",").forEach(function(e) {
    var n = t.fn[e];
    t.fn[e] = function() {
      var t = n.apply(this, arguments);
      return t.prevObject = this,
      t
    }
  })
}(Zepto),
function(t, e) {
  "function" == typeof define && define.amd ? t.Backbone = e(t, {}, t._, t.jQuery || t.Zepto || t.ender || t.$) : "undefined" != typeof exports ? e(t, exports, t._) : t.Backbone = e(t, {}, t._, t.jQuery || t.Zepto || t.ender || t.$)
}(this, function(t, e, n, r) {
  var i = t.Backbone
    , o = []
    , a = o.slice;
  e.VERSION = "1.1.2",
  e.$ = r,
  e.noConflict = function() {
    return t.Backbone = i,
    this
  }
  ,
  e.emulateHTTP = !1,
  e.emulateJSON = !1;
  var s = e.Events = {
    on: function(t, e, n) {
      if (!c(this, "on", t, [e, n]) || !e)
        return this;
      this._events || (this._events = {});
      var r = this._events[t] || (this._events[t] = []);
      return r.push({
        callback: e,
        context: n,
        ctx: n || this
      }),
      this
    },
    once: function(t, e, r) {
      if (!c(this, "once", t, [e, r]) || !e)
        return this;
      var i = this
        , o = n.once(function() {
        i.off(t, o),
        e.apply(this, arguments)
      });
      return o._callback = e,
      this.on(t, o, r)
    },
    off: function(t, e, r) {
      if (!this._events || !c(this, "off", t, [e, r]))
        return this;
      if (!t && !e && !r)
        return this._events = void 0,
        this;
      for (var i = t ? [t] : n.keys(this._events), o = 0, a = i.length; o < a; o++) {
        t = i[o];
        var s = this._events[t];
        if (s)
          if (e || r) {
            for (var u = [], l = 0, f = s.length; l < f; l++) {
              var h = s[l];
              (e && e !== h.callback && e !== h.callback._callback || r && r !== h.context) && u.push(h)
            }
            u.length ? this._events[t] = u : delete this._events[t]
          } else
            delete this._events[t]
      }
      return this
    },
    trigger: function(t) {
      if (!this._events)
        return this;
      var e = a.call(arguments, 1);
      if (!c(this, "trigger", t, e))
        return this;
      var n = this._events[t]
        , r = this._events.all;
      return n && l(n, e),
      r && l(r, arguments),
      this
    },
    listenTo: function(t, e, r) {
      var i = this._listeningTo || (this._listeningTo = {})
        , o = t._listenId || (t._listenId = n.uniqueId("l"));
      return i[o] = t,
      r || "object" != typeof e || (r = this),
      t.on(e, r, this),
      this
    },
    listenToOnce: function(t, e, r) {
      if ("object" == typeof e) {
        for (var i in e)
          this.listenToOnce(t, i, e[i]);
        return this
      }
      if (u.test(e)) {
        for (var o = e.split(u), a = 0, s = o.length; a < s; a++)
          this.listenToOnce(t, o[a], r);
        return this
      }
      if (!r)
        return this;
      var c = n.once(function() {
        this.stopListening(t, e, c),
        r.apply(this, arguments)
      });
      return c._callback = r,
      this.listenTo(t, e, c)
    },
    stopListening: function(t, e, r) {
      var i = this._listeningTo;
      if (!i)
        return this;
      var o = !e && !r;
      r || "object" != typeof e || (r = this),
      t && ((i = {})[t._listenId] = t);
      for (var a in i)
        t = i[a],
        t.off(e, r, this),
        (o || n.isEmpty(t._events)) && delete this._listeningTo[a];
      return this
    }
  }
    , u = /\s+/
    , c = function(t, e, n, r) {
    if (!n)
      return !0;
    if ("object" == typeof n) {
      for (var i in n)
        t[e].apply(t, [i, n[i]].concat(r));
      return !1
    }
    if (u.test(n)) {
      for (var o = n.split(u), a = 0, s = o.length; a < s; a++)
        t[e].apply(t, [o[a]].concat(r));
      return !1
    }
    return !0
  }
    , l = function(t, e) {
    var n, r = -1, i = t.length, o = e[0], a = e[1], s = e[2];
    switch (e.length) {
    case 0:
      for (; ++r < i; )
        (n = t[r]).callback.call(n.ctx);
      return;
    case 1:
      for (; ++r < i; )
        (n = t[r]).callback.call(n.ctx, o);
      return;
    case 2:
      for (; ++r < i; )
        (n = t[r]).callback.call(n.ctx, o, a);
      return;
    case 3:
      for (; ++r < i; )
        (n = t[r]).callback.call(n.ctx, o, a, s);
      return;
    default:
      for (; ++r < i; )
        (n = t[r]).callback.apply(n.ctx, e);
      return
    }
  };
  s.bind = s.on,
  s.unbind = s.off,
  n.extend(e, s);
  var f = e.Model = function(t, e) {
    var r = t || {};
    e || (e = {}),
    this.cid = n.uniqueId("c"),
    this.attributes = {},
    e.collection && (this.collection = e.collection),
    e.parse && (r = this.parse(r, e) || {}),
    r = n.defaults({}, r, n.result(this, "defaults")),
    this.set(r, e),
    this.changed = {},
    this.initialize.apply(this, arguments)
  }
  ;
  n.extend(f.prototype, s, {
    changed: null,
    validationError: null,
    idAttribute: "id",
    initialize: function() {},
    toJSON: function(t) {
      return n.clone(this.attributes)
    },
    sync: function() {
      return e.sync.apply(this, arguments)
    },
    get: function(t) {
      return this.attributes[t]
    },
    escape: function(t) {
      return n.escape(this.get(t))
    },
    has: function(t) {
      return null != this.get(t)
    },
    matches: function(t) {
      return n.matches(t)(this.attributes)
    },
    set: function(t, e, r) {
      var i, o, a, s, u, c, l, f;
      if (null == t)
        return this;
      if ("object" == typeof t ? (o = t,
      r = e) : (o = {})[t] = e,
      r || (r = {}),
      !this._validate(o, r))
        return !1;
      a = r.unset,
      u = r.silent,
      s = [],
      c = this._changing,
      this._changing = !0,
      c || (this._previousAttributes = n.clone(this.attributes),
      this.changed = {}),
      f = this.attributes,
      l = this._previousAttributes,
      this.idAttribute in o && (this.id = o[this.idAttribute]);
      for (i in o)
        e = o[i],
        n.isEqual(f[i], e) || s.push(i),
        n.isEqual(l[i], e) ? delete this.changed[i] : this.changed[i] = e,
        a ? delete f[i] : f[i] = e;
      if (!u) {
        s.length && (this._pending = r);
        for (var h = 0, p = s.length; h < p; h++)
          this.trigger("change:" + s[h], this, f[s[h]], r)
      }
      if (c)
        return this;
      if (!u)
        for (; this._pending; )
          r = this._pending,
          this._pending = !1,
          this.trigger("change", this, r);
      return this._pending = !1,
      this._changing = !1,
      this
    },
    unset: function(t, e) {
      return this.set(t, void 0, n.extend({}, e, {
        unset: !0
      }))
    },
    clear: function(t) {
      var e = {};
      for (var r in this.attributes)
        e[r] = void 0;
      return this.set(e, n.extend({}, t, {
        unset: !0
      }))
    },
    hasChanged: function(t) {
      return null == t ? !n.isEmpty(this.changed) : n.has(this.changed, t)
    },
    changedAttributes: function(t) {
      if (!t)
        return !!this.hasChanged() && n.clone(this.changed);
      var e, r = !1, i = this._changing ? this._previousAttributes : this.attributes;
      for (var o in t)
        n.isEqual(i[o], e = t[o]) || ((r || (r = {}))[o] = e);
      return r
    },
    previous: function(t) {
      return null != t && this._previousAttributes ? this._previousAttributes[t] : null
    },
    previousAttributes: function() {
      return n.clone(this._previousAttributes)
    },
    fetch: function(t) {
      t = t ? n.clone(t) : {},
      void 0 === t.parse && (t.parse = !0);
      var e = this
        , r = t.success;
      return t.success = function(n) {
        return !!e.set(e.parse(n, t), t) && (r && r(e, n, t),
        void e.trigger("sync", e, n, t))
      }
      ,
      N(this, t),
      this.sync("read", this, t)
    },
    save: function(t, e, r) {
      var i, o, a, s = this.attributes;
      if (null == t || "object" == typeof t ? (i = t,
      r = e) : (i = {})[t] = e,
      r = n.extend({
        validate: !0
      }, r),
      i && !r.wait) {
        if (!this.set(i, r))
          return !1
      } else if (!this._validate(i, r))
        return !1;
      i && r.wait && (this.attributes = n.extend({}, s, i)),
      void 0 === r.parse && (r.parse = !0);
      var u = this
        , c = r.success;
      return r.success = function(t) {
        u.attributes = s;
        var e = u.parse(t, r);
        return r.wait && (e = n.extend(i || {}, e)),
        !(n.isObject(e) && !u.set(e, r)) && (c && c(u, t, r),
        void u.trigger("sync", u, t, r))
      }
      ,
      N(this, r),
      o = this.isNew() ? "create" : r.patch ? "patch" : "update",
      "patch" !== o || r.attrs || (r.attrs = i),
      a = this.sync(o, this, r),
      i && r.wait && (this.attributes = s),
      a
    },
    destroy: function(t) {
      t = t ? n.clone(t) : {};
      var e = this
        , r = t.success
        , i = function() {
        e.stopListening(),
        e.trigger("destroy", e, e.collection, t)
      };
      if (t.success = function(n) {
        (t.wait || e.isNew()) && i(),
        r && r(e, n, t),
        e.isNew() || e.trigger("sync", e, n, t)
      }
      ,
      this.isNew())
        return t.success(),
        !1;
      N(this, t);
      var o = this.sync("delete", this, t);
      return t.wait || i(),
      o
    },
    url: function() {
      var t = n.result(this, "urlRoot") || n.result(this.collection, "url") || q();
      return this.isNew() ? t : t.replace(/([^\/])$/, "$1/") + encodeURIComponent(this.id)
    },
    parse: function(t, e) {
      return t
    },
    clone: function() {
      return new this.constructor(this.attributes)
    },
    isNew: function() {
      return !this.has(this.idAttribute)
    },
    isValid: function(t) {
      return this._validate({}, n.extend(t || {}, {
        validate: !0
      }))
    },
    _validate: function(t, e) {
      if (!e.validate || !this.validate)
        return !0;
      t = n.extend({}, this.attributes, t);
      var r = this.validationError = this.validate(t, e) || null;
      return !r || (this.trigger("invalid", this, r, n.extend(e, {
        validationError: r
      })),
      !1)
    }
  });
  var h = ["keys", "values", "pairs", "invert", "pick", "omit", "chain", "isEmpty"];
  n.each(h, function(t) {
    n[t] && (f.prototype[t] = function() {
      var e = a.call(arguments);
      return e.unshift(this.attributes),
      n[t].apply(n, e)
    }
    )
  });
  var p = e.Collection = function(t, e) {
    e || (e = {}),
    e.model && (this.model = e.model),
    void 0 !== e.comparator && (this.comparator = e.comparator),
    this._reset(),
    this.initialize.apply(this, arguments),
    t && this.reset(t, n.extend({
      silent: !0
    }, e))
  }
    , d = {
    add: !0,
    remove: !0,
    merge: !0
  }
    , m = {
    add: !0,
    remove: !1
  };
  n.extend(p.prototype, s, {
    model: f,
    initialize: function() {},
    toJSON: function(t) {
      return this.map(function(e) {
        return e.toJSON(t)
      })
    },
    sync: function() {
      return e.sync.apply(this, arguments)
    },
    add: function(t, e) {
      return this.set(t, n.extend({
        merge: !1
      }, e, m))
    },
    remove: function(t, e) {
      var r = !n.isArray(t);
      t = r ? [t] : n.clone(t),
      e || (e = {});
      for (var i = 0, o = t.length; i < o; i++) {
        var a = t[i] = this.get(t[i]);
        if (a) {
          var s = this.modelId(a.attributes);
          null != s && delete this._byId[s],
          delete this._byId[a.cid];
          var u = this.indexOf(a);
          this.models.splice(u, 1),
          this.length--,
          e.silent || (e.index = u,
          a.trigger("remove", a, this, e)),
          this._removeReference(a, e)
        }
      }
      return r ? t[0] : t
    },
    set: function(t, e) {
      e = n.defaults({}, e, d),
      e.parse && (t = this.parse(t, e));
      var r = !n.isArray(t);
      t = r ? t ? [t] : [] : t.slice();
      var i, o, a, s, u, c = e.at;
      null != c && (c = +c),
      c < 0 && (c += this.length + 1);
      for (var l = this.comparator && null == c && e.sort !== !1, f = n.isString(this.comparator) ? this.comparator : null, h = [], p = [], m = {}, v = e.add, g = e.merge, y = e.remove, b = !(l || !v || !y) && [], w = !1, x = 0, _ = t.length; x < _; x++) {
        if (a = t[x],
        s = this.get(a))
          y && (m[s.cid] = !0),
          g && a !== s && (a = this._isModel(a) ? a.attributes : a,
          e.parse && (a = s.parse(a, e)),
          s.set(a, e),
          l && !u && s.hasChanged(f) && (u = !0)),
          t[x] = s;
        else if (v) {
          if (o = t[x] = this._prepareModel(a, e),
          !o)
            continue;
          h.push(o),
          this._addReference(o, e)
        }
        o = s || o,
        o && (i = this.modelId(o.attributes),
        !b || !o.isNew() && m[i] || (b.push(o),
        w = w || !this.models[x] || o.cid !== this.models[x].cid),
        m[i] = !0)
      }
      if (y) {
        for (var x = 0, _ = this.length; x < _; x++)
          m[(o = this.models[x]).cid] || p.push(o);
        p.length && this.remove(p, e)
      }
      if (h.length || w)
        if (l && (u = !0),
        this.length += h.length,
        null != c)
          for (var x = 0, _ = h.length; x < _; x++)
            this.models.splice(c + x, 0, h[x]);
        else {
          b && (this.models.length = 0);
          for (var E = b || h, x = 0, _ = E.length; x < _; x++)
            this.models.push(E[x])
        }
      if (u && this.sort({
        silent: !0
      }),
      !e.silent) {
        for (var S = null != c ? n.clone(e) : e, x = 0, _ = h.length; x < _; x++)
          null != c && (S.index = c + x),
          (o = h[x]).trigger("add", o, this, S);
        (u || w) && this.trigger("sort", this, e)
      }
      return r ? t[0] : t
    },
    reset: function(t, e) {
      e = e ? n.clone(e) : {};
      for (var r = 0, i = this.models.length; r < i; r++)
        this._removeReference(this.models[r], e);
      return e.previousModels = this.models,
      this._reset(),
      t = this.add(t, n.extend({
        silent: !0
      }, e)),
      e.silent || this.trigger("reset", this, e),
      t
    },
    push: function(t, e) {
      return this.add(t, n.extend({
        at: this.length
      }, e))
    },
    pop: function(t) {
      var e = this.at(this.length - 1);
      return this.remove(e, t),
      e
    },
    unshift: function(t, e) {
      return this.add(t, n.extend({
        at: 0
      }, e))
    },
    shift: function(t) {
      var e = this.at(0);
      return this.remove(e, t),
      e
    },
    slice: function() {
      return a.apply(this.models, arguments)
    },
    get: function(t) {
      if (null != t) {
        var e = this.modelId(this._isModel(t) ? t.attributes : t);
        return this._byId[t] || this._byId[e] || this._byId[t.cid]
      }
    },
    at: function(t) {
      return t < 0 && (t += this.length),
      this.models[t]
    },
    where: function(t, e) {
      var r = n.matches(t);
      return this[e ? "find" : "filter"](function(t) {
        return r(t.attributes)
      })
    },
    findWhere: function(t) {
      return this.where(t, !0)
    },
    sort: function(t) {
      if (!this.comparator)
        throw new Error("Cannot sort a set without a comparator");
      return t || (t = {}),
      n.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(n.bind(this.comparator, this)),
      t.silent || this.trigger("sort", this, t),
      this
    },
    pluck: function(t) {
      return n.invoke(this.models, "get", t)
    },
    fetch: function(t) {
      t = t ? n.clone(t) : {},
      void 0 === t.parse && (t.parse = !0);
      var e = t.success
        , r = this;
      return t.success = function(n) {
        var i = t.reset ? "reset" : "set";
        r[i](n, t),
        e && e(r, n, t),
        r.trigger("sync", r, n, t)
      }
      ,
      N(this, t),
      this.sync("read", this, t)
    },
    create: function(t, e) {
      if (e = e ? n.clone(e) : {},
      !(t = this._prepareModel(t, e)))
        return !1;
      e.wait || this.add(t, e);
      var r = this
        , i = e.success;
      return e.success = function(t, n) {
        e.wait && r.add(t, e),
        i && i(t, n, e)
      }
      ,
      t.save(null, e),
      t
    },
    parse: function(t, e) {
      return t
    },
    clone: function() {
      return new this.constructor(this.models,{
        model: this.model,
        comparator: this.comparator
      })
    },
    modelId: function(t) {
      return t[this.model.prototype.idAttribute || "id"]
    },
    _reset: function() {
      this.length = 0,
      this.models = [],
      this._byId = {}
    },
    _prepareModel: function(t, e) {
      if (this._isModel(t))
        return t.collection || (t.collection = this),
        t;
      e = e ? n.clone(e) : {},
      e.collection = this;
      var r = new this.model(t,e);
      return r.validationError ? (this.trigger("invalid", this, r.validationError, e),
      !1) : r
    },
    _isModel: function(t) {
      return t instanceof f
    },
    _addReference: function(t, e) {
      this._byId[t.cid] = t;
      var n = this.modelId(t.attributes);
      null != n && (this._byId[n] = t),
      t.on("all", this._onModelEvent, this)
    },
    _removeReference: function(t, e) {
      this === t.collection && delete t.collection,
      t.off("all", this._onModelEvent, this)
    },
    _onModelEvent: function(t, e, n, r) {
      if ("add" !== t && "remove" !== t || n === this) {
        if ("destroy" === t && this.remove(e, r),
        "change" === t) {
          var i = this.modelId(e.previousAttributes())
            , o = this.modelId(e.attributes);
          i !== o && (null != i && delete this._byId[i],
          null != o && (this._byId[o] = e))
        }
        this.trigger.apply(this, arguments)
      }
    }
  });
  var v = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample", "partition"];
  n.each(v, function(t) {
    n[t] && (p.prototype[t] = function() {
      var e = a.call(arguments);
      return e.unshift(this.models),
      n[t].apply(n, e)
    }
    )
  });
  var g = ["groupBy", "countBy", "sortBy", "indexBy"];
  n.each(g, function(t) {
    n[t] && (p.prototype[t] = function(e, r) {
      var i = n.isFunction(e) ? e : function(t) {
        return t.get(e)
      }
      ;
      return n[t](this.models, i, r)
    }
    )
  });
  var y = e.View = function(t) {
    this.cid = n.uniqueId("view"),
    t || (t = {}),
    n.extend(this, n.pick(t, w)),
    this._ensureElement(),
    this.initialize.apply(this, arguments)
  }
    , b = /^(\S+)\s*(.*)$/
    , w = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
  n.extend(y.prototype, s, {
    tagName: "div",
    $: function(t) {
      return this.$el.find(t)
    },
    initialize: function() {},
    render: function() {
      return this
    },
    remove: function() {
      return this._removeElement(),
      this.stopListening(),
      this
    },
    _removeElement: function() {
      this.$el.remove()
    },
    setElement: function(t) {
      return this.undelegateEvents(),
      this._setElement(t),
      this.delegateEvents(),
      this
    },
    _setElement: function(t) {
      this.$el = t instanceof e.$ ? t : e.$(t),
      this.el = this.$el[0]
    },
    delegateEvents: function(t) {
      if (!t && !(t = n.result(this, "events")))
        return this;
      this.undelegateEvents();
      for (var e in t) {
        var r = t[e];
        if (n.isFunction(r) || (r = this[t[e]]),
        r) {
          var i = e.match(b);
          this.delegate(i[1], i[2], n.bind(r, this))
        }
      }
      return this
    },
    delegate: function(t, e, n) {
      this.$el.on(t + ".delegateEvents" + this.cid, e, n)
    },
    undelegateEvents: function() {
      return this.$el && this.$el.off(".delegateEvents" + this.cid),
      this
    },
    undelegate: function(t, e, n) {
      this.$el.off(t + ".delegateEvents" + this.cid, e, n)
    },
    _createElement: function(t) {
      return document.createElement(t)
    },
    _ensureElement: function() {
      if (this.el)
        this.setElement(n.result(this, "el"));
      else {
        var t = n.extend({}, n.result(this, "attributes"));
        this.id && (t.id = n.result(this, "id")),
        this.className && (t.class = n.result(this, "className")),
        this.setElement(this._createElement(n.result(this, "tagName"))),
        this._setAttributes(t)
      }
    },
    _setAttributes: function(t) {
      this.$el.attr(t)
    }
  }),
  e.sync = function(t, r, i) {
    var o = x[t];
    n.defaults(i || (i = {}), {
      emulateHTTP: e.emulateHTTP,
      emulateJSON: e.emulateJSON
    });
    var a = {
      type: o,
      dataType: "json"
    };
    if (i.url || (a.url = n.result(r, "url") || q()),
    null != i.data || !r || "create" !== t && "update" !== t && "patch" !== t || (a.contentType = "application/json",
    a.data = JSON.stringify(i.attrs || r.toJSON(i))),
    i.emulateJSON && (a.contentType = "application/x-www-form-urlencoded",
    a.data = a.data ? {
      model: a.data
    } : {}),
    i.emulateHTTP && ("PUT" === o || "DELETE" === o || "PATCH" === o)) {
      a.type = "POST",
      i.emulateJSON && (a.data._method = o);
      var s = i.beforeSend;
      i.beforeSend = function(t) {
        if (t.setRequestHeader("X-HTTP-Method-Override", o),
        s)
          return s.apply(this, arguments)
      }
    }
    "GET" === a.type || i.emulateJSON || (a.processData = !1);
    var u = i.error;
    i.error = function(t, e, n) {
      i.textStatus = e,
      i.errorThrown = n,
      u && u.apply(this, arguments)
    }
    ;
    var c = i.xhr = e.ajax(n.extend(a, i));
    return r.trigger("request", r, c, i),
    c
  }
  ;
  var x = {
    create: "POST",
    update: "PUT",
    patch: "PATCH",
    delete: "DELETE",
    read: "GET"
  };
  e.ajax = function() {
    return e.$.ajax.apply(e.$, arguments)
  }
  ;
  var _ = e.Router = function(t) {
    t || (t = {}),
    t.routes && (this.routes = t.routes),
    this._bindRoutes(),
    this.initialize.apply(this, arguments)
  }
    , E = /\((.*?)\)/g
    , S = /(\(\?)?:\w+/g
    , k = /\*\w+/g
    , j = /[\-{}\[\]+?.,\\\^$|#\s]/g;
  n.extend(_.prototype, s, {
    initialize: function() {},
    route: function(t, r, i) {
      n.isRegExp(t) || (t = this._routeToRegExp(t)),
      n.isFunction(r) && (i = r,
      r = ""),
      i || (i = this[r]);
      var o = this;
      return e.history.route(t, function(n) {
        var a = o._extractParameters(t, n);
        o.execute(i, a, r) !== !1 && (o.trigger.apply(o, ["route:" + r].concat(a)),
        o.trigger("route", r, a),
        e.history.trigger("route", o, r, a))
      }),
      this
    },
    execute: function(t, e, n) {
      t && t.apply(this, e)
    },
    navigate: function(t, n) {
      return e.history.navigate(t, n),
      this
    },
    _bindRoutes: function() {
      if (this.routes) {
        this.routes = n.result(this, "routes");
        for (var t, e = n.keys(this.routes); null != (t = e.pop()); )
          this.route(t, this.routes[t])
      }
    },
    _routeToRegExp: function(t) {
      return t = t.replace(j, "\\$&").replace(E, "(?:$1)?").replace(S, function(t, e) {
        return e ? t : "([^/?]+)"
      }).replace(k, "([^?]*?)"),
      new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$")
    },
    _extractParameters: function(t, e) {
      var r = t.exec(e).slice(1);
      return n.map(r, function(t, e) {
        return e === r.length - 1 ? t || null : t ? decodeURIComponent(t) : null
      })
    }
  });
  var T = e.History = function() {
    this.handlers = [],
    n.bindAll(this, "checkUrl"),
    "undefined" != typeof window && (this.location = window.location,
    this.history = window.history)
  }
    , O = /^[#\/]|\s+$/g
    , A = /^\/+|\/+$/g
    , M = /#.*$/;
  T.started = !1,
  n.extend(T.prototype, s, {
    interval: 50,
    atRoot: function() {
      var t = this.location.pathname.replace(/[^\/]$/, "$&/");
      return t === this.root && !this.getSearch()
    },
    getSearch: function() {
      var t = this.location.href.replace(/#.*/, "").match(/\?.+/);
      return t ? t[0] : ""
    },
    getHash: function(t) {
      var e = (t || this).location.href.match(/#(.*)$/);
      return e ? e[1] : ""
    },
    getPath: function() {
      var t = decodeURI(this.location.pathname + this.getSearch())
        , e = this.root.slice(0, -1);
      return t.indexOf(e) || (t = t.slice(e.length)),
      "/" === t.charAt(0) ? t.slice(1) : t
    },
    getFragment: function(t) {
      return null == t && (t = this._hasPushState || !this._wantsHashChange ? this.getPath() : this.getHash()),
      t.replace(O, "")
    },
    start: function(t) {
      if (T.started)
        throw new Error("Backbone.history has already been started");
      if (T.started = !0,
      this.options = n.extend({
        root: "/"
      }, this.options, t),
      this.root = this.options.root,
      this._wantsHashChange = this.options.hashChange !== !1,
      this._hasHashChange = "onhashchange"in window,
      this._wantsPushState = !!this.options.pushState,
      this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState),
      this.fragment = this.getFragment(),
      this.root = ("/" + this.root + "/").replace(A, "/"),
      this._wantsHashChange && this._wantsPushState) {
        if (!this._hasPushState && !this.atRoot()) {
          var e = this.root.slice(0, -1) || "/";
          return this.location.replace(e + "#" + this.getPath()),
          !0
        }
        this._hasPushState && this.atRoot() && this.navigate(this.getHash(), {
          replace: !0
        })
      }
      if (!this._hasHashChange && this._wantsHashChange && (!this._wantsPushState || !this._hasPushState)) {
        var r = document.createElement("iframe");
        r.src = "javascript:0",
        r.style.display = "none",
        r.tabIndex = -1;
        var i = document.body;
        this.iframe = i.insertBefore(r, i.firstChild).contentWindow,
        this.iframe.document.open().close(),
        this.iframe.location.hash = "#" + this.fragment
      }
      var o = window.addEventListener || function(t, e) {
        return attachEvent("on" + t, e)
      }
      ;
      if (this._hasPushState ? o("popstate", this.checkUrl, !1) : this._wantsHashChange && this._hasHashChange && !this.iframe ? o("hashchange", this.checkUrl, !1) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)),
      !this.options.silent)
        return this.loadUrl()
    },
    stop: function() {
      var t = window.removeEventListener || function(t, e) {
        return detachEvent("on" + t, e)
      }
      ;
      this._hasPushState ? t("popstate", this.checkUrl, !1) : this._wantsHashChange && this._hasHashChange && !this.iframe && t("hashchange", this.checkUrl, !1),
      this.iframe && (document.body.removeChild(this.iframe.frameElement),
      this.iframe = null),
      this._checkUrlInterval && clearInterval(this._checkUrlInterval),
      T.started = !1
    },
    route: function(t, e) {
      this.handlers.unshift({
        route: t,
        callback: e
      })
    },
    checkUrl: function(t) {
      var e = this.getFragment();
      return e === this.fragment && this.iframe && (e = this.getHash(this.iframe)),
      e !== this.fragment && (this.iframe && this.navigate(e),
      void this.loadUrl())
    },
    loadUrl: function(t) {
      return t = this.fragment = this.getFragment(t),
      n.any(this.handlers, function(e) {
        if (e.route.test(t))
          return e.callback(t),
          !0
      })
    },
    navigate: function(t, e) {
      if (!T.started)
        return !1;
      e && e !== !0 || (e = {
        trigger: !!e
      }),
      t = this.getFragment(t || "");
      var n = this.root;
      "" !== t && "?" !== t.charAt(0) || (n = n.slice(0, -1) || "/");
      var r = n + t;
      if (t = decodeURI(t.replace(M, "")),
      this.fragment !== t) {
        if (this.fragment = t,
        this._hasPushState)
          this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, r);
        else {
          if (!this._wantsHashChange)
            return this.location.assign(r);
          this._updateHash(this.location, t, e.replace),
          this.iframe && t !== this.getHash(this.iframe) && (e.replace || this.iframe.document.open().close(),
          this._updateHash(this.iframe.location, t, e.replace))
        }
        return e.trigger ? this.loadUrl(t) : void 0
      }
    },
    _updateHash: function(t, e, n) {
      if (n) {
        var r = t.href.replace(/(javascript:|#).*$/, "");
        t.replace(r + "#" + e)
      } else
        t.hash = "#" + e
    }
  }),
  e.history = new T;
  var C = function(t, e) {
    var r, i = this;
    r = t && n.has(t, "constructor") ? t.constructor : function() {
      return i.apply(this, arguments)
    }
    ,
    n.extend(r, i, e);
    var o = function() {
      this.constructor = r
    };
    return o.prototype = i.prototype,
    r.prototype = new o,
    t && n.extend(r.prototype, t),
    r.__super__ = i.prototype,
    r
  };
  f.extend = p.extend = _.extend = y.extend = T.extend = C;
  var q = function() {
    throw new Error('A "url" property or function must be specified')
  }
    , N = function(t, e) {
    var n = e.error;
    e.error = function(r) {
      n && n(t, r, e),
      t.trigger("error", t, r, e)
    }
  };
  return e
}),
function(t) {
  function e(e) {
    if (e.targetTouches.length > 1)
      return !0;
    v = e.target;
    var n = t(v).closest(".nofastclick");
    if (n.length > 0 || u(v))
      return !0;
    if (E) {
      var r = window.getSelection();
      if (r.rangeCount && !r.isCollapsed)
        return !0;
      if (e.targetTouches[0].identifier === S)
        return event.preventDefault(),
        !1;
      S = e.targetTouches[0].identifier
    }
    return h = !0,
    p = e.timeStamp,
    g = e.targetTouches[0].pageX,
    y = e.targetTouches[0].pageY,
    e.timeStamp - d < 0 && (d = e.timeStamp),
    e.timeStamp - d < 200 && e.preventDefault(),
    !0
  }
  function n(t) {
    return !h || (b = t.changedTouches[0].pageX,
    w = t.changedTouches[0].pageY,
    (Math.abs(b - g) > x || Math.abs(w - y) > x) && (v = null,
    h = !1),
    !0)
  }
  function r(e) {
    if (!h || "input" == e.target.nodeName.toLocaleLowerCase() && "file" == e.target.type)
      return !0;
    if (e.timeStamp - d < 200)
      return m = !0,
      !0;
    d = e.timeStamp,
    h = !1;
    var n = v.tagName.toLowerCase();
    if ("label" == n) {
      var r = c(v);
      if (r) {
        var i = t(r);
        if ("checkbox" == i.attr("type") || "radio" == i.attr("type") ? i.attr("checked") ? i.removeAttr("checked") : i.attr("checked", "checked") : t(r).focus(),
        _)
          return !1;
        v = r
      }
    } else if (u(v)) {
      if (e.timeStamp - p > 100)
        return v = null,
        !1;
      var o;
      return E && v.setSelectionRange && 0 !== v.type.indexOf("date") && "time" !== v.type ? (o = v.value.length,
      v.setSelectionRange(o, o)) : v.focus(),
      "select" !== n && (v = null,
      e.preventDefault()),
      !1
    }
    return p = 0,
    s(v) || (e.preventDefault(),
    l(v, e)),
    !1
  }
  function i(t) {
    h = !1,
    v = null
  }
  function o(e) {
    var n = e.target
      , r = t(n).closest(".nofastclick");
    return !!(r.length > 0 || u(n)) || (!v || (!!e.touchEvent || (!e.cancelable || (!(!s(v) || m) || (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0,
    e.stopPropagation(),
    e.preventDefault(),
    !1)))))
  }
  function a(t) {
    if (h)
      return h = !1,
      v = null,
      !0;
    if ("submit" === t.target.type && 0 === t.detail)
      return !0;
    var e = o(t);
    return e || (v = null),
    e
  }
  function s(t) {
    switch (t.nodeName.toLowerCase()) {
    case "button":
    case "select":
    case "textarea":
      if (t.disabled)
        return !0;
      break;
    case "input":
      if (E && "file" === t.type || t.disabled)
        return !0;
      break;
    case "video":
      return !0
    }
    return /\bneedclick\b/.test(t.className)
  }
  function u(t) {
    switch (t.nodeName.toLowerCase()) {
    case "textarea":
    case "select":
      return !0;
    case "input":
      switch (t.type) {
      case "button":
      case "checkbox":
      case "file":
      case "image":
      case "radio":
      case "submit":
        return !1
      }
      return !t.disabled && !t.readOnly;
    default:
      return /\bneedfocus\b/.test(t.className)
    }
  }
  function c(t) {
    return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
  }
  function l(t, e) {
    var n, r;
    document.activeElement && document.activeElement !== t && document.activeElement.blur(),
    r = e.changedTouches[0],
    n = document.createEvent("MouseEvents"),
    n.initMouseEvent("click", !0, !0, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null),
    n.touchEvent = !0,
    t.dispatchEvent(n)
  }
  function f() {
    return "undefined" != typeof window.ontouchstart
  }
  var h = !1
    , p = 0
    , d = 0
    , m = !1
    , v = null
    , g = 0
    , y = 0
    , b = 0
    , w = 0
    , x = 4
    , _ = navigator.userAgent.indexOf("Android") > 0
    , E = /iP(ad|hone|od)/.test(navigator.userAgent)
    , S = 0;
  E && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);
  t.needFocus = u,
  t.bindFastClick = function() {
    return !f() || void t(document).ready(function() {
      _ && (document.addEventListener("mouseover", o, !0),
      document.addEventListener("mousedown", o, !0),
      document.addEventListener("mouseup", o, !0)),
      document.addEventListener("click", a, !0),
      t(document).on("touchstart", e).on("touchmove", n).on("touchend", r).on("touchcancel", i)
    })
  }
  ,
  t.unbindFastClick = function() {
    return !f() || (_ && (document.removeEventListener("mouseover", o, !0),
    document.removeEventListener("mousedown", o, !0),
    document.removeEventListener("mouseup", o, !0)),
    document.removeEventListener("click", a, !0),
    void t(document).off("touchstart", e).off("touchmove", n).off("touchend", r).off("touchcancel", i))
  }
}(Zepto),
function() {
  var t = "./blade/";
  require.config({
    shim: {
      $: {
        exports: "Zepto"
      },
      _: {
        exports: "_"
      },
      B: {
        deps: ["_", "$"],
        exports: "Backbone"
      },
      F: {
        deps: ["$"],
        exports: "Fastclick"
      },
      libs: {
        deps: ["_", "$", "B"],
        exports: "libs"
      },
      common: {
        deps: ["libs"]
      },
      cAjax: {
        exports: "cAjax"
      },
      UIView: {
        deps: ["B"],
        exports: "UIView"
      }
    },
    paths: {
      R: t + "libs/require",
      $: t + "libs/zepto",
      _: t + "libs/underscore",
      B: t + "libs/backbone",
      F: t + "libs/fastclick",
      libs: t + "libs/libs",
      text: t + "libs/require.text",
      cAjax: t + "mvc/c.ajax",
      AbstractApp: t + "mvc/abstract.app",
      AbstractModel: t + "mvc/abstract.model",
      AbstractView: t + "mvc/abstract.view",
      Cache: t + "common/Cache",
      cDetect: t + "common/c.detect",
      cValidate: t + "common/c.validate",
      cSchema: t + "common/c.schema",
      cCount: t + "common/c.count",
      cBackAction: t + "common/c.backaction",
      jWeixin: t + "common/jweixin-1.0.0",
      wxJSSDK: t + "common/wxJSSDK",
      QRCode: t + "common/QRCode",
      protobuf: t + "common/protobuf",
      RongEmoji: t + "common/RongEmoji",
      RongIMLib: t + "common/RongIMLib",
      cUtilDate: t + "util/c.util.date",
      cUtilObject: t + "util/c.util.object",
      cAbstractStorage: t + "data/storage/c.abstract.storage",
      cLocalStorage: t + "data/storage/c.local.storage",
      cAbstractStore: t + "data/store/c.abstract.store",
      cLocalStore: t + "data/store/c.local.store",
      UIView: t + "ui/core.abstract.view",
      C_UIView: t + "ui/core.abstract.view.css",
      UIHeader: t + "ui/core.header",
      T_UIHeader: t + "ui/core.header.html",
      C_UIHeader: t + "ui/core.header.css",
      UIToolBar: t + "ui/core.toolbar",
      T_UIToolBar: t + "ui/core.toolbar.html",
      LazyLoad: t + "function/lazyload",
      Swiper: t + "function/swiper",
      UIDownTip: t + "ui/ui.downtip",
      UISwiper: t + "ui/ui.swiper",
      UIMask: t + "ui/ui.mask",
      UILayer: t + "ui/ui.layer",
      UILayerPanel: t + "ui/ui.layer.panel",
      UILoadingLayer: t + "ui/ui.loading.layer",
      T_UILoadingLayer: t + "ui/ui.loading.layer.html",
      UIToast: t + "ui/ui.toast",
      T_UIToast: t + "ui/ui.toast.html",
      UITab: t + "ui/ui.tab",
      T_UITab: t + "ui/ui.tab.html",
      UIAlert: t + "ui/ui.alert",
      T_UIAlert: t + "ui/ui.alert.html",
      cPageView: t + "page/c.page.view",
      cPageList: t + "page/c.page.list"
    },
    map: {
      "*": {
        cStore: "cLocalStore"
      }
    }
  })
}();

$(function(){
  console.log('src ready');
});

console.log(document.currentScript);

(function(){
  console.log('b');
})();
