// https://rogerio-oliveira.medium.com/an-alternative-way-to-use-async-await-without-try-catch-blocks-in-node-js-3eac93fd8e1
export default (promise) => {
  return promise.then(res => [null, data]).catch(err => [err])
}
