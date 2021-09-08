// 请求返回错误
// 模拟请求超时，请求网络错误等

// xhr 回调版本
function ajax(url, options = {}) {
  const noop = () => {}
  const {
    method = 'get',
    timeout = 0,
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
            success(res)
          } else {
            console.log('业务提示类错误')
            fail({
              status: errno,
              statusText: res.errmsg,
            })
          }
        } catch (err) {
          console.log('代码执行异常类错误')
          // 刻意制造的 304
          // 代码执行或数据解析异常类错误，此类错误应该要上报
          fail({
            status: err.name,
            statusText: err.message,
          }, err);
        }
      } else {
        if (xhr.status !== 0) {
          console.log('HTTP 状态码类错误（本质网络请求成功了）')
          // xhr.status 为 HTTP 状态码
          // const { status, statusText } = xhr;
          fail(xhr);
        }
        // 还有一种错误，触发特定错误事件 event, 结构如下
        // 如: { status: 0, statusText: '', type: 'timeout|abort|error'}
      }
    }
  }


  // 特定事件
  function addListeners(xhr) {
    // xhr.addEventListener('loadstart', handleEvent);
    // xhr.addEventListener('load', handleEvent);
    // xhr.addEventListener('loadend', handleEvent);
    // xhr.addEventListener('progress', handleEvent);
    xhr.addEventListener('timeout', handleEvent);
    xhr.addEventListener('error', handleEvent);
    xhr.addEventListener('abort', handleEvent);
  }
  function handleEvent(event) {
    console.log('网络请求失败类错误, 如超时, 中途取消, 其他错误等')
    console.log(`${event.type}: `, event);
    fail(event)
  }
  // xhr.onload = function(event) {
  //   console.log('onload event', event)
  // }
  // xhr.ontimeout = function(err) {
  //   console.log('ontimeout err', err)
  //   fail(err)
  // }
  addListeners(xhr)

  // 3. 调用open
  xhr.open(method, url, true);
  xhr.timeout = timeout; // 无符号长整型数, 超时时间, 单位是毫秒, 默认为 0 意味着无超时
  // 当超时发生，timeout 事件将会被触发


  // 4. 设置 HTTP 请求头的值。必须在 open() 之后、send() 之前调用
  // xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')

  // 5. 调用send
  xhr.send();
}

