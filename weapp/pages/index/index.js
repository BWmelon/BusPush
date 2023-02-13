// index.js
// 获取应用实例
const app = getApp()
const { mpserverless } = getApp();

import { listCollection } from '../../utils/db'

Page({
    data: {},
    onLoad() {},
    openAdd() {
        wx.navigateTo({
            url: '/pages/add/add',
        })
    },
})