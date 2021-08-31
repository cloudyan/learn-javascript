var _fetch = window.fetch;
window.fetch = function () {
  var attr = {
    method: arguments[1].method,
    url: arguments[0],
    duration: new Date().getTime()
  };

  return _fetch.apply(this, arguments).then(res => {
    attr.status = res.status;
    attr.duration = new Date().getTime() - attr.duration;
    // 上报【API】事件
    return res;
  });
}
