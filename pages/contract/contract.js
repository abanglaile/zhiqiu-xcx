// pages/contractLog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testJson: [
      { stu_group_id: 432, course_label: 1, group_name: '李承耀-初中数学', remain_class: 2.5, remain_guide: 1.0 },
      { stu_group_id: 432, course_label: 1, group_name: '李承耀-初中数学', remain_class: 8, remain_guide: 5.0 },
      { stu_group_id: 432, course_label: 1, group_name: '李承耀-初中数学', remain_class: 2.5, remain_guide: 1.0 },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData)
    this.setData({
      loading: true
    })
    wx.request({
      url: app.globalData.server_url + '/getStudentGroup',
      data: {
        student_id: app.globalData.userid,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        // console.log(res)
        if (res.statusCode == 200) {
          this.setData({
            loading: false,
            student_group: res.data
          })
        } else {
          this.setData({
            loading: false,
            students: []
          })
        }
      }
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