! function (o, e) {
  "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.wpkvuePlugin = e() : o.wpkvuePlugin = e()
}(this, function () {
  function o(r, o) {
    var i, u;
    o ? (r.logger.info("vueplugin 已开启"), i = o.config.errorHandler, u = function (o) {
      try {
        var e = (o.version || "").split(".");
        if (0 < e.length) return Number(e[0])
      } catch (o) {}
      return 2
    }(o), r.logger.info("Vue version:", u), o.config.errorHandler = function (o, e, t) {
      var n = "[object Object]" === Object.prototype.toString.call(e);
      r.reportError(o, {
        c1: n ? `${function(o,e,t){if("vm"===o.$root)return"<Root>";var n=3===t?o.$options||o.constructor.options||{}:"function"==typeof o&&null!=o.cid?o.options:o._isVue?o.$options||o.constructor.options:o||{},t=n.name||n._componentTag,o=n.__file;return((t=!t&&o?(n=o.match(/([^/\\]+)\.vue$/))&&n[1]:t)?"component: <"+t.replace(/(?:^|[-_])(\w)/g,function(o){return o.toUpperCase()}).replace(/[-_]/g,"")+">":"<Anonymous>")+(o&&!1!==e?" file path: "+o:"")}(e,!0,u)}` : void 0,
        c2: void 0 !== t ? t : void 0
      }), "function" == typeof i && i.call(this, o, e, t)
    }) : r.logger.warn("Vue 不存在")
  }
  return o.prototype.pluginId = "vueplugin", o
});
