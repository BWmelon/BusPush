import { lineCollection } from '../../utils/db'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lineList: []
    },

    /**
     * 获取路线列表
     */
    getLineList() {
        wx.showLoading({
            title: '加载中',
            mask: true,
        });

        lineCollection.find({ openid: app.globalData.openid }).then(res => {
            wx.hideLoading()
            this.setData({
                lineList: res.result
            })
        })
    },

    /**
     * 滑动事件
     * @param {object} event 当前对象
     */
    onClose(event) {
        const id = event.currentTarget.dataset.id
        const { position, instance } = event.detail;
        switch (position) {
            case 'cell':
                instance.close();
                break;
            case 'right':
                wx.showModal({
                    title: '提示',
                    content: '是否确认删除？',
                    showCancel: true,
                    success: (result) => {
                        if (result.confirm) {
                            lineCollection.deleteOne({
                                _id: id
                            }).then(res => {
                                if (res.affectedDocs > 0) {
                                    wx.showToast({
                                        title: '删除成功',
                                        icon: 'true'
                                    })
                                    instance.close();
                                    this.getLineList()
                                } else {
                                    wx.showToast({
                                        title: '删除失败',
                                        icon: 'true'
                                    })
                                    instance.close();
                                }
                            })
                        }
                        if (result.cancel) {
                            instance.close();
                        }
                    },
                    fail: () => {},
                    complete: () => {}
                });
                break;
        }
    },

    /**
     * 跳转添加页面
     */
    handleAdd() {
        wx.navigateTo({
            url: '/pages/add/add',
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getLineList()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})