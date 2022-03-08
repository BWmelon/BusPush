const env = (__wxConfig.envVersion === 'develop' || __wxConfig.envVersion === 'trial') ? 'dev-4gvm90b141930a09' : 'rel-7gr34ovx8ca2d1ba'
const db = wx.cloud.database(env)
const _ = db.command

const userCollection = db.collection('user')

export {
  userCollection,
  _
}