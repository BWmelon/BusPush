//app.js

import MPServerless from '@alicloud/mpserverless-sdk';

const { appId, spaceId, clientSecret, endpoint } = require('./config/keys')

import {
  createCode
} from './utils/util'

const mpserverless = new MPServerless(wx, {
  appId,
  spaceId,
  clientSecret,
  endpoint
});

App({
  mpserverless,
  globalData: {
    openid: '', // 小程序openid
    userId: '', // 阿里serverless用户id
    userCode: '', // 用户唯一绑定码
    city: {
      name: '',
      id: ''
    }
  },
  onLaunch: function () {
    /**
     * 生成code
     */
    const getCode = () => {
      return new Promise((resolve, reject) => {
        const userCode = createCode(6)
        mpserverless.db.collection('user').find({
          userCode
        }).then(res => {
          if (res.result.length) {
            this.getCode()
          } else {
            resolve(userCode)
          }
        })
      })
    }
    mpserverless.init().then(res => {
      if(res.success) {
        mpserverless.user.getInfo().then(res => {
          this.globalData.openid = res.result.user.oAuthUserId
          this.globalData.userId = res.result.user.userId
          mpserverless.db.collection('user').find({ openid: this.globalData.openid }).then(async res => {
            if(res.result.length) {
              res = res.result[0]
              this.globalData.userCode = res.userCode
            } else {
              // 不存在，新建用户
              let userCode = await getCode()
              mpserverless.db.collection('user').insertOne({
                openid: this.globalData.openid,
                userId: this.globalData.userId,
                userCode
              }).then(() => {
                this.globalData.userCode = userCode
              })
            }
          })
        })
      } else {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '接口初始化失败，请重新打开小程序或者联系客服',
        })
      }
    }).catch(() => {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '接口初始化失败，请重新打开小程序或者联系客服',
      })
    }); 
    console.log(__wxConfig.envVersion)
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function(res) {
          console.log('onCheckForUpdate====', res)
              // 请求完新版本信息的回调
          if (res.hasUpdate) {
              console.log('res.hasUpdate====')
              updateManager.onUpdateReady(function() {
                  wx.showModal({
                      title: '更新提示',
                      content: '新版本已经准备好，是否重启应用？',
                      success: function(res) {
                          console.log('success====', res)
                              // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                          if (res.confirm) {
                              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                              updateManager.applyUpdate()
                          }
                      }
                  })
              })
              updateManager.onUpdateFailed(function() {
                  // 新的版本下载失败
                  wx.showModal({
                      title: '已经有新版本了哟~',
                      content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
                  })
              })
          }
      })
    }
  }
})
