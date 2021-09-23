
// fetch
function ajax(url, options) {
  const opts = Object.assign({
    headers: {
      'Content-Type': 'application/json',
    },
  }, options);
  fetch(url, opts)
    .then(res => {
      if (!res.ok) throw Error(res)
      return res.json()
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

// https://juejin.cn/post/6986648201823125541
// https://www.cnblogs.com/wisewrong/p/15031654.html
// https://www.cnblogs.com/warm-stranger/p/13229540.html
