// index.js
// 获取应用实例
const app = getApp()
const { mpserverless } = getApp();

import { codeCollection } from '../../utils/db'

Page({
  data: {
  },
  onLoad() {
  },
  openAdd() {
    wx.navigateTo({
      url: '/pages/add/add',
    })
  },

  uuidTest() {
    codeCollection.findOne({
      code: '417748'
    }).then(res => {
      if(res.affectedDocs == 1) {
        console.log(res.result)
      }
    })
  }
})
