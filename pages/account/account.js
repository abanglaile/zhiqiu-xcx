//获取应用实例
const app = getApp()

Page({
    data: {
        loading: false,
        students: [],
        current: ''
    },
    // 切换学生
    onSwitchStudent: function (event) {
        // console.log(event)
        app.globalData.student_id = event.mark.id
        this.setData({
            current: event.mark.id
        })
        wx.switchTab({
            url: '../lesson/lesson'
        })
    },
    onAddStudent: function (event) {
        wx.navigateTo({
            url: '/pages/bond/bond'
        })
    },
    // 事件处理函数
    onShow: function () {
        this.setData({
            students: app.globalData.students,
            current: app.globalData.student_id
        })
    }
})
