const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_auth: false,
    visible: {},
    loading: false,
    my: {}
  },

  onOpenBond: function () {
    wx.navigateTo({
      url: '/pages/account/account'
    })
  },

  onAuth: function () {
    wx.navigateTo({
      url: '/pages/authorize/authorize'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.userInfo)
    this.setData({
      students: app.globalData.students,
      my: app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      is_auth: app.globalData.is_auth,
      my: app.globalData.userInfo
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