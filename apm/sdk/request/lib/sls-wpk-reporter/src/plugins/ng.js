! function (o, n) {
  "object" == typeof exports && "object" == typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define([], n) : "object" == typeof exports ? exports.wpkngPlugin = n() : o.wpkngPlugin = n()
}(this, function () {
  function o(n, o) {
    var e, r;
    "function" == typeof (e = o) && "handleError" in new e ? (n.logger.info("ngplugin 已开启"), r = o.prototype.handleError, o.prototype.handleError = function (o) {
      try {
        r(o)
      } catch (o) {}
      n.reportError(o)
    }) : n.logger.warn("GlobalErrorHandler 函数传入有误")
  }
  return o.prototype.pluginId = "ngplugin", o
});
