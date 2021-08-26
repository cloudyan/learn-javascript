! function (t, r) {
  "object" == typeof exports && "object" == typeof module ? module.exports = r(require("react")) : "function" == typeof define && define.amd ? define(["react"], r) : "object" == typeof exports ? exports.wpkreactPlugin = r(require("react")) : t.wpkreactPlugin = r(t.React)
}(this, function (i) {
  return {
    createErrorBoundaryHOC: function (n) {
      return function (e, o) {
        var r;

        function t() {
          var t = null !== r && r.apply(this, arguments) || this;
          return t.state = {
            hasError: null,
            error: null,
            info: null
          }, t
        }
        return function (t, r) {
          if (null !== r && "function" != typeof r) throw new TypeError("superClass must be null or a function");
          t.prototype = Object.create(r && r.prototype, {
            constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          })
        }(t, r = i.Component), t.prototype.componentDidCatch = function (t, r) {
          o && this.setState({
            hasError: !0,
            error: t,
            info: r
          });
          try {
            n.reportError(t, {
              bl1: r.componentStack
            })
          } catch (t) {}
        }, t.prototype.render = function () {
          if (this.state.hasError && o) {
            var t = this.state,
              r = t.error,
              t = t.info;
            return i.createElement(o, n.toolKit.extend({
              error: r,
              info: t
            }, this.props))
          }
          return i.createElement(e, this.props)
        }, t
      }
    }
  }
});
