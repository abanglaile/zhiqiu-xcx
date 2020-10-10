// pages/hourInquire/hourInquire.js
const app = getApp()
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hisContractList : [],
    total_fee : '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.request({
      url: app.globalData.server_url + '/getHistoryContract', 
      data: {
        stu_group_id: app.globalData.stu_group_id,
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res.data)
        this.setData({
          hisContractList : res.data.hisContractList.map((node) => {
            // node.payment_time = util.formatDate(new Date(node.payment_time), 'yyyy-mm-dd hh:mi:ss')
            node.payment_time = util.formatTime(new Date(node.payment_time))
            return node
          }),//历史合同列表
          total_fee : res.data.total_fee //历史合同总金额
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '获取历史合同数据失败',
          duration: 1000
        })
      }
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