// pages/contractLog.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    student_group: [
      // {
      //   "course_label": "3",
      //   "stu_group_id": 493,
      //   "group_name": "陈盈羽-初中英语",
      //   "remain_class": -240,
      //   "remain_guide": -60
      // },
      // {
      //   "course_label": "1",
      //   "stu_group_id": 494,
      //   "group_name": "陈盈羽-初中数学",
      //   "remain_class": -240,
      //   "remain_guide": -60
      // }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData)
    if (app.globalData.students.length > 0) {
      this.setData({
        loading: true
      })
      wx.request({
        url: app.globalData.server_url + '/getStudentGroup',
        data: {
          student_id: app.globalData.students[0].userid,
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
              student_group: []
            })
          }
        }
      })
    }   
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