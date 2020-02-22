//获取应用实例
const app = getApp()

Page({
  data: {
    loading: false,
    test: '',
    testid: ''
  },
  // 事件处理函数
  onShow: function () {
    this.setData({
      test: app.globalData.students,
      testid: app.globalData.student_id
    })
    let is_login = app.globalData.is_login
    let students = app.globalData.students
    let student_id = app.globalData.student_id
    if (is_login) {
      if (students.length == 1 || student_id) {
        // 只有一个学生或者已选择当前学生，自动选择，并跳转到首页
        app.globalData.student_id = students[0].userid
        wx.switchTab({
          url: '../lesson/lesson'
        })
      } else {
        // 弹出选择页由用户选择
        wx.navigateTo({
          url: '/pages/account/account'
        })
      }
    }  
  }
})
