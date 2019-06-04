// 可以将一些公共的代码抽离成为一个单独的 js(utils.js)文件，作为一个模块;
// 模块只有通过 module.exports 或者 exports 才能对外暴露接口。
// 所以当你在util.js里封装的方法想要在外部使用的话, 必须通过 module.exports 或者 exports 对外暴露
// 使用 require(path) 将公共代码引入
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
module.exports = {
  formatTime: formatTime,//'对外方法名':'本地方法名'
}
