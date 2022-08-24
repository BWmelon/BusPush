// pages/add/add.js
const app = getApp()
import {
  createCode
} from '../../utils/util'

const { mpserverless } = getApp();

import { codeCollection } from '../../utils/db'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityName: '',
    cityId: '',
    linesList: [], // 路线列表
    name: '',
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
    mpserverless.function.invoke('searchLine', { cityId: this.data.cityId, key: e.detail })
    .then(res => {
      if(res.success && res.result.errCode === 0) {
        this.setData({
          linesList: res.result.data
        })
      } else {
        wx.showToast({
          title: '路线搜索失败',
        })
      }
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
      name: this.data.linesList.find(item => item.lineId === lineId).name,
    })

    mpserverless.function.invoke('getLineRoute', { cityId: this.data.cityId, lineId })
    .then(res => {
      if(res.success && res.result.errCode === 0) {
        this.setData({
          stationList: res.result.data
        })
      } else {
        wx.showToast({
          title: '站点获取失败',
        })
      }
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
   * 生成code
   */
  getCode() {
    return new Promise((resolve, reject) => {
      const code = createCode(6)
      codeCollection.find({
        code
      }).then(res => {
        console.log(res);
        if (res.result.length) {
          this.getCode()
        } else {
          resolve(code)
        }
      })
    })
  },

  /**
   * 添加一条记录
   */
  async addRecord() {
    let code = await this.getCode()
    mpserverless.db.collection('code').insertOne({
      userId: getApp().globalData.userId,
      openid: getApp().globalData.openid,
      cityName: this.data.cityName, // 城市名
      cityId: this.data.cityId, // 城市Id
      name: this.data.name, // 路线名
      lineId: this.data.lineId, // 线路Id
      startSn: this.data.startSn, // 起始站
      endSn: this.data.endSn, // 终点站
      sId: this.data.sId, // 站点id
      sn: this.data.sn, // 站点名
      date: new Date().getTime(), // 创建时间
      code
    })
    .then(() => {
      wx.showToast({
        title: `添加成功，推送码为：${code}`,
        icon: 'none',
      });
    })
    .catch(console.error);
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