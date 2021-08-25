// 请求返回错误

fetch('http://example.com/movies.json')
.then((res) => res.json())
.then((res) => {
  console.log(res);
});
