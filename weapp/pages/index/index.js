// index.js
// 获取应用实例
const app = getApp()
import { userCollection } from '../../utils/db'
Page({
  data: {
    openid: '',
    key: '',
    uname: ''
  },
  onLoad() {
    this.getUserInfo()
  },
  /**
   * 获取用户信息
   */
  getUserInfo() {
    wx.cloud.callFunction({
      name: 'getUserInfo',
      data: {}
    }).then(res => {
      res = res.result
      if(res.length) {
        this.setData({
          openid: res[0]._openid,
          key: res[0].key,
          uname: res[0].uname
        })

        this.setUserInfo()
      } else {
        // 无用户，新建
        this.addUser()
      }
    })
  },
  /**
   * 新增用户
   */
  addUser() {
    userCollection.add({
      data: {
        key: '', // 密钥
        uname: '',  // 用户名
        date: new Date().getTime(), // 创建时间
      }
    }).then(() => {
      this.getUserInfo()
    })
  },
  /**
   * 设置全局用户信息
   */
  setUserInfo() {
    app.globalData.openid = this.data.openid
    app.globalData.key = this.data.key
    app.globalData.uname = this.data.uname
  },

  openAdd() {
    wx.navigateTo({
      url: '/pages/add/add',
    })
  }
})
