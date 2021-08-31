var xhr = window.XMLHttpRequest;
var _open = xhr.prototype.open;
var _send = xhr.prototype.send;
var attr = {};
var openReplacement = function (method, url) {
  // 可以存储method、url、时间打点等信息
  attr.duration = new Date().getTime();
  _open.apply(this, arguments);
}
var sendReplacement = function () {
  methods.addEvent(this, 'readystatechange', function (attr) {
    // 可以存储response的status、计算客户端实际响应时间
    attr.status = this.status;
    attr.duration = new Date().getTime() - attr.duration;
    // 上报【API】事件
  }.bind(this, , JSON.parse(JSON.stringify(attr))));
  _send.apply(this, arguments);
}
xmlhttp.prototype.open = openReplacement;
xmlhttp.prototype.send = sendReplacement;


