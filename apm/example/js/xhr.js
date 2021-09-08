// 请求返回错误
// 模拟请求超时，请求网络错误等

// xhr 回调版本
function ajax(url, options = {}) {
  const noop = () => {}
  const {
    method = 'get',
    success = noop,
    fail = noop,
    complete = noop,
  } = options
  // 1. 创建ajax对象
  var xhr = null;
  try {
    xhr = new XMLHttpRequest();
  }catch(error){
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // 2. 等待数据响应
  // 必须在调用open()方法之前指定onreadystatechange事件处理程序才能确保跨域浏览器兼容性                //问题
  // 只要readyState属性的值有变化，就会触发readystatechange事件
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
        try {
          const res = JSON.parse(xhr.responseText)

          const {errno} = res
          if (errno === 0) {
            // 业务错误
            success(res)
          } else {
            fail({
              status: errno,
              statusText: res.errmsg,
            })
          }
        } catch (err) {
          // 一般为数据处理错误，此类错误应该要上报
          fail({
            status: err.name,
            statusText: err.message,
          }, err);
        }
      } else {
        // const { status, statusText } = xhr;
        fail(xhr);
      }
    }
  }

  // 3. 调用open
  xhr.open(method, url, true);

  // 4. 设置 HTTP 请求头的值。必须在 open() 之后、send() 之前调用
  // xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')

  // 5. 调用send
  xhr.send();
}

