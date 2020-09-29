//获取应用实例
const app = getApp()

Page({
    data: {
        loading: false,
        sheet: false,
        students: [],
        current_id: '',
        selected_name: '',
        selected_id: '',
        actions: [
            { name: '确定', color: '#ed3f14' }
        ]
    },
    // 切换学生
    onSwitchStudent: function (event) {
        // console.log(event)
        app.globalData.student_id = event.mark.id
        this.setData({
            current_id: event.mark.id
        })
        wx.switchTab({
            url: '../lesson/lesson'
        })
    },
    onAddStudent: function (event) {
        if (app.globalData.is_auth) {
            wx.navigateTo({
                url: '/pages/bond/bond'
            })
        } else {
            wx.navigateTo({
                url: '/pages/authorize/authorize'
            })
        }
    },
    onDeleteStudent: function (event) {
        this.setData({
            selected_name: event.mark.name,
            selected_id: event.mark.id,
            sheet: true
        })
    },
    handleCancel: function () {
        this.setData({
            sheet: false
        })
    },
    handleClickItem: function (event) {
        // console.log(event)
        if (event.detail.index === 0) {
            this.deleteStudent(this.data.selected_id)
        }
    },
    deleteStudent: function (id) {
        wx.showLoading({
            title: '解绑中..',
            mask: true
        })
        wx.request({
            url: app.globalData.server_url + `/parentUnBond?parent_id=${app.globalData.userid}&student_id=${id}`,
            method: 'DELETE',
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {
                wx.hideLoading()
                wx.showToast({
                    title: `${this.data.selected_name}已解绑`,
                    icon: 'success',
                    duration: 1500
                })
                this.setData({
                    sheet: false
                })
                // 全局students剔除, 判断是否为当前选择id
                const i = app.globalData.students.findIndex((node) => (node.userid === id))
                if (i > -1) {
                    app.globalData.students.splice(i, 1)
                    app.globalData.student_id = app.globalData.student_id === id ? '' : app.globalData.student_id
                    this.setData({
                        students: app.globalData.students,
                        current_id: app.globalData.student_id
                    })
                }
            },
            fail: (res) => {
                wx.hideLoading()
                wx.showToast({
                    title: `解绑失败`,
                    duration: 1500
                })
                this.setData({
                    sheet: false
                })
            }
        })
    },
    // 事件处理函数
    onShow: function () {
        this.setData({
            students: app.globalData.is_auth ? app.globalData.students : [],
            current_id: app.globalData.student_id
        })
    }
})
