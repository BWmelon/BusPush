/*
 * @Author: BWmelon 1454490647@qq.com
 * @Date: 2023-02-15 09:51:00
 * @LastEditors: BWmelon 1454490647@qq.com
 * @LastEditTime: 2023-02-15 09:52:02
 * @FilePath: \BusPush\weapp\pages\mine\mine.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userCode: '',
        list: [{
            label: '查询路线',
            page: 'code',
            icon: 'icon-chaxun'
        }, {
            label: '通知公告',
            page: 'notice',
            icon: 'icon-tishi'
        }, {
          label: '问题反馈/功能建议',
          page: 'feedback',
          icon: 'icon-fankui'
      }]
    },
    
    /**
     * 跳转页面
     * @param {object} e 当前点击对象 
     */
    openPage(e) {
        let page = e.currentTarget.dataset.page
        wx.navigateTo({
            url: `/pages/${page}/${page}`
        })
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
        this.setData({
            userCode: getApp().globalData.userCode
        })
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