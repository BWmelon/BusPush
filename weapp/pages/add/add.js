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
        running: false,
        showDialog: false,
        currentTimeType: 'start',
        currentTime: '00:00',
        startTime: '00:00',
        endTime: '23:59'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: (options) => {},


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        // 如果切换了城市，则清空数据
        if (this.data.cityName && this.data.cityName !== app.globalData.city.name) {
            this.setData({
                linesList: [],
                name: '',
                lineId: '',
                startSn: '',
                endSn: '',
                stationList: [],
                sId: '',
                sn: ''
            })
        }
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
        clearTimeout(this.data.running)
        this.setData({
            running: setTimeout(() => {
                this.handleSearchLine(e.detail)
            }, 300)
        })


    },

    /**
     * 路线搜索
     * @param {string} key 搜索关键词
     */
    handleSearchLine(key) {
        if (!key) {
            this.setData({
                linesList: []
            })
            return
        }
        mpserverless.function.invoke('searchLine', { cityId: this.data.cityId, key })
            .then(res => {
                if (res.success && res.result.errCode === 0) {
                    this.setData({
                        linesList: res.result.data
                    })
                } else {
                    wx.showToast({
                        title: '路线搜索失败',
                        icon: 'none'
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
                if (res.success && res.result.errCode === 0) {
                    this.setData({
                        stationList: res.result.data
                    })
                } else {
                    wx.showToast({
                        title: '站点获取失败',
                        icon: 'none'
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
        wx.showModal({
            title: '提示',
            content: '是否确认生成',
            showCancel: true,
            success: (result) => {
                if (result.confirm) {
                    this.addRecord()
                }
            },
            fail: () => {},
            complete: () => {}
        });

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
                startTime: this.data.startTime,
                endTime: this.data.endTime,
                date: new Date().getTime(), // 创建时间
                code
            })
            .then(() => {
                wx.showModal({
                    title: '提示',
                    content: `查询码生成成功：${code}，请在穿戴设备中添加`,
                    showCancel: false,
                    confirmText: '确定',
                    success: (result) => {
                        if (result.confirm) {
                            wx.navigateBack({
                                delta: 0,
                            })
                        }
                    },
                    fail: () => {},
                    complete: () => {}
                });
            })
            .catch(console.error);
    },

    /**
     * 切换路线
     */
    changeLine() {
        this.setData({
            name: '',
            linesList: [],
            lineId: '',
            startSn: '',
            endSn: '',
            stationList: [],
            sId: '',
            sn: ''
        })
    },

    /**
     * 切换等待站点
     */
    changeSn() {
        this.setData({
            sId: '',
            sn: ''
        })
    },

    /**
     * 关闭弹窗
     */

    closeDialog() {
        this.setData({
            showDialog: false
        })
    },

    /**
     * 时间选择弹窗
     * @param {object} e 点击对象
     */
    changeTime(e) {
        let timeType = e.currentTarget.dataset.type
        let time = timeType === 'start' ? this.data.startTime : this.data.endTime
        this.setData({
            currentTimeType: timeType,
            currentTime: time,
            showDialog: true
        })
    },

    /**
     * 时间选择
     * @param {object} e 时间选择对象
     */
    onInputTime(e) {
        this.setData({
            currentTime: e.detail
        })
    },

    /**
     * 确认时间选择
     */
    confirmTime() {
        if (!this.validateTime()) return
        if (this.data.currentTimeType === 'start') {
            this.setData({
                startTime: this.data.currentTime,
                showDialog: false
            })
        } else if (this.data.currentTimeType === 'end') {
            this.setData({
                endTime: this.data.currentTime,
                showDialog: false
            })
        }
    },

    /**
     * 时间验证
     */
    validateTime() {
        let currentTimeNum = Number(this.data.currentTime.split(':')[0]) * 60 + Number(this.data.currentTime.split(':')[1])
        let startTimeNum = Number(this.data.startTime.split(':')[0]) * 60 + Number(this.data.startTime.split(':')[1])
        let endTimeNum = Number(this.data.endTime.split(':')[0]) * 60 + Number(this.data.endTime.split(':')[1])

        console.log(currentTimeNum, startTimeNum, endTimeNum);
        if (this.data.currentTimeType === 'start') {
            if (currentTimeNum > endTimeNum) {
                wx.showToast({
                    title: '开始时间不能大于结束时间',
                    icon: 'none'
                })
                return false
            } else {
                return true
            }
        } else if (this.data.currentTimeType === 'end') {
            if (currentTimeNum < startTimeNum) {
                wx.showToast({
                    title: '结束时间不能早于开始时间',
                    icon: 'none'
                })
                return false
            } else {
                return true
            }
        } else {
            return true
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        app.globalData.city.name = ''
        app.globalData.city.id = ''
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})