// pages/nearby/nearby.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    this.getLocation()
  },

  /**
   * 获取定位信息
   */
  getLocation() {
    wx.getLocation({
      type: 'gcj02'
    }).then(res => {
      console.log(res)
      this.setData({
        latitude: res.latitude,
        longitude: res.longitude
      })
    }).catch(() => {
      Dialog.confirm({
        title: '提示',
        message: '位置获取失败，请打开位置消息授权',
        confirmButtonText: '前往打开',
        showCancelButton: false
      }).then(() => {
        wx.openSetting({
          withSubscriptions: false
        })
      })
    })
  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})