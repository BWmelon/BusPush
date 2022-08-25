// pages/city/city.js
let app = getApp();
const { mpserverless } = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        keyword: '',
        cityList: [],
        filterCityList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getCityList()
    },

    /**
     * 获取城市列表
     */
    getCityList() {
        wx.showLoading({
            title: '请求中',
        })
        mpserverless.function.invoke('getCityList')
            .then(res => {
                wx.hideLoading()
                if (res.success && res.result.errCode === 0) {
                    this.setData({
                        cityList: res.result.data.data.cityList,
                        filterCityList: res.result.data.data.cityList
                    })
                } else {
                    wx.showToast({
                        title: '获取城市列表失败',
                        icon: 'none'
                    })
                }
            })
    },

    /**
     * 选择城市
     */
    onSelectCity(e) {
        let id = e.currentTarget.dataset.id
        let result = this.data.cityList.find(e => e.cityId === id)

        app.globalData.city.name = result.cityName
        app.globalData.city.id = result.cityId

        wx.navigateBack({
            delta: 0,
        })
    },

    /**
     * 切换关键词
     */
    onChangeKeyword(e) {
        this.setData({
            keyword: e.detail
        })

        this.setData({
            filterCityList: e.detail ? this.data.cityList.filter(e => e.cityName.includes(this.data.keyword)) : this.data.cityList
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

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