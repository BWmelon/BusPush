/*
 * @Author: BWmelon 1454490647@qq.com
 * @Date: 2022-12-28 18:01:22
 * @LastEditors: BWmelon 1454490647@qq.com
 * @LastEditTime: 2023-02-15 16:16:50
 * @FilePath: \BusPush\weapp\pages\notice\notice.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
// pages/notice/notice.js
import { noticeCollection } from '../../utils/db'
import { formatTime } from '../../utils/util'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        noticeList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getNoticeList()
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

    },

    getNoticeList() {
        wx.showLoading({
            title: '加载中',
            mask: true,
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });

        noticeCollection.find().then(res => {
            wx.hideLoading();
            res.result.map(item => {
                item.date = formatTime(new Date(item.date))
            })
            this.setData({
                noticeList: res.result.reverse()
            })
        }).catch(err => {
            wx.hideLoading();
            wx.showToast({
                title: '获取通知公告失败',
                icon: 'none'
            })
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