/*
 * @Author: BWmelon 1454490647@qq.com
 * @Date: 2023-02-16 13:56:24
 * @LastEditors: BWmelon 1454490647@qq.com
 * @LastEditTime: 2023-02-16 18:09:25
 * @FilePath: \BusPush\weapp\pages\feedback\feedback.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
// pages/feedback/feedback.js
import { feedbackCollection } from '../../utils/db'
import { formatTime } from '../../utils/util'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content: '',
        list: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getFeedbackList()
    },
    getFeedbackList() {
        feedbackCollection.find({}).then(res => {
            res.result.map(item => {
                item.createTime = item.createTime ? formatTime(new Date(item.createTime)) : ''
                item.replyTime = item.replyTime ? formatTime(new Date(item.replyTime)) : ''
            })
            this.setData({
                list: res.result.reverse()
            })
        }).catch(() => {
            wx.showToast({
                title: '获取列表失败',
                icon: 'none'
            })
        })
    },
    /**
     * 提交
     */
    submit() {
        if (!(this.data.content.length >= 10 && this.data.content.length <= 200)) {
            wx.showToast({
                title: '内容长度为10-200字',
                icon: 'none'
            })
            return
        }
        wx.showModal({
            title: '提示',
            content: '是否确认提交',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确认',
            confirmColor: '#3CC51F',
            success: (result) => {
                if (result.confirm) {
                    wx.showLoading({
                        title: '提交中',
                    })
                    feedbackCollection.insertOne({
                        userId: getApp().globalData.userId,
                        openid: getApp().globalData.openid,
                        content: this.data.content,
                        createTime: new Date().getTime(),
                        reply: '',
                        replyTime: 0
                    }).then(res => {
                        wx.hideLoading()
                        wx.showToast({
                            title: '提交成功',
                            icon: 'none'
                        })
                        this.getFeedbackList()
                        this.setData({
                            content: ''
                        })
                    }).catch(err => {
                        wx.hideLoading()
                        wx.showToast({
                            title: '提交失败',
                            icon: 'none'
                        })
                    })
                }
            },
            fail: () => {},
            complete: () => {}
        });

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