

import promiseHandler from './promiseHandler'

export const getAll = async (req, res) => {
  try {
    const people = await promiseHandler(getData())
    const projects = await promiseHandler(getProjects())
    const supplies = await promiseHandler(getSupplies())

    res.status(200).send({people, projects, supplies})
  } catch (err) {
    res.status(500).send(err)
  }
}


// 当在同一个方法中实现了多个异步操作并且错误处理对于两种情况相同时，
// 新的 promise 处理程序可能不是最佳选择（回到 tr-catch 反而能避免重复）。
let err = null
let data = null
export const getAll2 = async (req, res) => {
  [err, data] = await promiseHandler(getData())
  if (err) return res.status(500).send(err)
  const people = data

  [err, data] = await promiseHandler(getProjects())
  if (err) return res.status(500).send(err)
  const projects = data

  [err, data] = await promiseHandler(getSupplies())
  if (err) return res.status(500).send(err)
  const supplies = data

  res.status(200).send({people, projects, supplies})
}
