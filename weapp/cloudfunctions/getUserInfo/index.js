// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV // 这里可以指定具体的某个坏境
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const currentOpenid = wxContext.OPENID

  console.log('currentOpenid', currentOpenid)

  const res = await db.collection('user').where({ _openid: currentOpenid }).get()

  console.log('res', res)

  return res.data
}