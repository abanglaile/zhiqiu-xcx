// pages/lessonView/lessonView.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kp_comment : [],
    pf_comment : [],
    lesson_content : [],
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
      url: app.globalData.server_url + '/getStudentOneLesson', 
      data: {
        lesson_id: app.globalData.lesson_id,
        student_id: app.globalData.student_id,
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log('res.data:',res.data)
        this.setData({
          kp_comment : res.data.kp_comment,
          pf_comment : res.data.pf_comment,
          lesson_content : res.data.lesson_content,
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '获取个人详细课程信息',
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