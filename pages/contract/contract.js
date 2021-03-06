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

  // 跳转到历史合同页
  onCheckHisContract: function (event) {
    // console.log(event)
    app.globalData.stu_group_id = event.mark.id
    wx.navigateTo({
      url: '/pages/contractHistory/contractHistory'
    })
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getStudentGroup()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getStudentGroup()
  },

  getStudentGroup: function() {
    if (app.globalData.student_id) {
      this.setData({
        loading: true
      })
      wx.request({
        url: app.globalData.server_url + '/getStudentGroup',
        data: {
          student_id: app.globalData.student_id,
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
            wx.stopPullDownRefresh()
          } else {
            this.setData({
              loading: false,
              student_group: []
            })
            wx.stopPullDownRefresh()
          }
        }
      })
    }
  }  
})