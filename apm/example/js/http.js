// 请求返回错误
// 模拟请求超时，请求网络错误等

// xhr
function ajax(url, options) {
  const noop = () => {}
  const {
    method = 'get',
    success = noop,
    fail = noop,
    complete = noop,
  } = options

  // 1. 创建
  const xhr = new XMLHttpRequest();

  // 2. 等待数据响应, 需要 open 之前设定
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      if((xhr.status >= 200 && xhr.status < 300)||xhr.status == 304){
        success(xhr.responseText);
      }else{
        fail("Error:" + xhr.status);
      }
    }
  }

  // 3. 如需要，send 之前设置请求头
  // xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')

  // 4. 调用 open
  xhr.open(method, url, true);

  // 5. 发起请求
  xhr.send();
}

// fetch
fetch('https://example.com/movies.json')
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  });

