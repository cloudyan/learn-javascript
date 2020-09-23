/*!
 * @Author: cloudyan <cloudcode@qq.com>
 * @Date: 2020-09-15 16:10:13
 * 功能说明: 兼容处理 requestAnimationFrame
 */

// 处理以下问题:
// - globalThis 小程序内为 global
// - requestAnimationFrame polyfill
// - raf caf draf

// 无 requestAnimationFrame，则降级使用 setTimeout 模拟
const frameDuration = 1000 / 60
let prev = Date.now()

function callback(fn) {
  const curr = Date.now()
  const delay = Math.max(0, frameDuration - (curr - prev))
  const id = setTimeout(fn, delay)
  prev = curr + delay
  return id
}

let iRaf = callback
let iCaf = clearTimeout

try {
  iRaf = requestAnimationFrame
  iCaf = cancelAnimationFrame
} catch(err) {
  console.error(err)
}

export function caf(id) {
  iCaf.call(this, id)
}

const raf = function raf(fn) {
  console.log(111)
  iRaf.call(this, fn)
}
raf.cancel = caf

export function draf(fn) {
  raf(() => {
    raf(fn)
  })
}

export default raf


