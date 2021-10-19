const http = require('http');
const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.resolve(__dirname, '../js/sync-error.js'), 'utf-8');
// console.log('content', content);

// 协议名必填, 如果同时存在 http 和 https 就写两条
const allowOrigin = [
  'http://127.0.0.1:5000',
  'http://localhost:5000',
  'http://localhost:8090',
  'http://127.0.0.1:8090',
  // 'https://localhost:5500',
];

const PORT = 8888;
http.createServer((req, res) => {
  const { method, headers: { origin } } = req;

  // if (allowOrigin.includes(origin)) {
  //   res.setHeader('Access-Control-Allow-Origin', origin);
  // }
  // res.setHeader('Access-Control-Allow-Origin', '*');
  if (method === 'OPTIONS') {
    // 提示OPTIONS预检时，后端需要设置的两个常用自定义头
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
    res.writeHead(204);
    res.end('');
  } else {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.end(content);
  }
}).listen(PORT, () => {
  console.log('服务启动成功, 正在监听: ', PORT);
})
