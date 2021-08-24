const http = require('http');
const url = require('url');
const util = require('util');
const querystring = require('querystring');

// 创建一个 http 服务
// 调试 nodejs 程序，node --inspect-brk server.js, chrome 打开 `chrome://inspect` 即可
const server = http.createServer((req, res) => {
  const { method, headers: { origin } } = req;
  console.log('method', method, req.url);
  // console.log(`HEADERS: ${JSON.stringify(req.headers)}`);
  // res.writeHead(200, { 'Content-Type': 'text/plain' });
  // res.setHeader('Content-Type', 'text/plain');
  // res.setHeader('Content-Type', 'application/json');
  // res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
  // res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5000');
  // res.writeHead(200);
  res.statusCode = 200,
  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  if(method === 'GET') {
    toGet(req, res);
  }else if(method === 'POST') {
    toPost(req, res);
  }
  // const data = 'okay';
  // const data = JSON.stringify({
  //   data: {
  //     message: '自定义数据',
  //   },
  //   errno: 0,
  //   errmsg: '成功',
  // })
  // res.end(data);
});


// 启动服务, 监听端口
const PORT = '8000';
server.listen(PORT, () => {
  console.log('服务启动成功, 正在监听: ', `http://127.0.0.1:${PORT}`);
});

// 获取GET请求内容
function toGet(req, res){
  let data = 'GET请求内容：\n' + util.inspect(url.parse(req.url));
  res.end(data);
  console.log(data);
}

// 获取POST请求内容、cookie
function toPost(req, res){
  // 定义了一个data变量，用于暂存请求体的信息
  let data = '';
  // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
  req.on('data', (chunk) => {
    data += chunk;
  });
  // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
  req.on('end', () => {
    // data = querystring.parse(data);
    // res.end('POST请求内容：\n' + util.inspect(data));
    data = 'POST请求内容：\n' + data;
    res.end(data);
    console.log(data);
    // console.log('cookie内容：\n' + req.headers.cookie);
  });
}
