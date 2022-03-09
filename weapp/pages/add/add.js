// pages/add/add.js
const app = getApp()
import callContainer from '../../utils/callContainer'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityName: '',
    cityId: '',
    linesList: [], // 路线列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: (options) => {
    
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log(app)
    this.setData({
      cityId: app.globalData.city.id,
      cityName: app.globalData.city.name,
    })
  },

  /**
   * 打开城市选择列表
   */
  openCity() {
    wx.navigateTo({
      url: '/pages/city/city',
    })
  },

  /**
   * 搜索
   */
  onChangeKeyword(e) {
    callContainer({
      url: `/search?cityId=${this.data.cityId}&key=${e.detail}`,
      method: 'GET',
    }).then(res => {
      this.setData({
        linesList: res.data.data
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