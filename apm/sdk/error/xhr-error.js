var xhr = window.XMLHttpRequest;
var oldOpen = xhr.prototype.open;
var oldSend = xhr.prototype.send;
var attr = {};
var rewriteOpen = function (method, url) {
  // 可以存储method、url、时间打点等信息
  attr.duration = new Date().getTime();
  oldOpen.apply(this, arguments);
}
var rewriteSend = function () {
  methods.addEvent(this, 'readystatechange', function (attr) {
    // 可以存储response的status、计算客户端实际响应时间
    attr.status = this.status;
    attr.duration = new Date().getTime() - attr.duration;
    // 上报【API】事件
  }.bind(this, , JSON.parse(JSON.stringify(attr))));
  oldSend.apply(this, arguments);
}
xmlhttp.prototype.open = rewriteOpen;
xmlhttp.prototype.send = rewriteSend;

