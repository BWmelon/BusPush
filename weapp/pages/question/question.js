// pages/question/question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        q: '自动查询有什么用',
        a: '我们的软件提供了自动查询功能，使得用户无需手动选择查询路线操作，直接查询当前时间需要查询的路线。在使用该功能前，您需要先在新建路线时设置查询时间段。例如，如果您需要每天上午八点和下午五点左右各查询一条路线，您可以将上午八点的路线查询时段设置为07:00-09:00，下午五点的路线查询时段设置为16:00-18:00。这样，在您打开软件后，系统会自动查询对应时间段的公交信息。如果您不需要设置自动查询功能，请保持默认时间段为00:00-23:59。（如果您的智能手表下键没有使用，可以将下键打开软件设置腕上公交以实现一键查询功能。）'
      },
      {
        q: '到站提醒开启后有什么效果',
        a: '开启后，最近一辆公交信息会变红并且每次刷新后智能穿戴设备将会震动，最多可以设置公交到站前15分钟提醒。'
      },
      {
        q: '精确震动是什么意思',
        a: '精确震动可以让您根据震动模式和震动次数获取到站提醒时长。长震动为5分钟，短震动为1分钟，例：公交还有8分钟到站，此时智能手表将会进行1次长震动和3次短震动。(即将到站或已到站，智能手表会进行长震动5次)'
      },
      {
        q: '感觉在软件使用过程中不需要使用到位置信息，为什么需要我给软件授权查询位置信息权限',
        a: '由于HarmonyOS系统的限制（后台应用频繁活动，会造成用户设备耗电快、卡顿等现象。因此，为了支撑性能、功耗诉求，系统仅允许应用在后台执行规范内的活动，规范外的活动默认会被挂起，当资源不足时会被回收。），为了保证软件能够实时查询公交信息，我们需要使用该方法将软件设置为后台常驻运行。因此，我们需要请求授予软件查询位置信息的权限，否则软件会在智能手表锁屏或进入后台运行时停止查询公交信息。请放心，我们保证不会储存或使用您的位置信息。'
        // https://developer.harmonyos.com/cn/docs/documentation/doc-guides/background-task-overview-0000001333321001
      }
    ]
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