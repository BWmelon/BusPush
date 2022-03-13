// pages/add/add.js
const app = getApp()
import callContainer from '../../utils/callContainer'
import {
  userCollection
} from '../../utils/db'
import {
  createUUID
} from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityName: '',
    cityId: '',
    linesList: [], // 路线列表
    lineId: '',
    startSn: '', // 起始站
    endSn: '', // 终点站
    stationList: [], // 站点列表
    sId: '', // 站点id
    sn: '', // 站点名
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
   * 选择路线
   */
  onSelectLine(e) {
    let lineId = e.currentTarget.dataset.id
    this.setData({
      lineId,
      startSn: this.data.linesList.find(item => item.lineId === lineId).startSn,
      endSn: this.data.linesList.find(item => item.lineId === lineId).endSn,
    })

    callContainer({
      url: `/lineRoute?cityId=${this.data.cityId}&lineId=${encodeURI(lineId)}`,
      method: 'GET',
    }).then(res => {
      this.setData({
        stationList: res.data.data
      })
    })
  },

  /**
   * 选择站点
   */
  onSelectStation(e) {
    let sId = e.currentTarget.dataset.id
    this.setData({
      sId,
      sn: this.data.stationList.find(item => item.sId === sId).sn
    })
  },

  /**
   * 确认添加
   */
  handleAdd() {
    this.addRecord()
  },

  /**
   * 生成uuid
   */
  getUUid() {
    return new Promise((resolve, reject) => {
      const uuid = createUUID(6)
      userCollection.where({
        uuid
      }).get().then(res => {
        if (res.data.length) {
          this.getUUid()
        } else {
          resolve(uuid)
        }
      })
    })
  },

  /**
   * 添加一条记录
   */
  async addRecord() {
    let uuid = await this.getUUid()
    userCollection.add({
      data: {
        cityName: this.data.cityName, // 城市名
        cityId: this.data.cityId, // 城市Id
        lineId: this.data.lineId, // 线路Id
        startSn: this.data.startSn, // 起始站
        endSn: this.data.endSn, // 终点站
        sId: this.data.sId, // 站点id
        sn: this.data.sn, // 站点名
        date: new Date().getTime(), // 创建时间
        uuid
      }
    }).then(() => {
      wx.showToast({
        title: `添加成功，推送码为：${uuid}`,
        icon: 'none',
      });
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