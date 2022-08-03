//app.js

import MPServerless from '@alicloud/mpserverless-sdk';

const { appId, spaceId, clientSecret, endpoint } = require('./config/keys')

const mpserverless = new MPServerless(wx, {
  appId,
  spaceId,
  clientSecret,
  endpoint
});

App({
  mpserverless,
  globalData: {
    uname: '',
    openid: '', // 小程序openid
    userId: '', // 阿里serverless用户id
    city: {
      name: '',
      id: ''
    }
  },
  onLaunch: function () {
    mpserverless.init().then(res => {
      if(res.success) {
        mpserverless.user.getInfo().then(res => {
          this.globalData.openid = res.result.user.oAuthUserId
          this.globalData.userId = res.result.user.userId
        })
      }
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
